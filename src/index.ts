import express from "express";
import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import fs from "fs";
type QueryParams = {
  filename: string;
  height: string;
  width: string;
};
const app = express();
const port = 3000;
//middleware
async function returnCache(
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>,
    QueryParams
  >,
  res: Response,
  next: NextFunction
) {
  const filename: string = req.query.filename;
  const height = Number(req.query.height);
  const width = Number(req.query.width);
  const outputFileName = `${filename}_${height}_${width}`;
  const outDir = "thumb";
  const outputFileExisist = await fs.existsSync(
    get_path(outputFileName, outDir)
  );
  if (outputFileExisist) {
    res.sendFile(get_path(outputFileName, outDir), { root: "." });
    return;
  }
  next();
}
app.use(returnCache);
//utilities
function get_path(outputFileName: string, dir: string) {
  return `././asset/${dir}/${outputFileName}.jpg`;
}
app.get(
  "/api",
  async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      Record<string, unknown>,
      QueryParams
    >,
    res
  ) => {
    const filename: string = req.query.filename;
    const height = Number(req.query.height);
    const width = Number(req.query.width);
    const outputFileName = `${filename}_${height}_${width}`;
    const outDir = "thumb";
    const inDir = "full";
    const inputFileName = filename;
    const inputFileExist = await fs.existsSync(get_path(inputFileName, inDir));
    if (!inputFileExist) {
      return res.status(404).json({ message: "File Not Found" });
    }
    try {
      await fs.appendFile(get_path(outputFileName, outDir), "", () => {
        console.log("append");
      }); // create impty image
      await sharp(get_path(inputFileName, inDir))
        .resize({ height, width })
        .toFile(get_path(outputFileName, outDir));
      console.log("send");
      res.sendFile(get_path(outputFileName, outDir), { root: "." });
      // res.json({message : 'ok'})
    } catch (e) {
      return res.status(500).json({ message: "Unknown Error Occured" });
    }
  }
);
app.listen(port, () => {
  console.log("running");
});
export default { app, get_path };
