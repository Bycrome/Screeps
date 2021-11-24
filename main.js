// _______        _______ _______ _______ _______ \\
// |_____| |      |_____|    |    |______ |______ \\
// |     | |_____ |     |    |    |______ ______| \\
//                   SCREEPS AI                   \\
//        CREATED BY: CABBAGEMAN & BYCROME        \\


var roleHarvester = require('harvester');
var roleCourier = require("courier")
  
const RoomManager = require('room.manager');

const roles = {
    "Harvester": require('role.harvester').run,
    "rangedDefender": require('role.rangedDefender').run, 
    "efficientHarvester": require('role.harvester').run, 
    "MineralHarveseter": roleHarvester.mineralHarvester, 
    // "externalZerg": roleHarvester.externalZerg,
    "healer": require('role.healer').run, 
    "attacker": require('role.attacker').run,
    "dismantler": require('role.dismantler').run,
    "courier": roleCourier.courier, 
    "transport": roleCourier.transport,
    // "transport": require('role.carrier').run, 
    "external-courier": roleCourier.courierII, 
    "full-courier": roleCourier.courierIII, 
    "scout": require('role.scout').run, 
    "hauler": require('role.hauler').run,
    "Transfer": require('transfer').run, 
    "reserver": require("reserver").reserver, 
    // "builder": require("construction").repair, 
    "downgrader": require("role.downgrader").run, 
    "builder": require("role.builder").run,
    "Hopper": require('role.hopper').run,
    "Upgrader": require('role.upgrader').run, 
    "upgrader": require('role.upgrader').run, 
    "drainer": require('role.drainer').run, 
    "powerMiner": require('role.powerMiner').run,
    "depositMiner": require("role.despoitMiner").run,
    "jew": require('jew').run,
    "carrier": require('carrier').run,
    "nukeOperator": require('role.nukeOperator').run,
    "claimer": require('role.claimer').run,
    "scientist": require('role.scientist').run,
    "factoryWorker": require('role.factory').run,
    "hybrid": require('role.hybrid').run,
    "thief": require('role.theif').run,
    "empty": require('role.empty').run,
    "labFiller": require('role.labFiller').run,
}
roles["closeDeathEfficientHarvester"] = roles["efficientHarvester"]

require("commands");
require("creep");
require("room");

Memory.global = {};
Memory.global.communes = [];

var rooms = {}


