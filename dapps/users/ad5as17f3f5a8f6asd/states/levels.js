Game.Levels = function ( game ) {
    this.elements = {}
}

// this.state.start('Preloader', true, false)

Game.Levels.prototype = {

    /*
     *  Create
     */

    create: function () {
        var _self = this;

        // Start Physics
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.restitution = 0;
        this.physics.p2.gravity.y = 0;
        this.physics.p2.gravity.x = 0;

        // Scale Mode
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        // this.scale.refresh();

        // this.game.scale.setResizeCallback(this.gameResized, this);

        var tilemap = this.getTileData( 'tilemap' );
        this.world.setBounds(tilemap.x > 0 ? -tilemap.x : 0, tilemap.y > 0 ? -tilemap.y : 0, tilemap.width, tilemap.height);

        // Background
        this.add.tileSprite(0, tilemap.y > 0 ? -tilemap.y : 0, window.innerWidth, window.innerHeight, 'background');
        this.add.tileSprite(0, tilemap.y > 0 ? -tilemap.y : 0, -this.world.width, window.innerHeight, 'background');
        
        // Tilemap
        this.tilemap = this.add.sprite(0, 0, 'tilemap');
        this.tilemap.width = tilemap.width;
        this.tilemap.height = tilemap.height;

        // Border
        // var border = this.getTileData( 'border' );
        // this.border = this.add.tileSprite(border.width / 2, border.height / 2, border.width, border.height, 'border');
        // this.physics.p2.enable(this.border, false);

        // this.border.body.clearShapes();
        // this.border.body.loadPolygon('physicsData', 'border');

        // this.border.body.static = true;
         

        // Data JSON
        this.json = JSON.parse( this.game.cache.getText('json') );

        // Map
        this.map = this.add.tilemap( 'map' );

        this.colliders = this.setColliders( this.map.objects );

        // console.log( this.map.heightInPixels )
        // console.log( this.map.widthInPixels )


        // Create Layers and Sprites
        // this.elements['layers'] = this.setLayer( this.json.layers );
        // this.elements['points'] = this.setSprite(this.json.points, 'points');
        // this.elements['boxes']  = this.setSprite(this.json.boxes, 'boxes');
        // this.elements['coins'] = this.setSprite(this.json.coins, 'coins');

        // If Not Exist
        // this.elements['coins'] = this.json.coins ? this.setSprite(this.json.coins, 'coins') : [];


        // All Objects
        // this.objects = this.elements['layers'].concat( this.elements['sprites'] );

        // Create Player
        this.player = this.add.sprite(0, 0, 'player');
        this.player.x = 400;
        this.player.y = this.player.height + 64;

        this.physics.p2.enable(this.player, false);
        // this.player.body.fixedRotation = false;

        this.player.anchor.setTo( .5 );
        this.player.body.angle = 180;

        // // Player Animations
        this.player.animations.add('run', [0, 1, 2, 3], 10, true);
        this.player.frame = 3;

        // Animation Coins
        // this.elements['coins'].forEach(function ( element ) {
        //     element.object.animations.add('circle', [0, 1, 2, 3, 4, 5], 15, false);
        // }, this )

        // Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.onDown.add(this.fullscreen, this);

        // Disable Collide
        // this.physics.p2.setPostBroadphaseCallback(this.disableCollide, this);

        // All Statistics
        this.statistic = {
            points: 0,
            level: Game.level,
            money: Game.money
        }

        // Text Info
        this.info = {
            points: this.add.text(64, 15, "Points: " + this.statistic.points, {
                font: "26px Arial",
                fill: "#ff0044",
                align: "center"
            }),

            money: this.add.text(264, 15, "Money: " + this.statistic.money, {
                font: "26px Arial",
                fill: "#ff0044",
                align: "center"
            }),

            fps: this.add.text(64, 60, "FPS: " + this.time.fps, {
                font: "26px Arial",
                fill: "#ff0044",
                align: "center"
            }),
        }

        // Audio
        this.audio = {
            background: this.add.audio( 'background' ),
            coins: this.add.audio( 'coins' ),
            points: this.add.audio( 'points' ),
            finish: this.add.audio( 'finish' )
        }

        // Audio Background
        this.audio.background.volume = 0;
        this.audio.background.loop = true;
        this.audio.background.play();

        // this.camera.follow( this.player );
        this.camera.follow( this.player );

        window.addEventListener('resize', function () {
            _self.gameResized();
        })

        // Helper Marker
        // this.helpMarker();
    },


    gameResized: function () {
        var tilemap = this.getTileData( 'tilemap' );

        this.world.bounds.x = tilemap.x > 0 ? -tilemap.x : 0;
        this.world.bounds.y = tilemap.y > 0 ? -tilemap.y : 0;
    },


    getTileData: function ( image ) {
        var image = this.game.cache.getImage( 'tilemap' );

        return {
            width : image.width,
            height: image.height,
            x: ( window.innerWidth  - image.width )  / 2,
            y: ( window.innerHeight - image.height ) / 2
        }
    },


    setColliders: function ( objects ) {
        for ( var key in objects ) {
            for (var i = 0; i < objects[key].length; i++) {
                var graphics = this.add.graphics(objects[key][i].x, objects[key][i].y);
                var points = objects[key][i].polygon || objects[key][i].polyline;
                var polygon = new Phaser.Polygon();

                polygon.setTo( points );

                // graphics.beginFill( 0xFF33ff );
                graphics.drawPolygon( polygon.points );
                graphics.endFill();

                this.physics.p2.enable(graphics, true);

                graphics.body.static = true;
                graphics.body.clearShapes();
                graphics.body.loadPolygon('physicsData', key);

                graphics.pivot.x = graphics.width / 2
                graphics.pivot.y = graphics.height / 2

                graphics.body.x += graphics.width / 2
                graphics.body.y += graphics.height / 2
            }
        }
    },


    /*
     *  Update
     */

    update: function () {
        // Set Polygon
        if ( this.currentFrame != this.player.animations.frame ) {
            this.player.body.clearShapes();
            this.player.body.loadPolygon('physicsData', 'player_' + this.player.animations.frame);
            this.currentFrame = this.player.animations.frame
        }

        // Controll Player
        this.controll( 15 );

        // Zero Positions Boxes
        // this.elements['boxes'].forEach(function ( element ) {
        //     element.object.body.setZeroVelocity();
        //     element.object.body.fixedRotation = true;
        // }, this )

        // Static Points
        // this.elements['points'].forEach(function ( element ) {
        //     element.object.body.static = true;
        // }, this )

        // Zero Positions Points
        // this.elements['coins'].forEach(function ( element ) {
        //     element.object.body.setZeroVelocity();
        //     element.object.animations.play( 'circle' );
        // }, this )

        // Overlap Boxes To Points
        // this.overlapBoxToPoints(this.elements['boxes'], this.elements['points']);

        // Overlap Player Boxes
        // this.overlapPlayer(this.elements['boxes'], function ( element ) {
        //     if ( element.deltaX.toFixed() != 0 || element.deltaY.toFixed() != 0 ) {
        //         // if ( !this.audio.move.isPlaying ) {
        //         //     this.audio.move.play();
        //         // }
        //     }
        // });

        // Overlap Player Coins
        // this.overlapPlayer(this.elements['coins'], function (element, index, array) {
        //     // if ( !this.audio.coins.isPlaying ) this.audio.coins.play();
        //     this.audio.coins.play()

        //     delete array[index];
        //     element.destroy();

        //     this.statistic.money++;
        //     this.info.money.text = 'Money: ' + this.statistic.money;
        // });
    },


    /*
     *  Render
     */

    render: function () {
        this.info.fps.text = "FPS: " + this.time.fps;
    }
}



