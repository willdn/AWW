<template>
  <div class="ui container">
    <div class="ui segment basic center aligned">
      <!-- Ark logo -->
      <img class="ui centered image tiny" :src="require('../assets/img/ark-logo.png')">
      <div class="ui segment center aligned">
        <!-- Login options -->
        <div class="ui four stackable cards">
          <a class="raised card" @click.prevent="passphrasePanelVisible = !passphrasePanelVisible"
              :class="{ 'green' : passphrasePanelVisible }">
            <div class="content">
              <i class="fa fa-keyboard-o"></i>
              <b>Passphrase</b>
            </div>
          </a>
          <a class="raised card" @click.prevent="openHardware()">
            <div class="content">
              <i class="fa fa-usb"></i>
              <b>Ledger</b>
            </div>
          </a>
          <a class="raised card" @click.prevent="openScannerModal()">
            <div class="content">
              <i class="fa fa-qrcode"></i>
              <b>Scan QR</b>
            </div>
          </a>
          <a class="raised card" @click.prevent="newWallet()">
            <div class="content">
              <i class="fa fa-rocket"></i>
              <b>New</b>
            </div>
          </a>
        </div>
        <!-- Passphrase input panel -->
        <div v-if="passphrasePanelVisible" class="ui segment basic">
          <div class="ui small header">Enter your passphrase</div>
          <form class="ui form">
            <div class="field">
              <div class="ui action input">
                <input v-model="passphrase" class="input" type="password" placeholder="Passphrase">
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
            <!-- Close -->
            <button @click.prevent="passphrasePanelVisible = false" class="ui button basic">
              <i class="fa fa-remove"></i>
              Close
            </button>
          </form>
        </div>
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
      passphrase: '',
      passphrasePanelVisible: false
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
.card {
  margin-top: 0.35rem;
  margin-bottom: 0.15rem;
  color: rgba(0,0,0,.87);
}
.container{
  display: flex; 
  align-items: center; 
  justify-content: center;
}
</style>