module.exports.loop = function () {

    if (2==2) {
        for (room in Memory.rooms) {
            // console.log(room);
            // Game.map.visual.circle(new RoomPosition(25,25,room));
            Game.map.visual.text(room, new RoomPosition(2,4,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5});
            // Game.map.visual.text(Memory.rooms[room].sources.length, new RoomPosition(2,10,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5});
            if (Memory.rooms[room].mineralsTypes) Game.map.visual.text(Memory.rooms[room].mineralsTypes[0], new RoomPosition(2,15,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5});
            if (Memory.rooms[room].lastScouted != undefined) Game.map.visual.text(Game.time-Memory.rooms[room].lastScouted, new RoomPosition(2,47,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5});
            else Game.map.visual.text("Never", new RoomPosition(2,47,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5});
            let type = Room.describe(room);
            if (type == ROOM_STANDARD && Memory.rooms[room].owner != undefined && Memory.global.communes.indexOf(room) >= 0) Game.map.visual.rect(new RoomPosition(0, 0, room), 50, 50, {fill: '#4caf50', stroke: '#00ff0a', opacity: 0.5});
            if (type == ROOM_STANDARD && Memory.rooms[room].sources && Memory.rooms[room].sources.length == 2 && Memory.rooms[room].baseLocation && Memory.rooms[room].owner == undefined)  Game.map.visual.rect(new RoomPosition(0, 0, room), 50, 50, {fill: '#8bc34a', stroke: '#4caf50', opacity: 0.5});
            if (type == ROOM_STANDARD && Memory.rooms[room].owner != undefined && Memory.global.communes.indexOf(room) < 0) Game.map.visual.rect(new RoomPosition(0, 0, room), 50, 50, {fill: '#ff4545', stroke: '#ff0000', opacity: 0.5});
            
            
            
            // if (type == ROOM_STANDARD && Memory.rooms[room].sources.length != 2)
            // Game.map.visual.rect(new RoomPosition(0, 0, room), 50, 50, {fill: '#4caf50', stroke: '#00ff0a', opacity: 0.5});
            // if (Memory.rooms[room].mineralTypes && Memory.rooms[room].mineralTypes.length > 0) Game.map.visual.text(Memory.rooms[room].mineralTypes[0], new RoomPosition(2,15,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5});

            // console.log(Memory.rooms[room].controller)
        }
        for (var creepname in Game.creeps){
            if (Game.creeps[creepname].memory.role == "scout"){
                if (Game.creeps[creepname].memory.target) Game.map.visual.line(Game.creeps[creepname].pos, new RoomPosition(25,25,Game.creeps[creepname].memory.target), {color: '#ff0000', width:3, lineStyle: 'dashed'});
                
                Game.map.visual.text("🧐", Game.creeps[creepname].pos, {color: '#FF0000', fontSize: 10});
                if (Game.creeps[creepname].ticksToLive) Game.map.visual.text(Game.creeps[creepname].ticksToLive, Game.creeps[creepname].pos, {color: '#FF0000', fontSize: 10});
                // console.log(Game.creeps[creepname].room)
                // console.log()
            }
        }

        for (var flagName in Game.flags) {
            if (flagName.includes("EXPANSION") == true) {
                Game.map.visual.text("🏠"+flagName.split(" ")[0], Game.flags[flagName].pos, {color: '#FF0000', align:"left", fontSize: 5}); 
            }
            if (flagName.includes("NUKE") == true) {
                Game.map.visual.text("☢", Game.flags[flagName].pos, {color: '#FF0000', fontSize: 10}); 
            }
            // if (Game.flags[flagName] == COLOR_RED) {
            //     
            // }
        }
    }

    // if (Memory["objectivies"] == undefined || Memory["objectivies"]["expansion"] == undefined) {
    //     Memory["objectivies"] = {};
    //     Memory["objectivies"]["expansion"] = [];
    // }
    // else if (Memory["objectivies"]["expansion"].length !== Object.values(Game.flags).length) {
    //     Memory["objectivies"]["expansion"] = [];
    //     Object.values(Game.flags).forEach(flag => {
    //         if (flag.secondaryColor == 2 && flag.color == 2) {
    //             console.log("new room: ", flag.name, flag.pos);
    //             let newRooms = [];
    //             console.log('e', Memory["objectivies"]["expansion"])
    //             newRooms = Memory["objectivies"]["expansion"];
    //             newRooms.push(flag.pos);
    //             Memory["objectivies"]["expansion"] = newRooms;
    //         }
    //     });
    // }

    // for(let roomName in Game.rooms) {
    //     let room = Game.rooms[roomName];
    //     if(room.roomManager()) {
    //         console.log('good for', room);
    //         room.roomManager().run();
    //         // suppressErrors(() => room.ai().run());
    //     }
    // }
    
    Object.values(Game.spawns).forEach(spawn => {
        if (spawn.spawning !== null) {
            if (spawn.spawning.name.includes("Hopper")) {
                spawn.spawning.setDirections([TOP, TOP_RIGHT, TOP_LEFT]);
            }
            else {
                spawn.spawning.setDirections([RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT]);
            }
        }
    });

    // clear memory
    if(Game.time % 1500 == 0) {
        for(let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        spawnRandomScout();

    }

    for (var name in Game.creeps) {
        const startCpu = Game.cpu.getUsed();


        var creep = Game.creeps[name];

        if (Object.keys(roles).includes(creep.memory["role"])) {
            roles[creep.memory["role"]](creep);
        }
    
        var elapsed = Game.cpu.getUsed() - startCpu;


        // if (name.includes("Harvester")) {
            // console.log('<span>Creep '+name+' used: <span style="color:rgba('+(255 * elapsed)+', '+(255-(elapsed*150))+', 0, 1);">'+elapsed+'</span> CPU</span>');
        //     // console.log(creep.room, creep.ticksToLive)
        // }
    }    

    Object.values(Game.rooms).forEach(room => {
        // room.roomManager().run(room)

        var roomStartCpu = Game.cpu.getUsed();
        if (rooms[room.name] && room.name == rooms[room.name].name) {
            rooms[room.name].run(room);
        }
        else {
            rooms[room.name] = new RoomManager(room);
        }

        if (Game.time % 10000 == 0) {
            rooms[room.name] = new RoomManager(room);
        }
        
    //     // console.log(rooms[room.name].test)

        var roomElapsed = Game.cpu.getUsed() - roomStartCpu;
        // console.log('<span>[Room '+'<a href="#!/room/'+Game.shard.name+'/'+room.name+'">'+room.name+'</a>] used: <span style="color:rgba('+((roomElapsed*155) )+', '+(255-(roomElapsed*85))+', 0, 1);">'+roomElapsed+'</span> CPU</span>');
    })



    if (Game.resources.pixel && Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }

    console.log("------------------------- END OF TICK "+Game.time+ " CPU: "+Game.cpu.getUsed().toFixed(2)+"/"+Game.cpu.limit+" "+(Game.cpu.getUsed()/Game.cpu.limit*100).toFixed()+"% --------------")
}