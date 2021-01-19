import Slide from './slide'
import { shuffleArray } from '@/helpers/layer-motion-slideshow/index'
import { bodyColor } from '@/helpers/layer-motion-slideshow/index'
import TweenMax from "@tweenjs/tween.js"

export default class Slideshow {
    constructor(el, winsize) {
        this.DOM = {el: el};
        this.slides = [];
        [...this.DOM.el.querySelectorAll('.slide')].forEach(slide => this.slides.push(new Slide(slide, winsize, this)));
        this.slidesTotal = this.slides.length;
        this.current = 0;
        this.slides[this.current].setCurrent();

        this.animationSettings = {
            duration: 0.8,
            ease: Quint.easeOut,
            staggerFactor: 0.13
        };
    }
    navigate(dir) {
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
        this.toggleSlides(currentSlide, upcomingSlide);
    }
    showContent() {
        this.toggleContent('show');
    }
    hideContent() {
        this.toggleContent('hide');
    }
    toggleContent(action) {
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
    }
    toggleSlides(currentSlide, upcomingSlide) {
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
    }
}
