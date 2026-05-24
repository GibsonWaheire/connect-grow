import { useState, useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit, Plus } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
}

const ADMIN_PASSWORD = "mcgibs2024admin";

const AdminBlogPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("admin_auth") === "true"
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'McGibs Digital Solutions',
    imageUrl: '',
    tags: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      if (editingPost) {
        // Update existing post
        const response = await fetch(`/api/blog/${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (data.success) {
          alert('Post updated successfully!');
          fetchPosts();
          resetForm();
        }
      } else {
        // Create new post
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (data.success) {
          alert('Post created successfully!');
          fetchPosts();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        alert('Post deleted successfully!');
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      author: post.author,
      imageUrl: post.imageUrl || '',
      tags: post.tags?.join(', ') || '',
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'McGibs Digital Solutions',
      imageUrl: '',
      tags: '',
    });
    setEditingPost(null);
    setIsCreating(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <MainLayout>
          <section className="container mx-auto px-4 pt-[88px] pb-16">
            <div className="max-w-sm mx-auto">
              <h1 className="text-2xl font-bold mb-6 text-slate-900">Admin Access</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <Input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-red-600 text-sm mt-2">Incorrect password.</p>
                  )}
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </div>
          </section>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-[88px] pb-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Blog Admin</h1>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>

          {isCreating && (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Excerpt</label>
                  <Input value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content *</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required className="w-full min-h-[300px] p-3 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Author</label>
                  <Input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                  <Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="web development, React, TypeScript" />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">{editingPost ? 'Update Post' : 'Create Post'}</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Existing Posts</h2>
            {posts.length === 0 ? (
              <p className="text-gray-600">No posts yet. Create your first post!</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{post.excerpt || post.content.substring(0, 100)}...</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default AdminBlogPage;

