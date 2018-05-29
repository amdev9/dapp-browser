<template>
    <div class="notifications" :class="{'visible': $root.notify}">
        <div class="notifications-title">
            <strong>Notifications</strong>
            <button type="button"><i class="icon-filter"></i></button>
        </div>

        <div class="notifications-body">
            <div class="notifications-content">
                <div class="notifications-name">
                    <span>today</span>
                    <button type="button" @click="destroy"><i class="icon-close"></i></button>
                </div>
                
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col">
                            <img src="/images/notify/4.svg">
                            <span>Tic Tac Toe</span>
                        </div>
                        <div class="item-time col-auto text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
        
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col">
                            <img src="/images/notify/1.svg">
                            <span>Contact Book</span>
                        </div>
                        <div class="item-time col-auto text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
        
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col">
                            <img src="/images/notify/3.svg">
                            <span>Chat</span>
                        </div>
                        <div class="item-time col-auto text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>

                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col">
                            <img src="/images/notify/2.svg">
                            <span>Drop Files</span>
                        </div>
                        <div class="item-time col-auto text-right">
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
                    <button type="button" @click="destroy"><i class="icon-close"></i></button>
                </div>
                
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col">
                            <img src="/images/notify/4.svg">
                            <span>Tic Tac Toe</span>
                        </div>
                        <div class="item-time col-auto text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
        
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col">
                            <img src="/images/notify/1.svg">
                            <span>Contact Book</span>
                        </div>
                        <div class="item-time col-auto text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>
        
                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col">
                            <img src="/images/notify/3.svg">
                            <span>Chat</span>
                        </div>
                        <div class="item-time col-auto text-right">
                            <small>2 min ago</small>
                        </div>
                    </div>
        
                    <div class="notifications-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
                    </div>
                </div>

                <div class="notifications-item">
                    <div class="notifications-item-title row">
                        <div class="item-name col">
                            <img src="/images/notify/2.svg">
                            <span>Drop Files</span>
                        </div>
                        <div class="item-time col-auto text-right">
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
  data() {
    return {
      empty: false
    };
  },
  methods: {
    destroy(event) {
      let children = event.currentTarget.closest(".notifications-body")
        .children;
      let content = event.currentTarget.closest(".notifications-content");
      content.parentNode.removeChild(content);

      if (!children.length) this.empty = true;
    }
  }
};
</script>