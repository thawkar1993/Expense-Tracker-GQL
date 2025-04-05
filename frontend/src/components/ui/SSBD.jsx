"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ShootingStars } from "./ShootingStars";
import { StarsBackground } from "./StarsBackground";
import App from "../../App";

const client = new ApolloClient({
  //TODO => update the uri on production
  uri: 'http://localhost:4000/graphql', //URL of our GraphQL server
  cache: new InMemoryCache(), //Apollo Client uses to cache query results after fetching them.
  credentials: "include", //this tells apollo client to send cookies along with every request to the server.
});

export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div
      className="h-full bg-neutral-900 flex flex-col justify-center relative w-full">
      <ShootingStars />
      <StarsBackground />
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </div>
  );
}
