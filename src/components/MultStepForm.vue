<template>
  <div class="bg-white rounded-lg p-10 max-w-xl shadow-box-circle  dark:bg-dark-1000">
    <form @submit="handleSubmit">

      <!-- Defining Form Steps -->
      <FormSteps>

        <!-- 1st step - 'Customer information' -->
        <FormStep
          name="customer_information"
          label="Customer information"
          :elements="['contact_information', 'shipping_address']"
          :labels="{
            next: 'Continue to shipping method',
          }"
        />

        <!-- 2nd step - 'Shipping method' -->
        <FormStep
          name="shipping_method"
          label="Shipping method"
          :elements="['summary', 'shipping_method']"
          :labels="{
            next: 'Continue to payment',
            previous: 'Back'
          }"
        />

        <!-- 3rd step - 'Payment method' -->
        <FormStep
          name="payment_method"
          label="Payment method"
          :elements="['summary', 'email', 'payment_method', 'billing_address', 'remember_me', 'terms']"
          :labels="{
            finish: 'Complete order',
            previous: 'Back'
          }"
        />
      </FormSteps>

      <!-- Defining form elements -->
      <FormElements>

        <!-- 'Contact information' (email) -->
        <GroupElement name="contact_information">
          <template #label>
            <div class="text-lg leading-tight mb-4 mt-4">Contact information</div>
          </template>

          <TextElement
            name="email"
            default="john@doe.com"
            placeholder="Email"
            rules="required|email:debounce=300"
          />
          <ToggleElement name="updates">
            Keep me up to date on news and exclusive offers
          </ToggleElement>
        </GroupElement>

        <!-- 'Shipping address' (name, company, address fields, phone) -->
        <GroupElement name="shipping_address">
          <template #label>
            <div class="text-lg leading-tight mb-4 mt-4">Shipping address</div>
          </template>

          <TextElement
            name="firstname"
            default="John"
            placeholder="First name (optional)"
            :columns="6"
          />
          <TextElement
            name="lastname"
            default="Doe"
            placeholder="Last name"
            rules="required"
            :columns="6"
          />
          <TextElement
            name="company"
            default="Google Inc."
            placeholder="Company (optional)"
          />
          <TextElement
            name="address"
            default="Amphitheatre Parkway 1600"
            placeholder="Address"
            rules="required"
          />
          <TextElement
            name="address2"
            placeholder="Apartment, suite, etc. (optional)"
          />
          <TextElement
            name="city"
            default="Mountain View"
            placeholder="City"
            rules="required"
          />
          <SelectElement
            name="country"
            default="US"
            placeholder="Country"
            autocomplete="new-country"
            input-type="search"
            rules="required"
            :items="countries"
            :search="true"
            :can-clear="false"
            :columns="countryColumn"
          />
          <SelectElement
            name="state"
            default="CA"
            placeholder="State"
            autocomplete="new-state"
            input-type="search"
            rules="required"
            :items="states"
            :search="true"
            :resolve-on-load="true"
            :can-clear="false"
            :columns="4"
            :conditions="[
              ['shipping_address.country', 'US']
            ]"
          />
          <TextElement
            name="zip_code"
            default="94043"
            placeholder="ZIP code"
            rules="required"
            :columns="4"
          />
          <TextElement
            name="phone"
            default="(516)-793-8668"
            placeholder="Phone"
            rules="required"
          />
        </GroupElement>

        <!-- Shipping summary block with custom ContactComponent -->
        <StaticElement name="summary">
          <ContactComponent />
        </StaticElement>

        <!-- 'Shipping method' - using custom template for checkboxes -->
        <RadiogroupElement
          name="shipping_method"
          rules="required"
          :items="[
            { value: 'usps', label: '<b>$66.46</b> - USPS Priority Mail Express', description: '1 business days' },
            { value: 'fedex', label: '<b>$66.98</b> - FedEx Home Delivery', description: '1 to 5 business days' },
            { value: 'ups', label: '<b>$120.82</b> - UPS Second Day Air', description: '2 business days' },
          ]"
          view="blocks"
        >
          <template #label>
            <div class="text-lg leading-tight mt-2">Shipping method</div>
          </template>
          <template #before>
            <div class="text-gray-700 mb-4 dark:text-dark-300">
              Please Note - Orders will be ship the next business day. Please add one shipping day to all estimates.
            </div>
          </template>
        </RadiogroupElement>

        <!-- 'Payment method' block -->
        <GroupElement name="payment_method">
          <template #label>
            <div class="text-lg leading-tight mt-2">Payment method</div>
          </template>
          <template #before>
            <div class="text-gray-700 mb-4 dark:text-dark-300">
              All transactions are secure and encrypted.
            </div>
          </template>

          <!-- 'Credit card' option -->
          <RadioElement
            name="credit_card"
            radio-name="payment_method"
            :add-class="{ wrapper: 'rounded-t' }"
          >
            <div class="flex justify-between items-center ml-0.5">
              <div>Credit card</div>
              <div class="flex items-center">
