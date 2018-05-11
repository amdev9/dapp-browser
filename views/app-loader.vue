<template>
    <div class="notifications" :class="{'visible': $root.loader}">
        <div class="notifications-body">
            <ul class="nav nav-tabs nav-justified">
                <li class="nav-item"><a href="#downloads" class="nav-link" data-toggle="tab">Downloads</a></li>
                <li class="nav-item"><a href="#uploads" class="nav-link active" data-toggle="tab">Uploads</a></li>
            </ul>
            
            <div class="tab-content">
                <div class="tab-pane" id="downloads">
                    <ul>
                        <li class="row align-items-center">
                            <div class="col-auto icon">
                                <svg width="17px" height="20px" viewBox="0 0 17 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g transform="translate(-34.000000, -101.000000)" fill="#B2BCC9">
                                            <g transform="translate(0.000000, 86.000000)">
                                                <path d="M43.2500606,21 L38.6353333,21 C38.2082727,21 37.8626061,20.665 37.8626061,20.25 C37.8626061,19.835 38.2082727,19.5 38.6353333,19.5 L43.2500606,19.5 C43.6771212,19.5 44.0227879,19.835 44.0227879,20.25 C44.0227879,20.665 43.6771212,21 43.2500606,21 Z M46.3018182,24.145 L38.6353333,24.145 C38.2082727,24.145 37.8626061,23.805 37.8626061,23.395 C37.8626061,22.98 38.2082727,22.645 38.6353333,22.645 L46.3018182,22.645 C46.7283636,22.645 47.0745455,22.98 47.0745455,23.395 C47.0745455,23.805 46.7283636,24.145 46.3018182,24.145 Z M46.3389091,27.285 L38.6724242,27.285 C38.2458788,27.285 37.899697,26.95 37.899697,26.535 C37.899697,26.12 38.2458788,25.785 38.6724242,25.785 L46.3389091,25.785 C46.7659697,25.785 47.1116364,26.12 47.1116364,26.535 C47.1116364,26.95 46.7659697,27.285 46.3389091,27.285 Z M46.3018182,30.43 L38.6353333,30.43 C38.2082727,30.43 37.8626061,30.09 37.8626061,29.68 C37.8626061,29.265 38.2082727,28.93 38.6353333,28.93 L46.3018182,28.93 C46.7283636,28.93 47.0745455,29.265 47.0745455,29.68 C47.0745455,30.09 46.7283636,30.43 46.3018182,30.43 Z M36.0930606,16.52 C35.9534545,16.52 35.8354848,16.635 35.8354848,16.77 L35.8354848,33.05 C35.8354848,33.185 35.9534545,33.3 36.0930606,33.3 L48.9187879,33.3 C49.0583939,33.3 49.1763636,33.185 49.1763636,33.05 L49.1763636,16.77 C49.1763636,16.635 49.0583939,16.52 48.9187879,16.52 L36.0930606,16.52 Z M48.9187879,34.8 L36.0930606,34.8 C35.0988182,34.8 34.2900303,34.015 34.2900303,33.05 L34.2900303,16.77 C34.2900303,15.805 35.0988182,15.02 36.0930606,15.02 L48.9187879,15.02 C49.9130303,15.02 50.7218182,15.805 50.7218182,16.77 L50.7218182,33.05 C50.7218182,34.015 49.9130303,34.8 48.9187879,34.8 Z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            
                            <div class="col introtext">
                                <strong>Document.doc</strong>
                                <small>2 mb</small>
                            </div>
                        </li>

                        <li class="row align-items-center complete">
                            <div class="col-auto icon">
                                <svg width="17px" height="20px" viewBox="0 0 17 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g transform="translate(-34.000000, -101.000000)" fill="#B2BCC9">
                                            <g transform="translate(0.000000, 86.000000)">
                                                <path d="M43.2500606,21 L38.6353333,21 C38.2082727,21 37.8626061,20.665 37.8626061,20.25 C37.8626061,19.835 38.2082727,19.5 38.6353333,19.5 L43.2500606,19.5 C43.6771212,19.5 44.0227879,19.835 44.0227879,20.25 C44.0227879,20.665 43.6771212,21 43.2500606,21 Z M46.3018182,24.145 L38.6353333,24.145 C38.2082727,24.145 37.8626061,23.805 37.8626061,23.395 C37.8626061,22.98 38.2082727,22.645 38.6353333,22.645 L46.3018182,22.645 C46.7283636,22.645 47.0745455,22.98 47.0745455,23.395 C47.0745455,23.805 46.7283636,24.145 46.3018182,24.145 Z M46.3389091,27.285 L38.6724242,27.285 C38.2458788,27.285 37.899697,26.95 37.899697,26.535 C37.899697,26.12 38.2458788,25.785 38.6724242,25.785 L46.3389091,25.785 C46.7659697,25.785 47.1116364,26.12 47.1116364,26.535 C47.1116364,26.95 46.7659697,27.285 46.3389091,27.285 Z M46.3018182,30.43 L38.6353333,30.43 C38.2082727,30.43 37.8626061,30.09 37.8626061,29.68 C37.8626061,29.265 38.2082727,28.93 38.6353333,28.93 L46.3018182,28.93 C46.7283636,28.93 47.0745455,29.265 47.0745455,29.68 C47.0745455,30.09 46.7283636,30.43 46.3018182,30.43 Z M36.0930606,16.52 C35.9534545,16.52 35.8354848,16.635 35.8354848,16.77 L35.8354848,33.05 C35.8354848,33.185 35.9534545,33.3 36.0930606,33.3 L48.9187879,33.3 C49.0583939,33.3 49.1763636,33.185 49.1763636,33.05 L49.1763636,16.77 C49.1763636,16.635 49.0583939,16.52 48.9187879,16.52 L36.0930606,16.52 Z M48.9187879,34.8 L36.0930606,34.8 C35.0988182,34.8 34.2900303,34.015 34.2900303,33.05 L34.2900303,16.77 C34.2900303,15.805 35.0988182,15.02 36.0930606,15.02 L48.9187879,15.02 C49.9130303,15.02 50.7218182,15.805 50.7218182,16.77 L50.7218182,33.05 C50.7218182,34.015 49.9130303,34.8 48.9187879,34.8 Z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            
                            <div class="col introtext">
                                <strong>Document downloaded.doc</strong>
                                <small>2 mb</small>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="tab-pane show active" id="uploads">
                    <div class="dragzone" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                        <div class="message">
                            <img src="images/icons/top.svg">
                            <strong>Drag & drop</strong>
                            <span>Files Here to Upload</span>
                        </div>
                    </div>

                    <ul>
                        <li v-for="item in uploads" :key="item.key" class="row align-items-center complete no-bg">
                            <div class="col-auto icon">
                                <svg class="out" height="50" width="50">
                                    <circle cx="25" cy="25" r="22" stroke="#F2F3F6" stroke-width="3" fill="none"></circle>
                                </svg>
                                <svg class="over" height="50" width="50">
                                    <circle  cx="25" cy="25" r="22" stroke="#4686FF" stroke-width="3" fill="none" :stroke-dasharray="item.length"></circle>
                                </svg>

                                <small class="total">{{ item.total }}%</small>
                            </div>

                            <div class="col introtext">
                                <strong>{{ item.name }}</strong>
                                <small>{{ item.size }}</small>
                            </div>
                        </li>
                    </ul>

                    <div class="notifications-name">
                        <span>Uploaded files</span>
                    </div>
                    
                    <ul>
                        <li v-for="item in uploaded" :key="item.key" class="row align-items-center complete">
                            <div class="col-auto icon">
                                <svg width="21px" height="17px" viewBox="0 0 21 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g transform="translate(-32.000000, -283.000000)" fill="#B2BCC9">
                                            <g transform="translate(0.000000, 266.000000)">
                                                <path d="M33.7173902,18.775 L33.7173902,31.625 C33.7255854,31.895 33.8495366,32.365 34.5911951,32.385 C36.3536585,32.43 50.5399268,32.405 50.6828293,32.405 C51.091561,32.39 51.3036098,32.12 51.3036098,31.595 L51.3030976,22.295 C51.3036098,22.275 51.3025854,21.995 51.1243415,21.82 C50.9886098,21.69 50.7540244,21.62 50.4282683,21.62 C48.7206098,21.62 41.5683171,21.595 41.5683171,21.595 C41.371122,21.595 41.1816098,21.52 41.0392195,21.385 L38.252878,18.775 L33.7173902,18.775 Z M42.707439,33.915 C39.0841707,33.915 35.4142927,33.905 34.5507317,33.885 C32.8072195,33.84 32.1782439,32.51 32.1808049,31.625 L32.1808049,18.025 C32.1808049,17.615 32.5244878,17.275 32.9490976,17.275 L38.5622439,17.275 C38.7604634,17.275 38.951,17.35 39.0939024,17.485 L41.8812683,20.095 C43.2677805,20.1 48.9336829,20.12 50.4282683,20.12 C51.3835122,20.12 51.9412927,20.485 52.2409268,20.79 C52.8606829,21.425 52.8427561,22.24 52.8391707,22.33 L52.8401951,31.595 C52.8401951,32.48 52.4867805,33.005 52.1907317,33.295 C51.5812195,33.885 50.7903902,33.905 50.6843659,33.905 C50.6828293,33.905 50.6818049,33.905 50.6802683,33.905 C50.3811463,33.905 46.5704146,33.915 42.707439,33.915 Z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            
                            <div class="col introtext">
                                <strong>{{ item.name }}</strong>
                                <small>{{ item.size }}</small>
                            </div>

                            <div class="col-auto action">
                                <div class="dropdown">
                                    <span class="dropdown-target">
                                        <svg width="2px" height="14px" viewBox="0 0 2 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g transform="translate(-308.000000, -704.000000)" fill="#C8CED7">
                                                    <g transform="translate(0.000000, 693.000000)">
                                                        <path d="M309,11 C309.552285,11 310,11.4477153 310,12 C310,12.5522847 309.552285,13 309,13 C308.447715,13 308,12.5522847 308,12 C308,11.4477153 308.447715,11 309,11 Z M309,17 C309.552285,17 310,17.4477153 310,18 C310,18.5522847 309.552285,19 309,19 C308.447715,19 308,18.5522847 308,18 C308,17.4477153 308.447715,17 309,17 Z M309,23 C309.552285,23 310,23.4477153 310,24 C310,24.5522847 309.552285,25 309,25 C308.447715,25 308,24.5522847 308,24 C308,23.4477153 308.447715,23 309,23 Z"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </span>

                                    <div class="dropdown-menu align-right">
                                        <div class="dropdown-point"><span>Open</span></div>
                                        <div class="dropdown-point"><span>Delete</span></div>
                                        <div class="dropdown-point"><span>Show in folder</span></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            uploads: [],
            uploaded: []
        }
    },
    methods: {
        dragover ( event ) {
            event.preventDefault()
            event.currentTarget.classList.add( 'dragover' )
        },
        dragleave ( event ) {
            event.currentTarget.classList.remove( 'dragover' )
        },
        drop ( event ) {
            event.preventDefault()
            event.currentTarget.classList.remove( 'dragover' )

            const files = event.dataTransfer.files

            for (let i = 0; i < files.length; i++) {
                let item = {name: files[i].name, size: this.toSize( files[i].size ), total: 0, length: 0}

                const data = new FormData()
                data.append('choose', files[i])

                this.uploads.push( item )
                this.upload(item, data)
            }
        },
        upload (item, data) {
            const xhr  = new XMLHttpRequest()

            xhr.open('post', '/transfer')

            xhr.upload.addEventListener('progress', function ( event ) {
                let total = parseInt(event.loaded / event.total * 100)

                item.length = total * 138 / 100 + ',' + 138
                item.total = total
            })

            xhr.onreadystatechange = () => {
                if ( xhr.readyState == 4 && xhr.status == 200 ) {
                    let object = JSON.parse( xhr.response )

                    this.$http.post('/web', {message_type: 'transfer', message: object.data}, {
                        headers: {'Allow-Origin': this.$root.system.DropCtrl}
                    }).then(response => {
                        let array = response.body.response
                        item.url = array.shift()

                        if ( this.uploads.includes( item ) ) {
                            let index = this.uploads.indexOf( item )
                            let value = this.uploads.splice(index, 1)
                            
                            this.uploaded.push( value.shift() )
                        }
                    })
                }
            }

            xhr.send( data )
        },
        toSize ( bytes ) {
            const sizes = ['byte', 'kb', 'mb', 'gb', 'tb']

            if ( bytes === 0 ) return 'n/a'

            const value = parseInt( Math.floor( Math.log( bytes ) / Math.log( 1024 ) ), 10 )

            if ( value === 0 ) return `${bytes} ${sizes[value]})`

            return `${(bytes / (1024 ** value)).toFixed( 1 )} ${sizes[value]}`
        }
    }
}
</script>