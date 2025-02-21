<template>
  <div class="container">
    <div class="card">
      <!-- Barra de progresso -->
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- Options -->
      <div class="form-container" v-if="!finished">
        <h2>
          {{
            `${currentStep + 1}/${formData.steps.length}. ${formData.steps[currentStep]?.question ?? ''}`
          }}
        </h2>
        <div class="form-options">
          <label
            v-for="(alternative, index) in formData.steps[currentStep]?.alternatives"
            :key="index"
          >
            <input
              type="radio"
              v-model="formAnswers[currentStep]"
              :id="`${currentStep}${index}`"
              :value="index"
            />
            {{ alternative }}
          </label>
        </div>
      </div>

      <!-- Finished Container -->
      <div v-else>
        <h1>Finalizou!</h1>
        <p>resultado: {{ formData.possibleResults[getMostFrequentValue(formAnswers)] }}</p>
      </div>

      <!-- Botões de Navegação -->
      <div class="navigation">
        <button @click="prevStep" :disabled="currentStep === 0">Voltar</button>
        <button v-if="currentStep <= formData.steps.length - 1" @click="nextStep">
          {{ currentStep !== formData.steps.length - 1 ? 'Próximo' : 'Finalizar' }}
        </button>
        <button v-else @click="submitForm">Finalizar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import formData from '@/data/formData.json'

const currentStep = ref(0)
const formAnswers = ref([])
const finished = ref(false)

const nextStep = () => {
  if (currentStep.value < formData.steps.length - 1) {
    currentStep.value++
  } else {
    finished.value = true
    console.log(getMostFrequentValue(formAnswers.value))
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    finished.value = false
  }
}

const getMostFrequentValue = (arr: number[]) => {
  const frequencyMap = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1
    return acc
  }, {})

  return Object.keys(frequencyMap).reduce((mostFrequent, current) => {
    return frequencyMap[current] > frequencyMap[mostFrequent] ? current : mostFrequent
  })
}

// Calcula a porcentagem da barra de progresso
const progress = computed(() => ((currentStep.value + 1) / formData.length) * 100)
</script>

<style scoped>
.container {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #282828;
  min-height: 40vh;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.navigation {
  display: flex;
  justify-content: space-between;
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

.form-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
}

.form-options {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 1rem;
}
</style>
