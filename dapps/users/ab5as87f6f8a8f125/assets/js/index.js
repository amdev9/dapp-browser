;(() => {
	// Canvas
	const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO)


	// States
	game.state.add('Boot',     Game.Boot);
	game.state.add('MainMenu', Game.MainMenu);
	game.state.add('Engine',   Game.Engine);
	
	game.state.start( 'Boot' );


	// Events
	document.addEventListener('contextmenu', event => event.preventDefault())
})();