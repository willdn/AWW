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
          <input v-model="passphrase" type="text" placeholder="Enter private key (WIF)">
        </div>
        <button class="ui button green"
          :class="{ 'disabled': sending }"
          @click.prevent="send()">
          <i v-if="!sending" class="ui icon send outline"></i>
          <i v-if="sending" class="ui icon spinner loading"></i>
          <span v-if="!sending">Send</span>
          <span v-if="sending">Sending</span>
        </button>
        <button class="ui button basic"
          v-if="!sending"
          @click.prevent="closeSendForm()">
          <i class="ui icon cancel"></i>
          Close
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { addNotification } from '../api/notification'
import { getNetHash } from '../api'
import ark from 'arkjs'
import axios from 'axios'

const defaultTransaction = {
  to: null,
  amount: 0
}

export default {
  name: 'send',
  data () {
    return {
      sending: false,
      passphrase: null,
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
      this.sending = true
      let amount = this.transaction.amount * Math.pow(10, 8)
      let transaction = ark.transaction.createTransaction(
        this.transaction.to,
        amount,
        null,
        this.passphrase,
        ''
      )
      console.log(transaction)
      getNetHash()
        .then((nethash) => {
          const data = JSON.stringify({ transactions: [transaction] })
          axios.post('http://167.114.29.52:4002/peer/transactions', data, {
            headers: {
              'Content-Type': 'application/json',
              // 'os': 'linux3.2.0-4-amd64',
              'version': '0.3.0',
              'port': 1,
              'nethash': nethash
            }
          })
          .then((response) => {
            // this.closeSendForm()
            addNotification({
              message: `${this.transaction.amount} sent`,
              color: 'green'
            })
            this.sending = false
          })
          .catch((error) => {
            addNotification({
              message: error,
              color: 'red'
            })
            this.sending = false
          })
        })
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