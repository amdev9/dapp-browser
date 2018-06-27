const state = {
	list: [],
	currentKey: '',
};

const getters =  {
	keyList(state, getters, rootState) {
		return state.list;
	},

	currentKey(state, getters, rootState) {
		return state.currentKey;
	}
}

const actions = {
	getList ({commit, state}) {
		fetch('/keys').then(list => list.json()).then(list => {
			commit('setList', list);

			if (!state.currentKey) {
				commit('selectKey', list[0]);
			}
		})
	},
	selectKey ({commit, state}, key) {
		commit('selectKey', key);
	},
	createKey({commit, state}, name) {
		fetch('/keys/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
			})
		})
			.then(res => res.json())
			.then(result => {
				if (result) {
					commit('addKey', name);
				}
			})
	}
}

const mutations = {
	selectKey(state, key) {
		state.currentKey = key;
	},
	setList(state, list) {
		state.list = list;
	},
	addKey(state, key) {
		state.list.push(key);
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}