module.exports = class Trading {
    constructor(room) {
        this.room = room;
        this.toSell = room.memory.mineralsTypes;
        this.sellingBlacklist = [RESOURCE_ENERGY, "XGHO2", "XGH2O", "XKHO2", "XKH2O","XLHO2", "XLH2O", "XUHO2", "XUH2O", "XZHO2", "XZH2O", "G", "OH"];
        this.minAmount = 5000;
        this.maxAmount = 15000;
    }

    run(room, terminal) {

        // console.log("terminal manager "+room.name);
        if (!terminal) return;
        
        let roomMineral = room.memory.mineralsTypes[0];

        if (terminal.cooldown === 0) {
            if (terminal.store[roomMineral] > this.maxAmount && this.tradeToOtherRooms(room, terminal, roomMineral)) return;
            if (terminal.store[RESOURCE_ENERGY] > this.maxAmount && this.tradeExcessEnergy(room, terminal)) return;
            
        }

        // if (this.isTradingPossible() && this.cooldown() == 0) {
        //     this.excessEnergy(); 
    
        //     this.toSell.forEach(element => {
        //         if (this.room.terminal.store[element] > this.minAmount && !this.sellingBlacklist.includes(element)) {
        //             this.sellToFreeMarket(element, this.room.terminal.store[element]-this.minAmount);
        //         }
        //     });
            
        // }
    }

    tradeToOtherRooms(room, roomTerminal, roomMineral) {

        let terminals = Object.values(Game.structures).filter(structure => structure.structureType === STRUCTURE_TERMINAL && structure !== roomTerminal && structure.store[roomMineral] < this.minAmount);
        terminals.forEach(terminal => {
            if (roomTerminal.send(roomMineral, this.minAmount-terminal.store[roomMineral], terminal.room.name,'balancing script') === OK) return true;
        });
    }

    tradeExcessEnergy(room, roomTerminal) {
        let terminals = Object.values(Game.structures).filter(structure => structure.structureType === STRUCTURE_TERMINAL && structure !== roomTerminal && structure.store[RESOURCE_ENERGY] < 25000);
        terminals.forEach(terminal => {
            console.log(terminal)
            if (roomTerminal.send(RESOURCE_ENERGY, 1000, terminal.room.name,'balancing script') === OK) return true;
        });
    }
}