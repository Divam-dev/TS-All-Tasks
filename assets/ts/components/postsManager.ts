import { Post } from '../types/types';
import { PostsService } from './posts';
import { Modal } from './modal';

export class PostsManager {
    private readonly postsService: PostsService;
    private readonly modal: Modal;

    constructor(private readonly containerId: string = 'posts') {
        this.postsService = new PostsService();
        this.modal = new Modal();
    }

    public async initialize(): Promise<void> {
        await this.loadPosts();
    }

    private async loadPosts(): Promise<void> {
        try {
            const posts = await this.postsService.getPosts();
            this.renderPosts(posts);
            this.setupPostsEventListeners();
        } catch (error) {
            console.error('Failed to load posts:', error);
        }
    }

    private renderPosts(posts: Post[]): void {
        const postsContainer = document.getElementById(this.containerId);
        if (!postsContainer) return;

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p>${post.body.slice(0, 100)}...</p>
                    <a href="#" class="read-more" data-id="${post.id}">Читати далі</a>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    private setupPostsEventListeners(): void {
        const postsContainer = document.getElementById(this.containerId);
        if (!postsContainer) return;

        const readMoreButtons = postsContainer.querySelectorAll('.read-more');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', this.handleReadMoreClick.bind(this));
        });
    }

    private async handleReadMoreClick(e: Event): Promise<void> {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const postId = target.getAttribute('data-id');
        
        if (postId) {
            try {
                const post = await this.postsService.getPost(postId);
                const modalContent = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                this.modal.show(modalContent);
            } catch (error) {
                console.error('Failed to load post:', error);
            }
        }
    }
}