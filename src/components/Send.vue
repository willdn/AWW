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
          <div class="ui action input">
            <input v-model="transaction.to" class="input" type="text" placeholder="Enter recipient address"
                  :disabled="transactionSending">
            <button @click.prevent="openCodeScanner('FillRecipientAddress')" class="ui basic button">
              <i class="fa fa-qrcode"></i>
            </button>
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
            <div class="ui action input">
              <input v-model="passphrase" class="input" type="password" placeholder="Enter passphrase"
                    :disabled="transactionSending">
              <button @click.prevent="openCodeScanner('SignTransaction')" class="ui basic button">
                <i class="fa fa-qrcode"></i>
              </button>
            </div>
        </div>
        <button class="ui button green"
          :class="{ 'disabled': transactionSending }"
          @click.prevent="send()">
          <i v-if="!transactionSending" class="fa fa-send-o"></i>
          <i v-if="transactionSending" class="fa fa-spinner fa-spin"></i>
          <span v-if="!transactionSending">Send</span>
          <span v-if="transactionSending">Sending</span>
        </button>
        <button class="ui button teal"
          @click.prevent="sendLedger()">
          <span>Sign Ledger</span>
        </button>
        <button class="ui button basic"
          v-if="!transactionSending"
          @click.prevent="closeSendForm()">
          <i class="fa fa-remove"></i>
          Close
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { validateTransaction } from '../api/transaction'
import { errorNotification } from '../api/notification'
import * as jark from 'jark'
import arkjs from 'arkjs'
import LedgerArk from '../ledger/LedgerArk'

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
      passphrase: '',
      transaction: defaultTransaction
    }
  },
  watch: {
    qrScanner (scanner) {
      if (scanner.action === 'SignTransaction') {
        this.passphrase = scanner.payload
      }
      if (scanner.action === 'FillRecipientAddress') {
        this.transaction.to = scanner.payload
      }
      this.$store.dispatch('clearCodeScanned')
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    },
    addressValid () {
      return arkjs.crypto.validateAddress(this.transaction.to)
    },
    transactionSending () {
      return this.$store.getters.app.transactionSending
    },
    qrScanner () {
      return this.$store.getters.qrScanner
    }
  },
  methods: {
    openCodeScanner (action) {
      this.$modal.show('scanCodeModal', {
        action: action
      })
    },
    send () {
      // Validation
      const data = {
        transaction: this.transaction,
        passphrase: this.passphrase
      }
      jark.getBalance(this.wallet.address)
        .then((balance) => {
          if (data.transaction.amount > balance) {
            errorNotification('Not enough ARK')
            return false
          } else {
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
          }
        })
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
    sendLedger () {
      const lark = new LedgerArk(this.$store.getters.app.ledgerComm)
      const amount = 1 * Math.pow(8, 10)
      let tx = arkjs.transaction.createTransaction(
        'D5GcwQbPasZPmZvbPUc3bgDcvhpFT5Q36q',
        amount,
        null,
        '',
        null
      )
      delete tx.signature
      tx.senderId = this.$store.getters.wallet.address
      tx.senderPublicKey = this.$store.getters.wallet.publicKey
      console.log('tx', tx)
      const rawTx = arkjs.crypto.getBytes(tx, true, true).toString('hex')
      const slip44 = this.$store.getters.networkType.slip44
      lark.signTransaction_async(`44'/${slip44}'/0'/0/0`, rawTx)
        .then((result) => {
          console.log(result)
        })
        .fail((error) => {
          console.log('Ledger error : ', error)
        })
    },
    validateForm () {
    },
    closeSendForm () {
      this.$store.dispatch('toggleSendForm')
    }
  },
  mounted () {
    this.transaction = {
      to: null,
      amount: 0,
      message: null
    }
    this.passphrase = ''
  }
}
</script>

<style scoped>

</style>