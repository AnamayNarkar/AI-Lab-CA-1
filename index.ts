import * as fs from 'fs';
import { config } from "dotenv";
import "dotenv/config"
import express,{ type Request, type Response} from "express";
import { runAgent } from './agent.js';

config();
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req: Request, res: Response)=>{
    res.send("healthy")
})

app.post("/ask", async (req: Request, res: Response)=>{
    const query: string = req.body.user_query;
    res.send(await runAgent(query));
})

app.listen(3000, ()=>{
    console.log("anoushka server started")
})