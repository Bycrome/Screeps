module.exports = {
    run(creep) {
        
        if(creep.memory["full"] && _.sum(creep.carry) == 0) {
            creep.memory.full = false;
        }
        if(!creep.memory["full"] && _.sum(creep.carry) > 0) {
            creep.memory.full = true;
        }

        if(creep.memory["full"]== null) {
            creep.memory.full = false;
        }

        if (!creep.memory["full"]) {
            var from = Game.getObjectById(creep.memory.from);
            if( creep.withdraw(from, _.last(Object.keys(from.store))) == ERR_NOT_IN_RANGE) {
                creep.moveTo(from);
            }
        }
        else {
            var to = Game.getObjectById(creep.memory.to);
            if(creep.transfer(to, _.last(Object.keys(creep.store))) == ERR_NOT_IN_RANGE) {
                creep.moveTo(to);
            }
        }        
    }
}