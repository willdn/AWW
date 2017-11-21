<template>
  <div class="ui container">
    <div class="ui segment basic center aligned">
      <!-- Ark logo -->
      <img class="ui centered image tiny" :src="require('../assets/img/ark-logo.png')">
      <div class="ui segment center aligned">
        <form class="ui form">
          <div class="field">
            <div class="ui action input">
              <input v-model="passphrase" class="input" type="password" placeholder="Enter passphrase">
              <button @click.prevent="openScannerModal()" class="ui basic button">
                <i class="fa fa-qrcode"></i>
              </button>
            </div>
          </div>
          <!-- Open -->
          <button @click.prevent="openWallet()" class="ui button green"
                  :class="{ 'disabled': passphrase === '' }">
            <i class="fa fa-unlock"></i>
            Open
          </button>
          <!-- Hardware -->
          <button @click.prevent="openHardware()" class="ui button teal">
            <i class="fa fa-usb"></i>
            Ledger
          </button>
          <!-- New -->
          <button @click.prevent="newWallet()" class="ui button teal basic">
            <i class="fa fa-plus"></i>
            New
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as jark from 'jark'

export default {
  name: 'openWallet',
  data () {
    return {
      passphrase: ''
    }
  },
  watch: {
    qrScanner (scanner) {
      if (scanner.action === 'OpenWallet') {
        this.passphrase = scanner.payload
        this.openWallet()
        this.$store.dispatch('clearCodeScanned')
      }
    }
  },
  computed: {
    qrScanner () {
      return this.$store.getters.qrScanner
    }
  },
  methods: {
    openWallet () {
      if (this.passphrase === '') return null
      const keys = jark.getKeys(this.passphrase)
      if (keys.address) {
        this.$store.dispatch('openWallet', {
          address: keys.address,
          publicKey: keys.publicKey
        })
        this.$router.push({ name: 'Wallet' })
        this.passphrase = ''
      }
    },
    openHardware () {
      this.$modal.show('hardwareModal')
    },
    newWallet () {
      this.$router.push({ name: 'NewWallet' })
    },
    openScannerModal () {
      this.$modal.show('scanCodeModal', {
        action: 'OpenWallet'
      })
    }
  },
  beforeDestroy () {
    if (this.scanner != null) this.stopCamera()
  }
}
</script>

<style scoped>
.ui.segment {
  width:100%;
}
.container{
  display: flex; 
  align-items: center; 
  justify-content: center;
}
</style>