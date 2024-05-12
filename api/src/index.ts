import "dotenv/config";
const { app } = await import("./app.js");
const port = app.get("port");

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default server;
