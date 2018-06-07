import { Controller } from "stimulus"
import './css/slide.css'

export default class extends Controller {
    static targets = [
        'slide' 
    ]

    initialize() {
        if (!this.data.has('index'))
            this.index = 0;
        
    }

    slide(ev) {
    }

    next() {
        this.index++
    }
    previous() {
        this.index--
    }

    getActionElements(action) {
        let query = '[data-action="' + this.identifier + '#' + action + '"]'
        return this.element.querySelectorAll(query)
    }

    disableActionElements(action) {
        this.getActionElements(action).forEach((el) => {
            el.setAttribute('disabled', true)
        })

    }

    disableAction(action) {
        this.disableActionElements(action)
        
        let capitalizedAction = action.charAt(0).toUpperCase() + action.slice(1)
        this.data.set('actionDisabled' + capitalizedAction, true)
    }

    enableActionElements(action) {
        this.getActionElements(action).forEach((el) => {
            el.removeAttribute('disabled')
        })
    }

    enableAction(action) {
        this.enableActionElements(action)

        let capitalizedAction = action.charAt(0).toUpperCase() + action.slice(1)
        this.data.set('actionDisabled' + capitalizedAction, false)
    }

    get index() {
        return parseInt(this.data.get('index'))
    }

    set index(value) {  
        this.data.set('index', value)
        this.showCurrentSlide()

        if ((this.index + 1) >= this.slideTargets.length) {
            this.disableAction('next')
            return
        }

        if (this.index <= 0) {
            this.disableAction('previous')
            return
        }

        if (this.data.get('actionDisabledNext'))
            this.enableAction('next');

        if (this.data.get('actionDisabledPrevious'))
            this.enableAction('previous');
    }

    showCurrentSlide() {  
        this.slideTargets.forEach((el, i) => {
            el.classList.toggle('slide--current', this.index == i)
        })
    }
}