<template>
  <section id="webgl-triangle">
    <section>
      <div class="container triangle-container bg-gradient">
        <h1>WebGL</h1>
        <canvas id="webglTriangle" width="400" height="400"></canvas>
      </div>
    </section>
    <section>
      <WebGLTriangleCode />
    </section>
  </section>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const webglCanvas = document.getElementById("webglTriangle");
  const gl = webglCanvas.getContext("experimental-webgl");

  // Geometry
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, 0, 1]),
    gl.STATIC_DRAW
  );

  vertexBuffer.itemSize = 2;
  vertexBuffer.numItems = 3;

  // Shaders
  const vertexShaderSource =
    "attribute vec2 a_position;" +
    "void main() { gl_Position = vec4 (a_position, 0,1); }";
  const fragmentShaderSource =
    "precision mediump float;" +
    "void main() { gl_FragColor = vec4 (0.9,0,0.1,1); }";

  const buildShader = function (shaderSource, typeOfShader) {
    const shader = gl.createShader(typeOfShader);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    return shader;
  };

  const compiledVertexShader = buildShader(
    vertexShaderSource,
    gl.VERTEX_SHADER
  );
  const compiledFragmentShader = buildShader(
    fragmentShaderSource,
    gl.FRAGMENT_SHADER
  );

  // Setup GLSL program
  const program = gl.createProgram();
  gl.attachShader(program, compiledVertexShader);
  gl.attachShader(program, compiledFragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  // Draw
  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(
    positionLocation,
    vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numItems);
});
</script>

<style lang="scss">
#webgl-triangle {
  .triangle-container {
    flex-direction: column;
  }

  #webglTriangle {
    margin-top: 10rem;
  }

  h1 {
    text-transform: initial;
  }
}
</style>
