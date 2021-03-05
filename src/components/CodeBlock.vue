<template>
  <div class="code-container">
    <span class="code-lang">{{ lang }}</span>
    <pre>
      <code :class="lang"><slot></slot></code>
    </pre>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["lang"]);
</script>

<style scoped lang="scss">
.code-container {
  text-align: left;
  color: lightyellow;
}

.code-lang {
  font-size: 0.9rem;
  margin-left: 0.5rem;
  opacity: 0.7;
}

.reveal pre {
  background-color: #1e1e1e;
  border-radius: 8px;
  margin: 0 auto;

  > code {
    max-height: none;
    margin: 0 5rem;
  }

  &,
  & > code {
    width: fit-content;
  }
}
</style>
