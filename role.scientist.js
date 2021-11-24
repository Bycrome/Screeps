
const boostTypes = {
    "attack": RESOURCE_CATALYZED_UTRIUM_ACID,
    "harvest": RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
    "carry": RESOURCE_CATALYZED_KEANIUM_ACID,
    "ranged": RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
    "construction": RESOURCE_CATALYZED_LEMERGIUM_ACID,
    "heal": RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    "dismantle": RESOURCE_CATALYZED_ZYNTHIUM_ACID,
    "move": RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    "upgrade": RESOURCE_CATALYZED_GHODIUM_ACID,
    "tough": RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
}

const REACTIONS = {

    // Base compounds
    "UL": [RESOURCE_UTRIUM, RESOURCE_LEMERGIUM],
    "ZK": [RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM],
    "G": [RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE],
    "OH": [RESOURCE_OXYGEN, RESOURCE_HYDROGEN],

    // Tier 1 compounds
    "UH": [RESOURCE_UTRIUM, RESOURCE_HYDROGEN],
    "KH": [RESOURCE_KEANIUM, RESOURCE_HYDROGEN],
    "GH": [RESOURCE_GHODIUM, RESOURCE_HYDROGEN],
    "LH": [RESOURCE_LEMERGIUM, RESOURCE_HYDROGEN],
    "ZH": [RESOURCE_ZYNTHIUM, RESOURCE_HYDROGEN],
    "KO": [RESOURCE_KEANIUM, RESOURCE_OXYGEN],
    "LO": [RESOURCE_LEMERGIUM, RESOURCE_OXYGEN],
    "ZO": [RESOURCE_ZYNTHIUM, RESOURCE_OXYGEN],
    "UO": [RESOURCE_UTRIUM, RESOURCE_OXYGEN],
    "GO": [RESOURCE_GHODIUM, RESOURCE_OXYGEN],

    // Tier 2 compounds
    "UH2O": [RESOURCE_UTRIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    "UHO2": [RESOURCE_UTRIUM_OXIDE, RESOURCE_HYDROXIDE],
    "KH2O": [RESOURCE_KEANIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    "KHO2": [RESOURCE_KEANIUM_OXIDE, RESOURCE_HYDROXIDE],
    "LH2O": [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    "LHO2": [RESOURCE_LEMERGIUM_OXIDE, RESOURCE_HYDROXIDE],
    "ZH2O": [RESOURCE_ZYNTHIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    "ZHO2": [RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_HYDROXIDE],
    "GH2O": [RESOURCE_GHODIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    "GHO2": [RESOURCE_GHODIUM_OXIDE, RESOURCE_HYDROXIDE],

    // Tier 3 compounds
    "XZHO2": [RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYST],
    "XGH2O": [RESOURCE_GHODIUM_ACID, RESOURCE_CATALYST],
    "XUH2O": [RESOURCE_UTRIUM_ACID, RESOURCE_CATALYST],
    "XUHO2": [RESOURCE_UTRIUM_ALKALIDE, RESOURCE_CATALYST],
    "XKH2O": [RESOURCE_KEANIUM_ACID, RESOURCE_CATALYST],
    "XKHO2": [RESOURCE_KEANIUM_ALKALIDE, RESOURCE_CATALYST],
    "XLH2O": [RESOURCE_LEMERGIUM_ACID, RESOURCE_CATALYST],
    "XLHO2": [RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_CATALYST],
    "XZH2O": [RESOURCE_ZYNTHIUM_ACID, RESOURCE_CATALYST],
    "XGHO2": [RESOURCE_GHODIUM_ALKALIDE, RESOURCE_CATALYST]
}

const BASES = [RESOURCE_HYDROGEN, RESOURCE_OXYGEN, RESOURCE_UTRIUM, RESOURCE_KEANIUM, RESOURCE_LEMERGIUM, RESOURCE_ZYNTHIUM, RESOURCE_CATALYST];

const MINAMOUNT = 3000;
// const MINAMOUNT = 1250;


let reactionLab1;
let mainLab;
let labs;

module.exports = {
    run(creep) {

        // if (creep.room.memory.reaction) {
        //     creep.say(creep.room.memory.reaction.type + " " + creep.room.memory.reaction.amount);
        // }
        // else {
        //     creep.say("no reaction")
        // }

        // if (creep.memory.capacity == null) {
        //     creep.memory.capacity = creep.store.getCapacity()
        // }

        if (creep.memory["full"] && _.sum(creep.carry) == 0) {
            creep.memory.full = false;
        }

        if (!creep.memory["full"] && _.sum(creep.carry) > 0) {
            creep.memory.full = true;
        }

        if (creep.memory["full"] == null) {
            creep.memory.full = false;
        }

        if (creep.memory.full) {

            
            var to = Game.getObjectById(creep.memory.toID);
            if (!to) return;
            
            if (_.sum(creep.carry) > to.store.getFreeCapacity(creep.memory.resource)) {
                creep.memory.toID = creep.room.terminal.id;
            }
            if (creep.transfer(to, creep.memory.resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(to, { visualizePathStyle: { stroke: '#ff0000' } });
            }
        }
        else {
            
            if (Game.time % 10 == 0) {
                module.exports.getReaction(creep, labs)
            }

            if (creep.room.memory.reaction) {
                module.exports.createBoosts(creep)
            }
            else {
                creep.say('dead end')
            }


            if (creep.ticksToLive > 3 && creep.memory.fromID != null) {
                var from = Game.getObjectById(creep.memory.fromID);
                if (creep.withdraw(from, creep.memory.resource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(from, { visualizePathStyle: { stroke: '#ff0000' } });
                }
            }
        }
    },
    createBoosts(creep) {

        // var flag = Game.flags[creep.room.name];
        // var allLabs = creep.room.find(FIND_MY_STRUCTURES).filter(structure => structure.structureType == STRUCTURE_LAB)
        // reactionLab1 = allLabs.filter(structure => structure.pos.x == (flag.pos.x + 4) && structure.pos.y == (flag.pos.y - 3))[0];
        // mainLab = allLabs.filter(structure => structure.pos.x == (flag.pos.x + 3) && structure.pos.y == (flag.pos.y - 4))[0];

        // labs = _.sortBy(allLabs, lab => lab.store[lab.mineralType])

        // creep.memory.fromID = null;
        // creep.memory.toID = null;
        // creep.memory.resource = null;


        // if (reactionLab1.store[reactionLab1.mineralType] > 0 && (creep.room.memory.reaction == null || reactionLab1.mineralType != creep.room.memory.reaction.partOne)) {
        //     creep.memory.fromID = reactionLab1.id;
        //     creep.memory.toID = creep.room.terminal.id;
        //     creep.memory.resource = reactionLab1.mineralType ;
            
        //     creep.say('take alt');
        //     return;
        // }

        // if (mainLab.store[mainLab.mineralType] > 0 && (creep.room.memory.reaction == null || mainLab.mineralType != creep.room.memory.reaction.partTwo)) {
        //     creep.memory.fromID = mainLab.id;
        //     creep.memory.toID = creep.room.terminal.id;
        //     creep.memory.resource = mainLab.mineralType ;
            
        //     creep.say('take main');
        //     return;
        // }

        // for (lab of labs) {
        //     if (!lab || lab == mainLab || lab == reactionLab1) continue;
        //     module.exports.react(lab);

        //     if (lab.store[lab.mineralType] >= creep.carryCapacity || (lab.mineralType != undefined && (creep.room.memory.reaction == null || lab.mineralType != creep.room.memory.reaction.type))) {
        //         creep.memory.fromID = lab.id;
        //         creep.memory.toID = creep.room.terminal.id;
        //         creep.memory.resource = lab.mineralType;
        //         creep.say("take from lab")
        //         return;
        //     }
        // }

        // if (creep.room.memory.reaction != null) {
        //     if ((!mainLab.mineralType || LAB_MINERAL_CAPACITY-mainLab.store[mainLab.mineralType] >= creep.memory.capacity) && creep.room.terminal.store[creep.room.memory.reaction.partTwo] > creep.memory.capacity && creep.room.memory.reaction != null && (mainLab.store[mainLab.mineralType] == undefined || mainLab.store[mainLab.mineralType] < creep.room.memory.reaction.amount)) {
        //         creep.say('add main');
        //         creep.memory.fromID = creep.room.terminal.id;
        //         creep.memory.toID = mainLab.id;
        //         creep.memory.resource = creep.room.memory.reaction.partTwo;
        //         return;
        //     }

        //     // console.log((!reactionLab1.mineralType || LAB_MINERAL_CAPACITY-reactionLab1.store[reactionLab1.mineralType] >= creep.memory.capacity) , creep.room.terminal.store[creep.room.memory.reaction.partOne] > creep.memory.capacity , creep.room.memory.reaction != null , (reactionLab1.store[reactionLab1.mineralType] == undefined || reactionLab1.store[reactionLab1.mineralType] < creep.room.memory.reaction.amount))
        //     if ((!reactionLab1.mineralType || LAB_MINERAL_CAPACITY-reactionLab1.store[reactionLab1.mineralType] >= creep.memory.capacity) && creep.room.terminal.store[creep.room.memory.reaction.partOne] > creep.memory.capacity && creep.room.memory.reaction != null && (reactionLab1.store[reactionLab1.mineralType] == undefined || reactionLab1.store[reactionLab1.mineralType] < creep.room.memory.reaction.amount)) {
        //         creep.say('add alt');
        //         creep.memory.fromID = creep.room.terminal.id;
        //         creep.memory.toID = reactionLab1.id;
        //         creep.memory.resource = creep.room.memory.reaction.partOne;
        //         return;
        //     }
        // }
        

    },
    distributeBoosts() {
        var flag = Game.flags[creep.room.name];
        var allLabs = creep.room.find(FIND_MY_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_LAB});
    
        const boostStoreAmount = 3000;

        var labs = [
            {"resource": RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,  "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 3) && structure.pos.y == (flag.pos.y-2))},
            {"resource": RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 2) && structure.pos.y == (flag.pos.y-3))},
            {"resource": RESOURCE_CATALYZED_UTRIUM_ACID,        "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 3) && structure.pos.y == (flag.pos.y-4))},
            {"resource": RESOURCE_CATALYZED_UTRIUM_ALKALIDE,    "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 5) && structure.pos.y == (flag.pos.y-4))},
            {"resource": RESOURCE_CATALYZED_KEANIUM_ACID,       "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 5) && structure.pos.y == (flag.pos.y-3))},
            {"resource": RESOURCE_CATALYZED_KEANIUM_ALKALIDE,   "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 2) && structure.pos.y == (flag.pos.y-4))},
            {"resource": RESOURCE_CATALYZED_LEMERGIUM_ACID,     "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 4) && structure.pos.y == (flag.pos.y-5))},
            {"resource": RESOURCE_CATALYZED_ZYNTHIUM_ACID,      "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 4) && structure.pos.y == (flag.pos.y-3))},
            {"resource": RESOURCE_CATALYZED_GHODIUM_ACID,       "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 3) && structure.pos.y == (flag.pos.y-5))},
            {"resource": RESOURCE_CATALYZED_GHODIUM_ALKALIDE,   "lab": allLabs.find(structure => structure.pos.x == (flag.pos.x + 4) && structure.pos.y == (flag.pos.y-2))}
        ];
        
        creep.memory.fromID = null;
        creep.memory.toID = null;
        creep.memory.resource = null;

        for (i in labs) {

            if (labs[i]["lab"] && labs[i]["lab"].mineralType && labs[i]["lab"].mineralType != labs[i]["resource"]) {
                creep.memory.fromID = labs[i]["lab"].id;
                creep.memory.toID = creep.room.terminal.id;
                creep.memory.resource = labs[i]["lab"].mineralType;
                creep.memory.amount = Math.min(labs[i]["lab"].store[labs[i]["lab"].mineralType], creep.memory.capacity);
                creep.say("take "+labs[i]["lab"].mineralType);
                break;
            }
            else if (labs[i]["lab"] && labs[i]["lab"].store[labs[i]["resource"]] < boostStoreAmount && creep.room.terminal.store[labs[i]["resource"]] > 0) {
                creep.memory.fromID = creep.room.terminal.id;
                creep.memory.toID = labs[i]["lab"].id;
                creep.memory.resource = labs[i]["resource"];
                creep.memory.amount = Math.min(creep.memory.capacity, boostStoreAmount-labs[i]["lab"].store[labs[i]["resource"]]);
                creep.say("add "+labs[i]["resource"]);
                break;
            }
        }

        if (creep.ticksToLive > 3 && creep.memory.fromID != null) {
            var from = Game.getObjectById(creep.memory.fromID);
            if (creep.withdraw(from, creep.memory.resource, creep.memory.amount) == ERR_NOT_IN_RANGE) {
                creep.moveTo(from, { visualizePathStyle: { stroke: '#ff0000' } });
            }
        }
    },
    findTarget() {

    },
    currentAmount(resource, creep) {
        // let storageAmount = creep.room.storage.store[resource] || 0;
        let terminalAmount = (creep.room.terminal && creep.room.terminal.store[resource]) || 0;
        let labAmount = _.sum(_.filter(labs, (l) => l != null && l.mineralType == resource), (l) => l.mineralAmount);
        let creepAmount = (Object.keys(creep.carry).includes(resource)) ? creep.carry[resource] : 0;
        return terminalAmount + labAmount + creepAmount;
    },
    getResources(amount, amounts, element, creep) {

        var copyOfAmounts = amounts;
        if (!BASES.includes(element)) {
            if (Object.keys(REACTIONS).includes(element)) {
                copyOfAmounts = module.exports.getResources(amount, copyOfAmounts, REACTIONS[element][0], creep);

                if (!BASES.includes(REACTIONS[element][0])) {
                    copyOfAmounts[REACTIONS[element][0]] = copyOfAmounts[REACTIONS[element][0]] + amount;
                }

                copyOfAmounts = module.exports.getResources(amount, copyOfAmounts, REACTIONS[element][1], creep);

                if (!BASES.includes(REACTIONS[element][1])) {
                    copyOfAmounts[REACTIONS[element][1]] = copyOfAmounts[REACTIONS[element][1]] + amount;
                }
            }
        }
        return (copyOfAmounts)
    },
    getReaction(creep, labs) {
        var amounts = {};
        var currentReaction;

        // find better way to do
        Object.keys(REACTIONS).forEach(key => {
            amounts[key] = 0;
        });

        Object.keys(REACTIONS).reverse().forEach(reaction => {
            var amountToCreate = MINAMOUNT - module.exports.currentAmount(reaction, creep, labs);

            // add just the reaction amount
            amounts[reaction] = amounts[reaction] + amountToCreate;

            // add all ingridents needed for the reaction recursively
            amounts = module.exports.getResources(amountToCreate, amounts, reaction, creep);

            // console.log(REACTIONS[reaction][1])
            // console.log(amounts[reaction] > 0 , Object.keys(creep.room.terminal.store).includes(REACTIONS[reaction][0]) , Object.keys(creep.room.terminal.store).includes(REACTIONS[reaction][1]) , creep.room.terminal.store[REACTIONS[reaction][0]] > 500 , creep.room.terminal.store[REACTIONS[reaction][1]] > 500)
            if (amounts[reaction] > 0 && Object.keys(creep.room.terminal.store).includes(REACTIONS[reaction][0]) && Object.keys(creep.room.terminal.store).includes(REACTIONS[reaction][1]) && creep.room.terminal.store[REACTIONS[reaction][0]] > 500 && creep.room.terminal.store[REACTIONS[reaction][1]] > 500) {
                currentReaction = reaction;
                // console.log(currentReaction)
                // console.log(JSON.stringify(currentReaction))
            }

        });
        // console.log(JSON.stringify(amounts))
        if (currentReaction) creep.room.memory.reaction = { "type": currentReaction, "amount": amounts[currentReaction], "partOne": REACTIONS[currentReaction][0], "partTwo": REACTIONS[currentReaction][1] }
        else creep.room.memory.reaction = null;
    },

    react(lab) {
        if (lab && lab.cooldown == 0 && reactionLab1 && mainLab) {
            lab.runReaction(mainLab, reactionLab1);
        }
    },
}