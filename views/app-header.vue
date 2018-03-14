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

                        <div class="col-auto navbar-user-title" v-if="!search">{{ $root.pagetitle }}</div>

                        <div class="navbar-user-uri" v-if="search"><span>uri:</span> </div>

                        <div class="col navbar-user-search">
                            <form>
                                <div class="input-group">
                                    <input type="text" class="form-control" :class="{'visible': search}">

                                    <div class="input-group-append">
                                        <button type="button" @click="search = !search">
                                            <div :class="{'d-none': search}"><img src="/images/icons/search.svg" class="svg"></div>
                                            <div :class="{'d-none': !search}"><img src="/images/icons/close.svg" class="svg"></div>
                                        </button>
                                    </div>
                                </div>

                                <div class="input-result" v-if="search">
                                    <div class="input-result-item row align-items-center">
                                        <div class="item-name col-12 col-lg-auto pr-0">
                                            <img src="/images/notify/3.png">
                                            <span>Google</span>
                                        </div>
                                        <div class="item-uri col pl-lg-0"><span>- anni://wallet/?sendto=address2</span></div>
                                        <div class="item-type col-3 text-right"><span>mainnet</span></div>
                                    </div>


                                    <div class="input-result-name"><span>Mentioned in</span></div>

                                    <div class="input-result-item row align-items-center">
                                        <div class="item-name col-12 col-lg-auto pr-0">
                                            <img src="/images/notify/1.png">
                                            <span>The Dragon</span>
                                        </div>
                                        <div class="item-uri col pl-lg-0"><span>- anni://wallet/?sendto=address2</span></div>
                                        <div class="item-type col-3 text-right"><span>mainnet</span></div>
                                    </div>

                                    <div class="input-result-item row align-items-center">
                                        <div class="item-name col-12 col-lg-auto pr-0">
                                            <img src="/images/notify/4.png">
                                            <span>Tic Tac Toe</span>
                                        </div>
                                        <div class="item-uri col pl-lg-0"><span>- anni://wallet/?sendto=address2</span></div>
                                        <div class="item-type col-3 text-right"><span>mainnet</span></div>
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