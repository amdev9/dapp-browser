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
                                <i class="icon-page"></i>
                            </div>
                            
                            <div class="col introtext">
                                <strong>Document.doc</strong>
                                <small>2 mb</small>
                            </div>
                        </li>

                        <li class="row align-items-center complete">
                            <div class="col-auto icon">
                                <i class="icon-folder"></i>
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
                            <i class="icon-top"></i>
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
                                <i class="icon-page"></i>
                            </div>
                            
                            <div class="col introtext">
                                <strong>{{ item.name }}</strong>
                                <small>{{ item.size }}</small>
                            </div>

                            <div class="col-auto action">
                                <div class="dropdown">
                                    <span class="dropdown-target">
                                        <i class="icon-menu"></i>
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