<template>
    <div class="container-fluid">
        <div class="preview">
            <figure>
                <img :src="data.preview">
            
                <figcaption>
                    <h3 class="title">{{ data.name }}</h3>

                    <div class="icons">
                        <i class="icon-star" v-for="i in data.rating" :key="i"></i>
                    </div>
                    
                    <div class="tags">
                        <small v-for="name in data.tags" :key="name">{{ name }}</small>
                    </div>

                    <div class="options">
                        <dl class="row">
                            <dt class="col-auto" v-lang.app.updated></dt>
                            <dd class="col">{{ data.updated }}</dd>
                        </dl>

                        <dl class="row">
                            <dt class="col-auto" v-lang.app.version></dt>
                            <dd class="col">{{ data.version }}</dd>
                        </dl>

                        <dl class="row">
                            <dt class="col-auto" v-lang.app.size></dt>
                            <dd class="col">{{ data.size }}</dd>
                        </dl>
                    </div>

                    <div class="action row">
                        <div class="col">
                            <button type="button" class="btn btn-primary btn-rounded" v-lang.app.install></button>
                        </div>

                        <div class="col">
                            <button type="button" class="btn btn-secondary btn-rounded" v-lang.app.donate></button>
                        </div>
                    </div>
                </figcaption>
            </figure>

            <div class="carousel-wrapper">
                <div class="carousel-init owl-carousel">
                    <div v-for="item in data.images" :key="item" class="item"><img :src="item"></div>
                </div>

                <div class="carousel-nav">
                    <button class="carousel-nav-prev" v-on:click="prev"><i class="icon-arrow-left"></i></button>
                    <button class="carousel-nav-next" v-on:click="next"><i class="icon-arrow-right"></i></button>
                </div>
            </div>

            <div class="introtext">
                {{ data.introtext }}
            </div>

            <div class="certificate">
                <h4 class="title" v-lang.app.certified></h4>

                <div class="images">
                    <img v-for="item in data.certificate" :src="item" :key="item">
                </div>
            </div>

            <div class="description" v-html="data.description"></div>

            <div class="reviews">
                <div class="reviews-head row">
                    <div class="col-auto">
                        <h4 class="title" v-lang.app.comments></h4>

                        <div class="status">
                            <span class="up icon-dir-up">72%</span>
                            <span class="down icon-dir-down">28%</span>
                        </div>
                    </div>
                    <div class="col text-right">
                        <button type="button" class="btn btn-outline-light btn-rounded" v-lang.app.write></button>
                    </div>
                </div>

                <div v-for="item in data.reviews" :key="item.name" class="media">
                    <div class="media-body">
                        <div class="media-head row">
                            <div class="col-auto">
                                <h5 v-bind:class="item.like">{{ item.name }}</h5>
                            </div>
                            <div class="col text-right">
                                <span class="date">{{ item.date }}</span>
                            </div>
                        </div>

                        <p>{{ item.comment }}</p>
                    </div>
                </div>
                
                <button type="button" class="btn btn-link show-all" v-lang.app.showall></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: {},
            slider: null
        }
    },
    methods: {
        next () {
            this.slider.trigger( 'next.owl.carousel' )
        },
        prev () {
            this.slider.trigger( 'prev.owl.carousel' )
        }
    },
    mounted () {
        this.$root.loading = true
        this.$root.apptitle = null

        this.data = this.$root.response
        
        this.$nextTick(function () {
            this.slider = $( '.carousel-init' ).owlCarousel({
                nav : false,
                loop: false,
                dots: false,
                items : 3,
                margin: 15,
            })

            this.$root.pagetitle = this.data.name
            this.$root.preventView = 'view-market'
            this.$root.loading = false
        })
    }
}
</script>