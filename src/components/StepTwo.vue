<template>
  <div>
    <h2>Passo 2: Idade</h2>
    <input type="number" placeholder="Idade" v-model="modelValue.idade" />
  </div>
</template>

<script setup lang="ts">
defineProps(['modelValue'])
</script>
