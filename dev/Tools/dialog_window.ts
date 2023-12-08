var Dialog = new UI.Container();
var DialogWindow = new UI.Window({
  location: {
    x: 0,
    y: 0,
    width: 1000,
    height: 560,
  },
  drawing: [
    { type: "background", color: android.graphics.Color.argb(0, 0, 0, 0) },
    { type: "bitmap", bitmap: "dialog_background", scale: 2.7, x: 50, y: 4 },
  ],
  elements: {
    Question: {
      type: "text",
      x: 140,
      y: 70,
      text: "...",
    },
    Talker: {
      type: "text",
      x: 715,
      y: 285,
      text: "Talker",
    },
    answer_1: {
      type: "text",
      x: 150,
      y: 320,
      text: "1",
      clicker: {
        onClick: function (container) {
          Dialog.close();
          // for (var i in dialogs) {
          dialogs[0].isActive = false;
          alert("debug");
          dialogs[0]?.buttons.button_1()
          // }
        },
      },
    },
    answer_2: {
      type: "text",
      x: 150,
      y: 360,
      text: "2",
      clicker: {
        onClick: function (container) {
          Dialog.close();
          // for (var i in dialogs) {
          dialogs[0].isActive = false;
          dialogs[0]?.buttons.button_2()
          alert("debug");
          // }
        },
      },
    },
    answer_3: {
      type: "text",
      x: 150,
      y: 400,
      text: "3",
      clicker: {
        onClick: function (container) {
          Dialog.close();
          // for (var i in dialogs) {
          dialogs[0].isActive = false;
          dialogs[0]?.buttons.button_3()
          alert("debug");
          // }
        },
      },
    },
  },
});
function buttonFunc() {}
Callback.addCallback("LocalTick", function (coords, item, block) {
  // if (World.getThreadTime() % 160 == 0) {
  // alert(JSON.stringify(dialogs));
  // }
  for (var i in dialogs) { // var n in quests
    var dialog = dialogs[i];
    if (World.getThreadTime() % 5 == 0) {
      if (
        dialogs[i].dialog &&
        dialogs[i].isActive == true //&& dialogs[i].quest!=undefined
      ) {
        // if(dialogs[0].quest==quests[0].name)
        Dialog.setText("Question", "" + dialog.question);
        Dialog.setText("answer_1", "" + dialog.first);
        Dialog.setText("answer_2", "" + dialog.second);
        Dialog.setText("answer_3", "" + dialog.third);
        var d = dialogs[0].talker;
        // switch (d) {
        // case 1:
        // Dialog.setText("Talker", "First");
        // break;
        // case 2:
        // Dialog.setText("Talker", "Second");
        // case 3:
        // Dialog.setText("Talker", "Third")
        // break;
        // }
        // alert("Done!");
      }
    }
    if (
      dialogs[0].isActive == false &&
      dialogs[1]
      //&& quests[0].isActive == true
    ) {
      dialogs.shift();
      dialogs[0].isActive = true;
      alert("Диалог изменился!");
    }
//    for (var n in quests) {
 //   }
  }
});

Callback.addCallback("ItemUse", function (coords, item, block) {
  if (item.id == VanillaItemID.stick) {
    Dialog.openAs(DialogWindow);
    // Dialog.openAs(DialogWindow);
    teleportPlayer(+10, +1, +10);
    guy.setAttitude("+",10);
  };
  if(item.id==VanillaItemID["iron_ingot"]){
    Quest.give("testq")
    JSON.stringify(Quest.list)
  }
});
Callback.addCallback("EntityInteract", function (entity, player, coords) {
  if (Entity.getTypeName(entity) == Person.getAll()) {
    alert("Работает");
    Dialog.openAs(DialogWindow);
    for (var i in dialogs) {
      if (dialogs[i].talker == Person.getForAll("name")) {
        alert("[DEGUG] Успешно!");
      }
    }
  }
});