<template>
  <div class="main-container">
    <slot />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .main-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
