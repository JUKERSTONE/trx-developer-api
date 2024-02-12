import { initializeApp } from "firebase-admin";

const admin = require("firebase-admin");
const serviceAccount = require("../core/trx-traklist-firebase-adminsdk-t44y0-54b7fcbc7e.json");

const TRX_DEVELOPER = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const fbFirestore = TRX_DEVELOPER.firestore();
export const fbAuthentication = TRX_DEVELOPER.auth();
