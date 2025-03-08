<script setup lang="ts">
import Greeting from '@/components/Greeting.vue'
import MultiStepForm from '@/components/MultiStepForm.vue'
import SimpleGridTemplate from '@/templates/SimpleGridTemplate.vue'
</script>

<template>
  <SimpleGridTemplate>
    <header>
      <img alt="NFFR logo" class="logo" src="../assets/images/nffr-logo.png" />
      <div class="wrapper">
        <Greeting />
      </div>
    </header>

    <main>
      <MultiStepForm />
    </main>
  </SimpleGridTemplate>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin-bottom: 30px;
  padding-right: 0;
}

.logo {
  width: 130px;
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    margin-bottom: 0;
    padding-right: var(--between-gap);
  }

  .logo {
    width: 130px;
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
