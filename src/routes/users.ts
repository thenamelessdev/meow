import express, { Request, Response, Router } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    if(req.session.username){
        res.redirect("/users/dashboard");
    }
    else{
        res.redirect(process.env.ghLink || "/");
    }
});

router.get("/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const id = process.env.ghId;
    const secret = process.env.ghSecret;

    const getToken = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            client_id: id,
            client_secret: secret,
            code: code
        })
    });
    const getTokenJson = await getToken.json();
    if(getToken.ok){
        const token = getTokenJson.access_token;
        const getUname = await fetch("https://api.github.com/user", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const getUnameJson = await getUname.json();
        if(getUname.ok){
            const username = getUnameJson.login;
            req.session.username = username;
            res.redirect("/users/dashboard");
        }
        else{
            res.render("error", { error: "There was an erroe while getting your username" });
        }
    }
    else{
        res.render("error", { error: "There was an error while getting your access token" });
    }
});

router.get("/dashboard", (req: Request, res: Response) => {
    if (req.session.username){
        res.render("users/dashboard", { username: req.session.username });
    }
    else{
        res.redirect("/users");
    }
});

router.get("/logout", (req: Request, res: Response) => {
    req.session.username = undefined;
    res.redirect("/");
});

export default router;