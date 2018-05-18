<template>
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col-8">
                <h3 class="title" v-lang.desktop.apps></h3>
            </div>

            <div class="col-4 text-right">
                <button type="button" class="btn btn-primary btn-rounded" @click="tomarket" v-lang.desktop.market></button>
            </div>
        </div>
    
        <div class="row">
            <app-card v-for="item in userapps" :key="item.hash" :id="item.hash" :src="item.index" :tags="item.tags" :thumb="item.thumb" :icon="item.icon" :name="item.name | capitalize">{{ item.name | capitalize }}</app-card>
        </div>
    </div>
</template>

<script>
import card from './app-card.vue'

export default {
    data () {
        return {
            market: {},
            userapps: []
        }
    },
    components: {
        'app-card': card
    },
    methods: {
        tomarket () {
            this.$root.viewapp = false
            this.$root.currentView = 'view-market'
        }
    },
    mounted () {
        this.$root.loading = true

        this.$http.post('/').then(response => {
            let data = response.body

            this.userapps = data.userapps
            this.$root.system = data.system || {}

            data.setting.forEach(item => this.$root.setting[item.group] = item)

            let pins = {}

            data.pins.forEach(app => {
                pins[app.hash] = {
                    src: app.index,
                    icon: app.icon,
                    name: app.name,
                    active: false
                }
            })

            this.$root.aside.pins = pins

            this.$nextTick(function () {
                this.$root.loading = false
            })
        })
    }
}
</script>