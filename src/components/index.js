import VueMarkdownComponent from './VueMarkdown'
import uploadImage from './uploadImage'

export function install(Vue) {
    Vue.component('vue-markdown', VueMarkdownComponent)
    Vue.component('upload-image', uploadImage)
}

export default install;