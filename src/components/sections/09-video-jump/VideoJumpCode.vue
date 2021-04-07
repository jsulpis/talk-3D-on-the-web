<template>
  <div class="container">
    <!-- prettier-ignore -->
    <CodeBlock lang="html">
      {{ `
<video autoplay loop>
  <source src="zenikanard-jump.webm" type="video/webm" />
</video>
` }}
    </CodeBlock>
  </div>
</template>

<script setup>
import CodeBlock from "../../CodeBlock.vue";
</script>
