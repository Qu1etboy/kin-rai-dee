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

const food = [
  "ข้าวกะเพราหมูไข่ดาว",
  "ข้าวหมูกระเทียม",
  "ข้าวไข่เจียวหมูสับผัดกะเพรา",
  "ข้าวไข่ข้นปูซอสกะเพรา",
  "ข้าวคะน้าหมูกรอบ",
  "ยำวุ้นเส้นหมูสับ",
  "ยำปลากระป๋อง",
  "ปีกไก่ทอดน้ำปลา",
  "ชีสเบอร์เกอร์",
  "ไก่ทอดกระเทียม",
];

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
          event.message.text.toLowerCase() === "หิว"
            ? food[Math.floor(Math.random() * food.length)]
            : "สวัสดีครับ ถ้าหิว พิมพ์ `หิว` และผมจะแนะนํารายการอาหารอร่อย ๆ ให้ครับ",
      });
    });

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
