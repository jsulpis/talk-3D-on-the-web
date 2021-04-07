<template>
  <section>
    <section class="bg-gradient">
      <video autoplay data-autoplay loop>
        <source src="zenikanard-jump.webm" type="video/webm" />
      </video>
    </section>
    <section class="bg-grey">
      <VideoJumpCode />
    </section>
  </section>
</template>

<script setup>
import VideoJumpCode from "./VideoJumpCode.vue";
</script>

<style scoped>
video {
  object-fit: cover;
  position: fixed;
  right: 38%;
  height: 100vh;
  max-height: none !important; /* override reveal.js style */
  max-width: none !important;
}
</style>
