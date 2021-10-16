
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

	    if(creep.memory.full && creep.ticksToLive > 2) {
        
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
        else if (creep.ticksToLive < 2 && creep.room.storage) {
            helper.tryElseMove(creep, creep.room.storage, "green", "transfer");
        }
        else {
            if (creep.room.storage) {
                helper.tryElseMove(creep, creep.room.storage, "red", "withdraw");
            }
            else {
                creep.say("no storage")
            }
        }
    }
};
