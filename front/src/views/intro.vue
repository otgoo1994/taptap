<template>
    <div>
        <div class="intro-x">
            <div :style="{'padding-top': '50px', 'position': 'relative'}" align="center" @click="setFocus">
                <div class="intro-title flex items-center" align="left">ШИНЭ ҮСЭГНИЙ БАЙРЛАЛ</div>
                <div align="left" class="intro-text mt-5" style="display: flex;">
                    <div :style="{'margin-top': '5px', 'padding-right': '20px'}">{{fingerText}}</div>
                    <div :contenteditable="this.status.contentEdit" @input="this.type" :style="{'opacity': '0'}" ref="inputDiv" id="inputDiv"></div>

                    <div v-for="(main, cc) in text.splitted.length" :key="cc" :ref="'parent-div-' + cc" align="left">
                        <div v-if="text.count == cc">
                            <div v-for="(text, index) in text.splitted[cc]" :key="index" :hidden="false" class="text-span ml-1 mr-1 span-normal" align="center" :ref="'main-span-' + index">
                                <div v-if="text != ' '" class="intro-y text-span-second items-center" :ref="'span-' + index">
                                    <span :ref="'child-span-' + index">{{ text }}</span>
                                </div>
                                <div v-else class="intro-y text-span-second items-center" :ref="'span-' + index">
                                    <span :ref="'child-span-' + index" :style="{'opacity': '0'}">a</span>
                                </div>
                                <div :ref="'span-error-word-' + index" class="span-error-text"></div>
                                <div :ref="'boxed-' + index" class="-lesson-intro-x current-span" v-if="index == counter.current">&nbsp;</div>
                            </div>
                        </div>
                    </div>
                    <div :style="{'margin-top': '5px', 'padding-left': '20px'}">үсгэн дээр дарна уу.</div>
                </div>
                <div class="mt-5" align="left" style="display: flex; justify-content: center; padding-left: 14%;">
                    <div style="width: 100%; padding-top: 60px;" align="center">
                        <svg class="standard-kb theme-bone" viewBox="0 0 683.3 254" xmlns="http://www.w3.org/2000/svg" style="width: 45%;">
                            <g id="keys">
                                <path ref="tilda" class="st0" d="M58.4,53.7c0,1.7-1.4,3-3,3H18.9c-1.6,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z"></path>
                                <path ref="1" class="st0" d="M103.4,53.7c0,1.7-1.3,3-3,3H63.9c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"></path>
                                <path ref="Ф" class="st0" d="M126.7,97.6c0,1.6-1.3,3-3,3H87.2c-1.7,0-3-1.4-3-3V62.3c0-1.6,1.3-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"></path>
                                <path ref="Й" class="st0" d="M137.4,141.5c0,1.6-1.4,3-3,3H97.9c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="Я" class="st0" d="M160.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V185.4z"></path>
                                <path ref="Ч" class="st0" d="M205.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"></path>
                                <path ref="Ё" class="st0" d="M250.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"></path>
                                <path ref="С" class="st0" d="M295.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"></path>
                                <path ref="М" class="st0" d="M340.8,185.4c0,1.7-1.4,3-3,3h-36.6c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.6c1.6,0,3,1.4,3,3V185.4z"></path>
                                <path ref="И" class="st0" d="M385.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"></path>
                                <path ref="Т" class="st0" d="M430.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"></path>
                                <path ref="Ь" class="st0" d="M475.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z"></path>
                                <path ref="В" class="st0" d="M520.8,185.4c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V185.4z"></path>
                                <path ref="Ю" class="st0" d="M565.8,185.4c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V185.4z"></path>
                                <path ref="Ы" class="st0" d="M182.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="Б" class="st0" d="M227.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="Ө" class="st0 active" d="M272.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="А" class="st0" d="M317.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="Х" class="st0" d="M362.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="Р" class="st0" d="M407.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="О" class="st0" d="M452.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="Л" class="st0" d="M497.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="Д" class="st0" d="M542.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="П" class="st0" d="M587.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z"></path>
                                <path ref="Ц" class="st0" d="M171.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"></path>
                                <path ref="У" class="st0" d="M216.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.7,1.4-3,3-3h36.5c1.7,0,3,1.3,3,3V97.6z"></path>
                                <path ref="Ж" class="st0" d="M261.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"></path>
                                <path ref="Э" class="st0" d="M306.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"></path>
                                <path ref="Н" class="st0" d="M351.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"></path>
                                <path ref="Г" class="st0" d="M396.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"></path>
                                <path ref="Ш" class="st0" d="M441.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"></path>
                                <path ref="Ү" class="st0" d="M486.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z"></path>
                                <path ref="З" class="st0" d="M531.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"></path>
                                <path ref="К" class="st0" d="M576.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"></path>
                                <path ref="Ъ" class="st0" d="M621.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z"></path>
                                <path ref="backslash" class="st0" d="M668.8,97.6c0,1.6-1.3,3-3,3h-38.6c-1.6,0-3-1.4-3-3V62.4c0-1.6,1.4-3,3-3h38.6c1.7,0,3,1.4,3,3V97.6z"></path>
                                <path ref="2" class="st0" d="M148.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z"></path>
                                <path ref="3" class="st0" d="M193.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z"></path>
                                <path ref="4" class="st0" d="M238.4,53.7c0,1.7-1.4,3-3,3H199c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z"></path>
                                <path ref="5" class="st0" d="M283.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.7,0,3,1.3,3,3V53.7z"></path>
                                <path ref="6" class="st0" d="M328.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.7,1.4-3,3-3h36.5c1.7,0,3,1.3,3,3V53.7z"></path>
                                <path ref="7" class="st0" d="M373.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"></path>
                                <path ref="8" class="st0" d="M418.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"></path>
                                <path ref="9" class="st0" d="M463.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"></path>
                                <path ref="0" class="st0" d="M508.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z"></path>
                                <path ref="Е" class="st0" d="M553.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z"></path>
                                <path ref="Щ" class="st0" d="M598.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z"></path>
                                <path ref="backspace" class="st0" d="M668.8,53.7c0,1.7-1.3,3-3,3h-61.9c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h61.9c1.7,0,3,1.4,3,3V53.7z"></path>
                                <path ref="tab" class="st0" d="M81.7,97.6c0,1.6-1.3,3-3,3H18.9c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.3-3,3-3h59.8c1.7,0,3,1.4,3,3V97.6z"></path>
                                <path ref="capslock" class="st0" d="M92.4,141.5c0,1.6-1.3,3-3,3H18.9c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h70.4c1.7,0,3,1.3,3,3V141.5z"></path>
                                <path ref="enter" class="st0" d="M668.8,141.5c0,1.6-1.3,3-3,3h-72.9c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h72.9c1.7,0,3,1.3,3,3V141.5z"></path>
                                <path ref="shift-left" class="st0" d="M115.8,185.4c0,1.7-1.3,3-3,3H18.9c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h93.8c1.7,0,3,1.4,3,3V185.4z"></path>
                                <path ref="control" class="st0 hide-on-bone" d="M105,236c0,1.6-1.3,3-3,3H18.9c-1.6,0-3-1.4-3-3v-42c0-1.7,1.3-3,3-3H102c1.7,0,3,1.3,3,3V236z"></path>
                                <path ref="option-left" class="st0 hide-on-bone" d="M182.4,236c0,1.7-1.4,3-3,3h-68.8c-1.7,0-3-1.3-3-3v-42c0-1.7,1.3-3,3-3h68.8c1.6,0,3,1.3,3,3V236z"></path>
                                <path ref="option-right" class="st0 hide-on-bone" d="M531.8,191c1.7,0,3,1.4,3,3v42c0,1.7-1.3,3-3,3h-62.9c-1.6,0-3-1.3-3-3v-42c0-1.6,1.4-3,3-3H531.8z"></path>
                                <path class="st0 hide-on-bone" d="M668.8,236.1c0,1.7-1.3,3-3,3H540.3c-1.6,0-3-1.3-3-3v-42c0-1.6,1.4-3,3-3h125.5c1.7,0,3,1.4,3,3V236.1z"></path>
                                <path ref="space" class="st0" d="M460.4,191c1.6,0,3,1.4,3,3v42c0,1.7-1.4,3-3,3H187.5c-1.6,0-3-1.3-3-3v-42c0-1.6,1.4-3,3-3H460.4z"></path>
                                <path ref="shift-right" class="st0" d="M668.8,185.4c0,1.7-1.3,3-3,3h-94.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h94.5c1.7,0,3,1.4,3,3V185.4z"></path>
                            </g>
                            <g id="letters">
                                <text transform="matrix(1 0 0 1 33.4903 33.804)" class="st2" dx="0" dy="0">=</text>
                                <text transform="matrix(1 0 0 1 35.8009 52.6643)" class="st2" dx="0" dy="0">+</text>
                                <text transform="matrix(1 0 0 1 78.626 50.4071)" class="st2" dx="0" dy="0">1</text>
                                <text transform="matrix(1 0 0 1 123.299 51.1765)" class="st2" dx="0" dy="0">2</text>
                                <text transform="matrix(1 0 0 1 169.6841 51.404)" class="st2" dx="0" dy="0">3</text>
                                <text transform="matrix(1 0 0 1 213.0758 51.404)" class="st2" dx="0" dy="0">4</text>
                                <text transform="matrix(1 0 0 1 258.0724 51.404)" class="st2" dx="0" dy="0">5</text>
                                <text transform="matrix(1 0 0 1 303.2822 51.0891)" class="st2" dx="0" dy="0">6</text>
                                <text transform="matrix(1 0 0 1 349.5064 51.0891)" class="st2" dx="0" dy="0">7</text>
                                <text transform="matrix(1 0 0 1 393.281 51.2157)" class="st2" dx="0" dy="0">8</text>
                                <text transform="matrix(1 0 0 1 438.5742 51.2157)" class="st2" dx="0" dy="0">9</text>
                                <text transform="matrix(1 0 0 1 483.4907 51.2157)" class="st2" dx="0" dy="0">0</text>
                                <text transform="matrix(1 0 0 1 80.5513 31.7605)" class="st1" dx="0" dy="0">№</text>
                                <text transform="matrix(1 0 0 1 119.8565 30.45)" class="st1" dx="0" dy="0">-</text>
                                <text transform="matrix(1 0 0 1 169.6841 31.76)" class="st1" dx="0" dy="0">"</text>
                                <text transform="matrix(1 0 0 1 213.0758 31.2171)" class="st1" dx="0" dy="0">₮</text>
                                <text transform="matrix(1 0 0 1 255.5748 30.8318)" class="st1" dx="0" dy="0">:</text>
                                <text transform="matrix(1 0 0 1 303.9556 32.4427)" class="st1" dx="0" dy="0">.</text>
                                <text transform="matrix(1 0 0 1 348.2554 31.76)" class="st1" dx="0" dy="0">_</text>
                                <text transform="matrix(1 0 0 1 394.5334 32.8236)" class="st1" dx="0" dy="0">,</text>
                                <text transform="matrix(1 0 0 1 440.3076 30.6435)" class="st1" dx="0" dy="0">%</text>
                                <text transform="matrix(1 0 0 1 485.1645 30.6435)" class="st1" dx="0" dy="0">?</text>
                                <text transform="matrix(1 0 0 1 528.7588 40.5423)" class="st2" dx="0" dy="0" :hidden="caps">Е</text>
                                <text transform="matrix(1 0 0 1 530.4011 40.4071)" class="st1" dx="0" :hidden="!caps" dy="0">е</text>
                                <text transform="matrix(1 0 0 1 568.5195 40.4422)" class="st1" dx="0" :hidden="!caps" dy="0">щ</text>
                                <text transform="matrix(1 0 0 1 568.5195 40.2157)" class="st2" dx="0" dy="0" :hidden="caps">Щ</text>
                                <text transform="matrix(1 0 0 1 100.9088 85.4743)" class="st2" dx="0" dy="0" :hidden="caps">Ф</text>
                                <text transform="matrix(1 0 0 1 100.9088 90.4743)" class="st1 b" dx="-1.6953125" :hidden="!caps" dy="-6">ф</text>
                                <text transform="matrix(1 0 0 1 145.3644 85.4744)" class="st2" dx="0" dy="0" :hidden="caps">Ц</text>
                                <text transform="matrix(1 0 0 1 150.3644 90.4744)" class="st1 b" dx="-2.5" dy="-6" :hidden="!caps">ц</text>
                                <text transform="matrix(1 0 0 1 190.5943 85.4744)" class="st2" dx="0" dy="0" :hidden="caps">У</text>
                                <text transform="matrix(1 0 0 1 192.5943 90.4744)" class="st1 b" dx="-1.6953125" dy="-6" :hidden="!caps">у</text>
                                <text transform="matrix(1 0 0 1 236.9933 85.4743)" class="st2" dx="0" dy="0" :hidden="caps">Ж</text>
                                <text transform="matrix(1 0 0 1 238.9933 90.4743)" class="st1 b" dx="-0.5" dy="-6" :hidden="!caps">ж</text>
                                <text transform="matrix(1 0 0 1 280.6080 85.4744)" class="st2" dx="0" dy="0" :hidden="caps">Э</text>
                                <text transform="matrix(1 0 0 1 282.6080 90.4744)" class="st1 b" dx="0.5" dy="-6" :hidden="!caps">э</text>
                                <text transform="matrix(1 0 0 1 326.5138 85.4744)" class="st2" dx="0" dy="0" :hidden="caps">Н</text>
                                <text transform="matrix(1 0 0 1 328.5138 90.4744)" class="st1 b" dx="-1.4921875" dy="-6" :hidden="!caps">н</text>
                                <text transform="matrix(1 0 0 1 371.1386 85.4743)" class="st2" dx="0" dy="0" :hidden="caps">Г</text>
                                <text transform="matrix(1 0 0 1 373.1386 90.4743)" class="st1 b" dx="-1.6953125" dy="-6" :hidden="!caps">г</text>
                                <text transform="matrix(1 0 0 1 418.5557 85.4743)" class="st2" dx="0" dy="0" :hidden="caps">Ш</text>
                                <text transform="matrix(1 0 0 1 420.5557 90.4743)" class="st1 b" dx="-0.109375" dy="-6" :hidden="!caps">ш</text>
                                <text transform="matrix(1 0 0 1 459.9639 85.4743)" class="st2" dx="0" dy="0" :hidden="caps">Ү</text>
                                <text transform="matrix(1 0 0 1 461.9639 90.4743)" class="st1 b" dx="-1.6953125" dy="-6" :hidden="!caps">ү</text>
                                <text transform="matrix(1 0 0 1 506.9335 85.4743)" class="st2" dx="0" dy="0" :hidden="caps">З</text>
                                <text transform="matrix(1 0 0 1 508.9335 90.4743)" class="st1 b" dx="-1.695281982421875" dy="-6" :hidden="!caps">з</text>
                                <text transform="matrix(1 0 0 1 112.1346 130.3303)" class="st2" dx="0" dy="0" :hidden="caps">Й</text>
                                <text transform="matrix(1 0 0 1 114.1346 135.3303)" class="st1 b focus-row" dx="-1.6953125" dy="-6" :hidden="!caps">й</text>
                                <text transform="matrix(1 0 0 1 156.0135 130.3303)" class="st2" dx="0" dy="0" :hidden="caps">Ы</text>
                                <text transform="matrix(1 0 0 1 158.0135 135.3303)" class="st1 b focus-row" dx="-1.5078125" dy="-6" :hidden="!caps">ы</text>
                                <text transform="matrix(1 0 0 1 201.5241 130.3303)" class="st2" dx="0" dy="0" :hidden="caps">Б</text>
                                <text transform="matrix(1 0 0 1 203.5241 135.3303)" class="st1 b focus-row" dx="-1.6953125" dy="-6" :hidden="!caps">б</text>
                                <text transform="matrix(1 0 0 1 247.1121 130.3303)" class="st2 focus-row active" dx="0" dy="0" :hidden="caps">Ө</text>
                                <text transform="matrix(1 0 0 1 249.1121 135.3303)" class="st1 b focus-row active" dx="-0.5" dy="-6" :hidden="!caps">ө</text>
                                <text transform="matrix(1 0 0 1 289.4753 130.3303)" class="st2" dx="0" dy="0" :hidden="caps">А</text>
                                <text transform="matrix(1 0 0 1 291.4753 135.3303)" class="st1 b focus-row" dx="-1.695281982421875" dy="-6" :hidden="!caps">а</text>
                                <text transform="matrix(1 0 0 1 335.5886 130.3303)" class="st2" dx="0" dy="0" :hidden="caps">Х</text>
                                <text transform="matrix(1 0 0 1 337.5886 135.3303)" class="st1 b focus-row" dx="-1.6953125" dy="-6" :hidden="!caps">х</text>
                                <text transform="matrix(1 0 0 1 382.2692 130.3303)" class="st2" dx="0" dy="0" :hidden="caps">Р</text>
                                <text transform="matrix(1 0 0 1 384.2692 135.3303)" class="st1 b focus-row" dx="-0.609375" dy="-6" :hidden="!caps">р</text>
                                <text transform="matrix(1 0 0 1 426.0182 130.3303)" class="st2" dx="0" dy="0" :hidden="caps">О</text>
                                <text transform="matrix(1 0 0 1 428.0182 135.3303)" class="st1 b focus-row" dx="-1.5" dy="-6" :hidden="!caps">о</text>
                                <text transform="matrix(1 0 0 1 470.8706 130.3303)" class="st2" dx="0" dy="0" :hidden="caps">Л</text>
                                <text transform="matrix(1 0 0 1 472.8706 135.3303)" class="st1 b focus-row" dx="-0.109375" dy="-6" :hidden="!caps">л</text>
                                <text transform="matrix(1 0 0 1 134.7896 163.7458)" class="st2" dx="0" dy="0" :hidden="caps">Я</text>
                                <text transform="matrix(1 0 0 1 134.7896 181.7458)" class="st1 b" dx="-1.5078277587890625" dy="-6" :hidden="!caps">я</text>
                                <text transform="matrix(1 0 0 1 179.2339 163.7458)" class="st2" dx="0" dy="0" :hidden="caps">Ч</text>
                                <text transform="matrix(1 0 0 1 179.2339 181.7458)" class="st1 b" dx="-1.5" dy="-6" :hidden="!caps">ч</text>
                                <text transform="matrix(1 0 0 1 222.5416 163.7458)" class="st2" dx="0" dy="0" :hidden="caps">Ё</text>
                                <text transform="matrix(1 0 0 1 222.5416 181.7458)" class="st1 b" dx="-1.5" dy="-6" :hidden="!caps">ё</text>
                                <text transform="matrix(1 0 0 1 269.3973 163.7458)" class="st2" dx="0" dy="0" :hidden="caps">С</text>
                                <text transform="matrix(1 0 0 1 269.3973 181.7458)" class="st1 b" dx="-0.515594482421875" dy="-6" :hidden="!caps">с</text>
                                <text transform="matrix(1 0 0 1 314.0098 163.7458)" class="st2" dx="0" dy="0" :hidden="caps">М</text>
                                <text transform="matrix(1 0 0 1 314.0098 181.7458)" class="st1 b" dx="-1.695281982421875" dy="-6" :hidden="!caps">м</text>
                                <text transform="matrix(1 0 0 1 358.4863 163.7458)" class="st2" dx="0" dy="0" :hidden="caps">И</text>
                                <text transform="matrix(1 0 0 1 358.4863 181.7458)" class="st1 b" dx="-1.6953125" dy="-6" :hidden="!caps">и</text>
                                <text transform="matrix(1 0 0 1 401.6816 163.7458)" class="st2" dx="0" dy="0" :hidden="caps">Т</text>
                                <text transform="matrix(1 0 0 1 401.6816 181.7458)" class="st1 b" dx="-3.0234375" dy="-6" :hidden="!caps">т</text>
                                <text transform="matrix(1 0 0 1 519.074 136.7127)" class="st1 st2 focus-row" dx="0" dy="0">д</text>
                                <text transform="matrix(1 0 0 1 519.074 119.3763)" class="st1 st2" dx="0" dy="0">Д</text>
                                <text transform="matrix(1 0 0 1 451.3285 180.0409)" class="st1 st2 b2" dx="0" dy="0">ь</text>
                                <text transform="matrix(1 0 0 1 450.2827 164.3396)" class="st1 st2" dx="0" dy="0">Ь</text>
                                <text transform="matrix(1 0 0 1 495.9731 181.0409)" class="st1 st2 b2" dx="0" dy="0">в</text>
                                <text transform="matrix(1 0 0 1 494.9274 164.3396)" class="st1 st2" dx="0" dy="0">В</text>
                                <text transform="matrix(1 0 0 1 543.4077 181.0408)" class="st1 st2" dx="0" dy="0">ю</text>
                                <text transform="matrix(1 0 0 1 541.3276 163.2498)" class="st1 st2" dx="0" dy="0">Ю</text>
                                <text transform="matrix(1 0 0 1 565.621 138.7127)" class="st1 st2 focus-row" dx="0" dy="0">п</text>
                                <text transform="matrix(1 0 0 1 565.621 120.3763)" class="st1 st2" dx="0" dy="0">П</text>
                                <text transform="matrix(1 0 0 1 553.3923 94.426)" class="st1 st2" dx="0" dy="0">к</text>
                                <text transform="matrix(1 0 0 1 552.9709 74.8769)" class="st1 st2" dx="0" dy="0">К</text>
                                <text transform="matrix(1 0 0 1 598.7657 94.426)" class="st1 st2" dx="0" dy="0">ъ</text>
                                <text transform="matrix(1 0 0 1 598.3443 74.7849)" class="st1 st2" dx="0" dy="0">Ъ</text>
                                <text transform="matrix(1 0 0 1 644.3574 96.8807)" class="st1 st2" dx="0" dy="0">\</text>
                                <text transform="matrix(1 0 0 1 644.4941 74.8769)" class="st1 st2" dx="0" dy="0">|</text>
                                <text id="text-shift-left" transform="matrix(1 0 0 1 23.3467 173.0408)" class="st1 s st2">shift</text>
                                <text id="text-shift-right" transform="matrix(1 0 0 1 631.826 173.0408)" class="st1 s st2">shift</text>
                                <text id="text-enter" transform="matrix(1 0 0 1 626.3144 127.7128)" class="st1 s st2 focus-row">enter</text>
                                <text id="text-space" transform="matrix(1 0 0 1 299.7899 222.4646)" class="st1 s st2">space</text>
                            </g>
                        </svg>
                        <img :src="keyboardImage" :style="{'width': '70%', 'height': 'auto', 'max-width': '100%', 'margin-left': '-54%', 'margin-top': '-10%'}">
                    </div>
                </div>
                <div class="progress" style="margin-top: 20px; width: 30%;" align="left">
                    <el-progress :percentage="progress" :show-text="false" :color="'#5787E4'" :stroke-width="7"></el-progress>
                </div>
            </div>
        </div>
        <div class="result-dialog" :hidden="!resultDialog">
            <div class="chart-container">
                <div class="status">
                    <div class="text"><span class="title">ОНОО </span><br><span class="number">200</span></div>
                    <div class="text"><span class="title">WPM </span><br><span class="number">{{Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60))}}</span></div>
                    <div class="text"><span class="title">HIGH WPM </span><br><span class="number">{{getHighWpm}}</span></div>
                    <div class="actions-info">
                        <el-tooltip class="item" effect="dark" content="Дахин оролдох" placement="top-end">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                        </el-tooltip>
                    </div>

                    <div class="actions-info">
                        <el-tooltip class="item" effect="dark" content="Дараагийн хичээл" placement="top-end">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                        </el-tooltip>
                        
                    </div>
                </div>
                <canvas ref="resultChart"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
