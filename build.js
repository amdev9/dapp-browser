const NwBuilder = require( 'nw-builder' )

const include = ['./dapps/**', './*.js', './*.json', './*.html', './*.plist']
const exclude = ['!./build.js', '!./app.js', '!./index.html', '!./package-lock.json', '!./blockchain.json']
const files = include.concat( exclude )

const object = new NwBuilder({
    appName: 'Array.IO',
    files: files,
    platforms: ['osx64'],
    buildDir: './dist',
    flavor: 'sdk', // normal
    macPlist: './Info.plist'
})

object.build(function ( error ) {
    if ( error ) return console.error( error )
    console.log('Complete !')
});
