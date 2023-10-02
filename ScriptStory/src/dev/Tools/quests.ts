var dialogs = [];
var quests = [];
function questRegistry(name: string, isActive: boolean): void {
  for (var i in dialogs) {
    for (var n in quests) {
      quests.push({ name: name, isActive: isActive });
    }
  }
}

function dialogRegistry(
   dialog: string,
  question: string,
  first: string,
  second: string,
  third: string,

  isActive: boolean,
  talker: number,
  quest?: string
): void {
  quest = quest || null;
  dialogs.push({
    dialog: dialog,
    // previousquest: previousquest,
    // nextquest: nextquest,
    question: question,
    first: first,
    second: second,
    third: third,

    isActive: isActive,
    talker: talker,
    quest: quest,
  });
  //   for(var i in quests){
  //   if(quests[i].isActive==false&&quests[i].nextquest){quests[i].quest=quests[i].nextquest;
  //   quests[i].isActive==true
  // alert}}
  
}

questRegistry("FirstStep",true)

dialogRegistry(
  "sinceHistory",
  "Сделайте свой выбор!",
  "???",
  "!!!",
  "...",
  true,
  1,
  "FirstStep"
);

dialogRegistry(
  "testByGialis",
  " Ты что делаешь в лесу?",
  "Заблудился, когда гулял собаку.",
  "Вышел прогулять собаку.",
  "Пошёл поохотиться. Собаку потерял.",
  false,
  1,
  "FirstStep"
);

dialogRegistry(
  "Testing",
  " Тут пусто?",
  "Да.",
  "Нет.",
  "Ура,я не появился без квеста.",
  false,
0
);
