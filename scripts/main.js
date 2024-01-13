const wrapperInf = document.querySelector('.wrapper')
const slidesInf = document.querySelector('.slides')
const slidesChildren = [...document.querySelector('.slides').children]
const leftBtnInf = document.querySelector('.inf.prev')
const rightBtnInf = document.querySelector('.inf.next')
const firstSlideWidth = document.querySelector('.slide').offsetWidth
let slidePerView = Math.round(wrapperInf.offsetWidth / firstSlideWidth)



const testimonialsSlides = document.querySelector(".testimonial .slides")
const testimonialArrows = document.querySelectorAll(".testimonial-arrow")
let offset = -100



const header = document.querySelector(".header")
const menuSwitch = document.getElementById('open-mob-menu')
let lastScroll = 0


document.addEventListener("scroll", () => {
    if (lastScroll < window.scrollY && !menuSwitch.checked) {
        header.style.top = "-30%"
    } else {
        header.style.top = "0"
    }

    lastScroll = window.scrollY
    header.style.backgroundColor = `rgba(255, 255, 255, ${window.scrollY / 100})`
})


slidesChildren.slice(-slidePerView).reverse().forEach(slide => {
    slidesInf.insertAdjacentHTML("afterbegin", slide.outerHTML)
})

slidesChildren.slice(0, slidePerView).forEach(slide => {
    slidesInf.insertAdjacentHTML("beforeend", slide.outerHTML)
})

const infiniteScroll = () => {
    if (wrapperInf.scrollLeft === 0) {
        wrapperInf.classList.add("no-transition")
        wrapperInf.scrollLeft = wrapperInf.scrollWidth - (2 * wrapperInf.offsetWidth)
        wrapperInf.classList.remove("no-transition")
        wrapperInf.scrollLeft -= firstSlideWidth

    } else if (Math.ceil(wrapperInf.scrollLeft) === wrapperInf.scrollWidth - wrapperInf.offsetWidth) {
        wrapperInf.classList.add("no-transition")
        wrapperInf.scrollLeft = wrapperInf.offsetWidth
        wrapperInf.classList.remove("no-transition")
        wrapperInf.scrollLeft += firstSlideWidth
    }
}

function slide(button) {
    if (button === "right") {
        wrapperInf.scrollLeft += firstSlideWidth
    } else {
        infiniteScroll()
        wrapperInf.scrollLeft -= firstSlideWidth
    }
}
function throttle(button, timeout) {
    let timer = null

    return function perform(...arg) {
        if (timer) return

        timer = setTimeout(() => {
            slide(button)

            clearTimeout(timer)
            timer = null
        }, timeout)
    }
}

function testimonialSlide(position, direction) {
    testimonialsSlides.classList.add("no-transition")
    offset = position
    testimonialsSlides.style.left = offset + "%"

    setTimeout(() => {
        testimonialsSlides.classList.remove("no-transition")
        offset += 100 * direction
        testimonialsSlides.style.left = offset + "%"
    }, 1)
}

wrapperInf.addEventListener("scroll", infiniteScroll)

rightBtnInf.addEventListener("click", throttle("right", 100))
leftBtnInf.addEventListener("click", throttle("left", 100))



testimonialArrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
        let direction = 1
        arrow.id === "right" ? offset -= 100 : offset += 100

        if (offset === -400 && arrow.id === "right") {
            direction = -1
            testimonialSlide(0, direction)
        }

        else if (offset === 0 && arrow.id === "left") {
            testimonialSlide(-400, direction)
        }

        else {
            testimonialsSlides.style.left = offset + "%"
        }
    })
})