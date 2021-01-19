import Figure from './figure'
import TiltFx from './tiltfx'
import charming from 'charming'

export default class Slide {
    constructor(el, winsize, slideshow) {
        this.DOM = {el: el};
        this.figures = [];
        [...this.DOM.el.querySelectorAll('.slide__figure')].forEach(figure => this.figures.push(new Figure(figure, winsize)));
        this.figuresTotal = this.figures.length;
        this.DOM.title = this.DOM.el.querySelector('.slide__title');
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
    }
    setCurrent() {
        this.toggleCurrent(true);
    }
    unsetCurrent() {
        this.toggleCurrent(false);
    }
    toggleCurrent(isCurrent) {
        this.DOM.el.classList[isCurrent ? 'add' : 'remove']('slide--current');
        // Start/Stop the images tilt effect (initialized on the main figure).
        this.figures.find(figure => figure.isMain).tilt[isCurrent ? 'start' : 'stop']();
        // Start/Stop the title tilt effect.
        this.textTilt[isCurrent ? 'start' : 'stop']();
    }
}
