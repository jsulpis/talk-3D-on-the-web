<template>
  <section>
    <!-- The tabindex allows to focus on the section element. Click anywhere on the page, then press G  -->
    <section tabindex="0" @keyup.g="playVideo()" class="bg-gradient">
      <video id="video-zenikanard" loop>
        <source src="zenikanard-jump.webm" type="video/webm" />
      </video>
    </section>
    <section class="bg-grey">
      <VideoJumpCode />
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import VideoJumpCode from "./VideoJumpCode.vue";

let video: HTMLVideoElement;

onMounted(() => {
  video = document.querySelector("#video-zenikanard");
  // Change the frame because the first one is blurry
  video.currentTime = 0.362735;
});

function playVideo() {
  video.currentTime = 0;
  video.play();
}
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
