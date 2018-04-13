// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Web3 from 'web3'
import router from './router'

Vue.config.productionTip = false;

window.addEventListener('load', function () {
	window.web3 = new Web3(Web3.givenProvider || (window.web3 || {}).currentProvider || 'http://localhost:8545');

	/* eslint-disable no-new */
	new Vue({
		el: '#app',
		router,
		template: '<App/>',
		components: {
			App
		}
	});
});
