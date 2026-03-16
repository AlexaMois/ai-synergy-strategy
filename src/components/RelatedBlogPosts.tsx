import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

interface RelatedBlogPostsProps {
  slugs: string[];
  title?: string;
}

const RelatedBlogPosts = ({ slugs, title = "Полезные статьи по теме" }: RelatedBlogPostsProps) => {
  const posts = slugs
    .map(slug => blogPosts.find(p => p.slug === slug))
    .filter(Boolean);

  if (posts.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
          {title}
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post!.slug}
              to={`/materials/blog/${post!.slug}`}
              className="group rounded-2xl border border-border bg-card p-5 hover:shadow-card transition-all duration-300 flex flex-col"
            >
              <span className="text-xs text-primary font-medium mb-2">{post!.category}</span>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-3 flex-1">
                {post!.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post!.readTime}
                </span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlogPosts;
