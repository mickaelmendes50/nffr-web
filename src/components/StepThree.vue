<template>
  <div>
    <h2>Passo 3: Criar Senha</h2>
    <input type="password" placeholder="Senha" v-model="modelValue.senha" />
  </div>
</template>

<script setup lang="ts">
defineProps(['modelValue'])
</script>
