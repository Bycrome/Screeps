const movement = require("helper.movement");

module.exports = {
    run: function(creep) {
        
        if(creep.ticksToLive == CREEP_LIFE_TIME - 1) creep.notifyWhenAttacked(false);

        if (creep.memory.boosts) {
            boosting.tryBoost(creep);
            return;
        }



        if (creep.store.getUsedCapacity() == 0) {

            creep.memory.full = false
    
        } else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) {
    
            creep.memory.full = true
        }
        else if (creep.memory.full == undefined) {
            creep.memory.full = false
        }
        

        if (creep.memory["full"]) {
            if(creep.memory.room && creep.room.name !== creep.memory.room) {
                movement.moveToRoom(creep, creep.memory.room);
                return;
            }
            else if(movement.isOnExit(creep)) {
                movement.leaveExit(creep);
            }
            else {
                if (creep.room.terminal) {
                    if(creep.transfer(creep.room.terminal, _.last(_.keys(creep.store))) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.terminal);
                }
                else if (creep.room.storage) {
                    if(creep.transfer(creep.room.storage, _.last(_.keys(creep.store))) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.storage);
                }
                else {
                    creep.say('no storage');
                }
            }
        }
        else {
            if(creep.memory.target && creep.room.name !== creep.memory.target) {
                movement.moveToRoom(creep, creep.memory.target);
                return;
            }
            else if(movement.isOnExit(creep)) {
                movement.leaveExit(creep);
            }
            else {
                if (creep.room.terminal != undefined && Object.keys(creep.room.terminal.store).length > 0) {
                    if(creep.withdraw(creep.room.terminal, _.last(_.keys(creep.room.terminal.store))) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal);
                    } 
                }
                
                else if (creep.room.storage != undefined && Object.keys(creep.room.storage.store).length > 0) {
                    if(creep.withdraw(creep.room.storage, _.last(_.keys(creep.room.storage.store))) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                }
                else {
                    creep.say('no storage');
                }
                

            }
        }
    },
}