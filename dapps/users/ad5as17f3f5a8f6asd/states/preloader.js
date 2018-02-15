Game.Preloader = function () {
    this.preload = () => {
        // Splash Screen
        this.splash = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'splash')


        // Progress Bar
        this.container = this.add.sprite(this.world.centerX, this.world.centerY, 'container')
        this.container.anchor.setTo( 0.5 )

        this.progress = this.add.sprite(0, 0, 'progress')
        this.progress.anchor.y = .5
        this.progress.x = -this.container.width / 2 + 7

        this.container.addChild( this.progress )

        this.time.advancedTiming = true

        this.load.setPreloadSprite( this.progress )


        // Loading Percent
        this.loading = this.add.text(this.world.centerX, this.world.centerY, '0%', {
            font: "20px Helvetica",
            fill: "#fff"
        })

        this.loading.anchor.setTo( 0.5 )
        this.loading.y += 3


        // JSON
        this.data = JSON.parse( this.game.cache.getText( 'data' ) )
        this.menu = JSON.parse( this.game.cache.getText( 'menu' ) )
        this.settings = JSON.parse( this.game.cache.getText( 'settings' ) )


        // Audio Settings Game
        for (var key in this.settings.audio) {
            this.load.audio(key, 'assets/audio/' + this.settings.audio[key])
        }


        // Audio Data Level
        for (var key in this.data.audio) {
            this.load.audio(key, 'levels/' + Game.level + '/audio/' + this.data.audio[key])
        }


        // Audio Menu
        for (var key in this.menu.audio) {
            this.load.audio(key, 'assets/audio/' + this.menu.audio[key])
        }


        // Images Level
        for (var key in this.data.images) {
            this.load.image(key, 'levels/' + Game.level + '/images/' + this.data.images[key])
        }
        

        // Images Settings Game
        for (var key in this.settings.images) {
            this.load.image(key, 'assets/images/' + this.settings.images[key])
        }
        

        // Images Data Menu
        for (var key in this.menu.images) {
            this.load.image(key, 'assets/images/' + this.menu.images[key])
        }


        // Texture Map
        this.load.atlasJSONHash('map', 'levels/' + Game.level + '/images/map.png', 'levels/' + Game.level + '/json/map.json')
        this.load.text('map', 'levels/' + Game.level + '/json/map.json')


        // Texture Player
        this.load.atlasJSONHash('player', 'assets/images/player.png', 'assets/json/player/texture.json')


        // Texture Spring
        this.load.atlasJSONHash('spring', 'assets/images/spring.png', 'assets/json/spring/texture.json')


        // Texture Explode
        this.load.atlasJSONHash('explode', 'assets/images/explode.png', 'assets/json/explode/texture.json')
    }

    this.create = () => this.state.start( 'MainMenu' )

    this.loadUpdate = () => this.loading.text = this.load.progress + '%'
}