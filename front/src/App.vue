<template>
	<div id="app">
		<component v-if="layout" :is="layout">
			<router-view />
		</component>
		<router-view  v-else/>

		<div class="loader" :hidden="!loader">
				<!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
					<rect fill="#e15b64" x="9.5" y="9.5" width="38" height="38" rx="7" ry="7">
						<animate attributeName="x" dur="0.9900990099009901s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="9.5;52.5;52.5;52.5;52.5;9.5;9.5;9.5;9.5" begin="-0.9075907590759076s"></animate>
						<animate attributeName="y" dur="0.9900990099009901s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="9.5;52.5;52.5;52.5;52.5;9.5;9.5;9.5;9.5" begin="-0.6600660066006601s"></animate>
						</rect><rect fill="#f8b26a" x="9.5" y="9.5" width="38" height="38" rx="7" ry="7">
						<animate attributeName="x" dur="0.9900990099009901s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="9.5;52.5;52.5;52.5;52.5;9.5;9.5;9.5;9.5" begin="-0.5775577557755776s"></animate>
						<animate attributeName="y" dur="0.9900990099009901s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="9.5;52.5;52.5;52.5;52.5;9.5;9.5;9.5;9.5" begin="-0.33003300330033003s"></animate>
						</rect><rect fill="#abbd81" x="9.5" y="9.5" width="38" height="38" rx="7" ry="7">
						<animate attributeName="x" dur="0.9900990099009901s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="9.5;52.5;52.5;52.5;52.5;9.5;9.5;9.5;9.5" begin="-0.24752475247524752s"></animate>
						<animate attributeName="y" dur="0.9900990099009901s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="9.5;52.5;52.5;52.5;52.5;9.5;9.5;9.5;9.5" begin="0s"></animate>
					</rect>
				</svg> -->

				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
					<g transform="translate(20 20)">
						<rect x="-15" y="-15" width="30" height="30" fill="#e15b64">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.4s"></animateTransform>
						</rect></g>
					<g transform="translate(50 20)">
						<rect x="-15" y="-15" width="30" height="30" fill="#f47e60">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.3s"></animateTransform>
						</rect></g>
					<g transform="translate(80 20)">
						<rect x="-15" y="-15" width="30" height="30" fill="#f8b26a">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.2s"></animateTransform>
						</rect></g>
					<g transform="translate(20 50)">
						<rect x="-15" y="-15" width="30" height="30" fill="#f47e60">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.3s"></animateTransform>
						</rect></g>
					<g transform="translate(50 50)">
						<rect x="-15" y="-15" width="30" height="30" fill="#f8b26a">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.2s"></animateTransform>
						</rect></g>
					<g transform="translate(80 50)">
						<rect x="-15" y="-15" width="30" height="30" fill="#abbd81">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.1s"></animateTransform>
						</rect></g>
					<g transform="translate(20 80)">
						<rect x="-15" y="-15" width="30" height="30" fill="#f8b26a">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.2s"></animateTransform>
						</rect></g>
					<g transform="translate(50 80)">
						<rect x="-15" y="-15" width="30" height="30" fill="#abbd81">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.1s"></animateTransform>
						</rect></g>
					<g transform="translate(80 80)">
						<rect x="-15" y="-15" width="30" height="30" fill="#849b87">
							<animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="0s"></animateTransform>
						</rect></g>

					</svg>
			</div>
	</div>
</template>

<script>

	export default ({
		data() {
			return {
				loader: false
			}
		},
		computed: {
			layout() {
				if (this.$route.meta.game) {
					return false;
				}
				
				return "layout-" + ( this.$route.meta.layout || "default" ).toLowerCase() ;
			}
		},
		created () {
			Event.$on('set-loader', (value) => {
				this.loader = value;
			});
		},
	})
	
</script>

<style lang="scss">
body {
	font-family: 'Montserrat', sans-serif;
}

.loader {
	position: fixed;
	left: 0;
	top: 0;
	// background-color: #FFFFFF;
	background-color: #FFFFFF;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	z-index: 1000;
	transition: 0.5s;

	svg {
		width: 2.5%;
		height: auto;
	}

}
</style>