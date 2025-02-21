<template>
  <div class="form-container">
    <h2>{{ `${step + 1}/${data.length}. ${data[step]?.question ?? ''}` }}</h2>
    <hr />
    <div class="form-options">
      <label v-for="(alternative, index) in data[step]?.alternatives" :key="index">
        <input type="radio" v-model="answers[step]" :id="`${step}${index}`" :value="index" />
        {{ alternative }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'

interface StepForm {
  question: string
  alternatives: string[]
}

const props = defineProps({
  data: {
    type: Array<StepForm>,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
})

onBeforeMount(() => {
  answers.value = new Array(props.data?.length)
})

const answers = defineModel<number[]>({ default: [] });
</script>

<style scoped>
.form-options {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-color: #2c3e50;
}
</style>
