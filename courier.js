var helper = require('helper');

module.exports = {
    transport(creep) {
        if(creep.memory["full"] && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory["full"] && creep.store.getFreeCapacity() == 0) {
            creep.memory.full = true;
        }

        if(creep.memory["full"]== null) {
            creep.memory.full = false;
        }

        if (!creep.memory["full"]) {
            var container = Game.getObjectById(creep.memory.target);
            helper.tryElseMove(creep, container, "#800080", "withdraw");
        }
        else {
            helper.tryElseMove(creep, Game.rooms[creep.memory.room].storage, "#800080", "transfer");
        }
    
        
    },
    courier(creep){

      
        if(creep.memory["full"] && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory["full"] && creep.store.getFreeCapacity() == 0) {
            creep.memory.full = true;
        }

        if(creep.memory["full"]== null) {
            creep.memory.full = false;
        }

        if (!creep.memory["full"]) {
            helper.AquireEnergy(creep);
        }
        else {
            helper.tryElseMove(creep, creep.room.storage, "#000000", "transfer");
        }
    
    },
    courierII(creep) {

        var storage = Game.getObjectById(creep.memory.storage);
        if(creep.memory.full && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory.full && creep.store.getFreeCapacity() == 0) {
            creep.memory.full = true;
            creep.memory.target = null;
        }
        if (creep.memory.full == null) {
            creep.memory.full = false;
        }
        if(creep.memory.full) {
            if (creep.room.name != storage.room.name) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(storage.room.name)));
            }
            else {
                helper.tryElseMove(creep, storage, "#000000", "transfer");
                creep.memory.target = null;
            }
        }
        else {
            if (creep.room.name != creep.memory.room) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.room)));
            }
            else {
                if (creep.memory.target == null) {
                    var energy = helper.findBestDroppedEnergy(creep.room);
                    if (energy.length > 0) {
                        creep.memory.target = energy[0].id;
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
    },
    courierIII(creep) {
        if(creep.memory.full && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory.full && creep.store.getFreeCapacity() == 0) {
            creep.memory.full = true;
            creep.memory.target = null;
        }
        if (creep.memory.full == null) {
            creep.memory.full = false;
        }
        if(creep.memory.full) {
            if (creep.room.name != creep.memory.to) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.to)));
            }
            else {
                helper.tryElseMove(creep, creep.room.storage, "#000000", "transfer");
            }
        }
        else {
            if (creep.room.name != creep.memory.from) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.from)));
            }
            else {
                
                var storage = Game.getObjectById(creep.room.memory.storage);
                helper.tryElseMove(creep, storage, "#000000", "withdraw");
            }
        }
    },
}