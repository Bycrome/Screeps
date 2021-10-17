const base = {
    "spawn": [{ x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 1 }],
    "extension": [{ x: -1, y: -3 }, { x: -2, y: -3 }, { x: -3, y: -2 }, { x: -3, y: -1 }, { x: -3, y: 1 }, { x: -2, y: 2 }, { x: -1, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 4, y: 0 }, { x: 3, y: 2 }, { x: 2, y: 3 }, { x: -2, y: 3 }, { x: -3, y: 2 }, { x: -4, y: 0 }, { x: 5, y: -1 }, { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 4 }, { x: 0, y: 4 }, { x: -4, y: -2 }, { x: -4, y: -3 }, { x: -3, y: -4 }, { x: -2, y: -4 }, { x: 1, y: -5 }, { x: -1, y: -5 }, { x: -3, y: -5 }, { x: -4, y: -5 }, { x: -5, y: -4 }, { x: -5, y: -3 }, { x: -5, y: -1 }, { x: -5, y: 0 }, { x: -5, y: 1 }, { x: -4, y: 2 }, { x: -3, y: 3 }, { x: -2, y: 4 }, { x: -5, y: 3 }, { x: -5, y: 4 }, { x: -4, y: 5 }, { x: -4, y: 4 }, { x: -3, y: 5 }, { x: -1, y: 5 }, { x: 0, y: 5 }, { x: 1, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 3 }, { x: 6, y: -2 }, { x: 6, y: 2 }, { x: 2, y: 6 }, { x: -2, y: 6 }, { x: -6, y: 2 }, { x: -6, y: -2 }, { x: -2, y: -6 }, { x: 2, y: -6 },],
    "storage": [{ x: -1, y: -1 }],
    "tower": [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 0, y: -2 }, { x: 0, y: 2 }, { x: 2, y: 0 }],
    "link": [{ x: 0, y: -1 }],
    "rampart": [{ x: 4, y: 6 }, { x: 3, y: 6 }, { x: 2, y: 6 }, { x: 1, y: 6 }, { x: 0, y: 6 }, { x: -1, y: 6 }, { x: -2, y: 6 }, { x: -3, y: 6 }, { x: -4, y: 6 }, { x: -5, y: 5 }, { x: -6, y: 4 }, { x: -6, y: 3 }, { x: -6, y: 2 }, { x: -6, y: 1 }, { x: -6, y: 0 }, { x: -6, y: -1 }, { x: -6, y: -2 }, { x: -6, y: -3 }, { x: -6, y: -4 }, { x: -5, y: -5 }, { x: -4, y: -6 }, { x: -3, y: -6 }, { x: -2, y: -6 }, { x: -1, y: -6 }, { x: 0, y: -6 }, { x: 1, y: -6 }, { x: 2, y: -6 }, { x: 3, y: -6 }, { x: 4, y: -6 }, { x: 5, y: -5 }, { x: 6, y: -4 }, { x: 6, y: -3 }, { x: 6, y: -2 }, { x: 6, y: -1 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 },  { x: 4, y: 5 }, { x:5, y :4},  { x: -4, y: -5 }, { x:-5, y :-4}, { x: 4, y: -5 }, { x:5, y :-4}, { x: -4, y: 5 }, { x:-5, y:4}],
    "terminal": [{ x: 1, y: -1 }],
    "factory": [{ x: 1, y: -3 }],
    "nuker": [{ x: 3, y: -1 }],
    "lab": [{ x: 4, y: -3 }, { x: 3, y: -4 }, { x: 4, y: -2 }, { x: 3, y: -2 }, { x: 2, y: -3 }, { x: 2, y: -4 }, { x: 3, y: -5 }, { x: 4, y: -5 }, { x: 5, y: -3 }, { x: 5, y: -4 },],
    "road": [{ x: 2, y: 1 }, { x: 3, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: 0, y: -3 }, { x: -1, y: -2 }, { x: -2, y: -1 }, { x: -3, y: 0 }, { x: -2, y: 1 }, { x: -1, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 2 }, { x: 4, y: -1 }, { x: 5, y: -2 }, { x: 6, y: -3 }, { x: 6, y: -4 }, { x: 5, y: -5 }, { x: 4, y: -4 }, { x: 3, y: -3 }, { x: 2, y: -2 }, { x: 1, y: -4 }, { x: 2, y: -5 }, { x: 3, y: -6 }, { x: 4, y: -6 }, { x: 1, y: -6 }, { x: 0, y: -6 }, { x: -1, y: -6 }, { x: -2, y: -5 }, { x: -1, y: -4 }, { x: -3, y: -6 }, { x: -4, y: -6 }, { x: -5, y: -5 }, { x: -6, y: -4 }, { x: -6, y: -3 }, { x: -5, y: -2 }, { x: -4, y: -1 }, { x: -6, y: -1 }, { x: -6, y: 0 }, { x: -6, y: 1 }, { x: -5, y: 2 }, { x: -4, y: 1 }, { x: -6, y: 3 }, { x: -6, y: 4 }, { x: -5, y: 5 }, { x: -4, y: 6 }, { x: -3, y: 6 }, { x: -2, y: 5 }, { x: -1, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 5 }, { x: -1, y: 6 }, { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 4, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 1 }, { x: 6, y: 0 }, { x: 6, y: -1 }, { x: 4, y: 3 }, { x: 3, y: 4 }, { x: 5, y: 5 }, { x: -3, y: 4 }, { x: -4, y: 3 }, { x: -3, y: -3 }, { x: -2, y: -2 }, { x: -4, y: -4 }],
    "power spawn": [{ x: 0, y: -4 }],
    "observer": [{ x: 0, y: -5 }],
    
}

