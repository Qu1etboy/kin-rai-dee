import express from "express";
import { middleware, Client } from "@line/bot-sdk";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

const lineConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
  channelSecret: process.env.CHANNEL_SECRET as string,
};

const client = new Client(lineConfig);

app.post("/webhook", middleware(lineConfig), (req, res) => {
  try {
    const { events }: any = req.body;

    console.log(events);

    events.map((event: any) => {
      if (event.type !== "message" || event.message.type !== "text")
        return null;
      client.replyMessage(event.replyToken, {
        type: "text",
        text:
          event.message.text.toLowerCase() === "ping" ? "pong" : "Hi I'm a bot",
      });
    });

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
