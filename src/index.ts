import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;

const rootdir = path.join("../", path.dirname(fileURLToPath(import.meta.url)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
    res.render("index");
});


import websitesRouter from "./routes/websites.js";
app.use("/websites", websitesRouter);

server.listen({port, host: "0.0.0.0"});