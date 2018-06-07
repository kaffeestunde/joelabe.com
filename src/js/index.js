import '../css/app.css'

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

import $ from 'jquery'

import Frame from './util/frame'

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

$(document).ready(() => {
    let toFrame = $('.frame-this')

    toFrame.each((i, el) => {
        let frame = new Frame({
            frame: $(el).parent(),
            img: el,
            zoomable: false
        })
        
        $(el).remove() 
    })
})

