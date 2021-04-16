import Swal from 'sweetalert2'
export const state = () => ({
	token: null,
	// url: 'https://api.quwi.com/v2'
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
			this.$axios.defaults.headers.common["Authorization"] = `Bearer ${localToken}`;
		}else{
			this.$router.push({ name: 'login' })
		}
		this.$axios.defaults.baseURL = process.env.baseUrl;
	},
}
export const actions = {
	getToken({ commit }, login) {
		if (!localStorage.getItem('token')){

			this.$axios.post(process.env.baseUrl+"/auth/login", {
				email: login.email,
				password: login.password,
			})
			.then((res) => {

				commit('setToken', res.data.token)
			})
			.catch(err=>{
				let status = err.response.status;
				if (status==417){
					Swal.fire({
					  title: 'Error!',
					  text: 'Data validation error',
					  icon: 'error',
					  confirmButtonText: 'Cool'
					})
				}else{
					Swal.fire({
					  title: 'Error!',
					  text: 'Ops... something went wrong',
					  icon: 'error',
					  confirmButtonText: 'Cool'
					})
				}
			})
		}
		else{ 
			commit('setToken')
		}
	}
}