<template>
  <div class="ui menu top-header">
      <router-link :to="{ name: 'Main'}" class="header item">
        Ark Web Wallet
      </router-link>
      <div  class="right menu">
        <div v-if="blockHeight" class="item mobile hidden">
          <i class="fa fa-cube"></i>
          {{ blockHeight.toLocaleString() }}
        </div>
        <a v-if="networkType" class="item" @click.prevent="switchNetwork()">
          <i class="fa fa-hdd-o"></i>
          {{ networkType.label }}
        </a>
        <a v-if="wallet.open" class="item" @click.prevent="closeWallet()">
          <i class="fa fa-sign-out"></i>
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
    wallet () {
      return this.$store.getters.wallet
    },
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
    },
    closeWallet () {
      this.$store.dispatch('closeWallet')
      this.$router.push({ name: 'Main' })
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.top-header {
  border-radius: 0em;
}
</style>
