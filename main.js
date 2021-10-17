// _______        _______ _______ _______ _______ \\
// |_____| |      |_____|    |    |______ |______ \\
// |     | |_____ |     |    |    |______ ______| \\
//                   SCREEPS AI                   \\
//        CREATED BY: CABBAGEMAN & BYCROME        \\

var roleHarvester = require('harvester');
var roleCourier = require("courier")
  
const RoomManager = require('room.manager');

const roles = {
    "rangedDefender": require('role.rangedDefender').run, 
    "harvester": roleHarvester.zergHarvester, 
    "efficientHarvester": require('role.harvester').run, 
    "mineralHarveseter": roleHarvester.mineralHarvester, 
    "externalZerg": roleHarvester.externalZerg,
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
    "transfer": require('transfer').run, 
    "reserver": require("reserver").reserver, 
    // "builder": require("construction").repair, 
    "downgrader": require("role.downgrader").run, 
    "builder": require("role.builder").run,
    "hopper": require('role.hopper').run,
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
    "hybrid": require('role.hybrid').run
}
roles["closeDeathEfficientHarvester"] = roles["efficientHarvester"]

require("commands");
require("creep");
require("room");

Memory.global = {};
Memory.global.communes = [];

var rooms = {}
// Object.values(Game.spawns).forEach(spawn => {
//     if (!Object.keys(rooms).includes(spawn.room.name)) {
//         rooms[spawn.room.name] = new RoomManager(spawn.room);
//     }
// });

module.exports.loop = function () {
    // Game.spawns['Spawn2'].spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], "Bycrome", { memory: { target: "E51N19", role: 'attacker'} });
    // Game.spawns['Spawn5'].spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], "Bycrome1", { memory: { target: "E51N19", role: 'attacker'} });
    // Game.spawns['Spawn6'].spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], "Bycrome2", { memory: { target: "E51N19", role: 'attacker'} });
    
    // if (2==1) {
    //     for (room in Memory.rooms) {
    //         // console.log(room);
    //         // Game.map.visual.circle(new RoomPosition(25,25,room));
    //         Game.map.visual.text(room, new RoomPosition(2,4,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5});
    //         if (Memory.rooms[room].sources.length > 2) {
    //             Game.map.visual.text("Sources: "+Memory.rooms[room].sources.length, new RoomPosition(2,9,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5}); 
    //             Game.map.visual.text("Minerals: "+Memory.rooms[room].mineralsTypes[0], new RoomPosition(2,14,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5}); 
    //             Game.map.visual.rect(new RoomPosition(0, 0, room), 50, 50, {fill: '#E7681E', opacity:0.2, stroke: '#000000'});
    //         }
    //         else if (Memory.rooms[room].mineralsTypes[0] != undefined) {
    //             Game.map.visual.text("Sources: "+Memory.rooms[room].sources.length, new RoomPosition(2,9,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5}); 
    //             Game.map.visual.text("Minerals: "+Memory.rooms[room].mineralsTypes[0], new RoomPosition(2,14,room), {color: '#ffff', opacity: 1, align:"left", fontSize: 5}); 
    //             Game.map.visual.rect(new RoomPosition(0, 0, room), 50, 50, {fill: '#12de26', opacity:0.2, stroke: '#000000'});
    //         }
    //         else {
    //             Game.map.visual.rect(new RoomPosition(0, 0, room), 50, 50, {fill: '#FF0000', opacity:0.2, stroke: '#000000'});
    //         }
    //     }
    // }
    

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

    //     var roomElapsed = Game.cpu.getUsed() - roomStartCpu;
    //     // console.log('<span>[Room '+'<a href="#!/room/'+Game.shard.name+'/'+room.name+'">'+room.name+'</a>] used: <span style="color:rgba('+((roomElapsed*155) )+', '+(255-(roomElapsed*85))+', 0, 1);">'+roomElapsed+'</span> CPU</span>');
    })

    // clear memory
    if(Game.time % 100 == 50) {
        for(let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }


    for (var name in Game.creeps) {
        const startCpu = Game.cpu.getUsed();


        var creep = Game.creeps[name];

        if (Object.keys(roles).includes(creep.memory["role"])) {
            roles[creep.memory["role"]](creep);
        }
        // else {
        //     creep.say("BAD ROLE");
        // }

        var elapsed = Game.cpu.getUsed() - startCpu;


        // if (name.includes("Harvester")) {
        //     console.log('<span>Creep '+name+' used: <span style="color:rgba('+(255 * elapsed)+', '+(255-(elapsed*150))+', 0, 1);">'+elapsed+'</span> CPU</span>');
        //     console.log(creep.room, creep.ticksToLive)
        // }

        // console.log('<span>Creep '+name+' used: <span style="color:rgba('+(255 * elapsed)+', '+(255-(elapsed*150))+', 0, 1);">'+elapsed+'</span> CPU</span>');
    }


    if (Game.resources.pixel && Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }


    // console.log("------------------------- END OF TICK "+Game.time+" --------------")
}