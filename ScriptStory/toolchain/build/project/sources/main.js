var dialogs = [];
var quests = [];
function questRegistry(name, isActive) {
    for (var i in dialogs) {
        for (var n in quests) {
            quests.push({ name: name, isActive: isActive });
        }
    }
}
function dialogRegistry(dialog, 
// previousquest: string | null,
// nextquest: string | null,
question, first, second, third, isActive, talker, quest) {
    quest = quest || null;
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
        quest: quest,
    });
    //   for(var i in quests){
    //   if(quests[i].isActive==false&&quests[i].nextquest){quests[i].quest=quests[i].nextquest;
    //   quests[i].isActive==true
    // alert}}
}
questRegistry("FirstStep", true);
dialogRegistry("sinceHistory", "Сделайте свой выбор!", "???", "!!!", "...", true, 1, "FirstStep");
dialogRegistry("testByGialis", " Ты что делаешь в лесу?", "Заблудился, когда гулял собаку.", "Вышел прогулять собаку.", "Пошёл поохотиться. Собаку потерял.", false, 1, "FirstStep");
dialogRegistry("Testing", " Тут пусто?", "Да.", "Нет.", "Ура,я не появился без квеста.", false, 0);
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
function buttonFunc() { }
Callback.addCallback("LocalTick", function (coords, item, block) {
    if (World.getThreadTime() % 160 == 0) {
        alert(JSON.stringify(dialogs));
    }
    for (var i in dialogs) {
        var dialog = dialogs[i];
        if (dialogs[0].isActive == false &&
            dialogs[1] &&
            quests[0].isActive == true) {
            dialogs.shift();
            dialogs[0].isActive = true;
            alert("Диалог изменился!");
        }
        for (var n in quests) {
            if (World.getThreadTime() % 5 == 0) {
                if (dialogs[0].dialog &&
                    dialogs[0].isActive == true &&
                    quests[0].name == dialogs[0].quest &&
                    quests[0].isActive == true) {
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
IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("StorageInterface");
IMPORT("ItemAnimHelper");
IMPORT("BlockEngine");
IMPORT("SoundAPI");
IMPORT("RenderUtil");
var Click = new Sound("click.ogg");
var Bucket = new Sound("bucket.ogg");
Bucket.setVolume(0.6);
Click.setVolume(0.6);
Callback.addCallback('LevelDisplayed', function () {
    Game.message(Translation.translate("§6Best story pack has been downloaded!\n§7Thank's for downloading this modification!\n• You can join in the group of modification: §ahttps://vk.com/horizonspacescraft"));
});
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var UniqueGen = {
    randomCoords: function (random, chunkX, chunkZ, minHeight, maxHeight) {
        minHeight = minHeight || 0;
        maxHeight = maxHeight || 220;
        return {
            x: chunkX * 16 + random.nextInt(16),
            y: random.nextInt(maxHeight - minHeight + 1) - minHeight,
            z: chunkZ * 16 + random.nextInt(16)
        };
    },
    generateOre: function (id, data, chunkX, chunkZ, random, params) {
        for (var i = 0; i < params.veinCounts; i++) {
            var coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, id, data, params.size, false, random.nextInt());
        }
    },
    generateOreInDimension: function (id, data, chunkX, chunkZ, random, params) {
        for (var i = 0; i < params.veinCounts; i++) {
            var coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, id, data, params.size, params.mode, params.check);
        }
    }
};
var BLOCK_TYPE_STAIRS_GL = Block.createSpecialType({
    lightopacity: 1,
    destroytime: .4,
    sound: "glass"
});
var BLOCK_TYPE_FENCE_GL = Block.createSpecialType({
    lightopacity: 1,
    renderlayer: 1,
    rendertype: 11,
    sound: "glass"
});
var BLOCK_TYPE_FENCEE_GL = Block.createSpecialType({
    lightopacity: 1,
    renderlayer: 1,
    rendertype: 32,
    sound: "glass"
});
var BLOCK_TYPE_GLASS = Block.createSpecialType({
    explosionres: 0.5,
    lightopacity: 1,
    destroytime: .4,
    renderlayer: 1,
    sound: "glass"
});
var BLOCK_TYPE_STAIRS = Block.createSpecialType({
    lightopacity: 15,
    destroytime: .6,
    material: 4
});
var BLOCK_TYPE_FENCE = Block.createSpecialType({
    renderlayer: 2,
    rendertype: 11
});
var BLOCK_TYPE_FENCEE = Block.createSpecialType({
    renderlayer: 2,
    rendertype: 32
});
var BLOCK_TYPE_PLANE = Block.createSpecialType({
    lightopacity: 15,
    renderlayer: 1,
    rendertype: 87,
    translucency: 1,
    sound: "glass"
});
var BLOCK_TYPE_STAIRS_WD = Block.createSpecialType({
    destroytime: .4,
    sound: "wood",
    material: 4
});
var BLOCK_TYPE_FENCE_WD = Block.createSpecialType({
    renderlayer: 2,
    rendertype: 11,
    sound: "wood",
    material: 4
});
var TORCH_SPACETYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    renderlayer: 3,
    rendertype: 2,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 14,
    material: 4
});
var TORCH_OFFSPACETYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    renderlayer: 3,
    rendertype: 2,
    translucency: 1,
    lightlevel: 0,
    material: 4
});
var TORCH_SPACESTYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    rendertype: 91,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 14,
    material: 4
});
var WEB = Block.createSpecialType({
    explosionres: 20,
    rendertype: 91,
    translucency: 0.8,
    lightopacity: 1,
    sound: "grass",
    solid: false,
    material: 4
});
var STONE = Block.createSpecialType({
    solid: true,
    material: 4,
    destroytime: 5,
    renderlayer: 3,
    rendertype: 0,
    translucency: 0,
    lightopacity: 15
});
var WPPTYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 7
});
BlockRegistry.createBlockType("oxygentile_stairs", {
    renderLayer: 3,
});
