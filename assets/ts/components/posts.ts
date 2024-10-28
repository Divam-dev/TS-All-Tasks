import { Post } from '../types/types';

export class PostsService {
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
    
    async getPosts(limit: number = 6): Promise<Post[]> {
        const response = await fetch(`${this.baseUrl}/posts`);
        const posts = await response.json() as Post[];
        return posts.slice(0, limit);
    }
    
    async getPost(id: string): Promise<Post> {
        const response = await fetch(`${this.baseUrl}/posts/${id}`);
        return await response.json() as Post;
    }
}