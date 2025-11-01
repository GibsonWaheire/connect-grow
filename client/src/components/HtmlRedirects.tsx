import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Component to handle redirects from old HTML URLs to new React routes
 * This ensures SEO-friendly URLs that are already indexed continue to work
 */
export const HtmlRedirects = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Handle old HTML extensions - redirect to React routes
    const redirects: Record<string, string> = {
      '/about.html': '/about',
      '/contact.html': '/contact',
      '/services.html': '/services',
      '/blog-post-1.html': '/blog', // Redirect to blog listing, can be updated later with specific post
    };

    if (redirects[path]) {
      // Use replace to keep history clean
      navigate(redirects[path], { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

