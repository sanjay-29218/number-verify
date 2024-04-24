import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.post("/verify", (req: Request, res: Response) => {
  const code = req?.body?.code;

  const arrCode = code.split("");

  const lastDigit = arrCode[arrCode.length - 1];
  try {
    if (arrCode.length !== 6 || lastDigit === "7") {
      res.status(400).send("Invalid code");
      return;
    }
    res.send("verified");
  } catch (error) {}
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
