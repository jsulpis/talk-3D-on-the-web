<template>
  <!-- CodePen for the page : https://codepen.io/jsulpis/pen/eYBrqZO -->
  <!-- Inspired by: https://keithclark.co.uk/articles/pure-css-parallax-websites/ -->
  <section>
    <section id="web-page">
      <div class="debug">
        <label><input type="checkbox" @change="toggleDebug" />Debug</label>
      </div>

      <div class="main" :class="{ perspective, depth }">
        <div class="parallax__group">
          <div class="parallax__layer parallax__layer--deep hero"></div>
          <div class="parallax__layer parallax__layer--back">
            <h3 class="title">My awesome 3D website</h3>
          </div>
          <div class="explainations">
            <p>Scroll down</p>
          </div>
        </div>

        <div class="parallax__group">
          <div class="parallax__layer parallax__layer--base">
            <div class="page-content">
              <label>
                <input type="checkbox" v-model="depth" @change="toggleDepth" />
                <div class="card">
                  <p>Depth</p>
                  <pre>
<code ref="depthCode" class="stylesheet">.card {
  transform: none;
}</code>
                  </pre>
                </div>
              </label>

              <label>
                <input
                  type="checkbox"
                  v-model="perspective"
                  @change="togglePerspective"
                />
                <div class="card">
                  <p>Perspective</p>
                  <pre>
<code ref="perspectiveCode" class="stylesheet">main {
  perspective: none;
}</code>
                  </pre>
                </div>
              </label>
            </div>
            <div class="explainations light">
              <p>
                Check the two boxes to see the effect of the perspective and the
                parallax on the header
              </p>
              <p>Then check the debug option to switch the view</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <WebPageCode />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RevealHighlight from "reveal.js/plugin/highlight/highlight";

const perspective = ref(false);
const depth = ref(false);

const depthCode = ref();
const perspectiveCode = ref();

function toggleDebug() {
  document.body.classList.toggle("debug-on");
}

function toggleDepth(e: Event) {
  const code = `.card:hover {
  transform: ${
    (e.target as HTMLInputElement).checked ? "translateZ(100px)" : "none"
  };
}`;
  depthCode.value.innerHTML = code;
  RevealHighlight().highlightBlock(depthCode.value);
}

function togglePerspective(e: Event) {
  const code = `main {
  perspective: ${(e.target as HTMLInputElement).checked ? "300px" : "none"};
}`;
  perspectiveCode.value.innerHTML = code;
  RevealHighlight().highlightBlock(perspectiveCode.value);
}
</script>

<style lang="scss" scoped>
#web-page {
  margin: 0;
  background-image: radial-gradient(white 30%, #888);
  font-family: sans-serif;
  perspective: none;
}

.main {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

/* Parallax base styles
  --------------------------------------------- */

// Positioning style, always active
.parallax {
  &__group {
    position: relative;
    height: 100vh;

    &,
    * {
      transform-style: preserve-3d;
    }
  }

  &__layer {
    position: absolute;
    transition: transform 300ms;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.perspective {
  perspective: 300px;
}

.depth {
  .parallax__layer {
    &--deep {
      transform: translateZ(-300px);
    }

    &--back {
      transform: translateZ(-200px);
    }
  }

  label:hover {
    transform: translateZ(20px);
    transform-origin: center;
  }
}

.depth.perspective {
  .parallax__layer {
    &--deep {
      transform: translateZ(-300px) scale(2.01);
    }

    &--back {
      transform: translateZ(-200px) scale(1.66);
    }
  }
}

/* Debugger styles - used to show the effect
--------------------------------------------- */

.debug {
  position: fixed;
  top: 0;
  left: 0.5em;
  z-index: 999;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 0.5rem;
  border-radius: 0 0 5px 5px;
  font-size: initial;
}

.debug-on {
  .parallax__group {
    transform: translate3d(700px, 0, -800px) rotateY(30deg);
  }

  .parallax__layer--deep,
  .parallax__layer--base {
    box-shadow: 0 0 50px #888;
  }
}

.parallax__group {
  transition: transform 0.5s ease-in-out;
}

/* HERO
------------------------------------- */

.hero {
  background-image: url("/src/assets/img/pexels-photo-background.jpeg");
  background-size: cover;
  background-position: center;
}

.title {
  text-align: center;
  text-transform: initial;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
}

/* MAIN
------------------------------------- */
.page-content {
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #dbeafe;
  color: #1e293b;

  label {
    transform: translateZ(0.1px); // avoid a glitch in debug mode
    position: relative;
    transition: transform 200ms ease-in-out;

    &:hover .card {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
  }

  input {
    position: absolute;
    z-index: 1;
    top: 24px;
    left: 24px;

    &:checked + .card {
      border: 2px solid #3b82f6;
    }
  }
}

.card {
  box-sizing: border-box;
  border-radius: 8px;
  width: 400px;
  padding: 32px;
  box-shadow: 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  background-color: white;
  transition: background-color 100ms, box-shadow 200ms ease-in-out;
  border: 2px solid transparent;

  &:hover {
    background-color: #f8fafc;
  }

  p {
    margin-bottom: 0;
    font-size: 2rem;
    font-weight: normal;
  }

  pre {
    height: 100px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background: #1e1e1e;
    padding: 12px;
    width: auto;
  }

  code {
    font-size: 1rem;
  }
}
</style>
