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
          <input v-model="transaction.to" type="text" :placeholder="`Send ${transaction.amount} to `">
        </div>
        <div class="field">
          <label>Amount</label>
          <input v-model="transaction.amount" type="number" min="0">
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

const defaultTransaction = {
  to: null,
  amount: 0
}

export default {
  name: 'send',
  data () {
    return {
      sending: false,
      privateKey: null,
      transaction: defaultTransaction
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