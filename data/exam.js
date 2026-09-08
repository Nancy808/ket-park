/* =========================================================
   KET 真题题型素材库（A2 Key for Schools 官方题型）
   read1 = Reading Part 1 短文本主旨（6 题/套）
   read2 = Reading Part 2 三短文匹配（7 题/组）
   write6 = Writing Part 6 邮件/便条 25 词（3 个要点）
   write7 = Writing Part 7 看图写故事 35 词（3 幅图）
   list2  = Listening Part 2 笔记填空（5 空/段，用 TTS 朗读）
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
]
};
