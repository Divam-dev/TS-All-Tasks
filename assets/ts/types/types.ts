export interface Post {
    id: number;
    title: string;
    body: string;
}

export interface CarouselConfig {
    interval?: number;
    autoplay?: boolean;
}

export interface ModalConfig {
    animationDuration?: number;
    closeOnOutsideClick?: boolean;
}