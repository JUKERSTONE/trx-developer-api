import * as functions from "firebase-functions";
import * as express from "express";

import { auth } from "./core";
import { handleTRXSearch } from "./trx/search/search";
import { handleTRXRadio } from "./trx/radio";

export const app = express();

app.get("/trx/music/search", auth, handleTRXSearch);
app.post("/trx/music/radio", auth, handleTRXRadio);

exports.TRX_DEVELOPER = functions.region("europe-west1").https.onRequest(app);
