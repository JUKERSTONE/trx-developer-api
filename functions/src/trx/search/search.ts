import { Request, Response } from "express";
import { getTRXQuery, getWebQuery, rankResultsQuery } from "./utils";

export const handleTRXSearch = async (req: Request, res: Response) => {
  const { query } = req.params;

  const localResults = await getTRXQuery({ query });
  const webResults = await getWebQuery({ query });

  const results = await rankResultsQuery({ localResults, webResults });

  return res.json({ results });

  /**
   * 1.
   *  a. Search TRX, trx-04
   *    i. Remove duplicates.
   *    ii. Order by relevance.
   *  b. Web flow
   *  c. Order a & b by relevance.
   *  d. Return list of TRX.
   */
};
