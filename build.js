// nwb nwbuild -v 0.29.3-sdk -p osx64 ./build/ --include ./:./*
const NwBuilder = require( 'nw-builder' )

const include = ['./dapps/**', './*.js', './*.json', './*.html', './*.plist', './bin/**', './assets/**', './components/**', './database/**', './library/**', './logs/**', './routes/**', './views/**', './array', './node_modules/**']
const exclude = ['!./build.js','!./package-lock.json']
const files = include.concat( exclude )

const object = new NwBuilder({
    appName: 'Array.IO',
    files: files,
    platforms: ['osx64'],
    buildDir: './dist',
    flavor: 'normal', // normal
    macPlist: './Info.plist',
    production: true
})

object.build(function ( error ) {
    if ( error ) return console.error( error )
    console.log('Complete !')
});
