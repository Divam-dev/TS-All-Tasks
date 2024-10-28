import { Carousel } from './components/carousel';
import { PostsManager } from './components/postsManager';

class App {
    private readonly carousel: Carousel;
    private readonly postsManager: PostsManager;

    constructor() {
        this.carousel = new Carousel();
        this.postsManager = new PostsManager();
        this.init();
    }

    private async init(): Promise<void> {
        await this.postsManager.initialize();
    }
}

// Initialize DOM
document.addEventListener('DOMContentLoaded', () => {
    new App();
});