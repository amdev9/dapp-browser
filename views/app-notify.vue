<template>
    <div class="notifications" :class="{'visible': $root.notify}">
        <div class="notifications-title">
            <strong>Notifications</strong>
            <button type="button"><img src="/images/icons/filter.svg" class="svg"></button>
        </div>

        <div class="notifications-body">
            <div class="notifications-content">
                <div class="notifications-name">
                    <span>today</span>
                    <button type="button" @click="destroy"><img src="/images/icons/close.svg" class="svg"></button>
                </div>
                
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col-auto">
                            <img src="/images/notify/4.png">
                            <span>Tic Tac Toe</span>
                        </div>
                        <div class="item-time col text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
        
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col-auto">
                            <img src="/images/notify/1.png">
                            <span>The Dragon</span>
                        </div>
                        <div class="item-time col text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
        
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col-auto">
                            <img src="/images/notify/3.png">
                            <span>Google</span>
                        </div>
                        <div class="item-time col text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
            </div>

            <div class="notifications-content">
                <div class="notifications-name">
                    <span>yesteday</span>
                    <button type="button" @click="destroy"><img src="/images/icons/close.svg" class="svg"></button>
                </div>
                
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col-auto">
                            <img src="/images/notify/4.png">
                            <span>Tic Tac Toe</span>
                        </div>
                        <div class="item-time col text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>

                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
                
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col-auto">
                            <img src="/images/notify/2.png">
                            <span>Apple</span>
                        </div>
                        <div class="item-time col text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>

                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>

                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col-auto">
                            <img src="/images/notify/3.png">
                            <span>Google</span>
                        </div>
                        <div class="item-time col text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>

                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
            </div>

            <div class="notifications-empty" v-if="empty">
                <span>No notifications</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            empty: false
        }
    },
    methods: {
        destroy ( event ) {
            let children = event.currentTarget.closest( '.notifications-body' ).children
            let content = event.currentTarget.closest( '.notifications-content' )
            content.parentNode.removeChild( content )

            if ( !children.length ) this.empty = true
        }
    }
}
</script>