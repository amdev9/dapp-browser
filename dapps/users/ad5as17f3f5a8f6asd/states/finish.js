Game.Finish = function () {
    this.preload = () => {
        this.stage.backgroundColor = 'FFF8DB';
        this.finish = this.add.sprite(0, 0, 'finish');
    }

    this.create = () => {
        this.finish.position.setTo(window.innerWidth / 2 - this.finish.width / 2, window.innerHeight / 2 - this.finish.height / 2 );
    }
}