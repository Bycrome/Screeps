module.exports = {
    run(room) {
        if (Memory.global.communes.length == Game.gcl.level) return;
        let flag = Game.flags[room.name+" EXPANSION"];
        if (!flag) return;
        else {
            return("spawn");
        }
    },
}