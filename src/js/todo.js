import contract from 'truffle-contract'
import ToDoContract from '@contracts/ToDo.json'

const ToDo = {

	contract: null,
	instance: null,
	gasPrice: '5',

	init: function () {

		this.contract = contract(ToDoContract);
		this.contract.setProvider(window.web3.currentProvider);

		return this.contract.deployed()
			.then(instance => {
				this.instance = instance;
			}).catch(e => {
				console.log(e);
			});
	},

	getAll: function () {
		return this.instance.getAll({
				from: window.web3.eth.defaultAccount,
				gas: Math.floor(Math.random() * 50000) + 30000
			})
			.catch(e => {
				console.log(e);
			});
	},

	create: function (item) {
		return this.instance.create(window.web3.toHex(item), {
				from: window.web3.eth.defaultAccount,
				gasPrice: window.web3.toWei(this.gasPrice, 'gwei')
			})
			.catch(e => {
				console.log(e);
			});
	},

	destroy: function (id) {
		return this.instance.destroy(id, {
				from: window.web3.eth.defaultAccount,
				gas: 50000
			})
			.catch(e => {
				console.log(e);
			});
	}
};

export default ToDo;
