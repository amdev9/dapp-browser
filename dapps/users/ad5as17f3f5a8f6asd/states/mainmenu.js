Game.MainMenu = function () {
    this.create = () => {
        // Splash Screen
        this.splash = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'splash')


        // Menu Background
        this.menu = this.add.sprite(0, 0, 'menu')
        this.menu.position.setTo(window.innerWidth / 2 - this.menu.width / 2, window.innerHeight / 2 - this.menu.height / 2)


        // Start Button
        this.start = this.add.button(0, 0, 'start', this.startGame, this)
        this.start.position.setTo(this.menu.width / 2 - this.start.width / 2, this.menu.height / 2 - this.start.height / 2)

        this.menu.addChild( this.start )


        // Audio
        this.audio = {
            background: this.add.audio( 'background' )
        }


        // Start Audio Background
        this.audio.background.volume = 0.3
        this.audio.background.loop = true
        this.audio.background.play()


        // Menu Resize
        window.addEventListener('resize', () => {
            this.splash.width  = window.innerWidth
            this.splash.height = window.innerHeight
            this.menu.position.setTo(window.innerWidth / 2 - this.menu.width / 2, window.innerHeight / 2 - this.menu.height / 2)
        })
    }

    this.startGame = () => {
        this.audio.background.stop()
        this.state.start( 'Engine' )
    }
}

Game.MainMenu.prototype = Game.Settings.prototype;