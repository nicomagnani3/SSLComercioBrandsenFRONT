<template>
  <div class="Header text-left">
    <div class="Header text-left">
      <img
        v-if="!showPrueba"
        class="logo"
        src="@/assets/MalamboLogo.png"
        alt=""
        height="auto"
      />
      <img v-else class="logo" :src="logoPrueba" alt="" height="auto" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    logoPrueba: {
      type: [String, Blob],
      default: () => "",
    },
    showPrueba: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style >
.logo {
  max-width: 300px;
}
</style>