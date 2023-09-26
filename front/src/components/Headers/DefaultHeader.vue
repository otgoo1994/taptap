<template>

	<!-- Layout Header ( Navbar ) -->
	<a-layout-header style="background-color: #323437;">
		<div class="header-col header-brand">
			<!-- <router-link to="/"><h6 style="color: #fff;">Typing.mn</h6></router-link> -->
			<div style="margin-top: 20px;"><router-link to="/test-speed"><img style="width: 40%; height: auto;" src="@/assets/logo.svg" alt=""></router-link></div>
		</div>
	</a-layout-header>
	<!-- / Layout Header ( Navbar ) -->
</template>

<script>

	export default ({
		data() {
			return {
				// Collapse navigation value.
				// Binded model property for "Collapsible Navigation Menu" collapsed status .
				collapseNav: 0,
			}
		},
	})

</script>

<style lang="scss" scoped>

	.nav-link svg {
		margin-right: 5px;
		vertical-align: middle;
	}
	.nav-link span {
		vertical-align: middle;
	}
	.ant-menu-submenu-popup {
		width: 100%;
	}

</style>