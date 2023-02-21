export function debounce(func, wait = 300, immediate = false) {
  let timeout

  return function executedFunction() {
    const context = this
    const args = arguments

    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

interface ICoordinate {
  lat: number
  lng: number
}

function toRad(value: number) {
  return (value * Math.PI) / 180
}

export function calcCrow(aPoint: ICoordinate, bPoint: ICoordinate) {
  const R = 6371 // km

  const dLat = toRad(bPoint.lat - aPoint.lat)
  const dLng = toRad(bPoint.lng - aPoint.lng)
  const aLat = toRad(aPoint.lat)
  const bLat = toRad(bPoint.lat)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(aLat) * Math.cos(bLat)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}

export function scrollToTop() {
  if (process.client) {
    window.scrollTo({ top: 0 })
  }
}
