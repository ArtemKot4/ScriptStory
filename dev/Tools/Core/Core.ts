IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("StorageInterface");
IMPORT("ItemAnimHelper");
IMPORT("BlockEngine");
IMPORT("SoundAPI");

IMPORT("RenderUtil");






Callback.addCallback('LevelDisplayed', function () {
    Game.message(
      "race: "+Person.getForAll("race") + "\nname:" + Person.getForAll("name") + "\n [DEBUG]: " + JSON.stringify(Person.list)
    );
    Game.message(JSON.stringify(Quest.list))
    alert(Person.getForAll("race"))
});

