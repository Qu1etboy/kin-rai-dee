# Kin Rai Dee

A line chatbot to help you choose what food you want to eat. Just tell the bot "หิว" and it will send you a random food for you

## Tools

- Ngrok -> make localhost online
- Line Bot SDK -> sending and receiving messages
- Node.js
- Express
- Nodemon -> restart server automatically when file changed

## Getting Started

Set up `.env`, you can get tokens from line developer console.

```bash
CHANNEL_ACCESS_TOKEN=
CHANNEL_SECRET=
```

Start server locally

```bash
npm run dev
# or
pnpm dev
```

Expose server online

```
./ngrok http 4000
```

Copy the url from ngrok to line webhook and start chating with the bot! Don't forget to add bot as a friend first.
