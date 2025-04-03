import passport from "passport";
import bcrypt from "bcryptjs";
import { GraphQLLocalStrategy } from "graphql-passport";

import User from "../models/user.model.js";

//Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application

export const configurePassport = async () => {
    //Serialization: It is process of converting the user object into a format that can be stored and retrieved easily.
    passport.serializeUser((user, done) => {
        console.log("Serializing user...");
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("De-serializing user...");
        try{
            const user = await User.findById(id);
            done(null, user)
        }catch(err){
            done(err)
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try{
                const user = await User.findOne({username});
                if(!user){
                    throw new Error("Invalid username or password");
                }
                const validPassword = await bcrypt.compare(password, user.password);
                if(!validPassword){
                    throw new Error("Invalid username or password");
                }
                return done(null, user);
            }catch(err){
                done(err)
            }
        })
    )
} 