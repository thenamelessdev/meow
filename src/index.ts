import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;


server.listen({port, host: "0.0.0.0"});