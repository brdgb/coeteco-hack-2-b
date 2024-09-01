const restaurantList = [
  {
    name: '鳥ごころ 渋谷本店',
    url: 'https://www.hotpepper.jp/strJ001169852/',
    latitude: 35.659345,
    longitude: 139.697601,
    congestion: '混みにくい',
    distance: 290,
    star: 3.7,
    genre: '和食',
    image_url: 'https://imgfp.hotp.jp/IMGH/97/57/P045079757/P045079757_480.jpg',
    budget: '夜2001～3000円 昼1501～2000円',
    feature: '全席個室で、食べ飲み放題コースや誕生日・記念日のお祝いに特化したサービスがあります。サプライズ演出も可能で、美味しい焼き鳥や肉寿司を楽しめます。',
    recommend_reason: '鳥ごころ 渋谷本店は全席個室で、食べ飲み放題コースや誕生日・記念日のお祝いに特化したサービスがあります。サプライズ演出も可能で、美味しい焼き鳥や肉寿司が楽しめます。大切な人と特別な記念日を過ごすためのパーフェクトなお店です。'
  },
  {
    name: 'ぬる燗佐藤 渋谷ヒカリエ',
    url: 'https://www.hotpepper.jp/strJ003298493/',
    latitude: 35.659101855417305,
    longitude: 139.70375432520478,
    congestion: '普通',
    distance: 370,
    star: 3.2,
    genre: '和食',
    image_url: 'https://imgfp.hotp.jp/IMGH/14/25/P039641425/P039641425_480.jpg',
    budget: '夜4001～5000円 昼1001～1500円',
    feature: '和モダンな雰囲気と豊富な日本酒が魅力の大人の空間。友人やデートに最適なテーブル席やカウンター席をご用意しています。',
    recommend_reason: 'ぬる熱佐藤 渋谷ヒカリエは和モダンな雰囲気と豊富な日本酒が魅力の大人の空間。友人やデートに最適なテーブル席やカウンター席があり、落ち着いた雰囲気で心地よい時間を過ごせます。料理もこだわりの和食で、美味しい料理とお酒を楽しめるお店です。普段から飲食店を選ぶのが難しい方には、絶妙なバランスの楽しいひとときを過ごすことができるおすすめのお店です。'
  },
  {
    name: '個室居酒屋 千鳥渋谷店',
    url: 'https://www.hotpepper.jp/strJ003715957/',
    latitude: 35.66002890923883,
    longitude: 139.69886393870098,
    congestion: '混みにくい',
    distance: 290,
    star: 4.2,
    genre: '和食',
    image_url: 'https://imgfp.hotp.jp/IMGH/04/46/P043840446/P043840446_480.jpg',
    budget: '夜2001～3000円 昼501～1000円',
    feature: '友人や知人との来店が多く、にぎやかで落ち着いた雰囲気のお店。コスパが良く、清潔感もあり、大人数の宴会にも対応可能。感染症対策もしっかりしている。',
    recommend_reason: '個室居酒屋 千鳥渋谷店は友人や知人と楽しい時間を過ごすのにぴったりのお店です。落ち着いた雰囲気でありながら賑やかさもあり、大人数の宴会にも最適です。コスパも良く清潔感もあり、感染症対策もしっかりしているので安心して過ごせます。友人と楽しく食事をしたい時にぴったりのお店です。'
  },
  {
    name: '金の餃子酒場　渋谷道玄坂店',
    url: 'https://www.hotpepper.jp/strJ001249322/',
    latitude: 35.65915558502943,
    longitude: 139.6973312574555,
    congestion: '普通',
    distance: 300,
    star: 3.7,
    genre: '中華',
    image_url: 'https://www.hotpepper.jp/IMGH/85/82/P045018582/P045018582_480.jpg',
    budget: '夜3001~4000円　昼501~1000円',
    feature: 'お店は感染症対策を徹底し、入店時から会計処理まで安全に配慮。喫煙可で座席数は73席、Wi-Fi完備。飲み放題あり、お子様連れOK。ランチや大人数でのご利用にも対応。',
    recommend_reason: '金の餃子酒場 渋谷道玄坂店は、感染症対策を徹底しており、安心して利用できるお店です。広々とした73席の中華料理店で、Wi-Fi完備で快適に過ごせます。飲み放題メニューもあるため、友人との楽しい飲み会にも最適。また、お子様連れOKなので、ファミリーや大人数での利用にもおすすめです。ランチタイムにも利用できるので、幅広いシーンで楽しめるお店です。'
  },
  {
    name: '南国亭　渋谷一号店',
    url: 'https://www.hotpepper.jp/strJ000725631/',
    latitude: 35.654612561513666,
    longitude: 139.7080015558859,
    congestion: '混みにくい',
    distance: 770,
    star: 3.7,
    genre: '中華',
    image_url: 'https://imgfp.hotp.jp/IMGH/31/09/P031543109/P031543109_480.jpg',
    budget: '夜2001～3000円 昼501～1000円',
    feature: '中華火鍋食べ放題の南国亭は、素晴らしい料理とコストパフォーマンスで満足度が高いお店です。友人や家族との食事に最適で、感染症対策もしっかりしています。',
    recommend_reason: '南国亭は、中華火鍋食べ放題でおなじみのお店です。素晴らしい料理とコストパフォーマンスで満足度が高く、友人や家族との食事に最適です。感染症対策もしっかりしているので安心して食事を楽しめます。混雑度合いも比較的少ないので、リラックスして食事を楽しむことができます。南国亭で美味しい料理を堪能しながら、素敵な時間を過ごしませんか？'
  },
  {
    name: '中華バル池湖',
    url: 'https://www.hotpepper.jp/strJ001160898/',
    latitude: 35.65969806365134,
    longitude: 139.6955480379991,
    congestion: '普通',
    distance: 480,
    star: 4.6,
    genre: '中華',
    image_url: 'https://www.hotpepper.jp/IMGH/46/49/P026084649/P026084649_480.jpg',
    budget: '夜3001~4000円　昼501~1000円',
    feature: 'オープンな厨房で中華料理の名匠の元で修業を受けたシェフが料理を作る様子を見ることができ、カウンター席では外を眺めながらゆっくりと食事を楽しめる隠れ家的なお店です。',
    recommend_reason: '中華バル池湖は、オープンな厨房で中華料理の名匠の元で修業を受けたシェフが料理を作る様子を見ることができ、カウンター席では外を眺めながらゆっくりと食事を楽しめる隠れ家的なお店です。料理のクオリティとシェフの技術が堪能できるため、中華料理ファンにはおすすめです。'
  },
  {
    name: 'バンコクナイト渋谷',
    url: 'https://www.hotpepper.jp/strJ003532994/',
    latitude: 35.66267112991342,
    longitude: 139.6970572675343,
    congestion: '普通',
    distance: 640,
    star: 4.5,
    genre: 'アジア・エスニック料理',
    image_url: 'https://imgfp.hotp.jp/IMGH/73/08/P041737308/P041737308_480.jpg',
    budget: '夜2001～3000円 昼1001～1500円',
    feature: '感染症対策をしっかりと行っており、禁煙であり、40席の座席数を持ち、Wi-Fiや英語メニューも提供しているバンコクナイト 渋谷は、おしゃれな雰囲気と美味しい料理が人気の特徴です。',
    recommend_reason: 'バンコクナイト渋谷は感染症対策がしっかりしており、禁煙で40席の座席数を持つおしゃれなアジア・エスニック料理店です。Wi-Fiや英語メニューも提供されており、外国人の方にもオススメです。美味しい料理を食べながらリラックスした雰囲気を楽しめることで、ストレスを解消できるでしょう。'
  },
  {
    name: '食べ放題と飲み放題のお店　渋谷　サパナ',
    url: 'https://www.hotpepper.jp/strJ000748881/',
    latitude: 35.655198508113195,
    longitude: 139.70666897588183,
    congestion: '混みにくい',
    distance: 660,
    star: 3.8,
    genre: 'アジア・エスニック料理',
    image_url: 'https://imgfp.hotp.jp/IMGH/00/26/P036120026/P036120026_480.jpg',
    budget: '夜1501～2000円 昼501～1000円',
    feature: 'コストパフォーマンスが素晴らしく、料理の味も素晴らしいお店で、来店者の97%が満足しています。一人での来店が59%で、にぎやかで落ち着いた雰囲気のお店です。感染症対策もしっかりと行われています。',
    recommend_reason: 'おすすめ理由：コストパフォーマンスが素晴らしく、味も素晴らしい食べ放題と飲み放題のお店です。落ち着いた雰囲気で、ひとりでも気軽に訪れやすいお店です。感染症対策もしっかり実施されています。自分時間を楽しみながらリラックスできること間違いなし！'
  },
  {
    name: 'Disney HARVEST MARKET 渋谷ヒカリエ店',
    url: 'https://www.hotpepper.jp/strJ003851235/',
    latitude: 35.65925798268151,
    longitude: 139.70380957802203,
    congestion: '混みやすい',
    distance: 350,
    star: 4,
    genre: 'カフェ・スイーツ',
    image_url: 'https://www.hotpepper.jp/IMGH/49/72/P044984972/P044984972_480.jpg',
    budget: '夜2001~3000円　昼1501~2000円',
    feature: 'ディズニーオリジナルアートを楽しめる、キャラクターモチーフのメニューが豊富で、落ち着いた雰囲気の店内が特徴です。',
    recommend_reason: 'ディズニー HARVEST MARKET 渋谷ヒカリエ店は、ディズニーオリジナルアートを楽しめる、キャラクターモチーフのメニューが豊富で、落ち着いた雰囲気の店内が特徴です。ディズニーファンにとってはまさに夢の空間。ディズニーの世界に浸れる経験をすることができ、特別感満載です。ディズニーの特別な雰囲気を味わいたい方におすすめです。'
  },
  {
    name: 'リゾットカフェ　東京基地　渋谷',
    url: 'https://www.hotpepper.jp/strJ000748892/',
    latitude: 35.66047162145049,
    longitude: 139.69845151896018,
    congestion: '混みやすい',
    distance: 350,
    star: 3.7,
    genre: 'カフェ・スイーツ',
    image_url: 'https://www.hotpepper.jp/IMGH/76/75/P031947675/P031947675_480.jpg',
    budget: '夜1501~2000円　昼501~1000円',
    feature: '料理・味、雰囲気ともに素晴らしく、来店者の95%が満足している。友人・知人との来店が多く、にぎやかで落ち着いた雰囲気が特徴。感染症対策も徹底しており、安心して利用できる。',
    recommend_reason: 'リゾットカフェ東京基地は、料理・味・雰囲気が素晴らしく、95%の来店者が満足しています。店内は友人や知人との集まりにぴったりで、にぎやかでありながら落ち着いた雰囲気が特徴です。また、感染症対策も徹底しており、安心して利用できるところもポイントです。これらの理由から、リゾットカフェ東京基地はあなたにおすすめします。'
  },
  {
    name: '椿サロン　渋谷',
    url: 'https://www.hotpepper.jp/strJ001265191/',
    latitude: 35.66010512911498,
    longitude: 139.69537518461672,
    congestion: '普通',
    distance: 520,
    star: 4,
    genre: 'カフェ・スイーツ',
    image_url: 'https://www.hotpepper.jp/IMGH/92/35/P037429235/P037429235_480.jpg',
    budget: '夜1501~2000円　昼1501~2000円',
    feature: '料理と雰囲気が素晴らしく、来店者の96%が満足しているお店。友人や知人との来店が多く、落ち着いた雰囲気でリラックスできる。',
    recommend_reason: '椿サロン 渋谷は料理と雰囲気が素晴らしく、来店者の96%が満足しているお店です。友人や知人との来店が多く、落ち着いた雰囲気でリラックスできます。美味しい料理と心地よい空間で、日常の喧騒を忘れてくつろぎたい時に最適です。'
  },
  {
    name: 'シブヤショクドウ ヴェントゥーノ トウキョウ (渋谷食堂 Ventuno Tokyo)',
    url: 'https://www.hotpepper.jp/strJ000000711/',
    latitude: 35.66056773017269,
    longitude: 139.7012287639754,
    congestion: '混みにくい',
    distance: 320,
    star: 3.9,
    genre: '洋食',
    image_url: 'https://imgfp.hotp.jp/IMGH/84/14/P042718414/P042718414_480.jpg',
    budget: '夜3001～4000円 昼1001～1500円',
    feature: '渋谷にある「シブヤショクドウ ヴェントゥーノ トウキョウ」は、素晴らしい雰囲気と料理で来店者の95%以上が満足しています。友人や家族との来店が多く、感染症対策もしっかりしています。',
    recommend_reason: '「シブヤショクドウ ヴェントゥーノ トウキョウ」は、渋谷にある洋食のお店です。店内は素晴らしい雰囲気で、料理もとても美味しいと評判です。来店者の95%以上が満足しており、友人や家族とのお食事にぴったりです。また、感染症対策もしっかりと行われているので安心して楽しめます。周りの環境を気にせず、リラックスした雰囲気の中で美味しい料理を楽しみたい方におすすめです。'
  },
  {
    name: 'ocean good table 渋谷',
    url: 'https://www.hotpepper.jp/strJ003721001/',
    latitude: 35.65754385027929,
    longitude: 139.70364875162264,
    congestion: '混みにくい',
    distance: 270,
    star: 4.5,
    genre: '洋食',
    image_url: 'https://imgfp.hotp.jp/IMGH/79/09/P043817909/P043817909_480.jpg',
    budget: '夜5001～7000円 昼1501～2000円',
    feature: '禁煙のお店で、お子様やペット同伴不可。飲み放題あり、ウェディングパーティーや二次会にも対応。カクテルやワインが充実している。',
    recommend_reason: '「ocean good table 渋谷」は、禁煙でお子様やペット同伴不可のお店です。飲み放題やウェディングパーティーや二次会にも対応し、カクテルやワインの種類も豊富です。落ち着いた雰囲気でゆったりと食事を楽しめるお店です。デートや友人との飲み会にぴったり。'
  },
  {
    name: "TOKYO FISHERMAN'S WHARF 　魚秀～UOHIDE～渋谷宇田川店",
    url: 'https://www.hotpepper.jp/strJ001260405/',
    latitude: 35.661641976952914,
    longitude: 139.69690809821597,
    congestion: '普通',
    distance: 530,
    star: 3.8,
    genre: '洋食',
    image_url: 'https://imgfp.hotp.jp/IMGH/09/69/P045040969/P045040969_480.jpg',
    budget: '夜3001～4000円 昼1001～1500円',
    feature: '素晴らしい料理と味を提供し、来店者の87%が満足している渋谷の居酒屋。友人や知人との来店が多く、にぎやかで落ち着いた雰囲気が特徴。感染症対策もしっかりと行われている。',
    recommend_reason: "TOKYO FISHERMAN'S WHARF 魚秀～UOHIDE 渋谷宇田川店は、素晴らしい料理と味を提供する居酒屋です。来店者の87%が満足しており、友人や知人との集まりにぴったりです。にぎやかで落ち着いた雰囲気が特徴で、感染症対策もしっかり行われています。お店の人気は料理の美味しさと居心地の良さにあります。洋食ジャンルの中でも異彩を放つ一軒で、食事を楽しみながら心地よい時間を過ごせることで、リピーターも多いです。"
  },
  {
    name: '小さな韓国 あぷろ 東京渋谷店',
    url: 'https://www.hotpepper.jp/strJ003411203/',
    latitude: 35.65719136390699,
    longitude: 139.6974709668345,
    congestion: '混みやすい',
    distance: 270,
    star: 4.2,
    genre: '韓国料理',
    image_url: 'https://www.hotpepper.jp/IMGH/77/26/P043297726/P043297726_480.jpg',
    budget: '夜3001~4000円　昼1001~1500円',
    feature: '料理や味、雰囲気、お店の特長など、全体的に素晴らしい評価を受けている韓国料理店。友人や知人との来店が多く、KPOPが流れる楽しい雰囲気が特徴です。',
    recommend_reason: '小さな韓国 あぷろ 東京渋谷店は、料理や味、雰囲気、お店の特長など、全体的に素晴らしい評価を受けている韓国料理店です。友人や知人との来店が多く、KPOPが流れる楽しい雰囲気が特徴。おすすめ理由は、友人や知人と楽しいひとときを過ごしたい時にピッタリなお店であり、KPOPが流れる雰囲気も魅力的です。'
  },
  {
    name: '本場韓国料理×屋台居酒屋 - MAYAK POCHA -マヤクポチャ　渋谷本店',
    url: 'https://www.hotpepper.jp/strJ003411778/',
    latitude: 35.66035043067792,
    longitude: 139.69892446683465,
    congestion: '普通',
    distance: 320,
    star: 2.9,
    genre: '韓国料理',
    image_url: 'https://www.hotpepper.jp/IMGH/77/86/P040717786/P040717786_480.jpg',
    budget: '夜2001~3000円　昼1501~2000円',
    feature: '友人や知人との来店が多く、にぎやかで落ち着いた雰囲気が特徴の焼肉店。感染症対策も徹底し、安心して食事を楽しめる環境が整っている。',
    recommend_reason: 'MAYAK POCHAは本場韓国料理を楽しめる屋台居酒屋。「友人や知人との来店が多く、にぎやかで落ち着いた雰囲気が特徴の焼肉店」であり、感染症対策も徹底されており安心して食事を楽しめる環境が整っています。本場の韓国料理をリーズナブルな価格で楽しめるため、友人や知人との集まりに最適です。'
  },
  {
    name: '韓国料理 ホンデポチャ 渋谷店',
    url: 'https://www.hotpepper.jp/strJ001234234/',
    latitude: 35.661755594974395,
    longitude: 139.6976642415076,
    congestion: '混みやすい',
    distance: 510,
    star: 4,
    genre: '韓国料理',
    image_url: 'https://www.hotpepper.jp/IMGH/12/91/P045221291/P045221291_480.jpg',
    budget: '夜2001~3000円　昼1001~1500円',
    feature: '料理・味、雰囲気ともに素晴らしい焼肉店。友人・知人との来店が多く、にぎやかで落ち着いた雰囲気が特徴。感染症対策もしっかりしており、全席禁煙。',
    recommend_reason: '「韓国料理 ホンデポチャ 渋谷店」は料理・味、雰囲気ともに素晴らしい焼肉店です。友人・知人との来店が多く、にぎやかで落ち着いた雰囲気が特徴。感染症対策もしっかりしており、全席禁煙のため、安心して食事を楽しめます。おすすめする理由は、リラックスした雰囲気で友人や知人と楽しい時間を過ごせる点と、安全面においても配慮が行き届いている点です。'
  },
  {
    name: 'シェーキーズ　渋谷センター街店',
    url: 'https://www.hotpepper.jp/strJ001277008/',
    latitude: 35.661123579833166,
    longitude: 139.69774293869912,
    congestion: '普通',
    distance: 440,
    star: 3.8,
    genre: 'イタリアン・フレンチ',
    image_url: 'https://imgfp.hotp.jp/IMGH/83/48/P036378348/P036378348_480.jpg',
    budget: '夜2001～3000円 昼1501～2000円',
    feature: 'この店は、料理や味、接客、サービスが素晴らしいと評価されており、友人や知人との来店が多いです。お店の雰囲気はにぎやかで落ち着いており、全席禁煙です。感染症対策もしっかりしています。',
    recommend_reason: 'シェーキーズ 渋谷センター街店は、料理や味、接客、サービスが素晴らしいと評価されており、友人や知人との来店が多いお店です。にぎやかで落ち着いた雰囲気で、全席禁煙であり、感染症対策もしっかりしています。ユーザーがリラックスして美味しい料理を楽しめる理想的な環境です。'
  },
  {
    name: '港町のイタリアン モンテロッソ',
    url: 'https://www.hotpepper.jp/strJ003828090/',
    latitude: 35.65923843322741,
    longitude: 139.69901919751854,
    congestion: '混みやすい',
    distance: 210,
    star: 4.3,
    genre: 'イタリアン・フレンチ',
    image_url: 'https://www.hotpepper.jp/IMGH/39/18/P044693918/P044693918_480.jpg',
    budget: '夜4001~5000円　昼1001~1500円',
    feature: '渋谷駅から徒歩1分の好立地にあり、イタリアの街並みをイメージしたカラフルで可愛らしい店内が特徴。本場イタリアの味を楽しめる料理や、4～6名様用の半個室も完備しており、様々なシーンで利用可能。',
    recommend_reason: '港町のイタリアン モンテロッソは、渋谷駅から徒歩1分の好立地にあり、イタリアの街並みをイメージしたカラフルで可愛らしい店内が特徴です。本場イタリアの味を楽しめる料理や、4～6名様用の半個室も完備しており、様々なシーンで利用可能。温かみのある雰囲気で、デートや女子会に最適。'
  },
  {
    name: 'nurikabe cafe SSS(エスリー) 渋谷',
    url: 'https://www.hotpepper.jp/strJ003599112/',
    latitude: 35.65710330779303,
    longitude: 139.70488369382153,
    congestion: '混みやすい',
    distance: 420,
    star: 4.5,
    genre: 'イタリアン・フレンチ',
    image_url: 'https://www.hotpepper.jp/IMGH/90/00/P042449000/P042449000_480.jpg',
    budget: '夜3001~4000円　昼1001~1500円',
    feature: 'とても素晴らしい雰囲気と料理・味で、友人・知人との来店が多く、記念日やサプライズにも人気。感染症対策もしっかりしており、全席禁煙で32席の店内はWi-Fi完備。',
    recommend_reason: 'nurikabe cafe SSS(エスリー) 渋谷は、雰囲気と料理・味が素晴らしいお店です。友人や知人との来店が多く、記念日やサプライズにもぴったり。感染症対策がしっかりしており、全席禁煙でWi-Fi完備の32席の店内は落ち着いた雰囲気。久々の再会や特別な日におすすめ。'
  },
  {
    name: 'らーめんと甘味処 九月堂',
    url: 'https://www.hotpepper.jp/strJ000796033/',
    latitude: 35.66407143879461,
    longitude: 139.6993981252049,
    congestion: '混みにくい',
    distance: 710,
    star: 3.9,
    genre: 'ラーメン',
    image_url: 'https://imgfp.hotp.jp/IMGH/00/61/P028070061/P028070061_480.jpg',
    budget: '夜1001～1500円 昼501～1000円',
    feature: '感染症対策を徹底し、お客様への取り組みや従業員の安全衛生管理を行っているお店。全席禁煙で16席のお席があり、カウンターやソファー席も用意されている。英語メニューもあり、お子様連れ歓迎でウェディングパーティーも可能。',
    recommend_reason: '九月堂は感染症対策を徹底し、従業員の安全衛生管理を行っているラーメン店です。全席禁煙で、16席のお席があり、カウンターやソファー席も用意されています。英語メニューもあり、お子様連れ歓迎でウェディングパーティーも可能です。お店の雰囲気も居心地が良く、安心して食事を楽しむことができるでしょう。'
  },
  {
    name: 'らーめん金伝丸　渋谷本店',
    url: 'https://www.hotpepper.jp/strJ000104478/',
    latitude: 35.66039048733747,
    longitude: 139.69945261677972,
    congestion: '普通',
    distance: 300,
    star: 3.6,
    genre: 'ラーメン',
    image_url: 'https://imgfp.hotp.jp/IMGH/42/38/P027294238/P027294238_480.jpg',
    budget: '夜501～2000円 昼501～1000円',
    feature: 'ラーメン金伝丸渋谷本店は、一人での来店が多く、にぎやかで落ち着いた雰囲気が特徴です。感染症対策もしっかりしており、全席禁煙で18席の席数があります。',
    recommend_reason: 'らーめん金伝丸渋谷本店は、一人での来店が多く、にぎやかで落ち着いた雰囲気が特徴です。感染症対策もしっかりしており、全席禁煙で18席の席数があります。一人でも気軽に入れる雰囲気と清潔な空間が魅力。ぜひラーメンを食べつつ、リラックスした時間を過ごしてみては。'
  },
  {
    name: '長崎飯店　渋谷店',
    url: 'https://www.hotpepper.jp/strJ000005277/',
    latitude: 35.65756484948631,
    longitude: 139.69987862282474,
    congestion: '普通',
    distance: 50,
    star: 3.9,
    genre: 'ラーメン',
    image_url: 'https://imgfp.hotp.jp/IMGH/86/89/P024638689/P024638689_480.jpg',
    budget: '夜2001～3000円 昼501～1000円',
    feature: '渋谷駅から徒歩圏内に位置し、全席喫煙可の中華料理店。広々とした店内で最大25名までの宴会も可能。ランチ平均880円でリーズナブル。',
    recommend_reason: '長崎飯店 渋谷店は、渋谷駅から徒歩圏内に位置する全席喫煙可の中華料理店です。広々とした店内で最大25名までの宴会も可能で、リーズナブルなランチが魅力です。落ち着いた雰囲気でゆっくりお食事を楽しめるお店です。渋谷でリーズナブルで美味しい中華料理を楽しみたい方におすすめです。'
  },
  {
    name: '本格大衆焼肉　飯田屋渋谷本店',
    url: 'https://www.hotpepper.jp/strJ003672472/',
    latitude: 35.65725667257084,
    longitude: 139.69680192450556,
    congestion: '混みやすい',
    distance: 320,
    star: 3.9,
    genre: '焼肉・ホルモン',
    image_url: 'https://www.hotpepper.jp/IMGH/53/38/P043905338/P043905338_480.jpg',
    budget: '夜7001~10000円　昼1501~2000円',
    feature: '本格大衆焼肉飯田屋渋谷本店は、全席禁煙で34席あり、Wi-Fi完備。飲み放題あり、お子様連れOK。貸切可で、客層は男女半々。来店ピーク時間は21時まで。',
    recommend_reason: '本格大衆焼肉飯田屋渋谷本店は全席禁煙でWi-Fi完備の34席あり、飲み放題やお子様連れOKなど、幅広いニーズに対応しています。さらに貸切も可能で、男女客が半々でリラックスして楽しめる空間です。ピーク時間も21時までと遅い時間まで利用できます。リラックスしながら本格的な焼肉を楽しめるお店です。'
  },
  {
    name: '黒毛和牛 焼肉食べ放題 縁（えん）渋谷店',
    url: 'https://www.hotpepper.jp/strJ001137327/photo/',
    latitude: 35.65907527880582,
    longitude: 139.69695310931849,
    congestion: '混みやすい',
    distance: 350,
    star: 4.5,
    genre: '焼肉・ホルモン',
    image_url: 'https://www.hotpepper.jp/IMGH/78/32/P034177832/P034177832_480.jpg',
    budget: '夜2001～3000円 昼501~1000円',
    feature: '黒毛和牛の焼肉食べ放題と飲み放題が特徴の縁（えん）渋谷店。',
    recommend_reason: '縁渋谷店は、黒毛和牛の焼肉食べ放題と飲み放題が特徴的。新鮮なお肉を存分に楽しめることから、贅沢な食事を楽しみたい方におすすめ。リーズナブルな価格で、食べ放題コースも用意されているので、友人や家族との食事にも最適。自分好みの焼き加減で焼きながら楽しむことができるため、楽しい食体験を提供してくれるお店です。'
  },
  {
    name: '松尾ジンギスカン　渋谷パルコ店',
    url: 'https://www.hotpepper.jp/strJ001282079/',
    latitude: 35.66222216251362,
    longitude: 139.69894068389058,
    congestion: '普通',
    distance: 530,
    star: 4.2,
    genre: '焼肉・ホルモン',
    image_url: 'https://imgfp.hotp.jp/IMGH/30/52/P038963052/P038963052_480.jpg',
    budget: '夜1501～2000円 昼1501～2000円',
    feature: '感染症対策を徹底し、お客様への取り組みや従業員の安全衛生管理を行っています。全席禁煙で、店内の衛生管理も徹底しています。',
    recommend_reason: '松尾ジンギスカン 渋谷パルコ店は、感染症対策を徹底し、全席禁煙の清潔な空間で安心して食事が楽しめるお店です。従業員の安全衛生管理も行っており、安心して美味しいジンギスカンを堪能できます。お店の雰囲気は明るく、スタッフの対応も親しみやすいです。安全に配慮された美味しい焼肉を楽しめるので、リラックスしながら食事を楽しみたい方におすすめです。'
  },
  {
    name: '結亭　渋谷明治通り店',
    url: 'https://www.hotpepper.jp/strJ003853003/',
    latitude: 35.65647607987124,
    longitude: 139.70522140046745,
    congestion: '普通',
    distance: 500,
    star: 3,
    genre: 'その他グルメ',
    image_url: 'https://imgfp.hotp.jp/IMGH/46/82/P044934682/P044934682_480.jpg',
    budget: '夜1001～1500円 昼501～1000円',
    feature: '結亭 渋谷明治通り店は、JR山手線や地下鉄にアクセスしやすい場所に位置しており、ランチやディナーに利用しやすいお店です。利用可能な支払い方法も豊富で、禁煙の環境でお子様連れには不向きです。',
    recommend_reason: '結亭 渋谷明治通り店は、交通の便が良く、豊富な支払い方法が利用できるお店です。禁煙の環境なので、タバコの煙を気にせず、快適に食事を楽しめます。お子様連れには不向きなので、落ち着いた雰囲気でゆっくりと食事を楽しみたい方におすすめです。'
  },
  {
    name: 'サラダデリマルゴ しぶちか店',
    url: 'https://www.hotpepper.jp/strJ002648135/',
    latitude: 35.65876402247502,
    longitude: 139.7008084269895,
    congestion: '普通',
    distance: 150,
    star: 3.2,
    genre: 'その他グルメ',
    image_url: 'https://imgfp.hotp.jp/IMGH/77/23/P039507723/P039507723_480.jpg',
    budget: '夜1501～2000円 昼1501～2000円',
    feature: '感染症対策を徹底し、入店時の検温やマスク着用、消毒液設置などを行っているサラダデリマルゴ しぶちか店。',
    recommend_reason: 'サラダデリマルゴ しぶちか店は、感染症対策が徹底されており、入店時に検温やマスク着用、消毒液設置などが行われています。店内は清潔で安心感があり、新鮮なサラダやデリが豊富に揃っています。地元の新鮮な食材を使用した料理は、美味しさと健康を両立させています。是非、安心して美味しい食事を楽しめるサラダデリマルゴ しぶちか店をお試しください。'
  },
  {
    name: 'ジビエ居酒屋 米とサーカス 高田馬場',
    url: 'https://www.hotpepper.jp/strJ000971939/',
    latitude: 35.71963292872577,
    longitude: 139.70497164924913,
    congestion: '混みにくい',
    distance: 6300,
    star: 4,
    genre: 'その他グルメ',
    image_url: 'https://imgfp.hotp.jp/IMGH/33/33/P041493333/P041493333_480.jpg',
    budget: '夜3001～4000円 昼1001～1500円',
    feature: 'アジアのサーカス小屋をテーマにした店内はカラフルで面白く、非日常感を味わえるが、温もりも感じられる。誕生日にはケーキのプレゼントもあり、お祝いに最適な隠れ家レストラン。',
    recommend_reason: '「ジビエ居酒屋 米とサーカス 高田馬場」は、アジアのサーカス小屋をテーマにしたカラフルで面白い店内が特徴です。非日常感を楽しめる一方で、温かみも感じられる雰囲気があります。また、誕生日にはケーキのプレゼントもあるため、お祝いに最適な隠れ家レストランとしてもおすすめです。店内の雰囲気やサービスに癒されながら特別な時間を過ごせます。'
  }
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
window.onload = () => {
  // ジャンルをランダムに選択
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const recommendedRestaurantList = restaurantList.filter(
    (restaurantList) => restaurantList.genre === genre,
  );
  // 一つのジャンルの飲食店たちからランダムに飲食店を抽出
  const restaurantData =
    recommendedRestaurantList[
      Math.floor(Math.random() * recommendedRestaurantList.length)
    ];
  // 画面に表示
  showRestaurant(restaurantData);
};

function showRestaurant(restaurantData) {
  document.getElementById("restaurantImage").src = restaurantData.image_url;
  document.getElementById("restaurantName").textContent = restaurantData.name;
  document.getElementById("restaurantGenre").textContent = restaurantData.genre;
  document.getElementById("restaurantBudget").textContent =
    restaurantData.budget;
  document.getElementById("restaurantDistance").textContent =
    restaurantData.distance + "m";
  document.getElementById("restaurantCongestion").textContent =
    restaurantData.congestion;
  document.getElementById("restaurantStar").textContent = restaurantData.star;
  document.getElementById("restaurantRecommendReason").textContent =
    restaurantData.recommend_reason;

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
}
