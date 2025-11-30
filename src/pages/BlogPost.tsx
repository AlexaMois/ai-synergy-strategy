import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import PageTransition from "@/components/PageTransition";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Александра Моисеева`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", post.seo.metaDescription);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = post.seo.metaDescription;
        document.head.appendChild(meta);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", post.seo.keywords.join(", "));
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = post.seo.keywords.join(", ");
        document.head.appendChild(meta);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", post.title);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:title");
        meta.content = post.title;
        document.head.appendChild(meta);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute("content", post.seo.metaDescription);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:description");
        meta.content = post.seo.metaDescription;
        document.head.appendChild(meta);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.seo.metaDescription,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
          "@type": "Person",
          "name": "Александра Моисеева"
        },
        "publisher": {
          "@type": "Person",
          "name": "Александра Моисеева"
        },
        "keywords": post.seo.keywords.join(", ")
      };

      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    return () => {
      document.title = "Александра Моисеева | AI-консультант";
    };
  }, [post]);

  if (!slug || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
      
      <main>
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Вернуться к блогу</span>
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-sm font-medium text-accent bg-[#D4EDFC] px-4 py-2 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-text-subtle">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-text-body leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-text-body leading-relaxed mb-8">
              {post.content.intro}
            </p>

            {post.content.sections.map((section, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-semibold text-text-heading mb-4">
                  {section.heading}
                </h2>
                <p className="text-lg text-text-body leading-relaxed mb-4">
                  {section.content}
                </p>
                {section.list && section.list.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3">
                        <span className="text-accent mt-1.5">•</span>
                        <span className="text-base text-text-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="bg-[#D4EDFC] rounded-2xl p-4 sm:p-6 md:p-8 my-12">
              <p className="text-lg text-text-body leading-relaxed font-medium">
                {post.content.conclusion}
              </p>
            </div>
          </div>

          <div className="border-t border-[#E6EAEC] pt-12 mt-12">
            <div className="bg-[#FAFBFC] rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <h3 className="text-2xl font-semibold text-text-heading mb-4">
                Хотите внедрить ИИ без ошибок?
              </h3>
              <p className="text-lg text-text-body mb-6">
                Запишитесь на бесплатный экспресс-аудит процессов
              </p>
              <Button size="lg" asChild>
                <a 
                  href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Записаться на аудит
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-10 md:py-14 lg:py-16 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-heading mb-8 text-center">
              Читайте также
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug} 
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium text-accent bg-[#D4EDFC] px-3 py-1 rounded-full">
                      {relatedPost.category}
                    </span>
                    <span className="text-xs text-[#6A6A6A]">{relatedPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-text-heading mb-3 leading-tight">
                    {relatedPost.title}
                  </h3>
                  
                  <p className="text-base text-text-body mb-4 leading-relaxed line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  
                  <span className="text-accent hover:text-accent/80 font-medium text-sm flex items-center">
                    Читать <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      </main>

        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default BlogPost;
