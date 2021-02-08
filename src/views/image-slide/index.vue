<template>
  <div class="__image_slide__">
    <div class="container">
      <div class="slider">
        <div class="box1 box">
          <div class="bg"></div>
          <div class="details">
            <h1>I'm the first Box</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci
              pellentesque eget.
            </p>
            <button>Check Now</button>
          </div>

          <div class="illustration"><div class="inner"></div></div>
        </div>

        <div class="box2 box">
          <div class="bg"></div>
          <div class="details">
            <h1>I'm the second Box</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci
              pellentesque eget.
            </p>
            <button>Check Now</button>
          </div>

          <div class="illustration"><div class="inner"></div></div>
        </div>

        <div class="box3 box">
          <div class="bg"></div>
          <div class="details">
            <h1>I'm the third Box</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci
              pellentesque eget.
            </p>
            <button>Check Now</button>
          </div>

          <div class="illustration"><div class="inner"></div></div>
        </div>

        <div class="box4 box">
          <div class="bg"></div>
          <div class="details">
            <h1>I'm the fourth Box</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci
              pellentesque eget.
            </p>
            <button>Check Now</button>
          </div>

          <div class="illustration"><div class="inner"></div></div>
        </div>

        <div class="box5 box">
          <div class="bg"></div>
          <div class="details">
            <h1>I'm the fifth Box</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci
              pellentesque eget.
            </p>
            <button>Check Now</button>
          </div>

          <div class="illustration"><div class="inner"></div></div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="prev"
        width="56.898"
        height="91"
        viewBox="0 0 56.898 91"
      >
        <path
          d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z"
          transform="translate(0 91) rotate(-90)"
          fill="#fff"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="next"
        width="56.898"
        height="91"
        viewBox="0 0 56.898 91"
      >
        <path
          d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z"
          transform="translate(56.898) rotate(90)"
          fill="#fff"
        />
      </svg>
      <div class="trail">
        <div class="box1 active">1</div>
        <div class="box2">2</div>
        <div class="box3">3</div>
        <div class="box4">4</div>
        <div class="box5">5</div>
      </div>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap'
