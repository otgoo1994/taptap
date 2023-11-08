<template>

	<!-- Layout Header ( Navbar ) -->
	<a-layout-header style="position: relative;">
		<div class="header-col header-brand">
			<!-- <router-link to="/"><h6 style="color: #fff;">Typing.mn</h6></router-link> -->
			<div><router-link to="/"><img style="width: 10%; height: auto;" src="@/assets/logo.png" alt=""></router-link></div>
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

	.header-brand {
		position: absolute !important;
		bottom: 0 !important;
		transform: translateY(50%) !important;
	}

</style>