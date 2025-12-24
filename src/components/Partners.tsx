import oporaRossii from '@/assets/partners/opora-rossii.png';
import itPark from '@/assets/partners/it-park.png';
import combox from '@/assets/partners/combox.jpg';
import software from '@/assets/partners/software.svg';
import kritbi from '@/assets/partners/kritbi.jpg';
import nfii from '@/assets/partners/nfii.jpg';
import centrSvarki from '@/assets/partners/centr-svarki.png';
import kraypotrebsoyuz from '@/assets/partners/kraypotrebsoyuz.png';
import agentstvoPozharnoy from '@/assets/partners/agentstvo-pozharnoy.png';
import sistemExpert from '@/assets/partners/sistem-expert.png';
import delovoyKvartal from '@/assets/partners/delovoy-kvartal.png';
import focusGroup from '@/assets/partners/focus-group.png';
import gruzovoyExpress from '@/assets/partners/gruzovoy-express.png';
import tsarskiyStol from '@/assets/partners/tsarskiy-stol.png';

const Partners = () => {
  const partners = [
    { id: 1, name: "ОПОРА РОССИИ", logo: oporaRossii },
    { id: 2, name: "IT Park", logo: itPark },
    { id: 3, name: "COMBOX Technology", logo: combox },
    { id: 4, name: "Software", logo: software },
    { id: 5, name: "КРИТБИ", logo: kritbi },
    { id: 6, name: "НФИИ", logo: nfii },
    { id: 7, name: "Центр Сварки", logo: centrSvarki },
    { id: 8, name: "Крайпотребсоюз", logo: kraypotrebsoyuz },
    { id: 9, name: "Агентство Пожарной Безопасности", logo: agentstvoPozharnoy },
    { id: 10, name: "СистемЭксперт", logo: sistemExpert },
    { id: 11, name: "Деловой Квартал", logo: delovoyKvartal },
    { id: 12, name: "Focus Group", logo: focusGroup },
    { id: 13, name: "Грузовой Экспресс", logo: gruzovoyExpress },
    { id: 14, name: "Царский Стол", logo: tsarskiyStol },
  ];

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-border mb-10"></div>
        <div className="marquee-container">
          <div className="marquee-content marquee-logos">
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="marquee-set">
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
