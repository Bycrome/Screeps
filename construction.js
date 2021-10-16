var helper = require('helper');

module.exports = {
    repair(creep) {
        // if target is defined and creep is not in target room
        if (creep.memory.target != undefined && creep.room.name != creep.memory.target) {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return;
        }
        else {
            if (creep.pos.y == 49) {
                creep.move(TOP);
            }
            else if (creep.pos.x == 0) {
                creep.move(RIGHT);
            } 
            else if (creep.pos.x == 49) {
                creep.move(LEFT);
            }
            else if (creep.pos.y == 0) {
                creep.move(BOTTOM);
            }
            
        }

        
        // console.log(creep.memory.target)
        // if (creep.room.name == "W7N4") {
        //     creep.moveTo(20, 20)
        // }

        // if there is no target set
        if (creep.memory.target == undefined) {
            creep.memory.target = creep.room.name;
        }

        // if creep is trying to repair something but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        // default case
        if (creep.memory.working == null) {
            creep.memory.working = false;
        }

        
        if (creep.memory.working == true) {
            // repair structues with more damage first
            var structures = creep.room.find(FIND_MY_STRUCTURES, {
                filter: object => object.hits < (object.hitsMax - (object.hitsMax/4))  && object.structureType != STRUCTURE_WALL && object.structureType != STRUCTURE_RAMPART
            });

            if (structures.length == 0) {
                structures = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
                });
            }

            var structure = creep.pos.findClosestByPath(structures);
            if (structure != undefined) {
                helper.tryElseMove(creep, structure, "blue", "repair");
            }
            else {
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (constructionSite != undefined) {
                    // try to build, if the constructionSite is not in range
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        // move towards the constructionSite
                        creep.moveTo(constructionSite);
                    }
                }
                else {
                    helper.tryElseMove(creep, creep.room.controller, "yellow", 'upgradeController');
                }
            }
        }
        else {
            if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 50000) {
                helper.tryElseMove(creep, creep.room.storage, "red", "withdraw");
            }
            else {
                helper.tryElseMove(creep, creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES_ACTIVE)), "yellow", "harvest");
            }
        }
    }
}