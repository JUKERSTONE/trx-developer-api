import { fbFirestore } from "../core";
import { randomBytes, randomUUID } from "crypto";

export const handleRegisterClient = (req: any, res: any) => {
  const clientId = randomUUID();
  const clientSecret = randomBytes(32).toString("hex"); //

  fbFirestore.doc(`dmg-clients/${clientId}`).set({
    clientId,
    clientSecret,
    createdAt: new Date().toISOString(),
  });

  return res.json({ clientId, clientSecret });
};
