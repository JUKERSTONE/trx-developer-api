import { initializeApp,} from "firebase-admin";

import * as admin from "firebase-admin";

const serviceAccount = require("./trx-traklist-firebase-adminsdk-t44y0-46740db398.json");

const TRX_DEVELOPER = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const fbFirestore = TRX_DEVELOPER.firestore();
export const fbAuthentication = TRX_DEVELOPER.auth();