<!--                <img src="/images/card-logos.png" class="h-6" />-->
              </div>
            </div>
          </RadioElement>

          <!-- Credit card details (if selected) -->
          <GroupElement
            name="card_details"
            add-class="bg-gray-100 p-6 -mt-4 border-l border-r border-gray-300 dark:bg-dark-900 dark:border-dark-700"
            :conditions="[
              ['payment_method.credit_card', 1]
            ]"
          >
            <TextElement
              name="card_number"
              placeholder="Card number (do not enter actual card number)"
            />
            <TextElement
              name="card_name"
              placeholder="Cardholder name"
              :columns="6"
            />
            <TextElement
              name="card_date"
              placeholder="MM / YY"
              :columns="3"
            />
            <TextElement
              name="card_cvv"
              placeholder="CVV"
              :columns="3"
            />
          </GroupElement>

          <!-- 'Paypal' option -->
          <RadioElement
            name="paypal"
            radio-name="payment_method"
            :add-class="{
              container: '-mt-4 relative -top-px',
              wrapper: data.paypal ? '' : 'rounded-b',
            }"
            :rules="[{
              required: ['credit_card', null]
            }]"
            :messages="{
              required: 'Please choose a payment method.'
            }"
          >
            <div class="flex justify-between items-center ml-0.5">
<!--              <img src="/images/paypal.png" class="h-6" />-->
              <div class="flex items-center">
<!--                <img src="/images/card-logos.png" class="object-cover object-left w-30 h-6" />-->
              </div>
            </div>
          </RadioElement>

          <!-- Paypal info window (if selected) -->
          <StaticElement
            name="paypal_info"
            :conditions="[
              ['payment_method.paypal', 1]
            ]"
          >
            <div class="bg-gray-100 py-6 border border-gray-300 rounded-b -mt-4 relative -top-0.5 dark:bg-dark-900 dark:border-dark-700">
              <div class="w-72 mx-auto text-md text-center">
