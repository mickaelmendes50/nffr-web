<template>
  <div class="container">
    <div class="card">
      <!-- Barra de progresso -->
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- Options -->
      <transition name="fade" class="flex-container">
        <div v-show="showContent">
          <div class="flex-container" v-if="!finished">
            <h2>
              {{
                `${currentStep + 1}/${formData.steps.length}. ${formData.steps[currentStep]?.question ?? ''}`
              }}
            </h2>
            <div class="separator" />
            <div class="form-options">
              <label
                v-for="(alternative, index) in formData.steps[currentStep]?.alternatives"
                :key="index"
                class="form-option"
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
          <div v-else class="flex-container">
            <h1>Finalizou!</h1>
            <p>resultado: {{ formData.possibleResults[getMostFrequentValue(formAnswers)] }}</p>
          </div>
        </div>
      </transition>

      <!-- Botões de Navegação -->
      <div class="navigation">
        <button @click="prevStep" :disabled="currentStep === 0 || !showContent">
          <ArrowLeft /> Voltar
        </button>
        <button
          :disabled="!showContent || !Number.isInteger(formAnswers[currentStep])"
          v-if="currentStep <= formData.steps.length - 1"
          @click="nextStep"
        >
          {{ currentStep !== formData.steps.length - 1 ? 'Próximo' : 'Finalizar' }}
          <ArrowRight />
        </button>
        <button v-else-if="!finished">Finalizar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import formData from '@/data/formData.json'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import ArrowRight from '@/components/icons/ArrowRight.vue'

const currentStep = ref(0)
const formAnswers = ref([])
const finished = ref(false)
const showContent = ref(true)

const nextStep = () => {
  showContent.value = false

  if (currentStep.value < formData.steps.length - 1) {
    setTimeout(() => {
      currentStep.value++
      showContent.value = true
    }, 500)
  } else {
    setTimeout(() => {
      finished.value = true
      currentStep.value++
      showContent.value = true
    }, 500)
  }
}

const prevStep = () => {
  showContent.value = false

  if (currentStep.value > 0) {
    setTimeout(() => {
      currentStep.value--
      finished.value = false
      showContent.value = true
    }, 500)
  }
}

const getMostFrequentValue = (arr: number[]): number => {
  const frequencyMap: Record<number, number> = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return +Object.keys(frequencyMap).reduce((mostFrequent, current) => {
    return frequencyMap[+current] > frequencyMap[+mostFrequent] ? current : mostFrequent;
  });
};


// Calcula a porcentagem da barra de progresso
const progress = computed(() => ((currentStep.value + 1) / formData.steps.length) * 100)
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #7c92a4;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

button:disabled {
  color: rgba(255, 255, 255, 0.3);
  background-color: rgba(124, 146, 164, 0.4);
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
  gap: 12px;
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

.form-options {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 1rem;
}

.form-option {
  text-align: justify;
}

.flex-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
}

.separator {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  height: 1px;
  background-color: rgba(124, 146, 164, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active no Vue 2.1.8+ */ {
  opacity: 0;
}
</style>
