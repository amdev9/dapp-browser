<template>
    <div class="container-fluid">
        <div class="navigate">
            <ul class="nav justify-content-center">
                <li v-for="(value, key) in data" :key="key" class="nav-item">
                    <button type="button" class="btn btn-link" :class="{'active': value.active}" @click="change(key)">{{ value.name }}</button>
                </li>
            </ul>
        </div>

        <div class="category">
            <div v-for="(value, key) in data" :key="key" v-if="value.active" class="item">
                <div class="row align-items-center">
                    <div class="col-8">
                        <h3 class="title">{{ key | capitalize }} ( {{ value.items.length }} )</h3>
                    </div>

                    <div class="col-4 text-right">
                       <div class="sortby">
                            <span>Sort by:</span>
                            
                            <div class="dropdown">
                                <button type="button">Popularity</button>
                                        
                                <div class="dropdown-menu">
                                    <div class="dropdown-item">Relevance</div>
                                    <div class="dropdown-item">Popularity</div>
                                    <div class="dropdown-item">Name</div>
                                    <div class="dropdown-item">Price</div>
                                    <div class="dropdown-item">Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div v-for="item in value.items" :key="item.key" @click="preview(item)" class="col-md-6 col-lg-4 col-xl-3 apps-item">
                        <div class="apps-item-header" :style="{backgroundImage: 'url(' + item.thumb + ')'}"></div>
                                    
                        <div class="apps-item-body">
                            <h5 class="apps-item-name">{{ item.name | capitalize }}</h5>

                            <div class="apps-item-tags">
                                <small v-for="tag in item.tags" :key="tag">{{ tag }}</small>
                                <small class="custom">Update</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