/*
 *  Full Screen
 */

Game.Levels.prototype.fullscreen = function () {
    if ( this.scale.isFullScreen ) {
        this.scale.stopFullScreen();
    } else {
        this.scale.startFullScreen( false );

        this.camera.view.width = window.screen.width
        this.camera.view.height = window.screen.height

        this.game.renderer.resize(window.screen.width, window.screen.height)
    }
}



/*
 *  Controll Player
 */

Game.Levels.prototype.controll = function ( speed ) {
    this.player.body.setZeroVelocity();

    if ( this.cursors.left.isDown ) {
        this.player.body.rotateLeft( speed * 5 );
    } else if ( this.cursors.right.isDown ) {
        this.player.body.rotateRight( speed * 5 );
    } else {
        this.player.body.setZeroRotation();
    }

    if ( this.cursors.up.isDown ) {
        this.player.body.thrust( speed * 1000 );
        this.player.animations.play( 'run' );
    } else if ( this.cursors.down.isDown ) {
        this.player.body.reverse( speed * 1000 );
        this.player.animations.play( 'run' );
    } else {
        this.player.animations.stop( 'run' );
        this.player.frame = 3;
    }
}



/*
 *  Create Sprite
 */

Game.Levels.prototype.setSprite = function (array, name) {
    var output = [];

    array.forEach(function ( element ) {
        var sprite = {
            "object": this.add.sprite(element.x + element.width / 2, element.y + element.height / 2, element.key),
            "data"  : element
        }

        if ( sprite.data.physics ) {
            this.physics.p2.enable(sprite.object, false);
            sprite.object.body.fixedRotation = true;
            sprite.object.body.clearShapes();
            sprite.object.body.loadPolygon('physicsData', name);

            // sprite.object.body.moveForward(1000);
        }

        output.push( sprite );
    }, this )

    return output;
}



