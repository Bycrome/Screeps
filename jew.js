
var helper = require('helper');
var roleJew = {
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory["full"] && _.sum(creep.carry) == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory["full"] && creep.carryCapacity == _.sum(creep.carry)) {
            creep.memory.full = true;
            creep.memory.target = null;
        }
	    
        if (creep.memory.full == null) {
            creep.memory.full = false;
        }
	    if(creep.memory.full) {

            if (creep.store[RESOURCE_ENERGY] > 0) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            else {
                targets = [creep.room.storage, creep.room.terminal];
            }
            
            var target = creep.pos.findClosestByRange(targets);
            helper.tryElseMove(creep, target, "#000000", "transfer");

            if(creep.transfer(target, Object.keys(creep.carry)[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            
            creep.memory.target = null;
        }
        else {
            if (creep.memory.target == null) {
                var energy = helper.findBestDroppedEnergy(creep.room);
                if (energy.length > 0) {
                    creep.memory.target = energy[0].id;
                }
                else {
                    if (helper.GetAmountOfRole("scout") < 1) {
                        creep.memory = { role: 'scout' };
                    }
                    else {
                        creep.suicide();
                    }
                    
                }
            }
            else {
                var target = Game.getObjectById(creep.memory.target);
                if (target == null) {
                    creep.memory.target = null;
                }
                else {
                    helper.tryElseMove(creep, target, "#000000", "pickup");
                }
            }
        }
    }
};

module.exports = roleJew;