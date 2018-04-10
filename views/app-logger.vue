<template>
    <div class="view-code" ref="code">
        <div class="view-code-indicator" @click="showall" :class="{showall: show}">
            <img src="/images/icons/indicator.svg" class="svg status">
            <img src="/images/icons/close.svg" class="svg destroy">
        </div>

        <div class="view-code-panel" @click="toogle" :class="{showall: show}" ref="panel">
            <div class="row">
                <div class="col-auto">
                    <span>Berlin, Germany:</span> <small>connecting</small>
                    <small class="url">arr://chat/@olga</small>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/indicator.svg" class="svg">
                    <span>385</span> <small>/ 54 658</small>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/peers.svg" class="svg">
                    <span>21 peers</span>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/clock.svg" class="svg">
                    <span>25s</span> <small>/ 10 min</small>
                </div>
            </div>

            <div class="row">
                <div class="col-auto">
                    <span>Berlin, Germany:</span> <small>connecting</small>
                    <small class="url">arr://chat/@olga</small>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/indicator.svg" class="svg">
                    <span>385</span> <small>/ 54 658</small>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/peers.svg" class="svg">
                    <span>21 peers</span>
                </div>

                <div class="col-auto">
                    <img src="/images/icons/clock.svg" class="svg">
                    <span>25s</span> <small>/ 10 min</small>
                </div>
            </div>

            <!-- <span v-if="$root.apptitle">array://{{ $root.apptitle }}/?sendto=address2</span> -->
        </div>

        <div class="view-code-console" :class="{'visible': open}" ref="console"></div>
    </div>
</template>
