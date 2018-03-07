Game.Finish = function () {
    this.preload = () => {
        this.stage.backgroundColor = '141414'
        this.finish = this.add.sprite(0, 0, 'finish')
        this.reload = this.add.sprite(0, 0, 'reload')

        this.finish.addChild( this.reload )

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
        
        this.finish.position.setTo(document.body.clientWidth / 2 - this.finish.width / 2, document.body.clientHeight / 2 - (this.finish.height / 2 + this.reload.height) )
        this.reload.position.setTo(this.finish.width / 2 - this.reload.width / 2, this.finish.height + this.reload.height )
    }
}