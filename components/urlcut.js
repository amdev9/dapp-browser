module.exports = function ( headers ) {
    if ( headers['allow-origin'] ) return headers['allow-origin']

    const pathname = headers.referer.replace(headers.origin + '/', '')
    return pathname.replace(/(users\/)|(system\/)/gi, '').split( '/' ).shift().trim()
}