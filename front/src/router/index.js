import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/test-speed',
	},
	{
		path: '/test-speed',
		name: 'Нүүр хуудас',
		layout: "dashboard",
		meta: {
			title: 'TapTap - Арван хуруугаар шивэх дасгал',
			auth: false
		},
		component: () => import('../views/Dashboard.vue'),
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
			title: 'TapTap - Арван хуруугаар шивэх дасгал',
			auth: true
		},
		component: () => import('../views/Tables.vue'),
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
			title: 'TapTap - Нэвтрэх',
			auth: false
		},
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
			title: 'TapTap - Бүртгүүлэх',
			auth: false
		},
		component: () => import('../views/Sign-Up.vue'),
	},
	{
		path: '/program-1/:id',
		name: 'intro',
		layout: "dashboard",
		meta: {
			title: 'TapTap - Шинэ үсэг',
			auth: false
		},
		component: () => import('../views/intro.vue'),
	},
	{
		path: '/program-2/:id',
		name: 'boxed',
		layout: "dashboard",
		meta: {
			title: 'TapTap - Шинэ үсэг дадлага',
			auth: false
		},
		component: () => import('../views/boxed.vue'),
	},
	{
		path: '/program-3/:id',
		name: 'review',
		layout: "dashboard",
		meta: {
			title: 'TapTap - Давтлага',
			auth: false
		},
		component: () => import('../views/review.vue'),
	},
	{
		path: '/program-4/:id',
		name: 'hold',
		layout: "dashboard",
		meta: {
			title: 'TapTap - Нэг гарын дадлагжуулалт',
			auth: false
		},
		component: () => import('../views/hold.vue'),
	},
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
	mode: 'hash',
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
