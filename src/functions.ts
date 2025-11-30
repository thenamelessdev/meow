import path from "path";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "fs";

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

export function newDomain(domain: string, owner: string, ip: string) {
    const raw = readFileSync(db);
    const json = JSON.parse(raw.toString());
    let realDomain;
    if(domain.startsWith("meow://")){
        realDomain = domain;
    }
    else{
        realDomain = "meow://" + domain;
    }
    if(!json.domains[realDomain]){
        json.domains[realDomain] = {
            owner: owner,
            ip: ip
        }
        writeFileSync(db, JSON.stringify(json));
        return true;
    }
    else{
        return false;
    }
}

export function deleteDomain(domain: string, user: string) {
    const raw = readFileSync(db);
    const json = JSON.parse(raw.toString());
    let realDomain;

    if(domain.startsWith("meow://")){
        realDomain = domain;
    }
    else{
        realDomain = "meow://" + domain;
    }

    if(!json.domains[realDomain]){
        return false;
    }

    if(json.domains[realDomain].owner == user){
        delete json.domains[realDomain];
        writeFileSync(db, JSON.stringify(json));
        return true;
    }
    else{
        return false;
    }
}