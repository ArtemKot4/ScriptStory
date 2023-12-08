
dialogRegistry(
  "sinceHistory",
  "А вы уже поставили лайк?",
  "Конечно!",
  "Да!",
  "А где вариант «нет»?",
  true,
  1,
  {button_1: ()=>{
    alert("Первая кнопка сработала?")
  }, button_2: ()=>{
    alert("Вторая кнопка сработала?")
  },button_3: ()=>{
    alert("Третья кнопка сработала?")
  }}
);
dialogRegistry(
  "YaGulialSobaky",
  " Ты что делаешь в лесу?",
  "Заблудился, когда гулял собаку.",
  "Вышел прогулять собаку.",
  "Пошёл поохотиться. Собаку потерял.",
  false,
  1,
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




//   for(var i in quests){
//   if(quests[i].isActive==false&&quests[i].nextquest){quests[i].quest=quests[i].nextquest;
//   quests[i].isActive==true
// alert}}


