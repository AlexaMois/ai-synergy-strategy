import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BackToHome = () => {
  const location = useLocation();
  const [contactVisible,setContactVisible]=useState(false);
  useEffect(()=>{
    const update=()=>{const rect=document.getElementById("contact")?.getBoundingClientRect();setContactVisible(!!rect&&rect.top<window.innerHeight&&rect.bottom>0);};
    const observer=new MutationObserver(update);observer.observe(document.body,{childList:true,subtree:true});
    window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);update();
    return()=>{observer.disconnect();window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
  },[location.pathname]);
  
  // Скрываем на главной, на standalone-лендинге /neurostylist и на страницах кейсов
  // (там уже есть хлебные крошки со ссылкой «Главная»)
  if (
    location.pathname === '/' ||
    location.pathname.startsWith('/neurostylist') ||
    location.pathname === '/cases' ||
    location.pathname.startsWith('/cases/')
  ) return null;
  
  const commercialPath = /^(\/products|\/mini-agents|\/ai-agents|\/expert|\/services|\/pricing|\/start|\/faq|\/about)(\/|$)/.test(location.pathname);
  return (
    <Link
      to="/"
      className={"fixed bottom-20 right-6 z-40 bg-accent text-accent-foreground rounded-xl px-4 py-3 shadow-card hover:shadow-hover transition-all duration-300 flex items-center gap-2"+(commercialPath?" !text-[#212121] max-sm:right-2 max-sm:p-3 max-sm:rounded-full":"")+(contactVisible?" max-sm:hidden":"")}
      data-floating-home
      aria-label="На главную"
    >
      <Home className="w-5 h-5" />
      <span className={"text-sm font-medium"+(commercialPath?" max-sm:sr-only":"")}>На главную</span>
    </Link>
  );
};

export default BackToHome;
