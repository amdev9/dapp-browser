<template>
    <div class="modal fade" :class="{'show': visible}">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="close" @click="cancel"><span aria-hidden="true">&times;</span></button>
                </div>

                <div class="modal-body" v-html="content"></div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
                    <button type="button" class="btn btn-secondary hover" @click="accept">Accept</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: null,
            content: null,
            visible: false
        }
    },
    props: ['type'],
    methods: {
        cancel () {
            this.visible = false
        },
        accept () {
            this.visible = false
        }
    },
    mounted () {
        API.Socket.subscribe('access', response => {
            let items = response.rows
            for (let i = 0; i < items.length; i++) items[i] = '<b>' + items[i] +'</b>'

            this.title = 'Access'
            this.content = '<p>' + response.message +'</p>' + items.join( ', ' )
            this.visible = true
        })
    }
}
</script>