<!--                <img src="/images/paypal-redirect.svg" class="mx-auto mb-4" />-->
                After clicking "Complete order", you will be redirected to PayPal to complete your purchase securely.
              </div>
            </div>
          </StaticElement>
        </GroupElement>

        <!-- 'Billing address' block -->
        <ObjectElement name="billing_address">
          <template #label>
            <div class="text-lg leading-tight mt-2 mb-2">Billing address</div>
          </template>

          <!-- 'Same' button -->
          <RadioElement
            name="same"
            radio-name="billing"
            :add-class="{ wrapper: 'rounded-t' }"
          >
            <div class="ml-0.5">
              Same as billing address
            </div>
          </RadioElement>

          <!-- 'Different' button -->
          <RadioElement
            name="different"
            radio-name="billing"
            :add-class="{
              container: '-mt-4 relative -top-px',
              wrapper: data.billing_address && data.billing_address.different ? '' : 'rounded-b',
            }"
            :rules="[{
              required: ['billing_address.same', null]
            }]"
            :messages="{
              required: 'A billing address option must be selected.'
            }"
          >
            <div class="ml-0.5">
              Use a different billing address
            </div>
          </RadioElement>

          <!-- Billing info block (if 'use different is selected') -->
          <GroupElement
            name="billing_info"
            add-class="bg-gray-100 p-6 -mt-4 border border-gray-300 rounded-b relative -top-0.5 dark:bg-dark-900 dark:border-dark-700"
            :conditions="[
              ['billing_address.different', 1]
            ]"
          >
            <TextElement
              name="firstname"
              default="John"
              placeholder="First name (optional)"
              :columns="6"
            />
            <TextElement
              name="lastname"
              default="Doe"
              placeholder="Last name"
              rules="required"
              :columns="6"
            />
            <TextElement
              name="company"
              default="Google Inc."
              placeholder="Company (optional)"
            />
            <TextElement
              name="address"
              default="Amphitheatre Parkway 1600"
              placeholder="Address"
              rules="required"
            />
            <TextElement
              name="address2"
              placeholder="Apartment, suite, etc. (optional)"
            />
            <TextElement
              name="city"
              default="Mountain View"
              placeholder="City"
              rules="required"
            />
            <SelectElement
              name="country"
              default="US"
              placeholder="Country"
              autocomplete="new-country"
              input-type="search"
              rules="required"
              :items="countries"
              :search="true"
              :can-clear="false"
              :columns="countryColumn"
            />
            <SelectElement
              name="state"
              default="CA"
              placeholder="State"
              autocomplete="new-state"
              input-type="search"
              rules="required"
              :items="states"
              :search="true"
              :resolve-on-load="true"
              :can-clear="false"
              :columns="4"
              :conditions="[
                ['shipping_address.country', 'US']
              ]"
            />
            <TextElement
              name="zip_code"
              default="94043"
              placeholder="ZIP code"
              rules="required"
              :columns="4"
            />
          </GroupElement>
        </ObjectElement>

        <!-- 'Remember me' block -->
        <GroupElement name="remember_me">
          <template #label>
            <div class="text-lg leading-tight mt-2 mb-2">Remember me</div>
          </template>

          <!-- 'Remember me' checkbox -->
          <CheckboxElement
            name="remember"
            :add-class="{
              wrapper: `rounded-t ${data.remember ? '' : 'rounded-b'}`,
            }"
          >
            Save my information for faster checkout
          </CheckboxElement>

          <!-- 'Mobile phone number' input (if 'Remember me' is checked) -->
          <TextElement
            name="mobile_number"
            placeholder="Mobile phone number"
            rules="required"
            add-class="bg-gray-100 p-6 -mt-4 border border-gray-300 rounded-b relative -top-px dark:bg-dark-900 dark:border-dark-700"
            :conditions="[
              ['remember_me.remember', 1]
            ]"
          >
            <template #addon-before>
              <fa :icon="['fas', 'mobile-alt']"></fa>
            </template>
            <template #after>
              <div class="mt-2">
                Next time you check out here or other stores powered by Shop, Shop will send you an authorization code by SMS to securely purchase with Shop Pay.
              </div>
            </template>
          </TextElement>
        </GroupElement>

        <StaticElement name="terms" add-class="text-sm text-gray-500 dark:text-dark-300">
          By continuing, you agree to Shop Pay’s <a href="" class="underline">Privacy Policy</a> and <a href="" class="underline">Terms of Service</a>.
        </StaticElement>

      </FormElements>

      <FormStepsControls />
    </form>
  </div>
</template>

<script>
import { Vueform, useVueform } from '@vueform/vueform'
import ContactComponent from "./ContactComponent.vue";

export default {
  mixins: [ Vueform ],
  setup: useVueform,
  components: {
    ContactComponent,
  },
  data: () => ({
    vueform: {
      size: 'lg',
      validateOn: 'change|step',
      overrideClasses: {
        RadioElement: {
          wrapper: 'flex border border-gray-300 py-4 px-4 items-center cursor-pointer dark:border-dark-700',
          text: 'w-full items-center',
        },
        CheckboxElement: {
          wrapper: 'flex border border-gray-300 py-4 px-4 items-center cursor-pointer dark:border-dark-700',
          text: 'w-full items-center',
        },
      },
      addClasses: {
        RadioElement: {
          input: 'mb-1',
        },
        CheckboxElement: {
          input: 'mb-1',
        },
      }
    },
    countries: {},
    states: {},
  }),
  computed: {
    // Dynamically calculating column size for country
    // (narrower when states are also visible)
    countryColumn() {
      return this.data.country === 'US' ? 4 : 8
    },
  },
  mounted() {
    // Setting `countries` and `states`
    ['countries', 'states'].map((param) => {
      fetch(`/json/${param}.json`)
        .then(response => response.json())
        .then(data => this[param] = data)
    })
  }
}
</script>

<style>
.w-30 {
  width: 7.5rem;
}
</style>
