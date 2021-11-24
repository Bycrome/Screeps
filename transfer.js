
var helper = require('helper');
module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.full && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.full = false;
	    }
	    if(!creep.memory.full && creep.store.getFreeCapacity() == 0) {
	        creep.memory.full = true;
	    }
        if (creep.memory.full == null) {
            creep.memory.full = false;
        }

	    if(creep.memory.full) {
        
            // var test = creep.room.memory.extensions.forEach(id => Game.getObjectById(id));
            // let cpu = Game.cpu.getUsed();
            // var test = [];
            // creep.room.memory.extensions.forEach(id => test.push(Game.getObjectById(id)));
            // console.log(test)
            // console.log(`cpu: ${Game.cpu.getUsed() - cpu}`);

            
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_LAB || structure.structureType == STRUCTURE_SPAWN) &&  structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });

            if (!target) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(structure) {
                        return ((structure.structureType == STRUCTURE_TOWER ) &&  structure.store.getFreeCapacity(RESOURCE_ENERGY) > 50);
                    }
                });
            }

            if (!target) {
                creep.say('idle')
                let idle = Game.flags[creep.memory.room+" TRANSFER IDLE"];
                if (idle && creep.pos !== idle.pos) {
                    creep.moveTo(idle.pos);
                }
            }
            else {
                helper.tryElseMove(creep, target, "green", "transfer");
            }
        }
        else {
            if (creep.room.storage) {
                helper.tryElseMove(creep, creep.room.storage, "red", "withdraw");
            }
            if (creep.room.terminal) {
                if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            }
            else {
                creep.say("no storage")
            }
        }
        
        // else {}
        // else if (creep.ticksToLive < 2 && creep.room.storage) {
        //     helper.tryElseMove(creep, creep.room.storage, "green", "transfer");
        // }
        // else if (creep.ticksToLive < 2 && creep.room.terminal) {
        //     helper.tryElseMove(creep, creep.room.terminal, "green", "transfer");
        // }
    }
};
