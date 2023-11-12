<template>
	
	<!-- Main Sidebar -->
	<component :is="navbarFixed ? 'a-affix' : 'div'" :offset-top="top">

		<!-- Layout Header -->
		<a-layout-header>
			<a-row type="flex">

				<!-- Header Breadcrumbs & Title Column -->
				<a-col :span="24" :md="6">
					<!-- Header Page Title -->
					<div class="ant-page-header-heading">
						<span class="ant-page-header-heading-title">{{ this.bartitle }}</span>
					</div>
					<!-- / Header Page Title -->

				</a-col>
				<!-- / Header Breadcrumbs & Title Column -->

				<!-- Header Control Column -->
				<a-col :span="24" :md="18" class="header-control">

					<!-- Header Control Buttons -->
					<a-dropdown :trigger="['click']" overlayClassName="header-notifications-dropdown" :getPopupContainer="() => wrapper">
						<a-badge :count="countNot">
							<a class="ant-dropdown-link" @click="e => e.preventDefault()">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z" fill="#111827"/>
									<path d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z" fill="#111827"/>
								</svg>
							</a>
						</a-badge>
						
						<a-list item-layout="horizontal" class="header-notifications-list" :data-source="notificationsData" slot="overlay">
							<a-list-item slot="renderItem" slot-scope="item" v-bind:class="{'not-read': !item.readIt}" @click="readNotify(item)">
								<a-list-item-meta>
									<template #description>
										<div style="text-align: right;">
											<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z" fill="#111827"/>
											</svg>
											<span>{{ $_method.timeSince(new Date(item.created_at).addHours(7)) }} ago</span>
										</div>
									</template>
									<div slot="title" class="notify" v-html="item.message"></div>
								</a-list-item-meta>
							</a-list-item>
						</a-list>
					</a-dropdown>
					<!-- <a-button type="link" ref="secondarySidebarTriggerBtn" @click="$emit('toggleSettingsDrawer', true)">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" fill="#111827"/>
						</svg>
					</a-button> -->
					<a-button type="link" class="sidebar-toggler" @click="$emit('toggleSidebar', ! sidebarCollapsed) , resizeEventHandler()">
						<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
					</a-button>
					<router-link v-if="!user" to="/sign-in" class="btn-sign-in" @click="e => e.preventDefault()">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z" fill="#111827"/>
						</svg>
						<span>Log in</span>
					</router-link>
					<a class="btn-sign-in" href="javascript:;" v-else style="text-align: center; line-height: 100%;">
						<span class="el-dropdown-link">
							<b>{{expiredDate}}</b><br> хоног
						</span>
					</a>
					<a class="btn-sign-in" href="javascript:;" v-if="user">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link">
								<span>Сайн уу? {{this.user.name}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="profile">Хувийн мэдээлэл</el-dropdown-item>
								<el-dropdown-item v-if="user.isCanInvite" command="invite">Найзаа урих</el-dropdown-item>
								<el-dropdown-item v-if="user.isCanInvite" command="invite">Cost: <strong>{{user.cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}}</strong></el-dropdown-item>
								<el-dropdown-item command="signout" divided>Гарах</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<!-- toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") -->
					</a>
					<!-- / Header Control Buttons -->


				</a-col>
				<!-- / Header Control Column -->

			</a-row>
		</a-layout-header>
		<!--  /Layout Header -->

		<a-modal v-model="inviteModal" title="Найзаа урих">
			<a-space direction="vertical" style="width: 100%;">
				<a-input v-model="inviteEmail" placeholder="Илгээх имэйл хаягаа оруулна уу" allow-clear />
			</a-space>

			<template #footer>
        <a-button key="back">Буцах</a-button>
        <a-button key="submit" @click="sendInvite" type="primary" :loading="loading">Илгээх</a-button>
      </template>
    </a-modal>

	</component>
	<!-- / Main Sidebar -->

</template>

<script>
	export default ({
		props: {
			// Header fixed status.
			navbarFixed: {
				type: Boolean,
				default: false,
			},

			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				top: 0,
				searchLoading: false,
				wrapper: document.body,
				bartitle: 'Typing.mn',
				user: null,
				inviteModal: false,
				inviteEmail: '',
				loading: false,
				notificationsData: []
			}
		},
		computed: {
			expiredDate() {
				const day = new Date(this.user.end_at).getTime() - Date.now();
				const d = Math.ceil(day / 1000 / 86400)
				return d > 0 ? d : 0;
			},
			countNot() {
				let count  = 0;
				this.notificationsData.forEach(element => {
					if (!element.readIt) {
						count++;
					}
				});

				return count;
			}
		},
		methods: {
			async readNotify(row) {
				row.readIt = true;
			},
			async getUserNotify() {
				const data = await this.$_request('POST', this.$appUrl +'/user/get-user-notify');

				if (Number.isInteger(data)) { 
					if (data === 402) { this.$router.push('/price'); return; }
					return;
				}

				this.notificationsData = data.t_list;
			},
			async sendInvite() {
				this.loading = true;
				const data = await this.$_request('POST', this.$appUrl +'/user/send-invite', {email: this.inviteEmail, user: this.user});

				this.loading = false;
				this.inviteModal = false;

				if (Number.isInteger(data)) { 
						if (data === 402) { this.$router.push('/price'); return; }
						return;
				}

				if (data.status === 409) {
					this.$notification['error']({
						message: 'Амжилтгүй',
						description: 'Аль хэдийн бүртгэлтэй хэрэглэгч'
					});
					return;
				}

				this.$notification['success']({
					message: 'Амжилттай',
					description: 'Урилга илгээгдлээ'
				});
				
			},
			handleCommand(command) {
				command == 'signout' ? this.signout() : ( command == 'invite' ?  this.inviteModal = true :  this.profile());
			},
			resizeEventHandler(){
				this.top = this.top ? 0 : -0.01 ;
				// To refresh the header if the window size changes.
				// Reason for the negative value is that it doesn't activate the affix unless
				// scroller is anywhere but the top of the page.
			},
			onSearch(value){
			},
			checkUser() {
				const user = JSON.parse(localStorage.getItem('user'));
				if (!user) {
					return;
				}

				this.user = user;
			},
			profile() {
				this.$router.push('/profile');
			},
			signout() {
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				this.user = null;
				this.$router.push('/');
			},
			changeUserProperty(user) {
				localStorage.user = JSON.stringify(user);
				this.user = user;
			},
			async getUserInfo() {
				const user = JSON.parse(localStorage.getItem('user'));
				if (!user) {
					return;
				}

				const data = await this.$_request('POST', this.$appUrl +`/user/get-user-info`);
				if (!data) { return; }
				this.user = data.user;
				localStorage.user = JSON.stringify(data.user);
			}
		},
		mounted: function(){
			// Set the wrapper to the proper element, layout wrapper.
			this.wrapper = document.getElementById('layout-dashboard') ;

			this.$_event('navbarname', (name) => {
				this.bartitle = name
			});

			this.$_event('changeUserProperty', this.changeUserProperty);
			// this.checkUser();
		},
		created() {
			// Registering window resize event listener to fix affix elements size
			// error while resizing.
			window.addEventListener("resize", this.resizeEventHandler);
			this.getUserInfo();
			this.getUserNotify();
		},
		destroyed() {
			// Removing window resize event listener.
			window.removeEventListener("resize", this.resizeEventHandler);
		},
	})

</script>

<style lang="scss" scoped>
.notify {
	text-align: right; 
	width: 220px !important;
	margin-bottom: 10px;
	cursor: pointer;
	color: #737373;
	font-weight: 500;
}

.not-read {
	cursor: pointer;
	background-color: #F0F2F4;
}
</style>