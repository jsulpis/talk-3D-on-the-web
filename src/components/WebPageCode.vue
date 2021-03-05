<template>
  <div class="web-page-code">
    <!-- The code below is a simplified version of the real implementation -->

    <!-- prettier-ignore -->
    <CodeBlock lang="html">
{{`
<main>
  <section>
    <div class="layer layer--deep hero"></div>
    <div class="layer layer--back">
      <h1>3D Website Demo</h1>
    </div>
  </section>

  <section>
    <div class="layer layer--base">
      <div class="page-content">
        ...
      </div>
    </div>
  </section>
</main>
`}}
    </CodeBlock>

    <!-- prettier-ignore -->
    <CodeBlock lang="stylesheet">
  {{`
main {
  perspective: 300px;
}

section {
  position: relative;
  height: 100vh;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.layer--back {
  transform: translateZ(-200px) scale(1.66);
}

.layer--deep {
  transform: translateZ(-300px) scale(2);
}

.layer--base {
  transform: translateZ(0) scale(1);
}
  `}}
    </CodeBlock>
  </div>
</template>

<script setup>
import CodeBlock from "./CodeBlock.vue";
</script>

<style lang="scss">
.web-page-code {
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
