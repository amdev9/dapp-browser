<template>
    <div class="container-fluid">
        <div class="navigate">
            <ul class="nav justify-content-center">
                <li class="nav-item"><button type="button" name="general" class="btn btn-link" :class="{'active': view == 'general'}" @click="change">General</button></li>
                <li class="nav-item"><button type="button" name="access" class="btn btn-link"  :class="{'active': view == 'access'}" @click="change">Access</button></li>
                <li class="nav-item"><button type="button" name="network" class="btn btn-link" :class="{'active': view == 'network'}" @click="change">Network</button></li>
                <li class="nav-item"><button type="button" name="devmode" class="btn btn-link" :class="{'active': view == 'devmode'}" @click="change">Dev mode</button></li>
            </ul>
        </div>

        <div class="category">
            <div class="row justify-content-center">
                <div class="col-lg-7">
                    <div class="item active" v-if="view == 'general'">
                        <form class="form-settings">
                            <div class="form-group">
                                <label>Language</label>
                                <select>
                                    <option>English</option>
                                    <option>Russian</option>
                                    <option>German</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Preffered unit of account</label>
                                <select>
                                    <option>BTS</option>
                                    <option>USD</option>
                                    <option>RUB</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Wallet auto-lock time (secound, 0 to disable)</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group text-right">
                                <button type="button" class="btn btn-light btn-lg">Reset settings</button>
                                <button type="button" class="btn btn-primary btn-lg">Save</button>
                            </div>
                        </form>
                    </div>

                    <div class="item" v-if="view == 'access'">
                        <form class="form-settings">
                            <div class="form-group">
                                <label class="form-title">Active node</label>
                                
                                <div class="row">
                                    <div class="col-xl-6 pr-2">
                                        <div class="card">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col">Berlin, Germany</dt>
                                                        <dd class="col-auto">1024ms</dd>
                                                    </dl>
                                                </li>
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col"><small>127.0.0.1:1024</small></dt>
                                                        <dd class="col-auto"><small>mainnet</small></dd>
                                                    </dl>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-title">Available nodes</label>

                                <div class="row">
                                    <div class="col-xl-6 pr-2">
                                        <button type="button" class="btn btn-primary btn-lg btn-block">Choose closest automatically</button>

                                        <div class="card mt-3">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col">Dallas, USA</dt>
                                                        <dd class="col-auto">1024ms</dd>
                                                    </dl>
                                                </li>
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col"><small>127.0.0.1:1024</small></dt>
                                                        <dd class="col-auto"><small>mainnet</small></dd>
                                                    </dl>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="card mt-3 mb-3">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col">Munich, Germany</dt>
                                                        <dd class="col-auto">1024ms</dd>
                                                    </dl>
                                                </li>
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col"><small>127.0.0.1:1024</small></dt>
                                                        <dd class="col-auto"><small>mainnet</small></dd>
                                                    </dl>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="col-xl-6 pl-2">
                                        <button type="button" class="btn btn-light btn-lg btn-block">Add new node</button>

                                        <div class="card mt-3">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col">Nuremberg, Germany</dt>
                                                        <dd class="col-auto">1024ms</dd>
                                                    </dl>
                                                </li>
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col"><small>127.0.0.1:1024</small></dt>
                                                        <dd class="col-auto"><small>mainnet</small></dd>
                                                    </dl>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="card mt-3 mb-3 disabled">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col">Dallas, USA</dt>
                                                        <dd class="col-auto disabled">—</dd>
                                                    </dl>
                                                </li>
                                                <li class="list-group-item">
                                                    <dl class="row align-items-center">
                                                        <dt class="col"><small>127.0.0.1:1024</small></dt>
                                                        <dd class="col-auto"><small>mainnet</small></dd>
                                                    </dl>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="item" v-if="view == 'network'">
                        <form class="form-settings">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="input-proxy" checked>
                                    <label class="custom-control-label" for="input-proxy">Use socks proxy</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Host</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label>Port</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-auto">
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="radio-socks-3" name="socks" class="custom-control-input">
                                            <label class="custom-control-label" for="radio-socks-3">Socks 3</label>
                                        </div>
                                    </div>

                                    <div class="col-auto">
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="radio-socks-4" name="socks" class="custom-control-input" checked>
                                            <label class="custom-control-label" for="radio-socks-4">Socks 4</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group text-right">
                                <button type="button" class="btn btn-light btn-lg">Cancel</button>
                                <button type="button" class="btn btn-primary btn-lg">Save</button>
                            </div>
                        </form>
                    </div>

                    <div class="item" v-if="view == 'devmode'">
                        <form class="form-settings">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="input-proxy-1" checked>
                                    <label class="custom-control-label" for="input-proxy-1">Use socks proxy</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="input-proxy-2" checked>
                                    <label class="custom-control-label" for="input-proxy-2">Use socks proxy</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
