<template>
	<div class="sign-in" style="padding: 0; height: 70vh; display: flex; width: 100vw; overflow: hidden; justify-content: center; align-items: center; flex-direction: column;">
		<div class="sign-in-container">

      <div>
        <el-input placeholder="Имэйл хаяг" @input="input" ref="email" clearable v-model="email"></el-input>
        <a-button @click="reset" type="primary" block class="login-form-button">
					<a-icon type="step-forward" class="google" theme="filled"/> Шинэ нууц үг авах
				</a-button>

        <div style="text-align: center; margin-top: 20px;">
					<router-link style="color: #000; " to="sign-in">Нэвтрэх цонх руу буцах</router-link>
				</div>
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

<script>
const year = new Date().getFullYear();
	export default ({
		data() {
			return {
				year,
        email: null
			}
		},
		async mounted() {
      
    },
    methods: {
      async reset() {
        if (!this.email || this.email == '') {
          return;
        }

        const data = await this.$_request('POST', this.$appUrl +'/user/reset-password', {email: this.email});
        if (data.status == 402) {
          this.$notification['warning']({
						message: 'Амжилтгүй',
						description: 'Бүртгэлгүй имэйл хаяг'
					});
          return;
        }

        this.$notification['success']({
          message: 'Амжилттай',
          description: 'Шинэ нууц үг илгээлээ'
        });
      }
    },
	})

</script>