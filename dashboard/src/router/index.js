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
		meta: {
			title: 'typing.mn',
			auth: true
		},
		redirect: '/lessons',
	},
	{
		path: '/lessons',
		name: 'Нүүр хуудас',
		layout: "dashboard",
		meta: {
			title: 'typing.mn',
			auth: true
		},
		component: () => import('../views/Dashboard.vue'),
	},
	{
		path: '/add-lesson',
		name: 'Хичээл бүртгэх',
		layout: "dashboard",
		meta: {
			title: 'typing.mn',
			auth: true
		},
		component: () => import('../views/addLesson.vue'),
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
