import express, { Application, Request, Response } from 'express'
import { connect } from "mongoose";
import bodyParser from 'body-parser'

import airRouter from './routers/airRouter'

require("dotenv").config();

const host: string | undefined = process.env.DB_HOST;
const port: string | undefined = process.env.DB_PORT;
const db:string | undefined = process.env.DB_NAME;

const uri: string = `mongodb://${host}:${port}/${db}`;
console.log(`DB : ${uri}`)
connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Connection Success to ${db} MongoDB!!`);
  }
});

const app: Application = express()
app.use(bodyParser.json());
app.use('/', airRouter)

app.listen(3000)