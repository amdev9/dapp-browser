<template>
    <div class="container-fluid">
        <div class="preview">
            <figure>
                <img :src="data.preview">
            
                <figcaption>
                    <h3 class="title">{{ data.name }}</h3>

                    <div class="icons">
                        <img src="images/icons/rating.svg" v-for="i in data.rating" :key="i">
                    </div>
                    
                    <div class="tags">
                        <small v-for="name in data.tags" :key="name">{{ name }}</small>
                    </div>

                    <div class="options">
                        <dl class="row">
                            <dt class="col-auto">Updated:</dt>
                            <dd class="col">{{ data.updated }}</dd>
                        </dl>

                        <dl class="row">
                            <dt class="col-auto">Version:</dt>
                            <dd class="col">{{ data.version }}</dd>
                        </dl>

                        <dl class="row">
                            <dt class="col-auto">Size:</dt>
                            <dd class="col">{{ data.size }}</dd>
                        </dl>
                    </div>

                    <div class="action row">
                        <div class="col">
                            <button type="button" class="btn btn-primary btn-rounded">Install</button>
                        </div>

                        <div class="col">
                            <button type="button" class="btn btn-secondary btn-rounded">Donate</button>
                        </div>
                    </div>
                </figcaption>
            </figure>

            <div class="carousel-wrapper">
                <div class="carousel-init owl-carousel">
                    <div v-for="item in data.images" :key="item" class="item"><img :src="item"></div>
                </div>

                <div class="carousel-nav">
                    <button v-on:click="prev">
                        <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-9.000000, -9.000000)">
                                <g transform="translate(25.000000, 25.000000) scale(-1, 1) translate(-25.000000, -25.000000) translate(9.000000, 9.000000)">
                                    <g transform="translate(16.000000, 16.000000) scale(-1, 1) translate(-16.000000, -16.000000) ">
                                        <circle stroke="#FFFFFF" stroke-width="1.5" cx="16" cy="16" r="15.25"></circle>
                                        <polygon fill="#BBD4E6" fill-rule="nonzero" opacity="0" points="9 9 19 9 19 24 9 24"></polygon>
                                        <path d="M6.74948265,12.9163882 L13.5041202,20.4215411 C13.8735792,20.8320511 14.5058691,20.8653295 14.9163791,20.4958705 C14.9424415,20.4724143 14.9672523,20.4476035 14.9907085,20.4215411 L21.7453461,12.9163882 C22.1148051,12.5058782 22.0815267,11.8735883 21.6710167,11.5041293 C21.487392,11.3388671 21.2490937,11.2474235 21.002052,11.2474235 L7.49277679,11.2474235 C6.94049204,11.2474235 6.49277679,11.6951387 6.49277679,12.2474235 C6.49277679,12.4944652 6.58422041,12.7327635 6.74948265,12.9163882 Z" fill="#FFFFFF" fill-rule="nonzero" transform="translate(14.247419, 16.000004) rotate(90.000000) translate(-14.247419, -16.000004) "></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </button>
                    <button v-on:click="next">
                        <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-149.000000, -111.000000)">
                                <g transform="translate(165.000000, 127.000000) scale(-1, 1) translate(-165.000000, -127.000000) translate(149.000000, 111.000000)">
                                    <circle stroke="#FFFFFF" stroke-width="1.5" cx="16" cy="16" r="15.25"></circle>
                                    <polygon fill="#BBD4E6" fill-rule="nonzero" opacity="0" points="9 9 19 9 19 24 9 24"></polygon>
                                    <path d="M6.74948276,12.9163876 L13.5041203,20.4215405 C13.8735793,20.8320505 14.5058692,20.8653289 14.9163792,20.4958699 C14.9424416,20.4724137 14.9672524,20.4476029 14.9907086,20.4215405 L21.7453462,12.9163876 C22.1148052,12.5058776 22.0815268,11.8735877 21.6710168,11.5041287 C21.4873921,11.3388665 21.2490938,11.2474229 21.0020521,11.2474229 L7.4927769,11.2474229 C6.94049215,11.2474229 6.4927769,11.6951381 6.4927769,12.2474229 C6.4927769,12.4944646 6.58422052,12.7327629 6.74948276,12.9163876 Z" fill="#FFFFFF" fill-rule="nonzero" transform="translate(14.247419, 16.000004) rotate(90.000000) translate(-14.247419, -16.000004) "></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="introtext">
                {{ data.introtext }}
            </div>

            <div class="certificate">
                <h4 class="title">Certified by:</h4>

                <div class="images">
                    <img v-for="item in data.certificate" :src="item" :key="item">
                </div>
            </div>

            <div class="description" v-html="data.description"></div>

            <div class="reviews">
                <div class="reviews-head row">
                    <div class="col-auto">
                        <h4 class="title">Reviews</h4>

                        <div class="status">
                            <span class="up">72%</span>
                            <span class="down">28%</span>
                        </div>
                    </div>
                    <div class="col text-right">
                        <button type="button" class="btn btn-outline-light btn-rounded">Write a Review</button>
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
                
                <button type="button" class="btn btn-link show-all">See all comments</button>
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