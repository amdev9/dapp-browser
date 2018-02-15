Game.Settings = function () {
    this.preload = () => {
        // Physics
        this.physics.startSystem( Phaser.Physics.P2JS )
        this.physics.p2.restitution = 0
        this.physics.p2.friction    = 0
        this.physics.p2.gravity.y   = 1500
        this.physics.p2.gravity.x   = 0


        // Scale Mode
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE


        // Physics Player
        this.load.physics('player', 'assets/json/player/physics.json')
        
        
        // Physics Bomb
        this.load.physics('bombs', 'assets/json/bombs/physics.json')
        
        
        // Physics Coins
        this.load.physics('coins', 'assets/json/coins/physics.json')


        // Physics Spring
        this.load.physics('spring', 'assets/json/spring/physics.json')


        // JSON Main Menu
        this.load.text('menu', 'assets/json/menu/data.json')


        // JSON Settings Game
        this.load.text('settings', 'assets/json/settings.json')


        // JSON Data Level
        this.load.text('data', 'levels/' + Game.level + '/json/data.json')


        // JSON Ground
        this.load.text('ground', 'levels/' + Game.level + '/json/ground/objects.json')
        // this.load.physics('ground', 'levels/' + Game.level + '/json/ground/physics.json')


        // JSON Thorns
        this.load.text('thorns', 'levels/' + Game.level + '/json/thorns/objects.json')
        // this.load.physics('thorns', 'levels/' + Game.level + '/json/thorns/physics.json')


        // JSON Exit
        this.load.text('exit', 'levels/' + Game.level + '/json/exit/objects.json')
        // this.load.physics('exit', 'levels/' + Game.level + '/json/exit/physics.json')
    }

    this.create = () => this.state.start( 'Preloader' );
}



/*
 *  Touching Down
 */

Game.Settings.prototype.touchingDown = function ( body ) {
    var yAxis = p2.vec2.fromValues(0, 1)
    var result = false
    var contacts = this.physics.p2.world.narrowphase.contactEquations

    for (var i = 0; i < contacts.length; i++) {
        var point = contacts[i]

        if ( point.bodyA === body.data || point.bodyB === body.data ) {
            var dot = p2.vec2.dot(point.normalA, yAxis)

            if ( point.bodyA === body.data ) dot *= -1
            if ( dot > 0.5 ) result = true
        }
    }
    
    return result
}



/*
 *  Detect Collision
 */

Game.Settings.prototype.detectCollision = function (target, array, func) {
    for (var i = 0; i < array.length; i++) {
        var bodyA = this.physics.p2.getBody( target )
        var bodyB = this.physics.p2.getBody( array[i] )

        if ( p2.Broadphase.aabbCheck(bodyA, bodyB) ) func( array[i] )
    }
}



/*
 *  Disable Collision
 */

Game.Settings.prototype.disableCollision = function (sptA, sptB) {
    if ( sptA.sprite != null && sptB.sprite != null ) {
        var keyA = sptA.sprite.key
        var keyB = sptB.sprite.key
            
        var target = 'player'
        var keys   = ['thorns', 'exit', 'bombs', 'coins']
        var output = true

        for (let i = 0; i < keys.length; i++) {
            if ( keyA === target && keyB === keys[i] || keyA === keys[i] && keyB === target ) output = false
        }

        return output
    }

    return true
}



/*
 *  Create Objects
 */

Game.Settings.prototype.createObjects = function ( data ) {
    var output = []

    data.objects.forEach(object => {
        var graphics = this.add.graphics(object.x, object.y)
            graphics.drawRect(object.x, object.y, object.width, object.height)
            graphics.endFill()

        var sprite = this.add.sprite(graphics.x, graphics.y)
        sprite.addChild( graphics )

        sprite.key = data.name
        sprite.width = graphics.width
        sprite.height = graphics.height

        graphics.destroy()

        if ( data.properties.physics ) {
            this.physics.p2.enable(sprite, false) // true - debug
            sprite.body.fixedRotation = true

            if ( data.properties.polygon ) {
                sprite.body.clearShapes()
                sprite.body.loadPolygon(data.name, object.id)
            }
             
            sprite.body.x += sprite.width / 2
            sprite.body.y += sprite.height / 2

            if ( data.properties.static ) sprite.body.static = true
        }

        output.push( sprite )
    })

    return output
}



/*
 *  Reposition Player
 */

Game.Settings.prototype.reposition = function () {
    this.player.body.x = this.player.coords.x
    this.player.body.y = this.player.coords.y

    this.player.scale.x = 1
    // this.player.body.loadPolygon('player', 'idle')
}



/*
 *  Get Image Data
 */

Game.Settings.prototype.getImageData = function ( name ) {
    var image = this.game.cache.getImage( name )

    return {
        width: image.width,
        height: image.height,
        x: (window.innerWidth - image.width) / 2,
        y: (window.innerHeight - image.height) / 2
    }
}



/*
 *  World Resize
 */

Game.Settings.prototype.worldResize = function () {
    const round = window.innerHeight / this.tilemap.height

    const bounds = {
        x: this.tilemap.width  < window.innerWidth  ? - ( window.innerWidth  - this.tilemap.width ) / 2 : 0,
        y: this.tilemap.height < window.innerHeight ? - ( window.innerHeight - this.tilemap.height ) : 0
    }

    this.world.bounds.x = bounds.x
    this.world.bounds.y = bounds.y
    this.world.bounds.height = this.tilemap.height * (round > 1 ? round : 1)

    this.background.x = bounds.x
    this.background.width = this.tilemap.width < window.innerWidth ? window.innerWidth : this.tilemap.width
}



/*
 *  Check Overlap
 */

Game.Settings.prototype.checkOverlap = function (sptA, sptB) {
    const boundsA = sptA.getBounds()
    const boundsB = sptB.getBounds()

    return Phaser.Rectangle.intersects(boundsA, boundsB)
}



/*
 *  Fullscreen
 */

Game.Settings.prototype.fullscreen = function () {
    if ( this.scale.isFullScreen ) return this.scale.stopFullScreen()
    
    this.scale.startFullScreen( false )

    this.camera.view.width = window.screen.width
    this.camera.view.height = window.screen.height

    this.game.renderer.resize(window.screen.width, window.screen.height)
}



/*
 *  Helper Marker
 */

Game.Settings.prototype.helper = function ( tilemap ) {
    var marker = this.add.graphics()
    marker.lineStyle(2, 0x000000, 1)
    marker.drawRect(0, 0, 100, 100)

    var coords = this.add.text(100, 15, "X: " + marker.x + " Y: " + marker.y, {
        font: "26px Arial",
        fill: "#ff0044",
        align: "center"
    })

    // coords.fixedToCamera = true
    // coords.cameraOffset.setTo(100, 15)

    this.input.addMoveCallback(() => {
        marker.x = this.input.activePointer.worldX - 50
        marker.y = this.input.activePointer.worldY - 50

        coords.text = "X: " + marker.x + " Y: " + marker.y
        
        coords.x = this.input.activePointer.worldX + 50
        coords.y = this.input.activePointer.worldY + 50
    })
}