<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>

<script>

	export default ({
		computed: {
			layout() {
				return "layout-" + ( this.$route.meta.layout || "default" ).toLowerCase() ;
			}
		},
	})
	
</script>

<style lang="scss">
body {
	// overflow-y: hidden;
	font-family: 'Montserrat', sans-serif;
}
</style>