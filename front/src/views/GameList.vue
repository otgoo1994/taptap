<template>
	<div class="container game">

		<h5>Урамшуулалтай уралдаан</h5>
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6 pt-10">
				<div class="game-list">
					<div v-for="(item, index) in list" :key="'t' + index" :bordered="false" class="widget">
						<table>
							<tr>
								<td>
									<img class="poster" :src="$appUrl + '/images/race/' + item.image" alt="poster-image">
								</td>
								<td>je;;p</td>
								<td>je;;p</td>
							</tr>
						</table>
					</div>
				</div>
      </div>
    </div>
	</div>
</template>

<script>

	export default ({
		data() {
			return {
				list: [
					{ 
						image: 'giveway.png',
						id: 1,
					},
					{ 
						image: 'giveway.png',
						id: 1,
					},
				]
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