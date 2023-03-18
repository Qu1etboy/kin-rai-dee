import express from "express";
import { middleware, Client, MessageEvent, Message } from "@line/bot-sdk";
import * as dotenv from "dotenv";
import foods from "./food.json";

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
    const { events }: { events: MessageEvent[] } = req.body;

    console.log(events);

    events.map((event) => {
      handleEvent(event);
    });

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

async function handleEvent(event: MessageEvent) {
  if (event.type !== "message" || event.message.type !== "text") return null;

  await client.replyMessage(
    event.replyToken,
    handleMessage(event.message.text)
  );
}

function handleMessage(message: string): Message[] {
  if (message === "หิว") {
    const food = getRandomFood();
    return [
      {
        type: "text",
        text: food.name,
      },
      {
        type: "image",
        originalContentUrl: food.image,
        previewImageUrl: food.image,
      },
    ];
  } else {
    return [
      {
        type: "text",
        text: " สวัสดีครับ ถ้าหิว พิมพ์ `หิว` และผมจะแนะนํารายการอาหารอร่อย ๆ ให้ครับ",
      },
    ];
  }
}

function getRandomFood() {
  return foods[Math.floor(Math.random() * foods.length)];
}

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
