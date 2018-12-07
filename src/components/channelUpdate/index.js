import channelUpdate from './src/channelUpdate'

channelUpdate.install = Vue => {
  Vue.component(channelUpdate.name, channelUpdate)
}

export default channelUpdate
