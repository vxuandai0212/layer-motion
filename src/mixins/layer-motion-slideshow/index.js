import imagesLoaded from 'imagesloaded'
import TweenMax from "@tweenjs/tween.js"
import Quint from 'gsap/EasePack'
import { TimelineMax } from 'gsap/all'

import { 
    lerp, 
    getMousePos,
    shuffleArray,
    bodyColor,
    lineEq
} from '@/helpers/layer-motion-slideshow/index'

import charming from 'charming'

export const mixin = {
  data: function() {
    return {
      winsize: null,
      mousePos: null,
      cursor: {
        DOM: {
          el: null,
          dot: null,
          circle: null
        },
        bounds: null,
        scale: 1,
        opacity: 1,
        lastMousePos: { dot: { x: 0, y: 0 }, circle: { x: 0, y: 0 } },
        lastScale: 1,
        lastOpacity: 1
      },
      slideshow: {
        DOM: {
          el: null
        },
        slides: null,
        slidesTotal: null,
        current: 0,
        animationSettings: {
          duration: 0.8,
          ease: Quint.easeOut,
          staggerFactor: 0.13
        }
      },
      nav: {
        DOM: {
          el: null,
          counter: null,
          counterCurrent: null,
          counterTotal: {
            innerHTML: null
          },
          navPrevCtrl: null,
          navNextCtrl: null
        }
      },
      isAnimating: false,
      isContentOpen: false,
      dir: null,
      tl: null
    }
  },
  methods: {
    init() {
      this.calcWinsize()

      window.addEventListener('resize', this.calcWinsize)

      this.setupCursor()
      
      this.setupSlideshow()

      this.setupNavigation()

      this.preloadAllImages()

      this.renderLoop()
    },
    calcWinsize() {
      let width = window.innerWidth,
        height = window.innerHeight
      this.winsize = { width, height }
    },
    handleMousemmove(ev) {
      this.mousePos = getMousePos(ev)
    },
    renderLoop() {
      requestAnimationFrame(this.renderLoop)
      this.renderCursor()
    },
    renderCursor() {
      this.cursor.lastMousePos.dot.x = lerp(
        this.cursor.lastMousePos.dot.x,
        this.mousePos.x - this.cursor.bounds.dot.width / 2,
        1
      )
      this.cursor.lastMousePos.dot.y = lerp(
        this.cursor.lastMousePos.dot.y,
        this.mousePos.y - this.cursor.bounds.dot.height / 2,
        1
      )
      this.cursor.lastMousePos.circle.x = lerp(
        this.cursor.lastMousePos.circle.x,
        this.mousePos.x - this.cursor.bounds.circle.width / 2,
        0.15
      )
      this.cursor.lastMousePos.circle.y = lerp(
        this.cursor.lastMousePos.circle.y,
        this.mousePos.y - this.cursor.bounds.circle.height / 2,
        0.15
      )
      this.cursor.lastScale = lerp(
        this.cursor.lastScale,
        this.cursor.scale,
        0.15
      )
      this.cursor.lastOpacity = lerp(
        this.cursor.lastOpacity,
        this.cursor.opacity,
        0.1
      )
      this.cursor.DOM.dot.style.transform = `translateX(${this.cursor.lastMousePos.dot.x}px) translateY(${this.cursor.lastMousePos.dot.y}px)`
      this.cursor.DOM.circle.style.transform = `translateX(${this.cursor.lastMousePos.circle.x}px) translateY(${this.cursor.lastMousePos.circle.y}px) scale(${this.cursor.lastScale})`
      this.cursor.DOM.circle.style.opacity = this.cursor.lastOpacity
    },
    cursorEnter() {
      this.cursor.scale = 2.7
    },
    cursorLeave() {
      this.cursor.scale = 1
    },
    cursorClick() {
      this.cursor.lastScale = 1
      this.cursor.lastOpacity = 0
    },
    preloadAllImages() {
      const el = document.getElementById('__layer_motion_slideshow_main__')
      imagesLoaded(
        document.querySelectorAll('.slide__figure-img'),
        { background: true },
        () => el.classList.remove('loading')
      )
    },
    setupCursor() {
      const cursorEl = document.querySelector('.cursor')
      this.cursor.DOM.el = cursorEl
      this.cursor.DOM.dot = cursorEl.querySelector('.cursor__inner--dot')
      this.cursor.DOM.circle = cursorEl.querySelector('.cursor__inner--circle')
      this.cursor.bounds = {
        dot: this.cursor.DOM.dot.getBoundingClientRect(),
        circle: this.cursor.DOM.circle.getBoundingClientRect()
      }
      this.cursor.scale = 1
      this.cursor.opacity = 1
      this.mousePos = { x: 0, y: 0 }
      this.cursor.lastMousePos = { dot: { x: 0, y: 0 }, circle: { x: 0, y: 0 } }
      this.cursor.lastScale = 1
      this.cursor.lastOpacity = 1
      window.addEventListener('mousemove', this.handleMousemmove)
      ;[...document.querySelectorAll('[data-hover]')].forEach((link) => {
        link.addEventListener('mouseenter', () => this.cursorEnter())
        link.addEventListener('mouseleave', () => this.cursorLeave())
        link.addEventListener('click', () => this.cursorClick())
      })
    },
    setupFigure(el) {
      let vm = this
      return new Promise((resolve, reject) => {
        let figure = {}
        figure.DOM = {}
        figure.DOM.el = el
        figure.DOM.img = figure.DOM.el.querySelector('.slide__figure-img')
        figure.DOM.slideEl = figure.DOM.img
        // We will add a tilt effect for the main figure. For this we will create clones of the main image that will move together
        // with the main image when the user moves the mouse.
        if (figure.DOM.el.classList.contains('slide__figure--main')) {
          figure.isMain = true
          // Number of total images (main image + clones).
          figure.totalTiltImgs = 2
          figure.DOM.inner = document.createElement('div')
          figure.DOM.slideEl = figure.DOM.inner
          figure.DOM.inner.className = 'slide__figure-inner'
          figure.DOM.el.appendChild(figure.DOM.inner)
          figure.DOM.inner.appendChild(figure.DOM.img)
          for (let i = 0; i <= figure.totalTiltImgs; ++i) {
            figure.DOM.inner.appendChild(figure.DOM.img.cloneNode(true))
          }
          // Initialize the tilt effect.
          vm.setupTilt(figure.DOM.inner, {
            valuesFromTo: [20, -20],
            lerpFactorOuter: 0.1,
            lerpFactor: (pos) => 0.02 * pos + 0.02
          }).then(tilt => figure.tilt = tilt)
        }
        resolve(figure)
      })
    },
    setupTilt(el, options) {
      let vm = this
      return new Promise(function(resolve, reject) {
        let tilt = {}
        tilt.DOM = {}
        tilt.DOM.el = el
        tilt.options = {
          valuesFromTo: [-50, 50],
          lerpFactorOuter: 0.25,
          lerpFactor: (pos) => 0.05 * Math.pow(2, pos)
        }
        Object.assign(tilt.options, options)
        tilt.DOM.moving = [...tilt.DOM.el.children]
        tilt.movingTotal = tilt.DOM.moving.length
        vm.mousePos = { x: vm.winsize.width / 2, y: vm.winsize.height / 2 }
        tilt.translations = [...new Array(tilt.movingTotal)].map(() => ({
          x: 0,
          y: 0
        }))
        resolve(tilt)
      })
    },
    tiltRender(tilt) {
      for (let i = 0; i <= tilt.movingTotal - 1; ++i) {
        let lerpFactor =
          i < tilt.movingTotal - 1
            ? tilt.options.lerpFactor(i)
            : tilt.options.lerpFactorOuter
        tilt.translations[i].x = lerp(
          tilt.translations[i].x,
          lineEq(
            tilt.options.valuesFromTo[1],
            tilt.options.valuesFromTo[0],
            this.winsize.width,
            0,
            this.mousePos.x
          ),
          lerpFactor
        )
        tilt.translations[i].y = lerp(
          tilt.translations[i].y,
          lineEq(
            tilt.options.valuesFromTo[1],
            tilt.options.valuesFromTo[0],
            this.winsize.height,
            0,
            this.mousePos.y
          ),
          lerpFactor
        )
        tilt.DOM.moving[
          i
        ].style.transform = `translateX(${tilt.translations[i].x}px) translateY(${tilt.translations[i].y}px)`
      }
      tilt.requestId = requestAnimationFrame(() => this.tiltRender(tilt))
    },
    tiltStart(tilt) {
      const requestId = tilt.requestId
      if (!requestId) {
        tilt.requestId = window.requestAnimationFrame(() =>
          this.tiltRender(tilt)
        )
      }
    },
    tiltStop(tilt) {
      const requestId = tilt.requestId
      if (requestId) {
        window.cancelAnimationFrame(requestId)
        tilt.requestId = undefined

        for (let i = 0; i <= tilt.movingTotal - 1; ++i) {
          tilt.translations[i].x = 0
          tilt.translations[i].y = 0
          tilt.DOM.moving[i].style.transform = `translateX(0px) translateY(0px)`
        }
      }
    },
    async setupFigures(el) {
      let vm = this
      return new Promise((resolve, reject) => {
        let figureEls = el.querySelectorAll('.slide__figure')
        let figures = []
        const promises = [];
        for (let i=0; i<figureEls.length; i++) {
          let figureEl = figureEls[i]
          promises.push(vm.setupFigure(figureEl).then(figure => figures.push(figure)))
        }
        Promise.all(promises).then(() => {
          resolve(figures)
        })
      })
    },
    setupSlide(el) {
      let vm = this
      return new Promise(function(resolve, reject) {
        let vm1 = vm
        let slide = {}
        slide.DOM = {}
        slide.DOM.el = el
        vm.setupFigures(el).then(figures => {
          let vm2 = vm1
          slide.figures = figures
          slide.figuresTotal = figures.length
          slide.DOM.title = slide.DOM.el.querySelector('.slide__title')
          slide.DOM.content = slide.DOM.el.querySelector('.slide__content')
          slide.contentcolor = slide.DOM.el.dataset.contentcolor
          slide.DOM.backFromContentCtrl = slide.DOM.el.querySelector('.slide__back')
          // We will add a tilt effect for the title. For this we will create clones of the title that will move
          // when the user moves the mouse.
          // Number of total title elements;
          slide.totalTiltText = 3
          slide.DOM.innerTitleTmp = document.createElement('span')
          slide.DOM.innerTitleTmp.className = 'slide__title-inner'
          slide.DOM.innerTitleTmp.innerHTML = slide.DOM.title.innerHTML
          slide.DOM.title.innerHTML = ''
          for (let i = 0; i <= slide.totalTiltText - 1; ++i) {
            slide.DOM.title.appendChild(slide.DOM.innerTitleTmp.cloneNode(true))
          }
          slide.DOM.innerTitle = [
            ...slide.DOM.title.querySelectorAll('.slide__title-inner')
          ]
          // Split the title inner elements into spans using charmingjs.
          slide.DOM.innerTitle.forEach((inner) => charming(inner))
          slide.innerTitleTotal = slide.DOM.innerTitle.length
          // Letters of the main one (the top most inner title).
          slide.innerTitleMainLetters = [
            ...slide.DOM.innerTitle[slide.innerTitleTotal - 1].querySelectorAll(
              'span'
            )
          ]
          // total letters.
          slide.titleLettersTotal = slide.innerTitleMainLetters.length
          // Initialize the tilt effect for the title.
          vm2.setupTilt(slide.DOM.title).then(tilt => {
            slide.textTilt = tilt
            slide.DOM.text = slide.DOM.el.querySelector('.slide__text')
            slide.DOM.showContentCtrl = slide.DOM.text.querySelector(
              '.slide__text-link'
            )
            resolve(slide)
          })
        })
      })
    },
    slideshowNavigate(dir) {
      if (this.isAnimating || this.isContentOpen) {
        return
      }
      this.isAnimating = true
      this.dir = dir

      const oldcurrent = this.slideshow.current
      // Update current.
      this.slideshow.current =
        this.dir === 'right'
          ? this.slideshow.current < this.slideshow.slidesTotal - 1
            ? this.slideshow.current + 1
            : 0
          : this.slideshow.current > 0
          ? this.slideshow.current - 1
          : this.slideshow.slidesTotal - 1

      const currentSlide = this.slideshow.slides[oldcurrent]
      const upcomingSlide = this.slideshow.slides[this.slideshow.current]
      this.slideshowToggleSlides(currentSlide, upcomingSlide)
    },
    slideshowShowContent() {
      this.slideshowToggleContent('show')
    },
    slideshowHideContent() {
      this.slideshowToggleContent('hide')
    },
    slideshowToggleContent(action) {
      if (this.isAnimating) {
        return false
      }
      this.isAnimating = true

      const currentSlide = this.slideshow.slides[this.slideshow.current]

      if (action === 'show') {
        this.isContentOpen = true
        this.navHideNavigationCtrls()
        this.dir = 'up'
      }

      this.tl = new TimelineMax({
        onComplete: () => {
          if (action === 'hide') {
            this.isContentOpen = false
            this.navShowNavigationCtrls()
          }
          this.isAnimating = false
        }
      }).add('begin')

      const times = {}
      times.switchtime =
        action === 'show'
          ? Number(
              this.slideshow.animationSettings.staggerFactor *
                (currentSlide.figuresTotal - 1) +
                this.slideshow.animationSettings.duration
            )
          : Number(
              Math.max(
                0.05 + 0.04 * (currentSlide.titleLettersTotal - 1),
                this.slideshow.animationSettings.duration
              )
            )

      const onSwitchCallback = () => {
        currentSlide.DOM.el.classList[action === 'show' ? 'add' : 'remove'](
          'slide--open'
        )
        if (action === 'hide') {
          this.dir = 'down'
        }
      }
      this.tl.addCallback(onSwitchCallback, times.switchtime)

      this.tl.to(
        document.body,
        this.slideshow.animationSettings.duration,
        {
          ease: this.slideshow.animationSettings.ease,
          backgroundColor:
            action === 'show' ? currentSlide.contentcolor : bodyColor
        },
        'begin+=' + times.switchtime
      )

      const currentSlideFigures =
        this.dir === 'down'
          ? currentSlide.figures.sort(
              (a, b) => a.DOM.el.dataset.sort - b.DOM.el.dataset.sort
            )
          : currentSlide.figures
              .slice()
              .sort((a, b) => a.DOM.el.dataset.sort - b.DOM.el.dataset.sort)
              .reverse()

      const figureMain = currentSlideFigures.find((figure) => figure.isMain)
      const extraInnerTitleElems = currentSlide.DOM.innerTitle.filter(
        (_, pos) => pos < currentSlide.innerTitleTotal - 1
      )

      times.slideFigures =
        action === 'show'
          ? (pos) => pos * this.slideshow.animationSettings.staggerFactor
          : (pos) =>
              Number(
                times.switchtime + pos * this.slideshow.animationSettings.staggerFactor
              )

      currentSlideFigures.forEach((figure, pos) => {
        this.tl
          .to(
            figure.DOM.el,
            this.slideshow.animationSettings.duration,
            {
              ease: this.slideshow.animationSettings.ease,
              y:
                action === 'show'
                  ? this.dir === 'up'
                    ? '-101%'
                    : '101%'
                  : '0%'
            },
            'begin+=' + times.slideFigures(pos)
          )
          .to(
            figure.DOM.slideEl,
            this.slideshow.animationSettings.duration,
            {
              ease: this.slideshow.animationSettings.ease,
              startAt: action === 'show' ? { transformOrigin: '50% 0%' } : {},
              y:
                action === 'show'
                  ? this.dir === 'up'
                    ? '101%'
                    : '-101%'
                  : '0%'
            },
            'begin+=' + times.slideFigures(pos)
          )
      })

      times.texts =
        action === 'show'
          ? this.slideshow.animationSettings.duration *
            this.slideshow.animationSettings.staggerFactor
          : Number(
              times.switchtime +
                this.slideshow.animationSettings.staggerFactor *
                  (currentSlide.figuresTotal - 1)
            )
      times.textsExtraTitles =
        action === 'show'
          ? times.texts
          : Number(
              0.05 + 0.04 * (currentSlide.titleLettersTotal - 1) + times.texts
            )

      this.tl.to(
        currentSlide.DOM.text,
        this.slideshow.animationSettings.duration,
        {
          ease: this.slideshow.animationSettings.ease,
          opacity: action === 'show' ? 0 : 1
        },
        'begin+=' + times.texts
      )

      this.tl.staggerTo(
        shuffleArray(currentSlide.innerTitleMainLetters),
        0.05,
        {
          ease: this.slideshow.animationSettings.ease,
          opacity: action === 'show' ? 0 : 1
        },
        0.04,
        'begin+=' + times.texts
      )

      extraInnerTitleElems.forEach((inner) => {
        this.tl.to(
          inner,
          0.1,
          {
            ease: this.slideshow.animationSettings.ease,
            opacity: action === 'show' ? 0 : 1
          },
          'begin+=' + times.textsExtraTitles
        )
      })

      times.content =
        action === 'show'
          ? Number(
              this.slideshow.animationSettings.staggerFactor *
                (currentSlide.figuresTotal - 1) +
                this.slideshow.animationSettings.duration
            )
          : 0
      times.contentExtraTitles =
        action === 'show'
          ? Number(
              0.05 + 0.04 * (currentSlide.titleLettersTotal - 1) + times.content
            )
          : times.content
      // Content comes/goes now..
      this.tl
        .to(
          figureMain.DOM.el,
          this.slideshow.animationSettings.duration,
          {
            ease: this.slideshow.animationSettings.ease,
            y: action === 'show' ? '0%' : this.dir === 'up' ? '-101%' : '101%'
          },
          'begin+=' + times.content
        )
        .to(
          figureMain.DOM.slideEl,
          this.slideshow.animationSettings.duration,
          {
            ease: this.slideshow.animationSettings.ease,
            y: action === 'show' ? '0%' : this.dir === 'up' ? '101%' : '-101%'
          },
          'begin+=' + times.content
        )
        .to(
          currentSlide.DOM.content,
          this.slideshow.animationSettings.duration,
          {
            ease: this.slideshow.animationSettings.ease,
            opacity: action === 'show' ? 1 : 0,
            startAt: action === 'show' ? { y: '5%' } : {},
            y: action === 'show' ? '0%' : '5%'
          },
          'begin+=' + times.content
        )
        .to(
          currentSlide.DOM.backFromContentCtrl,
          this.slideshow.animationSettings.duration,
          {
            ease: this.slideshow.animationSettings.ease,
            opacity: action === 'show' ? 1 : 0
          },
          'begin+=' + times.content
        )
        .staggerTo(
          shuffleArray(currentSlide.innerTitleMainLetters),
          0.05,
          {
            ease: this.slideshow.animationSettings.ease,
            opacity: action === 'show' ? 1 : 0
          },
          0.04,
          'begin+=' + times.content
        )

      extraInnerTitleElems.forEach((inner) => {
        this.tl.to(
          inner,
          0.1,
          {
            ease: this.slideshow.animationSettings.ease,
            opacity: action === 'show' ? 1 : 0
          },
          'begin+=' + times.contentExtraTitles
        )
      })
    },
    slideshowToggleSlides(currentSlide, upcomingSlide) {
      this.tl = new TimelineMax({
        onStart: () => {
          currentSlide.DOM.el.style.zIndex = 100
          upcomingSlide.DOM.el.style.zIndex = 101
        },
        onComplete: () => (this.isAnimating = false)
      }).add('begin')

      const onCompleteCurrentCallback = () => currentSlide.unsetCurrent()
      this.tl.addCallback(
        onCompleteCurrentCallback,
        this.slideshow.animationSettings.duration +
          this.slideshow.animationSettings.staggerFactor * (this.slidesTotal - 1)
      )

      const onStartUpcomingCallback = () => {
        upcomingSlide.figures.forEach((figure) => {
          TweenMax.set(figure.DOM.slideEl, {
            x: this.dir === 'right' ? '-101%' : '101%'
          })
        })
        TweenMax.set(upcomingSlide.DOM.text, { opacity: 0 })
        upcomingSlide.DOM.innerTitle.forEach((inner, pos) => {
          if (pos === upcomingSlide.innerTitleTotal - 1) {
            TweenMax.set([...inner.querySelectorAll('span')], { opacity: 0 })
          } else {
            TweenMax.set(inner, { opacity: 0 })
          }
        })
        upcomingSlide.setCurrent()
      }
      this.tl.addCallback(
        onStartUpcomingCallback,
        this.slideshow.animationSettings.staggerFactor * (currentSlide.figuresTotal - 1)
      )

      const currentSlideFigures =
        this.dir === 'right'
          ? currentSlide.figures.sort(
              (a, b) => a.DOM.el.dataset.sort - b.DOM.el.dataset.sort
            )
          : currentSlide.figures
              .slice()
              .sort((a, b) => a.DOM.el.dataset.sort - b.DOM.el.dataset.sort)
              .reverse()

      currentSlideFigures.forEach((figure, pos) => {
        this.tl
          .to(
            figure.DOM.el,
            this.slideshow.animationSettings.duration,
            {
              ease: this.slideshow.animationSettings.ease,
              x: this.dir === 'right' ? '-101%' : '101%'
            },
            'begin+=' + pos * this.slideshow.animationSettings.staggerFactor
          )
          .to(
            figure.DOM.slideEl,
            this.slideshow.animationSettings.duration,
            {
              ease: this.slideshow.animationSettings.ease,
              startAt: { transformOrigin: '0% 50%' },
              x: this.dir === 'right' ? '101%' : '-101%'
            },
            'begin+=' + pos * this.slideshow.animationSettings.staggerFactor
          )
      })

      this.tl.to(
        currentSlide.DOM.text,
        this.slideshow.animationSettings.duration,
        {
          ease: this.slideshow.animationSettings.ease,
          opacity: 0
        },
        'begin+=' +
          this.slideshow.animationSettings.duration * this.slideshow.animationSettings.staggerFactor
      )

      this.tl.staggerTo(
        shuffleArray(currentSlide.innerTitleMainLetters),
        0.05,
        {
          ease: this.slideshow.animationSettings.ease,
          opacity: 0
        },
        0.04,
        'begin+=' +
          this.slideshow.animationSettings.duration * this.slideshow.animationSettings.staggerFactor
      )

      currentSlide.DOM.innerTitle
        .filter((_, pos) => pos < currentSlide.innerTitleTotal - 1)
        .forEach((inner) => {
          this.tl.to(
            inner,
            0.1,
            {
              ease: this.slideshow.animationSettings.ease,
              opacity: 0
            },
            'begin+=' +
              this.slideshow.animationSettings.duration *
                this.slideshow.animationSettings.staggerFactor
          )
        })

      const upcomingSlideFigures =
        this.dir === 'right'
          ? upcomingSlide.figures.sort(
              (a, b) => a.DOM.el.dataset.sort - b.DOM.el.dataset.sort
            )
          : upcomingSlide.figures
              .slice()
              .sort((a, b) => a.DOM.el.dataset.sort - b.DOM.el.dataset.sort)
              .reverse()

      upcomingSlideFigures.forEach((figure, pos) => {
        this.tl
          .to(
            figure.DOM.el,
            this.slideshow.animationSettings.duration,
            {
              ease: this.slideshow.animationSettings.ease,
              startAt: { x: this.dir === 'right' ? '101%' : '-101%' },
              x: '0%'
            },
            'begin+=' +
              Number(
                this.slideshow.animationSettings.staggerFactor *
                  (currentSlide.figuresTotal - 1) +
                  pos * this.slideshow.animationSettings.staggerFactor
              )
          )
          .to(
            figure.DOM.slideEl,
            this.slideshow.animationSettings.duration,
            {
              ease: this.slideshow.animationSettings.ease,
              x: '0%'
            },
            'begin+=' +
              Number(
                this.slideshow.animationSettings.staggerFactor *
                  (currentSlide.figuresTotal - 1) +
                  pos * this.slideshow.animationSettings.staggerFactor
              )
          )
      })

      this.tl.to(
        upcomingSlide.DOM.text,
        this.slideshow.animationSettings.duration,
        {
          ease: this.slideshow.animationSettings.ease,
          opacity: 1
        },
        'begin+=' +
          this.slideshow.animationSettings.staggerFactor * (currentSlide.figuresTotal - 1)
      )

      this.tl.staggerTo(
        shuffleArray(upcomingSlide.innerTitleMainLetters),
        0.05,
        {
          ease: this.slideshow.animationSettings.ease,
          opacity: 1
        },
        0.04,
        'begin+=' +
          this.slideshow.animationSettings.staggerFactor * (currentSlide.figuresTotal - 1)
      )

      upcomingSlide.DOM.innerTitle
        .filter((_, pos) => pos < upcomingSlide.innerTitleTotal - 1)
        .forEach((inner) => {
          this.tl.to(
            inner,
            0.5,
            {
              ease: this.slideshow.animationSettings.ease,
              opacity: 1
            },
            'begin+=' +
              Number(
                0.05 +
                  0.04 * (upcomingSlide.titleLettersTotal - 1) +
                  this.slideshow.animationSettings.staggerFactor *
                    (currentSlide.figuresTotal - 1)
              )
          )
        })
    },
    setupSlides(els) {
      let vm = this
      return new Promise(function(resolve, reject) {
        let slides = []
        const promises = [];
        for (let i=0; i<els.length; i++) {
          let slideEl = els[i]
          promises.push(vm.setupSlide(slideEl).then(slide => slides.push(slide)))
        }
        Promise.all(promises).then(() => {
          resolve(slides)
        })
      })
    },
    setupSlideshow() {
      const slideshowEl = document.querySelector('.slideshow')
      const slideEls = slideshowEl.querySelectorAll('.slide')
      this.slideshow.DOM.el = slideshowEl
      let vm = this
      vm.setupSlides(slideEls).then(slides => {
        vm.slideshow.slides = slides
        vm.slideshow.slidesTotal = slides.length
      }).then(() => {
        vm.slideSetCurrent()
        vm.setupSlideControl()
      })
    },
    setupSlideControl() {
      for (let i=0; i<this.slideshow.slides.length; i++) {
        let backFromContentCtrl = this.slideshow.slides[i].DOM.backFromContentCtrl
        let showContentCtrl = this.slideshow.slides[i].DOM.showContentCtrl
        backFromContentCtrl.addEventListener(
          'click',
          this.slideshowHideContent()
        )
        showContentCtrl.addEventListener(
          'click',
          this.slideshowShowContent()
        )
      }
    },
    slideSetCurrent() {
      this.slideToggleCurrent(true)
    },
    slideUnsetCurrent() {
      this.slideToggleCurrent(false)
    },
    slideToggleCurrent(isCurrent) {
      let current = this.slideshow.slides[this.slideshow.current]
      current.DOM.el.classList[isCurrent ? 'add' : 'remove']('slide--current')
      // Start/Stop the images tilt effect (initialized on the main figure).
      let imageTilt = current.figures.find(figure => figure.isMain).tilt
      if (isCurrent) {
        this.tiltStart(imageTilt)
      } else {
        this.tiltStop(imageTilt)
      }
      // Start/Stop the title tilt effect.
      let titleTilt = current.textTilt
      if (isCurrent) {
        this.tiltStart(titleTilt)
      } else {
        this.tiltStop(titleTilt)
      }
    },
    setupNavigation() {
      const navEl = document.querySelector('.nav')
      this.nav.DOM.el = navEl
      this.nav.DOM.counter = this.nav.DOM.el.querySelector('.nav__counter')
      this.nav.DOM.counterCurrent = this.nav.DOM.counter.firstElementChild
      this.nav.DOM.counterTotal = this.nav.DOM.counter.lastElementChild
      this.nav.DOM.navPrevCtrl = this.nav.DOM.el.querySelector(
        '.nav__arrow--prev'
      )
      this.nav.DOM.navNextCtrl = this.nav.DOM.el.querySelector(
        '.nav__arrow--next'
      )
      this.nav.DOM.counterTotal.innerHTML = this.slideshow.slidesTotal
      this.navUpdateCounter()
      this.nav.DOM.navPrevCtrl.addEventListener(
        'click',
        this.onNavPrevClickHandler
      )
      this.nav.DOM.navNextCtrl.addEventListener(
        'click',
        this.onNavNextClickHandler
      )
    },
    navUpdateCounter() {
      this.nav.DOM.counterCurrent.innerHTML = this.slideshow.current + 1
    },
    navHideNavigationCtrls() {
      this.toggleNavigationCtrls('hide')
    },
    navShowNavigationCtrls() {
      this.toggleNavigationCtrls('show')
    },
    navToggleNavigationCtrls(action) {
      this.nav.DOM.navPrevCtrl.style.opacity = action === 'show' ? 1 : 0
      this.nav.DOM.navNextCtrl.style.opacity = action === 'show' ? 1 : 0
    },
    navigate(dir) {
      this.slideshowNavigate(dir)
      this.navUpdateCounter()
    },
    onNavPrevClickHandler() {
      this.navigate('left')
    },
    onNavNextClickHandler() {
      this.navigate('right')
    }
  }
}
