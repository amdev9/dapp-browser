Game.MainMenu = function () {
    this.preload = () => {
        this.splash = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'splash')
 
        this.start = this.add.button(0, 0, 'start', this.startGame, this)
        this.start.position.setTo(this.world.width / 2 - this.start.width / 2, this.world.height / 2 - this.start.height / 2)
    }

    this.startGame = () => this.state.start( 'Engine' )
}