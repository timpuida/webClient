export const state = () => ({
	token: null,
	url: 'https://api.quwi.com/v2'
})

export const mutations = {
	setToken(state, value) {
		let localToken = localStorage.getItem('token')
		if(value){
			state.token = value;
			localStorage.setItem('token',value);
			this.$router.push('/')

		}else if( localToken ){
			state.token = localToken;
			this.$router.push('/')
			this.$axios.defaults.headers.common["Authorization"] = `Bearer ${localToken}`;
		}else{
			this.$router.push({ name: 'login' })
		}
		this.$axios.defaults.baseURL = 'https://api.quwi.com/v2';
	},
}
export const actions = {
	getToken({ commit }, login) {
		if (!localStorage.getItem('token')){

			this.$axios.post("https://api.quwi.com/v2/auth/login", {
				email: login.email,
				password: login.password,
			})
			.then((res) => {
				this.$axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

				commit('setToken', res.data.token)
			})
			.catch(console.log)
		}
		else{ 
			commit('setToken')
		}
	}
}
