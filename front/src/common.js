﻿import axios from 'axios';


const detectRequest = async (method, url, data) => {
  const params = {method, url}
  if (data) { params.data = data; }
  Event.$emit('set-loader', true);
  let response = await axios( params ).then( data => {
    Event.$emit('set-loader', false);
    return data;
  }).catch((e) => {
    Event.$emit('set-loader', false);
    return e.response;
  });

  if (response.status === 200) {
    return response.data ? response.data : true;
  }

  return response.status;
}

const createEvent = async (name, method) => {
    Event.$on( name, method );
}

const methods = {
    dateDistance: function(end) {
        const now = new Date().getTime();
        const distance = new Date(end).getTime() - now;
    
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
        return { days, hours, minutes }; 
    },
    timeSince: function(date) {
        console.log(date);
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }

        return Math.floor(seconds) + " seconds";
    },
    getLessonRoute: function(path) {
        if(path == 'boxed') {
            return 'boxed';
        } 
        else if(path == 'intro') {
            return 'intro';
        } 
        else if(path == 'review') {
            return 'review';
        } 
        else if(path == 'hold') {
            return 'hold';
        }
        else if(path == 'pool') {
            return 'pool-game';
        }
        else if(path == 'video') {
            return 'video'
        } else if (path == 'floppy') {
            return 'floppy-bird'
        } else if (path == 'ninja') {
            return 'fruit-ninja'
        }
    }
}



