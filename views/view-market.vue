<template>
    <div class="container-fluid">
        <div class="navigate">
            <ul class="nav justify-content-center">
                <li v-for="(value, key) in data" :key="key" class="nav-item">
                    <button type="button" class="btn btn-link" :class="{'active': value.active}" @click="change(key)">{{ value.name }}</button>
                </li>
            </ul>
        </div>

        <div class="category">
            <div v-for="(value, key) in data" :key="key" v-if="value.active" class="item">
                <div class="row align-items-center">
                    <div class="col-8">
                        <h3 class="title">{{ key | capitalize }} ( {{ value.items.length }} )</h3>
                    </div>

                    <div class="col-4 text-right">
                       <div class="sortby">
                            <span v-lang.market.sortby></span>
                            
                            <div class="dropdown">
                                <button type="button" class="dropdown-target" v-lang.sortby.popular></button>
                                        
                                <div class="dropdown-menu align-right">
                                    <div class="dropdown-item"><span v-lang.sortby.relevance></span></div>
                                    <div class="dropdown-item"><span v-lang.sortby.popular></span></div>
                                    <div class="dropdown-item"><span v-lang.sortby.name></span></div>
                                    <div class="dropdown-item"><span v-lang.sortby.price></span></div>
                                    <div class="dropdown-item"><span v-lang.sortby.rating></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div v-for="item in value.items" :key="item.hash" @click="preview(item)" class="col-md-6 col-lg-4 col-xl-3 apps-item">
                        <div class="apps-item-header" :style="{backgroundImage: 'url(' + item.thumb + ')'}"></div>
                                    
                        <div class="apps-item-body">
                            <h5 class="apps-item-name">{{ item.name | capitalize }}</h5>

                            <div class="apps-item-tags">
                                <small v-for="tag in item.tags" :key="tag">{{ tag }}</small>
                                <small class="custom">Update</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: {}
        }
    },
    methods: {
        change ( name ) {
            for (const key in this.data) this.data[key].active = false
            this.data[name].active = true
        },
        preview ( data ) {
            this.$root.response = data
            this.$root.currentView = 'view-preview'
        }
    },
    mounted () {
        this.$root.loading = true
        this.$root.apptitle = null

        this.$http.post('/web', {message_type: 'market'}, {
            headers: {'Allow-Origin': this.$root.system.MrkCtrl}
        }).then(response => {
            let items = response.body.response

            let object = {}

            object['all'] = {name: 'all', active: true, items: []}

            for (let i = 0; i < items.length; i++) {
                for (let t = 0; t < items[i].tags.length; t++) {
                    object[items[i].tags[t]] = {name: items[i].tags[t], active: false}
                }

                object.all.items.push( items[i] )
            }

            for (const key in object) {
                for (let i = 0; i < items.length; i++) {
                    if ( !object[key].hasOwnProperty( 'items' ) ) object[key].items = []
                    
                    for (let t = 0; t < items[i].tags.length; t++) {
                        if ( key == items[i].tags[t] ) {
                            object[key].items.push( items[i] )
                        }
                    }
                }
            }

            this.data = object
            this.$root.pagetitle = 'Market'
            this.$root.preventView = null

            this.$nextTick(function () {
                this.$root.loading = false
            })
        })
    }
}
</script>