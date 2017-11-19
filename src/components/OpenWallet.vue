<template>

  <div class="ui container">
    <div class="ui segment basic center aligned">
      <!-- Ark logo -->
      <img class="ui centered image tiny" :src="require('../assets/img/ark-logo.png')">
      <div class="ui segment center aligned">
        <form class="ui form">
          <div class="field">
            <input v-model="passphrase" class="input" type="text" placeholder="Enter passphrase">
          </div>
          <!-- Open with input -->
          <button @click.prevent="openWallet()" class="ui button green"
                  :class="{ 'disabled': passphrase === '' }">
            <i class="fa fa-unlock"></i>
            Open
          </button>
          <!-- Camera toggle -->
          <button v-if="!cameraRunning" @click.prevent="startCamera()" class="ui button green">
            <i class="fa fa-qrcode"></i>
            Scan
          </button>
          <button v-if="cameraRunning" @click.prevent="stopCamera()" class="ui button red">
            <i class="fa fa-qrcode"></i>
            Stop
          </button>
          <!-- New -->
          <button @click.prevent="newWallet()" class="ui button teal basic">
            <i class="fa fa-plus"></i>
            New
          </button>
        </form>
      </div>
      <video id="preview"></video>
    </div>
  </div>
</template>

<script>
import * as jark from 'jark'
import Instascan from 'instascan'

export default {
  name: 'openWallet',
  data () {
    return {
      scanner: null,
      passphrase: ''
    }
  },
  computed: {
    cameraRunning () {
      return (this.scanner != null)
    }
  },
  methods: {
    openWallet () {
      if (this.passphrase === '') return null
      const keys = jark.getKeys(this.passphrase)
      if (keys.address) {
        this.$store.dispatch('openWallet', keys.address)
        this.$router.push({ name: 'Wallet' })
        this.passphrase = ''
      }
    },
    newWallet () {
      this.$router.push({ name: 'NewWallet' })
    },
    startCamera () {
      this.scanner = new Instascan.Scanner({ video: document.getElementById('preview') })
      this.scanner.addListener('scan', (content) => {
        this.passphrase = content
        this.openWallet()
      })
      Instascan.Camera.getCameras().then((cameras) => {
        if (cameras.length > 0) {
          this.scanner.start(cameras[0])
        } else {
          console.error('No cameras found.')
        }
      }).catch(function (e) {
        console.error(e)
      })
    },
    stopCamera () {
      this.scanner.stop()
      this.scanner = null
    }
  },
  mounted () {
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