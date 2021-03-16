<template>
  <div class="container">
    <CodeBlock lang="javascript">
      {{
        `gsap.to("#css-wave-animation .cube", {
  duration: 1,
  scaleX: 0.01,
  ease: "sine.inOut",
  stagger: {
    each: 0.15,
    yoyo: true,
    repeat: -1,
    grid: [numRowsCols, numRowsCols],
    from: "start",
  },
});`
      }}
    </CodeBlock>
  </div>
</template>

<script setup>
import CodeBlock from "../../CodeBlock.vue";
</script>
