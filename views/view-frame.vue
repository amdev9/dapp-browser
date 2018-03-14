<template>
    <iframe :src="src" :id="id" :class="{'d-none': $root.currentFrame != id}"></iframe>
</template>
