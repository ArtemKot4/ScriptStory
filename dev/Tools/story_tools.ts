
var dialogs = [];
var quests = [];

function questRegistry(name: string, isActive: boolean): void {
  for (var i in dialogs) {
    for (var n in quests) {
      quests.push({ name: name, isActive: isActive });
    }
  }
}

function teleportPlayer(x: number, y: number, z: number): void {
  Entity.addPosition(Player.get(), x, y, z);
}

function dialogRegistry(
  dialog: string,
  question: string,
  first: string,
  second: string,
  third: string,

  isActive: boolean,
  talker: number,

    button_1?: {},
    button_2?: {},
    button_3?: {}
): void {
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
    button_1: button_1,
    button_2: button_2,
    button_3: button_3
  });
}
