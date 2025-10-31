import { useState, useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt: string;
  tags: string[];
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
            <p className="text-gray-600 max-w-2xl">
              Insights, tutorials, and updates on web development, mobile apps, e-commerce, and digital solutions.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No blog posts yet. Check back soon!</p>
              <a href="/contact">
                <Button>Get in Touch</Button>
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
                  <a href={`/blog/${post.id}`}>
                    <OptimizedImage src={post.imageUrl || "https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=1200"} alt={post.title} className="w-full h-48 object-cover" />
                  </a>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags?.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold mb-2 hover:text-emerald-600">{post.title}</h2>
                    </a>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt || post.content.substring(0, 150)}...</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author || "McGibs Digital Solutions"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <a href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      Read more <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </MainLayout>
    </>
  );
};

export default BlogPage;

