<template>
  <div class="ui menu">
      <router-link :to="{ name: 'Main'}" class="header item">
        Ark Web Wallet
      </router-link>
      
      <div  class="right menu">
        <div v-if="blockHeight" class="item">
          <i class="fa fa-cube"></i>
          {{ blockHeight.toLocaleString() }}
        </div>
        <a v-if="networkType" class="item" @click.prevent="switchNetwork()">
          <i class="fa fa-hdd-o"></i>
          {{ networkType.label }}
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
      this.$modal.show('confirmNetworkSwitchModal')
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
</style>
