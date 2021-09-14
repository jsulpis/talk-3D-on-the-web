<template>
  <div class="container">
    <!-- prettier-ignore -->
    <CodeBlock lang="html">
{{`
<div class="cube">
  <div class="face face-front"></div>
  <div class="face face-back"></div>
  <div class="face face-left"></div>
  <div class="face face-right"></div>
  <div class="face face-top"></div>
  <div class="face face-bottom"></div>
</div>
`}}
    </CodeBlock>

    <!-- prettier-ignore -->
    <CodeBlock lang="stylesheet">
  {{`
.cube {
  position: relative;
  width: var(--cube-size);
  height: var(--cube-size);
  transform-style: preserve-3d;
  transform: rotateX(70deg) rotateZ(30deg) translateZ(-100px);
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
}

.face-top {
  transform: translateZ(var(--cube-size));
}

.face-front {
  transform: rotateX(-90deg);
  transform-origin: bottom;
}
  `}}
    </CodeBlock>
  </div>
</template>

<style scoped>
.container {
  padding: 3rem;
  justify-content: space-between;
}
</style>
