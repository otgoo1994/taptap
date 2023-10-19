<style lang="scss" scoped>
@import "../scss/utils" ;

.wrapper {
  width: 100%;
  height: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: relative;

  .contain {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @include mobile {
      width: 80%;
    }

    .promo-input {
      @include vw-convert-desktop('font-size', 20px);
      @include vw-convert-desktop('padding', 20px 30px);
      border-radius: 8px;
      width: 100%;
      text-align: center;
      border-color: #394554;
      color: #394554;
      text-transform: uppercase;

      @include mobile {
        @include vw-convert-mobile('font-size', 30px);
        @include vw-convert-mobile('padding', 20px 30px);
      }
    }

    .submit {
      width: 100%;
      background-color: #394554;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
      border-radius: 10px;
      color: #FFFFFF;
      font-weight: 700;
      @include vw-convert-desktop('height', 50px);
      @include vw-convert-desktop('margin-top', 10px);

      @include mobile {
        @include vw-convert-mobile('height', 50px);
        @include vw-convert-mobile('margin-top', 10px);
      }
    }

    .description {
      font-size: 15px;
      margin-bottom: 10px;
    }
    .alert {
			color: #e2b714;
			font-weight: 700;
		}
  }
}

</style>
<template>
  <div class='wrapper'>
    <div class="contain">
      <div class="description">
        <span class="alert">Санамж</span>: Та купон кодоо зөвхөн <b>нэг удаа</b> ашиглах боломжтой. 
      </div>
      <input type="text" v-model="coupon" class="promo-input" placeholder="Купон кодоо оруулна уу">
      <div @click="useCoupon" class="submit">
        АШИГЛАХ
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coupon: ''
    }
  },
  mounted() {
    Event.$emit('navbarname', 'Хөнгөлтийн карт');
  },
  methods: {
    async useCoupon() {
      if (this.coupon == '') { return; }

      var token = localStorage.getItem("token");
      if (!token) { 
        this.$router.push('/sign-in'); 
        
        this.$notification['error']({
          message: 'Амжилтгүй',
          description: 'Нэвтэрсэн байх шаардлагатай'
        });

        return;
      }
      
      const data = await this.$_request('POST', this.$appUrl +`/purchase/use-coupon`, {coupon: this.coupon.toUpperCase()});
        if (data.result == 'success') {
        
        Event.$emit('changeUserProperty', data.user);
        this.$notification['success']({
          message: 'Амжилттай',
          description: 'Купон код ашиглагдлаа'
        });
        return;
      }
  
      this.$notification['error']({
        message: 'Амжилтгүй',
        description: 'Идэвхитэй купон код олдсонгүй'
      });
    }
  },
}
</script>