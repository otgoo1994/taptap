<template>
  <div class="home-page">
    <section class="home">
      <a-carousel>
        <div v-for="(item, index) in banner" :key="'banner' + index" class="banner">
          <img :src="$appUrl +'/images/banner/'+item.banner" alt="">
          <router-link :to="item.link">
            <div class="button">Хичээл эхлүүлэх</div>
          </router-link>
        </div>
      </a-carousel>
    </section>

    <section class="">
      
    </section>
    <section class="footer">
      
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banner: [
        {
          link: '/subjects',
          banner: 'homebanner.png'
        },
        {
          link: '/subjects',
          banner: 'homebanner2.png'
        }
      ]
    }
  }
}
</script>