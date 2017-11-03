<template>
  <div class="ui container">
    <!-- Send header -->
    <div class="ui header left aligned">
      <i class="ui icon send outline"></i>
      <div class="content">
        Send
      </div>
    </div>
    <div class="ui segment">
      <form class="ui form">
        <div class="field">
          <label>Address</label>
          <input v-model="transaction.to" type="text" :placeholder="`Send ${transaction.amount} ${transaction.asset} to `">
        </div>
        <div class="two fields fluid">
          <div class="twelve wide field">
            <label>Amount</label>
            <input v-model="transaction.amount" type="number" min="0">
          </div>
          <div class="four wide field">
            <label>&nbsp;</label>
            <select v-model="transaction.asset" class="ui simple dropdown item">
              <option value="GAS">GAS</option>
              <option value="NEO">NEO</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>Private Key</label>
          <input v-model="privateKey" type="text" placeholder="Enter private key (WIF)">
        </div>
        <button class="ui button green"
          :class="{ 'disabled': sending }"
          @click.prevent="send()">
          <i v-if="!sending" class="ui icon send outline"></i>
          <i v-if="sending" class="ui icon spinner loading"></i>
          Send
        </button>
        <button class="ui button basic"
          @click.prevent="closeSendForm()">
          <i class="ui icon cancel"></i>
          Close
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// import { addNotification } from '../api/notification'

export default {
  name: 'send',
  data () {
    return {
      sending: false,
      privateKey: null,
      transaction: null
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    },
    networkType () {
      return this.$store.getters.networkType
    }
  },
  watch: {
    networkType (val) {
    }
  },
  methods: {
    send () {
    },
    validateForm () {
    },
    closeSendForm () {
      this.$store.dispatch('toggleSendForm')
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>