let timer = null;
let correctSound;
let errorSound;
export default {
    data() {
        return {
            resultDialog: false,
            chart: {
                data: null,
                keyword: null,
                wpm: []
            },
            lesson : {
                id: '',
                lvl: ''
            },
            progress: 0,
            keyboardImage: '',
            fingerText: '',
            text: {
                original : '',
                splitted: [],
                count: 0
            },
            counter: {
                current : 0,
                realWpm: 0,
                accuracy: 0,
                wpm: 0,
                start: false,
                time_passed : 1,
                characters: 0,
                errors: 0
            },
            status: {
                contentEdit: true,
                lessonname: '',
                groupname: ''
            },
            caps: false
        }
    }, 
    mounted() {
        this.lesson.id = this.$route.params.id;
        clearInterval(timer);
        correctSound = new Audio(require(`@/assets/sound/pass.mp3`));
        errorSound = new Audio(require(`@/assets/sound/error.mp3`));
        this.gettext();
        this.setFocus();
    },
    computed: {
        getHighWpm() {
            let max = 0;
            this.chart.wpm.forEach(element => {
                max < element ? max = element : null;
            });

            const wpm = Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60));
            return max > wpm ? max : wpm;
        }
    },
    methods: {
        showResultDialog() {
            this.updateChart();
            this.resultDialog = true;
            clearInterval(timer);
        },
        destroyChart() {
            if (this.chart.keyword) {
                this.chart.keyword.destroy();
            }
        },
        updateChart() {
            if (this.chart.keyword) {
                this.chart.keyword.destroy();
            }

            this.createChart();					
        },
        createChart() {
            const labels = [];
            for (let i = 0; i < this.counter.time_passed; i++) {
                labels.push(i + 1);
            }

            this.chart.data = {
                labels: labels,
                datasets: [
                    {
                        label: '',
                        data: this.chart.wpm,
                        borderColor: '#805500',
                        backgroundColor: '#805500',
                    }
                ]
            };
            const config = {
                type: 'line',
                data: this.chart.data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                            position: 'top',
                            font: {
                                size: 18
                            }
                        },
                        title: {
                            display: true,
                            text: ''
                        }
                    },
                    animations: {
                        tension: {
                            duration: 3000,
                            easing: 'linear',
                            from: 0.5,
                            to: 0,
                            loop: true
                        }
                    }
                },
            };

            Chart.defaults.font.size = 20;
            this.chart.keyword = new Chart(this.$refs.resultChart, config);
        },
        gettext() {
            var rts = this;
            this.chart.wpm = [];
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/lesson/get-lesson',
                data: {
                    id: this.lesson.id
                }
            })
            .then(function(data){
                if(data.data.result) {
                    rts.counter.realWpm = data.data.group.wpm;
                    rts.status.lessonname = data.data.data.lessonname;
                    Event.$emit('navbarname', 'Хичээл ' + data.data.data.lvl + ': ' +data.data.data.lessonname);
                    rts.status.groupname = data.data.group.groupName;
                    if(data.data.data.type != 'intro') {
                        rts.$router.push('/subjects');
                    } else {
                        rts.lesson.lvl = data.data.data.lvl;
                        rts.text.original = data.data.data.text;
                        rts.splitText();
                    }
                } else {
                    rts.$router.push('/subjects');
                }                    
            });
        },
        splitText() {
            let txt = this.text.original;
            this.text.splitted = txt.match(/.{1,1}/g);
            this.mon_finger();
        },
        setFocus() {
            this.$refs.inputDiv.focus();
        },
        startGame() {
            clearInterval(timer);
            this.counter.start = true;
            timer = setInterval(this.updateTimer, 1000);
        },
        updateTimer() {
            this.counter.time_passed++;
            const wpm = Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60));
            this.chart.wpm.push(wpm);
        },
        type() {
            correctSound.pause();
            errorSound.pause();
            if(this.counter.start == false) {
                this.startGame();
            }
            var input = this.$refs.inputDiv.innerHTML.replace('&amp;','&');
            if(input == '&nbsp;')
                input = ' ';

            var current = this.text.splitted[this.text.count][this.counter.current]
            this.$refs.inputDiv.innerHTML = '';
            

            if(input == current) {
                correctSound.currentTime = 0;
                correctSound.play();
                this.counter.characters++;
                this.progress = parseInt(this.counter.characters * 100 / this.text.original.length);
                this.$refs['main-span-' + this.counter.current][0].classList.remove('span-error');
                this.$refs['span-error-word-' + this.counter.current][0].innerHTML = '';
                this.$refs['main-span-' + this.counter.current][0].classList.remove('shake-span');
                this.$refs['child-span-' + this.counter.current][0].classList.remove('span-opacity-0');
                this.$refs['main-span-' + this.counter.current][0].classList.add('span-correct');
                if(this.text.count < this.text.splitted.length) {
                    if(this.counter.current == this.text.splitted[this.text.count].length - 1) {
                        this.counter.current = 0;
                        this.text.count++;
                    } else {
                        this.counter.current++;
                    }
                }

                if(this.text.count >= this.text.splitted.length) {
                    this.finishGame();
                    // this.$router.push({name: 'top-menu-success-lesson', params: {prev: 3, next: 4}});
                } else {
                    this.mon_finger();
                }
                
                
            } else {
                errorSound.currentTime = 0;
                errorSound.play();
                this.counter.errors++;
                this.$refs['span-error-word-' + this.counter.current][0].innerHTML = input;
                this.$refs['child-span-' + this.counter.current][0].classList.add('span-opacity-0');
                this.$refs['main-span-' + this.counter.current][0].classList.add('span-error');
                this.$refs['main-span-' + this.counter.current][0].classList.add('shake-span');
                setTimeout(() => {
                    this.$refs['span-error-word-' + this.counter.current][0].innerHTML = '';
                    this.$refs['child-span-' + this.counter.current][0].classList.remove('span-opacity-0');
                    this.$refs['main-span-' + this.counter.current][0].classList.remove('span-error');
                    this.$refs['main-span-' + this.counter.current][0].classList.remove('shake-span');
                }, 300);
            }
        },
        finishGame() {
            // clearInterval(timer);
            var score = 0; var accuracy= 0; var wpm = 0;
            
            var typed = this.counter.characters + this.counter.errors;
            accuracy = parseInt(typed / ( typed + this.counter.errors )  * 100 );
            wpm = parseInt((this.counter.characters / 5) / (this.counter.time_passed / 60));
            var diff_acc;
            if(accuracy > 80) {
                var diff = accuracy - 80;
                diff_acc = parseInt((diff * 100) / 20);
                
            } else {
                diff_acc = 0;
            }
            

            var wpmPoint = 100;
            var rts = this;
            score = wpmPoint + diff_acc;
            this.$axios({
                method: 'post',
                url: this.$appUrl +'/lesson/update-user-lesson',
                data: {
                    lessonId: this.lesson.id,
                    wpm,
                    accuracy,
                    score,
                    level: this.lesson.lvl
                }
            })
            .then(function(data){
                if(data.data.point > 0) {
                    Event.$emit('set-user-point', data.data.point);
                }

                console.log('====', score);
                rts.showResultDialog();
                // rts.$router.push({name: 'top-menu-success-lesson', params: {prev: rts.lesson.lvl}});
            });
        },
        mon_finger() {
            var current = this.text.splitted[this.text.count][this.counter.current]
            var elems = document.querySelectorAll(".selected-key");
            [].forEach.call(elems, function(el) {
                el.classList.remove("selected-key");
            });
            
                
            if( current == ' ' ) {
                this.keyboardImage = require(`@/assets/images/lesson/space.svg`);
                this.$refs.space.classList.add('selected-key');
                return 0;
            }
            
            var impossibleSymbols = ['№', '-', '₮', '_', ',','%', ':','.', '"','?', '=', '+'];
            if(impossibleSymbols.includes(current)) {
                switch (current) {
                    case '=':
                        this.$refs.tilda.classList.add('selected-key');
                        this.fingerText = 'Зүүн гарын чигчий хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/11.svg`);
                        break;
                    case '№':
                        this.$refs['1'].classList.add('selected-key');
                        this.fingerText = 'Зүүн гарын чигчий хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/1.svg`);
                        break;
                    case '-':
                        this.$refs['2'].classList.add('selected-key');
                        this.fingerText = 'Зүүн гарын ядам хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/2.svg`);
                        break;
                    case '"':
                        this.$refs['3'].classList.add('selected-key');
                        this.fingerText = 'Зүүн гарын дунд хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/3.svg`);
                        break;
                    case '₮':
                        this.$refs['4'].classList.add('selected-key');
                        this.fingerText = 'Зүүн гарын долоовор хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/4.svg`);
                        break;
                    case ':':
                        this.$refs['5'].classList.add('selected-key');
                        this.fingerText = 'Зүүн гарын долоовор хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/5.svg`);
                        break;
                    case '.':
                        this.$refs['6'].classList.add('selected-key');
                        this.fingerText = 'Баруун гарын долоовор хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/6.svg`);
                        break;
                    case '_':
                        this.$refs['7'].classList.add('selected-key');
                        this.fingerText = 'Баруун гарын долоовор хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/7.svg`);
                        break;
                    case ',':
                        this.$refs['8'].classList.add('selected-key');
                        this.fingerText = 'Баруун гарын дунд хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/8.svg`);
                        break;
                    case '%':
                        this.$refs['9'].classList.add('selected-key');
                        this.fingerText = 'Баруун гарын ядам хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/9.svg`);
                        break;
                    case '?':
                        this.$refs['0'].classList.add('selected-key');
                        this.fingerText = 'Баруун гарын чигчий хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/lowercase/0.svg`);
                        break;
                    case '+':
                        this.$refs.tilda.classList.add('selected-key');
                        this.fingerText = 'Баруун гарын чигчий хуруугаар Shift, Зүүн гарын чигчий хуруугаар';
                        this.caps = true;
                        this.keyboardImage = require(`@/assets/images/lesson/uppercase/11.svg`);
                        break;
                    default:
                        break;
                }
            } else {
                if (this.$refs[current.toUpperCase()]) {
                    this.$refs[current.toUpperCase()].classList.add('selected-key');
                }
                // console.log(this.$refs[current.toUpperCase()]);
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
                        this.$refs['shift-right'].classList.add('selected-key');
                        this.caps = false;
                        this.fingerText = 'Баруун гарын чигчий хуруугаар Shift, зүүн гарын чигий хуруугаар';
                        return this.keyboardImage = require(`@/assets/images/lesson/uppercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < left_4.length; i++) {
                    if (left_4[i] == current) {
                        this.caps = true;
                        this.fingerText = 'Зүүн гарын чигчий хуруугаар';
                        return this.keyboardImage = require(`@/assets/images/lesson/lowercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < left_3.length; i++) {
                    if (left_3[i] == current) {
                        this.caps = true;
                        this.fingerText = 'Зүүн гарын ядам хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/lowercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < left_shift_3.length; i++) {
                    if (left_shift_3[i] == current) {
                        this.$refs['shift-right'].classList.add('selected-key');
                        this.caps = false;
                        this.fingerText = 'Баруун гарын чигчий хуруугаар Shift, зүүн гарын ядам хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/uppercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < left_2.length; i++) {
                    if (left_2[i] == current) {
                        this.caps = true;
                        this.fingerText = 'Зүүн гарын дунд хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/lowercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < left_shift_2.length; i++) {
                    if (left_shift_2[i] == current) {
                        this.caps = false;
                        this.$refs['shift-right'].classList.add('selected-key');
                        this.fingerText = 'Баруун гарын чигчий хуруугаар Shift, зүүн гарын дунд хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/uppercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < left_1.length; i++) {
                    if (left_1[i] == current) {
                        this.caps = true;
                        this.fingerText = 'Зүүн гарын долоовор хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/lowercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < left_shift_1.length; i++) {
                    if (left_shift_1[i] == current) {
                        this.caps = false;
                        this.$refs['shift-right'].classList.add('selected-key');
                        this.fingerText = 'Баруун гарын чигчий хуруугаар Shift, зүүн гарын долоовор хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/uppercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < right_1.length; i++) {
                    if (right_1[i] == current) {
                        this.caps = true;
                        this.fingerText = 'Баруун гарын долоовор хуруугаар';
                        return this.keyboardImage = require(`@/assets/images/lesson/lowercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < right_shift_1.length; i++) {
                    if (right_shift_1[i] == current) {
                        this.caps = false;
                        this.$refs['shift-left'].classList.add('selected-key');
                        this.fingerText = 'Зүүн гарын чигчий хуруугаар Shift, Баруун гарын долоовор хуруугаар';
                        return this.keyboardImage = require(`@/assets/images/lesson/uppercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < right_2.length; i++) {
                    if (right_2[i] == current) {
                        this.caps = true;
                        this.fingerText = 'Баруун гарын дунд хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/lowercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < right_shift_2.length; i++) {
                    if (right_shift_2[i] == current) {
                        this.caps = false;
                        this.fingerText = 'Зүүн гарын чигчий хуруугаар Shift, Баруун гарын дунд хуруугаар'
                        this.$refs['shift-left'].classList.add('selected-key');
                        return this.keyboardImage = require(`@/assets/images/lesson/uppercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < right_3.length; i++) {
                    if (right_3[i] == current) {
                        this.caps = true;
                        this.fingerText = 'Баруун гарын ядам хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/lowercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < right_shift_3.length; i++) {
                    if (right_shift_3[i] == current) {
                        this.caps = false;
                        this.fingerText = 'Зүүн гарын чигчий хуруугаар Shift, Баруун гарын ядам хуруугаар'
                        this.$refs['shift-left'].classList.add('selected-key');
                        return this.keyboardImage = require(`@/assets/images/lesson/uppercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < right_4.length; i++) {
                    if (right_4[i] == current) {
                        this.caps = true;
                        this.fingerText = 'Баруун гарын чигчий хуруугаар'
                        return this.keyboardImage = require(`@/assets/images/lesson/lowercase/${current}.svg`);
                    }
                }

                for (let i = 0; i < right_shift_4.length; i++) {
                    if (right_shift_4[i] == current) {
                        this.caps = false;
                        this.fingerText = 'Зүүн гарын чигчий хуруугаар Shift, Баруун гарын чигчий хуруугаар'
                        this.$refs['shift-left'].classList.add('selected-key');
                        return this.keyboardImage = require(`@/assets/images/lesson/uppercase/${current}.svg`);
                    }
                }
            }
            
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2&display=swap');
/* @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap'); */

.bottom-box {
    width: 100%;
    bottom: 0;
    background: #fff;
    position: fixed;
    height: 50px;
    left: 0;
}
.text-span {
    font-size: 30px;
    font-weight: 500;
    height: 50px;
    width: 50px;
    display: inline-block;
    border-radius: 8px;
    position: relative;
    font-family: 'Roboto Mono', monospace;
}
.shake-span {
    animation: shake 0.5s;
    animation-iteration-count: infinite;
}
.span-normal {
    border: 1px solid #dadada;
    color: #fff;
    background: #0383F2;
}
.span-correct {
    border: 1px solid #10c373;
    color: #10c373;
    background: #e2f7e2;
} 
.st0 {
    fill: #c9c9c9;
}
.span-error {
    border: 1px solid #ff8097;
    background: #ff8097;
}
.span-error-text {
    position: absolute;
    top : 5%; 
    left : 30%;
    color: #fff;
}
.current-span {
    height: 3px;
    width: 50px;
    background: #0383f2;
    margin-top: 15px;
    transition: 1s;
}
.correct-span {
    background: green;
}
.span-opacity-0 {
    opacity: 0.2;
}

.all-title {
    color: grey;
}

.selected-key {
    fill: #0383F2;
    color: #fff;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
.intro-title {
    font-family: 'Exo 2', sans-serif;
    font-size: 20px;
    padding-left: 10%;
}

.intro-text {
    font-family: 'Exo 2', sans-serif;
    font-size: 25px;
    padding-left: 10%;
}
.word-box {
    position: absolute;
    padding-left: 20%;
}

</style>