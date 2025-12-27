import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { blogPosts } from "@/data/blogPosts";

const CATEGORIES = ["Все статьи", "Внедрение ИИ", "Методология", "Аналитика", "Управление", "Технологии", "Обучение"];

const Blog = () => {
  const [activeCategories, setActiveCategories] = useState<string[]>(["Все статьи"]);

  const handleCategoryClick = (category: string) => {
    if (category === "Все статьи") {
      setActiveCategories(["Все статьи"]);
    } else {
      setActiveCategories(prev => {
        const withoutAll = prev.filter(cat => cat !== "Все статьи");
        if (withoutAll.includes(category)) {
          const newCategories = withoutAll.filter(cat => cat !== category);
          return newCategories.length === 0 ? ["Все статьи"] : newCategories;
        } else {
          return [...withoutAll, category];
        }
      });
    }
  };

  // Use blog posts from data file - all are published since they exist in blogPosts
  const posts = blogPosts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    readTime: post.readTime,
    slug: post.slug
  }));

  const filteredPosts = activeCategories.includes("Все статьи") ? posts : posts.filter(post => activeCategories.includes(post.category));

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Helmet>
          <title>Блог об ИИ: разборы внедрения, методология, аналитика, реальные кейсы</title>
          <meta name="description" content="Статьи о внедрении искусственного интеллекта: диагностика, ROI, архитектура, ошибки проектов, обучение команды и практические подходы, которые дают измеримый эффект." />
          <meta name="keywords" content="блог об ИИ, внедрение искусственного интеллекта, методология AI, ROI от ИИ, автоматизация процессов, обучение команды ИИ, российские LLM, аналитика ИИ проектов" />
          <script type="application/ld+json">
            {JSON.stringify(getBreadcrumbs.blog())}
          </script>
        </Helmet>
        <Navigation />
        <PageBreadcrumbs 
          currentPage="Блог" 
          parentPages={[{ label: "Материалы", href: "/materials" }]} 
        />
      
      <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Разборы и статьи, <span className="font-semibold">практика внедрения ИИ</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Практичные материалы о внедрении искусственного интеллекта: разборы проектов, методология, аналитика и подходы, которые дают измеримый эффект.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${activeCategories.includes(category) 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-card text-muted-foreground border border-border hover:bg-primary/10 hover:border-primary/30'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-10 md:py-14 lg:py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link to={`/blog/${post.slug}`} key={index}>
                <article className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer h-full border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-foreground mb-3 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    
                    <span className="text-primary hover:text-primary/80 font-medium text-sm flex items-center">
                      Читать <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      
        <Contact />
        <Partners />
      </main>

        <Footer />
        
      </div>
    </PageTransition>
  );
};

export default Blog;
