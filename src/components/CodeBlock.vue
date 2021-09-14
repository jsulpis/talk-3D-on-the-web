<template>
  <div class="code-container">
    <span class="code-lang">{{ lang }}</span>
    <pre>
      <code :class="lang" :data-line-numbers="lines"><slot></slot></code>
    </pre>
  </div>
</template>

<script setup>
defineProps(["lang", "lines"]);
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
  max-height: 80vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }

  > code {
    max-height: none;
    margin: 0 5rem;
  }

  &,
  & > code {
    width: fit-content !important;
  }
}
</style>