export default {
  name: 'ImageSlide',
  mounted() {
    // Slider(all Slides in a container)
    const slider = document.querySelector('.slider')
    // All trails
    const trail = document.querySelector('.trail').querySelectorAll('div')

    // Transform value
    let value = 0
    // trail index number
    let trailValue = 0
    // interval (Duration)
    let interval = 4000

    // Function to slide forward
    const slide = (condition) => {
      // CLear interval
      clearInterval(start)
      // update value and trailValue
      condition === 'increase' ? initiateINC() : initiateDEC()
      // move slide
      move(value, trailValue)
      // Restart Animation
      animate()
      // start interal for slides back
      start = setInterval(() => slide('increase'), interval)
    }

    // function for increase(forward, next) configuration
    const initiateINC = () => {
      // Remove active from all trails
      trail.forEach((cur) => cur.classList.remove('active'))
      // increase transform value
      value === 80 ? (value = 0) : (value += 20)
      // update trailValue based on value
      trailUpdate()
    }

    // function for decrease(backward, previous) configuration
    const initiateDEC = () => {
      // Remove active from all trails
      trail.forEach((cur) => cur.classList.remove('active'))
      // decrease transform value
      value === 0 ? (value = 80) : (value -= 20)
      // update trailValue based on value
      trailUpdate()
    }

    // function to transform slide
    const move = (S, T) => {
      // transform slider
      slider.style.transform = `translateX(-${S}%)`
      //add active class to the current trail
      trail[T].classList.add('active')
    }

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: 'power2.inOut' }
    })
    tl.from('.bg', { x: '-100%', opacity: 0 })
      .from('p', { opacity: 0 }, '-=0.3')
      .from('h1', { opacity: 0, y: '30px' }, '-=0.3')
      .from('button', { opacity: 0, y: '-40px' }, '-=0.8')

    // function to restart animation
    const animate = () => tl.restart()

    // function to update trailValue based on slide value
    const trailUpdate = () => {
      if (value === 0) {
        trailValue = 0
      } else if (value === 20) {
        trailValue = 1
      } else if (value === 40) {
        trailValue = 2
      } else if (value === 60) {
        trailValue = 3
      } else {
        trailValue = 4
      }
    }

    // Start interval for slides
    let start = setInterval(() => slide('increase'), interval)

    // Next  and  Previous button function (SVG icon with different classes)
    document.querySelectorAll('svg').forEach((cur) => {
      // Assign function based on the class Name("next" and "prev")
      cur.addEventListener('click', () =>
        cur.classList.contains('next') ? slide('increase') : slide('decrease')
      )
    })

    // function to slide when trail is clicked
    const clickCheck = (e) => {
      // CLear interval
      clearInterval(start)
      // remove active class from all trails
      trail.forEach((cur) => cur.classList.remove('active'))
      // Get selected trail
      const check = e.target
      // add active class
      check.classList.add('active')

      // Update slide value based on the selected trail
      if (check.classList.contains('box1')) {
        value = 0
      } else if (check.classList.contains('box2')) {
        value = 20
      } else if (check.classList.contains('box3')) {
        value = 40
      } else if (check.classList.contains('box4')) {
        value = 60
      } else {
        value = 80
      }
      // update trail based on value
      trailUpdate()
      // transfrom slide
      move(value, trailValue)
      // start animation
      animate()
      // start interval
      start = setInterval(() => slide('increase'), interval)
    }

    // Add function to all trails
    trail.forEach((cur) =>
      cur.addEventListener('click', (ev) => clickCheck(ev))
    )

    // Mobile touch Slide Section
    const touchSlide = (() => {
      let start, move, change, sliderWidth

      // Do this on initial touch on screen
      slider.addEventListener('touchstart', (e) => {
        // get the touche position of X on the screen
        start = e.touches[0].clientX
        // (each slide with) the width of the slider container divided by the number of slides
        sliderWidth = slider.clientWidth / trail.length
      })

      // Do this on touchDrag on screen
      slider.addEventListener('touchmove', (e) => {
        // prevent default function
        e.preventDefault()
        // get the touche position of X on the screen when dragging stops
        move = e.touches[0].clientX
        // Subtract initial position from end position and save to change variabla
        change = start - move
      })

      const mobile = (e) => {
        // if change is greater than a quarter of sliderWidth, next else Do NOTHING
        change > sliderWidth / 4 ? slide('increase') : null
        // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING
        change * -1 > sliderWidth / 4 ? slide('decrease') : null
        // reset all variable to 0
        ;[start, move, change, sliderWidth] = [0, 0, 0, 0]
      }
      // call mobile on touch end
      slider.addEventListener('touchend', mobile)
    })()
  }
}
</script>
<style lang="scss" scoped>
// Colors
$b1cd: #500033;
$b1cl: #ff0077;
$b2cd: #000050;
$b2cl: #0033ff;
$b3cd: #00501d;
$b3cl: #00ff44;
$b4cd: #554d00;
$b4cl: #ff4e00;
$b5cd: #300050;
$b5cl: #8000ff;
$black: #000;
$white: #fff;
$grey: #b5b4b4;

////////// Mixin

