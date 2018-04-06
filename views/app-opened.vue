<template>
    <div class="apps-item" :class="{active: active}" @click="click" @contextmenu.prevent="context">
        <div class="icns">
            <img :src="icon" :icon="image">
        </div>
    </div>
</template>
