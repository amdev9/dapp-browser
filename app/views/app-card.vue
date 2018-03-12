<template>
    <div @click="click" class="col-md-6 col-lg-4 col-xl-3 apps-item">
        <div class="apps-item-header" :style="{backgroundImage: 'url(' + thumb + ')'}"></div>
                    
        <div class="apps-item-body">
            <h5 class="apps-item-name"><slot></slot></h5>

            <div class="apps-item-tags">
                <small>{{ type }}</small>
                <small class="custom">Update</small>
            </div>
        </div>
    </div>
</template>
