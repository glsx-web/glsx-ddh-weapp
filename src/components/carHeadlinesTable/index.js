import carHeadlinesTable from './src/main.vue'

carHeadlinesTable.install = Vue => {
  Vue.component(carHeadlinesTable.name, carHeadlinesTable)
}

export default carHeadlinesTable
