const CreepMover = require("creep.mover");
const PathBuilder = require("pathbuilder");
const ff = require("helper.aliance");

Creep.prototype.goTo = function(target, options) {
    // TODO: stop using anything else than newPathing
    if(!options || options.newPathing !== false) {
        let mover = new CreepMover(this, target, options);
        return mover.move();
    }

    let builder = new PathBuilder();
    options = options || {}
    if(options.avoidHostiles) {
        builder.avoidHostiles = true;
        if(_.some(ff.findHostiles(this.room), (c) => _.some(c.parts, (p) => p.type === ATTACK || p.type === RANGED_ATTACK))) {
            options.reusePath = 0;
        }
    }
    options.costCallback = builder.getAdditiveCallback();
    return this.moveTo(target, options);
}

Creep.prototype.hasBoost = function(partType, boostType) {

    let creep = this

    for (let part of creep.body) {

        if (part.hits == 0) continue
        if (part.type != partType) continue
        if (part.boost != boostType) continue

        return true
    }
}

Creep.prototype.fleeFrom = function(hostiles, range) {
    if(!Array.isArray(hostiles)) hostiles = [hostiles];
    hostiles = _.map(hostiles, (h) => ({ pos: h.pos, range: range }));
    let result = PathFinder.search(this.pos, hostiles, { flee: true });
    return this.moveByPath(result.path);
}

Creep.prototype.canAttack = function() {
    return _.some(this.body, (p) => p.type === ATTACK || p.type === RANGED_ATTACK);
}

Creep.prototype.hasPartsOfTypes = function(partTypes) {

    let creep = this

    for (let partType of partTypes) {

        if (creep.body.some(part => part.type == partType)) return true
    }
}
Creep.prototype.findParts = function(partType) {

    creep = this

    let partsAmount = 0

    for (let part of creep.body) {

        if (part.type == partType) partsAmount += 1
    }

    return partsAmount
}

Creep.prototype.rampartPathing = function(origin, goal) {

    creep = this

    var path = PathFinder.search(origin, goal, {
        plainCost: 200,
        swampCost: 255,
        maxRooms: 1,

        roomCallback: function(roomName) {

            let room = Game.rooms[roomName]

            if (!room) return

            let cm

            cm = new PathFinder.CostMatrix

            let roads = creep.room.find(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_ROAD
            })

            for (let road of roads) {

                cm.set(road.pos.x, road.pos.y, 50)
            }

            let ramparts = creep.room.find(FIND_MY_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_RAMPART
            })

            for (let rampart of ramparts) {

                cm.set(rampart.pos.x, rampart.pos.y, 1)
            }

            let constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
                filter: s => s.structureType != STRUCTURE_CONTAINER && s.structureType != STRUCTURE_ROAD && s.structureType != STRUCTURE_RAMPART
            })

            for (let site of constructionSites) {

                cm.set(site.pos.x, site.pos.y, 255)
            }

            let structures = creep.room.find(FIND_STRUCTURES, {
                filter: s => s.structureType != STRUCTURE_RAMPART && s.structureType != STRUCTURE_ROAD && s.structureType != STRUCTURE_CONTAINER
            })

            for (let structure of structures) {

                cm.set(structure.pos.x, structure.pos.y, 255)
            }

            for (let creep of room.find(FIND_CREEPS)) {

                cm.set(creep.pos.x, creep.pos.y, 255)
            }

            for (let creep of room.find(FIND_POWER_CREEPS)) {

                cm.set(creep.pos.x, creep.pos.y, 255)
            }

            return cm
        }
    }).path

    creep.memory.path = path

    creep.moveByPath(creep.memory.path)

}

Creep.prototype.isCreep = true;