/*
 *  Create Layer
 */

Game.Levels.prototype.setLayer = function ( array ) {
    var output = [];

    array.forEach(function (element, index) {
        this.map.addTilesetImage( element.key );

        var layer = {
            "object": this.map.createLayer( element.name ),
            "data"  : element
        }

        layer.object.resizeWorld();

        // var offset = {
        //     x: ( window.screen.width - this.map.widthInPixels ) / 2,
        //     y: ( window.screen.height - this.map.heightInPixels ) / 2
        // }

        // layer.object.pivot.x = offset.x > 0 ? -offset.x : 0;
        // layer.object.pivot.y = offset.y > 0 ? -offset.y : 0;

        if ( layer.data.collision ) {
            this.map.setCollisionByExclusion([0], true, layer.object);
            // this.map.setCollision([759,820,996,999], true, layer.object);
            this.physics.p2.convertTilemap(this.map, layer.object);
        }

        if ( layer.data.debug ) layer.object.debug = true;

        output.push( layer );
    }, this )

    return output;
}



/*
 *  Disable Collide Objects
 */

// Game.Levels.prototype.disableCollide = function (SptA, SptB) {
//     if ( SptA.sprite != null && SptB.sprite != null ) {
//         var keyA = SptA.sprite.key,
//             keyB = SptB.sprite.key;

//         var keys = [['box', 'points'], ['player', 'points'], ['coins', 'points']],
//             output = true;

//         keys.forEach(function ( key ) {
//             if ( keyA === key[0] && keyB === key[1] || keyA === key[1] && keyB === key[0] ) {
//                 output = false;
//             }
//         }, this );

//         return output;
//     }

//     return true;
// }



/*
 *  Check Overlap
 */

Game.Levels.prototype.checkOverlap = function (SptA, SptB) {
    var BoundsA = SptA.getBounds();
    var BoundsB = SptB.getBounds();

    return Phaser.Rectangle.intersects(BoundsA, BoundsB);
}



/*
 *  Overlap Player
 */

Game.Levels.prototype.overlapPlayer = function (elements, callback) {
    elements.forEach(function (element, index, array) {
        if ( this.checkOverlap(this.player, element.object) ) {
            callback.call(this, element.object, index, array);
        }
    }, this )
}



/*
 *  Overlap Boxes To Points
 */

// Game.Levels.prototype.overlapBoxToPoints = function (input, output) {
//     input.forEach(function ( element ) {
//         output.forEach(function ( collide ) {
//             if ( this.checkOverlap(element.object, collide.object) ) {
//                 var xc = Number( collide.object.x.toFixed() ),
//                     xe = Number( element.object.x.toFixed() );

//                 var yc = Number( collide.object.y.toFixed() ),
//                     ye = Number( element.object.y.toFixed() );

//                 if ( !element.object.body.static && xc == xe && yc == ye ) {
//                     collide.object.alpha = 0;

//                     element.object.alpha = 0.7;
//                     element.object.body.static = true;

//                     this.audio.points.play();

//                     this.statistic.points++;
//                     this.info.points.text = 'Points: ' + this.statistic.points;

//                     if ( this.statistic.points >= this.json.points.length ) {
//                         this.audio.background.stop();

//                         this.audio.finish.play();
//                         this.audio.finish.onStop.add(this.nextLevel, this);
//                     }
//                 }
//             }
//         }, this )
//     }, this )
// }



/*
 *  Next Level
 */

Game.Levels.prototype.nextLevel = function () {
    socket.emit('update', {
        level: this.statistic.level + 1,
        money: this.statistic.money
    });
}



/*
 *  Helper Marker
 */

Game.Levels.prototype.helpMarker = function () {
    var marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 50, 50);

    var coords = this.add.text(this.world.width - 300, 15, "X: " + marker.x + " Y: " + marker.y, {
        font: "26px Arial",
        fill: "#ff0044",
        align: "center"
    });

    this.input.addMoveCallback(function () {
        var layer = this.elements['layers'][0].object;

        marker.x = layer.getTileX( this.input.activePointer.worldX ) * 50;
        marker.y = layer.getTileY( this.input.activePointer.worldY ) * 50;

        coords.text = "X: " + marker.x + " Y: " + marker.y;
    }, this);
}