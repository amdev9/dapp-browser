<template>
    <div class="search">
        <div class="input-group">
            <input type="text" class="form-control" @keyup="keyup">

            <div class="input-group-append">
                <div class="input-group-text">
                    <button data-toggle="modal" data-target="#create"><i class="icon icon-create"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>
