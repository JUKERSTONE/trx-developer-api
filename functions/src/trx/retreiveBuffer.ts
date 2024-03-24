import { Request, Response } from "express";
import { fbFirestore } from "../core";

export const handleTRXBufferRetreive = async (req: Request, res: Response) => {
  const isrcBuffer: any[] = req.body;
  console.log("🚀 ~ handleTRXBufferRetreive ~ isrcBuffer:", isrcBuffer);

  const buffer = await Promise.all(
    isrcBuffer.map((id) =>
      fbFirestore
        .doc(`TRX/trx:00:${id}`)
        .get()
        .then((doc: any) => {
          const data = doc.data();
          const trak = JSON.parse(data.serialized_trak);
          console.log("🚀 ~ .then ~ trak:", trak.TRAK.trak.youtube.url);

          return trak.TRAK.trak.youtube.url;
        })
    )
  );

  return res.json(buffer);
};
