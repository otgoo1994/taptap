import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		meta: {
			title: 'typing.mn',
			auth: false
		},
		component: () => import('../views/Home.vue')
	},
	{
		path: '/profile',
		name: 'Хувийн мэдээлэл',
		layout: "dashboard",
		meta: {
			title: 'typing.mn',
			auth: true
		},
		component: () => import('../views/Profile.vue'),
	},
	{
		path: '/test-speed',
		name: 'Нүүр хуудас',
		layout: "dashboard",
		meta: {
			title: 'typing.mn',
			auth: false
		},
		component: () => import('../views/Dashboard.vue'),
	},
	{
		path: '/terms',
		name: 'Үйлчилгээний нөхцөл',
		meta: {
			title: 'typing.mn',
			auth: false
		},
		component: () => import('../views/terms.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
	},
	{
		path: '/subjects',
		name: 'Хичээл',
		layout: "dashboard",
		meta: {
			title: 'typing.mn',
			auth: true
		},
		component: () => import('../views/Tables.vue'),
	},
	{
		path: '/games',
		name: 'Зугаа',
		layout: "dashboard",
		meta: {
			title: 'typing.mn',
			auth: true
		},
		component: () => import('../views/GameList.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/rtl',
		name: 'RTL',
		layout: "dashboard-rtl",
		meta: {
			layoutClass: 'dashboard-rtl',
		},
		component: () => import('../views/RTL.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Profile.vue'),
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		meta: {
			title: 'Typing - Нэвтрэх',
			auth: false
		},
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/verify',
		name: 'Verify',
		meta: {
			title: 'Typing - Баталгаажуулалт',
			auth: false
		},
		component: () => import('../views/ConfirmEmail.vue'),
	},
	{
		path: '/program-1/:id',
		name: 'intro',
		// layout: "dashboard",
		meta: {
			title: 'Typing - Шинэ үсэг',
			auth: true
		},
		component: () => import('../views/intro.vue'),
	},
	{
		path: '/program-2/:id',
		name: 'boxed',
		// layout: "dashboard",
		meta: {
			title: 'Typing - Шинэ үсэг дадлага',
			auth: true
		},
		component: () => import('../views/boxed.vue'),
	},
	{
		path: '/program-3/:id',
		name: 'review',
		// layout: "dashboard",
		meta: {
			title: 'Typing - Давтлага',
			auth: true
		},
		component: () => import('../views/review.vue'),
	},
	{
		path: '/program-4/:id',
		name: 'hold',
		// layout: "dashboard",
		meta: {
			title: 'Typing - Нэг гарын дадлагжуулалт',
			auth: true
		},
		component: () => import('../views/hold.vue'),
	},
	{
		path: '/program-5/:id',
		name: 'video',
		// layout: "dashboard",
		meta: {
			title: 'Typing - Видео заавар',
			auth: true
		},
		component: () => import('../views/Video.vue'),
	},
	{
		path: '/floppy.game/:id',
		name: 'floppy-bird',
		// layout: "dashboard",
		meta: {
			title: 'Typing - Floppy bird',
			auth: true,
			game: true
		},
		component: () => import('../views/Floppy.vue'),
	},
	{
		path: '/pool.game/:id',
		name: 'pool-game',
		// layout: "dashboard",
		meta: {
			title: 'Typing - Pool',
			auth: true,
			game: true
		},
		component: () => import('../views/Pool.vue'),
	},
	{
		path: '/price',
		name: 'price',
		layout: "dashboard",
		meta: {
			title: 'Typing - Эрх сунгах',
			auth: false
		},
		component: () => import('../views/Price.vue'),
	},
	{
		path: '/use-coupon',
		name: 'usecoupon',
		layout: "dashboard",
		meta: {
			title: 'Typing - Хөнгөлөлтийн карт',
			auth: false
		},
		component: () => import('../views/Coupon.vue'),
	},
	{
		path: '/order/:invoiceId',
		name: 'order',
		layout: "dashboard",
		meta: {
			title: 'Typing - Гүйлгээний мэдээлэл',
			auth: false
		},
		component: () => import('../views/Order.vue'),
	},
	{
		path: '/reset-password',
		name: 'reset-password',
		meta: {
			title: 'Typing - Нууц үг сэргээх',
			auth: false
		},
		component: () => import('../views/resetPassword.vue'),
	}
]

function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const auth = {
	loggedIn() {
		var token = localStorage.getItem("token");
		if (token) {
			return true;
		} else {
			return false;
		}
		// return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
}

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true

	//console.log('authrequired', authrequired, to.name)
	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'Sign-In') {
				router.push('/test-speed');
				return false
			} else { 
				next()
			}	
		} else {
			if(to.name !== 'Sign-In'){
				router.push('/sign-in');
				return false
			}
			next()
		}
	} else {
		next();
	}
})

export default router
