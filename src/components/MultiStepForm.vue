<template>
  <div class="card">
    <!-- Barra de progresso -->
    <div class="progress-bar-container">
      <div class="progress" :style="{ width: progress + 1 + '%' }"></div>
    </div>

    <!-- Options -->
    <transition name="fade" class="flex-container">
      <div v-show="showContent">
        <div class="flex-container" v-if="!finished">
          <h2>
            {{
              `${currentStep + 1}/${formData.steps.length} ${formData.steps[currentStep]?.question ?? ''}`
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
        <div v-else class="flex-container result-container">
          <h1>Você Finalizou!</h1>
          <h2>
            Você é:
            {{
              getMostFrequentValues(formAnswers)
                .map((value) => formData.possibleResults[value])
                .join(', ')
            }}
          </h2>
        </div>
      </div>
    </transition>

    <div class="separator" />

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

const getMostFrequentValues = (arr: number[]): number[] => {
  const frequencyMap: Record<number, number> = arr.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  return Object.keys(frequencyMap)
    .sort((a, b) => frequencyMap[+b] - frequencyMap[+a])
    .slice(0, 3)
    .map(Number)
}
// Calcula a porcentagem da barra de progresso
const progress = computed(() => ((currentStep.value + 1) / formData.steps.length) * 100)
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: var(--surface-container-high);
  color: var(--on-surface);
  min-height: 40vh;
  max-height: 80vh;
  overflow: auto;
  padding: 2.5rem 3rem;
  border-radius: 5px;
  box-shadow: 0 3px 7px var(--shadow);
  border: 1px solid var(--surface-container-highest);
  text-align: center;
}

@media (max-width: 1024px) {
  .card {
    min-height: auto;
    max-height: none;
  }
}

.navigation {
  display: flex;
  justify-content: space-between;
}

.progress-bar-container {
  width: 100%;
  border-radius: 5px;
  height: var(--progress-bar-height);
  background-color: var(--background);
  box-shadow: 0 2px 5px var(--shadow-variant);
}

.progress {
  background-color: var(--primary);
  height: var(--progress-bar-height);
  transition: width 0.3s ease-in-out;
  border-radius: 5px;
}

.form-options {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 1rem;
}

.form-option {
  text-align: left;
}

.form-option input {
  margin-right: 5px;
}

.flex-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
}

.result-container {
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active no Vue 2.1.8+ */ {
  opacity: 0;
}
</style>
