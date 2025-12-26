// BreadcrumbList Schema.org generator for SEO

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const baseUrl = "https://aleksamois.ru";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.path}`
    }))
  };
};

// Common breadcrumb configurations
export const getBreadcrumbs = {
  services: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/services" }
  ]),
  
  servicesDiagnostics: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/services" },
    { name: "Диагностика", path: "/services/diagnostics" }
  ]),
  
  servicesArchitecture: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/services" },
    { name: "Архитектура", path: "/services/architecture" }
  ]),
  
  servicesSupport: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/services" },
    { name: "Сопровождение", path: "/services/support" }
  ]),
  
  servicesAddOns: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/services" },
    { name: "Доп. решения", path: "/services/add-ons" }
  ]),
  
  about: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Обо мне", path: "/about" }
  ]),
  
  cases: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Кейсы", path: "/cases" }
  ]),
  
  caseKraypotrebsoyuz: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Кейсы", path: "/cases" },
    { name: "Крайпотребсоюз", path: "/cases/kraypotrebsoyuz" }
  ]),
  
  caseDocSearch: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Кейсы", path: "/cases" },
    { name: "Интеллектуальный поиск", path: "/cases/doc-search" }
  ]),
  
  caseCargoExpress: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Кейсы", path: "/cases" },
    { name: "Грузовой Экспресс", path: "/cases/cargo-express" }
  ]),
  
  blog: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Блог", path: "/blog" }
  ]),
  
  faq: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "FAQ", path: "/faq" }
  ]),
  
  start: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "С чего начать", path: "/start" }
  ]),
  
  products: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Продукты", path: "/products" }
  ]),
  
  productDocSearch: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Продукты", path: "/products" },
    { name: "DocSearch", path: "/products/doc-search" }
  ]),
  
  pricing: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Цены", path: "/pricing" }
  ]),
  
  resources: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Материалы", path: "/resources" }
  ]),
  
  materials: () => generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Материалы", path: "/materials" }
  ])
};
