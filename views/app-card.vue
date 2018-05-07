<template>
    <div @click="click" class="col-md-6 col-lg-4 col-xl-3 apps-item">
        <div class="apps-item-header" :style="{backgroundImage: 'url(' + thumb + ')'}"></div>
                    
        <div class="apps-item-body">
            <h5 class="apps-item-name"><slot></slot></h5>

            <div class="apps-item-tags">
                <small v-for="tag in tags" :key="tag">{{ tag }}</small>
                <small class="custom">Update</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id', 'src', 'tags', 'thumb', 'icon', 'name'],
    methods: {
        click () {
            this.$root.viewapp = true
            this.$root.currentFrame = this.id

            let frames = Object.assign({}, this.$root.frames)
            frames[this.id] = {id: this.id, src: this.src}

            this.$root.frames = frames
            this.$root.pagetitle = this.name
            this.$root.apptitle = this.name.replace(RegExp(' ', 'g') , '_').toLowerCase()

            if ( !this.$root.aside.pins.hasOwnProperty( this.id ) )
                this.$root.aside.apps[this.id] = {icon: this.icon, src: this.src, name: this.name, active: true}
        }
    }
}
</script>