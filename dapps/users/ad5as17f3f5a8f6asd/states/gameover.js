Game.GameOver = function () {
    this.preload = () => {
        this.stage.backgroundColor = '141414'
        this.gameover = this.add.sprite(0, 0, 'gameover')
        this.reload = this.add.sprite(0, 0, 'reload')

        this.gameover.addChild( this.reload )

        this.world.bounds.height = document.body.clientHeight
        this.world.bounds.width  = document.body.clientWidth

        this.world.bounds.x = 0
        this.world.bounds.y = 0

        this.input.onDown.add(() => this.state.start( 'Boot' ))

        window.addEventListener('resize', () => this.create() )
    }

    this.create = () => {
        this.world.bounds.height = document.body.clientHeight
        this.world.bounds.width  = document.body.clientWidth

        this.world.bounds.x = 0
        this.world.bounds.y = 0

        this.gameover.position.setTo(document.body.clientWidth / 2 - this.gameover.width / 2, document.body.clientHeight / 2 - (this.gameover.height / 2 + this.reload.height) )
        this.reload.position.setTo(this.gameover.width / 2 - this.reload.width / 2, this.gameover.height + this.reload.height )
    }
}