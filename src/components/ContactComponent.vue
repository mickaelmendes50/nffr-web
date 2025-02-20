<template>
  <div class="bg-white border border-gray-300 rounded p-4 mt-4 dark:bg-dark-800 dark:border-dark-800">

    <!-- Contact details -->
    <div class="pb-4 flex justify-between">
      <div class="flex items-start mr-6">
        <span class="text-gray-500 w-20 flex-grow-0 flex-shrink-0 dark:text-dark-400">Contact</span>
        <span>{{ contact }}</span>
      </div>
      <div class="text-sm text-primary-500"><a href="" @click.prevent="handleChangeData">Change</a></div>
    </div>

    <!-- Shipping address -->
    <div class="pt-4 border-t border-gray-200 flex justify-between dark:border-dark-600">
      <div class="flex items-start mr-6">
        <span class="text-gray-500 w-20 flex-grow-0 flex-shrink-0 dark:text-dark-400">Ship to</span>
        <span>{{ shipTo }}</span>
      </div>
      <div class="text-sm text-primary-500"><a href="" @click.prevent="handleChangeData">Change</a></div>
    </div>

    <!-- Payment method -->
    <div v-if="isAtLastStep" class="pt-4 mt-4 border-t border-gray-200 flex justify-between dark:border-dark-600">
      <div class="flex items-start mr-6">
        <span class="text-gray-500 w-20 flex-grow-0 flex-shrink-0 dark:text-dark-400">Method</span>
        <span v-html="method"></span>
      </div>
      <div class="text-sm text-primary-500"><a href="" @click.prevent="handleChangeMethod">Change</a></div>
    </div>

  </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  setup(props, context) {
    const form$ = inject('form$')

    // `Contact details` data
    const contact = computed(() => {
      return form$.value.data.email
    })

    // `Shipping address` data
    const shipTo = computed(() => {
      const data = form$.value.data
      const parts = ['address', ',', 'address2', ',', 'city', 'state', 'zip_code', ',', 'country']

      return parts.map((part, i) => {
        if (part === ',') {
          return data[parts[i-1]] ? part : ''
        }

        let value = data[part]

        if (part === 'country') {
          value = form$.value.countries[value]
        }

        return value && i > 0 ? ' ' + value : value
      }).join('')
    })

    // `Payment method` data
    const method = computed(() => {
      const shippingMethod = form$.value.data.shipping_method
      const shippingMethodItems = form$.value.el$('shipping_method')?.resolvedOptions

      return shippingMethod
        ? shippingMethodItems.find(i => i.value === shippingMethod).label
        : undefined
    })

    const isAtLastStep = computed(() => {
      return form$.value.steps$.isAtLastStep
    })

    const handleChangeData = () => {
      form$.value.steps$.goTo('customer_information')
    }

    const handleChangeMethod = () => {
      form$.value.steps$.goTo('shipping_method')
    }

    return {
      contact,
      shipTo,
      method,
      isAtLastStep,
      handleChangeData,
      handleChangeMethod,
    }
  },
}
</script>
