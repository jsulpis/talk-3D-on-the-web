<template>
  <section>
    <section id="video-zenikanard" class="bg-gradient">
      <video loop>
        <source
          src="/src/assets/videos/zenikanard-jump.webm"
          type="video/webm"
        />
      </video>
      <div class="explainations">
        <p>Press "Enter" to play or pause the animation</p>
      </div>
    </section>
    <section class="bg-grey">
      <VideoJumpCode />
    </section>
  </section>
</template>

<script setup lang="ts">
import useCurrentSlide from "@/composables/useCurrentSlide";
import { onMounted } from "vue";

let video: HTMLVideoElement;

onMounted(() => {
  video = document.querySelector("#video-zenikanard video");
  // Change the frame because the first one is blurry
  video.currentTime = 0.362735;
});

const { onSlideEnter, onSlideLeave } = useCurrentSlide("video-zenikanard");

onSlideEnter(() => document.addEventListener("keypress", toggleVideo));
onSlideLeave(() => document.removeEventListener("keypress", toggleVideo));

function toggleVideo(e: KeyboardEvent) {
  if (e.key === "Enter") {
    if (video.paused) {
      video.currentTime = 0;
      video.play();
    } else {
      video.pause();
    }
  }
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
