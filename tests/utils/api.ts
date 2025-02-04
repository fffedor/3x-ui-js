import { XuiApi } from "3x-ui";
import { removeColors } from "./removeColors";
import server from "../server.json";
import https from "https";
import { readFileSync } from "fs";

const user = removeColors(server.username);
const pass = removeColors(server.password);
const port = removeColors(server.port);
const webBasePath = removeColors(server.webBasePath);
const protocol = server.ssl.enabled ? "https" : "http";

const getHttpsAgent = (): https.Agent | undefined => {
  if (!server.ssl.enabled) return undefined;

  return new https.Agent({
    rejectUnauthorized: false,
    cert: readFileSync(server.ssl.cert),
    key: readFileSync(server.ssl.key),
  });
};

const uri = `${protocol}://${user}:${pass}@localhost:${port}/${webBasePath}`;
export const api = new XuiApi(uri, getHttpsAgent());
api.debug = true;
