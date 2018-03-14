const Game = {}

Game.Boot = function () {
	this.preload = () => {
        this.load.path = 'assets/images/'
        this.load.images(['splash', 'grid', 'tile', 'start', 'cross', 'zero', 'substrate'])
    }

    this.create = () => this.state.start( 'MainMenu' )
}