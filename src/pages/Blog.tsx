import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Blog = () => {
  const { toast } = useToast();
  
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    
    toast({
      title: "Спасибо за подписку!",
      description: `Мы отправим новые статьи на ${email}`,
    });
    
    e.currentTarget.reset();
  };

  const posts = [
    {
      title: "Почему 80% проектов по внедрению ИИ проваливаются",
      excerpt: "Разбираю главные ошибки компаний при внедрении ИИ и как их избежать. Честный взгляд на технологии без хайпа.",
      date: "15 марта 2025",
      category: "Внедрение ИИ",
      readTime: "7 мин",
      slug: "why-ai-projects-fail"
    },
    {
      title: "AI Synergy Framework: методология для успешных проектов",
      excerpt: "Как синхронизировать бизнес, процессы, людей и технологии для достижения реальных результатов.",
      date: "8 марта 2025",
      category: "Методология",
      readTime: "10 мин",
      slug: "ai-synergy-framework"
    },
    {
      title: "ROI от ИИ: как считать эффективность до внедрения",
      excerpt: "Пошаговая методика расчета возврата инвестиций в ИИ-проекты. С примерами и формулами.",
      date: "1 марта 2025",
      category: "Аналитика",
      readTime: "12 мин",
      slug: "ai-roi-calculation"
    },
    {
      title: "Автоматизация без хаоса: чек-лист для руководителя",
      excerpt: "10 вопросов, которые нужно задать перед началом любого проекта автоматизации.",
      date: "22 февраля 2025",
      category: "Управление",
      readTime: "5 мин",
      slug: "automation-checklist"
    },
    {
      title: "Российские LLM vs зарубежные: практический сравнительный анализ",
      excerpt: "Тестировал GigaChat, YandexGPT и другие российские решения. Результаты и рекомендации.",
      date: "15 февраля 2025",
      category: "Технологии",
      readTime: "15 мин",
      slug: "russian-llm-comparison"
    },
    {
      title: "Как обучить команду работе с ИИ за 2 недели",
      excerpt: "Программа обучения, которая снимает страх перед технологиями и делает сотрудников союзниками изменений.",
      date: "8 февраля 2025",
      category: "Обучение",
      readTime: "8 мин",
      slug: "team-ai-training"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-6">
            Блог об ИИ без иллюзий
          </h1>
          <p className="text-xl text-text-body max-w-3xl mx-auto">
            Честные статьи о внедрении искусственного интеллекта, реальных кейсах и методологии работы. 
            Без хайпа и сложных терминов.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-10 md:py-14 lg:py-16 bg-[#FAFBFC]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link to={`/blog/${post.slug}`} key={index}>
                <article className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
                >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-accent bg-[#D4EDFC] px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#6A6A6A]">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-text-heading mb-3 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-base text-text-body mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#E6EAEC]">
                  <div className="flex items-center gap-2 text-sm text-[#6A6A6A]">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  
                  <span className="text-accent hover:text-accent/80 font-medium text-sm flex items-center">
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
      <section className="py-10 md:py-14 lg:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#D4EDFC] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold text-text-heading mb-4">
              Подпишитесь на рассылку
            </h2>
            <p className="text-lg text-text-body mb-8">
              Получайте новые статьи и практические материалы о внедрении ИИ раз в две недели
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                name="email"
                placeholder="Ваш email"
                required
                className="flex-1 px-6 py-3 rounded-xl border-2 border-transparent focus:border-accent focus:outline-none text-base"
              />
              <Button type="submit" size="lg" className="px-8">
                Подписаться
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Blog;