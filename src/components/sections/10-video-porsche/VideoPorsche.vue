<template>
  <section class="bg-gradient">
    <div class="container">
      <!-- prettier-ignore -->
      <CodeBlock lang="javascript">
      {{
        `const video = document.querySelector("video#video-porsche");

// Click
video.onmousedown = (event) => {
  let previousCursorPosition = event.pageX;

  // Drag
  document.addEventListener("mousemove", onMouseMove);

  function onMouseMove(e) {
    video.currentTime += (e.pageX - previousCursorPosition) / 300;
    previousCursorPosition = e.pageX;
  }

  // Release
  document.onmouseup = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.onmouseup = null;
  };
};`
      }}
    </CodeBlock>
      <video id="video-porsche">
        <source
          src="/src/assets/videos/porsche-turntable.webm"
          type="video/webm"
        />
      </video>

      <div class="explainations">
        <p>Click and drag on the car to rotate it</p>
        <a
          href="https://sketchfab.com/3d-models/free-1975-porsche-911-930-turbo-8568d9d14a994b9cae59499f0dbed21e"
        >
          Model: 1975 Porsche 911 (930) Turbo by Karol Miklas
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const video = document.querySelector<HTMLVideoElement>("video#video-porsche");

  // Click
  video.onmousedown = (event: MouseEvent) => {
    let previousCursorPosition = event.pageX;

    // Drag
    document.addEventListener("mousemove", onMouseMove);

    function onMouseMove(e: MouseEvent) {
      video.currentTime += (e.pageX - previousCursorPosition) / 300;
      previousCursorPosition = e.pageX;
    }

    // Release
    document.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.onmouseup = null;
    };
  };
});
</script>

<style scoped>
section > div {
  display: flex;
  justify-content: flex-end;
}

::v-deep(.code-container > pre) {
  width: 100%;
}

::v-deep(code.javascript) {
  margin: 0 3rem !important;
}

video {
  cursor: ew-resize;
}
</style>
