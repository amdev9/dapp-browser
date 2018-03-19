<template>
    <div class="view-code">
        <div class="view-code-panel" @click="toogle"><i class="icon icon-console"></i>
            <span v-if="$root.apptitle">array://{{ $root.apptitle }}/?sendto=address2</span>
        </div>
        <div class="view-code-console" :class="{'visible': open}" ref="console"></div>
    </div>
</template>
