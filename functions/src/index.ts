import * as functions from "firebase-functions";
import * as express from "express";

// import { auth } from "./core";
import { handleTRXSearch } from "./trx/search/search";
import { handleTRXRadio } from "./trx/radio";
import { handleTRXRetreive } from "./trx/retreive";
import { handleRegisterClient } from "./auth/registerClient";
import { auth } from "./core";
import { handleTRXBufferRetreive } from "./trx/retreiveBuffer";

export const app = express();

app.get("/register/:clientId", handleRegisterClient);
app.get("/trx/music/:id", handleTRXRetreive);
app.post("/trx/music/buffer", handleTRXBufferRetreive);
app.get("/trx/music/search/:query", handleTRXSearch);
app.post("/trx/music/radio", auth, handleTRXRadio);

exports.TRX_DEVELOPER = functions.region("europe-west1").https.onRequest(app);
