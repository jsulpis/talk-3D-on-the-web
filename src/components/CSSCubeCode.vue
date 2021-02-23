<template>
  <div class="css-cube-code">
    <pre>
      <code class="html">
  <div class="cube">
    <div class="face face-front"></div>
    <div class="face face-back"></div>
    <div class="face face-left"></div>
    <div class="face face-right"></div>
    <div class="face face-top"></div>
    <div class="face face-bottom"></div>
  </div>
      </code>
    </pre>
    <pre> 
      <code class="stylesheet">
  .cube {
    position: relative;
    width: var(--cube-size);
    height: var(--cube-size);
    transform-style: preserve-3d;
    transform: rotateX(70deg) rotateZ(30deg) translateZ(-100px);
  }

  .cube:hover {
    transform: rotateX(70deg) rotateZ(30deg);
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
      </code>
    </pre>
  </div>
</template>

<style lang="scss">
.css-cube-code {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.reveal .css-cube-code > pre {
  background-color: #1e1e1e;
  margin: 2rem;
  border-radius: 8px;

  > code {
    max-height: none;
  }
}
</style>
