<template>
  <div class="map-stores__list-item">
    <div class="map-stores__flex">
      <p class="map-stores__store-title">{{ store.name }}</p>
      <p v-if="store.distance" class="map-stores__distance">
        <SvgIcon class="map-stores__pin" name="pin" />
        {{ store.distance }} Km
      </p>
      <div>
        <div v-if="isStoreOpen" class="map-stores__status">
          <div class="map-stores__status-icon"></div>
          <span class="map-stores__status-text--green">{{
            $t('Date.open')
          }}</span>
        </div>
        <div v-else class="map-stores__status">
          <div class="map-stores__status-icon--red"></div>
          <span class="map-stores__status-text--red">{{
            $t('Date.close')
          }}</span>
        </div>
      </div>
    </div>
    <div class="map-stores__store-info">
      <div class="map-stores__store-hours">
        <span v-if="isStoreOpen"> {{ returnOpenString(store) }}</span>
        <span v-else>{{ returnNextOpen }}</span>
      </div>
      <p class="map-stores__info-text">
        {{ store.address }}, {{ store.zipcode }} {{ store.city }} <br />
        <span v-if="store.phone">Tél: {{ store.phone }}</span>
      </p>
      <div v-if="isShowHours" class="map-stores__hours">
        <ul>
          <li>
            <span class="map-stores__hours-day">{{ $t('Date.monday') }}</span
            >:
            {{ returnInterval(store.opening.monday) }}
          </li>
          <li>
            <span class="map-stores__hours-day">{{ $t('Date.tuesday') }}</span
            >:
            {{ returnInterval(store.opening.tuesday) }}
          </li>
          <li>
            <span class="map-stores__hours-day">{{ $t('Date.wednesday') }}</span
            >:
            {{ returnInterval(store.opening.wednesday) }}
          </li>
          <li>
            <span class="map-stores__hours-day">{{ $t('Date.thursday') }}</span
            >:
            {{ returnInterval(store.opening.thursday) }}
          </li>
          <li>
            <span class="map-stores__hours-day">{{ $t('Date.friday') }}</span
            >:
            {{ returnInterval(store.opening.friday) }}
          </li>
          <li>
            <span class="map-stores__hours-day">{{ $t('Date.saturday') }}</span
            >:
            {{ returnInterval(store.opening.saturday) }}
          </li>
          <li>
            <span class="map-stores__hours-day">{{ $t('Date.sunday') }}</span
            >:
            {{ returnInterval(store.opening.sunday) }}
          </li>
        </ul>
      </div>
      <div class="map-stores__flex--end">
        <div v-if="!isShowHours" class="map-stores__link" @click="toggleHours">
          {{ $t('Date.times') }}
        </div>
        <button class="map-stores__link" @click="showStore">
          {{ $t('Date.itinary') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  store: any
  day: string
  days: string[]
  date: Date
}

const isShowHours = ref(false)

const emit = defineEmits(['showStore'])
const props = withDefaults(defineProps<IProps>(), {
  store: null,
  day: '',
  days: () => [],
  date: () => new Date(),
})

const isStoreOpen = computed(() => {
  const op = props.store.opening[props.day]
  return !!(isValid(op.am.from, op.am.to) || isValid(op.pm.from, op.pm.to))
})

const returnNextOpen = computed(() => {
  const op = props.store.opening[props.day]

  const now = props.date.getHours() * 60 + props.date.getMinutes()

  if (op.am.from === null || op.pm.from === null) {
    const day = getNextOpeninDay(props.store)
    return returnOpenString(props.store, props.days[day], 'Abierto mañana de')
  }

  if (relativeTime(op.am.from) > now) {
    return returnOpenString(props.store, props.day, 'Abierto hoy de')
  }

  if (relativeTime(op.pm.from) > now) {
    return returnOpenString(props.store, props.day, 'Abierto hoy')
  }

  if (relativeTime(op.pm.to) < now) {
    const day = getNextOpeninDay(props.store)

    if (props.date.getDay() === day) {
      return returnOpenString(props.store, props.days[day], 'Abierto mañana de')
    }

    return returnOpenString(props.store, props.days[day], props.days[day])
  }

  return 'Cerrado'
})

const isValid = (from, to) => {
  if (from === null) {
    return false
  }

  from = from.split(':')
  const h1 = parseInt(from[0], 10)
  const m1 = parseInt(from[1], 10)
  to = to.split(':')
  const h2 = parseInt(to[0], 10)
  const m2 = parseInt(to[1], 10)

  const h = props.date.getHours()
  const m = props.date.getMinutes()
  return (h1 < h || (h1 === h && m1 <= m)) && (h < h2 || (h === h2 && m <= m2))
}

const relativeTime = (time) => {
  time = time.split(':')
  return parseInt(time[0], 10) * 60 + parseInt(time[1], 10)
}

const getNextOpeninDay = (store, start = null) => {
  if (!start) {
    start = props.date.getDay()
    start = start >= 6 ? 0 : props.date.getDay()
  }

  for (let i = start; i < props.days.length; i++) {
    if (store.opening[props.days[i]]?.am.from !== null) {
      return i
    }
  }

  getNextOpeninDay(store, 0)
}

const returnOpenString = (store, day = props.day, string = 'Hoy de') => {
  if (store.opening[day].am.from !== null) {
    string += ' '
    string += store.opening[day].am.from
  }

  if (store.opening[day].am.to === store.opening[day].pm.from) {
    string += ' a '
    string += store.opening[day].pm.to
  }

  if (store.opening[day].am.to !== store.opening[day].pm.from) {
    string += ' a '
    string += store.opening[day].am.to

    if (store.opening[day].pm.from !== null) {
      string += ' y de '
      string += store.opening[day].pm.from
      string += ' a '
      string += store.opening[day].pm.to
    }
  }

  return string
}

const returnInterval = (opening) => {
  if (opening.am.from === null && opening.pm.from === null) {
    return 'Cerrado'
  }

  let text =
    opening.am.from +
    ' - ' +
    opening.am.to +
    ' | ' +
    opening.pm.from +
    ' - ' +
    opening.pm.to

  if (opening.am.to === opening.pm.from) {
    text = opening.am.from + ' - ' + opening.pm.to
  }

  return text.replaceAll(':', 'h')
}

const toggleHours = () => {
  isShowHours.value = !isShowHours.value
}

const showStore = () => {
  emit('showStore', props.store)
}
</script>

<style lang="scss" scoped>
.map-stores {
  &__list-item {
    padding: 14px 0 13px 0;
    margin-right: 30px;

    &:first-child {
      padding-top: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $color-medium-grey;
    }
  }
  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__flex--end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__store-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
  }

  &__store-icon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }

  &__store-hours {
    margin-bottom: 8px;
  }

  &__distance {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__info-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  &__status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 5px 0 7px 0;
  }

  &__status-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    &--green {
      color: $color-green;
    }

    &--red {
      color: $color-red;
    }
  }

  &__status-icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $color-green;
    margin-right: 4px;
  }

  &__status-icon--red {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $color-red;
    margin-right: 4px;
  }

  &__text {
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
  }

  &__link {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $color-pink;
    text-decoration: underline;
    cursor: pointer;

    &:last-child {
      margin-left: 24px;
    }
  }

  &__hours {
    margin: 15px 0;

    li {
      color: $color-dark-grey;
      margin-bottom: 3px;

      .map-stores__hours-day {
        color: $color-black;
      }
    }
  }

  &__pin {
    width: 15px;
    height: 15px;
    color: $color-pink;
  }
}
</style>
