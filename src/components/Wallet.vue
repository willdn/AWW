<template>
  <div class="ui container center aligned">
    <div v-if="wallet" class="ui segment center aligned">
      <div class="ui equal width stackable grid">
        <div class="ui column center aligned">
          <img class="ui centered image" :src="QRAddress" />
          {{ wallet.address }}<br />
          <!-- Delegate -->
          <span v-if="currentDelegate">
            <b>{{ currentDelegate.username }}</b> (#{{ currentDelegate.rate }})
          </span>
          <a
            v-clipboard="this.wallet.address"
            @success="copySuccess()">
            <i class="fa fa-copy"></i>
          </a>
        </div>
        <div class="ui column middle aligned">
          <div class="ui equal width grid center aligned">
            <!-- Currency select -->
            <div class="ui button compact basic"
                @click.prevent="currencyModal()">
              <i class="fa fa-money"></i>
            </div>
            <!-- Refresh button -->
            <div class="ui button compact basic"
                :class="{ 'disabled': balance == null || !transactions }"
                @click.prevent="refresh()">
              <i class="fa fa-refresh" :class="{ 'fa-spin': balance == null || !transactions }"></i>
            </div>
          </div>
          <div class="ui equal width grid center aligned">
            <!-- ARK Balance -->
            <div class="ui column">
              <div class="ui medium header">
                <span v-if="balance == null"><i class="fa fa-spinner fa-spin"></i></span>
                <span v-if="balance || balance === 0">{{ balance.toLocaleString() }}</span>
                <div class="ui sub header">ARK</div>
              </div>
            </div>
            <!-- FIAT Balance -->
            <div class="ui column">
              <div class="ui medium header">
                <span v-if="balance == null"><i class="fa fa-spinner fa-spin"></i></span>
                <span v-if="balance || balance === 0">{{ balanceFiat.toLocaleString() }}</span>
                <div class="ui sub header">{{ fiatCurrency.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Action menu -->
    <div class="ui two item menu">
      <a class="item"
         :class="{ 'active teal': sendFormVisible }"
         @click.prevent="toggleSendForm()">
        <i class="fa fa-send-o"></i>
        Send
      </a>
      <a class="item"
         @click.prevent="toggleDelegateVote()"
         :class="{ 'active teal': voteFormVisible }">
        <i class="fa fa-thumbs-up"></i>
        Vote
      </a>
    </div>
    <!-- Send form -->
    <send v-if="sendFormVisible"></send>
    <!-- Delegate vote -->
    <delegate-vote v-if="voteFormVisible"></delegate-vote>
    <!-- Transaction header -->
    <div class="ui header left aligned">
      <i class="fa fa-exchange"></i>
      <div class="content">
        Transactions
      </div>
    </div>
    <div v-if="!transactions" class="ui segment center aligned">
      <i class="fa fa-spinner fa-spin"></i>
      Loading transactions
    </div>
    <div v-if="transactions" class="ui cards">
      <transaction v-for="transaction in transactions" :key="transaction.id" :tx="transaction"></transaction>
    </div>
    <div v-if="transactions && transactions.length === 0" class="ui segment center aligned">
      No transactions
    </div>
    <!-- Currency select modal -->
    <currency-modal></currency-modal>
    <!-- Confirm transaction modal -->
    <confirm-send-modal></confirm-send-modal>
  </div>
</template>

<script>
import CurrencyModal from './modals/CurrencyModal'
import ConfirmSendModal from './modals/ConfirmSendModal'
import { clipboardNotification } from '../api/notification'
import Transaction from './Transaction'
import Send from './Send'
import DelegateVote from './DelegateVote'
import QRCode from 'qrcode'
import axios from 'axios'
import * as jark from 'jark'

export default {
  name: 'wallet',
  components: {
    CurrencyModal,
    ConfirmSendModal,
    Transaction,
    Send,
    DelegateVote
  },
  data () {
    return {
      timer: null,
      transactions: null,
      arkFiatValue: 0,
      balance: null,
      claimAmounts: null,
      QRAddress: null
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    },
    sendFormVisible () {
      return this.$store.getters.app.sendFormVisible
    },
    voteFormVisible () {
      return this.$store.getters.app.voteFormVisible
    },
    fiatCurrency () {
      return this.$store.getters.app.fiatCurrency
    },
    balanceFiat () {
      return this.arkFiatValue * this.balance
    },
    currentDelegate () {
      return this.wallet.delegate
    }
  },
  watch: {
    fiatCurrency () {
      this.getARKMarket()
    }
  },
  methods: {
    toggleSendForm () {
      this.$store.dispatch('toggleSendForm')
      this.$store.dispatch('toggleVoteForm', false)
    },
    toggleDelegateVote () {
      this.$store.dispatch('toggleVoteForm')
      this.$store.dispatch('toggleSendForm', false)
    },
    getBalance () {
      jark.getBalance(this.wallet.address)
        .then((balance) => {
          this.balance = balance
        })
    },
    getTransactions () {
      jark.getTransactionsFromAddress(this.wallet.address)
        .then((response) => {
          this.transactions = response.reverse()
        })
    },
    refresh () {
      this.transactions = null
      this.balance = null
      this.getTransactions()
      this.getBalance()
    },
    copySuccess () {
      clipboardNotification()
    },
    currencyModal () {
      this.$modal.show('currencyModal')
    },
    getARKMarket () {
      axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ARK&tsyms=${this.fiatCurrency.id}`)
        .then((res) => {
          this.arkFiatValue = res.data[this.fiatCurrency.id]
        })
        .catch((err) => {
          if (err) console.log(err)
        })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.$store.dispatch('closeWallet')
  },
  mounted () {
    // Redirect if no wallet opened
    if (!this.$store.getters.wallet.open) {
      this.$router.push({ name: 'OpenWallet' })
      return null
    }
    // Get current delegate
    jark.getDelegatesFromAddress(this.$store.getters.wallet.address)
      .then((delegate) => {
        if (delegate && delegate.length > 0) {
          this.$store.dispatch('setDelegate', delegate[0])
        }
      })
    // this.$store.dispatch('setLoadingState', true)
    this.getBalance()
    this.getTransactions()
    this.getARKMarket()
    this.timer = setInterval(() => {
      this.getBalance()
      this.getTransactions()
      // this.getARKMarket()
    }, 10000)
    this.$nextTick(() => {
      QRCode.toDataURL(this.$store.getters.wallet.address, (err, url) => {
        if (err) console.log(err)
        this.QRAddress = url
      })
    })
  }
}
</script>

<style scoped>

</style>