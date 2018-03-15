var Game = {
    level: 1,
    start: true,
    storage: {}
}

Game.Boot = function () {
	this.preload = () => {
        this.load.image('container', 'assets/images/progress/container.png')
        this.load.image('progress', 'assets/images/progress/progress.png')
        this.load.image('gameover', 'assets/images/gameover.png')
        this.load.image('splash', 'assets/images/splash.png')
        this.load.image('finish', 'assets/images/finish.png')
        this.load.image('reload', 'assets/images/reload.png')
    }

    this.create = () => {
        API.Http.post('/web', {message_type: 'find', message: {type: 'coin'}}, response => {
            let object = JSON.parse( response )
            Game.storage.coins = JSON.parse( object.message.response ) || []
            Game.storage.start = !Game.storage.coins.length

            this.state.start( 'Settings' )
        })
    }
}