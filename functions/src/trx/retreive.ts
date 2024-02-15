import { Request, Response } from "express";
import { fbFirestore } from "../core";

export const handleTRXRetreive = async (req: Request, res: Response) => {
  const id = req.params.id;

  return fbFirestore
    .doc(`trx:00:${id}`)
    .get()
    .then((doc) => {
      return doc.exists
        ? res.json(doc.data())
        : res.status(404).json({ message: "Not found" });
    });
};
