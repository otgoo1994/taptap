<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>

		<div class="loader" :hidden="!loader">
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
	// overflow-y: hidden;
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