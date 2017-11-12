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
          <button @click.prevent="openWallet()" class="ui button green"
                  :class="{ 'disabled': passphrase === '' }">
            <i class="fa fa-unlock"></i>
            Open
          </button>
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
    }
  },
  mounted () {
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