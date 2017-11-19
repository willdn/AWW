<template>
  <div class="ui container center aligned">
    <div v-if="wallet" class="ui segment center aligned">
      <div class="ui equal width stackable grid">
        <div class="ui column center aligned">
          <img class="ui centered image" :src="QRAddress" />
          {{ wallet.address }}
          <a
            v-clipboard="this.wallet.address"
            @success="copySuccess()">
            <i class="fa fa-copy"></i>
          </a>
        </div>
        <div class="ui column middle aligned">
          <!-- Send toggle -->
          <div class="ui equal width grid center aligned">
            <div class="ui column">
              <div class="ui button teal compact"
                  :class="{ 'basic': !sendFormVisible }"
                  @click.prevent="toggleSendForm()">
                <i class="fa fa-send-o"></i>
                Send
              </div>
            </div>
            <!-- Refresh -->
            <div class="ui column">
              <div class="ui button blue compact basic"
                  :class="{ 'disabled': balance == null || !transactions }"
                  @click.prevent="refresh()">
                <i class="fa fa-refresh" :class="{ 'fa-spin': balance == null || !transactions }"></i>
                Refresh
              </div>
            </div>
            <!-- Delegate -->
            <!--
            <div class="ui column">
              <div class="ui button orange compact basic"
                  @click.prevent="toggleDelegateVote()">
                <i class="fa fa-thumbs-up"></i>
                Vote
              </div>
            </div>
            -->
            <!-- Currency modal -->
            <div class="ui column">
              <div class="ui button compact basic"
                  @click.prevent="currencyModal()">
                <i class="fa fa-money"></i>
                Currency
              </div>
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
                <span v-if="balance || balance === 0">{{ balanceEUR.toLocaleString() }}</span>
                <div class="ui sub header">{{ fiatCurrency.label }}</div>
              </div>
            </div>
          </div>
          <!-- Delegate -->
          <div v-if="currentDelegate"><b>{{ currentDelegate.username }}</b></div>
        </div>
      </div>
    </div>
    <send v-if="sendFormVisible"></send>
    <delegate-vote v-if="delegateVoteVisible"></delegate-vote>
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
    <!-- Modals -->
    <currency-modal></currency-modal>
  </div>
</template>

<script>
import CurrencyModal from './modals/CurrencyModal'
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
    Transaction,
    Send,
    DelegateVote
  },
  data () {
    return {
      timer: null,
      transactions: null,
      arkValueEUR: 0,
      balance: null,
      claimAmounts: null,
      QRAddress: null,
      delegateVoteVisible: false,
      currentDelegate: null
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    },
    sendFormVisible () {
      return this.$store.getters.app.sendFormVisible
    },
    fiatCurrency () {
      return this.$store.getters.app.fiatCurrency
    },
    balanceEUR () {
      return this.arkValueEUR * this.balance
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
    },
    toggleDelegateVote () {
      this.delegateVoteVisible = !this.delegateVoteVisible
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
          this.arkValueEUR = res.data[this.fiatCurrency.id]
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
        if (delegate) {
          this.currentDelegate = delegate
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
    }, 15000)
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