<template>
  <modal
    name="confirmNetworkSwitchModal"
    height="auto"
    @before-open="beforeOpen"
    @closed="closed">
      <div class="ui container center aligned network-switch-modal">
        <div class="ui header">
          Switch network ?
          <div v-if="wallet.open" class="sub header">
            Your wallet will be closed
          </div>
        </div>
        <div class="ui segment basic">
          <button class="ui button green compact"
            @click.prevent="confirm()">
            <i class="ui icon check"></i>
            Yes
          </button>
          <button class="ui button red compact basic"
            @click.prevent="cancel()">
            <i class="ui icon cancel"></i>
            No
        </button>
        </div>
      </div>
  </modal>
</template>

<script>

export default {
  name: 'confirmNetworkSwitchModal',
  data () {
    return {
      action: null
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    }
  },
  methods: {
    confirm () {
      this.$modal.hide('confirmNetworkSwitchModal')
      this.$store.dispatch('switchNetwork')
      this.$router.push({ name: 'Main' })
    },
    cancel () {
      this.$modal.hide('confirmNetworkSwitchModal')
    },
    beforeOpen (event) {
    },
    closed (event) {
    }
  }
}
</script>
<style scoped>
.network-switch-modal {
  padding: 1.5em;
}
</style>
