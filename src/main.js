const express = require('express');
const authController = require('./service/AuthController');

async function main() {
  console.log("Starting server...");
  const app = express();
  const port = 4000;
  app.use(express.json());
  app.post("/auth", async (req, res) => {
    const auth = await authController.login(req.body);
    res.json(auth);
  });
  app.post('/sum', async (req, res) => {
    if (await authController.validateAuth(req, res)) {
      const input = req.body;
      const result = { ok: true, result: input.a + input.b };
      res.json(result)
    }
  });
  app.listen(port, () => {
    console.log(`Server listing ${port}`)
  });
}

main().catch(e => console.error(e));