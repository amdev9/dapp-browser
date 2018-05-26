const Frontend = require( './frontend' )
const crypto = require( 'crypto-js' )
const IPFS = require( './ipfs' )
const fs = require( 'fs' )

const FrontEnd = new Frontend()
const ipfs = new IPFS()

class Dropbox {
    constructor () {
        this.url = 'https://ipfs.array.io/ipfs/' // https://ipfs.io/ipfs/
    }

    async transfer ( response ) {
        const self = this

        const message = response.payload.message
        const array = response.payload.response || []
        const keygen = message[array.length]
       
        let bytes = crypto.AES.decrypt(keygen, __uniq)
        let path = bytes.toString( crypto.enc.Utf8 )

        const buffer = fs.readFileSync( path )
        const stream = ipfs.node.files.addReadableStream()

        fs.unlinkSync( path )

        stream.on('data', data => {
            array.push( self.url + data.hash )

            response.payload.response = array

            if ( array.length < message.length ) return this.transfer( response )

            FrontEnd.complete( response.payload )
        })

        stream.write({ content: buffer })
        stream.end()
    }
}

module.exports = Dropbox