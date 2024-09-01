import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 状態
function createState() {
  let state = { latitude: 0, longitude: 0 };
  function setState(newState) {
    state = { ...newState };
  }
  function getState() {
    return state;
  }
  return { setState, getState };
}
const state = createState();

// LangChain の ChatOpenAI クラスは OPENAI_API_KEY 環境変数を自動的に参照する
const chatModel = new ChatOpenAI();

const app = express();

// public ディレクトリ下のファイルに適切なパスでアクセスできるようにする
app.use(express.static("./public"));

// リクエストボディを JSON として解釈して request.body に格納する
app.use(express.json());

// 使用するホスティングサービス (Render など) によってはリクエストを受け付けるポートが指定されている場合がある。
// たいていの場合は PORT という名前の環境変数を通して参照できる。
app.listen(process.env.PORT || 3000);
