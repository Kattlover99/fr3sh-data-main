import type { NextApiRequest, NextApiResponse } from "next";

import { queryAsPromise, disconnect, connectToMySql } from "../../../utils/db";

type Data = {
  name: string;
};

// const { NHL_SOG_TABLE } = process.env;
const NBA_ASSIST_TABLE  = 'assists';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const connection = await connectToMySql();
  try {
    const data = await queryAsPromise(
      connection,
      "SELECT * FROM " + NBA_ASSIST_TABLE
    );

    res.status(200).json({ data });
  } catch (e) {
    res.status(500);
  } finally {
    disconnect(connection);
  }
}
