import { z } from "zod";
import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 定数
const COUNT = 50;
const BUDGET_CODE = "B011,B001";
const GENRE_LIST = {
  居酒屋: "G001",
  ダイニングバー_バル: "G002",
  創作料理: "G003",
  和食: "G004",
  洋食: "G005",
  イタリアン_フレンチ: "G006",
  中華: "G007",
  焼肉_ホルモン: "G008",
  韓国料理: "G017",
  アジア_エスニック料理: "G009",
  各国料理: "G010",
  カラオケ_パーティ: "G011",
  バー_カクテル: "G012",
  ラーメン: "G013",
  お好み焼き_もんじゃ: "G016",
  カフェ_スイーツ: "G014",
  その他グルメ: "G015",
};
const COLUMNS = ["name", "catch", "open"];
const OTHER_COLUMNS = ["genre_name", "photo", "budget", "url"];
let RESPONSE_FORMAT =
  "{" +
  COLUMNS.map((columnName) => `${columnName}: restaurant ${columnName}`).join(
    ", ",
  );
RESPONSE_FORMAT += OTHER_COLUMNS.map(
  (columnName) => `${columnName}: restaurant ${columnName}`,
).join(", ");
RESPONSE_FORMAT += "}";

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

// toolを定義
const restaurantTool = tool(
  async ({ genre1, genre2 }) => {
    const genreCode1 = genre1 === "" ? "" : GENRE_LIST[genre1];
    const genreCode2 = genre2 === "" ? "" : GENRE_LIST[genre2];
    const genreCode =
      genreCode1 === ""
        ? genreCode2 === ""
          ? ""
          : genreCode2
        : genreCode2 === ""
        ? genreCode1
        : `${genreCode2},${genreCode2}`;
    const currentState = state.getState();
    // 飲食店情報を取得
    const restaurant = await fetch(
      `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.HOTPEPPER_API_KEY}&lat=${currentState.latitude}&lng=${currentState.longitude}&count=${COUNT}&budget=${BUDGET_CODE}&genre=${genreCode}&format=json`,
    );
    // jsonにする
    const restaurantJson = await restaurant.json();
    // 店の情報のみを取り出す
    const restaurantArray = restaurantJson.results.shop;
    // 使う情報を取り出す
    const restaurantText = restaurantArray.map((arr) => {
      let resultText = "";
      // COLUMNSにあるカラム名を追加
      for (const columnName of COLUMNS) {
        resultText += `${columnName}: ${arr[`${columnName}`]}, `;
      }
      // その他を手動で追加
      resultText += `genre_name: ${arr.genre.name}`;
      resultText += `photo: ${arr.photo.pc.m}`;
      resultText += `budget: ${arr.budget.name}`;
      resultText += `url: ${arr.urls.pc}`;
      return resultText;
    });
    // console.log(restaurantText);
    return restaurantText;
  },
  {
    name: "getRestaurant",
    schema: z.object({
      genre1: z.enum([
        "居酒屋",
        "ダイニングバー_バル",
        "創作料理",
        "和食",
        "洋食",
        "イタリアン_フレンチ",
        "中華",
        "焼肉_ホルモン",
        "韓国料理",
        "アジア・エスニック料理",
        "各国料理",
        "カラオケ_パーティ",
        "バー_カクテル",
        "ラーメン",
        "お好み焼き_もんじゃ",
        "カフェ_スイーツ",
        "その他グルメ",
        "",
      ]),
      genre2: z.enum([
        "居酒屋",
        "ダイニングバー_バル",
        "創作料理",
        "和食",
        "洋食",
        "イタリアン_フレンチ",
        "中華",
        "焼肉_ホルモン",
        "韓国料理",
        "アジア・エスニック料理",
        "各国料理",
        "カラオケ_パーティ",
        "バー_カクテル",
        "ラーメン",
        "お好み焼き_もんじゃ",
        "カフェ_スイーツ",
        "その他グルメ",
        "",
      ]),
    }),
    description:
      "ユーザーの周辺の飲食店を取得します。飲食店のジャンルが明確であれば、引数に飲食店のジャンルを2つまで入れてください。明確でない場合は必ず空文字列としてください。ジャンルは居酒屋,ダイニングバー_バル,創作料理,和食,洋食,イタリアン_フレンチ,中華,焼肉_ホルモン,韓国料理,アジア・エスニック料理,各国料理,カラオケ_パーティ,バー_カクテル,ラーメン,お好み焼き_もんじゃ,カフェ_スイーツ,その他グルメの中から選んでください。",
  },
);

const tools = [restaurantTool];

const toolsByName = {
  getRestaurant: restaurantTool,
};

// LangChain の ChatOpenAI クラスは OPENAI_API_KEY 環境変数を自動的に参照する
const chatModel = new ChatOpenAI();
const chatModelWithTools = chatModel.bindTools(tools);

const app = express();

// public ディレクトリ下のファイルに適切なパスでアクセスできるようにする
app.use(express.static("./public"));

// リクエストボディを JSON として解釈して request.body に格納する
app.use(express.json());

// 使用するホスティングサービス (Render など) によってはリクエストを受け付けるポートが指定されている場合がある。
// たいていの場合は PORT という名前の環境変数を通して参照できる。
app.listen(process.env.PORT || 3000);
