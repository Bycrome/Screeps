const inverseDirections = {
    "1": BOTTOM,
    "2": BOTTOM_LEFT,
    "3": LEFT,
    "4": TOP_LEFT,
    "5": TOP,
    "6": TOP_RIGHT,
    "7": RIGHT,
    "8": BOTTOM_RIGHT
};

module.exports = {
    moveToRoom: function(creep, roomName) {
        
        let pos = new RoomPosition(25, 25, roomName);



        creep.moveTo(pos);
        return

        // move creep to room while avoidng enemies with a range of 5
        // create cost matrix with the cost of hostile creeps 99
        // and the cost of roads 0
        // let costMatrix = new PathFinder.CostMatrix;
        // for (let x = 0; x < 50; x++) {
        //     for (let y = 0; y < 50; y++) {
        //         let pos = new RoomPosition(x, y, roomName);
        //         if (pos.lookFor(LOOK_CREEPS).length > 0) {
        //             costMatrix.set(x, y, 99);
        //         } else if (pos.lookFor(LOOK_STRUCTURES).length > 0) {
        //             costMatrix.set(x, y, 0);
        //         } else {
        //             costMatrix.set(x, y, 1);
        //         }
        //     }
        // }
        // find path to room
        let path = PathFinder.search(creep.pos, {
            pos: pos,
            range: 5
        }, {
            plainCost: 2,
            swampCost: 10,
            roomCallback: function(roomName) {
                let room = Game.rooms[roomName];
                if (!room) {
                    return;
                }
                let costs = new PathFinder.CostMatrix;
                room.find(FIND_STRUCTURES).forEach(function(structure) {
                    if (structure.structureType === STRUCTURE_ROAD) {
                        // Favor roads over plain tiles
                        costs.set(structure.pos.x, structure.pos.y, 1);
                    } else if (structure.structureType !== STRUCTURE_CONTAINER &&
                        (structure.structureType !== STRUCTURE_RAMPART || !structure.my)) {
                        // Can't walk through non-walkable buildings
                        costs.set(structure.pos.x, structure.pos.y, 0xff);
                    }
                });
                room.find(FIND_HOSTILE_CREEPS).forEach(function(hostile) {
                    if (hostile) {
                        // set hostile creeps cost to 99 and 5 tiles around them
                        for (let x = -3; x <= 3; x++) {
                            for (let y = -3; y <= 3; y++) {
                                costs.set(hostile.pos.x + x, hostile.pos.y + y, 50);
                            }
                        }
                    }
                });
                room.find(FIND_MY_CREEPS).forEach(function(creep) {
                    if (creep) {
                        costs.set(creep.pos.x, creep.pos.y, 50);
                    }
                });
                return costs;
            }
        });
        // move creep to room
        if (path.path.length > 0) {
            creep.moveByPath(path.path);
        }
    


        // creep.moveTo(pos, {
        //     reusePath: 10,
        //     visualizePathStyle: {
        //         stroke: "#ffaa00"
        //     },
        //     ignoreCreeps: true,
        //     maxRooms: 1
        // });

        
    },
    // moveToRoom: function(creep, roomName) {
        
    //     // let pos = new RoomPosition(25, 25, roomName);
    //     // // move to pos while avoid hostile creeps
    //     // let ret = creep.moveTo(pos, {
    //     //     reusePath: 50,
    //     //     maxOps: 1000,
    //     //     visualizePathStyle: {
    //     //         stroke: '#ffaa00'
    //     //     },
    //     //     ignoreRoads: true,
    //     //     ignoreCreeps: true,
    //     //     avoid: true
    //     // });
        
    //     // if (ret == ERR_NO_PATH) {
    //     //     // no path found, try to move to a corner
    //     //     if (creep.pos.getRangeTo(pos) > 1) {
    //     //         // creep is not in the room yet
    //     //         creep.moveTo(pos, {
    //     //             reusePath: 50,
    //     //             maxOps: 1000,
    //     //             visualizePathStyle: {
    //     //                 stroke: '#ffaa00'
    //     //             },
    //     //             ignoreRoads: true,
    //     //             ignoreCreeps: true,
    //     //             avoid: true
    //     //         });
    //     //     } else {
    //     //         // creep is in the room, find a corner
    //     //         let direction = creep.pos.getDirectionTo(pos);
    //     //         let inverseDirection = inverseDirections[direction];
    //     //         let cornerPos = creep.pos.getPositionAtDirection(inverseDirection, 1);
    //     //         creep.moveTo(cornerPos, {
    //     //             reusePath: 50,
    //     //             maxOps: 1000,
    //     //             visualizePathStyle: {
    //     //                 stroke: '#ffaa00'
    //     //             },
    //     //             ignoreRoads: true,
    //     //             ignoreCreeps: true,
    //     //             avoid: true
    //     //         });
    //     //     }
    //     // }


    //     // avoid hostile creeps while moving to pos
    //     let ret = PathFinder.search(
    //         creep.pos, new RoomPosition(25, 25, roomName),
    //         {
    //           // We need to set the defaults costs higher so that we
    //           // can set the road cost lower in `roomCallback`
    //           plainCost: 2,
    //           swampCost: 10,
        
    //           roomCallback: function(roomName) {
        
    //             let room = Game.rooms[roomName];
    //             // In this example `room` will always exist, but since 
    //             // PathFinder supports searches which span multiple rooms 
    //             // you should be careful!
    //             if (!room) return;
    //             let costs = new PathFinder.CostMatrix;
        
    //             room.find(FIND_STRUCTURES).forEach(function(struct) {
    //               if (struct.structureType === STRUCTURE_ROAD) {
    //                 // Favor roads over plain tiles
    //                 costs.set(struct.pos.x, struct.pos.y, 1);
    //               } else if (struct.structureType !== STRUCTURE_CONTAINER &&
    //                          (struct.structureType !== STRUCTURE_RAMPART ||
    //                           !struct.my)) {
    //                 // Can't walk through non-walkable buildings
    //                 costs.set(struct.pos.x, struct.pos.y, 0xff);
    //               }
    //             });
        
    //             // Avoid creeps in the room
    //             room.find(FIND_CREEPS).forEach(function(creep) {
    //               costs.set(creep.pos.x, creep.pos.y, 0xff);
    //             });
        
    //             return costs;
    //           },
    //         }
    //       );
        
    //       let pos = ret.path[0];
    //       creep.move(creep.pos.getDirectionTo(pos));
     

    //     // creep.moveTo( new RoomPosition(25, 25, roomName), {range: 10, avoid: creep.room.find(FIND_HOSTILE_CREEPS), visualizePathStyle: {fill: 'transparent', stroke: '#fff', lineStyle: 'dashed', strokeWidth: .15, opacity: .1} } );
    // },
    calculateRoute: function(startRoom, endRoom) {
        let route = Game.map.findRoute(startRoom, endRoom, { routeCallback: routeCallback });
        let walkableRoute = {};
        let from = startRoom.name || startRoom;
        for(let node of route) {
            walkableRoute[from] = node.exit;
            from = node.room;
        }
        return walkableRoute;
    },
    leaveExit: function(creep) {
        if(creep.pos.x == 0) {
            creep.move(RIGHT);
        } else if(creep.pos.x == 49) {
            creep.move(LEFT);
        } else if(creep.pos.y == 0) {
            creep.move(BOTTOM);
        } else if(creep.pos.y == 49) {
            creep.move(TOP);
        }
        else {
            return false
        }
    },
    isOnExit: function(creep) {
        return creep.pos.x == 0 || creep.pos.y == 0 || creep.pos.x == 49 || creep.pos.y == 49;
    },
    getExitRoom: function(creep) {
        let direction = this.getExitDirection(creep);
        if(!direction) return null;

        return Game.map.describeExits(creep.room.name)[direction];
    },
    getExitDirection: function(creep) {
        if(creep.pos.x == 0) return LEFT;
        if(creep.pos.x == 49) return RIGHT;
        if(creep.pos.y == 0) return TOP;
        if(creep.pos.y == 49) return BOTTOM;
        return null;
    },
    inverseDirection: function(direction) {
        return inverseDirections[direction];
    },
    isWithin: function(creep, left, top, right, bottom) {
        let pos = creep.pos;
        return pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom;
    },
    gotTo: function() {
        
    }
};