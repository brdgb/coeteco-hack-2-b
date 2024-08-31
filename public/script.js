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
const jsonUrl = "../data.json"


function showDialog(recommendedRestaurantList) {
  const restaurantData = recommendedRestaurantList[Math.floor(Math.random() * recommendedRestaurantList.length)];
  // ダイアログの要素
  const dialog = document.getElementById("restaurantDialog");
  const closeButton = document.getElementById("closeDialog");

  document.getElementById("restaurantImage").src = restaurantData.image_url;
  document.getElementById("restaurantName").textContent = restaurantData.name;
  document.getElementById("restaurantGenre").textContent = "ジャンル: " + restaurantData.genre;
  document.getElementById("restaurantBudget").textContent = "予算: " + restaurantData.budget;
  document.getElementById("restaurantDistance").textContent = "距離: " + restaurantData.distance +"m";
  document.getElementById("restaurantCongestion").textContent = "混雑率: " + restaurantData.congestion;
  document.getElementById("restaurantStar").textContent = "満足度: " + restaurantData.star;
  document.getElementById("restaurantRecommendReason").textContent = "AI押しポイント:" + restaurantData.recommend_reason;
  dialog.showModal();

  document.getElementById("yes-button").onclick = () => {
  /**
  * 指定したURLを新しいタブで開く
  * @param {string} url - 表示するURL
  */
  function openInNewTab(url) {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('URLが指定されていません');
    }
  }
  
  openInNewTab(restaurantData.url)
  }



  // ダイアログを閉じる
  closeButton.onclick = function() {
      dialog.close();
  };

  // ダイアログの外側をクリックすると閉じる
  window.onclick = function(event) {
      if (event.target === dialog) {
          dialog.close();
      }
  };
}

  
function randomSearch(genre, restaurantList) {

    // genreが一致するオブジェクトをフィルタリング
    const filteredObjects = restaurantList.filter(item => item.genre === genre);

    return filteredObjects;
}

document.getElementById("randomChoiceButton").onclick = () => {
  const restaurantList = [{
    name: '金の餃子酒場　渋谷道玄坂店',
    feature: '金の餃子酒場 渋谷道玄坂店は、揚げ餃子が美味しいお店です。飲み放題ありで、お子様連れOK。客層は男女半々で、1組当たり最大6人まで。店内は禁煙と喫煙可の全席喫煙可。テーブル席は最大80人まで収容可能で、大人数での宴会に最適。お祝いやサプライズ対応も可。英語メニューもあり、Wi-Fiも完備されています。', //web pageの要約
    recommend_reason: '「金の餃子酒場 渋谷道玄坂店」は、揚げ餃子が自慢で、大人数の宴会に最適な場所です。特に友達や同僚との飲み会やお祝いにぴったり。店内は全席喫煙可ですが、Wi-Fi完備や英語メニューの提供など、外国人のお客様にも優しい対応が魅力。混み具合が3で、ほどよく賑わっているため、落ち着いた雰囲気で過ごせます。距離も300mと近く、アクセスも便利です。',
    url: 'https://www.hotpepper.jp/strJ001249322/',
    latitude:35.65915558502943,// 緯度
    longitude:139.6973312574555,// 経度
    congestion: 3, //dummy
    distance: 300, //m
    star:3.7,
    genre: '中華',
    image_url: 'https://www.hotpepper.jp/IMGH/85/82/P045018582/P045018582_480.jpg',
    budget: '夜3001~4000円　昼501~1000円',
  },
  
  {
    name: '本格中華食堂　『悟空』　渋谷店',
    feature: '感染症対策を徹底し、お客様への取り組みや従業員の安全衛生管理、店舗の衛生管理を重視しています。入店時には消毒液を設置し、非接触型決済を導入。従業員は頻繁に手洗いを行い、店内は換気設備を設置しています。喫煙は全席可で、席数は46席で貸切も可能。個室や掘りごたつはないが、飲み放題＆食べ放題コースも提供しています。', //web pageの要約
    recommend_reason: '「本格中華食堂 『悟空』 渋谷店」は、感染症対策をしっかり行っており、安全・安心に食事を楽しめるお店です。飲み放題や食べ放題のコースがあり、様々なシーンで利用できます。全席喫煙可ですが、46席のこぢんまりとした空間で、貸切にも対応しているので、プライベートな集まりにも適しています。混み具合が4なので賑やかですが、活気ある雰囲気を楽しみたい方におすすめです。距離は320mと近いです。',
    url: 'https://www.hotpepper.jp/strJ000696512/',
    latitude: 35.65977017792532, // 緯度 
    longitude: 139.6978534091636, // 経度
    congestion: 4, //dummy
    distance:320, //m
    star:3.9,
    genre: '中華',
    image_url: 'https://www.hotpepper.jp/IMGH/39/83/P028033983/P028033983_480.jpg',
    budget: '夜4001~5000円 昼1001~1500円',
  }
  
  ,{	name: '中華バル池湖',
    feature: '中華料理店では珍しいオープンな厨房で、修業を受けたシェフが目の前で料理を作る様子を楽しめます。ビルの4階に位置し、隠れ家的な雰囲気で外を眺めながら食事を楽しめるカウンター席も魅力的です。ランチや料理を楽しむだけでなく、目でも楽しめるお店としておすすめです。', //web pageの要約
    recommend_reason: '「中華バル池湖」は、オープンキッチンでシェフが料理する様子を楽しめる、視覚的にも魅力的なお店です。隠れ家的な雰囲気と外を眺めながら食事できるカウンター席が特徴で、特別なデートや静かに過ごしたい方におすすめです。レビュー評価も4.6と高く、質の高い食事を期待できます。混み具合が4なので、少し賑やかですが、その分活気があり、距離も480mと散歩がてら訪れるのに良い距離です。',
    url: 'https://www.hotpepper.jp/strJ001160898/',
    latitude:35.65969806365134 , // 緯度 
    longitude:139.6955480379991 , // 経度
    congestion: 4, //dummy
    distance: 480,
    star: 4.6,
    genre: '中華',
    image_url: 'https://www.hotpepper.jp/IMGH/46/49/P026084649/P026084649_480.jpg',
    budget: '夜3001~4000円　昼501~1000円',
  }]
  const genres = ["和食","中華","アジア・エスニック料理","カフェ・スイーツ","洋食","韓国料理","イタリアン・フレンチ","ラーメン","焼肉・ホルモン","その他グルメ"];
  const genre = "中華"// const genre = genres[Math.floor(Math.random() * genres.length)];
  const recommendedRestaurantList = randomSearch(genre, restaurantList);
  showDialog(recommendedRestaurantList);

}

