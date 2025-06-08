import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from "dotenv";

import passport from 'passport';
import session from 'express-session';
import connectMongo from "connect-mongodb-session";
/* MongoDB-backed session storage for connect and Express. 
Meant to be a well-maintained and fully-featured replacement for modules like connect-mongo */

import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone" //Instead of standalone ApolloServer we will used express framework - goto Apollo server docs
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import {  buildContext } from "graphql-passport";

import mergedResolvers from "./resolvers/index.js"
import mergedTypeDefs from "./typeDefs/index.js"

import { connectDB } from "./db/connectDB.js" 
import { configurePassport } from './passport/passport.config.js';

dotenv.config();
configurePassport();

const app = express();
/* Our httpServer handles incoming requests to our Express app. Below, we tell Apollo Server to "drain" this httpServer, enabling our servers to shut down gracefully.*/
const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
})

store.on("error", (err) => console.log(err));

//Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave:false, //This option specifies whether to save the session to the store on every request. 
    saveUninitialized:false,
    cookie: {
      maxAge: 1000*60*60*24*7, //expires after 7 days/ 1 week
      httpOnly: true, //this option pfrevents the cross-site scripting (XSS) attacks
    },
    store: store
  })
)

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
 
//const { url } = await startStandaloneServer(server)

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing, and our expressMiddleware function.
app.use(
  '/graphql',
  cors({
    origin: "https://vercel.com/anants-projects-969ccd3f/expense-tracker-gql-jdbq",
    credentials: true,
  }),
  express.json(),
  // expressMiddleware accepts the same arguments: an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: ({ req, res }) => buildContext({ req, res }), //context is basically an object that is shared across all resolvers.
  }),
);

// Modified server startup
await new Promise((resolve) =>  httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);

