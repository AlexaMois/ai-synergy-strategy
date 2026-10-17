import oporaRossii from '@/assets/partners/opora-rossii.png';
import itPark from '@/assets/partners/it-park.png';
import combox from '@/assets/partners/combox.jpg';
import software from '@/assets/partners/software.svg';
import kritbi from '@/assets/partners/kritbi.jpg';

import centrSvarki from '@/assets/partners/centr-svarki.png';
import kraypotrebsoyuz from '@/assets/partners/kraypotrebsoyuz.webp';
import agentstvoPozharnoy from '@/assets/partners/agentstvo-pozharnoy.png';
import sistemExpert from '@/assets/partners/sistem-expert.png';
import delovoyKvartal from '@/assets/partners/delovoy-kvartal.png';
import focusGroup from '@/assets/partners/focus-group.png';
import gruzovoyExpress from '@/assets/partners/gruzovoy-express.png';
import tsarskiyStol from '@/assets/partners/tsarskiy-stol.webp';
import aktransservice from '@/assets/partners/aktransservice.png';
import yunarmiya from '@/assets/partners/yunarmiya.webp';
import { useLocation } from 'react-router-dom';

interface PartnersProps {
  className?: string;
  placement?: 'page' | 'after-contact';
}

const Partners = ({ className, placement = 'page' }: PartnersProps) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  // Keep the approved homepage placement; inner pages render only through Footer.
  if (isHome ? placement === 'after-contact' : placement !== 'after-contact') {
    return null;
  }

  const partners = [
    { id: 1, name: "ОПОРА РОССИИ", logo: oporaRossii },
    { id: 2, name: "IT Park", logo: itPark },
    { id: 3, name: "COMBOX Technology", logo: combox },
    { id: 4, name: "Software", logo: software },
    { id: 5, name: "КРИТБИ", logo: kritbi },
    
    { id: 7, name: "Центр Сварки", logo: centrSvarki },
    { id: 8, name: "Крайпотребсоюз", logo: kraypotrebsoyuz },
    { id: 9, name: "Агентство Пожарной Безопасности", logo: agentstvoPozharnoy },
    { id: 10, name: "СистемЭксперт", logo: sistemExpert },
    { id: 11, name: "Деловой Квартал", logo: delovoyKvartal },
    { id: 12, name: "Focus Group", logo: focusGroup },
    { id: 13, name: "Грузовой Экспресс", logo: gruzovoyExpress },
    { id: 14, name: "Царский Стол", logo: tsarskiyStol },
    { id: 15, name: "АкТрансСервис", logo: aktransservice },
    { id: 16, name: "Юнармия", logo: yunarmiya },
  ];

  return (
    <section aria-label="С кем уже работали" className={className || "pt-2 md:pt-4 pb-10 md:pb-14 lg:pb-16 bg-background"}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="marquee-container">
          <div className="marquee-content marquee-logos">
            {[...Array(3)].map((_, setIndex) => (
              <div
                key={setIndex}
                className="marquee-set"
                aria-hidden={setIndex === 0 ? undefined : "true"}
              >
                {partners.map((partner) => (
                  <div 
                    key={`${setIndex}-${partner.id}`} 
                    className="partner-logo-placeholder"
                    title={partner.name}
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-full w-auto object-contain"
                      loading="eager"
                      decoding="async"
                      width="220"
                      height="55"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
