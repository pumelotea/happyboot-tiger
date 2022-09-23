<script>
import {h, KeepAlive, toRaw} from 'vue'
import {reDefineComponent,includes} from '@/global/router'
export default {
  props: {
    is: {
      type: Object,
      require: true
    },
    route: {
      type: Object,
      require: true
    }
  },
  setup(props) {
    return ()=>h(KeepAlive, {include:toRaw(includes.value)}, {default: () => reDefineComponent(props.is,props.route)})
  },
}
</script>
