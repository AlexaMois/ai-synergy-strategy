const Partners = () => {
  const partners = [
    { id: 1, name: "Партнёр 1" },
    { id: 2, name: "Партнёр 2" },
    { id: 3, name: "Партнёр 3" },
    { id: 4, name: "Партнёр 4" },
    { id: 5, name: "Партнёр 5" },
    { id: 6, name: "Партнёр 6" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center mb-12">
          Партнёры и экосистемы
        </h2>
        
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
                    <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/30 flex items-center justify-center">
                      <span className="text-xs text-gray-400">{partner.name}</span>
                    </div>
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
