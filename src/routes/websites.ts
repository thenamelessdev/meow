import express, { Request, Response, Router } from "express";
const router = express.Router();
import { getIp } from "../functions.js";

router.get("/", (req: Request, res: Response) => {
    const { website } = req.query;

    if(website){
        if (website.toString().startsWith("meow://")){
            const ip = getIp(website.toString());
            if (ip){
                res.send(ip);
            }
            else{
                res.render("error", { error: "Not found" });
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