import Toast, {
  PluginOptions,
  POSITION,
} from 'vue-toastification/dist/index.mjs'

export default defineNuxtPlugin(({ vueApp }) => {
  const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    shareAppContext: true,
    toastClassName: 'app-toast',
    bodyClassName: 'app-toast__body',
    containerClassName: 'app-toast__container',
    hideProgressBar: true,
    icon: false,
    closeButton: false,
  }

  vueApp.use(Toast, options)
})
