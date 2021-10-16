
const factoryRequirements = {
    'energy': 8000,
    'battery':2000,
    "H": 2000,
    "O":2000,
    "U":2000,
    "L":2000,
    "Z":2000,
    "X":2000,
    "G":2000,
    'utrium_bar':800,
    'lemergium_bar':800,
    'zynthium_bar':800,
    'keanium_bar':800,
    'ghodium_melt':800,
    'oxidant':800,
    'reductant':800,
    'purifier':800,
    'composite':800,
    'crystal':800,
    'liquid':800,
    'wire':1000,
    'cell':1000,
    'alloy':1000,
    'condensate':1000,
    "silicon":1000,
    "metal":1000,
    "mist":1000,
    "biomass":1000,
    'switch':50, 
    'transistor':30,
    'microchip':10,
    'circuit':10,
    'phlegm':30,
    'tissue':30,
    'muscle':10,
    'organoid':5,
    'tube':30,
    'fixtures':30,
    'frame':10,
    'hydraulics':10,
    'concentrate':50,
    'extract':30,
    'spirit':20,
    'emanation':5,
    'machine':5,
    'organism':5,
    'device':5,
    'essence':5,
}

const factoryProductionBlackList = [RESOURCE_UTRIUM, RESOURCE_LEMERGIUM, RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM, RESOURCE_GHODIUM, RESOURCE_OXYGEN, RESOURCE_HYDROGEN, RESOURCE_CATALYST, RESOURCE_ENERGY];

const BASES = [RESOURCE_HYDROGEN, RESOURCE_OXYGEN, RESOURCE_UTRIUM, RESOURCE_KEANIUM, RESOURCE_LEMERGIUM, RESOURCE_ZYNTHIUM, RESOURCE_CATALYST];

module.exports = {
    run(creep) {

        let factory = creep.room.find(FIND_MY_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_FACTORY });

        if (creep.memory["full"] && _.sum(creep.carry) == 0) {
            creep.memory.full = false;
        }

        if (!creep.memory["full"] && _.sum(creep.carry) > 0) {
            creep.memory.full = true;
        }

        if (creep.memory["full"] == null) {
            creep.memory.full = false;
        }

        if (factory) {
            if (factory.cooldown === 0) {
                var next = module.exports.nextReaction(factory);
                // console.log('next reaction in factory:',next)
                if (next != undefined) {
                    factory.produce(next);
                }
            }

            if (creep.memory.full) {
            }
            else {
                for (resource in factoryRequirements) {
                    if (factory.store[resource] < factoryRequirements[resource]) {
                        let amount = Math.min(creep.store.getCapacity, (factoryRequirements[resource]-factory.store[resource]));
                        creep.say(resource, amount);
                        return;
                    }
                }
            }
        }
    },

    nextReaction(factory) {
        for (var commodity in COMMODITIES) {
            // if item is not on blacklist
            if (!factoryProductionBlackList.includes(commodity)) {
                // if the factory does not have enough of the outcome of the reaction
                if (factory.store[commodity] < factoryRequirements[commodity]) {
                    // if the factory has the required level to make the reaction
                    if (factory.level == COMMODITIES[commodity].level || factory.level >= COMMODITIES[commodity].level) {
                        
                        // get an array of missing components
                        var missingComponents = _.filter(Object.keys(COMMODITIES[commodity]["components"]), (r) => !Object.keys(factory.store).includes(r) || factory.store[r] < COMMODITIES[commodity]["components"][r]);

                        // if the factory is not missing any components
                        if(missingComponents.length == 0) {
                            return commodity;
                        } 
                    }
                }
            }
        }
    },

    
}