const c = require('config');
var helper = require('helper');

module.exports = {
    efficientHarvester(creep) {
        // note change the memory to store the id instead of the whole target object
        var source = Game.getObjectById(creep.memory.target);
        
        // if not in correct room navigate to correct room
        if (creep.room.name != source.room.name) {
                // note may be worth adding to helper since it will be needed across multiple roles
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(source.room.name)));
        }
        else {
            // if full
            if(creep.memory["full"] && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.full = false;
            }
            if(!creep.memory["full"] && creep.store.getFreeCapacity() < 12) {
                creep.memory.full = true;
            }
    
            if(creep.memory["full"]== null) {
                creep.memory.full = false;
            }

            if (creep.memory.full) {
                if (creep.room.memory.sourceLinks[creep.memory.target] && (creep.room.memory.mainLink != undefined || creep.room.memory.controllerLink != undefined)) {
                    var link = Game.getObjectById(creep.room.memory.sourceLinks[creep.memory.target]);
                    if (800-link.store.energy >= creep.store[RESOURCE_ENERGY]) {
                        helper.tryElseMove(creep, link, "yellow", "transfer");
                    }
                    else {
                        helper.storeEnergy(creep);
                    }
                    if ((creep.room.memory.mainLink != undefined || creep.room.memory.controllerLink != undefined) && link.cooldown == 0 && link.store.energy > 400) {
                        var mainLink = Game.getObjectById(creep.room.memory["mainLink"]);
                        var controllerLink = Game.getObjectById(creep.room.memory["controllerLink"]);
                        if (controllerLink && (800-controllerLink.store.energy) >= link.store.energy) {
                            link.transferEnergy(controllerLink);
                        }
                        else if (mainLink && (800-mainLink.store.energy) >= link.store.energy) {
                            link.transferEnergy(mainLink);
                        }
                    }
                }
                else {
                    helper.storeEnergy(creep);
                }
            }
            else {
                helper.tryElseMove(creep, source, "yellow", "harvest");
            }
        }
    },
    zergHarvester(creep){

        var source = Game.getObjectById(creep.memory.target);

        if (source == null || source == undefined) {
            creep.memory.source = creep.pos.findClosestByRange(FIND_SOURCES);
        }

        if(creep.memory["full"] == null) {
            creep.memory.full = false;
        }

        if(creep.memory["full"] && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory["full"] && creep.store.getFreeCapacity() == 0) {
            creep.memory.full = true;
        }
        
        if (creep.memory.full) {
            if (creep.room.controller.ticksToDowngrade < 1000 && helper.GetAmountOfRoleWithRoom("harvester", creep.room.name) > 1) {
                helper.tryElseMove(creep, creep.room.controller, "yellow", 'upgradeController');
            }
            else if (creep.room.energyCapacityAvailable != creep.room.energyAvailable) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (target != null) {
                    helper.tryElseMove(creep, target, "yellow", 'transfer')
                }
                else {
                    helper.tryElseMove(creep, creep.room.controller, "yellow", 'upgradeController');
                }
            }
            else {
                helper.tryElseMove(creep, creep.room.controller, "yellow", 'upgradeController');
            }
        }
        else {
            helper.tryElseMove(creep, source, "yellow", "harvest");
        }
    },
    externalZerg(creep) {
        if(creep.memory["full"] && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory["full"] && creep.store.getFreeCapacity() == 0) {
            creep.memory.full = true;
        }

        if(creep.memory["full"]== null) {
            creep.memory.full = false;
        }

        if (creep.memory.full) {
            if (creep.room.name != Game.spawns["Spawn1"].room.name) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(Game.spawns["Spawn1"].room.name)));
            }
            else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (target != null) {
                    helper.tryElseMove(creep, target, "yellow", 'transfer')
                }
                else {
                    var target = helper.findStoreNotFull(creep);
                    if (target != null) {
                        helper.tryElseMove(creep, target, "yellow", 'transfer');
                    }
                    else {
                        helper.tryElseMove(creep, creep.room.controller, "yellow", 'upgradeController');
                    }
                }
            }
        }
        else {
            if (creep.room.name != creep.memory.target) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target)));
            }
            else {
                var target = creep.pos.findClosestByRange(FIND_SOURCES);
                helper.tryElseMove(creep, target, "yellow", 'harvest');
            }
        }
    },
    mineralHarvester(creep){

        if(creep.memory["full"] && _.sum(creep.carry) == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory["full"] && creep.carryCapacity == _.sum(creep.carry)) {
            creep.memory.full = true;
        }

        if(creep.memory["full"]== null) {
            creep.memory.full = false;
        }

        if (creep.memory.full) {
            if (creep.room.terminal) {
                if(creep.transfer(creep.room.terminal, Object.keys(creep.carry)[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }
        else {
            var source = Game.getObjectById(creep.memory.target);
            if (source) {
                helper.tryElseMove(creep, source, "yellow", 'harvest');
            }
            
        }
    }
}