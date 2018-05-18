const express = require( 'express' )
const formidable = require( 'formidable' )
const crypto = require( 'crypto-js' )
const uniqid = require( 'uniqid' )
const path = require( 'path' )
const md5 = require( 'md5' )
const fs = require( 'fs' )
const os = require( 'os' )

const UseLib = require( '../components/uselib' )
const EventBus = require( '../components/event' )

const router = express.Router()

const system = new UseLib( 'system.id' )
const mapping = new UseLib( 'system.map' )

const getHeaders = headers => {
	if ( headers['allow-origin'] ) return headers['allow-origin']

    let pathname = headers.referer.replace(headers.origin + '/', '')
    return pathname.replace(/(users\/)|(system\/)/gi, '').split( '/' ).shift().trim()
}

router.post('/web', async function (request, response, next) {
	let target = getHeaders( request.headers )
	const Events = new EventBus()
	
	request.body.target = target
	request.body.unic = uniqid()

	mapping[request.body.unic] = ( body ) => response.send( body )

	Events.publish(target, request.body.message_type, request.body)
})

router.post('/transfer', async function (request, response, next) {
	const target = getHeaders( request.headers )

	const form = new formidable.IncomingForm()
	const array = []

	form.multiples = true
	form.hash = 'sha1'
	form.maxFileSize = 500 * 1024 * 1024 // 500 MB
	form.uploadDir = path.join(os.tmpdir(), target)

	if ( !fs.existsSync( form.uploadDir ) ) fs.mkdirSync( form.uploadDir )

	form.on('file', (field, file) => {
		let uploadPath = path.join(form.uploadDir, file.name)

		fs.renameSync(file.path, uploadPath)

		let secure = crypto.AES.encrypt(uploadPath, __uniq)
		array.push( secure.toString() )
	})

	form.on('error', error => console.log('ERROR: \n' + error))
	form.on('end', () => response.send({ data: array }))

	form.parse( request )
})

module.exports = router