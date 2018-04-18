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

                        <div class="col-auto navbar-user-title" v-if="!search">
                            <span class="apptitle" v-if="$root.apptitle" @click="copy">arr://{{ $root.apptitle }}</span>
                            <span class="pagetitle">{{ $root.pagetitle }}</span>
                            
                            <span class="share">
                                <svg width="18px" height="21px" viewBox="0 0 18 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g transform="translate(1.000000, 1.000000)" stroke="#B2BCC9" stroke-width="2">
                                            <path d="M0,9.5 L0,17.1 C0,18.149341 0.850658975,19 1.9,19 L13.3,19 C14.349341,19 15.2,18.149341 15.2,17.1 L15.2,9.5"></path>
                                            <polyline points="11.4 3.8 7.6 0 3.8 3.8"></polyline>
                                            <path d="M7.6,0 L7.6,12.35"></path>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                        </div>

                        <div class="navbar-user-uri" v-if="search"><span>uri:</span> </div>

                        <div class="col navbar-user-search">
                            <form>
                                <div class="input-group">
                                    <input type="text" class="form-control" :class="{'visible': search}" @keyup="query" ref="query">

                                    <div class="input-group-append">
                                        <button type="button" @click="search = !search">
                                            <div :class="{'d-none': search}"><img src="/images/icons/search.svg" class="svg"></div>
                                            <div :class="{'d-none': !search}"><img src="/images/icons/close.svg" class="svg"></div>
                                        </button>
                                    </div>
                                </div>

                                <div class="input-result" v-if="search">
                                    <div v-for="(value, key) in result" :key="key">
                                        <a v-for="item in value" :key="item.key" :href="item.url" class="input-result-item row align-items-center" >
                                            <div class="item-name col-12 col-lg-auto pr-0">
                                                <img :src="item.icon">
                                                <span>{{ item.name }}</span>
                                            </div>
                                            <div class="item-uri col pl-lg-0"><span>- {{ item.url }}</span></div>
                                            <div class="item-type col-3 text-right"><span>mainnet</span></div>
                                        </a>
                                    </div>

                                    <div class="input-result-name"><span>Market</span></div>

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
                                    </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>