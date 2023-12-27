import { NextApiRequest, NextApiResponse } from 'next';
import { CogSrch } from "../../models/cogsrch/cogsearch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const input = req.body.message;
    const search = new CogSrch();
    const result = await search.call({ input });
    return res.json({ result });
  } catch (error: any) {
    console.log("🚀 ~ file: cogsrch.ts:30 ~ error:", error.message)
    return res.json({ message: 'エラー' });
  }
}
