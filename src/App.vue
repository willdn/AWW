<template>
  <div id="app">
    <top-header></top-header>
    <router-view id="app-content"></router-view>
    <bottom-footer></bottom-footer>
    <!-- Modals -->
    <confirm-network-switch-modal></confirm-network-switch-modal>
    <scan-code-modal></scan-code-modal>
    <donation-modal></donation-modal>
    <hardware-modal></hardware-modal>
  </div>
</template>

<script>
import networkType from './api/networkType'
import * as jark from 'jark'
import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/izitoast/dist/css/iziToast.min.css'
import TopHeader from './components/layouts/TopHeader'
import BottomFooter from './components/layouts/BottomFooter'
// Modals
import ConfirmNetworkSwitchModal from './components/modals/ConfirmNetworkSwitchModal'
import ScanCodeModal from './components/modals/ScanCodeModal'
import DonationModal from './components/modals/DonationModal'
import HardwareModal from './components/modals/HardwareModal'

export default {
  name: 'app',
  components: {
    TopHeader,
    ConfirmNetworkSwitchModal,
    ScanCodeModal,
    BottomFooter,
    DonationModal,
    HardwareModal
  },
  watch: {
    networkType (val) {
      this.getDBHeight()
    }
  },
  computed: {
    networkType () {
      return this.$store.getters.networkType
    }
  },
  methods: {
    getDBHeight () {
      jark.getBlocksHeight()
        .then((response) => {
          this.$store.dispatch('setDBHeight', response)
        })
    }
  },
  mounted () {
    this.$store.dispatch('setNetwork', networkType.MAIN)
    this.getDBHeight()
    setInterval(() => {
      this.getDBHeight()
    }, 15000)
  }
}
</script>

<style>
body {
  background-color: rgba(218, 218, 218, 0.50) !important;
}
#app {
  display: flex !important;
  min-height: 100vh !important;
  flex-direction: column !important;
}
#app-content {
  flex: 1;
}
.fa {
  margin-right: 0.25em !important;
}
.ui.form .field.success label {
    color: #308330 !important;
}
.ui.form .field.success input {
    background: #f4faf4 none repeat scroll 0 0 !important;
    border-color: #a3c293 !important;
    border-radius: 0.285714rem !important;
    box-shadow: none !important;
    color: #308330 !important;
}
/* Success Placeholder */
.ui.form .success ::-webkit-input-placeholder {
    color: #5e9e5e !important;
}
.ui.form .success ::-ms-input-placeholder {
    color: #5e9e5e !important;
}
.ui.form .success ::-moz-placeholder {
    color: #5e9e5e !important;
}
.ui.form .success :focus::-webkit-input-placeholder {
    color: #558e55 !important;
}
.ui.form .success :focus::-ms-input-placeholder {
    color: #558e55 !important;
}
.ui.form .success :focus::-moz-placeholder {
    color: #558e55 !important;
}
/* Responsive helper */
@media only screen and (max-width: 767px) {
  [class*="mobile hidden"],
  [class*="tablet only"]:not(.mobile),
  [class*="computer only"]:not(.mobile),
  [class*="large screen only"]:not(.mobile),
  [class*="widescreen only"]:not(.mobile),
  [class*="or lower hidden"] {
    display: none !important;
  }
}
</style>