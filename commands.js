const roomBase = require('room.base');
const helper = require('helper');

global.help = `<span style="text-align:center;">
────────────
♦ Commands ♦
────────────
nuke(x, y, roomName)
showNukeRange() - shows the range of all the nukers
removeAllSites() - removes all construction sites

spawnScientist(roomName) - spawns 
<span>
`;


global.test = function (room) {
    
    var start = Game.cpu.getUsed();
    roomBase.test(room);
    
    var cpuUsed = Game.cpu.getUsed() - start;

    console.log(cpuUsed)
}

global.evalRail = function (room) {
    numberOfTowers = 6;
    maxTowerDamage = 600;
    
}

global.planRoom = function (room) {
    return roomBase.distanceTransform(room);
}

global.spawnHybrid = function(roomName, target, boosted) {
    var spawns = Object.values(Game.spawns).filter(spawn => spawn.room.name == roomName);
    var name = helper.nameScreep("Bycrome");
    if (boosted) {
        var memory = {memory: {role: 'hybrid', target: target, boosts: {tough:"", move:"", ranged:"", heal:""}}}
    }
    else {
        var memory = {memory: {role: 'hybrid', target: target, boosts: {tough:"", move:"", ranged:"", heal:""}}}
    }
    return(helper.spawn(spawns, helper.BuildBody([MOVE, MOVE, TOUGH, TOUGH, RANGED_ATTACK, HEAL, HEAL, HEAL, HEAL, HEAL], Game.rooms[roomName], null), name, memory));
    
}

global.spawnScientist = function(roomName) {
    var spawns = Object.values(Game.spawns).filter(spawn => spawn.room.name == roomName);
    var name = helper.nameScreep("Scientist");
    return(helper.spawn(spawns, [MOVE, CARRY], name, { memory: { role: 'scientist', room: roomName}}));
}

global.spawnFactoryWorker = function(roomName) {
    var spawns = Object.values(Game.spawns).filter(spawn => spawn.room.name == roomName);
    var name = helper.nameScreep("Factory Worker ");
    return(helper.spawn(spawns, [MOVE, CARRY], name, { memory: { role: 'factoryWorker', room: roomName}}));
}

global.showNukeRange = function () {
    let nukers = Object.values(Game.structures).filter(structure => structure.structureType === STRUCTURE_NUKER);

    nukers.forEach(nuker => {
        Game.map.visual.circle(nuker.pos, { fill: 'transparent', radius: NUKE_RANGE * 50, stroke: '#ff0000' });
    });
}

global.sendNukes = function (number, x, y, roomName) {
    let nukepos = new RoomPosition(x, y, roomName);
    
    let nukers = [];
    // Memory.global.communes.forEach(room => {
    for (room of Memory.global.communes) {
        if (Memory.rooms[room].controllerLevel !== 8) continue;
        nukers.push(Game.rooms[room].nuker())
    }


    console.log(nukers)
    // let nukers = Object.values(Game.structures).filter(structure =>
    //     structure.structureType === STRUCTURE_NUKER &&
    //     Game.map.getRoomLinearDistance(structure.pos.roomName, nukepos.roomName, false) <= NUKE_RANGE &&
    //     structure.room.terminal &&
    //     structure.room.terminal.store[RESOURCE_GHODIUM] > 5000 &&
    //     structure.isActive()
    // );



    // loop through nuker rooms
    // if room does not have enough materials remove from list
    // room.terminal.store() >


    // if (number < 1) return "invalid number of nukes";

    // if (number > nukers.length) return "Not enough nukers avaliable";

    // for(i=0; i < number; i++) {

    //     console.log(i, nukers)
    // }


    // if still have enough nukes
    // loop through nukes
    // place flags 
    // Game.rooms.roomName.createFlag(x, y, nuker.room.name+' NUKE');


    return nukepos;


    // return "status";
}

global.nuke = function (x, y, roomName) {
    let nukepos = new RoomPosition(x, y, roomName);

    if (!nukepos) return `Invalid target`;

    let nuker = _.find(Game.structures, structure =>
        structure.structureType === STRUCTURE_NUKER &&
        structure.ready &&
        Game.map.getRoomLinearDistance(structure.pos.roomName, nukepos.roomName, false) <= NUKE_RANGE &&
        structure.room.terminal &&
        structure.room.terminal.store[RESOURCE_GHODIUM] > 5000 &&
        structure.isActive()
    );

    if (nuker) {
        Game.rooms[nukepos.roomName].createFlag(x, y, nuker.room.name + ' NUKE', COLOR_RED, COLOR_RED);
        return "nuke dispatched from " + nuker.room.name;
    }
    else {
        return `No available nuker for this target`;
    }
}

global.expand = function (roomName) {
    // find the closest room 
}

global.attack = function (roomName) {

}

global.removeAllSites = function () {

    for (let value in Game.constructionSites) {

        let cSite = Game.constructionSites[value]

        cSite.remove()
    }

    return "removed all sites"
}