<template>
  <div class="main-container">
    <div id="base-container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .main-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    place-items: center;
  }
}

#base-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

@media (min-width: 1024px) {
  #base-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}
</style>
