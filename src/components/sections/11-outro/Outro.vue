<template>
  <section id="outro">
    <div class="container bg-gradient">
      <img
        class="q-and-a"
        src="/src/assets/img/QandA.png"
        alt="questions and answers"
      />
      <span class="pseudo">@jsulpis</span>
      <div class="networks">
        <a href="https://twitter.com/jsulpis">
          <IconTwitter />
        </a>
        <a href="https://github.com/jsulpis">
          <IconGithub />
        </a>
        <a href="https://codepen.io/jsulpis">
          <IconCodepen />
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
#outro {
  .container {
    flex-direction: column;
  }

  .q-and-a {
    height: 60%;
    margin: 0;
  }

  .pseudo {
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  .networks svg {
    width: 4rem;
    margin: 1rem 2rem;
    height: 4rem;
    color: #8da7c5;
    transition: color 100ms;

    &:hover {
      color: #eee;
    }
  }
}
</style>
