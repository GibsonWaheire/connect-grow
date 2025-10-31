import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Calendar, User, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt: string;
  tags: string[];
}

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/blog/${postId}`);
      const data = await response.json();
      if (data.success) {
        setPost(data.post);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <MainLayout>
          <div className="container mx-auto px-4 pt-24 pb-16 text-center">
            <p className="text-gray-600">Loading post...</p>
          </div>
        </MainLayout>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <MainLayout>
          <div className="container mx-auto px-4 pt-24 pb-16 text-center">
            <p className="text-gray-600 mb-4">Post not found.</p>
            <a href="/blog">
              <Button>Back to Blog</Button>
            </a>
          </div>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Header />
      <MainLayout>
        <article className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
          <a href="/blog" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </a>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author || "McGibs Digital Solutions"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {post.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <OptimizedImage src={post.imageUrl} alt={post.title} className="w-full h-auto" />
            </div>
          )}

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </MainLayout>
    </>
  );
};

export default BlogPostPage;

