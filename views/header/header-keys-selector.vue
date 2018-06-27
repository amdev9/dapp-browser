<template>
	<div class="d-inline-block">
		<b-dropdown toggle-class="inverse d-flex p-0 pr-4 align-items-center">
			<template slot="button-content">
				<img src="/images/icons/key.svg" class="svg">
				<span class="dropdown-target pr-2 pl-2">{{currentKey}}</span>
			</template>
			<b-dropdown-item-button :key="item" v-for="item in keyList" @click.prevent="selectKey(item)">{{item}}</b-dropdown-item-button>
			<b-dropdown-divider></b-dropdown-divider>
			<b-dropdown-item-button v-lang.header.create_key v-b-modal.Create_Key></b-dropdown-item-button>
		</b-dropdown>

		<b-modal id="Create_Key" :title="translate('header').create_key_popup.title" @shown="onShow" @ok="onKeyCreate">
			<form @submit.stop.prevent="onKeyCreate">
				<b-form-input type="text"
							  ref="keyNameInput"
							  :placeholder="translate('header').create_key_popup.key_name_placeholder"
							  v-model="keyName"></b-form-input>
			</form>
		</b-modal>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		data() {
			return {
				keyName: ''
			}
		},
		computed: {
			...mapGetters('keys', {
				currentKey: 'currentKey',
				keyList: 'keyList'
			})
		},
		methods: {
			...mapActions('keys', {
				selectKey: 'selectKey',
				createKey: 'createKey'
			}),
			onKeyCreate() {
				this.createKey(this.keyName);
				this.$root.$emit('bv::hide::modal','Create_Key')
			},
			onShow() {
				this.keyName = '';
				setTimeout(() => {
					this.$refs.keyNameInput.focus();
					}, 400);
			}
		},
	}
</script>
