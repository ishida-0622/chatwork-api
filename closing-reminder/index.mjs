import dotenv from "dotenv";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

dotenv.config();

const CHATWORK_API_TOKEN = process.env.CHATWORK_API_TOKEN;
const ROOM_ID = process.env.CHATWORK_ROOM_ID;

export const handler = async (event) => {
  const encodedParams = new URLSearchParams();

  encodedParams.set(
    "body",
    "[toall]\n退勤押した？（このメッセージは自動送信です）"
  );
  encodedParams.set("self_unread", "0");

  const url = `https://api.chatwork.com/v2/rooms/${ROOM_ID}/messages`;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
      "x-chatworktoken": CHATWORK_API_TOKEN,
    },
    body: encodedParams,
  };

  const res = await fetch(url, options);
  const json = await res.json();
  console.log(json);
};

// ローカル実行用
// handler();
