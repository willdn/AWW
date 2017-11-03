<template>
  <div class="ui menu">
      <router-link :to="{ name: 'Main'}" class="header item">
        Ark
      </router-link>
      
      <div  class="right menu">
        <div class="item">
          <i class="icon cube"></i>
          {{ blockHeight.toLocaleString() }}
        </div>
        <a class="item" @click.prevent="switchNetwork()">
          <i class="icon disk outline"></i>
          {{ networkType }}
        </a>
      </div>

  </div>
</template>

<script>

export default {
  name: 'topHeader',
  data () {
    return {
    }
  },
  computed: {
    networkType () {
      return this.$store.getters.networkType
    },
    blockHeight () {
      return this.$store.getters.blockHeight
    }
  },
  methods: {
    switchNetwork () {
      this.$store.dispatch('switchNetwork')
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
</style>
