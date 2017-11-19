<template>
  <div class="ui container">
    <!-- Send header -->
    <div class="ui header left aligned">
      <i class="fa fa-send-o"></i>
      <div class="content">
        Send
      </div>
    </div>
    <div class="ui segment">
      <form class="ui form">
        <div class="field" :class="{ 'success': addressValid }">
          <label>Address</label>
          <div class="ui input">
            <input v-model="transaction.to" type="text" placeholder="Enter recipient address"
                   :disabled="transactionSending">
          </div>
        </div>
        <div class="field">
          <label>Amount</label>
          <div class="ui right action input">
            <input v-model="transaction.amount" type="number" min="0"
                   :disabled="transactionSending">
            <div class="ui basic button"
                @click.prevent="sendMaxAmount()">
              MAX
            </div>
          </div>
        </div>
        <div class="field">
          <label>Message</label>
          <input v-model="transaction.message" type="text" placeholder="Type message (Optionnal)"
                 :disabled="transactionSending">
        </div>
        <div class="field">
          <label>Passphrase</label>
          <input v-model="passphrase" type="text" placeholder="Enter passphrase"
                 :disabled="transactionSending">
        </div>
        <button class="ui button green"
          :class="{ 'disabled': transactionSending }"
          @click.prevent="send()">
          <i v-if="!transactionSending" class="fa fa-send-o"></i>
          <i v-if="transactionSending" class="fa fa-spinner fa-spin"></i>
          <span v-if="!transactionSending">Send</span>
          <span v-if="transactionSending">Sending</span>
        </button>
        <button class="ui button basic"
          v-if="!transactionSending"
          @click.prevent="closeSendForm()">
          <i class="fa fa-remove"></i>
          Close
        </button>
      </form>
    </div>
    <!-- Confirm transaction modal -->
    <confirm-send-modal></confirm-send-modal>
  </div>
</template>

<script>
import ConfirmSendModal from './modals/ConfirmSendModal'
import { validateTransaction } from '../api/transaction'
import * as jark from 'jark'
import ark from 'arkjs'

const defaultTransaction = {
  to: null,
  amount: 0,
  message: null
}

export default {
  name: 'send',
  components: {
    ConfirmSendModal
  },
  data () {
    return {
      sending: false,
      passphrase: '',
      transaction: defaultTransaction
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    },
    addressValid () {
      return ark.crypto.validateAddress(this.transaction.to)
    },
    transactionSending () {
      return this.$store.getters.app.transactionSending
    }
  },
  methods: {
    send () {
      // Validation
      const data = {
        transaction: this.transaction,
        passphrase: this.passphrase
      }
      if (validateTransaction(data)) {
        let tx = jark.createTransaction({
          to: this.transaction.to,
          amount: this.transaction.amount,
          message: this.transaction.message,
          passphrase: this.passphrase
        })
        this.$modal.show('confirmSendModal', {
          transaction: tx
        })
      }
    },
    sendMaxAmount () {
      jark.getBlockchainFee()
        .then((blockchainFee) => {
          jark.getBalance(this.wallet.address)
            .then((balance) => {
              const fee = blockchainFee / Math.pow(8, 10)
              if (balance - fee < 0) {
                this.transaction.amount = 0
              } else {
                this.transaction.amount = balance - fee
              }
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