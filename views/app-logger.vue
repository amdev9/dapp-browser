<template>
    <div class="view-code" ref="code">
        <div class="view-code-indicator" @click="showall" v-if="Object.keys( $root.status ).length">
            <img src="/images/icons/indicator.svg" class="svg" v-show="!show">
            <img src="/images/icons/close.svg" class="svg" v-show="show">
        </div>

        <div class="view-code-panel" @click="toogle" :class="{showall: show}" ref="panel">       
            <div v-for="(value, key) in $root.status" :key="key" class="row">
                <div class="col-auto">
                    <span>Berlin, Germany:</span> <small>connecting</small>
                    <small class="url">{{ value.target }}</small>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/indicator.svg" class="svg">
                    <span>385</span> <small>/ 54 658</small>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/peers.svg" class="svg">
                    <span>21 peers</span>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/clock.svg" class="svg">
                    <span>{{ value.time }}</span> <small>/ 10 min</small>
                </div>
            </div>

            <div v-if="!Object.keys( $root.status ).length" class="row">
                <div class="col-auto">
                    <small>Console</small>
                </div>
            </div>

            <!-- <span v-if="$root.apptitle">array://{{ $root.apptitle }}/?sendto=address2</span> -->
        </div>

        <div class="view-code-console" :class="{'visible': open}" ref="console"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            open: false,
            show: false,
            content: ''
        }
    },
    methods: {
        showall () {
            this.show = !this.show
            this._offset()
        },
        toogle () {
            this.open = !this.open
            this.$refs.console.scrollTop = this.$refs.console.scrollHeight

            this._offset()  
        },
        _offset () {
            setTimeout(() => {
                let panel = this.$refs.panel.clientHeight - 45
                let size = panel + 250

                this.$root.offset = this.open ? size : panel

                setTimeout(() => {
                    let frame = document.getElementById( this.$root.currentFrame )

                    if ( !frame ) return

                    frame.contentWindow.scrollBy(0, 1000 * 1000)
                })
            })
        }
    },
    mounted () {
        API.Socket.subscribe('console', response => {
            let string = document.createElement( 'p' )
            string.innerHTML = response.time + ' : ' + response.target + ' : <span class="' + response.type.toLowerCase() + '">' + response.type + '</span> : ' + JSON.stringify( response.message )
            
            this.$refs.console.appendChild( string )
            this.$refs.console.scrollTop = this.$refs.console.scrollHeight
        })

        API.Socket.subscribe('status', response => {
            const object = Object.assign({}, this.$root.status)

            object[response.target] = response
            this.$root.status = object
        })
    }
}
</script>