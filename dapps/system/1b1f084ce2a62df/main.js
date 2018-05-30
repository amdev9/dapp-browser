// KEYCHAIN WRAPPER

Events.subscribe('sign', function ( response ) {
    Keychain.sign(response)
})