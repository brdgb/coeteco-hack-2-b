const chatMessagesElement = document.getElementById("chat-messages");
const chatMessageTemplateElement = document.getElementById(
  "chat-message-template",
);
const restaurantCardsElement = document.getElementById("restaurant-cards");
const restaurantCardTemplateElement = document.getElementById(
  "restaurant-card-template",
);
const inputFormElement = document.getElementById("input-form");
const promptTextInputElement = document.getElementById("prompt-text-input");

const locationInformationElement = document.getElementById(
  "location-information",
);

function showDialog(recommendedRestaurantList) {
  const restaurantData =
    recommendedRestaurantList[
      Math.floor(Math.random() * recommendedRestaurantList.length)
    ];
  // ダイアログの要素
  const dialog = document.getElementById("restaurantDialog");
  const closeButton = document.getElementById("closeDialog");

  document.getElementById("restaurantImage").src = restaurantData.image_url;
  document.getElementById("restaurantName").textContent = restaurantData.name;
  document.getElementById("restaurantGenre").textContent =
    "ジャンル: " + restaurantData.genre;
  document.getElementById("restaurantBudget").textContent =
    "予算: " + restaurantData.budget;
  document.getElementById("restaurantDistance").textContent =
    "距離: " + restaurantData.distance + "m";
  document.getElementById("restaurantCongestion").textContent =
    "混雑率: " + restaurantData.congestion;
  document.getElementById("restaurantStar").textContent =
    "満足度: " + restaurantData.star;
  document.getElementById("restaurantRecommendReason").textContent =
    "AI押しポイント:" + restaurantData.recommend_reason;
  dialog.showModal();

  document.getElementById("yes-button").onclick = () => {
    /**
     * 指定したURLを新しいタブで開く
     * @param {string} url - 表示するURL
     */
    function openInNewTab(url) {
      if (url) {
        window.open(url, "_blank");
      } else {
        console.error("URLが指定されていません");
      }
    }

    openInNewTab(restaurantData.url);
  };

  document.getElementById("googleMap").onclick = () => {
    function openGoogleMapsRoute(lat1, lon1, lat2, lon2) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${lat1},${lon1}&destination=${lat2},${lon2}&travelmode=driving`;
      window.open(url, "_blank");
    }

    const startLat = 35.657655; // 出発地点の緯度
    const startLon = 139.700311; // 出発地点の経度 (東京)
    const endLat = restaurantData.latitude; // 到着地点の緯度
    const endLon = restaurantData.longitude; // 到着地点の経度 (六本木)
    openGoogleMapsRoute(startLat, startLon, endLat, endLon);
  };

  // ダイアログを閉じる
  closeButton.onclick = function () {
    dialog.close();
  };

  // ダイアログの外側をクリックすると閉じる
  window.onclick = function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  };
}

function randomSearch(genre, restaurantList) {
  // genreが一致するオブジェクトをフィルタリング
  const filteredObjects = restaurantList.filter((item) => item.genre === genre);
  return filteredObjects;
}

document.getElementById("randomChoiceButton").onclick = () => {
  const restaurantList = [
    {
      name: "鳥ごころ 渋谷本店",
      feature:
        "全席個室の居酒屋で、落ち着いた雰囲気の中でプライベートな時間を過ごせます。食べ飲み放題コースや誕生日・記念日のお祝いに華やかなデザートが用意されており、感染症対策も徹底しています。個室でサプライズも可能で、新鮮な肉寿司や焼き鳥を楽しめるお店です。", //web pageの要約
      recommend_reason:
        "鳥ごころ 渋谷本店は、全席個室で落ち着いた雰囲気が魅力の居酒屋です。プライベートな空間で、新鮮な肉寿司や焼き鳥を楽しめるだけでなく、誕生日や記念日のお祝いにぴったりな華やかなデザートも提供されます。静かに食事を楽しみたい方や、特別な日のサプライズを考えている方におすすめです。",
      url: "https://www.hotpepper.jp/strJ001169852/",
      latitude: 35.659345, // 緯度
      longitude: 139.697601, // 経度
      congestion: 1, //dummy
      distance: 290, //m
      star: 3.7,
      genre: "和食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/97/57/P045079757/P045079757_480.jpg",
      budget: "夜2001～3000円 昼1501～2000円",
    },
    {
      name: "ぬる燗佐藤 渋谷ヒカリエ",
      feature:
        "都会の中にある洗練された大人の空間でありながら、優しく温かな和の雰囲気が漂い、リラックスしてお食事を楽しめるお店です。幅広いシーンにおすすめのテーブル席やカウンター席があり、日本酒充実のメニューも魅力的。友人や知人との食事やデートに最適な空間です。", //web pageの要約
      recommend_reason:
        "ぬる燗佐藤 渋谷ヒカリエは、都会の喧騒から離れた洗練された大人の空間で、リラックスしながら食事ができるお店です。和の雰囲気が漂う店内で、豊富な日本酒メニューを楽しめるのがポイントです。デートや友人とのおしゃれなディナーに最適な場所を探している方にぴったりです。",
      url: "https://www.hotpepper.jp/strJ003298493/",
      latitude: 35.659101855417305, // 緯度
      longitude: 139.70375432520478, // 経度
      congestion: 3, //dummy
      distance: 370, //m
      star: 3.2,
      genre: "和食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/14/25/P039641425/P039641425_480.jpg",
      budget: "夜4001～5000円 昼1001～1500円",
    },
    {
      name: "個室居酒屋 千鳥渋谷店",
      feature:
        "この店は、友人や知人との来店シーンが多く、にぎやかで落ち着いた雰囲気が特徴です。料理のコスパが良く、綺麗な店内も好評です。大人数の宴会にも対応し、柔軟なサービスが評価されています。感染症対策や禁煙・喫煙にも配慮があり、安心して利用できるお店です。", //web pageの要約
      recommend_reason:
        "個室居酒屋 千鳥渋谷店は、友人や知人との集まりに最適で、賑やかな中にも落ち着きを感じられる居酒屋です。コスパの良い料理と綺麗な店内が評判で、大人数の宴会にも対応可能です。柔軟なサービスと感染症対策がしっかりしているため、安心して利用できるお店を探している方におすすめです。",
      url: "https://www.hotpepper.jp/strJ003715957/",
      latitude: 35.66002890923883, // 緯度
      longitude: 139.69886393870098, // 経度
      congestion: 1, //dummy
      distance: 290, //m
      star: 4.2,
      genre: "和食",
      image_url:
        "https://imgfp.hotp.jp/IMGH/04/46/P043840446/P043840446_480.jpg",
      budget: "夜2001～3000円 昼501～1000円",
    },
    {
      name: "金の餃子酒場　渋谷道玄坂店",
      feature:
        "金の餃子酒場 渋谷道玄坂店は、揚げ餃子が美味しいお店です。飲み放題ありで、お子様連れOK。客層は男女半々で、1組当たり最大6人まで。店内は禁煙と喫煙可の全席喫煙可。テーブル席は最大80人まで収容可能で、大人数での宴会に最適。お祝いやサプライズ対応も可。英語メニューもあり、Wi-Fiも完備されています。", //web pageの要約
      recommend_reason:
        "金の餃子酒場 渋谷道玄坂店は、リーズナブルな価格で美味しい揚げ餃子が楽しめるのが魅力です。店内は広々としており、大人数での宴会やお祝いごとにも対応可能なので、友達や同僚と一緒に気軽に訪れるのに最適です。また、英語メニューやWi-Fiが完備されているため、外国人の友人とも安心して訪れることができます。",
      url: "https://www.hotpepper.jp/strJ001249322/",
      latitude: 35.65915558502943, // 緯度
      longitude: 139.6973312574555, // 経度
      congestion: 3, //dummy
      distance: 300, //m
      star: 3.7,
      genre: "中華",
      image_url:
        "https://www.hotpepper.jp/IMGH/85/82/P045018582/P045018582_480.jpg",
      budget: "夜3001~4000円　昼501~1000円",
    },

    {
      name: "本格中華食堂　『悟空』　渋谷店",
      feature:
        "感染症対策を徹底し、お客様への取り組みや従業員の安全衛生管理、店舗の衛生管理を重視しています。入店時には消毒液を設置し、非接触型決済を導入。従業員は頻繁に手洗いを行い、店内は換気設備を設置しています。喫煙は全席可で、席数は46席で貸切も可能。個室や掘りごたつはないが、飲み放題＆食べ放題コースも提供しています。", //web pageの要約
      recommend_reason:
        "本格中華食堂 『悟空』 渋谷店は、衛生管理が徹底されており、感染症対策を気にする方に特におすすめです。また、貸切対応も可能なので、特別なイベントやプライベートな集まりにもぴったりです。さらに、飲み放題＆食べ放題コースがあるため、予算を気にせず心ゆくまで中華料理を楽しめる点もポイントです。",
      url: "https://www.hotpepper.jp/strJ000696512/",
      latitude: 35.65977017792532, // 緯度
      longitude: 139.6978534091636, // 経度
      congestion: 4, //dummy
      distance: 320, //m
      star: 3.9,
      genre: "中華",
      image_url:
        "https://www.hotpepper.jp/IMGH/39/83/P028033983/P028033983_480.jpg",
      budget: "夜4001~5000円 昼1001~1500円",
    },

    {
      name: "中華バル池湖",
      feature:
        "中華料理店では珍しいオープンな厨房で、修業を受けたシェフが目の前で料理を作る様子を楽しめます。ビルの4階に位置し、隠れ家的な雰囲気で外を眺めながら食事を楽しめるカウンター席も魅力的です。ランチや料理を楽しむだけでなく、目でも楽しめるお店としておすすめです。", //web pageの要約
      recommend_reason:
        "中華バル池湖は、隠れ家的な雰囲気が特徴で、特に目でも楽しめるオープンキッチンが魅力的です。シェフが目の前で料理を作る様子を楽しみながら、外の景色を眺めることができるカウンター席は、デートや静かな時間を楽しみたい時に最適です。また、レビュー評価が高いため、確かな味とサービスが期待できるでしょう。",
      url: "https://www.hotpepper.jp/strJ001160898/",
      latitude: 35.65969806365134, // 緯度
      longitude: 139.6955480379991, // 経度
      congestion: 4, //dummy
      distance: 480,
      star: 4.6,
      genre: "中華",
      image_url:
        "https://www.hotpepper.jp/IMGH/46/49/P026084649/P026084649_480.jpg",
      budget: "夜3001~4000円　昼501~1000円",
    },
    {
      name: "SINKIES(シンキーズ) 渋谷",
      feature:
        "オーナーのこだわりが詰まったおしゃれな店内で、シンガポールの風景を描いた絵画が飾られています。シンガポールならではの雰囲気を楽しめるお店で、2種類のコースが用意されています。Wi-Fiやバリアフリー設備も整っており、お子様連れやウェディングパーティーにも対応しています。お店限定のお得な情報もチェックしてみてください。", //web pageの要約
      recommend_reason: "...",
      url: "https://www.hotpepper.jp/strJ003806304/",
      latitude: 35.66094377131877, // 緯度
      longitude: 139.70751929363428, // 経度
      congestion: 3, //dummy
      distance: 760, //m
      star: 4.4,
      genre: "アジア・エスニック料理",
      image_url:
        "https://imgfp.hotp.jp/IMGH/18/95/P044191895/P044191895_480.jpg",
      budget: "夜3001～4000円 昼1001～1500円",
    },

    {
      name: "バンコクナイト渋谷",
      feature:
        "この店は、店内がおしゃれでネオンが可愛く、タイにいるような雰囲気です。料理は美味しく、居心地も良いと評判です。接客も丁寧で、質問にも親切に答えてくれるそうです。英語メニューもあり、Wi-Fiも完備されています。お子様連れ不可で、貸切は不可です。店内は全席禁煙で、換気設備も整っています。設備面ではバリアフリーではなく、駐車場もありません。", //web pageの要約
      recommend_reason: "...",
      url: "https://www.hotpepper.jp/strJ003532994/",
      latitude: 35.66267112991342, // 緯度
      longitude: 139.6970572675343, // 経度
      congestion: 3, //dummy
      distance: 640, //m
      star: 4.5,
      genre: "アジア・エスニック料理",
      image_url:
        "https://imgfp.hotp.jp/IMGH/73/08/P041737308/P041737308_480.jpg",
      budget: "夜2001～3000円 昼1001～1500円",
    },

    {
      name: "食べ放題と飲み放題のお店　渋谷　サパナ",
      feature:
        "この店は、非常に素晴らしいコストパフォーマンスと料理・味を提供しており、来店者の97%が満足しています。一人での来店が59%であり、にぎやかで落ち着いた雰囲気が特徴です。感染症対策もしっかりと行われており、全席禁煙で35席の席数を持ち、最大宴会収容人数は30人です。Wi-Fiやバリアフリー設備はないが、貸切も可能です。15周年を迎え、コロナ感染対策も実施中です。", //web pageの要約
      recommend_reason: "...",
      url: "https://www.hotpepper.jp/strJ000748881/",
      latitude: 35.655198508113195, // 緯度
      longitude: 139.70666897588183, // 経度
      congestion: 2, //dummy
      distance: 660, //m
      star: 3.8,
      genre: "アジア・エスニック料理",
      image_url:
        "https://imgfp.hotp.jp/IMGH/00/26/P036120026/P036120026_480.jpg",
      budget: "夜1501～2000円 昼501～1000円",
    },
    {
      name: "Disney HARVEST MARKET 渋谷ヒカリエ店",
      feature:
        "ディズニーモチーフのアイテムがたくさん揃う落ち着いた雰囲気の店内で、見た目も味もこだわったキャラクターモチーフのメニューを楽しめる。120席の広い席数とWi-Fi完備、バリアフリー設備も整っており、お子様連れも歓迎。アルコールメニューは提供されていないが、英語メニューもあり、ウェディングパーティーや二次会にも対応可能。", //web pageの要約
      recommend_reason: "...",
      url: "https://www.hotpepper.jp/strJ003851235/",
      latitude: 35.65925798268151, // 緯度
      longitude: 139.70380957802203, // 経度
      congestion: 4, //dummy
      distance: 350,
      star: 4.0,
      genre: "カフェ・スイーツ",
      image_url:
        "https://www.hotpepper.jp/IMGH/49/72/P044984972/P044984972_480.jpg",
      budget: "夜2001~3000円　昼1501~2000円",
    },
    {
      name: "リゾットカフェ　東京基地　渋谷",
      feature:
        "このお店は、料理や雰囲気がとても素晴らしいと評判です。来店者の95%が料理に、94%が雰囲気に満足しています。友人や知人との来店が51%で、記念日やサプライズが30%を占めています。お店の特長は、にぎやかで落ち着いた雰囲気で、女性客が7割以上で、1組当たりの人数は最大6人までです。", //web pageの要約
      recommend_reason: "...",
      url: "https://www.hotpepper.jp/strJ000748892/",
      latitude: 35.66047162145049, // 緯度
      longitude: 139.69845151896018, // 経度
      congestion: 4, //dummy
      distance: 350,
      star: 3.7,
      genre: "カフェ・スイーツ",
      image_url:
        "https://www.hotpepper.jp/IMGH/76/75/P031947675/P031947675_480.jpg",
      budget: "夜1501~2000円　昼501~1000円",
    },
    {
      name: "椿サロン　渋谷",
      feature:
        "この店は料理や味、雰囲気がとても素晴らしいと評判です。来店者の96%が料理に満足し、91%が雰囲気に満足しています。友人や知人との来店が多く、落ち着いた雰囲気でリラックスできるお店です。感染症対策もしっかりしており、全席禁煙で35席の座席数があります。Wi-Fiも完備されており、貸切も可能です。", //web pageの要約
      recommend_reason: "...",
      url: "https://www.hotpepper.jp/strJ001265191/",
      latitude: 35.66010512911498, // 緯度
      longitude: 139.69537518461672, // 経度
      congestion: 2, //dummy
      distance: 520,
      star: 4.0,
      genre: "カフェ・スイーツ",
      image_url:
        "https://www.hotpepper.jp/IMGH/92/35/P037429235/P037429235_480.jpg",
      budget: "夜1501~2000円　昼1501~2000円",
    },
  ];
  const genres = [
    "和食",
    "中華",
    "アジア・エスニック料理",
    "カフェ・スイーツ",
    "洋食",
    "韓国料理",
    "イタリアン・フレンチ",
    "ラーメン",
    "焼肉・ホルモン",
    "その他グルメ",
  ];
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const recommendedRestaurantList = randomSearch(genre, restaurantList);
  showDialog(recommendedRestaurantList);
};
