import { defineComponent } from "@vue/runtime-core"
import './styles/index.css'
import { a } from '../test'

export default defineComponent({
  setup() {
    return () => {
      return <div class="root">Hello {a.name}</div>
    }
  }
})