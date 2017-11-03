<template>
  <div class="ui container center aligned">
      <h2 class="ui header">
        <div class="content">
          Open Ark wallet
        </div>
      </h2>

      <div class="ui segment center aligned">
        <form class="ui form">
          <div class="field">
            <input v-model="passphrase" class="input" type="text" placeholder="Enter passphrase">
          </div>
          <button @click.prevent="openWallet()" class="ui button green">
            <i class="icon unlock"></i>
            Open
          </button>
        </form>
      </div>
  </div>
</template>

<script>
import { getAddressFromPass } from '../api/account'

export default {
  name: 'openWallet',
  data () {
    return {
      passphrase: ''
    }
  },
  methods: {
    openWallet () {
      if (this.passphrase === '') return null
      const address = getAddressFromPass(this.passphrase)
      if (address) {
        this.$store.dispatch('openWallet', address)
        this.$router.push({ name: 'Wallet' })
        this.passphrase = ''
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>