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
          <div class="ui icon input">
            <input v-model="transaction.to" type="text" placeholder="Enter recipient address">
            <i v-if="addressValid" class="icon check green"></i>
          </div>
        </div>
        <div class="field">
          <label>Amount</label>
          <div class="ui right action input">
            <input v-model="transaction.amount" type="number" min="0">
            <div class="ui basic button"
                @click.prevent="sendMaxAmount()">
              MAX
            </div>
          </div>
        </div>
        <div class="field">
          <label>Message</label>
          <input v-model="transaction.message" type="text" placeholder="Type message (Optionnal)">
        </div>
        <div class="field">
          <label>Passphrase</label>
          <input v-model="passphrase" type="text" placeholder="Enter passphrase">
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
import { sendTransaction, getBalance } from '../api/account'
import ark from 'arkjs'

const defaultTransaction = {
  to: null,
  amount: 0,
  message: null
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
    addressValid () {
      return ark.crypto.validateAddress(this.transaction.to)
    }
  },
  methods: {
    send () {
      this.sending = true
      // Validation
      let valid = true
      if (this.passphrase == null || this.passphrase === '') {
        addNotification({
          message: `Passphrase is not valid`,
          color: 'red'
        })
        valid = false
      }
      if (!ark.crypto.validateAddress(this.transaction.to)) {
        addNotification({
          message: `Address is not valid`,
          color: 'red'
        })
        valid = false
      }
      if (!valid) {
        this.sending = false
        return false
      }
      // Create transaction
      let amount = this.transaction.amount * Math.pow(10, 8)
      let transaction = ark.transaction.createTransaction(
        this.transaction.to,
        amount,
        this.transaction.message,
        this.passphrase,
        ''
      )
      // Send transaction
      sendTransaction(transaction)
        .then((res) => {
          this.transaction = defaultTransaction
          this.closeSendForm()
          addNotification({
            message: `${this.transaction.amount} sent`,
            color: 'green'
          })
          this.sending = false
        })
        .catch((err) => {
          if (err) {
            addNotification({
              message: err,
              color: 'red'
            })
            this.sending = false
          }
        })
    },
    sendMaxAmount () {
      getBalance(this.wallet.address)
        .then((response) => {
          this.transaction.amount = response
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