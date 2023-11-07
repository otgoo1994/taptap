<template>
	<div class="sign-in" style="padding: 0; height: 70vh; display: flex; width: 100vw; overflow: hidden; justify-content: center; align-items: center; flex-direction: column;">
		<div class="sign-in-container">
			<div v-if="!register">
				<form @submit.prevent="login">
					<el-input placeholder="Имэйл хаяг" @input="input" ref="email" clearable v-model="email" v-if="!confirmed"></el-input>
					<el-input placeholder="Нууц үг" show-password v-model="password" v-else></el-input>
					<div style="text-align: right;">
						<router-link style="color: #000; " to="reset-password">Нууц үгээ мартсан?</router-link>
					</div>
				</form>

				<a-button @click="login" type="primary" block class="login-form-button">
					<a-icon type="step-forward" class="google" theme="filled"/> Үргэлжлүүлэх
				</a-button>

				<div v-if="!confirmed" class="or-divider">ЭСВЭЛ</div>

				<a-button v-if="!confirmed" @click="logInWithFacebook" type="primary" block class="login-form-button" style="background: #212121; border: #212121;">
					<a-icon type="facebook" theme="filled" /> Facebook-ээр нэвтрэх
				</a-button>

				<div v-if="!confirmed" class="description">
					<div>
						<el-checkbox v-model="checked">Би <router-link to="/terms" style="color: #e2b714;">үйлчилгээний нөхцөлийг</router-link> зөвшөөр байна</el-checkbox>
					</div>
				</div>
			</div>
			<div v-else>
				<div :style="{'text-align': 'center', 'margin-bottom': '10px'}">Таны <strong>имэйл хаяг</strong> бүртгэлгүй байна. <br>Бүтгэлээ үүсгэнэ үү.</div>
				<form @submit.prevent="userRegister">
					<el-input style="margin-top: 10px;" placeholder="Нэр" clearable v-model="name"></el-input>
					<el-input style="margin-top: 10px;" placeholder="Password" v-model="email" disabled></el-input>
					<el-input style="margin-top: 10px;" placeholder="Нууц үг" show-password v-model="password"></el-input>
					<el-input style="margin-top: 10px;" placeholder="Давтан нууц үг" show-password v-model="repassword"></el-input>
				</form>
				<a-button @click="userRegister" type="primary" block class="login-form-button">
					<a-icon type="step-forward" class="google" theme="filled"/> Үргэлжлүүлэх
				</a-button>
			</div>
		</div>
		<div style="width: 100%; position: fixed; bottom: 0;">
			<a-layout-footer>
				<a-row type="flex">
					<a-col :span="24" :md="12">

						<p class="copyright">
							© {{year}},
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
							</svg> -аар бүтээв.
						</p>

					</a-col>
					<a-col :span="24" :md="12" class="footer-control pr-20" align="right" style="color: #fff">
						Typing.mn
					</a-col>
				</a-row>
			</a-layout-footer>
		</div>
	</div>
</template>
<style lang="scss">
	// .ant-btn-primary.google svg path { fill: #000000; }
</style>

<script>
const year = new Date().getFullYear();
	export default ({
		data() {
			return {
				rememberMe: true,
				name: null,
				email: '',
				password: null,
				repassword: null,
				year,
				checked: false,
				confirmed: false,
				register: false
			}
		},
		async mounted() {
			await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
		},
		methods: {
			async userRegister() {

				console.log('asdfasfasf');
				if (!this.name || !this.password) {
					return;
				}

				if (this.password != this.repassword) {
					this.$notification['error']({
						message: 'Амжилтгүй',
						description: 'Нууц үг тохирохгүй байна.'
					});

					return;
				}

				const data = await this.$_request('POST', this.$appUrl +'/user/register', {email: this.email, name: this.name, password: this.password});
				if (data.status == 200) {
					localStorage.setItem('verify-email', this.email);
					this.$router.push('/verify');
				}
			},
			onEnter() {
				alert('asdfasdf');
			},
			input() {
				this.$refs.email.$el.classList.remove('error');
			},
			async login() {

				if (!this.confirmed) {
					const reg = await this.validateEmail(this.email);
					if (!reg) {
						this.$notification['error']({
							message: 'Амжилтгүй',
							description: 'Имэйлээ оруулна уу'
						});

						this.$refs.email.$el.classList.add('error');
						return;
					}

					if (!this.checked) {
						this.$notification['error']({
							message: 'Амжилтгүй',
							description: 'Үйлчилгээний нөхцөлийг зөвшөөрнө үү'
						});
						return;
					}

					const data = await this.$_request('POST', this.$appUrl +'/user/check-user-email', {email: this.email});
					if (data.user.length) {

						if (data.user[0].active) {
							this.confirmed = true;
							return;
						}

						localStorage.setItem('verify-email', this.email);
						this.$router.push('/verify');
						return;
					}

					this.register = true;
					return;
				}
				
				const data = await this.$_request('POST', this.$appUrl +'/user/login', {email: this.email, password: this.password});
				if (!data.user.id) {
					this.$notification['error']({
						message: 'Амжилтгүй',
						description: 'Имэйл эсвэл нууц үг буруу'
					});
					return;
				}

				localStorage.token = data.token;
				localStorage.user = JSON.stringify(data.user);

				this.$router.push('/test-speed');
				Event.$emit('member');
				return;

			},
			async validateEmail(email) {
				return String(email)
					.toLowerCase()
					.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
			},
			async loadFacebookSDK(d, s, id) {
				var js,
					fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {
					return;
				}
				
				js = d.createElement(s);
				js.id = id;
				js.src = "https://connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
				return true; 
			},
			async initFacebook() {
				window.fbAsyncInit = function() {
					window.FB.init({
						appId: "152502995393771",
						cookie: true,
						version: "v13.0"
					});
				};
				return true;
			},
			async logInWithFacebook() {
				if (!this.checked) {
					this.$notification['error']({
						message: 'Амжилтгүй',
						description: 'Үйлчилгээний нөхцөлийг зөвшөөрнө үү'
					});
					return;
				}

				let clone = this;
				FB.login(function(response) {
					if (response.authResponse) {
						clone.$axios({
							method: 'GET',
							url: `https://graph.facebook.com/v9.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${response.authResponse.accessToken}`,
							// url: `https://graph.facebook.com/v9.0/me?fields=id&access_token=${response.authResponse.accessToken}`,
						}).then(function(data) {
							clone.withFacebookLogin(data);
						});
					} else {
					}
				},{scope: 'public_profile,email'});
			},
			async withFacebookLogin(data) {
				const response = await this.$_request('POST', this.$appUrl +'/user/facebook-login', {user: data.data});
				if (Number.isInteger(data)) { 
          if (data === 402) { this.$router.push('/price'); return; }
          return;
      	}

				if (response.status === 200) {
					this.$notification['success']({
						message: 'Амжилттай',
						description: 'Системд амжилттай нэвтэрлээ'
					});

					localStorage.token = response.token;
          localStorage.user = JSON.stringify(response.data);

					this.$router.push('/test-speed');
					Event.$emit('member');
					return;
				}

				this.$notification['error']({
					message: 'Амжилтгүй'
				});

				
			}
		},
	})

</script>