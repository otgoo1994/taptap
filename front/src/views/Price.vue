<style lang="scss" scoped>
$accent-color: #33c4b6;

.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -190px 0 0 -468px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    color: #9f9f9f;
    font-size: 15px;
}
.package {
  cursor: pointer;
  box-sizing: border-box;
  width: 301px;
  height: 380px;
  border: 3px solid #e8e8e8;
  border-radius: 7px;
  display: inline-block;
  padding: 24px;
  text-align: center;
  float: left;
  transition: margin-top .5s linear;
  position: relative;
  margin-right: 11px;
  
  &:hover {
    margin-top: -30px;
    transition: margin-top .3s linear;
  }
}
.name {
    color: #565656;
    font-weight: 700;
    font-size: 1.5rem;
    margin-top: -5px;
}
.price {
    margin-top: 7px;
    font-weight: bold;
}
hr {
    background-color: #dedede;
    border: none;
    height: 1px;
}
.trial {
    font-size: .9rem;
    font-weight: 600;
    padding: 2px 21px 2px 21px;
    color: $accent-color;
    border: 1px solid #e4e4e4;
    display: inline-block;
    border-radius: 15px;
    background-color: white;
    position: relative;
    bottom: -20px;
}
ul {
    list-style: none;
    padding: 0;
    text-align: left;
    margin-top: 29px;
}
li {
    margin-bottom: 15px;
    &:before {
      // @extend .checkIcon;
      font-size: 1.3rem;
      color: $accent-color;
      margin-right: 3px;
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
    border-width: 64px 64px 0 0;
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
    left: 9px;
    top: 6px;
    text-shadow: 0 0 2px #37c5b6;
    font-size: 1.4rem;
}
}
</style>
<template>
  <div class='wrapper'>
  <div class='package'>
    <div class='name'>Limited</div>
    <div class='price'>₮5,900</div>
    <div class='trial'>1 сарын эрх</div>
    <hr>
    <ul>
      <li>
        <strong>Бүх</strong> хичээл
      </li>
      <li>
        <strong>Сертификат</strong> 
      </li>
      <li>
        <strong>Урамшуулалд хамрагдах</strong> 
      </li>
    </ul>
  </div>
  <div class='package brilliant'>
    <div class='name'>Brilliant</div>
    <div class='price'>₮12,900</div>
    <div class='trial'>3 сарын эрх</div>
    <hr>
    <ul>
      <li>
        <strong>Бүх</strong> хичээл
      </li>
      <li>
        <strong>Сертификат</strong> 
      </li>
      <li>
        <strong>Урамшуулалд хамрагдах</strong> 
      </li>
    </ul>
  </div>
  <div class='package'>
    <div class='name'>Basic</div>
    <div class='price'>₮0</div>
    <div class='trial'>Эхний 40 хичээл</div>
    <hr>
    <ul>
      <li>
        <strong>40</strong> хичээл
      </li>
      <!-- <li>
        <strong>3</strong> 
      </li> -->
    </ul>
  </div>
</div>
</template>
<script>
export default {
  
}
</script>