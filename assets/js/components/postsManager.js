var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PostsService } from './posts.js';
import { Modal } from './modal.js';
export class PostsManager {
    constructor(containerId = 'posts') {
        this.containerId = containerId;
        this.postsService = new PostsService();
        this.modal = new Modal();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadPosts();
        });
    }
    loadPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.postsService.getPosts();
                this.renderPosts(posts);
                this.setupPostsEventListeners();
            }
            catch (error) {
                console.error('Failed to load posts:', error);
            }
        });
    }
    renderPosts(posts) {
        const postsContainer = document.getElementById(this.containerId);
        if (!postsContainer)
            return;
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
    setupPostsEventListeners() {
        const postsContainer = document.getElementById(this.containerId);
        if (!postsContainer)
            return;
        const readMoreButtons = postsContainer.querySelectorAll('.read-more');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', this.handleReadMoreClick.bind(this));
        });
    }
    handleReadMoreClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const target = e.target;
            const postId = target.getAttribute('data-id');
            if (postId) {
                try {
                    const post = yield this.postsService.getPost(postId);
                    const modalContent = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                    this.modal.show(modalContent);
                }
                catch (error) {
                    console.error('Failed to load post:', error);
                }
            }
        });
    }
}
