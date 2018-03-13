<template lang="nunjucks">
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col-8">
                <h3 class="title">Your apps</h3>
            </div>

            <div class="col-4 text-right">
                <button type="button" class="btn btn-primary btn-rounded" @click="tomarket">Go to market</button>
            </div>
        </div>
    
        <div class="row">
            <app-card v-for="item in userapps" :key="item.key" :id="item.key" :src="item.index" :tags="item.tags" :thumb="item.thumb">{{ item.name | capitalize }}</app-card>
        </div>
    </div>
</template>
