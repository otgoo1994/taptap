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
            Суралцагчид ихэвчлэн юун дээр алддаг вэ?
          </div>
          <div class="more">
            Хурдан бичиж сурах гэж оролдож байгаа хүмүүс ихэвчлэн компьютерийн
            гар руу харах нь элбэг. Гэхдээ энэ нь хамгийн түгээмэл гаргадаг алдаануудын нэг юм.
          </div>
        </div>
        <div class="col">
          <div class="title">
            Хэрхэн засах вэ?
          </div>
          <div class="more">
            Typing.mn-ыг ашиглахдаа компьютерийн <strong>гар руу огт харахгүйгээр</strong> хичээл дээр
            гарч байгаа гарын байрлалыг зөв дуурайж бичих хэрэгтэй. Энэ нь таны гар үндсэн байрлалаа илүү хурдан цээжлэх хамгийн <strong>энгийн</strong> бөгөөд <strong>үр дүнтэй</strong> арга юм.
          </div>
        </div>
      </section>

      <section class="about mb-100">
        <div class="col">
          <div class="title">
            Typing.mn нь хэрхэн ажилдаг вэ?
          </div>
          <div class="more">
            Бүтэн 200 оноо авах хүртлээ хичээл бүрийг дахин давт. Таниас тийм их зүйл шаардагдахгүй. Өдөрт хэдхэн минутаар, хэдхэн долоо хоног хичээллэхэд та мэргэжлийн болсон байх болно.
          </div>
        </div>
        <div class="col">
          <div class="title">
            Бүртгэл үүсгэх шаардлагатай юу?
          </div>
          <div class="more">
            Өөрийнхөө ахиц дэвшлийг хадгалахын тулд <strong>typing.mn</strong> дээр бүртгэл үүсгэх шаардлагатай. Энэ нь таны <strong>сошиал хаяг</strong> руу бид хандана гэсэн үг огт биш. Зөвхөн typing.mn дээр ашиглагдах таны өөрийн хаяг байх болно.
          </div>
        </div>
      </section>
    </div>
    <div class="full">
      <div class="home-container">
        <div class="header center top-50">Typing.mn-ыг ашиглах шалтгаан</div>
        <div class="grid">
          <div class="grid-item"> 
            <img class="image" src="@/assets/images/game.png" alt="">
            <div class="description">
              <strong>Энэ бол тоглоом юм</strong>. <br>Таныг бичиж сурахад илүү сонирхолтой, интерактив талаас нь хөгжүүлэлт хийгдсэн сургалт.
            </div>
          </div>
          <div class="grid-item"> 
            <img class="image" src="@/assets/images/hands.png" alt="">
            <div class="description">
              <strong>Гарын зөв байрлалын хөтөч</strong>. <br>Таныг бичих явцад үсэг, товч бүр дээр гарын зөв байрлалыг харуулах болно.
            </div>
          </div>
          <div class="grid-item">
            <img class="image" src="@/assets/images/vid.png" alt="">
            <div class="description">
              <strong>Интерактив туршлага олгоно</strong>. <br>Тоглоом, Видео, Текст гээд янз бүрийн бичиж сургах сорилтууд багтсан хөгжилтэй, сонирхолтой хичээлүүд. 
            </div>
          </div>
        </div>
      </div>
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
      banner: [
        {
          link: '/subjects',
          banner: 'homebanner.png',
          mobile: 'mhomebanner.png'
        },
        {
          link: '/subjects',
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
    resize() {
      if (window.innerWidth > 900) {
        this.isMobile = false;
        return;
      }
      this.isMobile = true;
    }
  },
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize);
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('resize', this.resize);
    next();
  }
}
</script>