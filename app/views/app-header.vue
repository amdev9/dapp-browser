<template>
    <header>
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col navbar-home">
                    <div class="navbar-home-link" @click="tohome">
                        <img src="/images/icons/home.svg" class="svg" alt="...">
                    </div>
                </div>

                <div class="col navbar-user">
                    <div class="row h-100 align-items-center">
                        <div class="navbar-user-back">
                            <button type="button">
                                <img src="/images/icons/back.svg" class="svg" alt="...">
                            </button>    
                        </div>

                        <div class="col-auto navbar-user-title" ref="pagetitle">Home</div>

                        <div class="navbar-user-uri"><span>uri:</span> </div>

                        <div class="col navbar-user-search">
                            <form>
                                <div class="input-group">
                                    <input type="text" class="form-control">

                                    <div class="input-group-append">
                                        <button type="button">
                                            <div class="d-none">
                                                <img src="/images/icons/search.svg" class="svg" alt="...">
                                            </div>
                                            
                                            <div class="d-none">
                                                <img src="/images/icons/close.svg" class="svg" alt="...">
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div class="input-result">
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
                                <button type="button">mainnet</button>
                                        
                                <div class="dropdown-menu">
                                    <div class="dropdown-item">Mainnet</div>
                                    <div class="dropdown-item">Mynet</div>
                                    <div class="dropdown-item">Testnet

                                        <div class="dropdown-menu">
                                            <div class="dropdown-item">Berlin, Germany</div>
                                            <div class="dropdown-item">Dallas, USA</div>
                                            <div class="dropdown-item">Nuremberg, Germany</div>
                                            <div class="dropdown-item">Munich, Germany</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="button" class="inverse">
                                <img src="/images/icons/key.svg" class="svg" alt="...">
                                <span>wallet.dat</span>
                            </button>

                            <button type="button">
                                <img src="/images/icons/settings.svg" class="svg" alt="...">
                            </button>

                            <button type="button" class="notify">
                                <img src="/images/icons/notification.svg" class="svg" alt="...">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
