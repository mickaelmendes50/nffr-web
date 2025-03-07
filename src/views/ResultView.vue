<template>
  <FreeGuideTemplate>
    <div v-for="(archetype, index) in archetypes" :key="index" class="archetype-container">
      <div class="archetype-info-container">
        <img alt="logo" :src="`${getImage(archetype, 0)}`" />

        <div class="archetype-info">
          <h1>{{ formData.possibleResults[archetype] }}</h1>
          <p class="archetype-description">{{ formData.descriptions[archetype] }}</p>
        </div>
      </div>

      <div class="separator" />

      <div class="archetype-info-container reverse">
        <img alt="logo" :src="`${getImage(archetype, 1)}`" />

        <div class="archetype-info">
          <p class="archetype-description">{{ formData.keyphrases[archetype] }}</p>
        </div>
      </div>

      <div class="separator" />

      <div class="archetype-keyword-container">
        <div
          v-for="(keyword, index) in formData.keywords[archetype]"
          :key="index"
          class="archetype-keyword"
        >
          <img
            class="archetype-keyword-image"
            alt="logo"
            :src="`${getImage(archetype, index + 2)}`"
          />
          <div class="archetype-keyword-label">{{ keyword }}</div>
        </div>
      </div>

      <div class="separator" />

      <div class="archetype-colors-container">
        <div
          v-for="(color, index) in formData.colors[archetype]"
          :key="index"
          class="archetype-color"
        >
          <div
            class="archetype-color-preview"
            :style="{ 'background-color': colorMap[color as keyof typeof colorMap] }"
          />
          <div class="archetype-color-label">{{ capitalize(color) }}</div>
        </div>
      </div>
    </div>
  </FreeGuideTemplate>
</template>

<script setup lang="ts">
import FreeGuideTemplate from '@/templates/FreeGuideTemplate.vue'
import formData from '@/data/formData.json'
import colorMap from '@/data/colorMap.json'
import { useRoute } from 'vue-router'
import { getImage } from '@/api/image.ts'
import { capitalize } from '../ultils/utils.ts'

const route = useRoute()

const archetypes: number[] = Array.isArray(route.query.archetypes)
  ? route.query.archetypes.map(Number)
  : route.query.archetypes
    ? [Number(route.query.archetypes)]
    : []
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100vw;
}

img {
  border-radius: 20px;
}

.archetype-container {
  font-family: GowunBatang, serif !important;
  letter-spacing: 1.2px;
  width: 80%;
  background-color: var(--surface-container);
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 70px 10px;
  display: flex;
  gap: var(--between-gap);
  flex-direction: column;
  box-shadow: 0 3px 7px var(--shadow);
}

.reverse {
  flex-direction: row-reverse !important;

  .archetype-description {
    flex-grow: unset !important;
  }
}

@media (max-width: 1024px) {
  .archetype-container {
    padding: 70px 30px;
  }

  .archetype-info {
    max-width: 80% !important;
  }
}

.archetype-info-container {
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
  gap: var(--between-gap);
  flex-wrap: wrap;

  img {
    max-width: 200px;
  }

  .archetype-info {
    max-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--between-gap);
    height: 100%;

    .archetype-description {
      flex-grow: 1;
      padding: 1.5rem;
      border: 1px solid var(--on-surface);
    }
  }
}

/* --- */

.archetype-keyword-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--between-gap);
  flex-wrap: wrap;

  .archetype-keyword {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--between-gap);

    .archetype-keyword-label {
      border: 1px solid var(--on-surface);
      padding: 0.5rem 1rem;
    }

    .archetype-keyword-image {
      max-width: 100%;
      max-height: 300px;
      width: auto;
      height: auto;
    }
  }
}

/* --- */

.archetype-colors-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;

  .archetype-color {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--between-gap);

    .archetype-color-preview {
      width: 100px;
      height: 100px;
      background-color: red;
      border-radius: 50%;
      box-shadow: 0 3px 7px var(--shadow);
    }

    .archetype-color-label {
      border: 1px solid var(--on-surface);
      padding: 0.5rem 1rem;
    }
  }
}
</style>
