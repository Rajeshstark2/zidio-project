import api from '../api';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPost {
  title: string;
  content: string;
}

export const blogService = {
  getBlogs: async (page = 1, limit = 10) => {
    const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
    return response.data;
  },

  getBlogBySlug: async (slug: string) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
  },

  createBlog: async (data: CreateBlogPost) => {
    const response = await api.post('/blogs', data);
    return response.data;
  },

  updateBlog: async (id: string, data: Partial<CreateBlogPost>) => {
    const response = await api.put(`/blogs/${id}`, data);
    return response.data;
  },

  deleteBlog: async (id: string) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },

  getFeaturedBlogs: async () => {
    const response = await api.get('/blogs/featured');
    return response.data;
  },
};