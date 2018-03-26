<template>
    <div class="media" :class="{'active': $root.target == id}" @click="click">
        <slot></slot>
    </div>
</template>