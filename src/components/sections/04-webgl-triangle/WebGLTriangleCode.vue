<template>
  <div class="container">
    <CodeBlock lang="javascript">
      {{
        `const webglCanvas = document.getElementById("triangle");
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
gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numItems);`
      }}
    </CodeBlock>
  </div>
</template>

<script setup>
import CodeBlock from "../../CodeBlock.vue";
</script>
