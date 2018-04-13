<template>
	<div class="todo">
		<h1>TODOList</h1>
		<ul class="list">
			<li v-for="(todo, index) in todos" :key="index">
				{{index+1}}. {{todo}} <button type="button" @click.prevent="removeItem(index)">&times;</button>
			</li>
		</ul>
		<form @submit.prevent="addNewItem">
			<input ref="text" type="text" v-model="newItem" autofocus>
			<input type="submit" value="Add">
		</form>
	</div>
</template>

<script>
	import ToDo from "@/js/todo";

	export default {
		name: "todo",
		data() {
			return {
				todos: [],
				newItem: ""
			};
		},
		methods: {
			addNewItem: function () {

				if (this.newItem == "") {
					return;
				}

				ToDo.create(this.newItem).then(() => {
					return this.loadAll();
				});

				this.newItem = "";
			},
			removeItem: function (id) {
				return ToDo.destroy(id).then(() => {
					return this.loadAll();
				});
			},
			loadAll: function () {
				return ToDo.getAll().then(todos => {
					this.todos = todos.map(x => window.web3.toUtf8(x));
				});
			}
		},
		updated: function () {
			this.$nextTick(function () {
				this.$refs.text.focus();
			});
		},
		created: function () {

			var accs = window.web3.eth.getAccounts((e, accounts) => {
				this.defaultAccount = accounts[0];
				window.web3.eth.defaultAccount = accounts[0];
			});

			return ToDo.init().then(() => {
				return this.loadAll();
			});
		}
	};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	ul.list {
		list-style-type: none;
		padding: 0;
	}

	ul.list li {
		display: block;
		margin: 10px;
	}

</style>
