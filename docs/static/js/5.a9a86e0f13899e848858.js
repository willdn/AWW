webpackJsonp([5],{LhbS:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,".confirm-send-modal[data-v-320a17f2]{padding:1.5em}","",{version:3,sources:["E:/dev/arkwebwallet/src/components/modals/ConfirmSendModal.vue"],names:[],mappings:"AACA,qCACE,aAAe,CAChB",file:"ConfirmSendModal.vue",sourcesContent:["\n.confirm-send-modal[data-v-320a17f2] {\r\n  padding: 1.5em;\n}\r\n"],sourceRoot:""}])},MTP8:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("Urns"),s=e.n(a),i=e("i8td"),o=function(t){e("ZIxM")},r=e("VU/8")(s.a,i.a,!1,o,"data-v-320a17f2",null);n.default=r.exports},Urns:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("zBK0");n.default={name:"confirmSendModal",data:function(){return{transaction:null}},computed:{amount:function(){return this.transaction.amount/Math.pow(10,8)},fee:function(){return this.transaction.fee/Math.pow(10,8)},networkType:function(){return this.$store.getters.networkType}},mounted:function(){},methods:{confirm:function(){this.$modal.hide("confirmSendModal"),this.$store.dispatch("setTransactionSending",!0),(0,a.sendTransaction)(this.transaction)},cancel:function(){this.$modal.hide("confirmSendModal")},beforeOpen:function(t){this.transaction=t.params.transaction},closed:function(t){}}}},ZIxM:function(t,n,e){var a=e("LhbS");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("3db323ca",a,!0)},i8td:function(t,n,e){"use strict";var a={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("modal",{attrs:{name:"confirmSendModal",height:"auto",adaptive:!0},on:{"before-open":t.beforeOpen,closed:t.closed}},[t.transaction?e("div",{staticClass:"ui container center aligned confirm-send-modal"},[e("div",{staticClass:"ui header"},[t._v("\n        Confirm transaction ?\n        "),3===t.transaction.type?e("div",{staticClass:"sub header"},[t._v("\n          Vote transaction\n        ")]):t._e()]),t._v(" "),e("div",{staticClass:"ui column grid container left aligned"},[e("div",{staticClass:"two column row"},[e("div",{staticClass:"column six wide"},[t._v("To")]),t._v(" "),e("div",{staticClass:"column ten wide"},[e("div",{staticClass:"ui small header"},[t._v(t._s(t.transaction.recipientId))])])]),t._v(" "),e("div",{staticClass:"two column row"},[e("div",{staticClass:"column six wide"},[t._v("Amount")]),t._v(" "),e("div",{staticClass:"column ten wide"},[e("div",{staticClass:"ui small header"},[t._v(t._s(t.amount)+" "+t._s(t.networkType.symbol))])])]),t._v(" "),e("div",{staticClass:"two column row"},[e("div",{staticClass:"column six wide"},[t._v("Fee")]),t._v(" "),e("div",{staticClass:"column ten wide"},[e("div",{staticClass:"ui small header"},[t._v(t._s(t.fee)+" "+t._s(t.networkType.symbol))])])])]),t._v(" "),e("div",{staticClass:"ui segment basic"},[e("button",{staticClass:"ui button green compact",on:{click:function(n){n.preventDefault(),t.confirm()}}},[e("i",{staticClass:"fa fa-check"}),t._v("\n          Yes\n        ")]),t._v(" "),e("button",{staticClass:"ui button red compact basic",on:{click:function(n){n.preventDefault(),t.cancel()}}},[e("i",{staticClass:"fa fa-remove"}),t._v("\n          No\n        ")])])]):t._e()])},staticRenderFns:[]};n.a=a},zBK0:function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(n,"__esModule",{value:!0}),n.sendTransaction=n.validateTransaction=void 0;var s=a(e("mvHQ")),i=e("wgAu"),o=e("gyMJ"),r=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n.default=t,n}(e("Yt4M")),c=a(e("mtWM")),d=a(e("IcnI")),l=a(e("rt3Z"));n.validateTransaction=function(t){var n=!0;return null!=t.passphrase&&""!==t.passphrase||((0,i.errorNotification)("Passphrase is not valid"),n=!1),l.default.crypto.validateAddress(t.transaction.to)||((0,i.errorNotification)("Address is not valid"),n=!1),n},n.sendTransaction=function(t){return r.getNetHash().then(function(n){var e=(0,s.default)({transactions:[t]});return c.default.post((0,o.getEndpoint)()+"/peer/transactions",e,{headers:{"Content-Type":"application/json",version:"0.3.0",port:1,nethash:n}}).then(function(t){return d.default.dispatch("setTransactionSending",!1),d.default.dispatch("toggleSendForm",!1),d.default.dispatch("toggleVoteForm",!1),(0,i.addNotification)({message:"Transaction sent",color:"green"}),t}).catch(function(t){if(d.default.dispatch("setTransactionSending",!1),(0,i.errorNotification)({message:t}),t)return t})})}}});