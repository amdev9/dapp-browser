const NwBuilder = require( 'nw-builder' )

const include = ['./**', './*.js', './*.json', './*.html', './*.plist']

const exclude = [
    '!./build.js', '!./build.win.js', '!./array', '!./package-lock.json',
    '!./cache/**', '!./dist/**', '!./views/**', '!./assets/vendors/**',
    '!./assets/js/vue/**', '!./assets/i18n/**', '!./assets/webpack.js', '!./assets/webpack.less',
    '!./test.html', '!./webpack.config.js', '!./setup.win.iss', '!./index.js', '!./gitignore'
]

const files = include.concat( exclude )

const object = new NwBuilder({
    appName: 'Array.IO',
    files: files,
    platforms: ['win64'],
    buildDir: './dist',
    flavor: 'sdk', // normal
    macPlist: './Info.plist'
})

object.build(function ( error ) {
    if ( error ) return console.error( error )
    console.log('Complete !')
})
