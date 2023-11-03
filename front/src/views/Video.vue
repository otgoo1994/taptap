<template>
  <div>
    <div class="video-container" ref="container">
      <div class="body">
        <video v-if="lesson.video" ref="videoPlayer" :src="$appUrl + '/videos/' + lesson.video"></video>
      </div>
      <div class="controller">
        <a href="javascript:;" @click="playVideo">
          <svg v-if="!isPlay" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
        </a>

        <div class="fullscreen">
          <a href="javascript:;" @click="reqfullscreen">
            <svg v-if="!fullscreen" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"/></svg>
          </a>
        </div>
      </div>

      <div class="video-result" v-if="dialog">
        <a-result
          v-if="dialog"
          status="success"
          title="Амжилттай үзэж дуусгалаа"
        >
          <template #extra>
            <p>
              <span class="star-rating">
                <label for="rate-1"><a-icon type="star" class="google" theme="filled"/></label>
                <input type="radio" name="rating" id="rate-1" value="1">
                <label for="rate-2"><a-icon type="star" class="google" theme="filled"/></label>
                <input type="radio" name="rating" id="rate-2" value="2" checked>
                <label for="rate-3"><a-icon type="star" class="google" theme="filled"/></label>
                <input type="radio" name="rating" id="rate-3" value="3">
                <label for="rate-4"><a-icon type="star" class="google" theme="filled"/></label>
                <input type="radio" name="rating" id="rate-4" value="4">
                <label for="rate-5"><a-icon type="star" class="google" theme="filled"/></label>
                <input type="radio" name="rating" id="rate-5" value="5">
              </span>
            </p>
            <a-button key="console" @click="watchAgain" type="primary">Дахиж үзэх</a-button>
            <a-button key="buy">Дараагийн хичээл</a-button>
          </template>
        </a-result>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lesson: {
        id: null,
        video: null,
        lvl: null
      },
      isPlay: false,
      fullscreen: false,
      dialog: false,
      status: {
          lessonname: ''
      },
    }
  },
  computed: {},
  methods: {
    watchAgain() {
      this.dialog = false;
      this.$refs.videoPlayer.currentTime = 0;
      this.$refs.videoPlayer.play();
      this.isPlay = true;
    },
    playVideo() {
      if (!this.$refs.videoPlayer) { return; }

      if (!this.isPlay) {
        this.$refs.videoPlayer.play();
        this.isPlay = true;
        return;
      }

      this.$refs.videoPlayer.pause();
      this.isPlay = false;
    },
    fullScreenChanged() {
      if (document.fullscreenElement) {
        this.$refs.container.classList.add('full');
        this.fullscreen = true;
        return;  
      }

      
      this.$refs.container.classList.remove('full');
      this.fullscreen = false;
    },
    async videoEnded() {
    
      const data = await this.$_request('POST', this.$appUrl +'/lesson/update-user-lesson', {lessonId: this.lesson.id, wpm: 30, accuracy: 100, score: 200, level: this.lesson.lvl});
      if (!data) { return; }

      console.log(data.point, '====111===point');
      if(data.point > 0) {
          Event.$emit('set-user-point', data.point);
      }

      this.dialog = true;
    },
    reqfullscreen() {
      if (!this.fullscreen) {
        this.$refs.container.requestFullscreen();
        return;
      }
      document.exitFullscreen();
    },
    async getLesson() {
      const data = await this.$_request('POST', this.$appUrl +'/lesson/get-lesson', {id: this.lesson.id});
      if (!data) { this.$router.push('/subjects'); return; }
      this.lesson.video = data.data.text;

      if(data.data.type != 'video') {
          this.$router.push('/subjects');
      } else {
          this.lesson.lvl = data.data.lvl;
          setTimeout(() => {
            if (this.$refs.videoPlayer) {
              this.$refs.videoPlayer.addEventListener('ended', this.videoEnded);
            }
          }, 1000);
      }


    }
  },
  beforeRouteLeave (to, from, next) {
    document.removeEventListener('fullscreenchange', this.fullScreenChanged);
    this.$refs.videoPlayer.removeEventListener('ended', this.videoEnded);
    next();
  },
  mounted() {
    this.lesson.id = this.$route.params.id;
    document.addEventListener('fullscreenchange', this.fullScreenChanged);
    this.getLesson();
  },
}
</script>

<style lang="scss" scoped>

@keyframes jump {
  0%   {transform: translate3d(0,0,0) scale3d(1,1,1);}
  40%  {transform: translate3d(0,30%,0) scale3d(.7,1.5,1);}
  100% {transform: translate3d(0,100%,0) scale3d(1.5,.7,1);}
}

.star-rating {
	white-space: nowrap;
  label {
    animation: jump .5s linear alternate infinite;
    color: #faec1b;
    text-shadow: 0 0 2px #ffffff, 0 0 10px #ffee58;
    font-size: 25px;
  }
}
.star-rating [type="radio"] {
	appearance: none;
}
.star-rating i {
	font-size: 1.2em;
	transition: 0.3s;
}
</style>