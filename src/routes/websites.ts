import express, { Request, Response, Router } from "express";
const router = express.Router();
import { getIp, getWebsite } from "../functions.js";

router.get("/", async (req: Request, res: Response) => {
    const { website } = req.query;

    if(website){
        if (website.toString().startsWith("meow://")){
            const json = await getWebsite(website.toString());
            if (json){
                res.render("website", { title: json.head.title, description: json.head.description, content: json.body.content });
            }
            else{
                res.render("error", { error: "Not found" });
            }
        }
        else if(website.toString().startsWith("http://") || website.toString().startsWith("https://")){
            const response = await fetch(website.toString());
            if (response.ok){
                res.render("website", { content: await response.text() ,title: website.toString(), description: "No description avaliable for http/https websites" })
            }
            else{
                res.render("error", { error: "There was an error while making the request." });
            }
        }
        else{
            res.send("Search " + website);
        }
    }
    else{
        res.render("error", { error: "Missing website" });
    }
});

export default router;