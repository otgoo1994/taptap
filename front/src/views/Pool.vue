<template>
  <div>
    <div class="interact-container">
      <div class="container">
        <div class="background" :style="{'background-image': 'url(\''+require('@/assets/images/games/tubes/background.png')+'\')'}"></div>

        <div class="start-button">
          <div class="background" :style="{'background-image': 'url(\''+require('@/assets/images/games/tubes/start.png')+'\')'}"></div>
          <div class="start"></div>
        </div>

        <div class="rules">
          <img src="@/assets/images/games/tubes/mainRules.png" class="rule" alt="rule-bg">
          <div class="clear"></div>
        </div>


        <div class="titles">
          <div class="body">
            <img class="titles-img" src="@/assets/images/games/tubes/point.png" alt="point">
            <img class="titles-img" id="live" src="@/assets/images/games/tubes/live5.png" alt="point">
            <img class="titles-img" id="point" src="@/assets/images/games/tubes/totalPoints.png" alt="point">
            <p class="my-point" id="myPoint">0</p>

            <div class="progressbar">
              <div class="progressbar-container">
                <img src="@/assets/images/games/tubes/progressbarTime.png" class="clock" alt="clock">
                <img src="@/assets/images/games/tubes/progressContainer.png" class="wh-background" alt="white-bg">
                <div class="percent" id="percent"></div>
              </div>
            </div>
          </div>
        </div>

         <div class="mytube">
            <div class="tube-container">

              <div class="tube-box">
                <div class="tube-box-body">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                  <img src="@/assets/images/games/tubes/tube1.png" class="tube" alt="">
                </div>
              </div>
              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube2.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube8.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube4.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube5.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube6.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube7.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube3.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>


        <div class="text-input">
          <div class="input-container">
            <img src="@/assets/images/games/tubes/input.png" class="input-image" alt="">
            <div class="input" id="input" @keypress="keypress" contenteditable></div>
            <div class="submit" id="submit"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wordList: ['word', 'hand', 'fire', 'rain', 'main', 'load', 'life', 'hour', 'rice', 'build'],
      currentWords : [],
      findWordLength        : 0,
      currentIdx            : 0,
      play                  : false,
      timer                 : null,
      seconds               : 60,
      live                  : 5,
      myScore               : 0,
      characters            : ['@/assets/images/games/tubes/character1.png', '@/assets/images/games/tubes/character2.png', '@/assets/images/games/tubes/character3.png'],
      selectedIdx           : []
    }
  },
  methods: {
    keypress(evt) {
      if (evt.keyCode != 13) {
        return;
      }

      evt.preventDefault();
      const val = evt.currentTarget.innerHTML;
      evt.currentTarget.innerHTML = '';
      return;
    }
  }
}
</script>