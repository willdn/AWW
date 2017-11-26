<template>
  <modal
    name="hardwareModal"
    height="auto"
    :adaptive="true"
    @before-open="beforeOpen"
    @before-close="beforeClose">
      <div class="ui container center aligned hardware-modal">
        <span>Waiting for Ledger <i class="fa fa-spinner fa-spin"></i></span>
        
      </div>
  </modal>
</template>

<script>
import ledger from 'ledgerco'
import LedgerArk from '../../ledger/LedgerArk'
import arkjs from 'arkjs'

export default {
  name: 'hardwareModal',
  data () {
    return {
      timer: null
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('hardwareModal')
    },
    hardwareOpen (keys) {
      clearInterval(this.timer)
      this.$store.dispatch('openWallet', {
        address: keys.address,
        publicKey: keys.publicKey
      })
      this.closeModal()
      this.$router.push({ name: 'Wallet' })
    },
    beforeOpen (event) {
      this.timer = setInterval(() => {
        ledger.comm_u2f.create_async().then((comm) => {
          this.$store.dispatch('setLedgerComm', comm)
          const ark = new LedgerArk(comm)
          const slip44 = this.$store.getters.networkType.slip44
          ark.getAddress_async(`44'/${slip44}'/0'/0/0`)
            .then((keys) => {
              if (keys.hasOwnProperty('publicKey') &&
                  keys.hasOwnProperty('address')) {
                keys.address = arkjs.crypto.getAddress(keys.publicKey)
                this.hardwareOpen(keys)
              }
            })
            .fail((error) => {
              console.log('Ledger error : ', error)
            })
        })
      }, 3000)
    },
    beforeClose (event) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style scoped>
.hardware-modal {
  padding: 1.5em;
}
</style>
