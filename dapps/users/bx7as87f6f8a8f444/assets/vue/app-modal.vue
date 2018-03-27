<template>
    <div class="modal fade" :id="id">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                </div>

                <form @submit.prevent="submit">
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Name</label>
                            
                            <div class="input-group">
                                <input type="text" class="form-control" ref="name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Introtext</label>
                            
                            <div class="input-group">
                                <input type="text" class="form-control" ref="introtext">
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Key</label>
                            
                            <div class="input-group">
                                <input type="text" class="form-control" ref="key">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
