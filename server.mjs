import { z } from "zod";
import "cheerio";
import express from "express";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

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

// function
async function summarizeWebPage(url) {
  const loader = new CheerioWebBaseLoader(url);

  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splits = await textSplitter.splitDocuments(docs);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings(),
  );

  // Retrieve and generate using the relevant snippets of the blog.
  const retriever = vectorStore.asRetriever();
  const prompt = PromptTemplate.fromTemplate(
    "Use the following pieces of context to answer the question at the end. {context} Question: {question} Answer: ",
  );
  const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const retrievedDocs = await retriever.invoke(
    "この店の特徴について日本語で50文字で答えてください。タブ文字や改行文字は含めないでください",
  );
  const result = await ragChain.invoke({
    question:
      "この店の特徴について日本語で50文字で答えてください。タブ文字や改行文字は含めないでください",
    context: retrievedDocs,
  });
  return result;
}

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

async function getRestaurant() {
  const currentState = state.getState();
  // 飲食店情報を取得
  const restaurant = await fetch(
    `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.HOTPEPPER_API_KEY}&lat=${currentState.latitude}&lng=${currentState.longitude}&count=${COUNT}&budget=${BUDGET_CODE}&format=json`,
  );
  // jsonにする
  const restaurantJson = await restaurant.json();
  // 店の情報のみを取り出す
  const restaurantArray = restaurantJson.results.shop;
  // 使う情報を取り出す
  const restaurantFeatures = restaurantArray.map((arr) => {
    return summarizeWebPage(arr.urls.pc);
  });
  const restaurants = await Promise.all(restaurantFeatures).then(
    (values) => {
      const restaurantResults = restaurantArray.map((arr, i) => {
        const result = {};
        // COLUMNSにあるカラム名を追加
        for (const columnName of COLUMNS) {
          result[`${columnName}`]= arr[`${columnName}`];
        }
        // その他を手動で追加
        result["genre_name"]= arr.genre.name;
        result["photo"]= arr.photo.pc.m;
        result["budget"]= arr.budget.name;
        result["url"]= arr.urls.pc;
        result["feature"]= values[i];

        return result;
      });
      return restaurantResults;
    },
  );
  return restaurants;
}

// toolを定義
const restaurantTool = tool(
  async () => {
    const restaurants = await getRestaurant();
    console.log(restaurants)
    return "おいしいごはん屋さん";
  },
  {
    name: "getRestaurant",
    description: "ユーザーの周辺の飲食店を取得します。",
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

app.post("/chat", async (request, response) => {
  // システムプロンプト
  const promptText = request?.body?.promptText;
  state.setState({
    latitude: request.body.latitude,
    longitude: request.body.longitude,
  });
  const systemPromptText = `あなたは飲食店を提案するアシスタントです。ユーザーにおすすめの飲食店を提案してください。getRestaurant関数を1回だけ呼び出して飲食店の情報を得てください。関数を2回以上呼び出さないでください。現在は${new Date().toString()}なので、現在営業しているお店を提案してください。そのあと、その中から最もユーザーに適していると思われる店の情報をjson形式で3つ出力してください。飲食店の情報は必ず関数の出力結果に基づいてください。[${RESPONSE_FORMAT}]のフォーマットで回答してください。このフォーマットは厳密に守ってください。これ以外の言葉をつけないでください`;
  // クライアントから送られてきたデータは無条件で信用しない
  if (typeof promptText !== "string") {
    response.sendStatus(400);
    return;
  }

  const messages = [
    new SystemMessage(systemPromptText),
    new HumanMessage(promptText),
  ];
  const aiMessageChunk = await chatModelWithTools.invoke(messages);
  messages.push(aiMessageChunk);
  // function calling
  if (
    messages[messages.length - 1].response_metadata.finish_reason ===
    "tool_calls"
  ) {
    // 関数を実行
    const tool_calls = messages[messages.length - 1].tool_calls;
    for (const toolCall of tool_calls) {
      const selectedTool = toolsByName[toolCall.name];
      const toolMessage = await selectedTool.invoke(toolCall);
      // 実行結果をmessagesにのせる
      messages.push(toolMessage);
    }
    // 関数の実行結果をもとに最終的な返答を得る
    const aiMessageChunkAfterToolCall = await chatModelWithTools.invoke(
      messages,
    );
    messages.push(aiMessageChunkAfterToolCall);
  }
  // debug
  // console.log(state.getState());
  // console.log(messages);
  response.json({ content: messages[messages.length - 1].content });
});

// 使用するホスティングサービス (Render など) によってはリクエストを受け付けるポートが指定されている場合がある。
// たいていの場合は PORT という名前の環境変数を通して参照できる。
app.listen(process.env.PORT || 3000);
