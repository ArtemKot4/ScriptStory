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
    { type: "bitmap", bitmap: "dialog_background", scale: 3.5, x: 150, y: 5 },
  ],
  elements: {
    Question: {
      type: "text",
      x: 210,
      y: 90,
      text: "...",
    },
    Talker: {
      type: "text",
      x: 210,
      y: 120,
      text: "Talker",
    },
    answer_1: {
      type: "text",
      x: 210,
      y: 210,
      text: "1",
      clicker: {
        onClick: function (container) {
          Dialog.close();
          // for (var i in dialogs) {
          dialogs[0].isActive = false;
          alert("debug");
          // }
        },
      },
    },
    answer_2: {
      type: "text",
      x: 210,
      y: 290,
      text: "2",
      clicker: {
        onClick: function (container) {
          Dialog.close();
          // for (var i in dialogs) {
          dialogs[0].isActive = false;
          alert("debug");
          // }
        },
      },
    },
    answer_3: {
      type: "text",
      x: 210,
      y: 370,
      text: "3",
      clicker: {
        onClick: function (container) {
          Dialog.close();
          // for (var i in dialogs) {
          dialogs[0].isActive = false;
          alert("debug");
          // }
        },
      },
    },
  },
});

function buttonFunc() {}

Callback.addCallback("LocalTick", function (coords, item, block) {
  if (World.getThreadTime() % 160 == 0) {
    alert(JSON.stringify(dialogs));
  }
  for (var i in dialogs) {
    var dialog = dialogs[i];
    if (
      dialogs[0].isActive == false &&
      dialogs[1] &&
      quests[0].isActive == true
    ) {
      dialogs.shift();

      dialogs[0].isActive = true;
      alert("Диалог изменился!");
    }
    for (var n in quests) {
      if (World.getThreadTime() % 5 == 0) {
        if (
          dialogs[0].dialog &&
          dialogs[0].isActive == true &&
          quests[0].name == dialogs[0].quest &&
          quests[0].isActive == true
        ) {
          Dialog.setText("Question", "" + dialog.question);
          Dialog.setText("answer_1", "" + dialog.first);
          Dialog.setText("answer_2", "" + dialog.second);
          Dialog.setText("answer_3", "" + dialog.third);
          var d = dialogs[0].talker;
          switch (d) {
            case 1:
              Dialog.setText("Talker", "First");
              break;
            case 2:
              Dialog.setText("Talker", "Second");
            case 3:
              Dialog.setText("Talker", "Third");
            default:
              break;
          }
          alert("Done!");
        }
      }
    }
  }
});
Callback.addCallback("ItemUse", function (coords, item, block) {
  if (item.id == VanillaItemID.stick) {
    Dialog.openAs(DialogWindow);
    // Dialog.openAs(DialogWindow);
  }
});
Callback.addCallback("EntityInteract", function (entity, player, coords) {
  if (Entity.getType(entity) == 34) {
    alert("Работает");
    // Dialog.openAs(DialogWindow);}
  }
});
