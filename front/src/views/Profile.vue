<template>
	<div>
		<div class="profile-nav-bg" :style="{'background-image': 'url(\''+require('@/assets/images/keyboard_banner.png')+'\')', 'background-size': 'cover', 'margin-top': 0}"></div>
		
		<a-card :bordered="false" class="card-profile-head" :bodyStyle="{padding: 0,}" v-if="user">
			<template #title>
				<a-row type="flex" align="middle">
					<a-col :span="24" :md="12" class="col-info">
						<a-avatar :size="74" shape="square" :src="user.image" />
						<div class="avatar-info">
							<h4 class="font-semibold m-0">{{user.name}}</h4>
							<p>{{user.email}}</p>
						</div>
					</a-col>
					<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
						<a-radio-group v-model="profileHeaderBtns" size="small">
							<a-radio-button value="overview" @click="tab=1">ХУВИЙН МЭДЭЭЛЭЛ</a-radio-button>
							<a-radio-button value="teams" @click="tab=2">Нууц үг солих</a-radio-button>
						</a-radio-group>
					</a-col>
				</a-row>
			</template>
		</a-card>

		<a-row type="flex" :gutter="24" v-if="tab === 1">
			<a-col :span="24" :md="8" class="mb-24" v-if="user">
				<a-card :bordered="false" class="header-solid h-full card-profile-information" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}">
					<template #title>
						<h6 class="font-semibold m-0">Хувийн мэдээлэл</h6>
					</template>
					<a-button @click="showEdit" type="link" slot="extra" v-if="!edit">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path class="fill-muted" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" fill="#111827"/>
							<path class="fill-muted" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" fill="#111827"/>
						</svg>
					</a-button>
					<hr class="mb-25">
					<a-descriptions :title="user.name" :column="1" v-if="!edit">
						<a-descriptions-item label="Нэр">
							{{user.name}}
						</a-descriptions-item>
						<a-descriptions-item label="Утасны дугаар">
							(976) {{user.phone}}
						</a-descriptions-item>
						<a-descriptions-item label="Имэйл">
							{{user.email}}
						</a-descriptions-item>
						<a-descriptions-item label="Сошиал">
							<a href="#" class="mx-5 px-5">
								<a-icon type="twitter" style="color: #3EA1EC;" />
							</a>
							<a href="#" class="mx-5 px-5">
								<a-icon type="facebook" style="color: #344E86" />
							</a>
							<a href="#" class="mx-5 px-5">
								<a-icon type="instagram" style="color: #E1306C" />
							</a>
						</a-descriptions-item>
					</a-descriptions>
					<div v-if="edit">
						<a-input v-model="subUser.name" placeholder="Нэр" />
						<a-input style="margin-top: 10px;" v-model="subUser.phone" placeholder="Утасны дугаар" />
						<a-input style="margin-top: 10px;" v-model="subUser.email" placeholder="Имэйл" disabled />
						<a-button style="margin-top: 10px; width: 100%;" @click="updateInfo" type="dashed" danger>Хадгалах</a-button>
						<a-button style="margin-top: 10px; width: 100%;" @click="edit = false" type="link" danger>Болих</a-button>
					</div>
				</a-card>
			</a-col>
			
			<a-col :span="24" :md="4" class="mb-24" v-if="user">
				<a-card :bordered="false" class="header-solid h-full card-profile-information" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}">
					<template #title>
						<h6 class="font-semibold m-0">Бусад мэдээлэл</h6>
					</template>
					<hr class="mb-25">
					<a-descriptions title="WPM" :column="1">
						<a-descriptions-item label="Нийт оноо">
							{{user.point}} оноо
						</a-descriptions-item>
						<a-descriptions-item label="Үзсэн хичээл">
							{{user.lesson}} хичээл
						</a-descriptions-item>
						<a-descriptions-item label="Дундаж">
							{{user.avg_wpm}} WPM
						</a-descriptions-item>
						<a-descriptions-item label="Дээд">
							{{user.record_wpm}} WPM
						</a-descriptions-item>
					</a-descriptions>
				</a-card>
			</a-col>

			<a-col :span="24" :md="12" class="mb-24" v-if="user">
				<a-card :bordered="false" class="header-solid h-full card-profile-information" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}">
					<template #title>
						<h6 class="font-semibold m-0">Эрх сунгалтууд</h6>
					</template>
					<hr class="mb-25">
					<a-descriptions :column="1" class="box-container">
						<div class="orders">
							<table>
								<tr v-for="(items, index) in orders" :key="index">
									<td><router-link :to="'/order/' + items.invoice_id"><a-tag style="cursor: pointer;" color="orange">{{items.invoice_id}}</a-tag></router-link></td>
									<td>{{new Date(items.created_at).toLocaleDateString()}}</td>
									<td>{{new Date(items.updated_at).toLocaleDateString()}}</td>
									<td><a-tag :color="items.status === 'PAID' ? 'green' : 'red'">{{items.status}}</a-tag></td>
									<td><strong>{{items.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}}</strong></td>
								</tr>
							</table>
						</div>
					</a-descriptions>
				</a-card>
			</a-col>
		</a-row>

		<a-row type="flex" class="reset-password" :gutter="24" v-if="tab === 2">
			<div>
				<a-input-password size="large" v-model="password.old" placeholder="Хуучин нууц үгээ оруулна уу"></a-input-password>
				<a-input-password size="large" style="margin-top: 10px;" v-model="password.new" placeholder="Шинэ нууц үгээ оруулна уу"></a-input-password>
				<a-input-password size="large" style="margin-top: 10px;" v-model="password.repeat" placeholder="Давтан нууц үгээ оруулна уу"></a-input-password>

				<a-button @click="changePassword" style="margin-top: 10px;" type="primary" block class="login-form-button">
					<a-icon type="step-forward" class="google" theme="filled"/> Үргэлжлүүлэх
				</a-button>
			</div>
		</a-row>

	</div>
