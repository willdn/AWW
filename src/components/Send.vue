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
            <input v-model="transaction.to" type="text" placeholder="Enter recipient address"
                   :disabled="transactionSending">
            <i v-if="addressValid" class="icon check green"></i>
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
          <i v-if="!transactionSending" class="ui icon send outline"></i>
          <i v-if="transactionSending" class="ui icon spinner loading"></i>
          <span v-if="!transactionSending">Send</span>
          <span v-if="transactionSending">Sending</span>
        </button>
        <button class="ui button basic"
          v-if="!transactionSending"
          @click.prevent="closeSendForm()">
          <i class="ui icon cancel"></i>
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
import { addNotification } from '../api/notification'
import { getBalance, makeTransaction } from '../api/account'
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
    },
    transactionSending () {
      return this.$store.getters.app.transactionSending
    }
  },
  methods: {
    send () {
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
        return false
      }
      // Make transaction
      let tx = makeTransaction({
        transaction: this.transaction,
        passphrase: this.passphrase
      })
      this.$modal.show('confirmSendModal', {
        transaction: tx
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