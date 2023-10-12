<style lang="scss" scoped>
@import "../scss/utils" ;
$accent-color: #33c4b6;

.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    @include vw-convert-desktop('font-size', 15px);
    font-size: 15px;
    transform: translate(-50%, -50%);
}
.package {
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  @include vw-convert-desktop('width', 250px);
  @include vw-convert-desktop('height', 380px);
  
  border: 3px solid #FFFFFF;
  @include vw-convert-desktop('border-radius', 7px);
  display: inline-block;
  @include vw-convert-desktop('padding', 24px);
  text-align: center;
  float: left;
  transition: margin-top .5s linear;
  position: relative;
  @include vw-convert-desktop('margin-right', 11px);
  background-color: #FFFFFF;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  @include mobile {
    @include vw-convert-mobile('width', 250px);
    @include vw-convert-mobile('height', 380px);
  }
  
  &:hover {
    margin-top: -30px;
    transition: margin-top .3s linear;
  }
}
.name {
    color: #565656;
    font-weight: 700;
    font-size: 1.5rem;
    @include vw-convert-desktop('margin-top', -5px);
    margin-top: -5px;
}
.price {
  @include vw-convert-desktop('margin-top', 7px);
    font-weight: bold;
}
hr {
    background-color: #dedede;
    border: none;
    @include vw-convert-desktop('height', 1px);
}
.trial {
    font-size: .9rem;
    font-weight: 600;
    @include vw-convert-desktop('padding', 2px 21px 2px 21px);
    color: $accent-color;
    border: 1px solid #e4e4e4;
    display: inline-block;
    @include vw-convert-desktop('border-radius', 15px);
    background-color: white;
    position: relative;
    @include vw-convert-desktop('bottom', -20px);
}

ul {
    list-style: none;
    padding: 0;
    text-align: left;
    @include vw-convert-desktop('margin-top', 29px);
}
li {
  @include vw-convert-desktop('margin-bottom', 15px);
  @include vw-convert-desktop('font-size', 13px);
    &:before {
      // @extend .checkIcon;
      color: $accent-color;
      @include vw-convert-desktop('margin-right', 3px);
  }
}
.checkIcon {
    // font-family: "FontAwesome";
    // content: "\f00c";
}
.brilliant {
    border-color: $accent-color;
  &::before {
    width: 0;
    height: 0;
    border-style: solid;
    @include vw-convert-desktop('border-width', 64px 64px 0 0);
    border-color: #3bc6b8 transparent transparent transparent;
    position: absolute;
    left: 0;
    top: 0;
    content: "";
}
&::after {
    // @extend .checkIcon;
    color: white;
    position: absolute;
    @include vw-convert-desktop('left', 9px);
    @include vw-convert-desktop('left', 6px);
    text-shadow: 0 0 2px #37c5b6;
    @include vw-convert-desktop('font-size', 22px);
}
}

.coupon {
  margin-top: 52%;
  @include vw-convert-desktop('font-size', 18px);
  font-family: 'Montserrat', sans-serif;
  font-family: 500;

  a {
    font-weight: 700;
    color: #e2b714;
  }
}
</style>
<template>
  <div class='wrapper'>
    <div>
      <div class='package' amount="3900" @click="purchase">
        <div class='name'>Limited</div>
        <div class='price'>₮3,900</div>
        <div class='trial'>1 сарын эрх</div>
        <hr>
        <ul>
          <li>
            <strong>Бүх</strong> хичээл
          </li>
          <li>
            <strong>Онлайн батламж</strong> 
          </li>
          <li>
            <strong>Бүх тоглоомууд</strong> 
          </li>
          <li>
            <strong>Урамшуулалд хамрагдах</strong> 
          </li>
        </ul>
      </div>
      <div class='package brilliant' amount="9900" @click="purchase">
        <div class='name'>Brilliant</div>
        <div class='price'>₮9,900</div>
        <div class='trial'>3 сарын эрх</div>
        <hr>
        <ul>
          <li>
            <strong>Бүх</strong> хичээл
          </li>
          <li>
            <strong>Онлайн батламж</strong> 
          </li>
          <li>
            <strong>Бүх тоглоомууд</strong> 
          </li>
          <li>
            <strong>Урамшуулалд хамрагдах</strong> 
          </li>
        </ul>
      </div>
      <div class='package'>
        <div class='name'>Basic</div>
        <div class='price'>₮0</div>
        <div class='trial'>Эхний 60 хичээл</div>
        <hr>
        <ul>
          <li>
            <strong>60</strong> хичээл
          </li>
          <li><strong>Сонгогдсон тоглоомууд</strong></li>
        </ul>
      </div>
    </div>
    <div class="coupon">Танд хөнгөлтийн карт code байгаа бол <router-link to="/use-coupon">энд</router-link> дарна уу.</div>
  </div>
</template>
<script>
export default {
  // F7F7F7
  mounted() {
    Event.$emit('navbarname', 'Үйлчилгээний эрх сунгах');
  },
  data() {
    return { }
  },
  methods: {
    async purchase(evt) {

      var token = localStorage.getItem("token");
      if (!token) { 
        this.$router.push('/sign-in'); 
        
        this.$notification['error']({
          message: 'Амжилтгүй',
          description: 'Нэвтэрсэн байх шаардлагатай'
        });

        return;
      }

      const amount = parseInt(evt.currentTarget.getAttribute('amount'));
      const data = await this.$_request('POST', this.$appUrl +`/purchase/qpay-create-bill`, {amount});
      if (!data.status || data.status !== 200) {
        this.$notification['error']({
          message: 'Амжилтгүй'
        });
        return;
      }

      this.$router.push({ path: '/order/' + data.payment.invoice_id});
    }
  },
}
</script>