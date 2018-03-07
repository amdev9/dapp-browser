;(() => {
	const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO );

	game.state.add('Boot',      Game.Boot);
	game.state.add('Settings',  Game.Settings);
	game.state.add('Preloader', Game.Preloader);
	game.state.add('MainMenu',  Game.MainMenu);
	game.state.add('Finish',    Game.Finish);
	game.state.add('GameOver',  Game.GameOver);
	game.state.add('Engine',    Game.Engine);

	game.state.start( 'Boot' );
})();