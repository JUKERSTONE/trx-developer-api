import { Request, Response } from "express";
import algoliasearch from "algoliasearch";

export const ALGOLIA_APP_ID = "ZBCBTRK5UR";
export const ALGOLIA_API_KEY = "d7a1550f25a9017579ccd3eca0c5a1ac";

export const handleTRXSearch = async (req: Request, res: Response) => {
  const { query } = req.params;
  let results: any[] = [];
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const index = client.initIndex("TRX");

  index.search(query).then(({ hits }) => {
    results = [];
    results.push(hits);
  });

  return res.json({ results });
};
