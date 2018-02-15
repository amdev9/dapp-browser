Game.Engine = function() {
    this.create = function() {       
        // JSON
        this.data = JSON.parse( this.game.cache.getText( 'data' ) )
        this.ground = JSON.parse( this.game.cache.getText( 'ground' ) )
        this.thorns = JSON.parse( this.game.cache.getText( 'thorns' ) )
        this.exit = JSON.parse( this.game.cache.getText( 'exit' ) )
        this.map  = JSON.parse( this.game.cache.getText( 'map' ) )


        // Sky Color
        this.stage.backgroundColor = this.data.color


        // Tilemap Group
        this.tilemap = this.add.group()
        
        for (var i = 0; i < this.map.frames.length; i++) {
            var frame = this.add.sprite(this.map.frames[i].frame.w * i, 0, 'map', i)
            this.tilemap.add( frame )
        }


        // Background
        this.background = this.add.tileSprite(
            this.tilemap.width < window.innerWidth ? - ( window.innerWidth - this.tilemap.width ) / 2 : 0, 0,
            this.tilemap.width < window.innerWidth ? window.innerWidth : this.tilemap.width,
            this.tilemap.height,
            'background'
        )


        // Swap Sprite
        this.world.swap(this.tilemap, this.background)
        

        // World
        var round = window.innerHeight / this.tilemap.height

        this.world.setBounds(
            this.tilemap.width < window.innerWidth ? - ( window.innerWidth - this.tilemap.width ) / 2 : 0, 
            this.tilemap.height < window.innerHeight ? - ( window.innerHeight - this.tilemap.height ) : 0,
        	this.tilemap.width, this.tilemap.height * (round > 1 ? round : 1)
        )


        // Objects
        this.elements = {}
        this.elements['ground'] = this.createObjects( this.ground )
        this.elements['thorns'] = this.createObjects( this.thorns )
        this.elements['exit']   = this.createObjects( this.exit )

        this.elements['spring'] = []
        this.elements['health'] = []
        this.elements['bombs']  = []
        this.elements['coins']  = []


        // Platforms
        this.platforms = this.add.physicsGroup()

        for (var i = 0; i < this.elements.ground.length; i++) {
            this.platforms.add( this.elements.ground[i] )
        }

        // this.platforms.setAll('body.velocity.x', 100)


        // Items map
        for (var i = 0; i < this.data.items.length; i++) {
            var item = this.add.sprite(this.data.items[i].x, 0, this.data.items[i].key)
            item.position.y = this.tilemap.height - (this.data.items[i].y + item.height / 2)

            if ( this.data.items[i].physics ) {
                this.physics.p2.enable(item, false) // true - debug
                item.body.fixedRotation = true

                item.body.clearShapes()
                item.body.loadPolygon(this.data.items[i].key, this.data.items[i].key)
            }

            if ( this.data.items[i].static ) item.body.static = true

            this.elements[item.key].push( item )
        }


        // Spring
        for (let i = 0; i < this.elements['spring'].length; i++) {
            this.elements['spring'][i].frame = 3
            this.elements['spring'][i].animations.add('up', Phaser.Animation.generateFrameNames('up_', 0, 4, '.png'), 15, false)
        }


        // Player
        this.player = this.add.sprite(0, 0, 'player')

        this.player.data.health = 3
        this.player.data.total  = 0

        this.player.coords = {
            x: this.data.player.x ? this.data.player.x : 0,
            y: this.tilemap.height - (this.data.player.y + this.player.height / 2)
        }

        this.player.position.setTo(this.player.coords.x, this.player.coords.y)
        this.physics.p2.enable(this.player, false) // true - debug
        this.player.body.fixedRotation = true
         

        this.player.anchor.setTo( .5 )
        this.player.body.clearShapes()
        this.player.body.loadPolygon('player', 'idle')

        this.player.animations.add('idle', Phaser.Animation.generateFrameNames('idle_', 0, 29, '.png'), 29,  true)
        this.player.animations.add('jump', Phaser.Animation.generateFrameNames('jump_', 0, 29, '.png'), 100, false)
        this.player.animations.add('fall', Phaser.Animation.generateFrameNames('fall_', 0, 40, '.png'), 40,  false)
        this.player.animations.add('run',  Phaser.Animation.generateFrameNames('run_', 0, 19, '.png'),  25,  true)

        this.player.animations.play( 'idle' )


        // Total Coins
        this.coins = this.add.sprite(15, 15, 'coins')
        this.coins.fixedToCamera = true

        this.coins.addChild(this.add.text(this.coins.width + 15, this.coins.height / 2 - 10, 'Total: ' + this.player.data.total, {
            font: '20px Helvetica',
            fill: '#000'
        }))


        // Total Health 
        for (let i = 0; i < this.player.data.health; i++) {
            let item = this.add.sprite(15, 0, 'health')
            let offset = document.body.clientWidth - item.width - 15

            item.fixedToCamera = true
            item.cameraOffset.setTo(offset - (item.width + 15) * i, 15)

            this.elements['health'].unshift( item )
        }


        // Cursor
        // this.input.onDown.add(this.fullscreen, this)


        // Camera
        this.camera.y = this.player.coords.y
        this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05)


        // Audio
        this.audio = {
            music: this.add.audio( 'music' ),
            water: this.add.audio( 'water' ),
            boom : this.add.audio( 'boom' )
        }


        // Background Music
        this.audio.music.volume = 0.3
        this.audio.music.loop = true
        this.audio.music.play()


        // Collisions
        this.physics.p2.setPostBroadphaseCallback(this.disableCollision, this)


        // Drown in Water
        // this.drowned = this.add.tween(this.player.scale).to({ x: 0, y: 0 }, 100);


        // Spray
        // this.spray = this.add.emitter(0, 0, 100);
        // this.spray.makeParticles('spray');
        // this.spray.setAlpha(.7, 0, 1500);
        // this.spray.gravity = 0;
        // this.spray.width = 50


        // World Resize
        window.addEventListener('resize', () => this.worldResize())
        

        // Helper
        // this.helper( this.tilemap )


        // FPS
        // this.fps = this.add.text(0, 0, "FPS: " + this.time.fps, {
        //     font: "20px Helvetica",
        //     fill: "#000"
        // })

        // this.fps.fixedToCamera = true
        // this.fps.cameraOffset.setTo(15, window.innerHeight - this.fps.height)


        // Keyboard
        this.upKey = this.input.keyboard.addKey( Phaser.Keyboard.UP )
        this.downKey = this.input.keyboard.addKey( Phaser.Keyboard.DOWN )
        this.leftKey = this.input.keyboard.addKey( Phaser.Keyboard.LEFT )
        this.rightKey = this.input.keyboard.addKey( Phaser.Keyboard.RIGHT )
        this.spaceKey = this.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR )


        // Options
        this.isJump = false
        this.isFall = false
        this.isDie  = false
        this.liveTimer = 0
    }

    this.update = () => {
        // this.cloud.tilePosition.x += 2
        this.background.tilePosition.x = - ( this.camera.x * 0.07 )


        // Explode Player
        this.detectCollision(this.player, this.elements['bombs'], object => {
            this.audio.boom.play()
                    
            var explode = this.add.sprite(0, 0, 'explode')
                explode.x = object.x - explode.width / 2
                explode.y = object.y - ( explode.height - object.height / 2 )
                        
            object.destroy()

            var index  = this.elements['bombs'].indexOf( object )
            let health = this.elements['health'].shift()

            if ( health ) health.destroy()

            this.elements['bombs'].splice(index, 1)

            explode.animations.add('explode', Phaser.Animation.generateFrameNames('plane_', 0, 7, '.png'), 25, false)
                    
            this.isFall = true

            explode.animations.play( 'explode' ).onComplete.add(() => explode.destroy())

            this.player.data.health -= 1

            this.player.animations.play( 'fall' ).onComplete.add(() => {
                this.isDie = this.player.data.health <= 0
            })
        })


        // Get Coins
        this.detectCollision(this.player, this.elements['coins'], object => {
            object.destroy()

            var index = this.elements['coins'].indexOf( object )
            this.elements['coins'].splice(index, 1)

            this.player.data.total++
            this.coins.children[0].text = 'Total: ' + this.player.data.total
        })

        
        // Player Position
        var position = {
            x: this.player.position.x,
            y: this.player.position.y
        } 


        // Is Touching Down Player
        var isTouchingDown = this.touchingDown( this.player.body )


        // Controll Player
        this.player.body.velocity.x = 0

        if ( this.leftKey.isDown && !this.isFall ) {
            this.player.body.moveLeft( 250 )
            this.player.scale.x = -1

            if ( !isTouchingDown ) {
                 if ( !this.isJump ) {
                    var animate = this.player.animations.play( 'jump' )

                    animate.onComplete.add(() => {
                        this.player.animations.stop( 'jump' )
                        this.isJump = true
                    })
                }
            } else {
                this.player.animations.play( 'run' )
            }
        } else if ( this.rightKey.isDown && !this.isFall ) {
            this.player.body.moveRight( 250 )
            this.player.scale.x = 1

            if ( !isTouchingDown ) {
                 if ( !this.isJump ) {
                    var animate = this.player.animations.play( 'jump' )

                    animate.onComplete.add(() => {
                        this.player.animations.stop( 'jump' )
                        this.isJump = true
                    })
                }
            } else {
                this.player.animations.play( 'run' )
            }
        } else if ( !this.isFall ) {
            if ( !isTouchingDown ) {
                if ( !this.isJump ) {
                    var animate = this.player.animations.play( 'jump' )

                    animate.onComplete.add(() => {
                        this.player.animations.stop( 'jump' )
                        this.isJump = true
                    })
                }
            } else {
                this.player.animations.play( 'idle' )
            }
        }

        if ( this.spaceKey.isDown && isTouchingDown && !this.isFall ) {
            this.player.body.moveUp( 600 )
            this.isJump = false
        }

        if ( isTouchingDown && this.isFall && !this.isDie ) {
            this.liveTimer += .1
            
            if ( this.liveTimer < 8 ) return
                
            this.isFall = false
            this.liveTimer = 0
        }


        // Spring Collision
        for (let i = 0; i < this.elements['spring'].length; i++) {
            let offset = this.elements['spring'][i].bottom - this.elements['spring'][i].height + 10

            if ( offset > this.player.bottom + 10 ) {
                if ( !this.elements['spring'][i].data.loaded ) {
                    this.elements['spring'][i].body.loadPolygon('spring', 'spring')
                    this.elements['spring'][i].data.loaded = true
                }
            } else if ( offset + 40 < this.player.bottom ) {
                this.elements['spring'][i].body.clearShapes()
                this.elements['spring'][i].data.loaded = false
            }
        }

         
        // Detect Collision
        var exit = this.physics.p2.hitTest(position, this.elements['exit']);
        if ( exit.length ) this.state.start( 'Finish' );

        var spring = this.physics.p2.hitTest(this.player.bottom, this.elements['spring']);
        
        if ( spring.length ) {
            this.detectCollision(this.player, this.elements['spring'], object => {
                this.player.body.moveUp( 1000 )

                object.animations.play( 'up' )
            })
        }
    }

    this.render = () => {
        // this.fps.text = "FPS: " + this.time.fps

        // this.game.debug.spriteBounds( this.player )
        // this.game.debug.spriteBounds( this.elements['spring'][0] )
    }
}

Game.Engine.prototype = Game.Settings.prototype;