const baseVisual = {
    "spawn": "🏠",
    "factory": "🏭",
    "link": "t",
    "extension": "🟡",
    "nuker": "☢️",
    "link": "🔗",
    "road": "🛣️",
    "observer": "👀",
    "storage": "📦",
    "rampart": "🛑",
    "terminal": "💱",
    "lab": "⚗️",
    "tower": "🔫",
    "power spawn": "⚡"
}

module.exports = {

    manageBase(room) {
        let flag = Game.flags[room.name]

        if (!flag) return;

        if (!Game.flags[room.name+" TRANSFER IDLE"]) {
            Game.rooms[room.name].createFlag(flag.pos.x-2, flag.pos.y-2, room.name+" TRANSFER IDLE", COLOR_GREY, COLOR_GREY);
        }

        // let level = room.controller.level ? room.controller.level || 0;
        
        this.newBase(room, flag.pos);
     
        // room.find(FIND_SOURCES).forEach(source => {
        //     if (source) { 
        //         this.buildRoad(room. flag.pos, source);
        //     }
        // });
        
        // this.visual(room, flag.pos);

        // this.buildRoad(room, flag.pos)
        
        
        // this.controllerShield(room, flag.pos);
        
    },
    
    // locations.push(room.controller);
        // console.log(locations.length)
        // locations.push(room.controller);


    test(room) {
        locations = room.find(FIND_SOURCES)
        locations = locations.concat(room.find(FIND_MINERALS));
        locations.push(room.controller);
        let origin = Game.flags[room.name];
        // let origin = new RoomPosition(33, 28, 'W7N4');


        // check range
        goal = {pos: origin.pos, range: 7};


        for (let location of locations) {

            var path = PathFinder.search(location.pos, goal, {
                plainCost: 4,
                swampCost: 24,
                maxRooms: 1,

                roomCallback: function(roomName) {

                    let cm

                    cm = new PathFinder.CostMatrix

                    let roadConstructionSites = room.find(FIND_MY_CONSTRUCTION_SITES, {
                        filter: s => s.structureType == STRUCTURE_ROAD
                    })

                    for (let roadSite of roadConstructionSites) {

                        cm.set(roadSite.pos.x, roadSite.pos.y, 1)
                    }

                    let roads = room.find(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_ROAD
                    })

                    for (let road of roads) {

                        cm.set(road.pos.x, road.pos.y, 1)
                    }

                    let constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES, {
                        filter: s => s.structureType != STRUCTURE_ROAD && s.structureType != STRUCTURE_RAMPART
                    })

                    for (let site of constructionSites) {

                        cm.set(site.pos.x, site.pos.y, 255)
                    }

                    let structures = room.find(FIND_STRUCTURES, {
                        filter: s => s.structureType != STRUCTURE_ROAD && s.structureType != STRUCTURE_RAMPART
                    })

                    for (let structure of structures) {

                        cm.set(structure.pos.x, structure.pos.y, 255)
                    }

                    return cm
                }
            }).path;

            room.visual.poly(path, { stroke: COLOR_RED, strokeWidth: .15, opacity: 1, lineStyle: 'normal' })

            // for (let pos of path) {

            //     if (placedSites < 10 && room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD) == 0) placedSites++
            // }
        
        }
    },
    buildRoadTo(room, center, location) {
        // console.log(room, center, location)
        var path = room.findPath(location.pos, center, { ignoreCreeps: true });
        path.forEach(location => {
            var pos = new RoomPosition(location["x"], location["y"], room.name);
            if (!pos.inRangeTo(center.x, center.y, 5)) {
                room.createConstructionSite(location["x"], location["y"], STRUCTURE_ROAD);
                // new RoomVisual(room.name).text("🧱", (location["x"]), (location["y"])+0.25, {color: 'green', font: 0.8}); 
            }
        });
    },
    buildRoad(room, center) {
        locations = locations.concat(room.find(FIND_SOURCES));
        locations = locations.concat(room.find(FIND_MINERALS));
        locations.push(room.controller);
        locations.forEach(location => {
            var path = room.findPath(location.pos, center, { ignoreCreeps: true });
            path.forEach(location => {
                var pos = new RoomPosition(location["x"], location["y"], room.name);
                if (!pos.inRangeTo(center.x, center.y, 5)) {
                    // room.createConstructionSite(location["x"], location["y"], STRUCTURE_ROAD);
                    new RoomVisual(room.name).text("🧱", (location["x"]), (location["y"])+0.25, {color: 'green', font: 0.8}); 
                }
            });
        });
    },
    newBase(room, center) {
        // console.log(!room.storage)
        if (!room.storage) {
            baseSchematic = delete base["rampart"];
        }
        else if (room.controller.level && room.controller.level == 8) {
            for (let x = center.x - 5; x < center.x + 6; x++) {
                for (let y = center.y - 5; y < center.y + 6; y++) {
                    // new RoomVisual(room.name).text("🟡", x, y+0.25, { color: 'green', font: 0.8 }); 
                    room.createConstructionSite(x, y, "rampart");
                }
            }
        }
        else {
            baseSchematic = base;
        }
        for (var structure in base) {
            for (var position in base[structure]) {
                room.createConstructionSite(center.x+base[structure][position]["x"], center.y+base[structure][position]["y"], structure);
            }
        }
    },

    visual(room, center) {
        for (var structure in base) {
            for (var position in base[structure]) {
                new RoomVisual(room.name).text(baseVisual[structure], (center.x+base[structure][position]["x"]), (center.y+base[structure][position]["y"])+0.25, {color: 'green', opacity: 0.9, font: 0.8});    
            }
        }
    },

    controllerShield(room, center) {


        // var test = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)].filter(function(d) {
        //     creep.room.lookForAt(LOOK_TERRAIN, ) != "wall"
        // })

        [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)].forEach(d => {
            var x = center.x + d[0];
            var y = center.y + d[1];
            if (room.lookForAt(LOOK_TERRAIN, x, y) != "wall") {
                new RoomVisual(room.name).text("🧱", x, y+0.25, {color: 'green', font: 0.8}); 
            }
        });
        // console.log(room.getPositionAt(10,10));
        // var walls = room.lookAtArea(room.controller.pos.y+1,room.controller.pos.x-1,room.controller.pos.y-1,room.controller.pos.x+1, true);
        // walls.forEach(wall => {
        //     console.log(wall)
        // });


        // for (var x = room.controller.pos.x-1; x<=room.controller.pos.x+1; x++) {
        //     for (var y = room.controller.pos.y-1; y<=room.controller.pos.y+1; y++) {
        //         // if (room.controller.pos.y != y && room.controller.pos.x != x) {
        //             new RoomVisual(room.name).text("🧱", x, y+0.25, {color: 'green', font: 0.8}); 
        //         // }
        //     }
        // }
    },

    distanceTransform(room) {

        if (!room.controller) return;

        let vis = new RoomVisual(room.name);
        let matrix = new PathFinder.CostMatrix();
        let terrain = room.getTerrain();
        let sources = room.find(FIND_SOURCES);
        let bestScore = 999;
        sources.push(room.controller);
        let pos = undefined;
        let locationX = undefined;
        let locationY = undefined;
    
        for (let y = 0; y < 50; ++y) {
            for (let x = 0; x < 50; ++x) {
                if (terrain.get(x,y) == 1) {
                    matrix.set(x, y, 0);
                }
                else {
                    matrix.set(x, y,
                        Math.min(matrix.get(x-1, y-1), matrix.get(x, y-1),
                            matrix.get(x+1, y-1), matrix.get(x-1, y)) + 1);
                }
            }
        }
        
        for (let y = 49; y >= 0; --y) {
            for (let x = 49; x >= 0; --x) {
                let value = Math.min(matrix.get(x, y),
                        matrix.get(x+1, y+1) + 1, matrix.get(x, y+1) + 1,
                        matrix.get(x-1, y+1) + 1, matrix.get(x+1, y) + 1);
                matrix.set(x, y, value);
                vis.circle(x, y, {radius:value/25});
                if (value > 6) {
    
                    let score = 0;
                    let position = new RoomPosition(x, y, room.name);
                    sources.forEach(location => {
                        if (!location) {
                            console.log('error transform of base build')
                            return
                        };
                        score = score + location.pos.findPathTo(position).length;
                    });
                    
                    if (score < bestScore) {
                        bestScore = score;
                        pos = position;
                        locationX = x;
                        locationY = y;
                    }
                } 
            }
        }
    
        return (pos);
    }

};