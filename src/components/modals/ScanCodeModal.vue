<template>
  <modal
    name="scanCodeModal"
    height="auto"
    :adaptive="true"
    @opened="opened"
    @before-open="beforeOpen"
    @closed="closed">
    <div class="ui container center aligned send-code-modal">
      <span v-if="!codeScanned">Waiting for QR code <i class="fa fa-spinner fa-spin"></i></span>
      <span v-if="codeScanned">Code scanned</span>
      <video id="qr-preview"></video>
      <div class="ui segment basic">
        <button class="ui button red compact basic"
          @click.prevent="closeModal()">
          <i class="fa fa-remove"></i>
          Close
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import Instascan from 'instascan'

export default {
  name: 'scanCodeModal',
  data () {
    return {
      action: null,
      scanner: null,
      codeScanned: false
    }
  },
  methods: {
    opened (event) {
      this.$nextTick(() => {
        this.startCamera()
      })
    },
    closed (event) {
      this.stopCamera()
    },
    closeModal () {
      this.$modal.hide('scanCodeModal')
    },
    startCamera () {
      this.scanner = new Instascan.Scanner({ video: document.getElementById('qr-preview') })
      this.scanner.addListener('scan', (content) => {
        this.codeScanned = true
        this.$store.dispatch('codeScanned', {
          value: content,
          action: this.action
        })
        this.codeScanned = false
        this.$modal.hide('scanCodeModal')
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
    },
    beforeOpen (event) {
      this.action = event.params.action
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.send-code-modal {
  padding: 1.5em;
}
video {
  width: 100%;
  height: auto;
}
</style>
