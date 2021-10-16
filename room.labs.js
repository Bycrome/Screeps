const REACTIONS = {

    // Base compounds
    "UL": [RESOURCE_UTRIUM , RESOURCE_LEMERGIUM], 
    "ZK": [RESOURCE_ZYNTHIUM , RESOURCE_KEANIUM],
    "G": [RESOURCE_ZYNTHIUM_KEANITE , RESOURCE_UTRIUM_LEMERGITE],
    "OH": [RESOURCE_OXYGEN , RESOURCE_HYDROGEN],

    // Tier 1 compounds
    "UH": [RESOURCE_UTRIUM , RESOURCE_HYDROGEN],
    "KH": [RESOURCE_KEANIUM , RESOURCE_HYDROGEN],
    "GH": [RESOURCE_GHODIUM , RESOURCE_HYDROGEN],
    "LH": [RESOURCE_LEMERGIUM , RESOURCE_HYDROGEN],
    "ZH": [RESOURCE_ZYNTHIUM , RESOURCE_HYDROGEN],
    "KO": [RESOURCE_KEANIUM , RESOURCE_OXYGEN],
    "LO": [RESOURCE_LEMERGIUM , RESOURCE_OXYGEN],
    "ZO": [RESOURCE_ZYNTHIUM , RESOURCE_OXYGEN],
    "UO": [RESOURCE_UTRIUM , RESOURCE_OXYGEN],
    "GO": [RESOURCE_GHODIUM , RESOURCE_OXYGEN],

    // Tier 2 compounds
    "UH2O": [RESOURCE_UTRIUM_HYDRIDE , RESOURCE_HYDROXIDE],
    "UHO2": [RESOURCE_UTRIUM_OXIDE , RESOURCE_HYDROXIDE],
    "KH2O": [RESOURCE_KEANIUM_HYDRIDE , RESOURCE_HYDROXIDE],
    "KHO2": [RESOURCE_KEANIUM_OXIDE , RESOURCE_HYDROXIDE],
    "LH2O": [RESOURCE_LEMERGIUM_HYDRIDE , RESOURCE_HYDROXIDE],
    "LHO2": [RESOURCE_LEMERGIUM_OXIDE , RESOURCE_HYDROXIDE],
    "ZH2O": [RESOURCE_ZYNTHIUM_HYDRIDE , RESOURCE_HYDROXIDE],
    "ZHO2": [RESOURCE_ZYNTHIUM_OXIDE , RESOURCE_HYDROXIDE],
    "GH2O": [RESOURCE_GHODIUM_HYDRIDE , RESOURCE_HYDROXIDE],
    "GHO2": [RESOURCE_GHODIUM_OXIDE , RESOURCE_HYDROXIDE],

    // Tier 3 compounds
    "XZHO2": [RESOURCE_ZYNTHIUM_ALKALIDE , RESOURCE_CATALYST],
    "XGH2O": [RESOURCE_GHODIUM_ACID , RESOURCE_CATALYST],
    "XUH2O": [RESOURCE_UTRIUM_ACID , RESOURCE_CATALYST],
    "XUHO2": [RESOURCE_UTRIUM_ALKALIDE , RESOURCE_CATALYST],
    "XKH2O": [RESOURCE_KEANIUM_ACID , RESOURCE_CATALYST],
    "XKHO2": [RESOURCE_KEANIUM_ALKALIDE , RESOURCE_CATALYST],
    "XLH2O": [RESOURCE_LEMERGIUM_ACID , RESOURCE_CATALYST],
    "XLHO2": [RESOURCE_LEMERGIUM_ALKALIDE , RESOURCE_CATALYST],
    "XZH2O": [RESOURCE_ZYNTHIUM_ACID , RESOURCE_CATALYST],
    "XGHO2": [RESOURCE_GHODIUM_ALKALIDE , RESOURCE_CATALYST ]
}

const BASES = [RESOURCE_HYDROGEN, RESOURCE_OXYGEN, RESOURCE_UTRIUM, RESOURCE_KEANIUM, RESOURCE_LEMERGIUM, RESOURCE_ZYNTHIUM, RESOURCE_CATALYST];

const MINAMOUNT = 1250;

