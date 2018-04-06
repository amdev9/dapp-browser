(function () {

	'use strict'

	document.addEventListener('contextmenu', event => event.preventDefault())

	// Forms
    const create = document.querySelector( 'form[name = create]' )
	const connect = document.querySelector( 'form[name = connect]' )
	
	const ready = ( response ) => {
		let object = JSON.parse( response )
		
		if ( object.message.error ) return alert( 'Room Error!' )

		document.body.innerHTML = ''
		
		const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO)

		game.state.add('Boot',     Game.Boot)
		game.state.add('MainMenu', Game.MainMenu)
		game.state.add('Engine',   Game.Engine)
		
		game.state.start( 'Boot' )
	}

	// Create
    create.addEventListener('submit', function ( event ) {
        event.preventDefault()
		API.Room[this.name](this.message.value, ready)
	})
	
	// Connect
    connect.addEventListener('submit', function ( event ) {
        event.preventDefault()
        API.Room[this.name](this.message.value, ready)
	})

	// Event Post Message
	window.addEventListener('message', event => {
		connect.querySelector( '[name = message]' ).value = event.data.room || ''
	})
})()