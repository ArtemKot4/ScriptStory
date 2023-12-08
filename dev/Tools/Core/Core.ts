IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("StorageInterface");
IMPORT("ItemAnimHelper");
IMPORT("BlockEngine");
IMPORT("SoundAPI");

IMPORT("RenderUtil");






Callback.addCallback('LevelDisplayed', function () {
    Game.message(Translation.translate("§6Best story pack has been downloaded!\n§7Thank's for downloading this modification!\n• You can join in the group of modification: §ahttps://vk.com/horizonspacescraft"));
    Game.message(
      "race: "+Person.getForAll("race") + "\nname:" + Person.getForAll("name")
    )
});

