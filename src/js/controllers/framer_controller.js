import { Controller } from "stimulus"
import './css/slide.css'

export default class extends Controller {
    static targets = [
        'frame',
        'trigger'
    ]

    initialize() {
        if (!this.data.has('index'))
            this.index = 0;
    }

    frame(ev) {
        let triggerIndex

        this.triggerTargets.forEach((el, i) => {
            if (el == ev.toElement)
                triggerIndex = i;
        })

        if ( !isNaN(triggerIndex) )
            this.index = triggerIndex
        else 
            this.next()
    }

    next() {
        if ((this.index + 1) >= this.frameTargets.length)
            this.index = 0;
        else
            this.index++;
    }
    previous() {
        if (this.index <= 0)
            this.index = 0;
        else 
            this.index--;
    }

    get index() {
        return parseInt(this.data.get('index'))
    }

    set index(value) {
        this.data.set('index', value)
        this.showCurrentFrame()
    }

    showCurrentFrame() {  
        this.frameTargets.forEach((el, i) => {
            el.classList.toggle('frame--current', this.index == i)
        })
    }
}