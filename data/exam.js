/* =========================================================
   KET 真题题型素材库（A2 Key for Schools 官方题型）
   read1 = Reading Part 1 短文本主旨（6 题/套）
   read2 = Reading Part 2 三短文匹配（7 题/组）
   write6 = Writing Part 6 邮件/便条 25 词（3 个要点）
   write7 = Writing Part 7 看图写故事 35 词（3 幅图）
   list2  = Listening Part 2 笔记填空（5 空/段，用 TTS 朗读）
   list1  = Listening Part 1 短对话三选一（emoji 当图片，用 TTS 朗读）
   list3  = Listening Part 3 长对话三选一（一段对话 5 题，用 TTS 朗读）
   grammar = A2 核心语法点（10 组 × 5 题，每题带一句中文解析）
   ========================================================= */
window.EXAM={

/* ---------------- Reading Part 1：标识 / 短信 / 便条 ---------------- */
read1:[
 {id:'r1a',title:'学校与日常',qs:[
  {t:'School trip tomorrow: bring a packed lunch and a water bottle. We will be back at 4 pm.',
   q:'What must students bring?',o:['Money to buy lunch','Some food and a drink','A school book'],a:1},
  {t:'LIBRARY: No food or drinks. Please put your phone on silent.',
   q:'What does this notice say?',o:['You can eat here.','You must be quiet and not eat.','Phones are not allowed.'],a:1},
  {t:'Swimming pool closed on Monday mornings for cleaning. Sorry!',
   q:'What does this notice say?',o:['The pool is open all day Monday.','The pool is closed on Monday morning.','The pool is closed all week.'],a:1},
  {t:'LOST: small black cat, answers to Milo. Phone 0770 900 312 if you see him.',
   q:'What is this notice about?',o:['Someone wants to sell a cat.','Someone cannot find their cat.','Someone is giving a cat away.'],a:1},
  {t:'Hi Sam, I am at the bus stop. The bus is late again! Wait for me at the cafe. Ana',
   q:'Where is Ana now?',o:['On the bus','At the bus stop','In the cafe'],a:1},
  {t:'SALE! All T-shirts half price — this week only.',
   q:'What does this notice say?',o:['T-shirts are cheaper this week.','T-shirts are free.','The shop is closing.'],a:0}
 ]},
 {id:'r1b',title:'出行与购物',qs:[
  {t:'Please pay for your tickets before you get on the train.',
   q:'What should you do?',o:['Buy a ticket first.','Pay on the train.','Travel without a ticket.'],a:0},
  {t:'Car park: FREE for the first two hours. £1 per hour after that.',
   q:'What does this mean?',o:['Parking is always free.','Two hours cost nothing, then you pay.','You can only park for two hours.'],a:1},
  {t:'Museum: Closed on Mondays. Open Tuesday to Sunday, 10 am – 5 pm.',
   q:'When can you visit?',o:['Monday morning','Sunday afternoon','Every day at 9 am'],a:1},
  {t:'Do not leave your bags here. Bags must go in a locker.',
   q:'What must you do with your bag?',o:['Carry it with you.','Put it in a locker.','Leave it on the floor.'],a:1},
  {t:'Thanks for the birthday present, Grandma! The blue scarf is perfect for winter. Love, Ella',
   q:'Why did Ella write this?',o:['To ask for a present','To say thank you','To sell a scarf'],a:1},
  {t:'Bike for sale: red, one year old, never used in rain. £60. Call Tom after 5 pm.',
   q:'What is Tom doing?',o:['Buying a bike','Selling a bike','Repairing a bike'],a:1}
 ]},
 {id:'r1c',title:'通知与提醒',qs:[
  {t:'Class 4B: Football practice after school is CANCELLED today because of the rain.',
   q:'What does this mean?',o:['Football is at a different time.','There is no football today.','Football is inside today.'],a:1},
  {t:'Please wash your hands before you eat. Thank you!',
   q:'Where might you see this?',o:['In a classroom','In a toilet or kitchen','In a bedroom'],a:1},
  {t:'DANGER: Do not swim here. Strong currents.',
   q:'What does this sign tell you?',o:['Swimming is safe here.','Swimming is not safe here.','The water is warm.'],a:1},
  {t:'Mum, I have gone to Lily\u2019s house. Back at six. I have my key. Joe',
   q:'Why did Joe write this note?',o:['To tell his mum where he is','To ask for money','To invite Lily home'],a:0},
  {t:'Tickets for the school play: £5 for adults, £3 for children. Buy them at the office.',
   q:'How much does a child pay?',o:['£5','£3','Nothing'],a:1},
  {t:'Sorry, no dogs in this park — except guide dogs.',
   q:'Which dog can go in the park?',o:['Any dog','No dogs at all','A guide dog'],a:2}
 ]},
 {id:'r1d',title:'周末与活动',qs:[
  {t:'Cinema: The 7 o\u2019clock film is fully booked. Try the 9 o\u2019clock show.',
   q:'What does this tell you?',o:['There are no tickets for 7 pm.','The cinema is closed.','The 9 pm film is cancelled.'],a:0},
  {t:'Football match moved to Sunday at 3 pm because the field is wet.',
   q:'When is the match now?',o:['Saturday at 3 pm','Sunday at 3 pm','Sunday at 7 pm'],a:1},
  {t:'Free Wi-Fi: ask at the desk for the password.',
   q:'What should you do to use the Wi-Fi?',o:['Pay at the desk','Ask for the password','Bring your own'],a:1},
  {t:'Keep off the grass. Please use the path.',
   q:'What does this sign say?',o:['Walk on the grass.','Do not walk on the grass.','Sit on the grass.'],a:1},
  {t:'Doctor\u2019s appointment: Thursday, 10.15. Please arrive ten minutes early.',
   q:'What time should the patient arrive?',o:['10.05','10.15','10.25'],a:0},
  {t:'Cookery club is full this term — but you can join in January.',
   q:'What does this mean?',o:['You can join now.','The club is closed forever.','You can join later.'],a:2}
 ]},
 {id:'r1e',title:'短信与小纸条',qs:[
  {t:'Can you bring my maths book to school tomorrow? I left it at your house. Thanks! Mia',
   q:'What does Mia want?',o:['Her book back','Help with maths','To go to your house'],a:0},
  {t:'Fresh bread every morning from 7 am. Closed on Sundays.',
   q:'When can you buy bread?',o:['Sunday evening','Monday morning','Saturday 6 am'],a:1},
  {t:'Fire exit — keep clear. Do not put boxes here.',
   q:'What does this notice say?',o:['Put boxes here.','Leave this space empty.','The door is broken.'],a:1},
  {t:'Josh — your piano lesson is at 5 today, not 4. See you there! Miss Grey',
   q:'What time is the lesson?',o:['4 o\u2019clock','5 o\u2019clock','6 o\u2019clock'],a:1},
  {t:'Please do not feed the animals. It makes them ill.',
   q:'What should visitors not do?',o:['Look at the animals','Give food to the animals','Take photos'],a:1},
  {t:'This machine is out of order. Use the one on the second floor.',
   q:'What should you do?',o:['Wait for this machine','Use a different machine','Go home'],a:1}
 ]}
],

/* ---------------- Reading Part 2：三篇短文匹配 ---------------- */
read2:[
 {id:'r2a',topic:'三个人的周末',texts:[
   {k:'A',t:'Tom: I stayed at home on Saturday because it rained. I played computer games and helped my mum make a cake. On Sunday the sun came out, so I rode my bike to the park with my friends.'},
   {k:'B',t:'Amara: My weekend was busy. On Saturday morning I had a swimming lesson, then I visited my grandmother. On Sunday my family drove to the beach. We ate fish and chips there.'},
   {k:'C',t:'Leo: I went camping with my dad on Saturday. We put up our tent near a river and cooked dinner on a fire. Sunday was quiet — I read a book and did my homework.'}
  ],
  qs:[
   {q:'Who stayed inside because of the weather?',a:0},
   {q:'Who went to the beach?',a:1},
   {q:'Who slept in a tent?',a:2},
   {q:'Who did something with their grandmother?',a:1},
   {q:'Who cooked food outside?',a:2},
   {q:'Who did school work at the weekend?',a:2},
   {q:'Who made something sweet to eat?',a:0}
  ]},
 {id:'r2b',topic:'三个学校的俱乐部',texts:[
   {k:'A',t:'Photography Club: Bring your own camera or use one of ours. We take photos around the school and learn how to make them look better on a computer. Thursdays, 4 pm.'},
   {k:'B',t:'Running Club: We run around the field for thirty minutes, then play games. You need comfortable shoes and a water bottle. No running if it rains. Tuesdays, 4 pm.'},
   {k:'C',t:'Chess Club: Learn how to play, or come and play against other students. We have a competition every month and the winner gets a small prize. Fridays, 3.30 pm.'}
  ],
  qs:[
   {q:'Which club is on Tuesday?',a:1},
   {q:'Which club gives a prize?',a:2},
   {q:'Which club is inside when it rains?',a:2},
   {q:'Which club uses a computer?',a:0},
   {q:'Which club needs special shoes?',a:1},
   {q:'Which club meets on Friday?',a:2},
   {q:'Which club has a competition?',a:2}
  ]},
 {id:'r2c',topic:'三种动物',texts:[
   {k:'A',t:'Penguins cannot fly, but they are excellent swimmers. They live in cold places and eat fish. They stand close together to keep warm in the wind.'},
   {k:'B',t:'Camels live in hot, dry places. They can go for many days without water. Their feet are wide, so they do not sink into the sand.'},
   {k:'C',t:'Parrots are colourful birds that can live for a very long time. They are clever and can learn to say words. They eat fruit, nuts and seeds.'}
  ],
  qs:[
   {q:'Which animal lives in a cold place?',a:0},
   {q:'Which animal can live without water for days?',a:1},
   {q:'Which animal can repeat words?',a:2},
   {q:'Which animal eats fish?',a:0},
   {q:'Which animal has wide feet?',a:1},
   {q:'Which animal is a bird?',a:2},
   {q:'Which animal stays together to keep warm?',a:0}
  ]},
 {id:'r2d',topic:'三个孩子的房间',texts:[
   {k:'A',t:'My room is small but I like it. I have a bed by the window and a shelf with all my books. There is a big map of the world on my wall because I want to travel.'},
   {k:'B',t:'My room is always a mess, my mum says. I have got two guitars, some posters of my favourite band and a very old computer. I do my homework at the kitchen table.'},
   {k:'C',t:'I share a room with my little sister. It is pink and there are two beds. We have a box of toys under the window and a small desk where we draw.'}
  ],
  qs:[
   {q:'Who shares a room?',a:2},
   {q:'Who has a map on the wall?',a:0},
   {q:'Who plays a musical instrument?',a:1},
   {q:'Who does homework in another room?',a:1},
   {q:'Who has got a lot of books?',a:0},
   {q:'Who has toys in their room?',a:2},
   {q:'Who likes a band?',a:1}
  ]}
],

/* ---------------- Writing Part 6：邮件 / 便条（25 词以上，3 个要点） ---------------- */
write6:[
 {id:'w6a',to:'your English friend, Alex',situation:'You want to go to the cinema with Alex on Saturday.',
  pts:['say which film you want to see','say what time you want to meet','say where you will meet']},
 {id:'w6b',to:'your friend, Sam',situation:'You cannot go to Sam\u2019s house today.',
  pts:['say why you cannot come','say what you will do tomorrow','ask Sam to bring your book to school']},
 {id:'w6c',to:'your teacher, Mr Brown',situation:'You were not at school yesterday.',
  pts:['say why you were not there','say what you did at home','ask about the homework']},
 {id:'w6d',to:'your friend, Lily',situation:'You are having a birthday party.',
  pts:['say when the party is','say where it is','ask Lily to bring something']},
 {id:'w6e',to:'your cousin, Ben',situation:'You went on a school trip last week.',
  pts:['say where you went','say what you did there','say if you liked it']},
 {id:'w6f',to:'your friend, Mia',situation:'You want to play tennis this weekend.',
  pts:['say which day is better for you','say what time','say what Mia should bring']},
 {id:'w6g',to:'your mum',situation:'You are at a friend\u2019s house and you will be late.',
  pts:['say where you are','say what time you will be home','say what you want for dinner']},
 {id:'w6h',to:'your new penfriend, Zoe',situation:'Zoe wrote to you for the first time.',
  pts:['say thank you for the email','tell her about your family','ask her about her hobbies']}
],

/* ---------------- Writing Part 7：看图写故事（35 词以上，3 幅图） ---------------- */
write7:[
 {id:'w7a',pics:['A boy is walking to school with his umbrella.','The wind takes his umbrella and it flies away.','A man catches the umbrella and gives it back to him.']},
 {id:'w7b',pics:['A girl is looking for her cat in the garden.','She finds the cat in a tall tree.','She calls her dad and he carries the cat down.']},
 {id:'w7c',pics:['A family is cooking dinner in the kitchen.','The food starts to burn in the pan.','They all laugh and eat bread and cheese instead.']},
 {id:'w7d',pics:['Two children are playing football in the park.','The ball goes into a small river.','A dog jumps in and brings the ball back.']},
 {id:'w7e',pics:['A girl is painting a picture at the table.','Her little brother puts his hand in the paint.','They paint a picture together and it looks great.']},
 {id:'w7f',pics:['A boy is riding his bike very fast.','He falls off his bike near his house.','His sister helps him and cleans his knee.']}
],

/* ---------------- Listening Part 2：独白笔记填空（用 TTS 朗读） ---------------- */
list2:[
 {id:'l2a',title:'学校的戏剧演出',mono:'Hello everyone. Our school play is on Friday the fifteenth of November. It starts at seven o\u2019clock in the evening and finishes at about nine. Tickets cost five pounds for adults and three pounds for children. You can buy them from the school office.',
  notes:[{q:'Day:',a:'Friday'},{q:'Date:',a:'15 November'},{q:'Start time:',a:'7 pm'},{q:'Adult ticket:',a:'£5'},{q:'Child ticket:',a:'£3'}]},
 {id:'l2b',title:'周末的动物园之行',mono:'Good morning, class. Our trip to the zoo is next Saturday. The bus leaves the school at eight thirty and we come back at five o\u2019clock. Please bring a packed lunch and some water. The zoo has got about two hundred animals and we will see the penguins at eleven.',
  notes:[{q:'Day:',a:'Saturday'},{q:'Bus leaves at:',a:'8.30'},{q:'Come back at:',a:'5 pm'},{q:'Bring:',a:'lunch and water'},{q:'Penguin time:',a:'11 o\u2019clock'}]},
 {id:'l2c',title:'新游泳课',mono:'The new swimming classes start on the third of October. There are two classes every week, on Monday and Thursday, from four until five o\u2019clock. Each lesson costs six pounds. Please bring a towel and do not forget your swimming hat.',
  notes:[{q:'Starts:',a:'3 October'},{q:'Day 1:',a:'Monday'},{q:'Day 2:',a:'Thursday'},{q:'Price:',a:'£6'},{q:'Bring:',a:'towel and hat'}]},
 {id:'l2d',title:'图书馆通知',mono:'The school library will be closed on Wednesday afternoon because we are getting new books. It opens again at nine o\u2019clock on Thursday morning. You can borrow four books at a time and you can keep them for three weeks. Please return them on time!',
  notes:[{q:'Closed:',a:'Wednesday afternoon'},{q:'Opens again:',a:'Thursday 9 am'},{q:'Books you can borrow:',a:'4'},{q:'Keep them for:',a:'3 weeks'},{q:'Why closed:',a:'new books'}]},
 {id:'l2e',title:'生日聚会邀请',mono:'This is a message for all of Ellie\u2019s friends. Her birthday party is on Sunday the twenty-second of June, from two until five o\u2019clock. It is at the Blue Cafe next to the park. Please bring a small present, but do not bring any food. See you there!',
  notes:[{q:'Day:',a:'Sunday'},{q:'Date:',a:'22 June'},{q:'Time:',a:'2 pm to 5 pm'},{q:'Place:',a:'Blue Cafe'},{q:'Do not bring:',a:'food'}]},
 {id:'l2f',title:'运动会',mono:'Sports day is on the tenth of May. It starts at ten in the morning and finishes at three in the afternoon. Please wear your house T-shirt — red, blue or green — and bring a hat because it may be sunny. Parents are welcome to come and watch.',
  notes:[{q:'Date:',a:'10 May'},{q:'Starts:',a:'10 am'},{q:'Finishes:',a:'3 pm'},{q:'Wear:',a:'house T-shirt'},{q:'Bring:',a:'a hat'}]}
],

/* ---------------- Listening Part 1：短独白三选一（emoji 当图片） ---------------- */
list1:[
 {id:'l1a',title:'日常活动',qs:[
  {mono:'Peter gets up at seven every day. He has bread and milk for breakfast, then he rides his bike to school.',q:'How does Peter go to school?',o:['🚲 By bike','🚌 By bus','🚶 On foot'],a:0},
  {mono:'Yesterday it rained all morning, so Anna stayed at home and read a book. In the afternoon the sun came out and she played in the garden.',q:'What did Anna do in the morning?',o:['📖 Read a book','🌱 Played in the garden','🛒 Went shopping'],a:0},
  {mono:'The school concert is on Friday evening. Tickets are five pounds for adults and three pounds for children.',q:'How much is a child\u2019s ticket?',o:['£5','£3','£8'],a:1},
  {mono:'My brother loves animals. His favourite animal is the panda, but he also likes dolphins and penguins.',q:'Which animal does he like best?',o:['🐼 Panda','🐬 Dolphin','🐧 Penguin'],a:0},
  {mono:'Lucy was late for school because the bus did not come. She waited for twenty minutes at the bus stop.',q:'Why was Lucy late?',o:['🚌 The bus was late','🌧️ It rained','🛏️ She got up late'],a:0}
 ]},
 {id:'l1b',title:'地点与方向',qs:[
  {mono:'To get to the library, go straight on and turn left at the bank. It is next to the post office.',q:'Where is the library?',o:['🏦 Next to the bank','📮 Next to the post office','🏫 Next to the school'],a:1},
  {mono:'Tom left his phone at home, so he could not call his friend. He sent an email from the computer instead.',q:'How did Tom contact his friend?',o:['📱 By phone','💻 By email','✉️ By letter'],a:1},
  {mono:'The new sports centre opens at six in the morning and closes at ten at night. It is closed on Mondays.',q:'When is the sports centre closed?',o:['On Mondays','On Sundays','On Saturdays'],a:0},
  {mono:'Sara is looking for her cat. It is a small white cat and it is sleeping under the bed.',q:'Where is the cat?',o:['🛏️ Under the bed','🪑 On the chair','📦 In a box'],a:0},
  {mono:'At the zoo we saw the monkeys first, then the elephants, and last of all the birds.',q:'What did they see last?',o:['🐵 Monkeys','🐘 Elephants','🦜 Birds'],a:2}
 ]},
 {id:'l1c',title:'食物与健康',qs:[
  {mono:'For lunch I had a sandwich and an apple. I did not have any drink.',q:'What did she have for lunch?',o:['🥪 A sandwich and an apple','🍜 Noodles','🥗 Salad and water'],a:0},
  {mono:'You should eat more fruit and vegetables, and drink a lot of water. Do not eat too much sugar.',q:'What should you eat more of?',o:['🍰 Sugar','🍎 Fruit and vegetables','🍟 Chips'],a:1},
  {mono:'The cafe sells coffee, tea and hot chocolate. The hot chocolate is the most popular drink.',q:'Which drink is the most popular?',o:['☕ Coffee','🍵 Tea','🍫 Hot chocolate'],a:2},
  {mono:'Ben is allergic to nuts, so his mum never puts them in his food.',q:'What must Ben not eat?',o:['🥜 Nuts','🍞 Bread','🧀 Cheese'],a:0},
  {mono:'My sister made a cake for Grandma\u2019s birthday. It was a chocolate cake with strawberries on top.',q:'What was on top of the cake?',o:['🍓 Strawberries','🍌 Bananas','🍒 Cherries'],a:0}
 ]},
 {id:'l1d',title:'天气与穿着',qs:[
  {mono:'It is cold and windy today, so put on your coat and a scarf before you go out.',q:'What should you put on?',o:['🧥 A coat and a scarf','🕶️ Sunglasses','🩳 Shorts'],a:0},
  {mono:'Tomorrow will be sunny and hot. We are going to the beach and I will take my swimming things.',q:'What will the weather be like?',o:['🌧️ Rainy','☀️ Sunny and hot','❄️ Snowy'],a:1},
  {mono:'In winter it often snows here. The children love making snowmen in the garden.',q:'What do the children make in winter?',o:['⛄ Snowmen','🏖️ Sandcastles','🎃 Pumpkin lanterns'],a:0},
  {mono:'Emma is wearing a red dress and white shoes to the party.',q:'What colour are Emma\u2019s shoes?',o:['🔴 Red','⚪ White','🔵 Blue'],a:1},
  {mono:'Take an umbrella with you because it might rain this afternoon.',q:'Why take an umbrella?',o:['🌧️ It might rain','🌞 It is sunny','🌙 It is dark'],a:0}
 ]}
],

/* ---------------- Listening Part 3：长对话三选一（一段对话 5 题） ---------------- */
list3:[
 {id:'l3a',title:'周末计划',dialog:'Mum: What are you going to do this weekend, Tom?\nTom: On Saturday morning I\u2019m going to play football with my friends in the park. In the afternoon I want to go to the new library.\nMum: That sounds good. And what about Sunday?\nTom: On Sunday we\u2019re visiting my grandparents. They live near the sea. We\u2019ll have lunch there and maybe walk on the beach.\nMum: Lovely! Don\u2019t forget your homework.\nTom: OK, I\u2019ll do it on Saturday evening.',
  qs:[
   {q:'What is Tom going to do on Saturday morning?',o:['⚽ Play football','📚 Go to the library','🏖️ Visit grandparents'],a:0},
   {q:'What does Tom want to do on Saturday afternoon?',o:['📚 Go to the library','🎬 Watch a film','🛒 Go shopping'],a:0},
   {q:'Where do Tom\u2019s grandparents live?',o:['🏔️ In the mountains','🌊 Near the sea','🏙️ In the city'],a:1},
   {q:'What will they do on Sunday?',o:['🏊 Swim','🚶 Walk on the beach','🎡 Go to a theme park'],a:1},
   {q:'When will Tom do his homework?',o:['Saturday evening','Sunday morning','Friday night'],a:0}
  ]},
 {id:'l3b',title:'买礼物',dialog:'Assistant: Can I help you?\nGirl: Yes, I\u2019m looking for a present for my mum. It\u2019s her birthday next week.\nAssistant: How about this blue scarf? It\u2019s twelve pounds.\nGirl: Hmm, I like it, but do you have a different colour?\nAssistant: Yes, we have red and green too.\nGirl: Can I have the green one, please?\nAssistant: Of course. That\u2019s twelve pounds.\nGirl: Here you are. Thank you!',
  qs:[
   {q:'Who is the girl buying a present for?',o:['👩 Her mum','👨 Her dad','👧 Her sister'],a:0},
   {q:'What is she looking for?',o:['🧣 A scarf','👕 A T-shirt','📖 A book'],a:0},
   {q:'How much is the scarf?',o:['£10','£12','£20'],a:1},
   {q:'Which colour does she choose?',o:['🔵 Blue','🔴 Red','🟢 Green'],a:2},
   {q:'When is the birthday?',o:['Tomorrow','Next week','Today'],a:1}
  ]},
 {id:'l3c',title:'学校旅行',dialog:'Teacher: Listen, everyone. Our school trip is next Friday.\nBoy: Where are we going, Miss?\nTeacher: We\u2019re going to the science museum in the city. Please bring a packed lunch and a water bottle.\nGirl: What time do we leave?\nTeacher: The bus leaves at eight thirty, so be at school before eight fifteen.\nBoy: Do we need to wear anything special?\nTeacher: No, but wear comfortable shoes because we\u2019ll walk a lot. We come back at four o\u2019clock.',
  qs:[
   {q:'When is the school trip?',o:['Next Friday','Next Monday','Tomorrow'],a:0},
   {q:'Where are they going?',o:['🏛️ The science museum','🦁 The zoo','🌳 The park'],a:0},
   {q:'What should they bring?',o:['🎒 A packed lunch and water','💻 A laptop','🎨 Paints'],a:0},
   {q:'What time does the bus leave?',o:['8.15','8.30','9.00'],a:1},
   {q:'What time do they come back?',o:['2 pm','3 pm','4 pm'],a:2}
  ]},
 {id:'l3d',title:'看医生',dialog:'Doctor: Hello, Jack. What\u2019s the matter?\nJack: I don\u2019t feel well. I have a headache and my throat hurts.\nDoctor: How long have you had it?\nJack: Since yesterday evening.\nDoctor: Let me look. Open your mouth. Yes, it\u2019s a cold. You should stay at home for two days and drink a lot of water.\nJack: Do I need medicine?\nDoctor: Yes, take this medicine three times a day after meals. You\u2019ll feel better soon.\nJack: Thank you, doctor.',
  qs:[
   {q:'What is wrong with Jack?',o:['🤧 A cold','🦷 Toothache','🤢 Stomach ache'],a:0},
   {q:'When did it start?',o:['This morning','Yesterday evening','Last week'],a:1},
   {q:'How long should he stay at home?',o:['One day','Two days','One week'],a:1},
   {q:'How often should he take the medicine?',o:['Once a day','Twice a day','Three times a day'],a:2},
   {q:'What else should he do?',o:['💧 Drink a lot of water','🏃 Exercise','🍰 Eat sweets'],a:0}
  ]}
],

/* ---------------- 语法小练：A2 核心语法点（10 组 × 5 题，带一句中文解析） ---------------- */
grammar:[
 {id:'g1',title:'一般现在时 · 第三人称单数',qs:[
  {q:'She ___ to school by bike every day.',o:['go','goes','going'],a:1,ex:'She 是第三人称单数，一般现在时动词加 -s，所以是 goes。'},
  {q:'My brother ___ like fish.',o:['doesn\u2019t','don\u2019t','isn\u2019t'],a:0,ex:'第三人称单数否定用 doesn\u2019t + 动词原形。'},
  {q:'___ you live near the park?',o:['Do','Does','Are'],a:0,ex:'you 用 Do 提问；只有 he / she / it 才用 Does。'},
  {q:'Tom and Jack ___ football after school.',o:['play','plays','playing'],a:0,ex:'两个人是复数，动词用原形 play，不加 -s。'},
  {q:'He ___ TV every evening.',o:['watch','watchs','watches'],a:2,ex:'watch 以 ch 结尾，第三人称单数加 -es → watches。'}
 ]},
 {id:'g2',title:'一般过去时',qs:[
  {q:'I ___ to the zoo yesterday.',o:['go','goed','went'],a:2,ex:'go 的过去式是不规则变化 went，不是 goed。'},
  {q:'She ___ at home last night.',o:['is','was','were'],a:1,ex:'She 是单数，be 动词过去式用 was；were 是给复数用的。'},
  {q:'They ___ football in the park last Sunday.',o:['play','played','playing'],a:1,ex:'规则动词过去式加 -ed → played。'},
  {q:'___ you at the party yesterday?',o:['Are','Were','Was'],a:1,ex:'you 的 be 动词过去式一律用 Were。'},
  {q:'We ___ not go to school last Monday.',o:['do','did','are'],a:1,ex:'一般过去时否定用 didn\u2019t（did not）+ 动词原形。'}
 ]},
 {id:'g3',title:'现在进行时',qs:[
  {q:'Look! The boy ___ up the tree.',o:['climb','climbs','is climbing'],a:2,ex:'Look! 表示正在发生，用 am / is / are + 动词-ing。'},
  {q:'She ___ a book now.',o:['read','is reading','reads'],a:1,ex:'now 提示此刻正在做，用 is reading。'},
  {q:'They ___ TV at the moment.',o:['are watching','watch','watches'],a:0,ex:'at the moment = 此刻，用现在进行时 are watching。'},
  {q:'I ___ my homework. Can I play later?',o:['do','am doing','does'],a:1,ex:'说话时正在做，用 am doing。'},
  {q:'Listen! The birds ___.',o:['sing','are singing','sings'],a:1,ex:'Listen! 提示动作正在进行，用 are singing。'}
 ]},
 {id:'g4',title:'There be 与 have got',qs:[
  {q:'___ a cat under the table.',o:['There is','There are','It is'],a:0,ex:'a cat 是单数，用 There is；复数才用 There are。'},
  {q:'___ some milk in the fridge.',o:['There is','There are','There have'],a:0,ex:'milk 不可数，当作单数，用 There is。'},
  {q:'I ___ got a new bike.',o:['have','has','am'],a:0,ex:'I have got = 我有一辆；第三人称单数才用 has got。'},
  {q:'She ___ got two brothers.',o:['have','has','is'],a:1,ex:'She 是第三人称单数，用 has got。'},
  {q:'___ there any students in the classroom?',o:['Is','Are','Do'],a:1,ex:'students 是复数，There be 疑问句把 Are 提前。'}
 ]},
 {id:'g5',title:'some / any 与名词复数',qs:[
  {q:'I\u2019d like ___ water, please.',o:['some','any','a'],a:0,ex:'提出请求、期待肯定回答时用 some，不用 any。'},
  {q:'There aren\u2019t ___ apples on the table.',o:['some','any','much'],a:1,ex:'否定句里用 any；apples 可数复数，不用 much。'},
  {q:'How ___ books do you have?',o:['much','many','long'],a:1,ex:'books 是可数复数，问数量用 How many。'},
  {q:'My sister has three ___.',o:['child','childs','children'],a:2,ex:'child 的复数是 children，不是 childs。'},
  {q:'Do you have ___ pen I can borrow?',o:['a','an','some'],a:0,ex:'pen 单数、辅音开头，用 a；an 用在元音开头的词前。'}
 ]},
 {id:'g6',title:'人称与物主代词',qs:[
  {q:'This is my friend. ___ name is Lily.',o:['She','Her','Hers'],a:1,ex:'后面跟名词 name，用形容词性物主代词 Her。'},
  {q:'I like ___. He is funny.',o:['he','him','his'],a:1,ex:'like 后面用人称代词宾格 him。'},
  {q:'___ am a student.',o:['I','Me','My'],a:0,ex:'做主语用主格 I；am 只跟 I 搭配。'},
  {q:'The blue bag is ___, not mine.',o:['you','your','yours'],a:2,ex:'表示"你的（东西）"用名词性物主代词 yours。'},
  {q:'Can you help ___ with my homework?',o:['I','me','my'],a:1,ex:'help 后面用宾格 me。'}
 ]},
 {id:'g7',title:'介词 in / on / at',qs:[
  {q:'I get up ___ seven o\u2019clock.',o:['in','on','at'],a:2,ex:'具体钟点前用 at。'},
  {q:'My birthday is ___ May.',o:['in','on','at'],a:0,ex:'月份前用 in；具体某一天才用 on。'},
  {q:'We have a picnic ___ Sunday.',o:['in','on','at'],a:1,ex:'星期几前用 on → on Sunday。'},
  {q:'The picture is ___ the wall.',o:['in','on','at'],a:1,ex:'挂在墙上用 on the wall。'},
  {q:'He was born ___ 2015.',o:['in','on','at'],a:0,ex:'年份前用 in。'}
 ]},
 {id:'g8',title:'情态动词 can / must / should',qs:[
  {q:'I ___ swim when I was five.',o:['can','could','can\u2019t'],a:1,ex:'说过去会做的事，用 can 的过去式 could。'},
  {q:'You ___ be quiet in the library.',o:['must','mustn\u2019t','can'],a:0,ex:'"必须安静"用 must；mustn\u2019t 是"禁止"。'},
  {q:'___ I have a glass of water?',o:['Can','Am','Do'],a:0,ex:'礼貌请求用 Can I...?'},
  {q:'You ___ eat too much candy. It\u2019s bad for your teeth.',o:['should','shouldn\u2019t','can'],a:1,ex:'给建议"不应该"用 shouldn\u2019t。'},
  {q:'Fish ___ live without water.',o:['can','can\u2019t','must'],a:1,ex:'鱼离开水不能活，用 can\u2019t 表示"不能"。'}
 ]},
 {id:'g9',title:'比较级与最高级',qs:[
  {q:'My brother is ___ than me.',o:['tall','taller','tallest'],a:1,ex:'两者比较、后面有 than，用比较级 taller。'},
  {q:'This is the ___ book I have ever read.',o:['good','better','best'],a:2,ex:'the + 最高级，good 的最高级是 best。'},
  {q:'A rabbit runs ___ than a tortoise.',o:['fast','faster','fastest'],a:1,ex:'两者比较用 faster。'},
  {q:'Today is ___ than yesterday.',o:['hot','hotter','hottest'],a:1,ex:'hot 是重读闭音节，比较级双写 t 加 -er → hotter。'},
  {q:'She is the ___ girl in our class.',o:['happy','happier','happiest'],a:2,ex:'in our class 表示范围，用最高级；happy 变 y 为 i 加 -est。'}
 ]},
 {id:'g10',title:'一般将来时',qs:[
  {q:'I ___ visit my grandma tomorrow.',o:['will','was','am'],a:0,ex:'tomorrow 表将来，用 will + 动词原形。'},
  {q:'We are going to ___ a film tonight.',o:['see','sees','seeing'],a:0,ex:'be going to 后面接动词原形 see。'},
  {q:'It ___ rain tomorrow, so take an umbrella.',o:['will','is','was'],a:0,ex:'预测将来用 will rain。'},
  {q:'She ___ going to play tennis this weekend.',o:['is','are','will'],a:0,ex:'She 是单数，be going to 里的 be 用 is。'},
  {q:'There ___ a football match next Saturday.',o:['will be','will have','is'],a:0,ex:'将来的"有"用 There will be，不说 will have。'}
 ]}
]
};
