import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PhotoLightbox from "@/components/PhotoLightbox";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, Clock, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts, type BlogImage } from "@/data/blogPosts";
import PageTransition from "@/components/PageTransition";
import { trackCTAClick } from "@/utils/analytics";

const BlogPostImageCompact = ({ image, onClick }: { image: BlogImage; onClick?: () => void }) => (
  <figure className="m-0">
    <img
      src={image.src}
      alt={image.alt}
      className="w-full rounded-xl shadow-soft cursor-pointer hover:shadow-card transition-shadow duration-300"
      onClick={onClick}
      loading="lazy"
    />
    <figcaption className="text-xs text-muted-foreground mt-2 text-center italic">
      {image.alt}
    </figcaption>
  </figure>
);

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<BlogImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: BlogImage[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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
        "datePublished": post.date,
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
    return <Navigate to="/materials/blog" replace />;
  }

  // Collect all images for lightbox
  const allImages: BlogImage[] = [];
  if (post.content.introImage) allImages.push(post.content.introImage);
  post.content.sections.forEach(section => {
    if (section.image) allImages.push(section.image);
    if (section.images) allImages.push(...section.images);
  });

  // Check if a list looks like numbered items (starts with "1.", "2.", etc.)
  const isNumberedList = (list: string[]) => {
    return list.length > 0 && /^\d+\./.test(list[0]);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
      
      <main>
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link 
            to="/materials/blog" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Вернуться к блогу</span>
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            {/* Intro with optional side image */}
            {post.content.introImage ? (
              <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
                <div className="flex-1">
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {post.content.intro}
                  </p>
                </div>
                <div className="w-full md:w-1/3 shrink-0">
                  <BlogPostImageCompact
                    image={post.content.introImage}
                    onClick={() => openLightbox(allImages, allImages.indexOf(post.content.introImage!))}
                  />
                </div>
              </div>
            ) : (
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 whitespace-pre-line">
                {post.content.intro}
              </p>
            )}

            {post.content.sections.map((section, index) => {
              const isEven = index % 2 === 0;
              const hasImage = !!section.image;
              const hasImages = section.images && section.images.length > 0;

              // Determine if list should be styled as numbered cards
              const numberedCards = section.list && isNumberedList(section.list);

              return (
                <section
                  key={index}
                  className={`mb-10 pb-10 ${index < post.content.sections.length - 1 ? 'border-b border-border/50' : ''}`}
                >
                  {/* Section heading with accent bar */}
                  <h2 className="text-2xl text-foreground mb-4 border-l-4 border-primary pl-4">
                    <span className="font-semibold">{section.heading}</span>
                  </h2>

                  {/* Content + single image side by side */}
                  {hasImage ? (
                    <div className={`flex flex-col md:flex-row gap-6 items-start ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                      <div className="flex-1">
                        <p className="text-lg text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                          {section.content}
                        </p>
                        {section.list && !numberedCards && (
                          <ul className="space-y-3 mb-4">
                            {section.list.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex gap-3">
                                <span className="text-primary mt-1.5">•</span>
                                <span className="text-base text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="w-full md:w-1/3 shrink-0">
                        <BlogPostImageCompact
                          image={section.image!}
                          onClick={() => openLightbox(allImages, allImages.indexOf(section.image!))}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                        {section.content}
                      </p>
                      {section.list && !numberedCards && (
                        <ul className="space-y-3 mb-4">
                          {section.list.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex gap-3">
                              <span className="text-primary mt-1.5">•</span>
                              <span className="text-base text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}

                  {/* Numbered list as mini-cards */}
                  {numberedCards && section.list && (
                    <div className="grid gap-3 sm:grid-cols-2 mt-4">
                      {section.list.map((item, itemIndex) => {
                        // Extract number prefix if exists
                        const match = item.match(/^(\d+)\.\s*(.*)/s);
                        const num = match ? match[1] : String(itemIndex + 1);
                        const text = match ? match[2] : item;

                        return (
                          <div
                            key={itemIndex}
                            className="flex gap-4 items-start p-4 rounded-xl bg-muted/60 border border-border/40"
                          >
                            <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/15 text-primary font-semibold text-sm flex items-center justify-center">
                              {num}
                            </span>
                            <span className="text-base text-muted-foreground leading-relaxed">{text}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Multiple images in compact grid */}
                  {hasImages && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {section.images!.map((img, imgIndex) => (
                        <BlogPostImageCompact
                          key={imgIndex}
                          image={img}
                          onClick={() => openLightbox(allImages, allImages.indexOf(img))}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            {/* Conclusion with quote styling */}
            <div className="bg-primary/10 rounded-2xl p-4 sm:p-6 md:p-8 my-12 relative overflow-hidden">
              <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/15" />
              <p className="text-lg text-muted-foreground leading-relaxed font-medium whitespace-pre-line relative z-10">
                {post.content.conclusion}
              </p>
            </div>

            {/* Lead magnet banner for checklist article */}
            {post.slug === 'testirovanie-ii-assistenta-baza-znanii' && (
              <div className="my-12 bg-gradient-to-r from-primary/15 to-primary/5 border-l-4 border-primary rounded-xl p-5 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Чек-лист: 30 вопросов для проверки ИИ-ассистента
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Готовый шаблон для аудита вашего корпоративного ассистента — с примерами вопросов, эталонными ответами и таблицей интерпретации.
                    </p>
                    <Link to="/materials/checklist-30">
                      <Button size="lg">Открыть чек-лист</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ with card styling */}
            {post.content.faq && post.content.faq.length > 0 && (
              <div className="my-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6 border-l-4 border-primary pl-4">Часто задаваемые вопросы</h2>
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {post.content.faq.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="border border-border/40 rounded-xl px-5 bg-muted/30 data-[state=open]:bg-muted/60 transition-colors"
                    >
                      <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          <div className="border-t border-border pt-12 mt-12">
            <div className="bg-muted rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <h3 className="text-2xl text-foreground mb-4">
                Хотите проверить <span className="font-semibold">вашего ИИ-ассистента?</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Запросите аудит — разберём на примерах ваших документов
              </p>
              <Button size="lg" onClick={() => {
                trackCTAClick({ location: 'blog_post' });
                const element = document.querySelector('#contact');
                if (element) {
                  const navHeight = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}>
                Запросить аудит ИИ-ассистента
              </Button>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-10 md:py-14 lg:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-foreground mb-8 text-center">
              Читайте <span className="font-semibold">также</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug} 
                  to={`/materials/blog/${relatedPost.slug}`}
                  className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {relatedPost.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-foreground mb-3 leading-tight">
                    {relatedPost.title}
                  </h3>
                  
                  <p className="text-base text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  
                  <span className="text-primary hover:text-primary/80 font-medium text-sm flex items-center">
                    Читать <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
        <Contact />
        <Partners />
      </main>

        <Footer />
        
      </div>

      <PhotoLightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </PageTransition>
  );
};

export default BlogPost;
