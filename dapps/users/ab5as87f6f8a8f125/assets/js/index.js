;(function () {

	'use strict'

	// const form = document.querySelector( 'form' )

	// form.addEventListener('submit', event => {
    //     event.preventDefault();
    
    //     let room = form.room;

    //     API.Http.post('/web', {message_type: 'create', message: {room: room}}, response => {
    //         if ( !response ) return;

	// 		console.log( response )
    //     })
    // })

	// document.addEventListener('contextmenu', event => event.preventDefault())

	const start = () => {
		const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO)

		game.state.add('Boot',     Game.Boot);
		game.state.add('MainMenu', Game.MainMenu);
		game.state.add('Engine',   Game.Engine);
		
		game.state.start( 'Boot' );
	}
	
	start()
})();