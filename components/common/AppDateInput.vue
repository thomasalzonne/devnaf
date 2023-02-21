<template>
  <div class="app-date-input">
    <div class="app-date-input__inputs">
      <div class="app-date-input__input-container">
        <AppInput
          v-model="form.day"
          class="app-date-input__input app-date-input__input--day"
          :label="$t('Common.dd')"
          :invalid="v$.day.$dirty && v$.day.$invalid"
          :validation="!!form.day"
          :dirty="v$.day.$dirty"
          type="number"
          name="bday-day"
          @blur="touchField('day')"
        />
      </div>
      <div class="app-date-input__input-container">
        <AppInput
          v-model="form.month"
          class="app-date-input__input app-date-input__input--month"
          :label="$t('Common.mm')"
          :invalid="v$.month.$dirty && v$.month.$invalid"
          :validation="!!form.day && !v$.day.$invalid"
          :dirty="v$.month.$dirty"
          :disabled="isDisabledMonth"
          type="number"
          name="bday-month"
          @blur="touchField('month')"
        />
      </div>
      <div class="app-date-input__input-container">
        <AppInput
          v-model="form.year"
          class="app-date-input__input app-date-input__input--year"
          :label="$t('Common.yyyy')"
          :invalid="v$.year.$dirty && v$.year.$invalid"
          :validation="
            !!form.day && !v$.day.$invalid && !!form.month && !v$.month.$invalid
          "
          :dirty="v$.year.$dirty"
          :disabled="isDisabledYear"
          type="number"
          name="bday-year"
          @blur="touchField('year')"
        />
      </div>
    </div>
    <div class="app-date-input__errors-container">
      <div
        v-if="v$.day.$invalid && v$.day.$errors.length"
        class="app-date-input__errors"
      >
        <p
          v-for="e in v$.day.$errors"
          :key="e.$uid"
          class="app-date-input__error error"
        >
          {{ e.$message }}
        </p>
      </div>
      <div
        v-if="!v$.day.$invalid && v$.month.$invalid && v$.month.$errors.length"
        class="app-date-input__errors"
      >
        <p
          v-for="e in v$.month.$errors"
          :key="e.$uid"
          class="app-date-input__error error"
        >
          {{ e.$message }}
        </p>
      </div>
      <div
        v-if="
          !v$.day.$invalid &&
          !v$.month.$invalid &&
          v$.year.$invalid &&
          v$.year.$errors.length
        "
        class="app-date-input__errors"
      >
        <p
          v-for="e in v$.year.$errors"
          :key="e.$uid"
          class="app-date-input__error error"
        >
          {{ e.$message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import {
  helpers,
  maxValue,
  minValue,
  numeric,
  requiredIf,
} from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import AppInput from '~/components/common/AppInput.vue'

interface IAppDateInputProps {
  modelValue?: any
}

interface IAppDateInputForm {
  day: string
  month: string
  year: string
}

const form: IAppDateInputForm = reactive({
  day: '',
  month: '',
  year: '',
})

const { t } = useI18n()
const { $dayjs } = useNuxtApp()

const currentYear = computed(() => {
  return new Date().getFullYear()
})

const rules = computed(() => {
  const localRules: any = {
    day: {
      numeric: helpers.withMessage(
        t('Validations.day_numeric').toString(),
        numeric
      ),
    },
    month: {
      numeric: helpers.withMessage(
        t('Validations.month_numeric').toString(),
        numeric
      ),
      requiredIf: helpers.withMessage(
        t('Validations.month_required').toString(),
        requiredIf(form.day.toString())
      ),
    },
    year: {
      numeric: helpers.withMessage(
        t('Validations.year_numeric').toString(),
        numeric
      ),
      requiredIf: helpers.withMessage(
        t('Validations.year_required').toString(),
        requiredIf(form.month.toString())
      ),
    },
  }

  if (typeof form.day === 'number') {
    localRules.day = {
      min: helpers.withMessage(
        t('Validations.date_min').toString(),
        minValue(1)
      ),
      max: helpers.withMessage(
        t('Validations.day_max').toString(),
        maxValue(31)
      ),
    }
  }

  if (typeof form.month === 'number') {
    localRules.month = {
      min: helpers.withMessage(
        t('Validations.date_min').toString(),
        minValue(1)
      ),
      max: helpers.withMessage(
        t('Validations.month_max').toString(),
        maxValue(12)
      ),
    }
  }

  if (typeof form.year === 'number') {
    localRules.year = {
      min: helpers.withMessage(
        t('Validations.year_min').toString(),
        minValue(1900)
      ),
      max: helpers.withMessage(
        t('Validations.year_max').toString(),
        maxValue(currentYear.value)
      ),
    }
  }

  return localRules
})

const props = defineProps<IAppDateInputProps>()
const emit = defineEmits(['validation', 'update:modelValue'])
const v$ = useVuelidate(rules, form)
const dateInFormat = ref(props.modelValue)

const isDisabledMonth = computed(() => {
  return v$.value.day.$invalid || !form.day
})

const isDisabledYear = computed(() => {
  return v$.value.month.$invalid || !form.month
})

const touchField = (field: string) => {
  v$.value[field].$touch()

  if (form.day && form.month && form.year) {
    setDate()
  } else {
    dateInFormat.value = null
  }

  if (!form.day) {
    emit('validation', true)
  } else {
    emit('validation', !v$.value.$invalid)
  }
}

const setDate = () => {
  if (form.day && form.month && form.year) {
    const date = $dayjs()
      .set('date', +form.day)
      .set('month', +form.month - 1)
      .set('year', +form.year)
      .format('YYYY-MM-DD')
    dateInFormat.value = date
  } else {
    dateInFormat.value = null
  }
}

watch(
  () => form.day,
  (value) => {
    if (!value) {
      form.month = ''
      form.year = ''
      setDate()
    }
  }
)

watch(
  () => form.month,
  (value) => {
    if (!value) {
      form.year = ''
      setDate()
    }
  }
)

watch(
  () => form.year,
  (value) => {
    if (!value) {
      setDate()
    }
  }
)

watch(dateInFormat, (value: string | null) => {
  if (value) {
    emit('update:modelValue', value)
  } else {
    emit('update:modelValue', null)
  }
})

watch(
  () => props.modelValue,
  (value: string, oldValue: string) => {
    if (!oldValue && value) {
      const initialDate = props.modelValue

      form.day = $dayjs(initialDate, 'YYYY-MM-DD').get('date')
      form.month = $dayjs(initialDate, 'YYYY-MM-DD').get('month') + 1
      form.year = $dayjs(initialDate, 'YYYY-MM-DD').get('year')
    }
  }
)
</script>

<style lang="scss" scoped>
.app-date-input {
  &__inputs {
    display: flex;
    gap: 10px;
  }

  &__errors-container {
    margin-left: 20px;
    margin-top: 10px;
  }

  &__error {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>