// Generate different colors for slides
@mixin color_render($DC, $LC) {
  background-color: $DC;
  .illustration .inner {
    background-color: $LC;
    &::after,
    &::before {
      background-color: rgba($LC, 0.4);
    }
  }
  button {
    background-color: $LC;
  }
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

.__image_slide__ {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-size: 62.5%;

  @media only screen and (max-width: 800px) {
    font-size: 57%;
  }

  background-color: #000;
  color: $white;
  padding: 8rem;
  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
}

.container {
  position: relative;
  overflow: hidden;
  border-radius: 5rem;

  @media only screen and (max-width: 1000px) {
    border-radius: 0;
  }
}

.slider {
  display: flex;
  width: 500%;
  height: 55rem;
  transition: all 0.25s ease-in;
  // overflow-x: auto;
  // scroll-snap-type: x mandatory;
  // -webkit-overflow-scrolling: touch;
  // scroll-behavior: smooth;
  transform: translateX(0);

  @media only screen and (max-width: 1000px) {
    height: 100vh;
  }

  .box {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    overflow: hidden;
    position: relative;

    @media only screen and (max-width: 650px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, 1fr);
    }

    .bg {
      padding: 2rem;
      background-color: rgba($black, 0.2);
      width: 55%;
      transform: skewX(7deg);
      position: absolute;
      height: 100%;
      left: -10%;
      padding-left: 20rem;
      transform-origin: 0 100%;

      @media only screen and (max-width: 800px) {
        width: 65%;
      }

      @media only screen and (max-width: 650px) {
        width: 100%;
        left: 0;
        bottom: 0;
        height: 54%;
        transform: skewX(0deg);
      }

      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: inherit;
        pointer-events: none;
        transform: skewX(10deg);

        @media only screen and (max-width: 650px) {
          width: 120%;
          bottom: 0;
          transform: skewX(0deg);
        }
      }
    }

    .details {
      padding: 5rem;
      padding-left: 10rem;
      z-index: 100;
      grid-column: 1 / span 1;
      grid-row: 1 / -1;

      @media only screen and (max-width: 650px) {
        grid-row: 2 / span 1;
        grid-column: 1 / -1;
        text-align: center;
        padding: 2rem;
        transform: translateY(-9rem);
      }

      h1 {
        font-size: 3.5rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      p {
        display: inline-block;
        font-size: 1.3rem;
        color: $grey;
        margin-bottom: 2rem;
        margin-right: 5rem;

        @media only screen and (max-width: 800px) {
          margin-right: 0;
        }
      }

      button {
        padding: 1rem 3rem;
        color: $white;
        border-radius: 2rem;
        outline: none;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          opacity: 0.8;
        }

        &:focus {
          outline: none;
          border: none;
        }
      }
    }
  }

  .box1 {
    @include color_render($b1cd, $b1cl);
  }
  .box2 {
    @include color_render($b2cd, $b2cl);
  }
  .box3 {
    @include color_render($b3cd, $b3cl);
  }
  .box4 {
    @include color_render($b4cd, $b4cl);
  }
  .box5 {
    @include color_render($b5cd, $b5cl);
  }

  .illustration {
    grid-column: 2 / -1;
    grid-row: 1 / -1;
    justify-self: center;

    @media only screen and (max-width: 650px) {
      grid-row: 1 / span 1;
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    div {
      height: 25rem;
      width: 18rem;
      border-radius: 3rem;
      background-color: $b1cl;
      position: relative;
      transform: skewX(-10deg);

      @media only screen and (max-width: 800px) {
        height: 20rem;
        width: 15rem;
      }

      &::after,
      &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 3rem;
        top: 0;
        left: 0;
      }

      &::after {
        transform: translate(4rem, -1rem);
      }
      &::before {
        transform: translate(2rem, -2rem);
      }
    }
  }
}

.prev,
.next,
.trail {
  z-index: 10000;
  position: absolute;
}

.prev,
.next {
  width: 4rem;
  cursor: pointer;
  opacity: 0.2;
  transition: all 0.3s ease;

  @media only screen and (max-width: 650px) {
    display: none;
  }

  &:hover {
    opacity: 1;
  }
}
.prev {
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
}

.next {
  top: 50%;
  right: 2%;
  transform: translateY(-50%);
}

.trail {
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  text-align: center;
  font-size: 1.5rem;

  @media only screen and (max-width: 650px) {
    width: 90%;
    bottom: 13%;
  }

  div {
    padding: 2rem;
    border-top: 3px solid #fff;
    cursor: pointer;
    opacity: 0.3;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.6;
    }

    @media only screen and (max-width: 650px) {
      padding: 1rem;
    }
  }
}

.active {
  opacity: 1 !important;
}
</style>
