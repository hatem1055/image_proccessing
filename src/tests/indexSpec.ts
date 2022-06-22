import supertest from "supertest";
import sharp from "sharp";
import index from "../index";
import path from "path";

const app = index.app;
const get_path = index.get_path;
const request = supertest(app);

it("expect request to test to return 404 error", async () => {
  try {
    await request.get("/api?filename=test&width=500&height=500");
  } catch (e : any) {
    expect(e.response.status).toEqual(404);
  }
});
it("expect get_path with thumb and fjord to return path", async () => {
  expect(get_path("fjord", "thumb")).toEqual("././asset/thumb/fjord.jpg");
});
it("expect image width 500 height 500 name encenadaport", async () => {
  await request.get("/api?filename=encenadaport&width=500&height=500");
  const image = await sharp(
    path.join(
      __dirname,
      "..",
      "..",
      "asset",
      "thumb",
      "encenadaport_500_500.jpg"
    )
  ).metadata();
  expect(image.width).toEqual(500);
  expect(image.height).toEqual(500);
});
