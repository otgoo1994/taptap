<template>
	<div class="container game">
		<h5>Уралдаан</h5>
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6 pt-10">
				<div class="game-list">
					<div v-for="(item, index) in list" :key="'t' + index" :bordered="false" class="widget">
						<table @click="goCurrentRace(item)">
							<tr>
								<td style="width: 10%; padding-left: 2%;">{{index+1}}</td>
								<td>{{item.title.toUpperCase()}}</td>
								<td>{{new Date(item.created_at).toLocaleDateString('en-us', { hour: "numeric", minute: "numeric", weekday:"long", year:"numeric", month:"short", day:"numeric"}).toUpperCase()}}</td>
								<td>
									<svg fill="rgba(0, 0, 0, 0.65)" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
								</td>
							</tr>
						</table>
					</div>
				</div>
      		</div>
    	</div>

		<a-modal ref="modalRef" v-model="open" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk">
			<el-input style="margin-top: 30px;" placeholder="Нэр" v-model="name" clearable autocomplete="off"></el-input>
			<!-- <el-input style="margin-top: 10px;" placeholder="Пин" v-model="password" clearable type="password" autocomplete="off"></el-input> -->
		</a-modal>
	</div>
</template>

<script>

	export default ({
		data() {
			return {
				list: [],
				open: false,
				name: '',
				password: '',
				current: null
			}
		},
		mounted() {
			Event.$emit('navbarname', '');
			this.getRaceList();
		},
		methods: {
			goCurrentRace(game) {
				if (game.pin) {
					this.current = game;
					this.open = true;
				}
			},
			handleOk() {

				if (this.name == '') {
					this.$notification['error']({
						message: 'Амжилтгүй',
						description: 'Бүтэн нэрээ оруулна уу'
					});
					return;
				}

				this.$router.push('/game/' + this.current.race_id + '/' + this.name);
			},
			async getRaceList() {
				const data = await this.$_request('POST', this.$appUrl +'/text/get-race-text-list');
				if (Number.isInteger(data)) {
					if (data === 402) { this.$router.push('/price'); return; }
					this.$router.push('/subjects'); return;
				}

				this.list = data.data;
			}
		}
	})

</script>
<style scoped lang="scss">
	.container {
		width: 80%;
		margin: auto;
	}
</style>