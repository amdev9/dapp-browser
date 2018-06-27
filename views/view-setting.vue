<template>
    <div class="container-fluid">
        <div class="navigate">
            <ul class="nav justify-content-center">
                <li class="nav-item"><button type="button" name="general" class="btn btn-link" :class="{'active': view == 'general'}" @click="change" v-lang.setting.general></button></li>
                <li class="nav-item"><button type="button" name="access" class="btn btn-link"  :class="{'active': view == 'access'}" @click="change" v-lang.setting.access></button></li>
                <li class="nav-item"><button type="button" name="network" class="btn btn-link" :class="{'active': view == 'network'}" @click="change" v-lang.setting.network></button></li>
                <li class="nav-item"><button type="button" name="devmode" class="btn btn-link" :class="{'active': view == 'devmode'}" @click="change" v-lang.setting.devmode></button></li>
            </ul>
        </div>

        <div class="category">
            <div class="row justify-content-center">
                <div class="col-lg-7">
                    <div class="item" v-show="view == 'general'">
                        <form @submit.prevent="general" class="form-settings">
                            <div class="form-group">
                                <label v-lang.setting.language></label>
                                <select name="language">
                                    <option value="en" :selected="lang == 'en'">English</option>
                                    <option value="ru" :selected="lang == 'ru'">Russian</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label v-lang.setting.units></label>
                                <select name="units">
                                    <option value="bts">BTS</option>
                                    <option value="usd">USD</option>
                                    <option value="rub">RUB</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label v-lang.setting.wallet></label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group text-right">
                                <button type="reset" @click="reset" class="btn btn-light btn-lg" v-lang.setting.reset></button>
                                <button type="submit" class="btn btn-primary btn-lg" v-lang.setting.save></button>
                            </div>
                        </form>
                    </div>

                    <div class="item" v-show="view == 'access'">
                        <form class="form-settings">
                            <div class="form-group">
                                <label class="form-title" v-lang.setting.active></label>

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
                                <label class="form-title" v-lang.setting.available></label>

                                <div class="row">
                                    <div class="col-xl-6 pr-2">
                                        <button type="button" class="btn btn-primary btn-lg btn-block" v-lang.setting.automat></button>

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
                                        <button type="button" class="btn btn-light btn-lg btn-block" v-lang.setting.newnode></button>

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

                    <div class="item" v-show="view == 'network'">
                        <form @submit.prevent="network" class="form-settings">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox">
                                    <input type="hidden" name="proxy" value="false">
                                    <input type="checkbox" name="proxy" value="true" class="custom-control-input" id="input-proxy" :checked="$root.setting.network && $root.setting.network.proxy == 'true'">
                                    <label class="custom-control-label" for="input-proxy" v-lang.setting.proxy></label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label v-lang.setting.host></label>
                                <input type="text" name="host" :value="$root.setting.network && $root.setting.network.host" class="form-control">
                            </div>

                            <div class="form-group">
                                <label v-lang.setting.port></label>
                                <input type="text" name="port" :value="$root.setting.network && $root.setting.network.port" class="form-control">
                            </div>

                            <div class="form-group">
                                <label v-lang.setting.public></label>
                                <input type="text" name="public" :value="$root.setting.network && $root.setting.network.public" class="form-control">
                            </div>

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-auto">
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="radio-socks-3" name="socks" value="3" class="custom-control-input" :checked="$root.setting.network && $root.setting.network.socks == 3 ? true : $root.setting.network && $root.setting.network.socks == 4 ? false : true">
                                            <label class="custom-control-label" for="radio-socks-3">Socks 3</label>
                                        </div>
                                    </div>

                                    <div class="col-auto">
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="radio-socks-4" name="socks" value="4" class="custom-control-input" :checked="$root.setting.network && $root.setting.network.socks == 4">
                                            <label class="custom-control-label" for="radio-socks-4">Socks 4</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group text-right">
                                <button type="button" class="btn btn-light btn-lg" v-lang.setting.cancel></button>
                                <button type="submit" class="btn btn-primary btn-lg" v-lang.setting.save></button>
                            </div>
                        </form>
                    </div>

                    <div class="item" v-show="view == 'devmode'">
                        <form class="form-settings">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="input-proxy-1" checked>
                                    <label class="custom-control-label" for="input-proxy-1">Test 1</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="input-proxy-2" checked>
                                    <label class="custom-control-label" for="input-proxy-2">Test 2</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      view: "general",
      lang: null
    };
  },
  methods: {
    change(event) {
      this.view = event.currentTarget.name;
    },
    network(event) {
      const form = $(event.target)
        .serialize()
        .split("&");
      const data = { _id: "network", type: "setting" };

      for (let i = 0; i < form.length; i++) {
        let value = form[i].split("=");
        data[value.shift()] = value.shift();
      }

      this.$http.post("/setting.setting", { message: data }).then(response => {
        alert("Success !");
      });
    },
    general(event) {
      this.lang = event.target.elements.language.value;
      this.language = this.lang;

      this.$root.pagetitle = this.translate("header").setting;
    },
    reset(event) {
      let parent = event.target.closest("form");
      let units = parent.elements.units.options;
      let language = parent.elements.language.options;

      for (let i = 0; i < language.length; i++) {
        language[i].selected = language[i].defaultSelected;
      }

      for (let i = 0; i < units.length; i++) {
        units[i].selected = units[i].defaultSelected;
      }

      $("select", parent).niceSelect("update");
    }
  },
  mounted() {
    this.$root.loading = true;
    this.$root.apptitle = null;
    this.lang = this.language;

    this.$nextTick(function() {
      $("select").niceSelect();

      this.$root.loading = false;
    });
  },
  updated() {
    $("select").niceSelect();
  }
};
</script>