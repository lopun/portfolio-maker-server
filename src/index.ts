import dotenv from "dotenv";
// 모든 설정 전에 호출해야한다.
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env" : ".env.production"
});
console.log(process.env.NODE_ENV);
console.log(process.env);

import app from "./app";
import { createConnection } from "typeorm";
import { Options } from "graphql-yoga";
import defaultConnectOptions from "./ormConfig";

const PORT: number = Number(process.env.PORT) || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

// app starting console!
const handleAppStart = () => console.log(`Listening on port ${PORT}`);

// db 연결
createConnection(defaultConnectOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch(err => console.log(err));
