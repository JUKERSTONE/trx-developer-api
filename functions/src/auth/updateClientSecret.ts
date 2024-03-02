import { fbFirestore } from "../core";
import { randomBytes } from "crypto";

export const handleUpdateClientSecret = async ({
  clientId,
  hasRefresh,
}: any) => {
  const clientSecret = randomBytes(32).toString("hex");
  const clientDocRef = fbFirestore.doc(`dmg-clients/${clientId}`);

  const docSnapshot = await clientDocRef.get();

  if (docSnapshot.exists) {
    if (!hasRefresh) return;
    return await clientDocRef.update({
      clientSecret,
      updatedAt: new Date().toISOString(),
    });
  } else {
    throw new Error(`Client with ID ${clientId} does not exist.`);
  }
};
