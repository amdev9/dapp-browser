<template>
    <header>
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col navbar-home">
                    <div class="navbar-home-link" @click="tohome">
                        <img src="/images/icons/home.svg" class="svg">
                    </div>
                </div>

                <div class="col navbar-user">
                    <div class="row h-100 align-items-center">
                        <div class="navbar-user-back" v-if="$root.preventView" @click="prevent">
                            <button type="button"><img src="/images/icons/back.svg" class="svg"></button>    
                        </div>

                        <div class="col-auto navbar-user-title" v-if="!search" ref="pagetitle">
                            <span class="apptitle" v-if="$root.apptitle" @click="search = true">arr://{{ $root.apptitle }}</span>
                            <span class="pagetitle">{{ $root.pagetitle }}</span>
                            
                            <div class="share">
                                <svg width="18px" height="21px" viewBox="0 0 18 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g transform="translate(1.000000, 1.000000)" stroke="#B2BCC9" stroke-width="2">
                                            <path d="M0,9.5 L0,17.1 C0,18.149341 0.850658975,19 1.9,19 L13.3,19 C14.349341,19 15.2,18.149341 15.2,17.1 L15.2,9.5"></path>
                                            <polyline points="11.4 3.8 7.6 0 3.8 3.8"></polyline>
                                            <path d="M7.6,0 L7.6,12.35"></path>
                                        </g>
                                    </g>
                                </svg>

                                <div class="dropdown-menu">
                                    <div class="dropdown-item" @click="copy"><span class="share-link" v-lang.share.copy></span></div>
                                    <div class="dropdown-item" @click="qrcode"><span class="share-qr" v-lang.share.qrcode></span></div>
                                    
                                    <div class="dropdown-divider"></div>
                                    
                                    <div class="dropdown-item" @click="telegram"><span class="share-tm" v-lang.share.telegram></span></div>
                                    <div class="dropdown-item" @click="viber"><span class="share-viber" v-lang.share.viber></span></div>
                                    <div class="dropdown-item" @click="email"><span class="share-email" v-lang.share.email></span></div>
                                </div>
                            </div>
                        </div>

                        <div class="navbar-user-uri" v-if="search"><span>uri:</span> </div>

                        <div class="col navbar-user-search">
                            <form @submit.prevent>
                                <div class="input-group">
                                    <input type="text" class="form-control" :class="{'focus': search}" @click="search = true" @keyup="query" ref="query">

                                    <div class="input-group-append">
                                        <button type="button">
                                            <div :class="{'d-none': search}" @click="search = true"><img src="/images/icons/search.svg" class="svg"></div>
                                            <div :class="{'d-none': !search}"><img src="/images/icons/close.svg" class="svg"></div>
                                        </button>
                                    </div>
                                </div>

                                <div class="input-result" v-if="search">
                                    <div v-for="(value, key) in result" :key="key">
                                        <div v-for="item in value" :key="item.key" :data-href="item.url" @mousedown="openapp" class="input-result-item row align-items-center" >
                                            <div class="item-name col-12 col-lg-auto pr-0">
                                                <img :src="item.icon">
                                                <span>{{ item.name }}</span>
                                            </div>
                                            <div class="item-uri col pl-lg-0"><span>- {{ item.url }}</span></div>
                                            <div class="item-type col-3 text-right"><span>mainnet</span></div>
                                        </div>
                                    </div>

                                    <div class="row input-result-item" v-if="!result.dapps.length">
                                        <div class="item-name col-12" v-lang.header.found></div>
                                    </div>

                                    <!-- <div class="input-result-name"><span>Market</span></div>

                                    <div class="input-result-item row align-items-center">
                                        <div class="item-name col-12 col-lg-auto pr-0">
                                            <img src="/images/notify/2.png">
                                            <span>Apple</span>
                                        </div>
                                        <div class="item-uri col pl-lg-0"><span>- anni://wallet/?sendto=address2</span></div>
                                        <div class="item-type col-3 text-right"><span>mainnet</span></div>
                                    </div>

                                    <div class="input-result-item row align-items-center">
                                        <div class="item-name col-12 col-lg-auto pr-0">
                                            <img src="/images/notify/3.png">
                                            <span>Google</span>
                                        </div>
                                        <div class="item-uri col pl-lg-0"><span>- anni://wallet/?sendto=address2</span></div>
                                        <div class="item-type col-3 text-right"><span>mainnet</span></div>
                                    </div> -->
                                </div>
                            </form>
                        </div>

                        <div class="col-auto navbar-user-nav">
                            <div class="dropdown">
                                <button type="button" class="dropdown-target">mainnet</button>
                                        
                                <div class="dropdown-menu">
                                    <div class="dropdown-item"><span>Mainnet</span></div>
                                    <div class="dropdown-item"><span>Mynet</span></div>
                                    <div class="dropdown-item"><span>Testnet</span>

                                        <div class="dropdown-menu">
                                            <div class="dropdown-item"><span>Berlin, Germany</span></div>
                                            <div class="dropdown-item"><span>Dallas, USA</span></div>
                                            <div class="dropdown-item"><span>Nuremberg, Germany</span></div>
                                            <div class="dropdown-item"><span>Munich, Germany</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="button" class="inverse">
                                <img src="/images/icons/key.svg" class="svg">
                                <span>wallet.dat</span>
                            </button>

                            <button type="button" @click="setting">
                                <img src="/images/icons/settings.svg" class="svg">
                            </button>

                            <button type="button" class="notify" @click="notify">
                                <img src="/images/icons/notification.svg" class="svg">
                            </button>

                            <button type="button" class="notify" @click="loader">
                                <img src="/images/icons/cloud.svg" class="svg">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data () {
        return {
            search: false,
            string: String(),
            result: {
                dapps : [],
                market: []
            }
        }
    },
    methods: {
        tohome () { 
            this._reset()
            this.$root.apptitle = null
            this.$root.pagetitle = this.translate( 'header' ).home
            this.$root.currentView = 'view-index'
        },
        prevent () {
            this.$root.currentView = this.$root.preventView
            this.$root.preventView = null
        },
        notify () {
            this.$root.notify = !this.$root.notify
            this.$root.loader = false
        },
        loader () {
            this.$root.loader = !this.$root.loader
            this.$root.notify = false
        },
        setting () {
            this._reset()
            this.$root.pagetitle = this.translate( 'header' ).setting
            this.$root.currentView = 'view-setting'
        },
        query ( value ) {
            this.$http.post('/web', {message_type: 'query', message: this.$refs.query.value}, {
                headers: {'Allow-Origin': this.$root.system.SrcCtrl}
            }).then(response => {
                this.result.dapps = response.body.response
            })
        },
        email () {
            location.href = 'mailto:?subject=' + this.$root.pagetitle
        },
        qrcode ( event ) {
            document.dispatchEvent( new CustomEvent( 'qrcode' ) )
        },
        telegram () {
            window.open( 'https://t.me/share/url?url=array.io/' + this.$root.apptitle + '&text=' + this.$root.pagetitle )
        },
        viber () {
            location.href = 'viber://forward?text=array.io/' + this.$root.apptitle
        },
        openapp ( event ) {
            location.href = event.currentTarget.dataset.href
        },
        copy ( event ) {
            let target = event.currentTarget
            let select = document.createElement( 'textarea' )
            select.value = 'arr://' + this.$root.apptitle

            document.body.appendChild( select )
            select.select()

            document.execCommand( 'Copy' )
            select.parentNode.removeChild( select )

            $.notify.addStyle('copied', {
                html: '<div data-notify-text/>'
            })

            $.notify(this.translate( 'share' ).copytext, {
                position: 'top center',
                style: 'copied',
                className: 'success',
                showAnimation: 'fadeIn',
                hideAnimation: 'fadeOut',
                autoHideDelay: 1000
            })
        },
        _reset () {
            this.$root.viewapp = false
            this.$root.preventView = null
            this.$root.currentFrame = null
        }
    },
    mounted () {
        this.$refs.query.addEventListener('blur', () => this.search = false)
    },
    watch: {
        search ( value ) {
            if ( value ) return this.$refs.query.focus()
            
            this.$refs.query.value = ''
            
            this.result.dapps = []
            this.result.market = []
        }
    }
}
</script>
