<template>
  <modal
    name="scanCodeModal"
    height="auto"
    @opened="opened"
    @before-open="beforeOpen"
    @closed="closed">
      <video id="preview"></video>
  </modal>
</template>

<script>
import Instascan from 'instascan'

export default {
  name: 'scanCodeModal',
  data () {
    return {
      action: null,
      scanner: null
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
    startCamera () {
      this.scanner = new Instascan.Scanner({ video: document.getElementById('preview') })
      this.scanner.addListener('scan', (content) => {
        this.$store.dispatch('codeScanned', {
          value: content,
          action: this.action
        })
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
</style>
