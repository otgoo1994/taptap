<template>
	<div class="sign-in" style="height: 70vh; display: flex; justify-conten: center;">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle" style="width: 100%;">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h3 class="mb-15">Нэвтрэх</h3>
				<h6 class="font-regular text-muted">Бүртгэлтэй имэйл болон нууц үгээ оруулна уу</h6>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="" :colon="false">
						<a-input 
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Имэйлээ оруулна уу!' }] },
						]" placeholder="Имэйл" />
					</a-form-item>
					<a-form-item class="mb-5" label="" :colon="false">
						<a-input
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Нууц үгээ оруулна уу!' }] },
						]" type="password" placeholder="Нууц үг" />
					</a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							НЭВТРЭХ
						</a-button>
					</a-form-item>
				</a-form>
			</a-col>
			<!-- / Sign In Form Column -->

			<!-- Sign In Image Column -->
			<!-- <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
				<img src="images/img-signin.jpg" alt="">
			</a-col> -->
			<!-- Sign In Image Column -->

		</a-row>
		
	</div>
</template>

<script>

	export default ({
		data() {
			return {
				// Binded model property for "Sign In Form" switch button for "Remember Me" .
				rememberMe: true,
			}
		},
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		methods: {
			// Handles input validation after submission.
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if ( !err ) {
						var dep = this;
						this.$axios({
							method: 'post',
							url: this.$appUrl + `/admin/login`,
							data: {
								email: values.email,
								password: values.password
							}
						}).then(data => {
							console.log('Received values of form: ', data.data.result) ;
							if(data.data.result == 200) {
								this.$notification['success']({
									message: 'Амжилттай',
									description: 'Системд амжилттай нэвтэрлээ'
								});
								localStorage.token = data.data.token;
              	localStorage.user = JSON.stringify(data.data.user);
								Event.$emit('logged-new-user');
								dep.$router.push('/lessons');

							} else {
								this.$notification['error']({
									message: 'Амжилтгүй',
									description: data.data.data
								});
							}
						});
					}
				});
			},
		},
	})

</script>