module.exports = class labs {

    constructor(room) {
        this.room = room;
        this.terminal = room.terminal;
        this.reactionLab1 = Game.getObjectById(this.room.memory.labs[0]);
        this.reactionLab2 = Game.getObjectById(this.room.memory.labs[2]);
        this.mainLab = Game.getObjectById(this.room.memory.labs[1]);
        this.toughLab = Game.getObjectById(this.room.memory.labs[6]);
        this.movementLab = Game.getObjectById(this.room.memory.labs[5]);
        this.healLab = Game.getObjectById(this.room.memory.labs[7]);
        this.rangedLab = Game.getObjectById(this.room.memory.labs[8]);
        this.dismentalLab = Game.getObjectById(this.room.memory.labs[9]);
        this.attackLab = Game.getObjectById(this.room.memory.labs[3]);
        this.upgradeLab = Game.getObjectById(this.room.memory.labs[4]);
        
        this.labs = [this.reactionLab1, this.reactionLab2, this.mainLab, this.toughLab, this.movementLab, this.healLab, this.rangedLab, this.dismentalLab, this.attackLab, this.upgradeLab]
    }


    run() {
        
        {
        // if(this.isCurrentReactionFinished()) {
        //     this.findNextReaction();
        // }
        // else {
        //     this.react()
        // }
        // this.findNextReaction();
        }
    
        
        // this.react()
        if (Game.time % 3 == 0) {
            this.getReaction()
        }

        
        if (Game.time % 1 == 0 && 1 == 2) {
            this.reactionLab1 = Game.getObjectById(this.room.memory.labs[0]);
        
            // bottom right
            this.reactionLab2 = Game.getObjectById(this.room.memory.labs[2]);
            // middle left
            this.mainLab = Game.getObjectById(this.room.memory.labs[1]);
            
            // bottom left
            this.toughLab = Game.getObjectById(this.room.memory.labs[6]);
            // right top
            this.movementLab = Game.getObjectById(this.room.memory.labs[5]);
            // left 
            this.healLab = Game.getObjectById(this.room.memory.labs[7]);
            this.rangedLab = Game.getObjectById(this.room.memory.labs[8]);
            this.dismentalLab = Game.getObjectById(this.room.memory.labs[9]);
            this.attackLab = Game.getObjectById(this.room.memory.labs[3]);
            this.upgradeLab = Game.getObjectById(this.room.memory.labs[4]);
            
            this.labs = [this.reactionLab1, this.reactionLab2, this.mainLab, this.toughLab, this.movementLab, this.healLab, this.rangedLab, this.dismentalLab, this.attackLab, this.upgradeLab]
        
        }
    }


    react() {


        
        if (this.reactionLab2 && this.reactionLab1 && this.mainLab) {
            this.reactionLab2.runReaction(this.mainLab, this.reactionLab1);
        }
        if (this.attackLab && this.attackLab.cooldown == 0 && this.reactionLab1 && this.mainLab) {
            this.attackLab.runReaction(this.mainLab, this.reactionLab1);
        }
        if (this.upgradeLab && this.upgradeLab.cooldown == 0 && this.reactionLab1 && this.mainLab) {
            this.upgradeLab.runReaction(this.mainLab, this.reactionLab1);
        }
        if (this.movementLab && this.movementLab.cooldown == 0 && this.reactionLab1 && this.mainLab) {
            this.movementLab.runReaction(this.mainLab, this.reactionLab1);
        }
        if (this.toughLab && this.toughLab.cooldown == 0 && this.reactionLab1 && this.mainLab) {
            this.toughLab.runReaction(this.mainLab, this.reactionLab1);
        }
        if (this.healLab && this.healLab.cooldown == 0 && this.reactionLab1 && this.mainLab) {
            this.healLab.runReaction(this.mainLab, this.reactionLab1);
        }
        if (this.rangedLab && this.rangedLab.cooldown == 0 && this.reactionLab1 && this.mainLab) {
            this.rangedLab.runReaction(this.mainLab, this.reactionLab1);
        }
        if (this.dismentalLab && this.dismentalLab.cooldown == 0 && this.reactionLab1 && this.mainLab) {
            this.dismentalLab.runReaction(this.mainLab, this.reactionLab1);
        }
    }

    get minAmount() {
        return MINAMOUNT;
    }

    currentAmount(resource) {
        // if(!resource) return 0;
        let storageAmount = this.room.storage.store[resource] || 0;
        let terminalAmount = (this.room.terminal && this.room.terminal.store[resource]) || 0;
        let labAmount = _.sum(_.filter(this.labs, (l) => l != null && l.mineralType == resource), (l) => l.mineralAmount);
        // let creepAmount = _.sum(this.creeps, (c) => c.carry[resource] || 0);

        //  + scientistAmount
        return storageAmount + terminalAmount + labAmount;
    }

    getResources(amount, amounts, element) {
        
        var copyOfAmounts = amounts;
        if (!BASES.includes(element)) {
            if (Object.keys(REACTIONS).includes(element)) {
                copyOfAmounts = this.getResources(amount, copyOfAmounts,  REACTIONS[element][0]);
                
                if (!BASES.includes(REACTIONS[element][0])) {
                    copyOfAmounts[REACTIONS[element][0]] = copyOfAmounts[REACTIONS[element][0]] + amount;
                }

                copyOfAmounts = this.getResources(amount, copyOfAmounts, REACTIONS[element][1]);

                if (!BASES.includes(REACTIONS[element][1])) {
                    copyOfAmounts[REACTIONS[element][1]] = copyOfAmounts[REACTIONS[element][1]] + amount;
                }
            }
        }
        return(copyOfAmounts)
    }

    getReaction() {
        var amounts = {};
        var currentReaction;

        // find better way to do
        Object.keys(REACTIONS).forEach(key => {
            amounts[key] = 0;
        });
        
        Object.keys(REACTIONS).reverse().forEach(reaction => {
            var amountToCreate = this.minAmount - this.currentAmount(reaction);
         
            // add just the reaction amount
            amounts[reaction] = amounts[reaction] + amountToCreate;

            // add all ingridents needed for the reaction recursively
            amounts = this.getResources(amountToCreate, amounts, reaction);
            
            if (amounts[reaction] > 0) {
                currentReaction = reaction;
            }
            
        });
        
        this.room.memory.reaction = {"type":currentReaction,"amount":amounts[currentReaction], "partOne": REACTIONS[currentReaction][0], "partTwo": REACTIONS[currentReaction][1]}
        
    }

    currentReaction() {

    }

    nextReaction() {

    }

   
}