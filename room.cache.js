module.exports = {
    sources(room) {

    },
    factory(room) {
        let factory = room.find(FIND_MY_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_FACTORY })[0];
        (factory) ? room.memory["factory"] = factory.id : room.memory["factory"] = undefined;
    },
    nuker(room) {
        let nuker = room.find(FIND_MY_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_NUKER })[0];
        (nuker) ? room.memory["nuker"] = nuker.id : room.memory["nuker"] = undefined;
    },
    ownedRooms(room) {
        let controller = room.controller;
        if (!controller || !controller.my || Memory.global.communes.includes(room.name)) return;
        Memory.global.communes.push(room.name);
    },
    labs(room) {
        var allLabs = creep.room.find(FIND_MY_STRUCTURES).filter(structure => structure.structureType == STRUCTURE_LAB);
        var labs = [
            { "resource": RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 3) && structure.pos.y == (flag.pos.y - 2)) },
            { "resource": RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 2) && structure.pos.y == (flag.pos.y - 3)) },
            { "resource": RESOURCE_CATALYZED_UTRIUM_ACID, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 3) && structure.pos.y == (flag.pos.y - 4)) },
            { "resource": RESOURCE_CATALYZED_UTRIUM_ALKALIDE, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 5) && structure.pos.y == (flag.pos.y - 4)) },
            { "resource": RESOURCE_CATALYZED_KEANIUM_ACID, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 5) && structure.pos.y == (flag.pos.y - 3)) },
            { "resource": RESOURCE_CATALYZED_KEANIUM_ALKALIDE, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 2) && structure.pos.y == (flag.pos.y - 4)) },
            { "resource": RESOURCE_CATALYZED_LEMERGIUM_ACID, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 4) && structure.pos.y == (flag.pos.y - 5)) },
            { "resource": RESOURCE_CATALYZED_ZYNTHIUM_ACID, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 4) && structure.pos.y == (flag.pos.y - 3)) },
            { "resource": RESOURCE_CATALYZED_GHODIUM_ACID, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 3) && structure.pos.y == (flag.pos.y - 5)) },
            { "resource": RESOURCE_CATALYZED_GHODIUM_ALKALIDE, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 4) && structure.pos.y == (flag.pos.y - 2)) }
        ];


    }
}