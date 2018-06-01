<template>
    <div class="modal fade" :class="{'show': visible}">
        <div class="modal-dialog modal-dialog-centered w-fix">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">QR code</h5>
                    <button type="button" class="close" @click="cancel"><span aria-hidden="true">&times;</span></button>
                </div>

                <div class="modal-body" ref="body"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    cancel() {
      this.visible = false;
      this.$refs.body.innerHTML = "";
    }
  },
  mounted() {
    document.addEventListener("qrcode", () => {
      new QRCode(this.$refs.body, "array.io/" + this.$root.apptitle);
      this.visible = true;
    });
  }
};
</script>