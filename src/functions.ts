import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = path.resolve(__dirname, "../db.json");

export function getIp(domain: string) {
    const raw = readFileSync(db);
    const json = JSON.parse(raw.toString());

    if(json.domain[domain]){
        return json.domains[domain].ip;
    }
    return false;
}

export async function getWebsite(domain:string){
    const raw = readFileSync(db);
    const json = JSON.parse(raw.toString());

    if (json.domains[domain]){
        const ip = json.domains[domain].ip;
        const response = await fetch(ip);
        const responseJson = await response.json();
        if (response.ok){
            return responseJson;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}