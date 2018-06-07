$(document).foundation()
let slides = $('[data-ja="slide"')

slides.find('li').addClass('hide')
slides.find('li:first-child').removeClass('hide')