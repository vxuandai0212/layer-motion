<template>
  <div class="__nav_v1__">
    <div class="container">
      <span class="menu-trigger">
        <i class="menu-trigger-bar top"></i>
        <i class="menu-trigger-bar middle"></i>
        <i class="menu-trigger-bar bottom"></i>
      </span>
      <span class="close-trigger">
        <i class="close-trigger-bar left"></i>
        <i class="close-trigger-bar right"></i>
      </span>
      <span class="logo">
        <span>
          ⬢
          <i class="logo-title">UI</i>
          <i class="logo-badge">6</i>
        </span>
      </span>
      <div class="inner-container">
        <i class="menu-bg top"></i>
        <i class="menu-bg middle"></i>
        <i class="menu-bg bottom"></i>
        <div class="menu-container">
          <ul class="menu">
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Create account</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- -->
    <div id="links">
      <a id="twitter" href="https://twitter.com/karlovidek" target="_blank"
        ><span class="fa fa-twitter"></span
      ></a>
      <div id="pens">
        <a href="https://codepen.io/karlovidek/" target="_blank"
          ><span class="fa fa-codepen"></span
        ></a>
        my other Pens
      </div>
    </div>
  </div>
</template>
<script>
import { gsap, Power2, Power4 } from 'gsap'
export default {
  name: 'NavigationV1',
  mounted() {
    //OPEN TRIGGER
    var openTrigger = document.querySelector('.menu-trigger')
    var openTriggerTop = openTrigger.querySelector('.menu-trigger-bar.top')
    var openTriggerMiddle = openTrigger.querySelector('.menu-trigger-bar.middle')
    var openTriggerBottom = openTrigger.querySelector('.menu-trigger-bar.bottom')

    //CLOSE TRIGGER
    var closeTrigger = document.querySelector('.close-trigger')
    var closeTriggerLeft = closeTrigger.querySelector('.close-trigger-bar.left')
    var closeTriggerRight = closeTrigger.querySelector('.close-trigger-bar.right')

    //LOGO
    var logo = document.querySelector('.logo')

    //MENU
    var menuContainer = document.querySelector('.menu-container')
    var menu = document.querySelector('.menu')
    var menuTop = document.querySelector('.menu-bg.top')
    var menuMiddle = document.querySelector('.menu-bg.middle')
    var menuBottom = document.querySelector('.menu-bg.bottom')

    //TL
    var tlOpen = gsap.timeline({ paused: true })
    var tlClose = gsap.timeline({ paused: true })

    //OPEN TIMELINE
    tlOpen
      .add('preOpen')
      .to(
        logo,
        0.4,
        {
          scale: 0.8,
          opacity: 0,
          ease: Power2.easeOut
        },
        'preOpen'
      )
      .to(
        openTriggerTop,
        0.4,
        {
          x: '+80px',
          y: '-80px',
          delay: 0.1,
          ease: Power4.easeIn,
          onComplete: function() {
            closeTrigger.style.zIndex = 25
          }
        },
        'preOpen'
      )
      .to(
        openTriggerMiddle,
        0.4,
        {
          x: '+=80px',
          y: '-=80px',
          ease: Power4.easeIn,
          onComplete: function() {
            openTrigger.style.visibility = 'hidden'
          }
        },
        'preOpen'
      )
      .to(
        openTriggerBottom,
        0.4,
        {
          x: '+=80px',
          y: '-=80px',
          delay: 0.2,
          ease: Power4.easeIn
        },
        'preOpen'
      )
      .add('open', '-=0.4')
      .to(
        menuTop,
        0.8,
        {
          y: '13%',
          ease: Power4.easeInOut
        },
        'open'
      )
      .to(
        menuMiddle,
        0.8,
        {
          scaleY: 1,
          ease: Power4.easeInOut
        },
        'open'
      )
      .to(
        menuBottom,
        0.8,
        {
          y: '-114%',
          ease: Power4.easeInOut
        },
        'open'
      )
      .fromTo(
        menu,
        0.6,
        {
          y: 30,
          opacity: 0,
          visibility: 'hidden'
        },
        {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          ease: Power4.easeOut
        },
        '-=0.2'
      )
      .add('preClose', '-=0.8')
      .to(
        closeTriggerLeft,
        0.8,
        {
          x: '-=100px',
          y: '+=100px',
          ease: Power4.easeOut
        },
        'preClose'
      )
      .to(
        closeTriggerRight,
        0.8,
        {
          x: '+=100px',
          y: '+=100px',
          delay: 0.2,
          ease: Power4.easeOut
        },
        'preClose'
      )

    //CLOSE TIMELINE
    tlClose
      .add('close')
      .to(
        menuTop,
        0.2,
        {
          backgroundColor: '#6295ca',
          ease: Power4.easeInOut,
          onComplete: function() {
            logo.style.zIndex = 26
            closeTrigger.style.zIndex = 5
            openTrigger.style.visibility = 'visible'
          }
        },
        'close'
      )
      .to(
        menuMiddle,
        0.2,
        {
          backgroundColor: '#6295ca',
          ease: Power4.easeInOut
        },
        'close'
      )
      .to(
        menuBottom,
        0.2,
        {
          backgroundColor: '#6295ca',
          ease: Power4.easeInOut
        },
        'close'
      )
      .to(
        menu,
        0.6,
        {
          y: 20,
          opacity: 0,
          ease: Power4.easeOut,
          onComplete: function() {
            menu.style.visibility = 'hidden'
          }
        },
        'close'
      )
      .to(
        logo,
        0.8,
        {
          scale: 1,
          opacity: 1,
          ease: Power4.easeInOut
        },
        'close',
        '+=0.2'
      )
      .to(
        menuTop,
        0.8,
        {
          y: '-113%',
          ease: Power4.easeInOut
        },
        'close',
        '+=0.2'
      )
      .to(
        menuMiddle,
        0.8,
        {
          scaleY: 0,
          ease: Power4.easeInOut
        },
        'close',
        '+=0.2'
      )
      .to(
        menuBottom,
        0.8,
        {
          y: '23%',
          ease: Power4.easeInOut,
          onComplete: function() {
            menuTop.style.backgroundColor = '#ffffff'
            menuMiddle.style.backgroundColor = '#ffffff'
            menuBottom.style.backgroundColor = '#ffffff'
          }
        },
        'close',
        '+=0.2'
      )
      .to(
        closeTriggerLeft,
        0.2,
        {
          x: '+=100px',
          y: '-=100px',
          ease: Power4.easeIn
        },
        'close'
      )
      .to(
        closeTriggerRight,
        0.2,
        {
          x: '-=100px',
          y: '-=100px',
          delay: 0.1,
          ease: Power4.easeIn
        },
        'close'
      )
      .to(
        openTriggerTop,
        1,
        {
          x: '-=80px',
          y: '+=80px',
          delay: 0.2,
          ease: Power4.easeOut
        },
        'close'
      )
      .to(
        openTriggerMiddle,
        1,
        {
          x: '-=80px',
          y: '+=80px',
          ease: Power4.easeOut
        },
        'close'
      )
      .to(
        openTriggerBottom,
        1,
        {
          x: '-=80px',
          y: '+=80px',
          delay: 0.1,
          ease: Power4.easeOut
        },
        'close'
      )

		//EVENTS
    openTrigger.addEventListener('click', function() {
      if (tlOpen.progress() < 1) {
        tlOpen.play()
      } else {
        tlOpen.restart()
      }
    })

    closeTrigger.addEventListener('click', function() {
      if (tlClose.progress() < 1) {
        tlClose.play()
      } else {
        tlClose.restart()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.__nav_v1__ {
  //VARIABLES
  //Black
  $black-100: rgba(0, 0, 0, 1);
  $black-90: rgba(0, 0, 0, 0.9);
  $black-80: rgba(0, 0, 0, 0.8);
  $black-70: rgba(0, 0, 0, 0.7);
  $black-60: rgba(0, 0, 0, 0.6);
  $black-50: rgba(0, 0, 0, 0.5);
  $black-40: rgba(0, 0, 0, 0.4);
  $black-30: rgba(0, 0, 0, 0.3);
  $black-20: rgba(0, 0, 0, 0.2);
  $black-10: rgba(0, 0, 0, 0.1);

  //White
  $white-100: rgba(255, 255, 255, 1);
  $white-90: rgba(255, 255, 255, 0.9);
  $white-80: rgba(255, 255, 255, 0.8);
  $white-70: rgba(255, 255, 255, 0.7);
  $white-60: rgba(255, 255, 255, 0.6);
  $white-50: rgba(255, 255, 255, 0.5);
  $white-40: rgba(255, 255, 255, 0.4);
  $white-30: rgba(255, 255, 255, 0.3);
  $white-20: rgba(255, 255, 255, 0.2);
  $white-10: rgba(255, 255, 255, 0.1);

  //Invisible
  $transparent: rgba(255, 255, 255, 0);

  //COLORS
  $light-grey: #e0dfe1;
  $light-grey-A: #f0f0f0;
  $grey: #9f9e9f;
  $dark-grey: #222222;
  $white: #ffffff;
  $blue: #0190ec;

  //BMW
  $light-blue: #6295ca;
  $dark-blue: #13274c;
  $red: #d1253b;

  //ANIMATIONS stuff
  $hover: all 0.2s ease-in;
  $slide: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  $slide-delay: all 0.4s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  $slide-slow: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  $zoom: all 1s cubic-bezier(0.55, 0, 0.1, 1);
  $zoom-slow: all 2.4s cubic-bezier(0.55, 0, 0.1, 1);
  //MIXINS
  // ADDS A BROWSER PREFIX TO THE PROPERTY
  @mixin css3-prefix($property, $value) {
    -webkit-#{$property}: #{$value};
    -khtml-#{$property}: #{$value};
    -moz-#{$property}: #{$value};
    -ms-#{$property}: #{$value};
    -o-#{$property}: #{$value};
    #{$property}: #{$value};
  }
  // TRANSFORM
  @mixin transform($params) {
    @include css3-prefix('transform', $params);
  }
  //FONT IMPORT
  @import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);

  background-color: lighten($dark-grey, 10%);
  padding: 50px 0;
  font-family: 'Noto Sans', sans-serif;
  text-align: center;
  width: 100vw;
  height: 100vh;

  //
  .container {
    background-color: $dark-grey;
    margin: 0 auto;
    width: 100%;
    max-width: 320px;
    min-height: 568px;
    margin: 0 auto;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    -webkit-box-shadow: 0px 9px 13px 0px $black-30;
    -moz-box-shadow: 0px 9px 13px 0px $black-30;
    box-shadow: 0px 9px 13px 0px $black-30;
    -webkit-transform: scale(1);
  }

  .menu-trigger,
  .close-trigger {
    position: absolute;
    top: 32px;
    right: 20px;
    display: block;
    width: 42px;
    height: 42px;
    cursor: pointer;
    z-index: 333;

    &:hover {
      .menu-trigger-bar {
        &:before {
          width: 100%;
        }
      }

      .close-trigger-bar {
        &:before {
          width: 100%;
        }
      }
    }
  }

  .close-trigger {
    z-index: 5;
    top: 42px;
  }

  .menu-trigger-bar {
    display: block;
    width: 100%;
    height: 4px;
    background-color: $white-100;
    margin-bottom: 6px;
    transform: rotate(-45deg);
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 0%;
      height: 100%;
      background-color: $black-20;
      transition: $slide;
    }

    &.top {
      width: 50%;
    }
    &.middle {
      &:before {
        left: auto;
        right: 0;
      }
    }
    &.bottom {
      width: 50%;
      margin-left: 50%;
    }
  }

  .close-trigger-bar {
    display: block;
    width: 100%;
    height: 4px;
    background-color: $dark-grey;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 0%;
      height: 100%;
      background-color: $white-20;
      transition: $slide;
    }

    &.left {
      transform: translateX(100px) translateY(-100px) rotate(-45deg);
    }
    &.right {
      transform: translateX(-100px) translateY(-100px) rotate(45deg);
      top: -3px;
    }
  }

  .logo {
    display: block;
    width: 64px;
    height: 64px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -52px;
    margin-left: -32px;
    text-align: center;
    z-index: 10;

    span {
      display: block;
      text-align: center;
      line-height: 62px;
      font-size: 72px;
      color: $white-100;
    }
  }

  .logo-title {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 100%;
    color: $dark-grey;
    font-size: 32px;
    line-height: 82x;
  }
  .logo-badge {
    position: absolute;
    display: block;
    width: 24px;
    height: 24px;
    top: 6px;
    right: -6px;
    border-radius: 100%;
    background-color: $light-blue;
    font-size: 12px;
    line-height: 2;
    text-align: center;
  }

  .inner-container,
  .menu-container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }

  .inner-container {
    z-index: 20;
  }
  .menu-container {
    display: flex;
    align-items: center;
  }
  .menu {
    display: block;
    width: 100%;
    padding: 20%;
    //opacity: 0;
    //visibility: hidden;

    li {
      text-align: left;
      display: block;
      padding: 15px 0;
    }

    a {
      text-decoration: none;
      color: $dark-grey;
      display: inline-block;
      padding: 10px 0;
      position: relative;

      &:hover {
        &:before {
          opacity: 1;
          transform: translateX(0px);
        }
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 18px;
        height: 4px;
        opacity: 0;
        background-color: $dark-grey;
        transform: translateX(100px);
        transition: $slide;
      }
    }
  }

  .menu-bg {
    position: absolute;
    display: block;
    width: 200%;
    left: -53%;
    top: -25%;
    //top: -25%;
    height: 40%;
    background-color: $white-100;

    &.middle {
      top: 29%;
      left: -53%;
      transform: rotate(-45deg) scaleY(0);
    }
    &.top {
      left: -34%;
      top: 0;
      transform: rotate(-45deg) translateY(-152%);
      //top: -25%;
    }
    &.bottom {
      //bottom: 0;
      top: 105%;
      transform: rotate(-45deg) translateY(25%);
      left: -20%;
    }
  }

  #links {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    font-size: 13px;
    font-family: tahoma;
    color: #fff;
  }
  #links a {
    text-decoration: none;
    font-size: 2.3em;
    color: #fff;
  }
  #twitter {
    position: absolute;
    bottom: 15px;
    right: 20px;
  }
  #pens {
    position: absolute;
    bottom: 15px;
    left: 20px;
  }
}
</style>
