type universal = string | number;
type int = number;
type name = string;
type fraction = "friendly" | "angry" | "neutral";
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
  buttons?: {
    button_1: ()=>void,
    button_2: ()=>void,
    button_3: ()=>void
  }
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
    buttons: buttons
  });
}
