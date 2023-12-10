type IQuestParams = [
  name: name, //name
  name: name, //owner
  type: { type: qtype; target: universal; important: boolean; icon?: name },
  func?: () => void
];

class Quest {
  public static list = [];

  public isCompleted: 0 | 1 | 2 | 3 = 0; //0 - не выдан, 1 - в процессе выполнения, 2 - выполнен,3 - закрыт
  public description: IQuestParams = [
    "default",
    "Artem",
    {
      type: "item",
      target: VanillaItemID["stick"],
      important: false,
      icon: "unknown",
    },
  ];
  constructor(description: IQuestParams) {
    let desc = this.description;
     desc = description;

    Quest.list.push({
      name: this.description[0],
      type: this.description[2].type,
      target: this.description[2].target,
      isCompleted: this.isCompleted,
      func: this.description[3],
    });
  }
  public static check(type): boolean {
    for (var i in Quest.list) {
      var q = Quest.list[i];
      if (q.isCompleted != 1 && q.type != type) return false;
      return true;
    }
  }
  public static checkItem(): void {
    const actor: PlayerActor = new PlayerActor(Player.getLocal());
    for (var i = 1; i < 36; i++) {
      for (var q in Quest.list) {
        const desc = Quest.list[q];
        if (
          //Quest.check("item") &&
          actor.getInventorySlot(i).id == desc.target 
        ) {
          desc.isCompleted = 2;
          Game.message("Квест на предмет успешно выполнен!");
          alert("isCompleted level changed to: " + desc.isCompleted)
        } else {Game.message("Предмет не найден")}
      }
    }
  }
  public static give(name: name): void {
    for (var i in Quest.list) {
      const q = Quest.list[i];
      if (q.name == name && q.isCompleted == 0) {
        q.isCompleted = 1;
        Game.message("Отлично,квест выдан!");
        alert("competed level: " + q.isCompleted)
      }
    }
  }
}

Callback.addCallback("LocalTick", () => {
  if (World.getThreadTime() % 40 == 0) {
    for (var i in Quest.list) {
      var q = Quest.list[i];

      if (q.name && q.isCompleted === 2 && q.func) {
        q.func();
        q.isCompleted = 3;
      }
    }

  //  if (World.getThreadTime() % 400 == 0)  Quest.checkItem();
  }
});
