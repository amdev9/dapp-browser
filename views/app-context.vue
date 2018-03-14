<template>
    <div class="contextmenu">
        <span @click="change">
            <div v-if="data.type == 'pin'">Unpin</div>
            <div v-else>Pin</div>
        </span>
        <span @click="close">Close app</span>
    </div>
</template>
