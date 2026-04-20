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
  Wind
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

  const navItems = [
    { name: 'Úvod', href: '#uvod' },
    { name: 'Program', href: '#program' },
    { name: 'O festivalu', href: '#o-festivalu' },
    { name: 'Info', href: '#info' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  useEffect(() => {
    const handleScroll = () => {
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
      desc: 'Folkové brněnské uskupení Terebint přináší jemnou, poetickou hudbu s hlubším přesahem. Jejich písně zvou k zastavení, zamyšlení i vnitřnímu ztišení. Pokud jste je už někdy slyšeli, víte, že jejich atmosféra je jedinečná.' 
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
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-3xl">
        <div className="bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full px-6 py-3 flex justify-between items-center shadow-lg">
          <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/logo.png" 
              alt="DEN PRO BRNO" 
              className="h-6 md:h-8 w-auto mix-blend-screen"
              referrerPolicy="no-referrer"
            />
          </a>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeSection === item.href.slice(1) ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Landing / Úvod Section */}
      <section id="uvod" className="text-white pt-40 pb-12 md:pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Top Branding Section - Centered Slogan */}
            <div className="lg:col-span-12 mb-24 text-center">
              <div className="flex flex-col items-center justify-center space-y-10">
                {/* Centered Slogan & Metadata */}
                <div className="space-y-8 max-w-2xl mx-auto">
                  <div className="flex flex-wrap justify-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-1.5 rounded-full">
                      <Sparkles size={14} className="text-brand-yellow" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Kulturně - komunitní festival</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-brand-teal">
                      <Calendar size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">30. května 2026</span>
                    </div>
                  </div>
                  
                  <p className="text-3xl md:text-5xl font-sans font-bold tracking-tight leading-[1.1] text-center">
                    Naším cílem je přinést do města radost, povzbuzení a naději, která má skutečný přesah.
                  </p>
                  
                  <div className="h-1.5 w-16 bg-brand-yellow rounded-full mx-auto" />
                </div>
              </div>
            </div>

              {/* Main Content Blocks - Modernized Side-by-Side */}
              <div id="vize" className="lg:col-span-12 scroll-mt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Block 1: The Space */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="glass-card bg-white/5 border-white/10 p-8 md:p-12 space-y-6 relative group overflow-hidden"
                  >
                    <div className="text-brand-yellow mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Prostor pro setkání</p>
                    </div>
                    <p className="text-xl md:text-2xl font-sans font-bold leading-relaxed tracking-tight">
                      Den pro Brno je otevřený kulturně - komunitní festival pro všechny generace. 
                      <span className="text-white/60 font-light"> V samotném srdci města chceme vytvořit prostor, kde se lidé mohou zastavit, nadechnout, setkat se a zažít něco hezkého.</span>
                    </p>
                  </motion.div>

                  {/* Block 2: The Program */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="glass-card bg-black/20 border-white/10 p-8 md:p-12 space-y-6 relative group overflow-hidden"
                  >
                    <div className="text-brand-yellow mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Pestrý program</p>
                    </div>
                    <p className="text-xl md:text-2xl font-sans font-bold leading-relaxed tracking-tight">
                      Čeká vás pestrý program plný hudby, rozhovorů a inspirace. 
                      <span className="text-white/60 font-light"> Festival propojuje církve, neziskové organizace i širokou veřejnost – bez ohledu na věk, víru nebo životní situaci.</span>
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
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Místo konání</p>
                      </div>
                      <p className="text-2xl font-bold tracking-tight text-white">u Janáčkova divadla</p>
                      <p className="text-white/40 text-sm">Brno, Česká republika</p>
                    </div>
                    
                    <div className="space-y-2 md:border-l border-white/10 md:pl-12">
                      <div className="flex items-center gap-2 text-brand-yellow mb-2">
                        <Calendar size={14} className="fill-current" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Datum a čas</p>
                      </div>
                      <p className="text-2xl font-bold tracking-tight text-white">30. května 2026</p>
                      <p className="text-white/40 text-sm">11:00–20:00</p>
                    </div>

                    <div className="space-y-2 lg:border-l border-white/10 lg:pl-12 lg:col-span-2">
                      <div className="flex items-center gap-2 text-brand-yellow mb-2">
                        <Star size={14} className="fill-current" />
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Oficiální záštita</p>
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
                  <p className="text-xl md:text-3xl font-sans font-bold italic leading-relaxed text-brand-teal tracking-tight">
                    Přijďte strávit den, který může něco změnit.
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
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Lineup 2026</h2>
            <h3 className="text-5xl md:text-8xl font-sans font-bold tracking-tighter mb-4">PROGRAM</h3>
            <p className="text-sm md:text-base font-light opacity-60 tracking-wider">
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
                      <h4 className="text-xl font-bold tracking-tight font-sans transition-colors group-hover:text-brand-teal italic">{item.name}</h4>
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
                        <p className="text-sm opacity-90 leading-relaxed mb-6 font-light">{item.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="mt-auto">
                    <span className="inline-block border border-white/30 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest text-white shadow-xs">
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
              Rozhovory
            </h4>
            <h5 className="text-2xl font-bold tracking-tight relative z-10">Talkshow a diskuse</h5>
          </div>

          <div className="space-y-3 relative z-10 mb-12">
            <motion.div 
              {...fadeInUp}
              className="bg-brand-yellow rounded-2xl p-8 md:p-10 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2.5 bg-brand-red rounded-xl text-white">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Kdyby byl Bůh, tak…</h4>
                  <p className="text-sm text-black/60 font-medium italic">Hosté Kateřiny Hodecové (Rádio 7)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-black">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red">Vzácní hosté</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                        <span className="text-sm font-medium">Hana Pinknerová <span className="text-black/40 font-normal ml-1">— spisovatelka</span></span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                        <span className="text-sm font-medium">Tomáš Tyc <span className="text-black/40 font-normal ml-1">— fyzik</span></span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                        <span className="text-sm font-medium">Josef Pavliňák <span className="text-black/40 font-normal ml-1">— teolog</span></span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-black/70 leading-relaxed font-normal text-left">
                    Prostor pro otázky, přemýšlení i povzbuzení. Hloubka, kterou si občas klade každý z nás. 
                  </p>
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-0.5">Moderuje</p>
                      <p className="font-bold text-base leading-tight text-black/80">Jakub Lofítek</p>
                      <p className="text-[10px] opacity-60 italic">redaktor Rádio 7</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-brand-teal text-white rounded-2xl p-4 md:px-10 flex flex-col md:flex-row items-center gap-4 md:gap-10 shadow-md border border-brand-teal/20"
            >
              <div className="flex items-center gap-4 shrink-0">
                <Users size={20} className="text-white/60" />
                <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Závěrečný mluvčí</p>
                  <h4 className="text-xl font-bold tracking-tight">Jiří Zdráhal</h4>
                </div>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/10" />
              <p className="text-xs opacity-80 font-light text-center md:text-left leading-relaxed">
                Pastor církve ICF v Brně. Člověk s vizí a srdcem pro město.
              </p>
            </motion.div>
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
              className="md:col-span-12 bg-white border-2 border-brand-yellow/30 rounded-2xl p-8 md:p-12 overflow-hidden relative group"
            >
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1 flex flex-col items-start text-left">
                  <div className="inline-flex items-center gap-2 bg-brand-yellow px-4 py-1 rounded-full text-brand-red font-bold text-[10px] uppercase tracking-widest mb-6">
                    <span>Dětský svět</span>
                  </div>
                  <h4 className="text-3xl font-bold tracking-tight mb-4">Místo pro společné zážitky</h4>
                  <p className="text-black/60 font-light leading-relaxed">
                    Hry, tvoření a prostor, kde si rodiny mohou odpočinout i užít společný čas.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { l: 'Soutěže', i: Star },
                      { l: 'Malování na obličej', i: Sparkles },
                      { l: 'Mega bubliny', i: Wind },
                      { l: 'Fotokoutek', i: Layout },
                      { l: 'Stavění z kostek', i: Users },
                      { l: 'Balónky zdarma!', i: Heart },
                    ].map((act, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-yellow transition-colors">
                        <act.i size={18} className="text-brand-yellow shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-tight leading-none text-black">{act.l}</span>
                      </div>
                    ))}
                    <div className="col-span-2 sm:col-span-3 flex items-center gap-4 bg-brand-red/5 p-6 rounded-xl border border-brand-red/10 mt-2">
                      <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                        <Clock size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-1">Speciální událost • 15:00</p>
                        <h5 className="text-xl font-bold tracking-tight text-black">Veselé divadlo pro celou rodinu</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Organizations & Peace Zone Section */}
          <div className="mb-6 text-center relative pt-2">
            <h4 className="text-[60px] md:text-[140px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none whitespace-nowrap select-none uppercase">
              Komunita
            </h4>
            <h5 className="text-2xl font-bold tracking-tight relative z-10">Organizace a zóna klidu</h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <motion.div 
               {...fadeInUp}
               className="glass-card bg-black/5 border-gray-100 p-10 flex flex-col justify-between"
            >
              <div className="text-left">
                <h4 className="text-2xl font-bold tracking-tight mb-4">Prezentace organizací</h4>
                <p className="text-sm text-black/50 font-light leading-relaxed mb-8">
                  Možnost poznat místní neziskovky, projekty a iniciativy, které pomáhají lidem v Brně.
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { n: 'Teen Challenge', d: 'Prevence a pomoc' },
                    { n: 'Rádio 7', d: 'Mediální partner' },
                    { n: 'Křesťanská škola Jana Husa', d: 'Vzdělávání' },
                    { n: 'Brněnská tisková misie', d: 'Literatura' }
                  ].map(o => (
                    <div key={o.n} className="flex flex-col">
                      <span className="font-bold text-sm tracking-tight leading-tight">{o.n}</span>
                      <span className="text-[10px] uppercase tracking-widest text-black/30 font-medium">{o.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
               {...fadeInUp}
               transition={{ delay: 0.1 }}
               className="bg-brand-teal/5 border border-brand-teal/20 rounded-2xl p-10 flex flex-col justify-between"
            >
              <div className="text-left">
                <Pause size={32} className="text-brand-teal mb-6" />
                <h4 className="text-2xl font-bold tracking-tight mb-4">Prostor pro zastavení</h4>
                <p className="text-sm text-black/60 font-light leading-relaxed italic mb-8">
                  Klidnější zóna pro rozhovor, modlitební stan nebo osobní sdílení. Zastavte se v naší naslouchárně.
                </p>
              </div>
              <div className="pt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-teal/20" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Tým pro naslouchání připraven</span>
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
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 mb-4 text-center">Příběh festivalu</h2>
            <h3 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter mb-8 leading-none text-center">O FESTIVALU</h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div {...fadeInUp} className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-2xl font-bold tracking-tight">Proč vznikl Den pro Brno</h4>
                <p className="text-lg text-white/80 leading-relaxed font-light text-left">
                  Věříme, že město není jen o budovách, ale především o lidech. Den pro Brno vzniká z touhy
                  spojovat – překračovat hranice mezi lidmi, organizacemi i generacemi. Chceme vytvářet
                  prostor, kde je možné zažít přijetí, otevřenost a naději.
                </p>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm text-left">
                <div className="flex items-start gap-4">
                  <Star size={24} className="text-brand-yellow shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-lg mb-2">Záštita primátorky</h5>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Festival probíhá pod záštitou primátorky města Brna, <span className="text-white font-semibold">JUDr. Markéty Vaňkové</span>. Velmi si vážíme podpory města při realizaci této komunitní vize.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="space-y-8">
              <div className="space-y-4 text-left">
                <h4 className="text-2xl font-bold tracking-tight">Kdo festival organizuje</h4>
                <p className="text-white/80 leading-relaxed font-light">
                  Festival Den pro Brno organizuje nezisková organizace <span className="font-semibold text-white">Tělo v pohybu</span> ve spolupráci s místními církvemi, dobrovolníky a partneři.
                </p>
                
                <div className="space-y-6 mt-6 pt-6 border-t border-white/10">
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <p className="text-sm leading-relaxed text-white/70">
                        <span className="font-bold text-white block mb-1">In-Life, z.ú.</span> 
                        je křesťanské hnutí, které se svou činností zaměřuje na všestranný rozvoj vysokoškolských studentů bez rozdílu světonázoru či oboru studia. Jeho cílem je navazovat na práci univerzit v oblastech, pro které jako vzdělávací instituce nemají tolik prostoru – především v oblasti mezilidských vztahů, charakteru a duchovního rozměru života, vycházejícího z křesťanských kořenů naší civilizace.
                      </p>
                      <p className="text-sm leading-relaxed text-white/70">
                        Součástí In-life je také společenství <span className="font-bold text-white">Pluska</span>, jež vzešlo ze zmíněného studentského hnutí a rozšířilo se o rodiny a další generace.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-black/10 p-5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-red shrink-0 font-bold text-xl">
                       +
                    </div>
                    <p className="text-xs font-medium text-white/80 uppercase tracking-widest leading-relaxed">
                      Na přípravě se podílí desítky lidí, kteří chtějí přinést do města něco dobrého – svůj čas, energii i srdce.
                    </p>
                  </div>
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
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Informace</h2>
            <h3 className="text-5xl md:text-8xl font-sans font-bold tracking-tighter mb-4">PRAKTICKÉ INFO</h3>
            <p className="text-sm md:text-base font-light opacity-60 tracking-wider">
              Vše, co potřebujete vědět před návštěvou festivalu
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { label: 'Vstupné', text: "Vstup na festival je zdarma", detail: "Vezměte s sebou kohokoli!" },
                { label: 'Kde', text: "Program probíhá venku", detail: "V areálu před Janáčkovým divadlem" },
                { label: 'Oblečení', text: "Doporučujeme pohodlné", detail: "Jsme v parku, nechte podpatky doma :)" },
                { label: 'Toalety', text: "Přímo naproti divadlu", detail: "Veřejné toalety přes ul. Rooseveltovu" },
                { label: 'Jídlo', text: "Občerstvení nezajišťujeme", detail: "Okolí nabízí desítky skvělých kaváren" },
                { label: 'Pití', text: "Voda k dispozici na místě", detail: "Zajistíme osvěžení pro každého" },
                { label: 'Trávník', text: "Prosíme nešlapat", detail: "Šetřeme zeleň u divadla společně" },
                { label: 'Počasí', text: "Vezměte si deštník", detail: "Ochrana před sluncem i deštěm" },
                { label: 'Pomoc', text: "Zdravotníci na místě", detail: "Stanoviště najdete u vstupu" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col space-y-1 pb-4 border-b border-black/5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red opacity-60">
                    {item.label}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-black">
                      {item.text}
                    </span>
                    <span className="text-sm text-black/50 font-light">
                      {item.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Dark */}
      <footer id="kontakt" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 space-y-6 text-left">
            <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tighter">BUĎTE U TOHO.</h2>
            <div className="text-sm text-white/40 max-w-sm leading-relaxed font-light space-y-2">
              <p>Ať už přijdete na chvíli, nebo zůstanete celý den, jste vítáni.</p>
              <p>Přijďte sami, s přáteli nebo s rodinou.</p>
              <p>Přijďte se podívat, odpočinout si nebo se nechat inspirovat.</p>
              <p>Nebojte se zeptat.</p>
              <p className="text-white/60 font-medium">Den pro Brno je tu pro vás.</p>
            </div>
          </div>
          <div className="space-y-4 text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Spojte se s námi</p>
            <div className="space-y-3">
              <a href="tel:+42070000000" className="flex items-center gap-3 group text-white/60 hover:text-brand-teal transition-colors">
                <Phone size={14} />
                <span className="text-sm font-medium tracking-tight">+420 700 000 000</span>
              </a>
              <a href="mailto:info@denprobrno.cz" className="flex items-center gap-3 group text-white/60 hover:text-brand-teal transition-colors">
                <Mail size={14} />
                <span className="text-sm font-medium tracking-tight">info@denprobrno.cz</span>
              </a>
            </div>
          </div>
          <div className="space-y-4 flex flex-col items-start lg:items-end">
            <Heart size={20} className="text-brand-red" />
            <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/10 text-right">
              <p>© 2026 DEN PRO BRNO</p>
              <p className="mt-2 text-brand-teal opacity-50">COMMUNITY REBORN</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
