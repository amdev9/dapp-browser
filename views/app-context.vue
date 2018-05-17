<template>
    <div class="contextmenu">
        <span @click="change">
            <div v-if="data.type == 'pin'">Unpin</div>
            <div v-else>Pin</div>
        </span>
        <span @click="close">Close app</span>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        pin () {
            this.$root.aside.pins[this.data.id] = this.$root.aside.apps[this.data.id]
            delete this.$root.aside.apps[this.data.id]
        },
        app () {
            this.$root.aside.apps[this.data.id] = this.$root.aside.pins[this.data.id]
            delete this.$root.aside.pins[this.data.id]
        },
        change () {
            this.data.type == 'app' ? this.pin() : this.app()

            this.$http.post('/setting.pin', {hash: this.data.id})
        },
        close () {
            delete this.$root.frames[this.data.id]

            circle : for (const type in this.$root.aside) {
                for (const key in this.$root.aside[type]) {
                    if ( this.data.id in this.$root.aside[type] ) {
                        this.$root.aside[type][this.data.id].open = null
                        break circle
                    }
                }
            }

            if ( this.data.id == this.$root.currentFrame ) {
                this.$root.viewapp = false
                this.$root.apptitle = null
                this.$root.pagetitle = this.translate( 'header' ).home
                this.$root.currentView = 'view-index'
            }
                    
            if ( this.data.type == 'app' ) 
                delete this.$root.aside.apps[this.data.id]
        }
    },
    mounted () {
        this.$el.style.top = this.data.screen.y + 'px'
        this.$el.style.left = this.data.screen.x + 'px'
    }
}
</script>