import { Request, Response } from "express";
import { fbFirestore } from "../core";

export const handleTRXRetreive = async (req: Request, res: Response) => {
  const id = req.params.id;

  return fbFirestore
    .doc(`TRX/trx:00:${id}`)
    .get()
    .then((doc: any) => {
      if (!doc.exists) return res.status(404).json({ message: "Not found" });
      const data = doc.data();
      const trak = JSON.parse(data.serialized_trak);
      return doc.exists && trak.TRAK.trak.youtube.url
        ? res.json(trak.TRAK.trak.youtube.url.replace(/['"]+/g, ""))
        : res.status(404).json({ message: "Not found" });
    });
};
