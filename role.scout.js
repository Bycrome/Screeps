const movement = require("helper.movement");

module.exports = {
    run(creep) {
        
        if (creep.memory.room == null) {
            creep.memory.room = creep.room.name;
            module.exports.recordExploration(creep);
        }

        if (creep.room.name != creep.memory.room) {
            module.exports.recordExploration(creep);
        }

        if (!creep.memory.target || creep.room.name == creep.memory.target) {
            module.exports.findNewTarget(creep);
        }

        if(creep.memory.target && creep.room.name !== creep.memory.target) {
            movement.moveToRoom(creep, creep.memory.target);
            return;
        } else if(movement.isOnExit(creep)) {
            movement.leaveExit(creep);
        }
    },
    recordExploration(creep) {
        Memory.rooms[creep.room.name].lastScouted = Game.time;

        if(creep.memory.explored == null) {
            creep.memory.explored = [];
        }
        if (!(creep.memory.explored).includes(creep.room.name)) {
            creep.memory.explored.push(creep.room.name);
        }
        
    },
    findNewTarget(creep) {
        let adjacentRooms = Object.values(Game.map.describeExits(creep.room.name));
        let record = -1;

        adjacentRooms.forEach(room => {
            if(!Memory.rooms[room] || Memory.rooms[room] && !Memory.rooms[room].lastScouted) {
                // lastScouted.push({"tick": 0, "room": room});
                record = 0;
                creep.memory.target = room;
                return true;
            }
            else if (Memory.rooms[room].lastScouted) {
                // lastScouted.push({"tick": Memory.rooms[room].lastScouted, "room": room});
                
                if (record == -1 || Memory.rooms[room].lastScouted < record) {
                    creep.memory.target = room;
                }
            }
        });
        return true;
    }
};