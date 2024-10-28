import { CarouselConfig } from '../types/types';

export class Carousel {
    private currentSlide: number = 0;
    private readonly slides: NodeListOf<HTMLElement>;
    private readonly totalSlides: number;
    private intervalId?: number;

    constructor(
        private readonly config: CarouselConfig = { interval: 5000, autoplay: true }
    ) {
        this.slides = document.querySelectorAll('.carousel-item');
        this.totalSlides = this.slides.length;
        this.init();
    }

    private init(): void {
        this.setupControls();
        if (this.config.autoplay) {
            this.startAutoplay();
        }
    }

    private setupControls(): void {
        const rightArrow = document.querySelector('.carousel-arrow.right');
        const leftArrow = document.querySelector('.carousel-arrow.left');

        if (rightArrow) {
            rightArrow.addEventListener('click', () => this.nextSlide());
        }

        if (leftArrow) {
            leftArrow.addEventListener('click', () => this.prevSlide());
        }
    }

    private showSlide(index: number): void {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
    }

    private nextSlide(): void {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }

    private prevSlide(): void {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }

    private startAutoplay(): void {
        if (this.config.interval) {
            this.intervalId = window.setInterval(() => this.nextSlide(), this.config.interval);
        }
    }

    public destroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}