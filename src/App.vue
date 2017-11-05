<template>
  <div id="app">
    <top-header></top-header>
    <router-view></router-view>
    <confirm-network-switch-modal></confirm-network-switch-modal>
  </div>
</template>

<script>
import { getBlocksHeight } from './api'
import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/izitoast/dist/css/iziToast.min.css'
import TopHeader from './components/layouts/TopHeader'
import ConfirmNetworkSwitchModal from './components/modals/ConfirmNetworkSwitchModal'

export default {
  name: 'app',
  components: {
    TopHeader,
    ConfirmNetworkSwitchModal
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
      getBlocksHeight()
        .then((response) => {
          this.$store.dispatch('setDBHeight', response)
        })
    }
  },
  mounted () {
    this.getDBHeight()
    setInterval(() => {
      this.getDBHeight()
    }, 15000)
  }
}
</script>

<style>
body {
  background-color: rgba(218, 218, 218, 0.50);
}
.fa {
  margin-right: 0.25em !important;
}
.ui.form .field.success label {
    color: #308330;
}
.ui.form .field.success input {
    background: #f4faf4 none repeat scroll 0 0;
    border-color: #a3c293;
    border-radius: 0.285714rem;
    box-shadow: none;
    color: #308330;
}
/* Success Placeholder */
.ui.form .success ::-webkit-input-placeholder {
    color: #5e9e5e;
}
.ui.form .success ::-ms-input-placeholder {
    color: #5e9e5e;
}
.ui.form .success ::-moz-placeholder {
    color: #5e9e5e;
}
.ui.form .success :focus::-webkit-input-placeholder {
    color: #558e55;
}
.ui.form .success :focus::-ms-input-placeholder {
    color: #558e55;
}
.ui.form .success :focus::-moz-placeholder {
    color: #558e55;
}
</style>