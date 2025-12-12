import oporaRossii from '@/assets/partners/opora-rossii.png';
import itPark from '@/assets/partners/it-park.png';
import combox from '@/assets/partners/combox.jpg';
import software from '@/assets/partners/software.svg';
import kritbi from '@/assets/partners/kritbi.jpg';
import nfii from '@/assets/partners/nfii.jpg';

const Partners = () => {
  const partners = [
    { id: 1, name: "ОПОРА РОССИИ", logo: oporaRossii },
    { id: 2, name: "IT Park", logo: itPark },
    { id: 3, name: "COMBOX Technology", logo: combox },
    { id: 4, name: "Software", logo: software },
    { id: 5, name: "КРИТБИ", logo: kritbi },
    { id: 6, name: "НФИИ", logo: nfii },
  ];

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        
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
