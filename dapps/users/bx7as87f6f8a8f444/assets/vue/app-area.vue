<template>
    <div class="area">
        <div class="roomname">
            <span>To:</span> <strong>{{ data.name }}</strong>
        </div>

        <div class="messages">
            <div class="overflow" id="overflow">
                <div class="content">
                    <div class="item" v-for="item in data.messages" :key="item.username" :class="{'from': item.from}">
                        <strong>{{ item.username }}</strong>
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </div>

        <div class="action">
            <form @submit.prevent="submit">
                <div class="input-group">
                    <input type="text" class="form-control" ref="message">

                    <div class="input-group-append">
                        <div class="input-group-text">
                            <button type="submit"><i class="icon icon-send"></i></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
