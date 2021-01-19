import TiltFx from './tiltfx'

export default class Figure {
    constructor(el, winsize) {
        this.DOM = {el: el};
        this.DOM.img = this.DOM.el.querySelector('.slide__figure-img');
        this.DOM.slideEl = this.DOM.img;
        // We will add a tilt effect for the main figure. For this we will create clones of the main image that will move together 
        // with the main image when the user moves the mouse.
        if ( this.DOM.el.classList.contains('slide__figure--main') ) {
            this.isMain = true;
            // Number of total images (main image + clones).
            this.totalTiltImgs = 2;
            this.DOM.inner = document.createElement('div');
            this.DOM.slideEl = this.DOM.inner;
            this.DOM.inner.className = 'slide__figure-inner';
            this.DOM.el.appendChild(this.DOM.inner);
            this.DOM.inner.appendChild(this.DOM.img);
            for (let i = 0; i <= this.totalTiltImgs; ++i) {
                this.DOM.inner.appendChild(this.DOM.img.cloneNode(true));
            }
            // Initialize the tilt effect.
            this.tilt = new TiltFx(this.DOM.inner, {
                valuesFromTo: [20,-20],
                lerpFactorOuter: 0.1,
                lerpFactor: pos => 0.02*pos+0.02
            }, winsize);
        }
    }
}
