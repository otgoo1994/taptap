<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

		<!-- Header Background Image -->
		<div class="profile-nav-bg" :style="{'background-image': 'url(\''+require('@/assets/images/keyboard_banner.png')+'\')', 'background-size': 'cover', 'margin-top': 0}"></div>
		<!-- / Header Background Image -->

		<!-- User Profile Card -->
		<a-card :bordered="false" class="card-profile-head" :bodyStyle="{padding: 0,}" v-if="user">
			<template #title>
				<a-row type="flex" align="middle">
					<a-col :span="24" :md="12" class="col-info">
						<a-avatar :size="74" shape="square" :src="user.image" />
						<div class="avatar-info">
							<h4 class="font-semibold m-0">{{user.name}}</h4>
							<p>{{user.email}}</p>
						</div>
					</a-col>
					<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
						<a-radio-group v-model="profileHeaderBtns" size="small">
							<a-radio-button value="overview">ХУВИЙН МЭДЭЭЛЭЛ</a-radio-button>
							<a-radio-button value="teams">ЗАСВАРЛАХ</a-radio-button>
						</a-radio-group>
					</a-col>
				</a-row>
			</template>
		</a-card>
		<!-- User Profile Card -->

		<a-row type="flex" :gutter="24">

			<!-- Profile Information Column -->
			<a-col :span="24" :md="8" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full card-profile-information" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}">
					<template #title>
						<h6 class="font-semibold m-0">Profile Information</h6>
					</template>
					<a-button type="link" slot="extra">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path class="fill-muted" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" fill="#111827"/>
							<path class="fill-muted" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" fill="#111827"/>
						</svg>
					</a-button>
					<hr class="mb-25">
					<a-descriptions title="Oliver Liam" :column="1">
						<a-descriptions-item label="Full Name">
							Sarah Emily Jacob
						</a-descriptions-item>
						<a-descriptions-item label="Mobile">
							(44) 123 1234 123
						</a-descriptions-item>
						<a-descriptions-item label="Email">
							sarahjacob@mail.com
						</a-descriptions-item>
						<a-descriptions-item label="Location">
							USA
						</a-descriptions-item>
						<a-descriptions-item label="Social">
							<a href="#" class="mx-5 px-5">
								<a-icon type="twitter" style="color: #3EA1EC;" />
							</a>
							<a href="#" class="mx-5 px-5">
								<a-icon type="facebook" style="color: #344E86" />
							</a>
							<a href="#" class="mx-5 px-5">
								<a-icon type="instagram" style="color: #E1306C" />
							</a>
						</a-descriptions-item>
					</a-descriptions>
				</a-card>

			</a-col>
			<!-- / Profile Information Column -->

			<!-- Platform Settings Column -->
			<a-col :span="24" :md="8" class="mb-24">

				<!-- Platform Settings Card -->
				<CardPlatformSettings></CardPlatformSettings>
				<!-- / Platform Settings Card -->

			</a-col>
			<!-- / Platform Settings Column -->

			
			
			<!-- Conversations Column -->
			<a-col :span="24" :md="8" class="mb-24">
			
				<!-- Conversations Card -->
				<CardConversations
					:data="conversationsData"
				></CardConversations>
				<!-- / Conversations Card -->

			</a-col>
			<!-- / Conversations Column -->

		</a-row>
		
		<!-- Projects Card -->
		<a-card :bordered="false" class="header-solid h-full mb-24" :bodyStyle="{paddingTop: '14px'}">
			<template #title>
				<h6 class="font-semibold">Projects</h6>			
				<p>Architects design houses</p>	
			</template>

			<a-row type="flex" :gutter="[24,24]" align="stretch">

				<!-- Project Column -->
				<a-col :span="24" :md="12" :xl="6" v-for="(project, index) in projects" :key="index">
					<CardProject
						:id="project.id"
						:title="project.title"
						:content="project.content"
						:cover="project.cover"
						:team="project.team"
					></CardProject>
				</a-col>
				<!-- / Project Column -->

				<!-- Project Column -->
				<a-col :span="24" :md="12" :xl="6">

					<!-- Project Upload Component -->
					<a-upload
						name="avatar"
						list-type="picture-card"
						class="projects-uploader"
						:show-upload-list="false"
					>
						<img v-if="false" src="" alt="avatar" />
						<div v-else>
							<a-icon v-if="false" type="loading" />
							<svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z" fill="#111827"/>
							</svg>

							<div class="ant-upload-text font-semibold text-dark">
								Upload New Project
							</div>
						</div>
					</a-upload>
					<!-- / Project Upload Component -->

				</a-col>
				<!-- / Project Column -->

			</a-row>
		</a-card>
		<!-- / Projects Card -->

	</div>
</template>

<script>

	import CardPlatformSettings from "../components/Cards/CardPlatformSettings"
	import CardProfileInformation from "../components/Cards/CardProfileInformation"
	import CardConversations from "../components/Cards/CardConversations"
	import CardProject from "../components/Cards/CardProject"

	// Conversation's list data.
	const conversationsData = [
		{
			id: "1",
			title: "Sophie B.",
			code: "Hi! I need more information…",
			avatar: "images/face-3.jpg",
		},
		{
			id: "2",
			title: "Anne Marie",
			code: "Awesome work, can you…",
			avatar: "images/face-4.jpg",
		},
		{
			id: "3",
			title: "Ivan",
			code: "About files I can…",
			avatar: "images/face-5.jpeg",
		},
		{
			id: "4",
			title: "Peterson",
			code: "Have a great afternoon…",
			avatar: "images/face-6.jpeg",
		},
		{
			id: "5",
			title: "Nick Daniel",
			code: "Hi! I need more information…",
			avatar: "images/face-2.jpg",
		},
	] ;

	// Project cards data
	const projects = [
		{
			id: 1,
			title: "Modern",
			content: "As Uber works through a huge amount of internal management turmoil.",
			cover: "images/home-decor-3.jpeg",
			team: [
				"images/face-1.jpg",
				"images/face-4.jpg",
				"images/face-2.jpg",
				"images/face-3.jpg",
			],
		},
		{
			id: 2,
			title: "Scandinavian",
			content: "Music is something that every person has his or her own specific opinion about.",
			cover: "images/home-decor-2.jpeg",
			team: [
				"images/face-1.jpg",
				"images/face-4.jpg",
				"images/face-2.jpg",
				"images/face-3.jpg",
			],
		},
		{
			id: 3,
			title: "Minimalist",
			content: "Different people have different taste, and various types of music, Zimbali Resort.",
			cover: "images/home-decor-1.jpeg",
			team: [
				"images/face-1.jpg",
				"images/face-4.jpg",
				"images/face-2.jpg",
				"images/face-3.jpg",
			],
		},
	] ;

	export default ({
		components: {
			CardPlatformSettings,
			CardProfileInformation,
			CardConversations,
			CardProject,
		},
		data() {
			return {
				profileHeaderBtns: 'overview',
				conversationsData,
				projects,
				user: null
			}
		},
		methods: {
			getData() {
				const user = JSON.parse(localStorage.getItem('user'));
				if (!user) {
					return;
				}

				this.user = user;
			}
		},
		mounted() {
			this.getData();
		},
	})

</script>

<style lang="scss">
</style>