</template>

<script>
	export default ({
		data() {
			return {
				profileHeaderBtns: 'overview',
				user: null,
				subUser: {},
				tab: 1,
				password: {
					old: '',
					new: '',
					repeat: ''
				},
				edit: false,
				orders: null
			}
		},
		methods: {
			async updateInfo() {
				const data = await this.$_request('POST', this.$appUrl +`/user/update-user-info`, {user: this.subUser});

				if (data.status === 200) {
					this.$notification['success']({
						message: 'Амжилттай',
						description: 'Мэдээлэл шинэчлэгдлээ'
					});

					this.user = this.subUser;
					localStorage.setItem('user', JSON.stringify(this.user));
					this.edit = false;
					return;
				}

				this.$notification['error']({
					message: 'Амжилтгүй'
				});
			},
			showEdit() {
				this.subUser = Object.assign({}, this.user)
				this.edit = true;
			},
			async getOrders() {
				const data = await this.$_request('POST', this.$appUrl +`/user/get-order-list`);
				if (data.status === 200) {
					this.orders = data.order;	
				}
			},
			getData() {
				const user = JSON.parse(localStorage.getItem('user'));
				if (!user) {
					return;
				}

				this.user = user;
				this.subUser = user;
			},
			async changePassword() {

				if (this.password.new !== this.password.repeat) {
					this.$notification['error']({
						message: 'Амжилтгүй',
						description: 'Нууц үг таарахгүй байна'
					});

					return;
				}
				const data = await this.$_request('POST', this.$appUrl +`/user/change-password`, {password: this.password});
				console.log(data.status, '=status=');
				if (data.status != 200) {
					this.$notification['error']({
						message: 'Амжилтгүй'
					});
					return;
				}

				this.$notification['success']({
					message: 'Амжилттай',
					description: 'Нууц үг солигдлоо'
				});

				this.password = { old: '', new: '', repeat: '' };
				this.tab = 1;
			}
		},
		mounted() {
			this.getData();
			this.getOrders();
		},
	})

</script>

<style lang="scss" scoped>
@import "../scss/utils" ;
.reset-password {
	display: flex;
	justify-content: center;
	margin: 0;
	margin-top: 100px;

	div {
		width: 30%;
	}
}

.login-form-button {
		background: #D0463B; 
		border: #D0463B; 
		border-radius: 10px;
		margin-top: 10px;
		// @include vw-convert-desktop('margin-top', 5px);
		// @include vw-convert-desktop('height', 50px);
		height: 50px;

		@include mobile {
			// @include vw-convert-mobile('margin-top', 5px);
			margin-top: 10px;
			@include vw-convert-mobile('height', 80px);
		}
	}

	.box-container {
		max-height: 300px;
		overflow-y: auto;
	}

	.orders {

	}
</style>