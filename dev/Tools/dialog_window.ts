const Dialogs = new UI.Container();

module UIWorker {
  export function getPersonModel(): void {}
}

class Dialog {
  public static storage = [];
  public question: string;
  public first: string;
  public second: string;
  public third: string;

  public isActive: boolean = false;
  public talker: Person["name"];

  public button_1?: {};
  public button_2?: {};
  public button_3?: {};
  public static UI = (function () {
    return new UI.Window({
      location: {
        x: 0,
        y: 0,
        width: 1000,
        height: 560,
      },
      drawing: [
        { 
        type: "background", 
        color: android.graphics.Color.argb(0, 0, 0, 0)
       },
        {
          type: "bitmap",
          bitmap: "dialog_background",
          scale: 2.6,
          x: 50,
          y: 3,
        },
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
              Dialogs.close();
              // for (var i in this.storage) {
              Dialog.storage[0].isActive = false;
              alert("debug");
              Dialog.storage[0]?.buttons.button_1();
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
              Dialogs.close();
              // for (var i in this.storage) {
              this.storage[0].isActive = false;
              this.storage[0]?.buttons.button_2();
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
              Dialogs.close();
              // for (var i in this.storage) {
              this.storage[0].isActive = false;
              this.storage[0]?.buttons.button_3();
              alert("debug");
              // }
            },
          },
        },
      },
    });
  })();

  constructor(
    dialog: string,
    question: string,
    first: string,
    second: string,
    third: string,
    talker,
    isActive: boolean,
    button_1?: {},
    button_2?: {},
    button_3?: {}
  ) {
    Dialog.storage.push(this);
    this.isActive = isActive;
    this.question = question;
    this.first = first;
    this.second = second;
    this.third = third;
    this.talker = talker;
    this.button_1 = button_1;
    this.button_2 = button_2;
    this.button_3 = button_3;
  }
  public static onTick(): void {
    for (var i in this.storage) {
      // var n in quests
      const dialog = this.storage[i];
      if (World.getThreadTime() % 5 == 0) {
        if (
          this.storage[i].dialog &&
          this.storage[i].isActive == true //&& this.storage[i].quest!=undefined
        ) {
          // if(this.storage[0].quest==quests[0].name)
          Dialogs.setText("Question", "" + dialog.question);
          Dialogs.setText("answer_1", "" + dialog.first);
          Dialogs.setText("answer_2", "" + dialog.second);
          Dialogs.setText("answer_3", "" + dialog.third);
          Dialogs.setText("Talker", "" + dialog.talker);
        }
      }
      if (
        this.storage[0].isActive == false &&
        this.storage[1]
        //&& quests[0].isActive == true
      ) {
        this.storage.shift();
        this.storage[0].isActive = true;
        alert("Диалог изменился!");
      }
      //    for (var n in quests) {
      //   }
    }
  }
  public static open(name) {
    for (var i in Dialog.storage) {
      const dialog = Dialog.storage[i];
      if (dialog.question && dialog.question == name) {
        dialog[0].isActive = false;
        dialog.isActive = true;
      }
    }
  };
}

Callback.addCallback("LocalTick", function (coords, item, block) {
  Dialog.onTick();
});

Callback.addCallback("ItemUse", function (coords, item, block) {
  if (item.id == VanillaItemID.stick) {
    Dialogs.openAs(Dialog.UI);
    // Dialogs.openAs(DialogWindow);
    // teleportPlayer(+10, +1, +10);
    fluf.setAttitude("+", 10);
  }
  if (item.id == VanillaItemID["iron_ingot"]) {
    Quest.give("testq");
    Game.message(JSON.stringify(Quest.list));
  }
  if (item.id == VanillaItemID["gold_ingot"]) {
    test.start();
  }
});
Callback.addCallback("EntityInteract", function (entity, player, coords) {
  if (Entity.getTypeName(entity) == Person.getAll()) {
    alert("Работает");
    Dialogs.openAs(Dialog.UI);
    for (var i in Dialog.storage) {
      if (Dialog.storage[i].talker == Person.getForAll("name")) {
        alert("[DEGUG] Успешно!");
      }
    }
  }
});

//Деревья которые ломаются долго
//Засохшие деревья которые ломаются моментально но не выпадают.
//Шкала холода и жажды.
