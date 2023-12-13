<template>
  <div class="home-page">
    <section class="home">
      <a-carousel>
        <div v-for="(item, index) in banner" :key="'banner' + index" class="banner">
          <img v-if="!isMobile" :src="$appUrl +'/images/banner/'+item.banner" alt="">
          <img v-else :src="$appUrl +'/images/banner/'+item.mobile" alt="">
          <router-link :to="item.link">
            <div class="button">Хичээл эхлүүлэх</div>
          </router-link>
        </div>
      </a-carousel>
    </section>

    <div class="home-container">
      <div class="header">Нийтлэг ойлголт</div>
      <section class="about">
        <div class="col">
          <div class="title">
            1. Суралцагчид ихэвчлэн юун дээр алддаг вэ?
          </div>
          <div class="more">
            Хурдан бичиж сурах гэж оролдож байгаа хүмүүс ихэвчлэн компьютерийн
            гар руу харах нь элбэг. Гэхдээ энэ нь хамгийн түгээмэл гаргадаг алдаануудын нэг юм.
          </div>
        </div>
        <div class="col">
          <div class="title">
            2. Хэрхэн засах вэ?
          </div>
          <div class="more">
            Typing.mn-ыг ашиглахдаа компьютерийн <span>гар руу огт харахгүйгээр</span> хичээл дээр
            гарч байгаа гарын байрлалыг зөв дуурайж бичих хэрэгтэй. Энэ нь таны гар үндсэн байрлалаа илүү хурдан цээжлэх хамгийн <span>энгийн</span> бөгөөд <span>үр дүнтэй</span> арга юм.
          </div>
        </div>
      </section>

      <section class="about mb-100">
        <div class="col">
          <div class="title">
            3. Typing.mn нь хэрхэн ажилдаг вэ?
          </div>
          <div class="more">
            Бүтэн 200 оноо авах хүртлээ хичээл бүрийг дахин давт. Таниас тийм их зүйл шаардагдахгүй. Өдөрт хэдхэн минутаар, хэдхэн долоо хоног хичээллэхэд та мэргэжлийн болсон байх болно.
          </div>
        </div>
        <div class="col">
          <div class="title">
            4. Бүртгэл үүсгэх шаардлагатай юу?
          </div>
          <div class="more">
            Өөрийнхөө ахиц дэвшлийг хадгалахын тулд <span>typing.mn</span> дээр бүртгэл үүсгэх шаардлагатай. Энэ нь таны <span>сошиал хаяг</span> руу бид хандана гэсэн үг огт биш. Зөвхөн typing.mn дээр ашиглагдах таны өөрийн хаяг байх болно.
          </div>
        </div>
      </section>
    </div>
    <div class="full">
      <div class="home-container">
        <div class="header center top-50">Typing.mn-ыг ашиглах шалтгаан</div>
        <div class="grid">
          <div class="grid-item"> 
            <!-- <img class="image" src="@/assets/images/game.png" alt=""> -->
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>
            <div class="description">
              <strong>Энэ бол тоглоом юм</strong>. <br>Таныг бичиж сурахад илүү сонирхолтой, интерактив талаас нь хөгжүүлэлт хийгдсэн сургалт.
            </div>
          </div>
          <div class="grid-item"> 
            <!-- <img class="image" src="@/assets/images/hands.png" alt=""> -->
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M544 160l-.1 72.6c-.1 52.2-24 101-64 133.1c.1-1.9 .1-3.8 .1-5.7v-8c0-71.8-37-138.6-97.9-176.7l-60.2-37.6c-8.6-5.4-17.9-8.4-27.3-9.4L248.7 48.8c-6.6-11.5-2.7-26.2 8.8-32.8s26.2-2.7 32.8 8.8l78 135.1c3.3 5.7 10.7 7.7 16.4 4.4s7.7-10.7 4.4-16.4l-62-107.4c-6.6-11.5-2.7-26.2 8.8-32.8S362 5 368.6 16.5l68 117.8 0 0 0 0 43.3 75L480 160c0-17.7 14.4-32 32-32s32 14.4 32 32zM243.9 88.5L268.5 131c-13.9 4.5-26.4 13.7-34.7 27c-.9 1.4-1.7 2.9-2.5 4.4l-28.9-50c-6.6-11.5-2.7-26.2 8.8-32.8s26.2-2.7 32.8 8.8zm-46.4 63.7l26.8 46.4c.6 6 2.1 11.8 4.3 17.4H224 210.7l0 0H179l-23-39.8c-6.6-11.5-2.7-26.2 8.8-32.8s26.2-2.7 32.8 8.8zM260.9 175c9.4-15 29.1-19.5 44.1-10.2l60.2 37.6C416.7 234.7 448 291.2 448 352v8c0 83.9-68.1 152-152 152H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h92c6.6 0 12-5.4 12-12s-5.4-12-12-12H88c-13.3 0-24-10.7-24-24s10.7-24 24-24H212c6.6 0 12-5.4 12-12s-5.4-12-12-12H56c-13.3 0-24-10.7-24-24s10.7-24 24-24H212c6.6 0 12-5.4 12-12s-5.4-12-12-12H88c-13.3 0-24-10.7-24-24s10.7-24 24-24H224l0 0 0 0h93.2L271 219.1c-15-9.4-19.5-29.1-10.2-44.1z"/></svg>
            <div class="description">
              <strong>Гарын зөв байрлалын хөтөч</strong>. <br>Таныг бичих явцад үсэг, товч бүр дээр гарын зөв байрлалыг харуулах болно.
            </div>
          </div>
          <div class="grid-item">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg>
            <!-- <img class="image" src="@/assets/images/vid.png" alt=""> -->
            <div class="description">
              <strong>Интерактив туршлага олгоно</strong>. <br>Тоглоом, Видео, Текст гээд янз бүрийн бичиж сургах сорилтууд багтсан хөгжилтэй, сонирхолтой хичээлүүд. 
            </div>
          </div>
        </div>

        <router-link to="/test-speed">
          <div class="button">Хичээл эхлүүлэх</div>
        </router-link>

      </div>
    </div>
    <div class="gototop" @click="scrollTo" :hidden="top">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
    </div>
    <a-layout-footer>
		<a-row type="flex">
			<a-col :span="12" :md="12">

				<!-- Footer Copyright Notice -->
				<p class="copyright">
					© {{year}},
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
					</svg> -аар бүтээв.
				</p>
				<!-- / Footer Copyright Notice -->

			</a-col>
			<a-col :span="12" :md="12" class="footer-control pr-20">
				Typing.mn
				<!-- Гео интегрэйшн ХХК -->
			</a-col>
		</a-row>
	</a-layout-footer>
  </div>
</template>
<script>
const year = new Date().getFullYear();
export default {
  data() {
    return {
      year,
      top: true,
      banner: [
        {
          link: '/test-speed',
          banner: 'homebanner.png',
          mobile: 'mhomebanner.png'
        },
        {
          link: '/test-speed',
          banner: 'homebanner2.png',
          mobile: 'mhomebanner2.png'
        }
      ],
      isMobile: false
    }
  },
  computed: {

  },
  methods: {
    scrollTo() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    resize() {
      if (window.innerWidth > 900) {
        this.isMobile = false;
        return;
      }
      this.isMobile = true;
    },
    scroll() {
      if (window.pageYOffset <= 0) {
        this.top = true;
        return;
      }
      this.top = false;
    }
  },
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', this.scroll);
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('scroll', this.scroll);
    next();
  }
}
</script>