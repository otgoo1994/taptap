<template>
	<div class="sign-in" style="padding: 0; height: 70vh; display: flex; width: 100vw; overflow: hidden; justify-content: center; align-items: center; flex-direction: column;">
		<div class="sign-in-container">
			<div>
        <div style="margin-bottom: 5px;">Таны бүртгүүлсэн имэйл хаяганд илгээсэн 6-н оронтой <strong>баталгаажуулах кодыг</strong> оруулна уу.</div>
				<el-input placeholder="Баталгаажуулах код" clearable v-model="token"></el-input>
        <div style="text-align: right; margin-top: 5px;">
          <el-link @click="sendAgain" :disabled="disabled" >{{text}}</el-link>
					<!-- <router-link style="color: #000;"  @click="sendAgain" to="reset-password"></router-link> -->
				</div>
				<a-button @click="confirmCode" type="primary" block class="login-form-button">
					<a-icon type="step-forward" class="google" theme="filled"/> Баталгаажуулах
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
        token: null,
        year,
        email: null,
        second: 60,
        disabled: false,
        timer: null,
        text: 'Дахин илгээх'
      }
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(this.timer);
      next();
    },
    mounted() {
      this.email = localStorage.getItem('verify-email');
      if (!this.email) {
        this.$router.push('/sign-in');
        return;
      }

      this.sendAgain();
    },
    methods: {
      async confirmCode() {
        const data = await this.$_request('POST', this.$appUrl +'/user/confirm-verify-code', {email: this.email, token: this.token});
        if (!data.find) {
          this.$notification['error']({
            message: 'Амжилтгүй',
            description: 'Баталгаажуулах код буруу'
          });
          return;
        }

        this.$notification['success']({
          message: 'Амжилттай',
          description: 'Баталгаажлаа'
        });

        localStorage.removeItem('verify-email');
        this.$router.push('/sign-in');
      },
      countdown() {
        if (this.second > 1) {
          this.second--;
          this.text = this.second + ' сек';
          return;
        }

        clearInterval(this.timer);
        this.text = 'Дахин илгээх';
        this.second = 60;
        this.disabled = false;
      },
      async sendAgain() {
        const data = await this.$_request('POST', this.$appUrl +'/user/send-verify-code', {email: this.email});
        if (data.status === 200) {
          this.disabled = true;
          this.text = this.second + ' сек';
          this.timer = setInterval(this.countdown, 1000);

          this.$notification['success']({
            message: 'Амжилттай',
            description: 'Баталгаажуулах код илгээгдлээ.'
          });
          return;
        }
        
        this.$notification['error']({
          message: 'Амжилтгүй',
          description: 'Илгээж чадсангүй.'
        });
      }
    }
	})

</script>