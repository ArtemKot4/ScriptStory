
dialogRegistry(
  "sinceHistory",
  "А вы уже поставили лайк?",
  "Конечно!",
  "Да!",
  "А где вариант «нет»?",
  true,
  1,
   () => {
    alert("Первая кнопка сработала?")
  }, ()=>{
    alert("Вторая кнопка сработала?")
  }, ()=>{
    alert("Третья кнопка сработала?")
  }
);
dialogRegistry(
  "YaGulialSobaky",
  " Ты что делаешь в лесу?",
  "Заблудился.",
  "Вышел выгулить собаку.",
  "Пошёл поохотиться. Собаку потерял.",
  false,
  1,
);
dialogRegistry(
  "Testing",
  " Тут пусто?",
  "Да.",
  "Нет.",
  "Возможно.",
  false,
  0
);




//   for(var i in quests){
//   if(quests[i].isActive==false&&quests[i].nextquest){quests[i].quest=quests[i].nextquest;
//   quests[i].isActive==true
// alert}}


