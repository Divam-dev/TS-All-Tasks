export class Carousel {
    constructor(config = { interval: 5000, autoplay: true }) {
        this.config = config;
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-item');
        this.totalSlides = this.slides.length;
        this.init();
    }
    init() {
        this.setupControls();
        if (this.config.autoplay) {
            this.startAutoplay();
        }
    }
    setupControls() {
        const rightArrow = document.querySelector('.carousel-arrow.right');
        const leftArrow = document.querySelector('.carousel-arrow.left');
        if (rightArrow) {
            rightArrow.addEventListener('click', () => this.nextSlide());
        }
        if (leftArrow) {
            leftArrow.addEventListener('click', () => this.prevSlide());
        }
    }
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
    }
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
    startAutoplay() {
        if (this.config.interval) {
            this.intervalId = window.setInterval(() => this.nextSlide(), this.config.interval);
        }
    }
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
