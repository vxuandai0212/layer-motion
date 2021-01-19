import imagesLoaded from 'imagesloaded'

import { lerp, getMousePos } from '@/helpers/layer-motion-slideshow/index'

export const mixin = {
	data: function() {
		return {
            winsize: null,
            cursor: {
                DOM: {
                    el: null,
                    dot: null,
                    circle: null
                },
                bounds: null,
                scale: 1,
                opacity: 1,
                mousePos: { x: 0, y: 0 },
                lastMousePos: { dot: { x: 0, y: 0 }, circle: { x: 0, y: 0 } },
                lastScale: 1,
                lastOpacity: 1,
                mousePos: null
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
            isContentOpen: false
		}
	},
	methods: {
		init() {        
			window.addEventListener('resize', this.calcWinsize)

            this.setupCursor()

            this.setupSlideshow()

            this.setupNavigation()

            this.preloadAllImages()

            this.renderLoop()
        },
        calcWinsize() {
			let width = window.innerWidth,
				height = window.innerHeight;
            this.winsize = { width, height }
        },
        handleMousemmove(ev) {
            this.cursor.mousePos = getMousePos(ev)
        },
        renderLoop() {
            requestAnimationFrame(this.renderLoop)
            this.renderCursor()
        },
        renderCursor() {
            this.cursor.lastMousePos.dot.x = lerp(this.cursor.lastMousePos.dot.x, this.cursor.mousePos.x - this.cursor.bounds.dot.width/2, 1)
            this.cursor.lastMousePos.dot.y = lerp(this.cursor.lastMousePos.dot.y, this.cursor.mousePos.y - this.cursor.bounds.dot.height/2, 1)
            this.cursor.lastMousePos.circle.x = lerp(this.cursor.lastMousePos.circle.x, this.cursor.mousePos.x - this.cursor.bounds.circle.width/2, 0.15)
            this.cursor.lastMousePos.circle.y = lerp(this.cursor.lastMousePos.circle.y, this.cursor.mousePos.y - this.cursor.bounds.circle.height/2, 0.15)
            this.cursor.lastScale = lerp(this.cursor.lastScale, this.cursor.scale, 0.15)
            this.cursor.lastOpacity = lerp(this.cursor.lastOpacity, this.cursor.opacity, 0.1)
            this.cursor.DOM.dot.style.transform = `translateX(${(this.cursor.lastMousePos.dot.x)}px) translateY(${this.cursor.lastMousePos.dot.y}px)`
            this.cursor.DOM.circle.style.transform = `translateX(${(this.cursor.lastMousePos.circle.x)}px) translateY(${this.cursor.lastMousePos.circle.y}px) scale(${this.cursor.lastScale})`
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
            this.cursor.bounds = { dot: this.cursor.DOM.dot.getBoundingClientRect(), circle: this.cursor.DOM.circle.getBoundingClientRect() }
            this.cursor.scale = 1
            this.cursor.opacity = 1
            this.cursor.mousePos = { x: 0, y: 0 }
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
        getSlideInfo(el) {
            let slide = {}
            slide.DOM.el = el
            slide.figures = []
            ;[...el.querySelectorAll('.slide__figure')].forEach(figure => this.figures.push(this.getFigureInfo(figure)))
            slide.figuresTotal = slide.figures.length
            slide.DOM.title = slide.DOM.el.querySelector('.slide__title');
        this.DOM.content = this.DOM.el.querySelector('.slide__content');
        this.contentcolor = this.DOM.el.dataset.contentcolor;
        this.onClickBackFromContentFn = () => {
            slideshow.hideContent();
        };
        this.DOM.backFromContentCtrl = this.DOM.el.querySelector('.slide__back');
        this.DOM.backFromContentCtrl.addEventListener('click', this.onClickBackFromContentFn);
        // We will add a tilt effect for the title. For this we will create clones of the title that will move 
        // when the user moves the mouse.
        // Number of total title elements;
        this.totalTiltText = 3;
        this.DOM.innerTitleTmp = document.createElement('span');
        this.DOM.innerTitleTmp.className = 'slide__title-inner';
        this.DOM.innerTitleTmp.innerHTML = this.DOM.title.innerHTML;
        this.DOM.title.innerHTML = '';
        for (let i = 0; i <= this.totalTiltText-1; ++i) {
            this.DOM.title.appendChild(this.DOM.innerTitleTmp.cloneNode(true));
        }
        this.DOM.innerTitle = [...this.DOM.title.querySelectorAll('.slide__title-inner')];
        // Split the title inner elements into spans using charmingjs.
        this.DOM.innerTitle.forEach((inner) => charming(inner));
        this.innerTitleTotal = this.DOM.innerTitle.length;
        // Letters of the main one (the top most inner title).
        this.innerTitleMainLetters = [...this.DOM.innerTitle[this.innerTitleTotal-1].querySelectorAll('span')];
        // total letters.
        this.titleLettersTotal = this.innerTitleMainLetters.length;
        // Initialize the tilt effect for the title.
        this.textTilt = new TiltFx(this.DOM.title, winsize);
        this.DOM.text = this.DOM.el.querySelector('.slide__text');
        this.DOM.showContentCtrl = this.DOM.text.querySelector('.slide__text-link');
        this.onClickShowContentFn = (ev) => {
            ev.preventDefault();
            slideshow.showContent();
        };
        this.DOM.showContentCtrl.addEventListener('click', this.onClickShowContentFn);
        },
        slideshowNavigate(dir) {
            if ( this.isAnimating || this.isContentOpen ) {
                return;
            }
            this.isAnimating = true;
            this.dir = dir;
    
            const oldcurrent = this.current;
            // Update current.
            this.current = this.dir === 'right' ? this.current < this.slidesTotal - 1 ? this.current + 1 : 0 :
                                            this.current > 0 ? this.current - 1 : this.slidesTotal - 1;
    
            const currentSlide = this.slides[oldcurrent];
            const upcomingSlide = this.slides[this.current];
            this.slideshowToggleSlides(currentSlide, upcomingSlide);
        },
        slideshowShowContent() {
            this.slideshowToggleContent('show');
        },
        slideshowHideContent() {
            this.slideshowToggleContent('hide');
        },
        slideshowToggleContent(action) {
            if ( this.isAnimating ) {
                return false;
            }
            this.isAnimating = true;
            
            const currentSlide = this.slides[this.current];
    
            if ( action === 'show' ) {
                this.isContentOpen = true;
                this.nav.hideNavigationCtrls();
                this.dir = 'up';
            }
    
            this.tl = new TimelineMax({
                onComplete: () => {
                    if ( action === 'hide' ) {
                        this.isContentOpen = false;
                        this.nav.showNavigationCtrls();
                    }
                    this.isAnimating = false;
                }
            }).add('begin');
    
            const times = {};
            times.switchtime = action === 'show' ? 
                Number(this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1) + this.animationSettings.duration) :
                Number(Math.max(0.05 + 0.04*(currentSlide.titleLettersTotal-1),this.animationSettings.duration));
    
            const onSwitchCallback = () => {
                currentSlide.DOM.el.classList[action === 'show' ? 'add' : 'remove']('slide--open')
                if ( action === 'hide' ) {
                    this.dir = 'down';
                }
            };
            this.tl.addCallback(onSwitchCallback, times.switchtime);
            
            this.tl.to(body, this.animationSettings.duration, { 
                ease: this.animationSettings.ease,
                backgroundColor: action === 'show' ? currentSlide.contentcolor : bodyColor
            }, 'begin+=' + times.switchtime);
    
            const currentSlideFigures = this.dir === 'down' ? 
                currentSlide.figures.sort((a,b) => a.DOM.el.dataset.sort-b.DOM.el.dataset.sort) : 
                currentSlide.figures.slice().sort((a,b) => a.DOM.el.dataset.sort-b.DOM.el.dataset.sort).reverse();
            
            const figureMain = currentSlideFigures.find(figure => figure.isMain);
            const extraInnerTitleElems = currentSlide.DOM.innerTitle.filter((_,pos) => pos < currentSlide.innerTitleTotal - 1);
    
            times.slideFigures = action === 'show' ? 
                pos => pos*this.animationSettings.staggerFactor : 
                pos => Number(times.switchtime + pos*this.animationSettings.staggerFactor);
    
            currentSlideFigures.forEach((figure, pos) => {
                this.tl
                .to(figure.DOM.el, this.animationSettings.duration, { 
                    ease: this.animationSettings.ease,
                    y: action === 'show' ? this.dir === 'up' ? '-101%' : '101%' : '0%',
                }, 'begin+=' + times.slideFigures(pos))
                .to(figure.DOM.slideEl, this.animationSettings.duration, { 
                    ease: this.animationSettings.ease,
                    startAt: action === 'show' ? {transformOrigin: '50% 0%'} : {},
                    y: action === 'show' ? this.dir === 'up' ? '101%' : '-101%' : '0%',
                }, 'begin+=' + times.slideFigures(pos));
            });
    
            times.texts = action === 'show' ? 
                        this.animationSettings.duration*this.animationSettings.staggerFactor : 
                        Number(times.switchtime + this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1));
            times.textsExtraTitles = action === 'show' ? times.texts : Number(0.05 + 0.04*(currentSlide.titleLettersTotal-1) + times.texts);
    
            this.tl.to(currentSlide.DOM.text, this.animationSettings.duration, { 
                ease: this.animationSettings.ease,
                opacity: action === 'show' ? 0 : 1
            }, 'begin+=' + times.texts);
    
            this.tl.staggerTo(shuffleArray(currentSlide.innerTitleMainLetters), 0.05, { 
                ease: this.animationSettings.ease,
                opacity: action === 'show' ? 0 : 1
            }, 0.04, 'begin+=' + times.texts);
    
            extraInnerTitleElems.forEach(inner => {
                this.tl.to(inner, 0.1, {
                    ease: this.animationSettings.ease,
                    opacity: action === 'show' ? 0 : 1
                }, 'begin+=' + times.textsExtraTitles);
            });
    
            times.content = action === 'show' ? Number(this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1) + this.animationSettings.duration) : 0;
            times.contentExtraTitles = action === 'show' ? Number(0.05 + 0.04*(currentSlide.titleLettersTotal-1) + times.content) : times.content;
            // Content comes/goes now..
            this.tl
            .to(figureMain.DOM.el, this.animationSettings.duration, { 
                ease: this.animationSettings.ease,
                y: action === 'show' ? '0%' : this.dir === 'up' ? '-101%' : '101%'
            }, 'begin+=' + times.content)
            .to(figureMain.DOM.slideEl, this.animationSettings.duration, { 
                ease: this.animationSettings.ease,
                y: action === 'show' ? '0%' : this.dir === 'up' ? '101%' : '-101%',
            }, 'begin+=' + times.content)
            .to(currentSlide.DOM.content, this.animationSettings.duration, { 
                ease: this.animationSettings.ease,
                opacity: action === 'show' ? 1 : 0,
                startAt: action === 'show' ? {y: '5%'} : {},
                y: action === 'show' ? '0%' : '5%'
            }, 'begin+=' + times.content)
            .to(currentSlide.DOM.backFromContentCtrl, this.animationSettings.duration, { 
                ease: this.animationSettings.ease,
                opacity: action === 'show' ? 1 : 0
            }, 'begin+=' + times.content)
            .staggerTo(shuffleArray(currentSlide.innerTitleMainLetters), 0.05, { 
                ease: this.animationSettings.ease,
                opacity: action === 'show' ? 1 : 0
            }, 0.04, 'begin+=' + times.content);
    
            extraInnerTitleElems.forEach(inner => {
                this.tl.to(inner, 0.1, {
                    ease: this.animationSettings.ease,
                    opacity: action === 'show' ? 1 : 0
                }, 'begin+=' + times.contentExtraTitles);
            });
        },
        slideshowToggleSlides(currentSlide, upcomingSlide) {
            this.tl = new TimelineMax({
                onStart: () => {
                    currentSlide.DOM.el.style.zIndex = 100;
                    upcomingSlide.DOM.el.style.zIndex = 101;
                },
                onComplete: () => this.isAnimating = false
            }).add('begin');

            const onCompleteCurrentCallback = () => currentSlide.unsetCurrent();
            this.tl.addCallback(onCompleteCurrentCallback, this.animationSettings.duration + this.animationSettings.staggerFactor*(this.slidesTotal-1));

            const onStartUpcomingCallback = () => {
                upcomingSlide.figures.forEach((figure) => {
                    TweenMax.set(figure.DOM.slideEl, {
                        x: this.dir === 'right' ? '-101%' : '101%'
                    });
                });
                TweenMax.set(upcomingSlide.DOM.text, {opacity: 0}); 
                upcomingSlide.DOM.innerTitle.forEach((inner, pos) => {
                    if ( pos === upcomingSlide.innerTitleTotal - 1 ) {
                        TweenMax.set([...inner.querySelectorAll('span')], {opacity: 0});
                    }
                    else {
                        TweenMax.set(inner, {opacity: 0});
                    }
                });
                upcomingSlide.setCurrent();
            };
            this.tl.addCallback(onStartUpcomingCallback, this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1));
            
            const currentSlideFigures = this.dir === 'right' ? 
                currentSlide.figures.sort((a,b) => a.DOM.el.dataset.sort-b.DOM.el.dataset.sort) : 
                currentSlide.figures.slice().sort((a,b) => a.DOM.el.dataset.sort-b.DOM.el.dataset.sort).reverse();

            currentSlideFigures.forEach((figure, pos) => {
                this.tl
                .to(figure.DOM.el, this.animationSettings.duration, { 
                    ease: this.animationSettings.ease,
                    x: this.dir === 'right' ? '-101%' : '101%'
                }, 'begin+=' + pos*this.animationSettings.staggerFactor)
                .to(figure.DOM.slideEl, this.animationSettings.duration, { 
                    ease: this.animationSettings.ease,
                    startAt: {transformOrigin: '0% 50%'},
                    x: this.dir === 'right' ? '101%' : '-101%'
                }, 'begin+=' + pos*this.animationSettings.staggerFactor);
            });

            this.tl.to(currentSlide.DOM.text, this.animationSettings.duration, { 
                ease: this.animationSettings.ease,
                opacity: 0
            }, 'begin+=' + this.animationSettings.duration*this.animationSettings.staggerFactor);

            this.tl.staggerTo(shuffleArray(currentSlide.innerTitleMainLetters), 0.05, { 
                ease: this.animationSettings.ease,
                opacity: 0
            }, 0.04, 'begin+=' + this.animationSettings.duration*this.animationSettings.staggerFactor);

            currentSlide.DOM.innerTitle.filter((_,pos) => pos < currentSlide.innerTitleTotal - 1).forEach(inner => {
                this.tl.to(inner, 0.1, {
                    ease: this.animationSettings.ease,
                    opacity: 0
                }, 'begin+=' + this.animationSettings.duration*this.animationSettings.staggerFactor);
            });
            
            const upcomingSlideFigures = this.dir === 'right' ? 
                upcomingSlide.figures.sort((a,b) => a.DOM.el.dataset.sort-b.DOM.el.dataset.sort) : 
                upcomingSlide.figures.slice().sort((a,b) => a.DOM.el.dataset.sort-b.DOM.el.dataset.sort).reverse();

            upcomingSlideFigures.forEach((figure, pos) => {
                this.tl
                .to(figure.DOM.el, this.animationSettings.duration, { 
                    ease: this.animationSettings.ease,
                    startAt: {x: this.dir === 'right' ? '101%' : '-101%'},
                    x: '0%'
                }, 'begin+=' + Number(this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1) + pos*this.animationSettings.staggerFactor))
                .to(figure.DOM.slideEl, this.animationSettings.duration, { 
                    ease: this.animationSettings.ease,
                    x: '0%'
                }, 'begin+=' + Number(this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1) + pos*this.animationSettings.staggerFactor));
            });

            this.tl.to(upcomingSlide.DOM.text, this.animationSettings.duration, { 
                ease: this.animationSettings.ease,
                opacity: 1
            }, 'begin+=' + this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1));

            this.tl.staggerTo(shuffleArray(upcomingSlide.innerTitleMainLetters), 0.05, { 
                ease: this.animationSettings.ease,
                opacity: 1
            }, 0.04, 'begin+=' + this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1));
            
            upcomingSlide.DOM.innerTitle.filter((_,pos) => pos < upcomingSlide.innerTitleTotal - 1).forEach(inner => {
                this.tl.to(inner, 0.5, {
                    ease: this.animationSettings.ease,
                    opacity: 1
                }, 'begin+=' + Number(0.05 + 0.04*(upcomingSlide.titleLettersTotal-1) + this.animationSettings.staggerFactor*(currentSlide.figuresTotal-1)));
            });
        },
        setupSlideshow() {
            const slideshowEl = document.querySelector('.slideshow')
            this.slideshow.DOM.el = slideshowEl
            this.slideshow.slides = []
            ;[...this.slideshow.DOM.el.querySelectorAll('.slide')].forEach(slide => this.slideshow.slides.push(this.getSlideInfo(slide)))
            this.slideshow.slidesTotal = this.slideshow.slides.length
            this.slideshow.slides[this.current].setCurrent()
        },
        setupNavigation() {
            const navEl = document.querySelector('.nav')
            this.nav.DOM.el = navEl
            this.nav.DOM.counter = this.nav.DOM.el.querySelector('.nav__counter')
            this.nav.DOM.counterCurrent = this.nav.DOM.counter.firstElementChild
            this.nav.DOM.counterTotal = this.nav.DOM.counter.lastElementChild
            this.nav.DOM.navPrevCtrl = this.nav.DOM.el.querySelector('.nav__arrow--prev')
            this.nav.DOM.navNextCtrl = this.nav.DOM.el.querySelector('.nav__arrow--next')
            this.nav.DOM.counterTotal.innerHTML = this.slideshow.slidesTotal
            this.navUpdateCounter()
            this.nav.DOM.navPrevCtrl.addEventListener('click', this.onNavPrevClickHandler)
            this.nav.DOM.navNextCtrl.addEventListener('click', this.onNavNextClickHandler)
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
