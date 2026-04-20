import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Music, 
  MessageSquare, 
  Layout, 
  Pause, 
  Mail, 
  Phone,
  Heart,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Users,
  Star,
  Wind,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('uvod');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Úvod', href: '#uvod' },
    { name: 'Program', href: '#program' },
    { name: 'O festivalu', href: '#o-festivalu' },
    { name: 'Info', href: '#info' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      const sections = ['uvod', 'program', 'o-festivalu', 'info', 'kontakt'];
      const scrollPosition = window.scrollY + 120;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Special handling for the bottom of the page (footer/kontakt)
      if (window.scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection('kontakt');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const musicProgram = [
    { 
      name: 'Terebint', 
      tag: 'Folk', 
      color: '#8ED6D6', 
      desc: 'Folkové brněnské uskupení Terebint přináší jemnou, poetickou hudbu s hlubším přesahem. Jejich písně zvou k zastavení, zamyšlení i vnitřnímu ztišení. Pokud jste je už někdy slyšeli, víte, že jejich atmosféra je jedinečná.',
      video: 'VxPoPbMKrEA'
    },
    { 
      name: 'Believers', 
      tag: 'Energy', 
      color: '#AF1E4E', 
      desc: 'Nové uskupení Believers spojuje zkušené hudebníky, které si mnozí pamatují z legendární kapely Gulo Čar. Přicházejí s čerstvou energií, ale i hloubkou, která neztratila nic ze své síly. Těšit se můžete na autentický projev a silné poselství.' 
    },
    { 
      name: 'Timothy', 
      tag: 'Worship', 
      color: '#8ED6D6', 
      desc: 'Slovenská worship kapela Timothy přináší současnou chválu plnou energie i citlivosti. Jejich hudba propojuje moderní zvuk s upřímným srdcem pro Boha. Vytvářejí prostor, kde se hudba stává modlitbou.' 
    },
    { 
      name: 'Gina & Kirsten', 
      tag: 'Pop', 
      color: '#AF1E4E', 
      desc: 'Duo dvou zpěvaček, maminky a (dospělé) dcery přináší autorskou tvorbu, která vzniká z osobní víry, života i hledání. Jejich písně jsou současné, melodické a nesou naději, která je srozumitelná i mimo církevní prostředí. Doplní je hudební kapela ze Slezska.' 
    },
    { 
      name: 'Grace to You', 
      tag: 'Worship', 
      color: '#8a173d', 
      desc: 'Brněnská kapela je známá svou autentickou službou chval napříč místními sbory. Jejich hudba nese hlubokou vděčnost a zve do osobního setkání s Bohem. Závěr festivalu tak nebude jen koncertem, ale prostorem pro ztišení, vděčnost a skutečný přesah.' 
    }
  ];

  return (
    <div ref={containerRef} className="relative brand-gradient min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:py-8 pointer-events-none transition-all duration-300">
        <div className={`max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md border rounded-full px-8 py-4 shadow-2xl pointer-events-auto transition-all duration-500 ${
          scrolled ? 'bg-white border-black/10' : 'bg-black/10 border-white/10'
        }`}>
            <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src={scrolled ? "/logo-blue.png" : "/logo-white.png"} 
              alt="DEN PRO BRNO" 
              className="h-7 md:h-9 w-auto transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </a>
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`text-xs font-bold uppercase tracking-[0.25em] transition-all relative group ${
                  activeSection === item.href.slice(1) 
                    ? 'text-brand-teal' 
                    : scrolled 
                      ? 'text-black' 
                      : 'text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-teal transform origin-left transition-transform duration-300 ${
                  activeSection === item.href.slice(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 pointer-events-auto transition-colors ${scrolled ? 'text-brand-teal' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-28 left-6 right-6 p-8 bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl md:hidden pointer-events-auto shadow-2xl z-40"
            >
              <div className="flex flex-col space-y-6 items-center">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-bold uppercase tracking-[0.3em] transition-all ${
                      activeSection === item.href.slice(1) ? 'text-brand-teal' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Landing / Úvod Section */}
      <section id="uvod" className="text-white pt-36 pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Top Branding Section - Replaced with full photo */}
            <div className="lg:col-span-12 mb-10 text-center">
              <div className="flex flex-col items-center justify-center">
                {/* Main Hero Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-5xl px-4 z-10"
                >
                  <img 
                    src="/hero-full.jpg" 
                    alt="DEN PRO BRNO - 30. května u Janáčkova divadla" 
                    className="w-full h-auto drop-shadow-2xl rounded-sm md:rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Mission Statement */}
                <div className="space-y-6 max-w-3xl mx-auto pt-10 md:pt-16">
                  <p className="text-lg md:text-2xl font-sans font-medium tracking-tight leading-[1.3] text-center text-white/90 px-4">
                    Naším cílem je přinést do města radost, povzbuzení a naději, která má skutečný přesah
                  </p>
                  <div className="h-1 w-12 bg-brand-teal/40 rounded-full mx-auto" />
                </div>
              </div>
            </div>

              {/* Main Content Blocks - Modernized Side-by-Side */}
              <div id="vize" className="lg:col-span-12 scroll-mt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Block 1: The Space */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="glass-card p-10 md:p-14 space-y-8 relative group overflow-hidden"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-0.5 w-8 bg-brand-teal" />
                      <p className="text-xs font-black uppercase tracking-[0.4em] text-brand-teal">Prostor pro setkání</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-sans font-bold leading-tight tracking-tighter">
                      Den pro Brno je otevřený kulturně - komunitní festival pro všechny generace 
                    </p>
                    <p className="text-lg text-white/70 leading-relaxed">
                      V samotném srdci města chceme vytvořit prostor, kde se lidé mohou zastavit, nadechnout, setkat se a zažít něco hezkého
                    </p>
                  </motion.div>

                  {/* Block 2: The Program */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="glass-card bg-black/40 p-10 md:p-14 space-y-8 relative group overflow-hidden"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-0.5 w-8 bg-brand-yellow" />
                      <p className="text-xs font-black uppercase tracking-[0.4em] text-brand-yellow">Pestrý program</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-sans font-bold leading-tight tracking-tighter">
                      Čeká vás pestrý program plný hudby, rozhovorů a inspirace 
                    </p>
                    <p className="text-lg text-white/70 leading-relaxed">
                      Festival propojuje církve, neziskové organizace i širokou veřejnost – bez ohledu na věk, víru nebo životní situaci
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Info Column - Modernized Full-Width Layout */}
              <div className="lg:col-span-12 space-y-8">
                <div className="glass-card bg-black/20 border-white/10 p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-brand-yellow mb-2">
                        <MapPin size={14} className="fill-current" />
                        <p className="text-xs font-bold uppercase tracking-[0.3em]">Místo konání</p>
                      </div>
                      <p className="text-2xl font-bold tracking-tight text-white">u Janáčkova divadla</p>
                      <p className="text-white/40 text-base">Brno, Česká republika</p>
                    </div>
                    
                    <div className="space-y-2 md:border-l border-white/10 md:pl-12">
                      <div className="flex items-center gap-2 text-brand-yellow mb-2">
                        <Calendar size={14} className="fill-current" />
                        <p className="text-xs font-bold uppercase tracking-[0.3em]">Datum a čas</p>
                      </div>
                      <p className="text-2xl font-bold tracking-tight text-white">30. května 2026</p>
                      <p className="text-white/40 text-base">11:00–20:00</p>
                    </div>

                    <div className="space-y-2 lg:border-l border-white/10 lg:pl-12 lg:col-span-2">
                      <div className="flex items-center gap-2 text-brand-yellow mb-2">
                        <Star size={14} className="fill-current" />
                        <p className="text-xs font-bold uppercase tracking-widest leading-none">Oficiální záštita</p>
                      </div>
                      <p className="text-lg font-light leading-snug text-white/70">
                        Pod záštitou primátorky města Brna <br />
                        <span className="font-bold text-white uppercase text-xl mt-1 block tracking-tight">JUDr. Markéty Vaňkové</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stylized Quote Section */}
              <div className="lg:col-span-12 mt-2 mb-2 flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="max-w-2xl text-center space-y-4"
                >
                  <div className="h-px w-12 bg-brand-teal/20 mx-auto" />
                  <p className="text-xl md:text-3xl font-sans font-bold leading-relaxed text-brand-teal tracking-tight">
                    Přijďte strávit den, který může něco změnit
                  </p>
                  <div className="h-px w-12 bg-brand-teal/20 mx-auto" />
                </motion.div>
              </div>

          </motion.div>
        </div>
      </section>

      {/* Program - WHITE SECTION */}
      <div id="program" className="bg-white text-black py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-teal/20" />
        <section className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="mb-12 text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Lineup 2026</h2>
            <h3 className="text-5xl md:text-8xl font-sans font-bold tracking-tighter mb-4">PROGRAM</h3>
            <p className="text-base md:text-lg font-light opacity-60 tracking-wider">
              Po celý den bude probíhat několik typů programu, mezi kterými si každý najde to své
            </p>
          </motion.div>

          {/* Music Section */}
          <div className="mb-6 text-center relative pt-2">
            <h4 className="text-[60px] md:text-[140px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none whitespace-nowrap select-none uppercase">
              HUDBA
            </h4>
            <h5 className="text-2xl font-bold tracking-tight relative z-10">Hudba a koncerty</h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 relative z-10 mb-12">
            {musicProgram.map((item, i) => {
              const isExpanded = expandedArtist === item.name;
              return (
                <motion.div 
                  key={item.name}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: i * 0.05 }}
                  onClick={() => setExpandedArtist(isExpanded ? null : item.name)}
                  className={`bg-brand-red text-white border border-brand-red/10 rounded-2xl p-6 hover:bg-brand-red-dark transition-all duration-300 group cursor-pointer flex flex-col ${isExpanded ? 'ring-2 ring-brand-teal/50' : ''}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Music size={20} className={`transition-opacity ${isExpanded ? 'opacity-100 text-brand-teal' : 'opacity-30 group-hover:opacity-100'}`} />
                      <h4 className="text-xl font-bold tracking-tight font-sans transition-colors group-hover:text-brand-teal">{item.name}</h4>
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-brand-teal" /> : <ChevronDown size={20} className="opacity-50" />}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-base opacity-90 leading-relaxed mb-6 font-light">{item.desc}</p>
                        {item.video && (
                          <div className="mb-6 rounded-xl overflow-hidden aspect-video bg-black/20 border border-white/10 shadow-inner">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${item.video}?rel=0`}
                              title={`${item.name} video`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="mt-auto">
                    <span className="inline-block border border-white/30 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest text-white shadow-xs">
                      {item.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Talkshow Section */}
          <div className="mb-6 text-center relative pt-2">
            <h4 className="text-[60px] md:text-[140px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none whitespace-nowrap select-none uppercase">
              Talkshow
            </h4>
            <h5 className="text-2xl font-bold tracking-tight relative z-10">Talkshow a diskuse</h5>
          </div>

          <div className="bg-[#42A1A1] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative mb-12">
            {/* Decorative subtle texture */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            
            <div className="space-y-12 relative z-10">
                <motion.div 
                  {...fadeInUp}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 border-b border-white/20 pb-10">
                    <div className="p-4 bg-white/10 rounded-2xl text-white shrink-0 self-start md:self-center font-bold">
                      <MessageSquare size={32} />
                    </div>
                    <div>
                      <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Kdyby byl Bůh, tak…</h4>
                      <p className="text-white/80 font-bold leading-relaxed max-w-2xl">
                        Prostor pro otázky, přemýšlení i povzbuzení
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start gap-12 text-white">
                    <div className="space-y-6 flex-1">
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Hosté Kateřiny Hodecové</p>
                      <div className="flex flex-wrap gap-x-12 gap-y-6">
                        {[
                          { n: 'Hana Pinknerová', d: 'spisovatelka' },
                          { n: 'Tomáš Tyc', d: 'fyzik' },
                          { n: 'Josef Pavliňák', d: 'teolog' }
                        ].map(guest => (
                          <div key={guest.n} className="group cursor-default">
                            <span className="block text-xl font-bold group-hover:text-white transition-colors underline decoration-white/0 group-hover:decoration-white/30 decoration-2 underline-offset-4">{guest.n}</span>
                            <span className="text-base text-white/50">{guest.d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full md:w-80 shrink-0">
                      <div className="p-6 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Moderuje</p>
                          <p className="font-bold text-lg text-white">Jakub Lofítek</p>
                          <p className="text-sm text-white/50">redaktor Rádio 7</p>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-white/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  {...fadeInUp}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col md:flex-row items-center gap-6 group transition-all duration-300 border-t border-white/10 pt-10"
                >
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">JZ</div>
                    <div className="flex flex-col">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/60">Závěrečné slovo</p>
                      <h4 className="text-xl font-bold tracking-tight text-white">Jiří Zdráhal</h4>
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-white/10" />
                  <p className="text-base text-white/70 font-light text-center md:text-left leading-relaxed">
                    Pastor circles ICF v Brně
                  </p>
                </motion.div>
              </div>
            </div>

          {/* Children & Families Section */}
          <div className="mb-6 text-center relative pt-2">
            <h4 className="text-[60px] md:text-[140px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none whitespace-nowrap select-none uppercase">
              Rodiny
            </h4>
            <h5 className="text-2xl font-bold tracking-tight relative z-10">Program pro děti a rodiny</h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 mb-12">
            <motion.div 
              {...fadeInUp}
              className="md:col-span-12 bg-brand-yellow rounded-3xl p-10 md:p-16 overflow-hidden relative group shadow-2xl border-4 border-black/5"
            >
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                <div className="md:col-span-1 flex flex-col items-start text-left">
                  <div className="inline-flex items-center gap-2 bg-brand-red px-5 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-[0.2em] mb-8 shadow-lg">
                    <Star size={16} />
                    <span>Dětský svět</span>
                  </div>
                  <h4 className="text-4xl md:text-5xl font-sans font-black tracking-tighter mb-6 text-black leading-none">MÍSTO PRO <br />RODINY</h4>
                  <p className="text-black/80 text-lg leading-relaxed">
                    Aktivity pro děti, hry i prostor, kde si rodiny mohou užít čas společně
                  </p>
                </div>

                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { l: 'Soutěže', i: Star },
                      { l: 'Oblíbené malování na obličej', i: Sparkles },
                      { l: 'Mega bubliny', i: Wind },
                      { l: 'Fotokoutek', i: Layout },
                      { l: 'Stavění z kostek pro nejmenší', i: Users },
                      { l: 'a balónky zdarma!', i: Heart },
                    ].map((act, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-5 bg-white/40 backdrop-blur-md rounded-2xl border border-black/5 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-sm">
                        <act.i size={20} className="text-brand-red shrink-0" />
                        <span className="text-sm font-bold uppercase tracking-tight text-black">{act.l}</span>
                      </div>
                    ))}
                    <div className="col-span-1 sm:col-span-3 flex items-center gap-6 bg-black/5 p-8 rounded-2xl border border-black/10 mt-4 group-hover:scale-102 transition-transform duration-500">
                      <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white shrink-0 shadow-xl animate-pulse">
                        <Clock size={28} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-red mb-1">HLAVNÍ BOD PROGRAMU • 15:00</p>
                        <h5 className="text-2xl md:text-3xl font-black tracking-tighter text-black uppercase">Veselé divadlo</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Organizations & Peace Zone Section - Modernized Block Style */}
          <div className="mb-6 text-center relative pt-2">
            <h4 className="text-[60px] md:text-[140px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none whitespace-nowrap select-none uppercase">
              Komunita
            </h4>
            <h5 className="text-2xl font-bold tracking-tight relative z-10">Organizace a zóna klidu</h5>
          </div>

          <div className="relative z-10">
            <motion.div 
               {...fadeInUp}
               className="bg-[#42A1A1] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative border border-white/10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                {/* Organizations Part */}
                <div className="md:col-span-7 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl text-white">
                      <Heart size={24} />
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">Prezentace organizací</h4>
                      <p className="text-white/70 font-light max-w-md">
                        Poznejte místní neziskovky a projekty, které pomáhají lidem v Brně
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { n: 'Teen Challenge', d: 'Prevence a pomoc' },
                      { n: 'Rádio 7', d: 'Mediální partner' },
                      { n: 'Křesťanská škola Jana Husa', d: 'Vzdělávání' },
                      { n: 'Brněnská tisková misie', d: 'Literatura' }
                    ].map(o => (
                      <div key={o.n} className="p-4 bg-black/10 rounded-xl border border-white/5 group hover:bg-black/20 transition-colors">
                        <span className="font-bold text-white tracking-tight block">{o.n}</span>
                        <span className="text-xs uppercase tracking-widest text-brand-yellow/60 font-medium">{o.d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Divider for desktop */}
                <div className="hidden md:block col-span-1 justify-self-center">
                  <div className="h-48 w-px bg-white/10" />
                </div>

                {/* Peace Zone Part */}
                <div className="md:col-span-4 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl text-white">
                        <Pause size={24} />
                      </div>
                      <h4 className="text-2xl font-bold tracking-tight text-white">Zóna klidu</h4>
                    </div>
                    <p className="text-white/70 font-light leading-relaxed">
                      Klidnější zóna pro rozhovor, modlitební stan nebo osobní sdílení v naší naslouchárně
                    </p>
                  </div>

                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-4">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-[#42A1A1] bg-white/20 shadow-sm" />
                      ))}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/50">Tým pro naslouchání připraven</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* O festivalu Section - Brand Red */}
      <section id="o-festivalu" className="bg-brand-red text-white py-24 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 transform translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 shadow-[0_0_100px_rgba(255,255,255,0.1)]" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="mb-16 text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/50 mb-4 text-center">Příběh festivalu</h2>
            <h3 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter mb-8 leading-none text-center">O FESTIVALU</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Block 1: Story/Why */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-black/20 p-10 md:p-14 space-y-8 relative group overflow-hidden rounded-3xl border border-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-8 bg-brand-yellow" />
                <p className="text-xs font-black uppercase tracking-[0.4em] text-brand-yellow">Proč vznikl Den pro Brno</p>
              </div>
              <p className="text-2xl md:text-3xl font-sans font-bold leading-tight tracking-tighter">
                Věříme, že město není jen o budovách, ale především o lidech 
              </p>
              <p className="text-lg text-white/80 leading-relaxed font-light">
                Den pro Brno vzniká z touhy spojovat – překračovat hranice mezi lidmi, organizacemi i generacemi. Chceme vytvářet prostor, kde je možné zažít přijetí, otevřenost a naději
              </p>
              
              <div className="pt-6 border-t border-white/10 flex items-start gap-4">
                <Star size={24} className="text-brand-yellow shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-lg mb-2">Záštita primátorky</h5>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Festival probíhá pod záštitou primátorky města Brna, <span className="text-white font-semibold">JUDr. Markéty Vaňkové</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Block 2: Organization */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-black/40 p-10 md:p-14 space-y-8 relative group overflow-hidden rounded-3xl border border-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-8 bg-white" />
                <p className="text-xs font-black uppercase tracking-[0.4em] text-white">Kdo festival organizuje</p>
              </div>
              <p className="text-2xl md:text-3xl font-sans font-bold leading-tight tracking-tighter">
                Festival organizuje hnutí Tělo v pohybu a společenství Pluska
              </p>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-white/70">
                  <span className="font-bold text-white block mb-1">In-Life & Pluska</span> 
                  Cílem je rozvoj studentů i rodin v oblastech mezilidských vztahů, charakteru a duchovního rozměru života, vycházejícího z křesťanských kořenů naší civilizace
                </p>
                
                <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-red shrink-0 font-bold text-xl">
                     +
                  </div>
                  <p className="text-xs font-medium text-white/80 uppercase tracking-widest leading-relaxed">
                    Na přípravě se podílí desítky dobrovolníků, kteří chtějí přinést do města své srdce
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Praktické informace Section */}
      <section id="info" className="bg-white text-black py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="mb-12 text-center text-black">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Informace</h2>
            <h3 className="text-5xl md:text-8xl font-sans font-bold tracking-tighter mb-4">PRAKTICKÉ INFO</h3>
            <p className="text-base md:text-lg font-light opacity-60 tracking-wider">
              Vše, co potřebujete vědět před návštěvou festivalu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Vstupné', text: "Vstup na festival je zdarma", sub: "Zveme širokou veřejnost" },
              { label: 'Prostředí', text: "Program probíhá venku", sub: "Před Janáčkovým divadlem" },
              { label: 'Styl', text: "Pohodlné oblečení", sub: "Doporučujeme pro vaše pohodlí" },
              { label: 'Toalety', text: "Veřejné toalety", sub: "Přes silnici Rooseveltova naproti divadlu" },
              { label: 'Občerstvení', text: "Vlastní zdroje", sub: "V okolí je dostatek možností" },
              { label: 'Pitný režim', text: "Voda na místě", sub: "Zajistíme osvěžení pro každého" },
              { label: 'Zeleň', text: "Nešlapat po trávníku", sub: "Prosba od Janáčkova divadla" },
              { label: 'Výbava', text: "Deštník s sebou", sub: "Ochrana před sluncem či deštěm" },
              { label: 'Bezpečí', text: "Zdravotní služba", sub: "Přítomni po celou dobu konání" }
            ].map((item, idx) => (
                <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-8 rounded-2xl flex flex-col items-center text-center group hover:scale-[1.02] transition-all duration-300 min-h-[160px] justify-center shadow-xl hover:shadow-2xl border border-black/5"
              >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4 block">
                  {item.label}
                </span>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-black leading-tight">
                  {item.text}
                </p>
                <div className="h-px w-10 bg-black/10 my-4 transition-colors group-hover:bg-brand-teal" />
                <p className="text-xs text-black/40 font-bold uppercase tracking-widest leading-relaxed">
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Dark */}
      <footer id="kontakt" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Text & Info */}
          <div className="lg:col-span-5 space-y-12 text-left">
            <div className="space-y-8">
              <div className="inline-block bg-brand-yellow px-6 py-2 rounded-lg transform -skew-x-6">
                <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tighter text-black uppercase transform skew-x-6">BUĎTE U TOHO.</h2>
              </div>
              <div className="text-lg text-white max-w-sm leading-relaxed font-medium space-y-4">
                <p>Ať už přijdete na chvíli, nebo zůstanete celý den, jste vítáni</p>
                <p>Přijďte sami, s přáteli nebo s rodinou</p>
                <p>Přijďte se podívat, odpočinout si nebo se nechat inspirovat</p>
                <p>Nebojte se zeptat</p>
                <p className="text-brand-teal font-black pt-2">Den pro Brno je tu pro vás</p>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Kontakt</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="mailto:info@denprobrno.cz" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-brand-teal group-hover:text-black transition-all">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Napište nám</span>
                    <span className="text-base font-medium tracking-tight text-white group-hover:text-brand-teal transition-colors">info@denprobrno.cz</span>
                  </div>
                </a>
                <a href="tel:+42070000000" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-brand-teal group-hover:text-black transition-all">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Zavolejte nám</span>
                    <span className="text-base font-medium tracking-tight text-white group-hover:text-brand-teal transition-colors">+420 700 000 000</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Heart size={24} className="text-brand-red animate-pulse" />
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
                <p>© 2026 DEN PRO BRNO • COMMUNITY REBORN</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              {...fadeInUp}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-8">Pošlete nám zprávu</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Jméno</label>
                    <input 
                      type="text" 
                      placeholder="Vaše jméno" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-teal/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">E-mail</label>
                    <input 
                      type="email" 
                      placeholder="vas@email.cz" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-teal/50 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Zpráva</label>
                    <textarea 
                      rows={4}
                      placeholder="Jak vám můžeme pomoci?" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit"
                      className="w-full md:w-auto px-10 py-4 bg-brand-teal text-black font-black uppercase tracking-widest rounded-xl hover:bg-brand-teal-light hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      Odeslat dotaz
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
