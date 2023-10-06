<template>
	<div class="sign-in" style="padding: 0; height: 70vh; display: flex; width: 100vw; overflow: hidden; justify-content: center; align-items: center; flex-direction: column;">
		<div class="sign-in-container">
			<div class="description">
				<div>Доорх товч дээр дарж <b>ФЭЙСБҮҮК</b>, <b>ГҮҮГЛЭ</b> хаягаараа нэвтэрнэ үү.</div>
				<div><span class="alert">АНХААР </span>: та ЯГ <b>ХУВИЙН</b> АККАУНТААР нэвтрэх шаардлагатайг анхаарна уу.</div>
			</div>
			<div class="sign-up-gateways">
				<a-button @click="logInWithFacebook" type="primary" block class="login-form-button" style="background: #212121; border: #212121;">
					<a-icon type="facebook" theme="filled" /> Facebook-ээр нэвтрэх
				</a-button>

				<a-button @click="loginWithGoogle" type="primary" block class="login-form-button" style="background: #D0463B; border: #D0463B;">
					<a-icon type="google-square" class="google" theme="filled"/> Google-ээр нэвтрэх
				</a-button>

				<div id="signinDiv"></div>
				<!-- <g-signin-button
					:params="googleSignInParams"
					@success="onSignInSuccess"
					@error="onSignInError">
					Sign in with Google
				</g-signin-button> -->
				<!-- <div class="g-signin2" data-width="300" data-height="200" data-longtitle="true"></div> -->
			</div>
			<div class="description">
				<div><span class="alert">САНАМЖ </span>: Фэйсбүүк, Гүүглээр нэвтрэх үед манай сайтын зүгээс таны хувийн аккаунтын <span class="alert">нэвтрэх нэр, нууц үг</span> зэрэг мэдээлэлд хандах боломжгүй. Учир нь нэвтрэх үйлдэл нь манай сайтаас гарч <span class="alert">Facebook, Google</span> сайт дээр хийгддэг.</div>
			</div>
			<div class="description">
				<div>
					<el-checkbox v-model="checked">Би <router-link to="/terms" style="color: #e2b714;">үйлчилгээний нөхцөлийг</router-link> зөвшөөр байна</el-checkbox>
				</div>
			</div>
		</div>
		<div style="width: 100%; position: fixed; bottom: 0;">
			<a-layout-footer>
				<a-row type="flex">
					<a-col :span="24" :md="12">

						<!-- Footer Copyright Notice -->
						<p class="copyright">
							© {{year}},
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
							</svg> -аар бүтээв.
						</p>
						<!-- / Footer Copyright Notice -->

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
				// Binded model property for "Sign In Form" switch button for "Remember Me" .
				rememberMe: true,
				year,
				checked: false,
				googleSignInParams: {
					client_id: '61370778317-7d7bp5u4hja7gck3vi8gfn47608bupb6.apps.googleusercontent.com'
				}
			}
		},
		async mounted() {
			await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
			await this.loadGoogleSDK(document, "script", "google-jssdk");
			// await this.initGoogle();
		},
		methods: {
			loginWithGoogle() {
				const opt = {
						prompt: 'select_account',
						scope: 'profile email'
				};

				gapi.auth2.getAuthInstance().grantOfflineAccess(opt).then(async function(e) {
					console.log(e);
				});

				// console.log(google.accounts.o, '===');
			},
			async initGoogle() {
				window.gapi.load('auth2', function() {
					window.gapi.auth2.init({
						client_id: '61370778317-7d7bp5u4hja7gck3vi8gfn47608bupb6.apps.googleusercontent.com'
					})
				});

				// google.accounts.id.initialize({
				// 	client_id: '61370778317-7d7bp5u4hja7gck3vi8gfn47608bupb6.apps.googleusercontent.com'
				// });
				// google.accounts.id.prompt();
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
			async loadGoogleSDK(d, s, id) {
				var js,
					fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {
					return;
				}
				
				js = d.createElement(s);
				js.id = id;
				js.defer = true;
				js.async = true;
				// js.src = "https://accounts.google.com/gsi/client";
				js.src = "https://apis.google.com/js/platform.js";
				fjs.parentNode.insertBefore(js, fjs);

				let timer = setInterval(() => {
					if (window.gapi) {
						clearInterval(timer);
						this.initGoogle();
					}
				}, 10);
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
						}).then(function(data) {
							clone.withFacebookLogin(data);
						});
					} else {
					}
				},{scope: 'public_profile,email'});
			},
			async withFacebookLogin(data) {
				const response = await this.$_request('POST', this.$appUrl +'/user/facebook-login', {user: data.data});
				if (!response) {
					console.log('something went wrong====');
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