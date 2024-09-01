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

async function generateRecommendReason(restaurant) {
  const chatModel = new ChatOpenAI();
  const systemPromptText = "以下のようなプロパティを持つ飲食店をユーザーにおすすめする理由を考えてください。ユーザーは優柔不断で、飲食店を決められないため、あなたに頼っています。あなたは、そのお店の具体的な特徴を捉えてください。その上で、ユーザーがその店に行きたくなるような理由を考えてください。混雑度合いや、距離などの客観的なデータではなく、ホームページを見ないとわからないような、実際の店の中身について具体的に記述してください。そしておすすめする理由を、200文字以内にまとめてください。"
  const promptText = JSON.stringify(restaurant)
  const messages = [
    new SystemMessage(systemPromptText),
    new HumanMessage(promptText),
  ];
  const aiMessageChunk = await chatModel.invoke(messages);
  return aiMessageChunk.content
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
  const dummyRestaurantsJson = [
    {
      name: "鳥ごころ 渋谷本店",
      url: "https://www.hotpepper.jp/strJ001169852/",
      latitude: 35.659345, // 緯度
      longitude: 139.697601, // 経度
      congestion: "混みにくい", //dummy
      distance: 290, //m
      star: 3.7,
      genre: "和食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/97/57/P045079757/P045079757_480.jpg",
      budget: "夜2001～3000円 昼1501～2000円",
    },
    {
      name: "ぬる燗佐藤 渋谷ヒカリエ",
      url: 'https://www.hotpepper.jp/strJ003298493/',
      latitude: 35.659101855417305, // 緯度
      longitude: 139.70375432520478, // 経度
      congestion: "普通", //dummy
      distance: 370, //m
      star: 3.2,
      genre: "和食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/14/25/P039641425/P039641425_480.jpg",
      budget: "夜4001～5000円 昼1001～1500円",
    },
    {
      name: "個室居酒屋 千鳥渋谷店",
      url: "https://www.hotpepper.jp/strJ003715957/",
      latitude: 35.66002890923883, // 緯度
      longitude: 139.69886393870098, // 経度
      congestion: "混みにくい", //dummy
      distance: 290, //m
      star: 4.2,
      genre: "和食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/04/46/P043840446/P043840446_480.jpg",
      budget: "夜2001～3000円 昼501～1000円",
    },
    {
      name: "金の餃子酒場　渋谷道玄坂店",
      url: "https://www.hotpepper.jp/strJ001249322/",
      latitude: 35.65915558502943, // 緯度
      longitude: 139.6973312574555, // 経度
      congestion: "普通", //dummy
      distance: 300, //m
      star: 3.7,
      genre: "中華",
      image_url:
        "https://www.hotpepper.jp/IMGH/85/82/P045018582/P045018582_480.jpg",
      budget: "夜3001~4000円　昼501~1000円",
    },
    {
      name: "南国亭　渋谷一号店",
      url: "https://www.hotpepper.jp/strJ000725631/",
      latitude: 35.654612561513666, // 緯度
      longitude: 139.7080015558859, // 経度
      congestion: "混みにくい", //dummy
      distance: 770, //m
      star: 3.7,
      genre: "中華",
      image_url:
        "https://imgfp.hotp.jp/IMGH/31/09/P031543109/P031543109_480.jpg",
      budget: "夜2001～3000円 昼501～1000円",
    },
    {
      name: "中華バル池湖",
      url: 'https://www.hotpepper.jp/strJ001160898/',
      latitude: 35.65969806365134, // 緯度
      longitude: 139.6955480379991, // 経度
      congestion: "普通", //dummy
      distance: 480,
      star: 4.6,
      genre: "中華",
      image_url:
        "https://www.hotpepper.jp/IMGH/46/49/P026084649/P026084649_480.jpg",
      budget: "夜3001~4000円　昼501~1000円",
    },
    {
      name: "バンコクナイト渋谷",
      url: "https://www.hotpepper.jp/strJ003532994/",
      latitude: 35.66267112991342, // 緯度
      longitude: 139.6970572675343, // 経度
      congestion: "普通", //dummy
      distance: 640, //m
      star: 4.5,
      genre: "アジア・エスニック料理",
      image_url:
        "https://imgfp.hotp.jp/IMGH/73/08/P041737308/P041737308_480.jpg",
      budget: "夜2001～3000円 昼1001～1500円",
    },

    {
      name: "食べ放題と飲み放題のお店　渋谷　サパナ",
      url: "https://www.hotpepper.jp/strJ000748881/",
      latitude: 35.655198508113195, // 緯度
      longitude: 139.70666897588183, // 経度
      congestion: "混みにくい", //dummy
      distance: 660, //m
      star: 3.8,
      genre: "アジア・エスニック料理",
      image_url:
        "https://imgfp.hotp.jp/IMGH/00/26/P036120026/P036120026_480.jpg",
      budget: "夜1501～2000円 昼501～1000円",
    },
    {
      name: "Disney HARVEST MARKET 渋谷ヒカリエ店",
      url: "https://www.hotpepper.jp/strJ003851235/",
      latitude: 35.65925798268151, // 緯度
      longitude: 139.70380957802203, // 経度
      congestion: "混みやすい", //dummy
      distance: 350,
      star: 4.0,
      genre: "カフェ・スイーツ",
      image_url:
        "https://www.hotpepper.jp/IMGH/49/72/P044984972/P044984972_480.jpg",
      budget: "夜2001~3000円　昼1501~2000円",
    },
    {
      name: "リゾットカフェ　東京基地　渋谷",
      url: "https://www.hotpepper.jp/strJ000748892/",
      latitude: 35.66047162145049, // 緯度
      longitude: 139.69845151896018, // 経度
      congestion: "混みやすい", //dummy
      distance: 350,
      star: 3.7,
      genre: "カフェ・スイーツ",
      image_url:
        "https://www.hotpepper.jp/IMGH/76/75/P031947675/P031947675_480.jpg",
      budget: "夜1501~2000円　昼501~1000円",
    },
    {
      name: "椿サロン　渋谷",
      url: "https://www.hotpepper.jp/strJ001265191/",
      latitude: 35.66010512911498, // 緯度
      longitude: 139.69537518461672, // 経度
      congestion: "普通", //dummy
      distance: 520,
      star: 4.0,
      genre: "カフェ・スイーツ",
      image_url:
        "https://www.hotpepper.jp/IMGH/92/35/P037429235/P037429235_480.jpg",
      budget: "夜1501~2000円　昼1501~2000円",
    },
    {
      name: "シブヤショクドウ ヴェントゥーノ トウキョウ (渋谷食堂 Ventuno Tokyo)",
      url: "https://www.hotpepper.jp/strJ000000711/",
      latitude: 35.66056773017269, // 緯度
      longitude: 139.7012287639754, // 経度
      congestion: "混みにくい", //dummy
      distance: 320, //m
      star: 3.9,
      genre: "洋食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/84/14/P042718414/P042718414_480.jpg",
      budget: "夜3001～4000円 昼1001～1500円",
    },
    {
      name: "ocean good table 渋谷",

      url: "https://www.hotpepper.jp/strJ003721001/",
      latitude: 35.65754385027929, // 緯度
      longitude: 139.70364875162264, // 経度
      congestion: "混みにくい", //dummy
      distance: 270, //m
      star: 4.5,
      genre: "洋食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/79/09/P043817909/P043817909_480.jpg",
      budget: "夜5001～7000円 昼1501～2000円",
    },
    {
      name: "TOKYO FISHERMAN'S WHARF 　魚秀～UOHIDE～渋谷宇田川店",

      url: "https://www.hotpepper.jp/strJ001260405/",
      latitude: 35.661641976952914, // 緯度
      longitude: 139.69690809821597, // 経度
      congestion: "普通", //dummy
      distance: 530, //m
      star: 3.8,
      genre: "洋食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/09/69/P045040969/P045040969_480.jpg",
      budget: "夜3001～4000円 昼1001～1500円",
    },
    {
      name: "小さな韓国 あぷろ 東京渋谷店",

      url: "https://www.hotpepper.jp/strJ003411203/",
      latitude: 35.65719136390699, // 緯度
      longitude: 139.6974709668345, // 経度
      congestion: "混みやすい", //dummy
      distance: 270,
      star: 4.2,
      genre: "韓国料理",
      image_url:
        "https://www.hotpepper.jp/IMGH/77/26/P043297726/P043297726_480.jpg",
      budget: "夜3001~4000円　昼1001~1500円",
    },
    {
      name: "本場韓国料理×屋台居酒屋 - MAYAK POCHA -マヤクポチャ　渋谷本店",

      url: "https://www.hotpepper.jp/strJ003411778/",
      latitude: 35.66035043067792, // 緯度
      longitude: 139.69892446683465, // 経度
      congestion: "普通", //dummy
      distance: 320,
      star: 2.9,
      genre: "韓国料理",
      image_url:
        "https://www.hotpepper.jp/IMGH/77/86/P040717786/P040717786_480.jpg",
      budget: "夜2001~3000円　昼1501~2000円",
    },
    {
      name: "韓国料理 ホンデポチャ 渋谷店",

      url: "https://www.hotpepper.jp/strJ001234234/",
      latitude: 35.661755594974395, // 緯度
      longitude: 139.6976642415076, // 経度
      congestion: "混みやすい", //dummy
      distance: 510,
      star: 4.0,
      genre: "韓国料理",
      image_url:
        "https://www.hotpepper.jp/IMGH/12/91/P045221291/P045221291_480.jpg",
      budget: "夜2001~3000円　昼1001~1500円",
    },
    {
      name: "シェーキーズ　渋谷センター街店",

      url: "https://www.hotpepper.jp/strJ001277008/",
      latitude: 35.661123579833166, // 緯度
      longitude: 139.69774293869912, // 経度
      congestion: "普通", //dummy
      distance: 440, //m
      star: 3.8,
      genre: "イタリアン・フレンチ",
      image_url:
        "https://imgfp.hotp.jp/IMGH/83/48/P036378348/P036378348_480.jpg",
      budget: "夜2001～3000円 昼1501～2000円",
    },
    {
      name: "港町のイタリアン モンテロッソ",

      url: "https://www.hotpepper.jp/strJ003828090/",
      latitude: 35.65923843322741, // 緯度
      longitude: 139.69901919751854, // 経度
      congestion: "混みやすい", //dummy
      distance: 210,
      star: 4.3,
      genre: "イタリアン・フレンチ",
      image_url:
        "https://www.hotpepper.jp/IMGH/39/18/P044693918/P044693918_480.jpg",
      budget: "夜4001~5000円　昼1001~1500円",
    },
    {
      name: "nurikabe cafe SSS(エスリー) 渋谷",

      url: "https://www.hotpepper.jp/strJ003599112/",
      latitude: 35.65710330779303, // 緯度
      longitude: 139.70488369382153, // 経度
      congestion: "混みやすい", //dummy
      distance: 420,
      star: 4.5,
      genre: "イタリアン・フレンチ",
      image_url:
        "https://www.hotpepper.jp/IMGH/90/00/P042449000/P042449000_480.jpg",
      budget: "夜3001~4000円　昼1001~1500円",
    },
    {
      name: "らーめんと甘味処 九月堂",

      url: "https://www.hotpepper.jp/strJ000796033/",
      latitude: 35.66407143879461, // 緯度
      longitude: 139.6993981252049, // 経度
      congestion: "混みにくい", //dummy
      distance: 710, //m
      star: 3.9,
      genre: "ラーメン",
      image_url:
        "https://imgfp.hotp.jp/IMGH/00/61/P028070061/P028070061_480.jpg",
      budget: "夜1001～1500円 昼501～1000円",
    },
    {
      name: "らーめん金伝丸　渋谷本店",

      url: "https://www.hotpepper.jp/strJ000104478/",
      latitude: 35.66039048733747, // 緯度
      longitude: 139.69945261677972, // 経度
      congestion: "普通", //dummy
      distance: 300, //m
      star: 3.6,
      genre: "ラーメン",
      image_url:
        "https://imgfp.hotp.jp/IMGH/42/38/P027294238/P027294238_480.jpg",
      budget: "夜501～2000円 昼501～1000円",
    },
    {
      name: "長崎飯店　渋谷店",

      url: "https://www.hotpepper.jp/strJ000005277/",
      latitude: 35.65756484948631, // 緯度
      longitude: 139.69987862282474, // 経度
      congestion: "普通", //dummy
      distance: 50, //m
      star: 3.9,
      genre: "ラーメン",
      image_url:
        "https://imgfp.hotp.jp/IMGH/86/89/P024638689/P024638689_480.jpg",
      budget: "夜2001～3000円 昼501～1000円",
    },
    {
      name: "本格大衆焼肉　飯田屋渋谷本店",

      url: "https://www.hotpepper.jp/strJ003672472/",
      latitude: 35.65725667257084, // 緯度
      longitude: 139.69680192450556, // 経度
      congestion: "混みやすい", //dummy
      distance: 320,
      star: 3.9,
      genre: "焼肉・ホルモン",
      image_url:
        "https://www.hotpepper.jp/IMGH/53/38/P043905338/P043905338_480.jpg",
      budget: "夜7001~10000円　昼1501~2000円",
    },
    {
      name: "黒毛和牛 焼肉食べ放題 縁（えん）渋谷店",

      url: "https://www.hotpepper.jp/strJ001137327/photo/",
      latitude: 35.65907527880582, // 緯度
      longitude: 139.69695310931849, // 経度
      congestion: "混みやすい", //dummy
      distance: 350, //m
      star: 4.5,
      genre: "焼肉・ホルモン",
      image_url:
        "https://www.hotpepper.jp/IMGH/78/32/P034177832/P034177832_480.jpg",
      budget: "夜2001～3000円 昼501~1000円",
    },
    {
      name: "松尾ジンギスカン　渋谷パルコ店",

      url: "https://www.hotpepper.jp/strJ001282079/",
      latitude: 35.66222216251362, // 緯度
      longitude: 139.69894068389058, // 経度
      congestion: "普通", //dummy
      distance: 530, //m
      star: 4.2,
      genre: "焼肉・ホルモン",
      image_url:
        "https://imgfp.hotp.jp/IMGH/30/52/P038963052/P038963052_480.jpg",
      budget: "夜1501～2000円 昼1501～2000円",
    },
    {
      name: "結亭　渋谷明治通り店",
      url: "https://www.hotpepper.jp/strJ003853003/",
      latitude: 35.65647607987124, // 緯度
      longitude: 139.70522140046745, // 経度
      congestion: "普通", //dummy
      distance: 500, //m
      star: 3,
      genre: "その他グルメ",
      image_url:
        "https://imgfp.hotp.jp/IMGH/46/82/P044934682/P044934682_480.jpg",
      budget: "夜1001～1500円 昼501～1000円",
    },
    {
      name: "サラダデリマルゴ しぶちか店",
      url: "https://www.hotpepper.jp/strJ002648135/",
      latitude: 35.65876402247502, // 緯度
      longitude: 139.7008084269895, // 経度
      congestion: "普通", //dummy
      distance: 150, //m
      star: 3.2,
      genre: "その他グルメ",
      image_url:
        "https://imgfp.hotp.jp/IMGH/77/23/P039507723/P039507723_480.jpg",
      budget: "夜1501～2000円 昼1501～2000円",
    },
    {
      name: "ジビエ居酒屋 米とサーカス 高田馬場",
      url: "https://www.hotpepper.jp/strJ000971939/",
      latitude: 35.71963292872577, // 緯度
      longitude: 139.70497164924913, // 経度
      congestion: "混みにくい", //dummy
      distance: 6300, //m
      star: 4,
      genre: "その他グルメ",
      image_url:
        "https://imgfp.hotp.jp/IMGH/33/33/P041493333/P041493333_480.jpg",
      budget: "夜3001～4000円 昼1001～1500円",
    },
  ];
  const restaurantFeatures = dummyRestaurantsJson.map((arr) => {
    return summarizeWebPage(arr.url);
  });
  const dummyRestaurants = await Promise.all(restaurantFeatures).then(
    (values) => {
      const restaurantResults = dummyRestaurantsJson.map((arr, i) => {
        const result = { ...arr };
        result["feature"] = values[i];

        return result;
      });
      return restaurantResults;
    },
  );
  const dummyRestaurantsRecommendReasons = dummyRestaurants.map((arr)=>{
    return generateRecommendReason(arr)
  })
  const dummyRestaurantsResult = await Promise.all(dummyRestaurantsRecommendReasons).then(
    (values)=>{
      const restaurantResults = dummyRestaurants.map((arr, i) => {
        const result = { ...arr };
        result["recommend_reason"] = values[i];

        return result;
      });
      return restaurantResults;
    }
  )
  return dummyRestaurantsResult;

  // const currentState = state.getState();
  // // 飲食店情報を取得
  // const restaurant = await fetch(
  //   `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.HOTPEPPER_API_KEY}&lat=${currentState.latitude}&lng=${currentState.longitude}&count=${COUNT}&budget=${BUDGET_CODE}&format=json`,
  // );
  // // jsonにする
  // const restaurantJson = await restaurant.json();
  // // 店の情報のみを取り出す
  // const restaurantArray = restaurantJson.results.shop;
  // // 使う情報を取り出す
  // const restaurantFeatures = restaurantArray.map((arr) => {
  //   return summarizeWebPage(arr.urls.pc);
  // });
  // const restaurants = await Promise.all(restaurantFeatures).then((values) => {
  //   const restaurantResults = restaurantArray.map((arr, i) => {
  //     const result = {};
  //     // COLUMNSにあるカラム名を追加
  //     for (const columnName of COLUMNS) {
  //       result[`${columnName}`] = arr[`${columnName}`];
  //     }
  //     // その他を手動で追加
  //     result["genre_name"] = arr.genre.name;
  //     result["photo"] = arr.photo.pc.m;
  //     result["budget"] = arr.budget.name;
  //     result["url"] = arr.urls.pc;
  //     result["feature"] = values[i];

  //     return result;
  //   });
  //   return restaurantResults;
  // });
  // return restaurants;
}

// toolを定義
const restaurantTool = tool(
  async () => {
    const restaurants = await getRestaurant();
    console.log(restaurants);
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
