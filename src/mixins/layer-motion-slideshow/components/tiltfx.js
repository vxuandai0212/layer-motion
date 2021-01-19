import { lineEq } from '@/helpers/layer-motion-slideshow/index'
import { lerp } from '@/helpers/layer-motion-slideshow/index'
import { getMousePos } from '@/helpers/layer-motion-slideshow/index'

export default class TiltFx {
    constructor(el, options, winsize) {
        this.DOM = {el: el};
        this.options = {
            valuesFromTo: [-50,50],
            lerpFactorOuter: 0.25,
            lerpFactor: pos => 0.05*Math.pow(2,pos)
        };
        Object.assign(this.options, options);
        this.DOM.moving = [...this.DOM.el.children];
        this.movingTotal = this.DOM.moving.length;
        this.mousePos = { x : winsize.width/2, y : winsize.height/2 };
        this.translations = [...new Array(this.movingTotal)].map(() => ({x:0, y:0}));
        this.initEvents();
    }
    initEvents() {
        window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
    }
    render() {
        for (let i = 0; i <= this.movingTotal - 1; ++i) {
            let lerpFactor = i < this.movingTotal - 1 ? this.options.lerpFactor(i) : this.options.lerpFactorOuter;
            this.translations[i].x = lerp(this.translations[i].x, lineEq(this.options.valuesFromTo[1],this.options.valuesFromTo[0], winsize.width, 0, this.mousePos.x), lerpFactor);
            this.translations[i].y = lerp(this.translations[i].y, lineEq(this.options.valuesFromTo[1],this.options.valuesFromTo[0], winsize.height, 0, this.mousePos.y), lerpFactor);
            this.DOM.moving[i].style.transform = `translateX(${(this.translations[i].x)}px) translateY(${this.translations[i].y}px)`;
        }
        this.requestId = requestAnimationFrame(() => this.render());
    }
    start() {
        if ( !this.requestId ) {
            this.requestId = window.requestAnimationFrame(() => this.render());
        }
    }
    stop() {
        if ( this.requestId ) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;

            for (let i = 0; i <= this.movingTotal - 1; ++i) {
                this.translations[i].x = 0;
                this.translations[i].y = 0;
                this.DOM.moving[i].style.transform = `translateX(0px) translateY(0px)`;
            }
        }
    }
}
