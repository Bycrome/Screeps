const helper = require('helper');

const BODY_CONFIG = [TOUGH,CARRY,WORK,CLAIM,ATTACK,RANGED_ATTACK,MOVE,HEAL];


module.exports = class roomCreepSpawner {
    constructor(room) {
        this.room = room;
        this.spawnQueue = {};
        this.roomCreeps = {};
    }

    run(roomDefcon, spawns, room) {

        this.room = room;

        this.getCreeps(spawns);


        this.manageLast(spawns);


        // console.log(room.name)
        // console.log(JSON.stringify(this.roomCreeps))

        if (roomDefcon < 4) this.manageDefnder(spawns);

        this.manageUpgrader(spawns);        
        this.manageBuilders(spawns);

        if (!room.storage && !room.terminal) return;

        this.manageHopper(spawns);
        this.manageTransfer(spawns);

        if (roomDefcon < 5) return;
        
        this.manageHarvester(spawns);
        this.manageTransporters(spawns);

        if (room.controller.level < 6) return;

        // this.manageMineralHarvester(spawns);

    }


    harvesterBuilder(limit) {
        let body = [CARRY];
        let cost = BODYPART_COST[CARRY];
        let work = 0;
        let move = 0
        while (cost < this.room.energyAvailable && work < limit) {
            if (move < work/2) {
                move++;
                body.push(MOVE);
                cost += BODYPART_COST[MOVE];
            }
            else {
                work++;
                body.push(WORK);
                cost += BODYPART_COST[WORK];
            }
        }
        return body;    
    }

    manageHarvester(spawns) {
        var possible = this.room.memory.sources;
        if (!this.manageRole("Harvester", possible.length)) return;
       
        possible.forEach(source => {
            if (helper.OccupiedSource(source, "Harvester") < 1) {
                this.spawn(spawns, this.harvesterBuilder(10), this.nameCreep("Harvester", this.room.name), { memory: { role: 'Harvester', target: source, room: this.room.name }});
            }
        });
        
    }

    manageDefnder(spawns) {
        if (this.manageRole("rangedDefender", 3)) {
            this.spawn(spawns, this.BuildBody([RANGED_ATTACK, RANGED_ATTACK, MOVE], this.room, null), this.nameCreep("Defender", this.room.name), { memory: { role: 'rangedDefender', room: this.room.name} });   
        }
    }

    manageMineralHarvester(spawns) {
        if(this.manageRole("MineralHarveseter", 1)) {
            if (this.room.memory.extractor && this.room.memory.mineralActive && this.room.memory["minerals"][0] && this.room.terminal && this.room.terminal.store[this.room.memory["mineralsTypes"][0]] < 100000) {
                this.spawn(spawns, this.BuildBody([WORK, CARRY, MOVE], this.room, null), this.nameCreep("MineralHarveseter", this.room.name), { memory: { role: 'MineralHarveseter', target: this.room.memory["minerals"][0] } });
            
            }
            // this.spawn(spawns, this.harvesterBuilder(32), this.nameCreep("MineralHarveseter", this.room.name), { memory: { role: 'MineralHarveseter', target: this.room.memory["minerals"][0] } });
        }
    }

    manageHopper(spawns) {
        if (this.manageRole("Hopper", 1) && (this.room.storage || this.room.terminal) && this.room.controller.level >= 5) {
            this.spawn(spawns, [CARRY, CARRY], this.nameCreep("Hopper", this.room.name), { memory: { role: 'Hopper', room: this.room.name} })
        }
    }

    manageTransfer(spawns) {
        if (this.manageRole("Transfer", 1) && this.room.energyCapacityAvailable >= 800 && (this.GetAmountOfRoleWithRoom("Harvester")  > 1)) {
            this.spawn(spawns, this.BuildBody([CARRY, CARRY, MOVE], this.room, 4), this.nameCreep("Transfer", this.room.name), { memory: { role: 'Transfer', room: this.room.name } });
        }
    }

    manageLast(spawns) {
        if (this.manageRole("Transfer", 1) && this.manageRole("upgrader", 1)) {
            this.spawn(spawns, [WORK, CARRY, MOVE], this.nameCreep("Upgrader", this.room.name), { memory: { role: 'upgrader', room: this.room.name} });
        }
    }
    
    manageTransporters(spawns) {
        if (!this.room.memory.sourceContainers || !this.room.storage) return;
        if (this.GetAmountOfRoleWithRoom("Harvester", this.room.name) < this.room.memory.sources.length) return;

        for (var source in this.room.memory.sourceContainers) {
            if (!!this.room.memory.sourceLinks[source] && !!this.room.memory.mainLink) continue;
            if ((helper.OccupiedSource(this.room.memory.sourceContainers[source], "transport") < 1 || (this.room.memory.sourceDistance && helper.OccupiedSource(this.room.memory.sourceContainers[source], "transport") < Math.ceil(this.room.memory.sourceDistance[source] / 25)))) {
                // spawnHelper.spawn(this.spawns, this.BuildBody([CARRY, CARRY, MOVE], this.room, 4), helper.nameScreep("Transporter"), { memory: { role: 'transport', target: this.room.memory.sourceContainers[source], room: this.room.name } });
                this.spawn(spawns, this.BuildBody([CARRY, CARRY, MOVE], this.room, 4), this.nameCreep("transport", this.room.name), { memory: { role: 'transport', target: this.room.memory.sourceContainers[source], room: this.room.name } });
            }
        }
    
    }

    manageScientist(spawns) {
        if (this.manageRole("scientist", 1)) {
            this.spawn(spawns, [WORK, CARRY, MOVE], this.nameCreep("Scientist", this.room.name), { memory: { role: 'scientist', room: this.room.name} });
        }
    }

    manageNukeOperator(spawns) {
        if (helper.GetAmountOfRoleWithRoom("nukeOperator", this.room.name) < 1) {
            this.spawn(spawns, [CARRY, CARRY, MOVE], this.nameCreep("Nuke Operator", this.room.name), { memory: { role: 'nukeOperator', room: this.room.name} });
        }
    }

    manageClaimer(spawns) {
        var flag = Game.flags[this.room.name+" EXPANSION"];
        if (flag) {
            this.spawn(spawns, [CLAIM, MOVE, MOVE], this.nameCreep("Claimer", this.room.name), { memory: { role: 'claimer', room: this.room.name, target: (JSON.parse(JSON.stringify(flag.pos))).roomName } });
        }
    }

    manageRampartUpgraders(spawns) {
        if (this.room.storage && this.room.storage.store[RESOURCE_ENERGY] > 500000 && helper.GetAmountOfRoleTargeting("builder", this.room.name) < 1) {
            this.spawn(spawns, this.BuildBody([WORK, CARRY, MOVE], this.room, null), this.nameCreep("Builder", this.room.name), { memory: { role: 'builder', target: this.room.name } });   
        }
    }

    // fix
    manageExpansionBuilder() {
        var targets = Object.values(Game.constructionSites).filter((structure) => structure.structureType == STRUCTURE_SPAWN);
        var allSpawns = Object.values(Game.structures).filter((structure) => structure.structureType == STRUCTURE_SPAWN);

        if (targets.length > 0 && targets[0].room) {
            var closest = _.sortBy(allSpawns, s => s.pos.getRangeTo(targets[0]))

            if (helper.GetAmountOfRoleTargeting("builder", targets[0].room.name) < 3 ) {
                this.spawn(closest, this.BuildBody([WORK, CARRY, MOVE], this.room, null), helper.nameScreep("Builder"), { memory: { role: 'builder', target: targets[0].room.name } });
            }
        }
    }

    
    manageBuilders(spawns) {
        if (this.room.storage && this.GetAmountOfRoleWithRoom("Harvester", this.room.name) < this.room.memory.sources.length) return;
        var constructionSites = this.room.find(FIND_CONSTRUCTION_SITES);
        if (!this.room.storage && constructionSites.length > 0 && helper.GetAmountOfRoleTargeting("builder", this.room.name) < 4 && this.GetAmountOfRoleWithRoom("Upgrader", this.room.name) > 0) {
            this.spawn(spawns, this.BuildBody([WORK, CARRY, MOVE], this.room, null), this.nameCreep("builder", this.room.name), { memory: { role: 'builder', target: this.room.name } });
        }
        if (constructionSites.length > 0 && (this.GetAmountOfRoleWithRoom("Harvester", this.room.name) == this.room.memory.sources.length)) {
            if (helper.GetAmountOfRoleTargeting("builder", this.room.name) < (constructionSites.length / 10) ) {
                // 
                // if (!storage || (storage && storage.store[RESOURCE_ENERGY] > 50000)) {  
                    var max = (this.room.storage) ? (Math.floor(this.room.storage.store[RESOURCE_ENERGY] / 100000) + 1) : 1;
                    this.spawn(spawns, this.BuildBody([WORK, CARRY, MOVE], this.room, max), this.nameCreep("builder", this.room.name), { memory: { role: 'builder', target: this.room.name } });   
                // }
            }
        }
    }

    manageUpgrader(spawns) {
        if (this.room.controller.level == 8) {
            if (this.manageRole("Upgrader", 1)) {
                this.spawn(spawns, [WORK, CARRY, MOVE], this.nameCreep("Upgrader", this.room.name), { memory: { role: 'Upgrader', room: this.room.name } });
            }
        }
        else {
            let amount = 5;

            if (this.room.storage) amount = (Math.floor(this.room.storage.store[RESOURCE_ENERGY] / 75000) + 1);

            if (this.manageRole("Upgrader", amount)) {
                this.spawn(spawns, this.BuildBody([WORK, CARRY, MOVE], this.room, null), this.nameCreep("Upgrader", this.room.name), { memory: { role: 'Upgrader', room: this.room.name } });
            }

        }
    }

    manageRole(role, amountNeeded) {
        if ((!this.roomCreeps[role] || this.roomCreeps[role] < amountNeeded)) {
            return true;
        }
        return false;
    }

    GetAmountOfRoleWithRoom(role) {
        if (!this.roomCreeps[role]) return 0;
        else return this.roomCreeps[role];
    }

    nameCreep(role, roomName) {
        for (let i = 1; i < 999; i++) {
            var newName = role+"-"+roomName+"-"+i;
            if (!Object.keys(Game.creeps).includes(newName)) {
                return(newName);
            }
        }
    }

    getCreeps(spawns) {
        this.roomCreeps = {};

        for (let spawn of spawns) {
            if (!spawn.spawning) continue
            if (spawn.spawning && Game.creeps[spawn.spawning.name]) this.roomCreeps[Game.creeps[spawn.spawning.name].memory.role] ? this.roomCreeps[Game.creeps[spawn.spawning.name].memory.role]++ : this.roomCreeps[Game.creeps[spawn.spawning.name].memory.role] = 1;
        }

        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.ticksToLive <= creep.body.length * 3) continue;
            if (creep.memory.room != this.room.name) continue;
            this.roomCreeps[creep.memory.role] ? this.roomCreeps[creep.memory.role]++ : this.roomCreeps[creep.memory.role] = 1;
        }
    }

    BuildBody(base, room, max) {
        var arr = [];
        for (var i = 0; i <= (max || Math.floor(50/base.length)); i++) {
            var temp = arr.concat(base);
            if (this.bodyCost(temp) <= room.energyCapacityAvailable && temp.length < 50) {
                arr = arr.concat(base);
            }
        };
        return(arr.sort(function (a, b) {return BODY_CONFIG.indexOf(a) - BODY_CONFIG.indexOf(b);}));
    }

    
    bodyCost (body) {
        return body.reduce(function (cost, part) {
            return cost + BODYPART_COST[part];
        }, 0);
    }

    spawn(spawns, body, name, memory) {

        // if unable to spawn
        if (this.bodyCost(body) > this.room.energyAvailable) return;

        for (let spawn of spawns) {
            if (spawn.spawnCreep(body, name, memory) == OK) {
                return OK;
            }
        }
        return ERR_BUSY;
    }
}