const keyboards = {
  mon: async function(current) {
    let key = [null, null], text = null, caps = null, image = null;
    if( current == ' ' ) {
        image = require(`@/assets/images/lesson/space.svg`);
        key[1] = 'space';
        
        return {key, caps, text, image, shift}
    }
    
    var impossibleSymbols = ['№', '-', '₮', '_', ',','%', ':','.', '"','?', '=', '+'];
    if(impossibleSymbols.includes(current)) {
        switch (current) {
            case '=':
                key[0] = 'tilda';
                text = 'Зүүн гарын чигчий хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/11.svg`);
                break;
            case '№':
                key[0] = '1';
                text = 'Зүүн гарын чигчий хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/1.svg`);
                break;
            case '-':
                key[0] = '2';
                text = 'Зүүн гарын ядам хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/2.svg`);
                break;
            case '"':
                key[0] = '3';
                text = 'Зүүн гарын дунд хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/3.svg`);
                break;
            case '₮':
                key[0] = '4';
                text = 'Зүүн гарын долоовор хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/4.svg`);
                break;
            case ':':
                key[0] = '5';
                text = 'Зүүн гарын долоовор хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/5.svg`);
                break;
            case '.':
                key[0] = '6';
                text = 'Баруун гарын долоовор хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/6.svg`);
                break;
            case '_':
                key[0] = '7';
                text = 'Баруун гарын долоовор хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/7.svg`);
                break;
            case ',':
                key = '8';
                text = 'Баруун гарын дунд хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/8.svg`);
                break;
            case '%':
                key[0] = '9';
                text = 'Баруун гарын ядам хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/9.svg`);
                break;
            case '?':
                key[0] = '0';
                text = 'Баруун гарын чигчий хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/0.svg`);
                break;
            case '+':
                key[0] = 'tilda';
                text = 'Баруун гарын чигчий хуруугаар Shift, Зүүн гарын чигчий хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/uppercase/11.svg`);
                break;
            default:
                break;
        }
    } else {
        key = [current.toUpperCase(), null];
        var left_4 = ['ф','й','я'];
        var left_shift_4 = ['1','Ф','Й','Я'];
        var left_3 = ['ц','ы','ч'];
        var left_shift_3 = ['2','Ц','Ы','Ч'];
        var left_2 = ['у','б','ё'];
        var left_shift_2 = ['3','У','Б','Ё'];
        var left_1 = ['ж','ө','с','э','а','м'];
        var left_shift_1 = ['4','5','Ж','Ө','С','Э','А','М'];
        var right_1 = ['н','г','х','р','и','т'];
        var right_shift_1 = ['6','7','Н','Г','Х','Р','И','Т'];
        var right_2 = ['ш','о','ь'];
        var right_shift_2 = ['8','Ш','О','Ь'];
        var right_3 = ['ү','л','в'];
        var right_shift_3 = ['9','Ү','Л','В'];
        var right_4 = ['е','щ','з','к','ъ','д','п','ю','\''];
        var right_shift_4 = ['0','Е','Щ','З','К','Ъ','Д','П','Ю','|'];
        

        for (let i = 0; i < left_shift_4.length; i++) {
            if (left_shift_4[i] == current) {
                key[1] = 'shift-right';
                caps = false;
                text = 'Баруун гарын чигчий хуруугаар Shift, зүүн гарын чигий хуруугаар';
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }

        for (let i = 0; i < left_4.length; i++) {
            if (left_4[i] == current) {
                caps = true;
                text = 'Зүүн гарын чигчий хуруугаар';
                image = require(`@/assets/images/lesson/lowercase/${current}.svg`);
            }
        }

        for (let i = 0; i < left_3.length; i++) {
            if (left_3[i] == current) {
                caps = true;
                text = 'Зүүн гарын ядам хуруугаар'
                image = require(`@/assets/images/lesson/lowercase/${current}.svg`);
            }
        }

        for (let i = 0; i < left_shift_3.length; i++) {
            if (left_shift_3[i] == current) {
                key[1] = 'shift-right';
                caps = false;
                text = 'Баруун гарын чигчий хуруугаар Shift, зүүн гарын ядам хуруугаар'
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }

        for (let i = 0; i < left_2.length; i++) {
            if (left_2[i] == current) {
                caps = true;
                text = 'Зүүн гарын дунд хуруугаар'
                image = require(`@/assets/images/lesson/lowercase/${current}.svg`);
            }
        }

        for (let i = 0; i < left_shift_2.length; i++) {
            if (left_shift_2[i] == current) {
                caps = false;
                key[1] = 'shift-right';
                text = 'Баруун гарын чигчий хуруугаар Shift, зүүн гарын дунд хуруугаар'
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }

        for (let i = 0; i < left_1.length; i++) {
            if (left_1[i] == current) {
                caps = true;
                text = 'Зүүн гарын долоовор хуруугаар'
                image = require(`@/assets/images/lesson/lowercase/${current}.svg`);
            }
        }

        for (let i = 0; i < left_shift_1.length; i++) {
            if (left_shift_1[i] == current) {
                caps = false;
                key[1] = 'shift-right';
                text = 'Баруун гарын чигчий хуруугаар Shift, зүүн гарын долоовор хуруугаар'
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }

        for (let i = 0; i < right_1.length; i++) {
            if (right_1[i] == current) {
                caps = true;
                text = 'Баруун гарын долоовор хуруугаар';
                image = require(`@/assets/images/lesson/lowercase/${current}.svg`);
            }
        }

        for (let i = 0; i < right_shift_1.length; i++) {
            if (right_shift_1[i] == current) {
                caps = false;
                key[1] = 'shift-left';
                text = 'Зүүн гарын чигчий хуруугаар Shift, Баруун гарын долоовор хуруугаар';
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }

        for (let i = 0; i < right_2.length; i++) {
            if (right_2[i] == current) {
                caps = true;
                text = 'Баруун гарын дунд хуруугаар'
                image = require(`@/assets/images/lesson/lowercase/${current}.svg`);
            }
        }

        for (let i = 0; i < right_shift_2.length; i++) {
            if (right_shift_2[i] == current) {
                caps = false;
                text = 'Зүүн гарын чигчий хуруугаар Shift, Баруун гарын дунд хуруугаар'
                key[1] = 'shift-left';
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }

        for (let i = 0; i < right_3.length; i++) {
            if (right_3[i] == current) {
                caps = true;
                text = 'Баруун гарын ядам хуруугаар'
                image = require(`@/assets/images/lesson/lowercase/${current}.svg`);
            }
        }

        for (let i = 0; i < right_shift_3.length; i++) {
            if (right_shift_3[i] == current) {
                caps = false;
                text = 'Зүүн гарын чигчий хуруугаар Shift, Баруун гарын ядам хуруугаар'
                key[1] = 'shift-left';
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }

        for (let i = 0; i < right_4.length; i++) {
            if (right_4[i] == current) {
                caps = true;
                text = 'Баруун гарын чигчий хуруугаар'
                image = require(`@/assets/images/lesson/lowercase/${current}.svg`);
            }
        }

        for (let i = 0; i < right_shift_4.length; i++) {
            if (right_shift_4[i] == current) {
                caps = false;
                text = 'Зүүн гарын чигчий хуруугаар Shift, Баруун гарын чигчий хуруугаар'
                key[1] = 'shift-left';
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }
    }
    return {key, caps, text, image}
  }
}

if (!window.keyboard) {
    window.keyboard = keyboards.mon;
}

export {
  detectRequest,
  keyboards,
  createEvent,
  methods
};