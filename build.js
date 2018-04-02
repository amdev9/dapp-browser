const NwBuilder = require( 'nw-builder' )

const include = ['./**', './*.js', './*.json', './*.html', './*.plist']
const exclude = ['!./build.js','!./package-lock.json', '!./cache/**', '!./dist/**']
const files = include.concat( exclude )

const object = new NwBuilder({
    appName: 'Array.IO',
    files: files,
    platforms: ['osx64'],
    buildDir: './dist',
    flavor: 'sdk', // normal
    macPlist: './Info.plist',
    production: true
})

object.build(function ( error ) {
    if ( error ) return console.error( error )
    console.log('Complete !')
})