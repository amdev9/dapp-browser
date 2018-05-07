<template>
    <div class="apps-item" :class="{active: active}" @click="click" @contextmenu.prevent="context">
        <div class="icns">
            <img :src="icon" :icon="image">
        </div>
    </div>
</template>

<script>
export default {
    props: ['id', 'image', 'icon', 'src', 'name', 'active'],
    methods: {
        click () {
            let frames = Object.assign({}, this.$root.frames)
            frames[this.id] = {id: this.id, src: this.src}

            this.$root.viewapp = true
            this.$root.frames = frames
            this.$root.preventView = null
            this.$root.currentFrame = this.id
            this.$root.pagetitle = this.name
            this.$root.apptitle = this.name.replace(RegExp(' ', 'g') , '_').toLowerCase()
        },
        context ( event ) {
            this.$root.context = {
                id: this.id,
                type: this.$root.aside.apps[this.id] ? 'app' : 'pin',
                screen: {x: event.clientX, y: event.clientY}
            }
        },
        _favicon () {
            let image = new Image
            image.src = this.icon

            image.onerror = () => this.icon = this.image
        },
    },
    mounted () {
        this._favicon()
    },
    updated () {
        this._favicon()
    }
}
</script>