import axios from 'axios';

const detectRequest = async (method, url, data) => {
  const params = {method, url}
  if (data) { params.data = data; }
  Event.$emit('set-loader', true);
  let response = await axios( params ).then( data => {
    Event.$emit('set-loader', false);
    return data;
  }).catch(() => {
    Event.$emit('set-loader', false);
    return false;
  });

  if (!response) {
    return false;
  }

  if (response === 204) {
    return 204;
  }
  
  return response.data ? response.data : true;
}

const keyboards = {
  mon: async function(current) {
    let key = null, text = null, caps = null, image = null;
    if( current == ' ' ) {
        image = require(`@/assets/images/lesson/space.svg`);
        key = 'space';
        
        return {key, caps, text, image}
    }
    
    var impossibleSymbols = ['№', '-', '₮', '_', ',','%', ':','.', '"','?', '=', '+'];
    if(impossibleSymbols.includes(current)) {
        switch (current) {
            case '=':
                key = 'tilda';
                text = 'Зүүн гарын чигчий хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/11.svg`);
                break;
            case '№':
                key = '1';
                text = 'Зүүн гарын чигчий хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/1.svg`);
                break;
            case '-':
                key = '2';
                text = 'Зүүн гарын ядам хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/2.svg`);
                break;
            case '"':
                key = '3';
                text = 'Зүүн гарын дунд хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/3.svg`);
                break;
            case '₮':
                key = '4';
                text = 'Зүүн гарын долоовор хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/4.svg`);
                break;
            case ':':
                key = '5';
                text = 'Зүүн гарын долоовор хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/5.svg`);
                break;
            case '.':
                key = '6';
                text = 'Баруун гарын долоовор хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/6.svg`);
                break;
            case '_':
                key = '7';
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
                key = '9';
                text = 'Баруун гарын ядам хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/9.svg`);
                break;
            case '?':
                key = '0';
                text = 'Баруун гарын чигчий хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/lowercase/0.svg`);
                break;
            case '+':
                key = 'tilda';
                text = 'Баруун гарын чигчий хуруугаар Shift, Зүүн гарын чигчий хуруугаар';
                caps = true;
                image = require(`@/assets/images/lesson/uppercase/11.svg`);
                break;
            default:
                break;
        }
    } else {
        key = current.toUpperCase();
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
                key = 'shift-right';
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
                key = 'shift-right';
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
                key = 'shift-right';
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
                key = 'shift-right';
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
                key = 'shift-left';
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
                key = 'shift-left';
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
                key = 'shift-left';
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
                key = 'shift-left';
                image = require(`@/assets/images/lesson/uppercase/${current}.svg`);
            }
        }
    }


    return {key, caps, text, image}
  }
}

export {
  detectRequest,
  keyboards
};