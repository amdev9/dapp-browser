Game.Engine = function () {
    this.create = () => {
        // Background
        this.stage.backgroundColor = '#F5F5F5'
        this.input.mouse.capture = true

        // Finish
        this.finish = false


        // Settings
        this.tree  = {}
        this.count = 3


        // Winner Position
        this.position = []

        const object = {
            rows  : [],
            cells : [],
            top   : [],
            bottom: []
        }

        for (let y = 0; y < this.count; y++) {
            let row  = []
            let cell = []

            for (let x = 0; x < this.count; x++) {
                row.push( [y, x] )
                cell.push( [x, y] )
            }

            object.rows.push( row )
            object.cells.push( cell )
        }

        for (let y = 0, x = 0; y < this.count; y++, x++) object.top.push( [y, x] )
    
        for (let y = this.count - 1, x = 0; y >= 0; y--, x++) object.bottom.push( [y, x] )
        
        this.position = this.position.concat( object.rows ).concat( object.cells )

        this.position.push( object.top )
        this.position.push( object.bottom )


        // Row/Cell
        let tiles = []

        for (let i = 0; i < this.count; i++) {
            let array = []

            for (let a = this.count * i; a < this.count * i + this.count; a++) array.push( a )
            
            tiles.push( array )
        }


        // Grid
        this.grid = this.add.sprite(0, 0)


        // Substrate
        this.substrate = this.add.tileSprite(0, 0, 0, 0, 'substrate')
        this.grid.addChild( this.substrate )


        // Create Tiles
        this.size = {x: 0, y: 0}

        for (let y = 0; y < tiles.length; y++) {
            for (let x = 0; x < tiles[y].length; x++) {
                let tile = this.add.sprite(0, 0, 'tile')
                tile.position.setTo(tile.width * x, tile.height * y)

                tile.data.type = null
                tile.data.index = tiles[y][x]
                tile.data.bounds = {y: y, x: x}

                tile.inputEnabled = true
                tile.events.onInputDown.add(this._onMouseDown, this)

                this.size.x = tile.width  * this.count
                this.size.y = tile.height * this.count

                this.tree[y + '' + x] = tile
                this.grid.addChild( tile )
            }
        }

        
        // Set Position Grid
        this.grid.position.setTo(this.stage.width / 2 - this.size.x / 2, this.stage.height / 2 - this.size.y / 2)


        // Position Substrate
        let border = 8
        this.substrate.width  = this.size.x + border
        this.substrate.height = this.size.y + border
        this.substrate.position.setTo(this.substrate.position.x - border / 2, this.substrate.position.y - border / 2)


        // Graphics
        this.graphics = this.add.graphics(0, 0)
        this.graphics.alpha = 0

        this.graphics.lineStyle(10, 0xfff000, 1)
        this.grid.addChild( this.graphics )
        

        // Events
        window.addEventListener('resize', () => {
            this.stage.width  = document.body.clientWidth
            this.stage.height = document.body.clientHeight

            this.grid.position.setTo(this.stage.width / 2 - this.size.x / 2, this.stage.height / 2 - this.size.y / 2)
        })
    }

    this._onMouseDown = (target, pointer) => {
        if ( target.children.length || this.finish ) return

        let type = pointer.leftButton.isDown ? 'cross' : 'zero'

        let sprite = this.add.sprite(0, 0, type)
        sprite.alpha = 0
        sprite.position.setTo(target.width / 2 - sprite.width / 2, target.height / 2 - sprite.height / 2)

        target.addChild( sprite )
        target.data.type = type

        this.add.tween( sprite ).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true)

        let index = []

        for (let y = 0; y < this.position.length; y++) {
            let winner = true

            for (let x = 0; x < this.position[y].length; x++) {
                let object = this.tree[this.position[y][x][0] + '' + this.position[y][x][1]]

                if ( object.data.type !== target.data.type ) winner = false
            }

            if ( winner ) {
                this.finish = true
                index = this.position[y]

                break
            }
        }

        if ( !this.finish ) {
            let free = false

            for (const key in this.tree) {
                if ( this.tree[key].data.type === null ) {
                    free = true
                    break
                }
            }

            if ( !free ) this._message('Ничья!', 250)

            return
        }

        let start = index.shift().join( '' )
        let end = index.pop().join( '' )

        let offset = this.size.x / this.count

        start = Object.assign({}, this.tree[start].position)
        end = Object.assign({}, this.tree[end].position)

        start.x += offset / 2
        start.y += offset / 2

        end.x += offset / 2
        end.y += offset / 2

        this.graphics.moveTo(start.x, start.y)
        this.graphics.lineTo(end.x, end.y)
        this.graphics.endFill()

        this.add.tween( this.graphics ).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true)

        this._message('Победа!', 250)
    }

    this._message = (message, time) => {
        setTimeout(() => {
            alert( message )
        }, time )
    }
}