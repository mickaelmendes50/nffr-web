<template>
  <div>
    <h2>Passo X: Escolha uma Opção</h2>
    <div v-for="option in options" :key="option.value" class="radio-option">
      <input
        type="radio"
        :id="option.value"
        :value="option.value"
        v-model="modelValue.selecao"
      />
      <label :for="option.value">{{ option.label }}</label>
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue'])

const options = [
  { value: 'opcao1', label: 'Opção 1' },
  { value: 'opcao2', label: 'Opção 2' },
  { value: 'opcao3', label: 'Opção 3' }
]
</script>

<style scoped>
.radio-option {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

input[type="radio"] {
  margin-right: 8px;
}
</style>
