<template>
  <modal
    name="confirmNetworkSwitchModal"
    height="auto"
    :adaptive="true"
    @before-open="beforeOpen"
    @closed="closed">
      <div class="ui container center aligned network-switch-modal">
        <div class="ui header">
          Select network
        </div>
        <!-- Main networks -->
        <div class="ui small header left aligned">
          Main
          <div v-if="wallet.open && networkType.label !== 'Main'" class="ui sub header center aligned">
            Your wallet will be closed
          </div>
        </div>
        <div class="ui cards">
          <a v-for="net in mainNets" :key="net" class="ui card fluid"
             :class="{ 'green': currentEndpoint === net }"
             @click.prevent="selectNetwork('Main', net)">
            <div class="content">
              <div v-if="currentEndpoint === net" class="left floated">
                <i class="fa fa-check green"></i>
              </div>
              {{ net }}
            </div>
          </a>
        </div>
        <!-- Dev networkds -->
        <div class="ui small header left aligned">
          Dev
          <div v-if="wallet.open && networkType.label !== 'Dev'" class="ui sub header center aligned">
            Your wallet will be closed
          </div>
        </div>
        <div class="ui cards">
          <a v-for="net in devNets" :key="net" class="ui card fluid"
             :class="{ 'green': currentEndpoint === net }"
             @click.prevent="selectNetwork('Dev', net)">
            <div class="content">
              <div v-if="currentEndpoint === net" class="left floated">
                <i class="fa fa-check green"></i>
              </div>
              {{ net }}
            </div>
          </a>
        </div>
        <!-- Close button -->
        <div class="ui segment basic">
          <button class="ui button compact basic"
            @click.prevent="closeModal()">
            <i class="fa fa-remove"></i>
            Close
          </button>
        </div>
      </div>
  </modal>
</template>

<script>
import * as jark from 'jark'

export default {
  name: 'confirmNetworkSwitchModal',
  data () {
    return {
      action: null,
      currentEndpoint: null
    }
  },
  computed: {
    networkType () {
      return this.$store.getters.networkType
    },
    wallet () {
      return this.$store.getters.wallet
    },
    mainNets () {
      return jark.getSeeds('Main')
    },
    devNets () {
      return jark.getSeeds('Dev')
    }
  },
  methods: {
    selectNetwork (network, url) {
      if (this.currentEndpoint === url) return this.closeModal()
      const oldNetworkLabel = JSON.parse(JSON.stringify(this.networkType.label))
      this.$store.dispatch('switchNetwork', {
        network: network,
        url: url
      })
      this.closeModal()
      if (this.$route.name === 'Wallet' &&
          network !== oldNetworkLabel) {
        this.$store.dispatch('closeWallet')
        this.$router.push({ name: 'Main' })
      }
    },
    closeModal () {
      this.$modal.hide('confirmNetworkSwitchModal')
    },
    beforeOpen (event) {
      this.currentEndpoint = jark.getEndpoint()
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
.ui.fluid.card {
  margin-top: 0.35rem;
  margin-bottom: 0.15rem;
  color: rgba(0,0,0,.87);
}
</style>
