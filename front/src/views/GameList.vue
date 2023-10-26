<template>
	<div class="container">
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6 pt-10">
				<a-row :gutter="20">
					<a-col :span="24" :xl="6" :lg="8" :xxl="4" class="mb-24 less-card" style="cursor: pointer;">
						<a-card :bordered="false" class="widget-1 game" @click="goGame('pool')" style="background-color: #FFFFFF">
							<div class="box zoom-in" :style="{'position': 'relative'}">
								<div class="lesson-box">
									<img src="@/assets/images/games/tubes/rules.png" :style="{'width': '100%', 'height': 'auto'}">
								</div>
								<div class="lesson-name">Усан сан</div>
								<div class="lesson-desc">Усан сан</div>
							</div>
						</a-card>
					</a-col>  
				</a-row>
      </div>
    </div>
	</div>
</template>

<script>

	export default ({
		data() {
			return {
			}
		},
		mounted() {
			Event.$emit('navbarname', '');
		},
		methods: {
			goGame(game) {
				this.$router.push('/' + game + '.game');
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