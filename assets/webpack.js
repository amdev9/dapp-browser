// Modules
import Vue from './js/vue/vue.js'
import SVG from './js/vue/svg.js'
import Resource from './js/vue/res.js'
import MultiLanguage from './js/vue/i18n.js'

// Components
import header  from '../views/app-header.vue'
import aside   from '../views/app-aside.vue'
import modal   from '../views/app-modal.vue'
import loader  from '../views/app-loader.vue'
import notify  from '../views/app-notify.vue'
import logger  from '../views/app-logger.vue'
import qrcode  from '../views/app-qrcode.vue'
import opened  from '../views/app-opened.vue'
import context from '../views/app-context.vue'

import index   from '../views/view-index.vue'
import frame   from '../views/view-frame.vue'
import market  from '../views/view-market.vue'
import setting from '../views/view-setting.vue'
import preview from '../views/view-preview.vue'

import i18n_en from './i18n/en.js'
import i18n_ru from './i18n/ru.js'

'use strict'

const apps = {
    'app-header' : header,
    'app-aside'  : aside,
    'app-modal'  : modal,
    'app-notify' : notify,
    'app-loader' : loader,
    'app-logger' : logger,
    'app-qrcode' : qrcode,
    'app-opened' : opened,
    'app-context': context
}

const views = {
    'view-index'  : index,
    'view-frame'  : frame,
    'view-market' : market,
    'view-setting': setting,
    'view-preview': preview,
}

const options = {
    title: 'Home', aside: {}, system: {},
    frames: {}, remote: {}, offset: 0, notify: false, loader: false,
    context: null, viewapp: false, loading: true, setting: {},
    response: null, apptitle: null, pagetitle: 'Home', preventView: null,
    currentView: 'view-index', currentFrame: null
}

Element.prototype.dropdown = function () {
    let closest = this.closest( '.dropdown' )
    let item = this.closest( '.dropdown-item' )

    document.querySelectorAll( '.dropdown' ).forEach(element => {
        if ( element != closest ) element.classList.remove( 'show' )
    })

    if ( !closest ) return

    let target = closest.querySelector( '.dropdown-target' )

    if ( item ) target.innerText = item.firstChild.innerText
    
    closest.classList[closest.classList.contains( 'show' ) ? 'remove' : 'add']( 'show' )
}

Vue.use(MultiLanguage, {
    default: 'en',
    en: i18n_en,
    ru: i18n_ru
})

Vue.use( Resource )

Vue.filter('capitalize', function (value) {
    if ( !value ) return ''

    value = value.toString()
    return value.charAt( 0 ).toUpperCase() + value.slice( 1 )
})

new Vue({
    el: '#app',
    data: Object.assign({}, options),
    components: Object.assign(apps, views),
    watch: {
        viewapp ( value ) {
            if ( !value ) this.currentFrame = null
        },
        currentFrame ( value ) {
            for (const type in this.aside) {
                for (const key in this.aside[type]) {
                    this.aside[type][key].active = null

                    if ( key == value ) {
                        this.aside[type][key].open = true
                        this.aside[type][key].active = true
                    }
                }
            }
        }
    },
    methods: {
        sidebar ( object ) {
            if ( !object.id ) return
            
            this.viewapp = true
            this.currentFrame = object.id

            let frames = Object.assign({}, this.frames)
            frames[object.id] = {id: object.id, src: object.src}

            this.frames = frames
            this.pagetitle = object.name
            this.apptitle = object.name.replace(' ', '_').toLowerCase()

            if ( !this.aside.pins.hasOwnProperty( object.id ) )
                this.aside.apps[object.id] = {icon: object.icon, src: object.src, name: object.name, open: true, active: true}
        }
    },
    mounted () {
        document.addEventListener('DOMContentLoaded', SVG)
        document.addEventListener('click', event => event.target.dropdown())

        this.aside = {pins: {}, apps: {}}
        this.pagetitle = this.translate( 'header' ).home

        document.addEventListener('click', event => this.context = null)

        window.addEventListener('message',  event => {
            this.remote = event.data

            this.sidebar( this.remote )

            this.$nextTick(function () {
                let content = document.getElementById( this.remote.id )

                if ( !content ) return
                    
                if ( content.loaded )
                    return content.contentWindow.postMessage(this.remote.params, '*')
                
                content.contentWindow.addEventListener('DOMContentLoaded', () => {
                    content.contentWindow.postMessage(this.remote.params, '*')
                })
            })
        })
    }
})