export default class Navigation {
    constructor(el, slideshow) {
        this.DOM = {el: el};
        this.DOM.counter = this.DOM.el.querySelector('.nav__counter');
        this.DOM.counterCurrent = this.DOM.counter.firstElementChild;
        this.DOM.counterTotal = this.DOM.counter.lastElementChild;
        this.DOM.navPrevCtrl = this.DOM.el.querySelector('.nav__arrow--prev');
        this.DOM.navNextCtrl = this.DOM.el.querySelector('.nav__arrow--next');

        this.DOM.counterTotal.innerHTML = slideshow.slidesTotal;
        this.updateCounter();
        
        this.initEvents();
    }
    initEvents() {
        this.navigate = (dir) => {
            slideshow.navigate(dir);
            this.updateCounter();
        };
        this.onNavPrevClickHandler = () => this.navigate('left');
        this.onNavNextClickHandler = () => this.navigate('right');
        this.DOM.navPrevCtrl.addEventListener('click', this.onNavPrevClickHandler);
        this.DOM.navNextCtrl.addEventListener('click', this.onNavNextClickHandler);
    }
    updateCounter() {
        this.DOM.counterCurrent.innerHTML = slideshow.current + 1;
    }
    hideNavigationCtrls() {
        this.toggleNavigationCtrls('hide');
    }
    showNavigationCtrls() {
        this.toggleNavigationCtrls('show');
    }
    toggleNavigationCtrls(action) {
        this.DOM.navPrevCtrl.style.opacity = action === 'show' ? 1 : 0;
        this.DOM.navNextCtrl.style.opacity = action === 'show' ? 1 : 0;
    }
}