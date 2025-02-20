<template>
  <div class="container">
    <div class="card">
      <component :is="steps[currentStep]" v-model="formData" />

      <div class="navigation">
        <button @click="prevStep" :disabled="currentStep === 0">Voltar</button>
        <button v-if="currentStep < steps.length - 1" @click="nextStep">Próximo</button>
        <button v-else @click="submitForm">Finalizar</button>
      </div>

      <!-- Barra de progresso -->
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue'
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
import StepThree from './StepThree.vue'

const steps = shallowRef([StepOne, StepTwo, StepThree])
const currentStep = ref(0)

const formData = ref({
  nome: '',
  email: '',
  idade: '',
  senha: '',
  opcao: ''
})

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitForm = () => {
  console.log('Dados do formulário:', formData.value)
  alert('Formulário enviado!')
}

// Calcula a porcentagem da barra de progresso
const progress = computed(() => ((currentStep.value + 1) / steps.value.length) * 100)
</script>

<style scoped>
.container {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
}

.card {
  background: #282828;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #7c92a4;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

button:disabled {
  color: #282828;
  background-color: #282828;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

/* Barra de Progresso */
.progress-bar {
  width: 100%;
  height: 5px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
}

.progress {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease-in-out;
}
</style>
