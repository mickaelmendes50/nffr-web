<script setup lang="ts">
import Greeting from '@/components/Greeting.vue'
import MultiStepForm from '@/components/MultiStepForm.vue'
</script>

<template>
  <header>
    <img alt="NFFR logo" class="logo" src="./assets/nffr-logo.png" width="130" height="130" />
    <div class="wrapper">
      <Greeting />
    </div>
  </header>

  <main>
    <MultiStepForm />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin-bottom: 30px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    margin-bottom: 0;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
