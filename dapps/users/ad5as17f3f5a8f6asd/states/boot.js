const Game = {
    level: 1
}

Game.Boot = function () {
	this.preload = () => {
        this.load.image('container', 'assets/images/progress/container.png');
        this.load.image('progress', 'assets/images/progress/progress.png');
        this.load.image('splash', 'assets/images/splash.png');
        this.load.image('finish', 'assets/images/finish.png');
    }

    this.create = () => this.state.start( 'Settings' )
}