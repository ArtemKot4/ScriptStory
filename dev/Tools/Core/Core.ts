IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("StorageInterface");
IMPORT("ItemAnimHelper");
IMPORT("BlockEngine");
IMPORT("SoundAPI");
IMPORT("RenderUtil");

type universal = string | number;
type int = number;
type name = string;

type fraction = "friendly" | "angry" | "neutral";
type information = "age" | "race" | "place" | "fraction" | "attitude" | "name";
type math_sep = "+" | "-" | "*" | "/" | "**";

type qtype = "item" | "mob" | "position" | "dialog";
type parts =
  | "head"
  | "body"
  | "rightarm"
  | "leftarm"
  | "rightleg"
  | "lefleg"
  | "cape"
  | "root"
  | "leftitem"
  | "rightitem";
type race = "furry" | "human";

type place = "desert_plates" | "skyes";

type test<T> = (test: T) => {};

Callback.addCallback("LevelDisplayed", function () {
  Game.message(
    "race: " +
      Person.getForAll("race") +
      "\nname:" +
      Person.getForAll("name") +
      "\n [DEBUG]: "
    // + JSON.stringify(Person.list)
  );
});

const black = new UI.Container();

const BLACK = new UI.Window({
  location: {
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
  },
  drawing: [
    { type: "background", color: android.graphics.Color.argb(0, 0, 0, 1) },
  ],
});

function setTimeSecond(func, time): void {
  Threading.initThread(String(Math.random()), () => {
    java.lang.Thread.sleep(time*1000);
    func();
  });
}
