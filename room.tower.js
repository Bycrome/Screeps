module.exports = {
    run: function(tower, room, storage, controllerLevel) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // && target.pos.y > 1 && target.pos.y < 48 && target.pos.x > 1 && target.pos.x < 48
        if (target != undefined ) {
            tower.attack(target);
        }
        else if (target != undefined) {
            // maybe heal friendly
        }
        else {
            // replace 50000
            var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
            });
            if (target != undefined) {
                tower.repair(target);
            }
            else {

                if (tower.energy > 500) {
                    var targets = room.find(FIND_STRUCTURES).filter((s) => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART);
                    if (targets) {
                        if (storage && storage.store[RESOURCE_ENERGY] > 150000 * room.memory.sources.length) {
                            var sum = _.sum(targets, 'hits')
                            targets = targets.filter(t => t.hits <= sum / targets.length);
                            var target = targets.sort(function (a, b) {
                                return a.hits - b.hits;
                            })[0];
                            // if (target != undefined && (target.hits < 5000000 || (storage.store[RESOURCE_ENERGY] > 150000 * room.memory.sources.length * 2))) {
                            // if (target != undefined && (target.hits < 100000 || (storage.store[RESOURCE_ENERGY] > 250000 * room.memory.sources.length))) {
                            if (target != undefined && (target.hits < 100000)) {
                                tower.repair(target);
                            }
                        }
                        // else if (storage && storage.store[RESOURCE_ENERGY] > 50000) {
                        //     var target = targets.sort(function (a, b) {
                        //         return a.hits - b.hits;
                        //     })[0];
                        //     if (target != undefined && target.hits < (6 ** room.memory.controllerLevel)) {
                        //         tower.repair(target);
                        //     }
                        // }
                    }


                }
            }
        }
    }
}