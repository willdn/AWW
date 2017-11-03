<template>
  <div id="app">
    <top-header></top-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { getBlocksHeight } from './api'
import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/izitoast/dist/css/iziToast.min.css'
import TopHeader from './components/layouts/TopHeader'

export default {
  name: 'app',
  components: {
    TopHeader
  },
  watch: {
    networkType (val) {
      this.getDBHeight()
    }
  },
  computed: {
    networkType () {
      return this.$store.getters.networkType
    }
  },
  methods: {
    getDBHeight () {
      getBlocksHeight()
        .then((response) => {
          this.$store.dispatch('setDBHeight', response)
        })
    }
  },
  mounted () {
    this.getDBHeight()
    setInterval(() => {
      this.getDBHeight()
    }, 15000)
  }
}
</script>

<style>
  body {
    background-color: rgba(218, 218, 218, 0.50);
  }
</style>