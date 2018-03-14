<template>
    <div class="view-code">
        <div class="view-code-panel" @click="toogle"><i class="icon icon-console"></i> <span>C:\ > приложение.ex e--uri=anni://wallet/?sendto=address2</span></div>
        <div class="view-code-console" :class="{'visible': open}" ref="console"></div>
    </div>
</template>
