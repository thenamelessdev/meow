import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = path.resolve(__dirname, "../db.json");

export function getIp(domain: string) {
    const raw = readFileSync(db);
    const json = JSON.parse(raw.toString());

    return json.domains[domain]?.ip ?? false;
}
