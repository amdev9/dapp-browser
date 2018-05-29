<template>
    <iframe :src="src" :id="id" :class="{'d-none': $root.currentFrame != id}"></iframe>
</template>

<script>
export default {
  props: ["id", "src"],
  mounted() {
    this.$root.loading = true;

    this.$nextTick(function() {
      this.$root.loading = false;
      this.$el.loaded = true;
    });
  }
};
</script>