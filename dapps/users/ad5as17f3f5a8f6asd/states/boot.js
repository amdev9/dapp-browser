var Game = {
    level: 1,
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
        API.Http.post('/storage', {message_type: 'findOne', message: {}}, ( response ) => {
            let object = JSON.parse( response )
            Game.storage = object.docs || {}

            this.state.start( 'Settings' )
        })
    }
}