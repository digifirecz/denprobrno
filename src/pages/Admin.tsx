import { Toaster, toast } from 'react-hot-toast';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  Settings as SettingsIcon, 
  Music, 
  Info, 
  LogOut, 
  LayoutDashboard,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  X,
  Youtube,
  Type,
  Palette,
  AlignLeft,
  Loader2,
  Star,
  User,
  Sparkles,
  Smile,
  Ghost,
  Gamepad2,
  Camera,
  Paintbrush,
  Baby,
  Heart,
  Wind,
  Zap,
  Coffee,
  Rocket,
  Pause,
  Clock,
  MapPin,
  Calendar,
  Layout,
  FileText,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Artist {
  id: string;
  name: string;
  tag: string;
  desc: string;
  video: string;
  icon?: string;
}

interface PracticalInfo {
  id: string;
  label: string;
  text: string;
  sub: string;
  order: number;
}

interface Guest {
  name: string;
  role: string;
}

interface Talkshow {
  id: string;
  title: string;
  guestsTitle: string;
  guests: Guest[];
  moderatorName: string;
  moderatorRole: string;
  closingWordName?: string;
  closingWordRole?: string;
  desc: string;
  order: number;
  icon?: string;
}

interface FamilyActivity {
  name: string;
  icon: string;
}

interface FamilyProgram {
  id: string;
  title: string;
  tag: string;
  description: string;
  activities: FamilyActivity[];
  mainPoint: string;
  mainPointTime: string;
  order: number;
  icon?: string;
}

interface CommunityItem {
  name: string;
  description: string;
}

interface CommunitySection {
  id: string;
  title: string;
  name: string;
  description: string;
  tag?: string;
  items: CommunityItem[];
  order: number;
  icon?: string;
}

interface ProgramHeader {
  topTitle: string;
  description: string;
}

interface InfoHeader {
  topTitle: string;
  description: string;
}

interface AboutSection {
  id: string;
  tag: string;
  title: string;
  description: string;
  order: number;
}

interface IntroSection {
  id: string;
  tag: string;
  title: string;
  description: string;
  order: number;
}

interface IntroInfoItem {
  id: string;
  icon: string;
  tag: string;
  title: string;
  description: string;
  order: number;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
}

const FAMILY_ICONS = [
  { id: 'Star', icon: Star },
  { id: 'Sparkles', icon: Sparkles },
  { id: 'Smile', icon: Smile },
  { id: 'Ghost', icon: Ghost },
  { id: 'Gamepad2', icon: Gamepad2 },
  { id: 'Camera', icon: Camera },
  { id: 'Paintbrush', icon: Paintbrush },
  { id: 'Baby', icon: Baby },
  { id: 'Heart', icon: Heart },
  { id: 'Wind', icon: Wind },
  { id: 'Zap', icon: Zap },
  { id: 'Music', icon: Music },
  { id: 'Palette', icon: Palette },
  { id: 'Coffee', icon: Coffee },
  { id: 'Rocket', icon: Rocket }
];

const COMMUNITY_ICONS = [
  { id: 'Heart', icon: Heart },
  { id: 'Pause', icon: Pause },
  { id: 'Users', icon: Users },
  { id: 'Smile', icon: Smile },
  { id: 'Star', icon: Star },
  { id: 'Sparkles', icon: Sparkles },
  { id: 'Wind', icon: Wind },
  { id: 'Zap', icon: Zap },
  { id: 'Coffee', icon: Coffee },
  { id: 'Music', icon: Music },
  { id: 'Palette', icon: Palette },
  { id: 'Camera', icon: Camera },
  { id: 'MessageSquare', icon: MessageSquare },
  { id: 'MapPin', icon: MapPin },
  { id: 'Calendar', icon: Calendar },
  { id: 'Clock', icon: Clock },
  { id: 'Layout', icon: Layout }
];

const ProgramDashboard = () => {
  const [headerData, setHeaderData] = useState<ProgramHeader>({ 
    topTitle: 'Lineup 2026', 
    description: 'Po celý den bude probíhat několik typů programu, mezi kterými si každý najde to své' 
  });
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [headerFormData, setHeaderFormData] = useState({ topTitle: '', description: '' });
  const [isHeaderSubmitting, setIsHeaderSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'programHeader'), (doc) => {
      if (doc.exists()) {
        setHeaderData(doc.data() as ProgramHeader);
      }
    });
    return unsubscribe;
  }, []);

  const handleOpenHeaderModal = () => {
    setHeaderFormData({ 
      topTitle: headerData.topTitle, 
      description: headerData.description 
    });
    setIsHeaderModalOpen(true);
  };

  const handleHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsHeaderSubmitting(true);
    try {
      await setDoc(doc(db, 'settings', 'programHeader'), {
        topTitle: headerFormData.topTitle,
        description: headerFormData.description,
        updatedAt: serverTimestamp()
      });
      toast.success('Záhlaví bylo úspěšně upraveno!');
      setIsHeaderModalOpen(false);
    } catch (err: any) {
      console.error("Error saving header:", err);
      toast.error("Chyba při ukládání záhlaví");
    } finally {
      setIsHeaderSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
        <div className="text-left">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Program</h2>
            <button 
              onClick={handleOpenHeaderModal}
              className="p-1.5 bg-slate-50 rounded-lg text-slate-300 hover:text-brand-teal transition-all"
            >
              <Edit size={14} />
            </button>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{headerData.topTitle} • {headerData.description}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
          <Calendar size={24} />
        </div>
      </header>

      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 block mb-2">Náhled</label>
      {/* Visual Preview */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm shadow-slate-200/50">
        <div className="bg-white p-12 md:p-20 relative overflow-hidden text-black">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-4">{headerData.topTitle}</h2>
            <h3 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-black mb-4 uppercase">PROGRAM</h3>
            <p className="text-sm md:text-base font-light opacity-60 tracking-wider max-w-xl mx-auto leading-relaxed">
               {headerData.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Hudba', icon: Music, path: '/admin/program/music', desc: '' },
          { label: 'Talkshow', icon: MessageSquare, path: '/admin/program/talkshow', desc: '' },
          { label: 'Rodiny', icon: Star, path: '/admin/program/family', desc: '' },
          { label: 'Komunita', icon: Heart, path: '/admin/program/community', desc: '' },
        ].map((item, i) => (
          <Link 
            key={item.label} 
            to={item.path}
            className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-teal/50 transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-teal group-hover:text-black transition-all mb-6 shadow-inner">
                <item.icon size={32} />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-2">{item.label}</h3>
            </div>
            <div className="mt-6 flex items-center gap-3 text-brand-teal font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
               Otevřít správu <ChevronRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* Header Edit Modal */}
      <AnimatePresence>
        {isHeaderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10">
              <div className="flex justify-between items-center mb-10 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Záhlaví programu</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest text-left">Nastavení úvodního textu programu na webu</p>
                </div>
                <button onClick={() => setIsHeaderModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleHeaderSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Horní titulek <span className="text-brand-red">*</span></label>
                    <input required value={headerFormData.topTitle} onChange={e => setHeaderFormData({...headerFormData, topTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Hlavní popis <span className="text-brand-red">*</span></label>
                    <textarea required rows={3} value={headerFormData.description} onChange={e => setHeaderFormData({...headerFormData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none resize-none transition-all" />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isHeaderSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isHeaderSubmitting ? 'Ukládám...' : 'Uložit záhlaví'}</button>
                  <button type="button" onClick={() => setIsHeaderModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminDashboard = ({ artistsCount, infoCount, talkshowsCount, familyCount, communityCount, aboutCount, submissionsCount, visitsCount }: { artistsCount: number, infoCount: number, talkshowsCount: number, familyCount: number, communityCount: number, aboutCount: number, submissionsCount: number, visitsCount: number }) => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <header className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
      <div className="text-left">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">Přehled</h2>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
        <Layout size={24} />
      </div>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { label: 'Hudba', count: artistsCount, icon: Music, color: 'bg-slate-100', link: '/admin/program' },
        { label: 'Talkshow', count: talkshowsCount, icon: MessageSquare, color: 'bg-slate-100', link: '/admin/program' },
        { label: 'Rodiny', count: familyCount, icon: Star, color: 'bg-slate-100', link: '/admin/program' },
        { label: 'Komunita', count: communityCount, icon: Heart, color: 'bg-slate-100', link: '/admin/program' },
        { label: 'Praktické info', count: infoCount, icon: Info, color: 'bg-slate-100', link: '/admin/info' },
        { label: 'O festivalu', count: aboutCount, icon: Heart, color: 'bg-slate-100', link: '/admin/about' },
        { label: 'Zprávy z webu', count: submissionsCount, icon: MessageSquare, color: 'bg-slate-100', link: '/admin/contact' },
        { label: 'Celkem návštěv', count: visitsCount, icon: BarChart3, color: 'bg-brand-teal/20', link: '#' },
      ].map((stat, i) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-slate-200 p-6 rounded-3xl flex items-center justify-between group cursor-default hover:scale-[1.02] transition-all text-slate-900 shadow-sm shadow-slate-200/50"
        >
          <div className="flex items-center gap-4 text-left">
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-slate-400 group-hover:text-brand-teal transition-colors`}>
              <stat.icon size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.count}</p>
            </div>
          </div>
          {stat.link !== '#' && (
            <Link to={stat.link} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center transition-all hover:bg-brand-teal hover:text-black">
              <ChevronRight size={20} />
            </Link>
          )}
        </motion.div>
      ))}
    </div>

    <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-12 text-center space-y-4 text-slate-900">
      <BarChart3 size={40} className="mx-auto text-slate-200" />
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Statistiky návštěvnosti budou k dispozici brzy</p>
    </div>
  </div>
);

const IntroManager = () => {
  const [heroData, setHeroData] = useState({ 
    imageUrl: '/hero-full-trans.png', 
    moto: 'Naším cílem je přinést do města radost, povzbuzení a naději, která má skutečný přesah',
    quote: 'Přijďte strávit den, který může něco změnit'
  });
  const [introSections, setIntroSections] = useState<IntroSection[]>([]);
  const [infoItems, setInfoItems] = useState<IntroInfoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<IntroSection | null>(null);
  const [sectionFormData, setSectionFormData] = useState({ tag: '', title: '', description: '', order: 0 });
  const [isSavingSection, setIsSavingSection] = useState(false);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<IntroSection | null>(null);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [editingInfoItem, setEditingInfoItem] = useState<IntroInfoItem | null>(null);
  const [infoItemFormData, setInfoItemFormData] = useState({ icon: 'MapPin', tag: '', title: '', description: '', order: 0 });
  const [isSavingInfoItem, setIsSavingInfoItem] = useState(false);
  const [isInfoDeleteModalOpen, setIsInfoDeleteModalOpen] = useState(false);
  const [infoItemToDelete, setInfoItemToDelete] = useState<IntroInfoItem | null>(null);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [showLimitAlert, setShowLimitAlert] = useState(false);

  useEffect(() => {
    // Fetch Hero Settings
    const unsubHero = onSnapshot(doc(db, 'settings', 'hero'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setHeroData({
          imageUrl: data.imageUrl || '/hero-full-trans.png',
          moto: data.moto ?? 'Naším cílem je přinést do města radost, povzbuzení a naději, která má skutečný přesah',
          quote: data.quote ?? 'Přijďte strávit den, který může něco změnit'
        });
      }
    });

    // Fetch Intro Sections
    const qSections = query(collection(db, 'introSections'), orderBy('order', 'asc'));
    const unsubSections = onSnapshot(qSections, (snapshot) => {
      setIntroSections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IntroSection)));
    });

    // Fetch Info Items
    const qInfo = query(collection(db, 'introInfoItems'), orderBy('order', 'asc'));
    const unsubInfo = onSnapshot(qInfo, (snapshot) => {
      setInfoItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IntroInfoItem)));
      setLoading(false);
    });

    return () => {
      unsubHero();
      unsubSections();
      unsubInfo();
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server returned ${response.status}`);
      }
      const data = await response.json();
      if (data.url) {
        setHeroData(prev => ({ ...prev, imageUrl: data.url }));
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      toast.error(`Chyba při nahrávání: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHero(true);
    try {
      await setDoc(doc(db, 'settings', 'hero'), {
        ...heroData,
        updatedAt: serverTimestamp()
      });
      toast.success('Úspěšně upraveno!');
    } catch (err) {
      console.error(err);
      toast.error("Chyba při ukládání");
    } finally {
      setIsSavingHero(false);
    }
  };

  const handleOpenModal = (section?: IntroSection) => {
    if (section) {
      setEditingSection(section);
      setSectionFormData({
        tag: section.tag,
        title: section.title,
        description: section.description,
        order: section.order
      });
    } else {
      setEditingSection(null);
      setSectionFormData({
        tag: '',
        title: '',
        description: '',
        order: introSections.length
      });
    }
    setIsModalOpen(true);
  };

  const handleSectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSection(true);
    try {
      const data = {
        ...sectionFormData,
        updatedAt: serverTimestamp()
      };

      
      toast.success(editingSection ? 'Úspěšně upraveno!' : 'Úspěšně vytvořeno!');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Chyba při ukládání sekce');
    } finally {
      setIsSavingSection(false);
    }
  };

  const handleDeleteSection = async () => {
    if (!sectionToDelete) return;
    try {
      await deleteDoc(doc(db, 'introSections', sectionToDelete.id));
      toast.success('Úspěšně smazáno!');
      setIsDeleteModalOpen(false);
      setSectionToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error('Chyba při mazání');
    }
  };

  const handleOpenInfoModal = (item?: IntroInfoItem) => {
    if (item) {
      setEditingInfoItem(item);
      setInfoItemFormData({
        icon: item.icon,
        tag: item.tag,
        title: item.title,
        description: item.description,
        order: item.order
      });
    } else {
      setEditingInfoItem(null);
      setInfoItemFormData({
        icon: 'MapPin',
        tag: '',
        title: '',
        description: '',
        order: infoItems.length
      });
    }
    setIsInfoModalOpen(true);
  };

  const handleInfoItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingInfoItem(true);
    try {
      const data = {
        ...infoItemFormData,
        updatedAt: serverTimestamp()
      };

      if (editingInfoItem) {
        await updateDoc(doc(db, 'introInfoItems', editingInfoItem.id), data);
      } else {
        await addDoc(collection(db, 'introInfoItems'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      toast.success(editingInfoItem ? 'Úspěšně upraveno!' : 'Úspěšně vytvořeno!');
      setIsInfoModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Chyba při ukládání položky');
    } finally {
      setIsSavingInfoItem(false);
    }
  };

  const handleDeleteInfoItem = async () => {
    if (!infoItemToDelete) return;
    try {
      await deleteDoc(doc(db, 'introInfoItems', infoItemToDelete.id));
      toast.success('Úspěšně smazáno!');
      setIsInfoDeleteModalOpen(false);
      setInfoItemToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error('Chyba při mazání');
    }
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-brand-teal" size={32} /></div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero & Moto Settings */}
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Úvod</h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <Layout size={24} />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm shadow-slate-200/50">
          <form onSubmit={handleHeroSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Úvodní hlavní kmen</label>
                  <div className="relative group">
                    <div className="w-full h-64 bg-brand-red rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-teal/50">
                      <img 
                        src={heroData.imageUrl} 
                        alt="Hero Logo" 
                        className="max-h-48 w-auto object-contain drop-shadow-2xl" 
                        referrerPolicy="no-referrer" 
                      />
                      <input 
                        type="file" 
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept="image/*"
                        disabled={isUploading}
                      />
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <Loader2 className="animate-spin text-brand-teal" size={32} />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-[10px] text-slate-400 italic">Klikněte na obrázek pro nahrání nového (png s průhledností)</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Motto festivalu</label>
                  <textarea 
                    rows={3}
                    value={heroData.moto} 
                    onChange={e => setHeroData({...heroData, moto: e.target.value})} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-none resize-none transition-all" 
                   
                  />
                  <p className="text-[10px] text-slate-400 ml-1">Tento text se zobrazuje uprostřed pod hlavním logem.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Citát / Pozvánka</label>
                  <input 
                    value={heroData.quote} 
                    onChange={e => setHeroData({...heroData, quote: e.target.value})} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-none transition-all" 
                   
                  />
                  <p className="text-[10px] text-slate-400 ml-1">Tento text se zobrazuje pod mottem.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Náhled v kontextu</label>
                <div className="brand-gradient rounded-3xl overflow-hidden flex flex-col items-center pt-10 pb-16 px-8 text-center space-y-8 min-h-[500px]">
                  {/* Hero Part */}
                  <div className="flex flex-col items-center space-y-4">
                    <img src={heroData.imageUrl} alt="Hero" className="max-w-[150px] h-auto drop-shadow-2xl opacity-90" />
                    {heroData.moto && heroData.moto.trim() !== '' && (
                      <>
                        <p className="text-white/80 text-xs font-medium leading-relaxed max-w-[200px]">{heroData.moto}</p>
                        <div className="h-0.5 w-6 bg-brand-teal/40 rounded-full mx-auto" />
                      </>
                    )}
                  </div>

                  {/* Placeholder for content items */}
                  <div className="w-full space-y-2 py-8">
                    <div className="h-2 w-2/3 bg-white/5 mx-auto rounded-full" />
                    <div className="h-2 w-1/2 bg-white/5 mx-auto rounded-full" />
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">Sekce vizí & Informační lišta</div>
                  </div>

                  {/* Quote Part */}
                  {heroData.quote && heroData.quote.trim() !== '' && (
                    <div className="space-y-3 w-full flex flex-col items-center">
                      <div className="h-px w-6 bg-white/20 mx-auto" />
                      <p className="text-white text-xs font-medium leading-relaxed max-w-[200px] text-center px-6">
                        {heroData.quote}
                      </p>
                      <div className="h-px w-6 bg-white/20 mx-auto" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <button 
                type="submit" 
                disabled={isSavingHero || isUploading}
                className="px-10 py-4 bg-brand-teal text-black font-black uppercase tracking-widest rounded-xl hover:bg-brand-teal-light transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isSavingHero ? 'Ukládám...' : 'Uložit nastavení úvodu'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Intro Sections Management */}
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">Sekce vizí</h2>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-3 px-6 py-4 bg-brand-teal text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-teal-light transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Přidat sekci
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Vision Preview Block */}
          <div className="brand-gradient p-10 md:p-12 overflow-hidden relative border-b border-white/5">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] -ml-64 -mb-64" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {introSections.length === 0 ? (
                <div className="md:col-span-2 py-32 text-center border border-dashed border-white/20 rounded-[2rem] text-white/20 font-bold uppercase tracking-[0.5em] text-xs">
                  Zde se zobrazí náhled bloků vize
                </div>
              ) : (
                introSections.map((section, idx) => (
                  <div 
                    key={section.id}
                    className={`p-10 md:p-12 rounded-[2rem] space-y-6 relative group overflow-hidden shadow-2xl text-left ${
                      idx % 2 === 0 
                        ? 'bg-[#B52D56]' 
                        : 'bg-[#4A0A21]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-px w-6 ${idx % 2 === 0 ? 'bg-brand-yellow' : 'bg-brand-teal'}`} />
                      <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${idx % 2 === 0 ? 'text-brand-yellow' : 'text-brand-teal'}`}>
                        {section.tag}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl md:text-2xl font-sans font-bold leading-[1.2] tracking-tighter text-white whitespace-pre-wrap">
                        {section.title}
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed font-medium">
                        {section.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Management List (Actions) */}
          <div className="p-4 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
            {introSections.length === 0 ? (
              <div className="md:col-span-3 py-10 text-center text-slate-300 font-bold uppercase tracking-widest text-xs italic">
                Zatím nebyly vytvořeny žádné sekce
              </div>
            ) : (
              introSections.map((section) => (
                <div key={section.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm transition-all hover:border-brand-teal/50">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-teal transition-colors flex-shrink-0">
                      <Layout size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-slate-900 truncate tracking-tighter">{section.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{section.tag}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <button onClick={() => handleOpenModal(section)} className="p-2 text-slate-300 hover:text-brand-teal hover:bg-slate-50 rounded-lg transition-all"><Edit size={16} /></button>
                    <button onClick={() => { setSectionToDelete(section); setIsDeleteModalOpen(true); }} className="p-2 text-slate-300 hover:text-brand-red hover:bg-slate-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Info Bar Items Management */}
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">Informační lišta</h2>
          </div>
          <button 
            onClick={() => {
              if (infoItems.length >= 3) {
                setShowLimitAlert(true);
                return;
              }
              handleOpenInfoModal();
            }}
            className="flex items-center gap-3 px-6 py-4 bg-brand-teal text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-teal-light transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Přidat položku
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-[#7A1235] p-10 md:p-12 overflow-hidden relative">
            <div className="relative flex flex-col md:flex-row flex-wrap gap-8 md:gap-14 items-start justify-start text-left">
              {infoItems.length === 0 ? (
                <div className="w-full py-16 text-center border border-dashed border-white/20 rounded-[2rem] text-white/20 font-bold uppercase tracking-widest text-xs italic">
                  Náhled lišty (zatím beze dat)
                </div>
              ) : (
                infoItems.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div className="space-y-2 text-left max-w-[280px]">
                      <div className="flex items-center gap-3 text-brand-yellow mb-4">
                        {(() => {
                          const Icon = COMMUNITY_ICONS.find(i => i.id === item.icon)?.icon || MapPin;
                          return <Icon size={14} className="fill-current" />;
                        })()}
                        <p className="text-[9px] font-black uppercase tracking-[0.2em]">{item.tag}</p>
                      </div>
                      <h5 className="text-lg font-bold tracking-tight text-white leading-tight">
                        {item.title}
                      </h5>
                      <p className="text-white/40 text-[12px] font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    {idx < infoItems.length - 1 && (
                      <div className="hidden md:block w-px h-16 bg-white/5 self-center" />
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
            {infoItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-teal transition-colors">
                    {(() => {
                      const IconInstance = COMMUNITY_ICONS.find(i => i.id === item.icon)?.icon || MapPin;
                      return <IconInstance size={18} />;
                    })()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.tag}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                   <button onClick={() => handleOpenInfoModal(item)} className="p-2 text-slate-300 hover:text-brand-teal hover:bg-slate-50 rounded-lg transition-all"><Edit size={16} /></button>
                   <button onClick={() => { setInfoItemToDelete(item); setIsInfoDeleteModalOpen(true); }} className="p-2 text-slate-300 hover:text-brand-red hover:bg-slate-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Item Modal */}
      <AnimatePresence>
        {isInfoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto overflow-x-hidden">
              <div className="flex justify-between items-center mb-10">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{editingInfoItem ? 'Upravit položku' : 'Nová položka lišty'}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Vyplňte detaily pro informační lištu</p>
                </div>
                <button onClick={() => setIsInfoModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleInfoItemSubmit} className="space-y-6">
                <div className="space-y-3 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Vyberte ikonu</label>
                  <button
                    type="button"
                    onClick={() => setIsIconModalOpen(true)}
                    className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl w-full hover:border-brand-teal transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-brand-teal shadow-sm group-hover:shadow-md transition-all">
                      {(() => {
                        const IconData = COMMUNITY_ICONS.find(i => i.id === infoItemFormData.icon);
                        const Icon = IconData ? IconData.icon : MapPin;
                        return <Icon size={24} />;
                      })()}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Vybrat ikonu</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kliknutím změníte symbol položky</p>
                    </div>
                    <div className="ml-auto w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-300 group-hover:text-brand-teal transition-all">
                      <Plus size={18} />
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Štítek / Tag <span className="text-brand-red">*</span></label>
                    <input required value={infoItemFormData.tag} onChange={e => setInfoItemFormData({...infoItemFormData, tag: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Hlavní název <span className="text-brand-red">*</span></label>
                  <input required value={infoItemFormData.title} onChange={e => setInfoItemFormData({...infoItemFormData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Doplňující text / Popis</label>
                  <input value={infoItemFormData.description} onChange={e => setInfoItemFormData({...infoItemFormData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" disabled={isSavingInfoItem} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isSavingInfoItem ? 'Ukládám...' : 'Uložit položku'}</button>
                  <button type="button" onClick={() => setIsInfoModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Icon Selection Modal for IntroManager */}
      <AnimatePresence>
        {isIconModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 font-sans"
            >
              <div className="flex justify-between items-center mb-8 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Vybrat ikonu</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Zvolte symbol pro položku</p>
                </div>
                <button type="button" onClick={() => setIsIconModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all group"><X size={24} className="group-hover:rotate-90 transition-transform duration-300" /></button>
              </div>

              <div className="grid grid-cols-4 gap-3 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                {COMMUNITY_ICONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setInfoItemFormData({ ...infoItemFormData, icon: item.id });
                      setIsIconModalOpen(false);
                    }}
                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 group/icon ${
                      infoItemFormData.icon === item.id 
                        ? 'bg-brand-teal/10 border-brand-teal text-brand-teal shadow-inner ring-4 ring-brand-teal/5' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <item.icon size={32} className={`transition-transform duration-300 ${infoItemFormData.icon === item.id ? 'scale-110' : 'group-hover/icon:scale-110'}`} />
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{item.id}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 italic text-[10px] text-slate-400 text-center uppercase tracking-[0.2em]">
                Vybraná ikona se okamžitě projeví ve formuláři
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Info Item Delete Modal */}
      <AnimatePresence>
        {isInfoDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Smazat položku?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Opravdu chcete smazat tuto položku z informační lišty?</p>
              <div className="flex gap-4">
                <button onClick={handleDeleteInfoItem} className="flex-1 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all">Smazat</button>
                <button onClick={() => setIsInfoDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Section Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{editingSection ? 'Upravit sekci' : 'Nová sekce'}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Vyplňte detaily bloku vize</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSectionSubmit} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Tag</label>
                  <input value={sectionFormData.tag} onChange={e => setSectionFormData({...sectionFormData, tag: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Titulek <span className="text-brand-red">*</span></label>
                  <input required value={sectionFormData.title} onChange={e => setSectionFormData({...sectionFormData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Popis</label>
                  <textarea rows={4} value={sectionFormData.description} onChange={e => setSectionFormData({...sectionFormData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none resize-none transition-all" />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" disabled={isSavingSection} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isSavingSection ? 'Ukládám...' : 'Uložit sekci'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Smazat sekci?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Opravdu chcete smazat tuto sekci vizí? Tato akce je nevratná.</p>
              <div className="flex gap-4">
                <button onClick={handleDeleteSection} className="flex-1 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all">Smazat</button>
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Limit Alert Modal */}
      <AnimatePresence>
        {showLimitAlert && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={() => setShowLimitAlert(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center relative"
            >
              <button 
                onClick={() => setShowLimitAlert(false)} 
                className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>
              <div className="w-20 h-20 rounded-3xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Sparkles size={40} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-4">Dosažen limit</h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed mb-8">
                Do informační lišty lze přidat maximálně 3 položky, aby zůstala přehledná.
              </p>
              <button 
                onClick={() => setShowLimitAlert(false)} 
                className="w-full py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all"
              >
                Rozumím
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProgramManager = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [artistToDelete, setArtistToDelete] = useState<Artist | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [headerData, setHeaderData] = useState({ subtitle: 'Hudba a koncerty' });
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [headerFormData, setHeaderFormData] = useState({ subtitle: '' });
  const [isHeaderSubmitting, setIsHeaderSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    desc: '',
    video: '',
    icon: 'Music'
  });

  useEffect(() => {
    const q = query(collection(db, 'musicProgram'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Artist));
      setArtists(data);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error:", err);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'musicHeader'), (doc) => {
      if (doc.exists()) setHeaderData(doc.data() as { subtitle: string });
    });
  }, []);

  const handleOpenHeaderModal = () => {
    setHeaderFormData({ subtitle: headerData.subtitle });
    setIsHeaderModalOpen(true);
  };

  const handleHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsHeaderSubmitting(true);
    try {
      await setDoc(doc(db, 'settings', 'musicHeader'), {
        subtitle: headerFormData.subtitle,
        updatedAt: serverTimestamp()
      });
      toast.success('Záhlaví bylo úspěšně upraveno!');
      setIsHeaderModalOpen(false);
    } catch (err: any) {
      console.error("Error saving header:", err);
      toast.error("Chyba při ukládání záhlaví");
    } finally {
      setIsHeaderSubmitting(false);
    }
  };

  const handleOpenModal = (artist?: Artist) => {
    if (artist) {
      setEditingArtist(artist);
      setFormData({
        name: artist.name,
        tag: artist.tag,
        desc: artist.desc,
        video: artist.video || '',
        icon: artist.icon || 'Music'
      });
    } else {
      setEditingArtist(null);
      setFormData({ name: '', tag: '', desc: '', video: '', icon: 'Music' });
    }
    setIsModalOpen(true);
  };

  const extractYoutubeId = (v: string) => {
    if (!v) return "";
    const match = v.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const cleanData = {
        name: formData.name,
        tag: formData.tag,
        desc: formData.desc,
        video: extractYoutubeId(formData.video),
        icon: 'Music',
        updatedAt: serverTimestamp()
      };

      if (editingArtist) {
        await updateDoc(doc(db, 'musicProgram', editingArtist.id), cleanData);
      } else {
        await addDoc(collection(db, 'musicProgram'), {
          ...cleanData,
          createdAt: serverTimestamp()
        });
      }
      toast.success(editingArtist ? 'Úspěšně upraveno!' : 'Úspěšně vytvořeno!');
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving to Firestore:", err);
      toast.error(`Chyba při ukládání: ${err.message || 'Neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (artist: Artist) => {
    setArtistToDelete(artist);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!artistToDelete) return;
    
    setIsDeleting(true);
    try {
      console.log("Deleting document with ID:", artistToDelete.id);
      await deleteDoc(doc(db, 'musicProgram', artistToDelete.id));
      toast.success('Úspěšně smazáno!');
      setIsDeleteModalOpen(false);
      setArtistToDelete(null);
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(`Chyba při mazání: ${err.message || 'Neznámá chyba'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="flex items-center gap-6">
            <Link to="/admin/program" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-teal hover:text-black transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div className="text-left">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Hudba</h2>
                <button 
                  onClick={handleOpenHeaderModal}
                  className="p-1.5 bg-slate-50 rounded-lg text-slate-300 hover:text-brand-teal transition-all"
                >
                  <Edit size={14} />
                </button>
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{headerData.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal()} 
            className="flex items-center gap-3 px-6 py-4 bg-brand-teal text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-teal-light transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Přidat interpreta
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Náhled</label>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm shadow-slate-200/50">
            {/* Visual Preview */}
          <div className="bg-white p-12 md:p-20 border-b border-slate-100 relative overflow-hidden text-black text-center shadow-inner">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="mb-6 text-center relative pt-2">
                <h4 className="text-[60px] md:text-[100px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-6 pointer-events-none whitespace-nowrap select-none">
                  Hudba
                </h4>
                <h5 className="text-xl md:text-2xl font-sans font-bold tracking-tight relative z-10 text-black">{headerData.subtitle}</h5>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                {loading ? (
                  <div className="col-span-full py-10 flex justify-center"><Loader2 className="animate-spin text-brand-red/20" size={32} /></div>
                ) : artists.length === 0 ? (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-200 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Zde se zobrazí náhled interpretů
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      {artists.filter((_, idx) => idx % 2 === 0).map((artist) => {
                        const isExpanded = expandedArtist === artist.id;
                        return (
                          <motion.div 
                            key={artist.id} 
                            onClick={() => setExpandedArtist(isExpanded ? null : artist.id)}
                            className={`bg-brand-red text-white border border-brand-red/10 rounded-2xl p-6 flex flex-col text-left group transition-all hover:bg-brand-red-dark cursor-pointer ${isExpanded ? 'ring-2 ring-brand-teal/50' : ''}`}
                          >
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`transition-opacity ${isExpanded ? 'opacity-100 text-brand-teal' : 'opacity-30 group-hover:opacity-100'}`}>
                                  {(() => {
                                     const IconData = COMMUNITY_ICONS.find(i => i.id === artist.icon);
                                     const Icon = IconData ? IconData.icon : Music;
                                     return <Icon size={20} />;
                                  })()}
                                </div>
                                <div className="text-xl font-bold tracking-tight font-sans uppercase truncate transition-colors group-hover:text-brand-teal">
                                  {artist.name}
                                </div>
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
                                  <p className="text-sm opacity-90 leading-relaxed mb-6 font-light">{artist.desc}</p>
                                  {artist.video && (
                                    <div className="mb-6 rounded-xl overflow-hidden aspect-video bg-black/20 border border-white/10 shadow-inner">
                                      <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${((v) => {
                                          if (!v) return "";
                                          const match = v.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                                          return match ? match[1] : v;
                                        })(artist.video)}?rel=0`}
                                        title={`${artist.name} video`}
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
                                {artist.tag}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col gap-3">
                      {artists.filter((_, idx) => idx % 2 !== 0).map((artist) => {
                        const isExpanded = expandedArtist === artist.id;
                        return (
                          <motion.div 
                            key={artist.id} 
                            onClick={() => setExpandedArtist(isExpanded ? null : artist.id)}
                            className={`bg-brand-red text-white border border-brand-red/10 rounded-2xl p-6 flex flex-col text-left group transition-all hover:bg-brand-red-dark cursor-pointer ${isExpanded ? 'ring-2 ring-brand-teal/50' : ''}`}
                          >
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`transition-opacity ${isExpanded ? 'opacity-100 text-brand-teal' : 'opacity-30 group-hover:opacity-100'}`}>
                                  {(() => {
                                     const IconData = COMMUNITY_ICONS.find(i => i.id === artist.icon);
                                     const Icon = IconData ? IconData.icon : Music;
                                     return <Icon size={20} />;
                                  })()}
                                </div>
                                <div className="text-xl font-bold tracking-tight font-sans uppercase truncate transition-colors group-hover:text-brand-teal">
                                  {artist.name}
                                </div>
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
                                  <p className="text-sm opacity-90 leading-relaxed mb-6 font-light">{artist.desc}</p>
                                  {artist.video && (
                                    <div className="mb-6 rounded-xl overflow-hidden aspect-video bg-black/20 border border-white/10 shadow-inner">
                                      <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${((v) => {
                                          if (!v) return "";
                                          const match = v.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                                          return match ? match[1] : v;
                                        })(artist.video)}?rel=0`}
                                        title={`${artist.name} video`}
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
                                {artist.tag}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Management List */}
          <div className="p-6 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-4">
            {artists.map((artist) => (
              <div key={artist.id} className="bg-white p-4 pr-6 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm transition-all hover:border-brand-teal/50">
                <div className="flex items-center gap-5 min-w-0 text-left text-black">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-teal group-hover:bg-brand-teal/5 transition-all flex-shrink-0">
                    {(() => {
                        const IconData = COMMUNITY_ICONS.find(i => i.id === artist.icon);
                        const Icon = IconData ? IconData.icon : Music;
                        return <Icon size={20} />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-900 truncate uppercase tracking-tighter">{artist.name}</h4>
                    <p className="text-[10px] font-bold text-brand-red uppercase tracking-widest truncate">{artist.tag}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(artist)} className="p-2.5 text-slate-300 hover:text-brand-teal hover:bg-slate-50 rounded-xl transition-all"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteClick(artist)} className="p-2.5 text-slate-300 hover:text-brand-red hover:bg-slate-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{editingArtist ? 'Upravit interpreta' : 'Přidat interpreta'}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Název / Kapela <span className="text-brand-red">*</span></label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Tag</label>
                    <input value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">YouTube Video URL</label>
                    <input value={formData.video} onChange={e => setFormData({...formData, video: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Popis / Příběh <span className="text-brand-red">*</span></label>
                    <textarea required rows={4} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none resize-none transition-all" />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isSubmitting ? 'Ukládám...' : 'Uložit interpreta'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Smazat interpreta?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed uppercase">Opravdu chcete smazat "{artistToDelete?.name}"?</p>
              <div className="flex gap-4">
                <button onClick={handleConfirmDelete} disabled={isDeleting} className="flex-1 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all">{isDeleting ? 'Mažu...' : 'Smazat'}</button>
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Edit Modal */}
      <AnimatePresence>
        {isHeaderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10">
              <div className="flex justify-between items-center mb-10 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Upravit záhlaví</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Hudba</p>
                </div>
                <button onClick={() => setIsHeaderModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleHeaderSubmit} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Podnadpis <span className="text-brand-red">*</span></label>
                  <input required value={headerFormData.subtitle} onChange={e => setHeaderFormData({...headerFormData, subtitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isHeaderSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isHeaderSubmitting ? 'Ukládám...' : 'Uložit záhlaví'}</button>
                  <button type="button" onClick={() => setIsHeaderModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PracticalInfoManager = () => {
  const [info, setInfo] = useState<PracticalInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState<PracticalInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [infoToDelete, setInfoToDelete] = useState<PracticalInfo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [headerData, setHeaderData] = useState<InfoHeader>({ 
    topTitle: 'Informace', 
    description: 'Vše, co potřebujete vědět před návštěvou festivalu' 
  });
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [headerFormData, setHeaderFormData] = useState({ topTitle: '', description: '' });
  const [isHeaderSubmitting, setIsHeaderSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    text: '',
    sub: '',
    order: 0
  });

  useEffect(() => {
    const q = query(collection(db, 'practicalInfo'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PracticalInfo));
      setInfo(data);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error:", err);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'infoHeader'), (doc) => {
      if (doc.exists()) {
        setHeaderData(doc.data() as InfoHeader);
      }
    });
    return unsubscribe;
  }, []);

  const handleOpenHeaderModal = () => {
    setHeaderFormData({ 
      topTitle: headerData.topTitle, 
      description: headerData.description 
    });
    setIsHeaderModalOpen(true);
  };

  const handleHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsHeaderSubmitting(true);
    try {
      await setDoc(doc(db, 'settings', 'infoHeader'), {
        topTitle: headerFormData.topTitle,
        description: headerFormData.description,
        updatedAt: serverTimestamp()
      });
      toast.success('Záhlaví bylo úspěšně upraveno!');
      setIsHeaderModalOpen(false);
    } catch (err: any) {
      console.error("Error saving header:", err);
      toast.error("Chyba při ukládání záhlaví");
    } finally {
      setIsHeaderSubmitting(false);
    }
  };

  const handleOpenModal = (item?: PracticalInfo) => {
    if (item) {
      setEditingInfo(item);
      setFormData({
        label: item.label,
        text: item.text,
        sub: item.sub,
        order: item.order || 0
      });
    } else {
      setEditingInfo(null);
      setFormData({ label: '', text: '', sub: '', order: info.length });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const cleanData = {
        label: formData.label,
        text: formData.text,
        sub: formData.sub,
        order: Number(formData.order),
        updatedAt: serverTimestamp()
      };

      if (editingInfo) {
        await updateDoc(doc(db, 'practicalInfo', editingInfo.id), cleanData);
      } else {
        await addDoc(collection(db, 'practicalInfo'), {
          ...cleanData,
          createdAt: serverTimestamp()
        });
      }
      toast.success(editingInfo ? 'Úspěšně upraveno!' : 'Úspěšně vytvořeno!');
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving to Firestore:", err);
      toast.error(`Chyba při ukládání: ${err.message || 'Neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (item: PracticalInfo) => {
    setInfoToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!infoToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'practicalInfo', infoToDelete.id));
      toast.success('Úspěšně smazáno!');
      setIsDeleteModalOpen(false);
      setInfoToDelete(null);
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(`Chyba při mazání: ${err.message || 'Neznámá chyba'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Praktické info</h2>
              <button 
                onClick={handleOpenHeaderModal}
                className="p-1.5 bg-slate-50 rounded-lg text-slate-300 hover:text-brand-teal transition-all"
              >
                <Edit size={14} />
              </button>
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{headerData.topTitle} • {headerData.description}</p>
          </div>
          <button 
            onClick={() => handleOpenModal()} 
            className="flex items-center gap-3 px-6 py-4 bg-brand-teal text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-teal-light transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Přidat info
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Náhled</label>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Visual Preview */}
          <div className="bg-white p-12 md:p-20 border-b border-slate-100 relative overflow-hidden text-black">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-4">{headerData.topTitle}</h2>
              <h3 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter mb-4 uppercase">PRAKTICKÉ INFO</h3>
              <p className="text-sm md:text-base font-light opacity-60 tracking-wider max-w-xl mx-auto leading-relaxed mb-16">
                {headerData.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="col-span-full py-10 flex justify-center"><Loader2 className="animate-spin text-brand-red/20" size={32} /></div>
                ) : info.length === 0 ? (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-200 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Zde se zobrazí náhled praktických informací
                  </div>
                ) : (
                  info.map((item) => (
                    <div key={item.id} className="bg-white p-8 rounded-2xl flex flex-col items-center text-center group hover:scale-[1.02] transition-all duration-300 min-h-[160px] justify-center shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-black/5">
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red mb-4 block">
                        {item.label}
                      </div>
                      <div className="text-xl font-bold tracking-tight text-black leading-tight">
                        {item.text}
                      </div>
                      <div className="h-px w-10 bg-black/10 my-4 transition-colors group-hover:bg-brand-teal" />
                      <div className="text-[10px] text-black/40 font-bold uppercase tracking-widest leading-relaxed">
                        {item.sub}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Management List */}
          <div className="p-6 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-3">
            {info.map((item) => (
              <div key={item.id} className="bg-white p-4 pr-6 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm transition-all hover:border-brand-teal/50">
                <div className="flex items-center gap-5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-teal group-hover:bg-brand-teal/5 transition-all flex-shrink-0">
                    <Info size={18} />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="text-sm font-black text-slate-900 truncate uppercase tracking-tighter">{item.label}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.text}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(item)} className="p-2.5 text-slate-300 hover:text-brand-teal hover:bg-slate-50 rounded-xl transition-all"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteClick(item)} className="p-2.5 text-slate-300 hover:text-brand-red hover:bg-slate-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{editingInfo ? 'Upravit informaci' : 'Přidat info'}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Štítek <span className="text-brand-red">*</span></label>
                    <input required value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Hlavní text <span className="text-brand-red">*</span></label>
                    <input required value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Doplňující text <span className="text-brand-red">*</span></label>
                    <input required value={formData.sub} onChange={e => setFormData({...formData, sub: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isSubmitting ? 'Ukládám...' : 'Uložit informaci'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Smazat informaci?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed uppercase">Opravdu chcete smazat "{infoToDelete?.label}"?</p>
              <div className="flex gap-4">
                <button onClick={handleConfirmDelete} disabled={isDeleting} className="flex-1 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all">{isDeleting ? 'Mažu...' : 'Smazat'}</button>
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Modal */}
      <AnimatePresence>
        {isHeaderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10">
              <div className="flex justify-between items-center mb-10">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Záhlaví informací</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Nastavení úvodního textu sekce</p>
                </div>
                <button onClick={() => setIsHeaderModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleHeaderSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Horní titulek <span className="text-brand-red">*</span></label>
                    <input required value={headerFormData.topTitle} onChange={e => setHeaderFormData({...headerFormData, topTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Popis <span className="text-brand-red">*</span></label>
                    <textarea required rows={3} value={headerFormData.description} onChange={e => setHeaderFormData({...headerFormData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none resize-none transition-all" />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isHeaderSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isHeaderSubmitting ? 'Ukládám...' : 'Uložit záhlaví'}</button>
                  <button type="button" onClick={() => setIsHeaderModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TalkshowManager = () => {
  const [talkshows, setTalkshows] = useState<Talkshow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTalkshow, setExpandedTalkshow] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTalkshow, setEditingTalkshow] = useState<Talkshow | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [talkshowToDelete, setTalkshowToDelete] = useState<Talkshow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [headerData, setHeaderData] = useState({ subtitle: 'Talkshow a diskuse' });
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [headerFormData, setHeaderFormData] = useState({ subtitle: '' });
  const [isHeaderSubmitting, setIsHeaderSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    guestsTitle: '',
    guests: [] as Guest[],
    moderatorName: '',
    moderatorRole: '',
    closingWordName: '',
    closingWordRole: '',
    desc: '',
    order: 0,
    icon: 'MessageSquare'
  });

  useEffect(() => {
    const q = query(collection(db, 'talkshows'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Talkshow));
      setTalkshows(data);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error:", err);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'talkshowHeader'), (doc) => {
      if (doc.exists()) setHeaderData(doc.data() as { subtitle: string });
    });
  }, []);

  const handleOpenHeaderModal = () => {
    setHeaderFormData({ subtitle: headerData.subtitle });
    setIsHeaderModalOpen(true);
  };

  const handleHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsHeaderSubmitting(true);
    try {
      await setDoc(doc(db, 'settings', 'talkshowHeader'), {
        subtitle: headerFormData.subtitle,
        updatedAt: serverTimestamp()
      });
      toast.success('Záhlaví bylo úspěšně upraveno!');
      setIsHeaderModalOpen(false);
    } catch (err: any) {
      console.error("Error saving header:", err);
      toast.error("Chyba při ukládání záhlaví");
    } finally {
      setIsHeaderSubmitting(false);
    }
  };

  const handleAddGuest = () => {
    setFormData({
      ...formData,
      guests: [...formData.guests, { name: '', role: '' }]
    });
  };

  const handleRemoveGuest = (index: number) => {
    setFormData({
      ...formData,
      guests: formData.guests.filter((_, i) => i !== index)
    });
  };

  const handleGuestChange = (index: number, field: keyof Guest, value: string) => {
    const newGuests = [...formData.guests];
    newGuests[index] = { ...newGuests[index], [field]: value };
    setFormData({ ...formData, guests: newGuests });
  };

  const handleOpenModal = (item?: Talkshow) => {
    if (item) {
      setEditingTalkshow(item);
      setFormData({
        title: item.title,
        guestsTitle: item.guestsTitle || '',
        guests: item.guests || [],
        moderatorName: item.moderatorName || '',
        moderatorRole: item.moderatorRole || '',
        closingWordName: item.closingWordName || '',
        closingWordRole: item.closingWordRole || '',
        desc: item.desc,
        order: item.order || 0,
        icon: item.icon || 'MessageSquare'
      });
    } else {
      setEditingTalkshow(null);
      setFormData({ 
        title: '', 
        guestsTitle: '', 
        guests: [], 
        moderatorName: '', 
        moderatorRole: '', 
        closingWordName: '',
        closingWordRole: '',
        desc: '', 
        order: talkshows.length,
        icon: 'MessageSquare'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const cleanData = {
        title: formData.title,
        guestsTitle: formData.guestsTitle,
        guests: formData.guests,
        moderatorName: formData.moderatorName,
        moderatorRole: formData.moderatorRole,
        closingWordName: formData.closingWordName,
        closingWordRole: formData.closingWordRole,
        desc: formData.desc,
        order: Number(formData.order),
        icon: 'MessageSquare',
        updatedAt: serverTimestamp()
      };

      if (editingTalkshow) {
        await updateDoc(doc(db, 'talkshows', editingTalkshow.id), cleanData);
      } else {
        await addDoc(collection(db, 'talkshows'), {
          ...cleanData,
          createdAt: serverTimestamp()
        });
      }
      toast.success(editingTalkshow ? 'Úspěšně upraveno!' : 'Úspěšně vytvořeno!');
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving to Firestore:", err);
      toast.error(`Chyba při ukládání: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (item: Talkshow) => {
    setTalkshowToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!talkshowToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'talkshows', talkshowToDelete.id));
      toast.success('Úspěšně smazáno!');
      setIsDeleteModalOpen(false);
      setTalkshowToDelete(null);
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(`Chyba při mazání: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="flex items-center gap-6">
            <Link to="/admin/program" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-teal hover:text-black transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div className="text-left">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Talkshow</h2>
                <button 
                  onClick={handleOpenHeaderModal}
                  className="p-1.5 bg-slate-50 rounded-lg text-slate-300 hover:text-brand-teal transition-all"
                >
                  <Edit size={14} />
                </button>
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{headerData.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal()} 
            className="flex items-center gap-3 px-6 py-4 bg-brand-teal text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-teal-light transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Přidat talkshow
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Náhled</label>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Visual Preview */}
          <div className="bg-white p-12 md:p-20 border-b border-slate-100 relative overflow-hidden text-black">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="mb-8 text-center relative pt-2">
                <h4 className="text-[60px] md:text-[140px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-6 pointer-events-none whitespace-nowrap select-none">
                  Talkshow
                </h4>
                <h5 className="text-2xl font-sans font-bold tracking-tight relative z-10 text-black">{headerData.subtitle}</h5>
              </div>

              <div className="space-y-6">
                {loading ? (
                  <div className="py-10 flex justify-center"><Loader2 className="animate-spin text-brand-teal/20" size={32} /></div>
                ) : talkshows.length === 0 ? (
                  <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-200 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Zde se zobrazí náhled talkshow
                  </div>
                ) : (
                  talkshows.map((item) => {
                    const TalkIcon = (item.icon && (COMMUNITY_ICONS.find(i => i.id === item.icon)?.icon)) || MessageSquare;
                    return (
                      <div key={item.id} className="bg-[#42A1A1] border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden relative text-left">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="space-y-8 relative z-10">
                          <div>
                            {/* Záhlaví talkshow */}
                            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 border-b border-white/10 pb-8">
                              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0">
                                <TalkIcon size={32} />
                              </div>
                              <div>
                                <h4 className="text-3xl md:text-4xl font-sans font-black tracking-tighter text-white mb-1 leading-none">{item.title}</h4>
                                <p className="text-white/60 font-bold leading-relaxed max-w-2xl text-sm md:text-base">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          
                            {/* Hosté a moderátor */}
                            {(item.guestsTitle || item.guests?.some(g => g.name || g.role) || item.moderatorName || item.moderatorRole) && (
                              <div className="flex flex-col md:flex-row justify-between items-start gap-12 text-white pb-8 border-b border-white/10 mb-8">
                                {/* Hosté */}
                                {(item.guestsTitle || item.guests?.some(g => g.name || g.role)) && (
                                  <div className="flex-1 space-y-6 w-full">
                                    {item.guestsTitle && <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{item.guestsTitle}</p>}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
                                      {item.guests?.map((guest, gi) => (
                                        (guest.name || guest.role) && (
                                          <div key={gi} className="group">
                                            {guest.name && <p className="text-xl font-bold tracking-tight text-white">{guest.name}</p>}
                                            {guest.role && <p className="text-sm text-white/50 font-medium">{guest.role}</p>}
                                          </div>
                                        )
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Moderátor Box */}
                                {(item.moderatorName || item.moderatorRole) && (
                                  <div className="w-full md:w-auto shrink-0">
                                    <div className="bg-white/10 rounded-3xl p-6 pr-16 border border-white/10 relative min-w-[280px]">
                                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Moderuje</p>
                                      {item.moderatorName && <p className="text-xl font-bold tracking-tight text-white mb-0.5">{item.moderatorName}</p>}
                                      {item.moderatorRole && <p className="text-sm text-white/50 font-medium">{item.moderatorRole}</p>}
                                      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                                        <Users size={24} />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Závěrečné slovo */}
                            {item.closingWordName && (
                              <div className="flex items-start gap-4 text-white pt-2">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-black tracking-widest shrink-0 shadow-lg mt-1">
                                  {item.closingWordName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                                </div>
                                <div className="text-left">
                                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3 leading-none">Závěrečné slovo</p>
                                  {item.closingWordName && <p className="text-xl font-bold tracking-tight text-white mb-0.5">{item.closingWordName}</p>}
                                  {item.closingWordRole && (
                                    <p className="text-sm text-white/50 font-medium">
                                      {item.closingWordRole}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Management List */}
          <div className="p-6 bg-slate-50 space-y-3">
            {talkshows.map((item) => (
              <div key={item.id} className="bg-white p-4 pr-6 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm transition-all hover:border-brand-teal/50">
                <div className="flex items-center gap-5 min-w-0 text-left">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-teal group-hover:bg-brand-teal/5 transition-all flex-shrink-0">
                    {(() => {
                        const IconData = COMMUNITY_ICONS.find(i => i.id === item.icon);
                        const Icon = IconData ? IconData.icon : MessageSquare;
                        return <Icon size={20} />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-900 truncate tracking-tighter">{item.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">Moderuje: {item.moderatorName}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(item)} className="p-2.5 text-slate-300 hover:text-brand-teal hover:bg-slate-50 rounded-xl transition-all"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteClick(item)} className="p-2.5 text-slate-300 hover:text-brand-red hover:bg-slate-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{editingTalkshow ? 'Upravit talkshow' : 'Přidat talkshow'}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Název talkshow / téma <span className="text-brand-red">*</span></label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Krátký popis <span className="text-brand-red">*</span></label>
                    <textarea required rows={3} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none resize-none transition-all" />
                  </div>

                  {/* Moderátor Block */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-teal" /> Moderátor
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Jméno</label>
                      <input value={formData.moderatorName} onChange={e => setFormData({...formData, moderatorName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Role / Popis</label>
                      <input value={formData.moderatorRole} onChange={e => setFormData({...formData, moderatorRole: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all text-sm" />
                    </div>
                  </div>

                  {/* Závěrečné slovo Block */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-yellow" /> Závěrečné slovo
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Jméno</label>
                      <input value={formData.closingWordName} onChange={e => setFormData({...formData, closingWordName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Role / Popis</label>
                      <input value={formData.closingWordRole} onChange={e => setFormData({...formData, closingWordRole: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all text-sm" />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Titulek hostů</label>
                    <input value={formData.guestsTitle} onChange={e => setFormData({...formData, guestsTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Seznam hostů</label>
                      <button type="button" onClick={handleAddGuest} className="flex items-center gap-1 px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg text-brand-teal text-[10px] font-black uppercase tracking-widest transition-all">
                        <Plus size={12} /> Přidat hosta
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.guests.map((guest, index) => (
                        <div key={index} className="flex gap-3 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex-1 space-y-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Jméno hosta <span className="text-brand-red">*</span></label>
                              <input required value={guest.name} onChange={e => handleGuestChange(index, 'name', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-900 text-sm outline-none focus:border-brand-teal transition-all" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Role hosta</label>
                              <input value={guest.role} onChange={e => handleGuestChange(index, 'role', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-500 text-xs outline-none focus:border-brand-teal transition-all" />
                            </div>
                          </div>
                          <button type="button" onClick={() => handleRemoveGuest(index)} className="p-2 text-slate-300 hover:text-brand-red transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isSubmitting ? 'Ukládám...' : 'Uložit talkshow'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-6 text-center">
                <Trash2 size={40} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Smazat talkshow?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed uppercase">Opravdu chcete smazat "{talkshowToDelete?.title}"?</p>
              <div className="flex gap-4">
                <button onClick={handleConfirmDelete} disabled={isDeleting} className="flex-1 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all">{isDeleting ? 'Mažu...' : 'Smazat'}</button>
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FamilyProgramManager = () => {
  const [items, setItems] = useState<FamilyProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FamilyProgram | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FamilyProgram | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);

  const [headerData, setHeaderData] = useState({ subtitle: 'Program pro děti a rodiny' });
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [headerFormData, setHeaderFormData] = useState({ subtitle: '' });
  const [isHeaderSubmitting, setIsHeaderSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    description: '',
    activities: [] as FamilyActivity[],
    mainPoint: '',
    mainPointTime: '',
    order: 0,
    icon: 'Star'
  });

  useEffect(() => {
    const q = query(collection(db, 'familyProgram'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const raw = doc.data();
        return { 
          id: doc.id, 
          ...raw,
          activities: (raw.activities || []).map((a: any) => typeof a === 'string' ? { name: a, icon: 'Sparkles' } : a)
        } as FamilyProgram;
      });
      setItems(data);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error:", err);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'familyHeader'), (doc) => {
      if (doc.exists()) setHeaderData(doc.data() as { subtitle: string });
    });
  }, []);

  const handleOpenHeaderModal = () => {
    setHeaderFormData({ subtitle: headerData.subtitle });
    setIsHeaderModalOpen(true);
  };

  const handleHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsHeaderSubmitting(true);
    try {
      await setDoc(doc(db, 'settings', 'familyHeader'), {
        subtitle: headerFormData.subtitle,
        updatedAt: serverTimestamp()
      });
      toast.success('Záhlaví bylo úspěšně upraveno!');
      setIsHeaderModalOpen(false);
    } catch (err: any) {
      console.error("Error saving header:", err);
      toast.error("Chyba při ukládání záhlaví");
    } finally {
      setIsHeaderSubmitting(false);
    }
  };

  const handleAddActivity = () => {
    setFormData({ ...formData, activities: [...formData.activities, { name: '', icon: 'Sparkles' }] });
  };

  const handleRemoveActivity = (index: number) => {
    setFormData({ ...formData, activities: formData.activities.filter((_, i) => i !== index) });
  };

  const handleActivityChange = (index: number, field: keyof FamilyActivity, value: string) => {
    const newActivities = [...formData.activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setFormData({ ...formData, activities: newActivities });
  };

  const handleOpenModal = (item?: FamilyProgram) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        tag: item.tag || '',
        description: item.description || '',
        activities: (item.activities || []).map(a => typeof a === 'string' ? { name: a, icon: 'Sparkles' } : a),
        mainPoint: item.mainPoint || '',
        mainPointTime: item.mainPointTime || '',
        order: item.order || 0,
        icon: item.icon || 'Star'
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        tag: 'Dětský svět',
        description: '',
        activities: [],
        mainPoint: '',
        mainPointTime: '',
        order: items.length,
        icon: 'Star'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const cleanData = {
        title: formData.title,
        tag: formData.tag,
        description: formData.description,
        activities: formData.activities.filter(a => a.name.trim() !== ''),
        mainPoint: formData.mainPoint,
        mainPointTime: formData.mainPointTime,
        order: Number(formData.order),
        icon: 'Star',
        updatedAt: serverTimestamp()
      };

      if (editingItem) {
        await updateDoc(doc(db, 'familyProgram', editingItem.id), cleanData);
      } else {
        await addDoc(collection(db, 'familyProgram'), {
          ...cleanData,
          createdAt: serverTimestamp()
        });
      }
      toast.success(editingItem ? 'Úspěšně upraveno!' : 'Úspěšně vytvořeno!');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Chyba při ukládání');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (item: FamilyProgram) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'familyProgram', itemToDelete.id));
      toast.success('Úspěšně smazáno!');
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error('Chyba při mazání');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="flex items-center gap-6">
            <Link to="/admin/program" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-teal hover:text-black transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div className="text-left">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Rodiny</h2>
                <button 
                  onClick={handleOpenHeaderModal}
                  className="p-1.5 bg-slate-50 rounded-lg text-slate-300 hover:text-brand-teal transition-all"
                >
                  <Edit size={14} />
                </button>
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{headerData.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal()} 
            className="flex items-center gap-3 px-6 py-4 bg-brand-teal text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-teal-light transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Přidat program
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Náhled</label>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Visual Preview */}
          <div className="bg-white p-12 md:p-20 border-b border-slate-100 relative overflow-hidden text-black">
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <div className="mb-8 text-center relative pt-2">
                <h4 className="text-[60px] md:text-[140px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-6 pointer-events-none whitespace-nowrap select-none">
                  Rodiny
                </h4>
                <h5 className="text-2xl font-bold tracking-tight relative z-10 text-black">{headerData.subtitle}</h5>
              </div>

              <div className="space-y-12">
                {loading ? (
                  <div className="py-10 flex justify-center"><Loader2 className="animate-spin text-brand-teal/20" size={32} /></div>
                ) : items.length === 0 ? (
                  <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-200 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Zde se zobrazí náhled programu pro děti
                  </div>
                ) : (
                  items.map((item) => {
                    const FamilyIcon = (item.icon && (FAMILY_ICONS.find(i => i.id === item.icon)?.icon)) || Star;
                    return (
                      <div key={item.id} className="bg-brand-yellow rounded-3xl p-10 md:p-16 shadow-2xl border-4 border-black/5 relative overflow-hidden text-left">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                          <div className="md:col-span-1 flex flex-col items-start text-left">
                            <div className="inline-flex items-center gap-2 bg-brand-red px-5 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-[0.2em] mb-8 shadow-lg">
                              <FamilyIcon size={16} />
                              <span>{item.tag}</span>
                            </div>
                            <h4 className="text-4xl md:text-5xl font-sans font-black tracking-tighter mb-6 text-black leading-none">
                              {item.title}
                            </h4>
                            <p className="text-black/80 text-lg leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="md:col-span-2 text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                              {item.activities?.map((act, idx) => {
                                const IconComp = (act.icon && (FAMILY_ICONS.find(i => i.id === act.icon)?.icon)) || Sparkles;
                                return (
                                  <div key={idx} className="flex items-center gap-3 p-5 bg-white/40 backdrop-blur-md rounded-2xl border border-black/5 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-sm">
                                    <IconComp size={20} className="text-brand-red shrink-0" />
                                    <span className="text-sm font-bold uppercase tracking-tight text-black leading-tight">{act.name}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {item.mainPoint && (
                              <div className="bg-black/5 border border-black/10 rounded-[32px] p-8 mt-4 flex items-center gap-6 group hover:scale-[1.01] transition-transform duration-500">
                                 <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-red rounded-full flex items-center justify-center text-white shrink-0 shadow-xl">
                                   <Clock size={32} />
                                 </div>
                                 <div className="text-left">
                                   <div className="mb-1">
                                     <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-red">HLAVNÍ BOD PROGRAMU</p>
                                   </div>
                                   <h4 className="text-2xl md:text-4xl font-sans font-black tracking-tighter text-black leading-tight leading-none mb-1">
                                     {item.mainPoint}
                                   </h4>
                                   {item.mainPointTime && (
                                     <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-red">{item.mainPointTime}</p>
                                   )}
                                 </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Management List */}
          <div className="p-6 bg-slate-50 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 pr-6 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm transition-all hover:border-brand-teal/50">
                <div className="flex items-center gap-5 min-w-0 text-left">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-yellow group-hover:bg-brand-yellow/10 transition-all flex-shrink-0">
                    {(() => {
                        const IconData = COMMUNITY_ICONS.find(i => i.id === item.icon);
                        const Icon = IconData ? IconData.icon : Star;
                        return <Icon size={20} />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-900 truncate tracking-tighter">{item.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.tag}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(item)} className="p-2.5 text-slate-300 hover:text-brand-teal hover:bg-slate-50 rounded-xl transition-all"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteClick(item)} className="p-2.5 text-slate-300 hover:text-brand-red hover:bg-slate-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{editingItem ? 'Upravit program' : 'Nový program'}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Rodiny</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Hlavní titulek <span className="text-brand-red">*</span></label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Tag / Štítek <span className="text-brand-red">*</span></label>
                    <input required value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Popisek <span className="text-brand-red">*</span></label>
                    <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-teal outline-none resize-none transition-all" />
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-red" /> Hlavní bod programu
                    </label>
                    <div className="border border-slate-200 rounded-3xl p-6 bg-slate-50 space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Název</label>
                        <input value={formData.mainPoint} onChange={e => setFormData({...formData, mainPoint: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Čas</label>
                        <input value={formData.mainPointTime} onChange={e => setFormData({...formData, mainPointTime: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Seznam aktivit</label>
                      <button type="button" onClick={handleAddActivity} className="flex items-center gap-1 px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg text-brand-teal text-[10px] font-black uppercase tracking-widest transition-all">
                        <Plus size={12} /> Přidat aktivitu
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.activities.map((activity, index) => (
                        <div key={index} className="flex gap-3 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 relative">
                            <button 
                              type="button"
                              onClick={() => setActiveIconIndex(index)}
                              className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 hover:bg-white hover:text-brand-teal transition-all shadow-sm"
                            >
                               {(() => {
                                 const IconComp = FAMILY_ICONS.find(i => i.id === activity.icon)?.icon || Sparkles;
                                 return <IconComp size={20} />;
                               })()}
                            </button>

                          <div className="flex-1 space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Název aktivity <span className="text-brand-red">*</span></label>
                            <input required value={activity.name} onChange={e => handleActivityChange(index, 'name', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:border-brand-teal transition-all" />
                          </div>
                          <button type="button" onClick={() => handleRemoveActivity(index)} className="p-3 text-slate-300 hover:text-brand-red transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isSubmitting ? 'Ukládám...' : 'Uložit program'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Icon Selection Modal for Activities */}
      <AnimatePresence>
        {activeIconIndex !== null && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 font-sans"
            >
              <div className="flex justify-between items-center mb-8 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Vybrat ikonu</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Zvolte symbol pro aktivitu</p>
                </div>
                <button type="button" onClick={() => setActiveIconIndex(null)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all group"><X size={24} className="group-hover:rotate-90 transition-transform duration-300" /></button>
              </div>

              <div className="grid grid-cols-4 gap-3 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                {FAMILY_ICONS.map((item) => {
                  const isSelected = formData.activities[activeIconIndex]?.icon === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        handleActivityChange(activeIconIndex, 'icon', item.id);
                        setActiveIconIndex(null);
                      }}
                      className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 group/icon ${
                        isSelected
                          ? 'bg-brand-teal/10 border-brand-teal text-brand-teal shadow-inner ring-4 ring-brand-teal/5' 
                          : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <item.icon size={32} className={`transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover/icon:scale-110'}`} />
                      <span className="text-[8px] font-black uppercase tracking-widest opacity-60 flex-shrink-0 whitespace-nowrap overflow-hidden max-w-full text-ellipsis">{item.id}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Smazat sekci?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed uppercase">Opravdu chcete smazat "{itemToDelete?.title}"?</p>
              <div className="flex gap-4">
                <button onClick={handleConfirmDelete} disabled={isDeleting} className="flex-1 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all">{isDeleting ? 'Mažu...' : 'Smazat'}</button>
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Edit Modal */}
      <AnimatePresence>
        {isHeaderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10">
              <div className="flex justify-between items-center mb-10 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Upravit záhlaví</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Rodiny</p>
                </div>
                <button onClick={() => setIsHeaderModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleHeaderSubmit} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Podnadpis <span className="text-brand-red">*</span></label>
                  <input required value={headerFormData.subtitle} onChange={e => setHeaderFormData({...headerFormData, subtitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isHeaderSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isHeaderSubmitting ? 'Ukládám...' : 'Uložit záhlaví'}</button>
                  <button type="button" onClick={() => setIsHeaderModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CommunityManager: React.FC = () => {
  const [sections, setSections] = useState<CommunitySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CommunitySection | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CommunitySection | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);

  const [headerData, setHeaderData] = useState({ subtitle: 'Prezentace organizací a zóna klidu' });
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [headerFormData, setHeaderFormData] = useState({ subtitle: '' });
  const [isHeaderSubmitting, setIsHeaderSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    tag: '',
    items: [] as CommunityItem[],
    order: 0,
    icon: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'communitySections'), orderBy('order', 'asc'));
    return onSnapshot(q, (snapshot) => {
      setSections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunitySection)));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'communityHeader'), (doc) => {
      if (doc.exists()) setHeaderData(doc.data() as { subtitle: string });
    });
  }, []);

  const handleOpenHeaderModal = () => {
    setHeaderFormData({ subtitle: headerData.subtitle });
    setIsHeaderModalOpen(true);
  };

  const handleHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsHeaderSubmitting(true);
    try {
      await setDoc(doc(db, 'settings', 'communityHeader'), {
        subtitle: headerFormData.subtitle,
        updatedAt: serverTimestamp()
      });
      toast.success('Záhlaví bylo úspěšně upraveno!');
      setIsHeaderModalOpen(false);
    } catch (err: any) {
      console.error("Error saving header:", err);
      toast.error("Chyba při ukládání záhlaví");
    } finally {
      setIsHeaderSubmitting(false);
    }
  };

  const handleOpenModal = (section?: CommunitySection, defaultTitle?: string) => {
    if (section) {
      setEditingSection(section);
      
      // Infer title if missing (for legacy data) using same logic as Home.tsx
      let inferredTitle = section.title || '';
      if (!inferredTitle) {
        const d = (section.description || '').toLowerCase();
        const hasItems = section.items && section.items.length > 0;
        const hasTag = !!section.tag;
        
        if (hasItems && !hasTag) inferredTitle = 'Velká sekce';
        else if (hasTag || d.includes('klidu') || d.includes('ztišení')) inferredTitle = 'Malá sekce';
      }

      setFormData({
        title: inferredTitle,
        name: section.name || '',
        description: section.description || '',
        tag: section.tag || '',
        items: [...(section.items || [])],
        order: section.order || 0,
        icon: section.icon || ((inferredTitle === 'Zóna klidu' || inferredTitle === 'Malá sekce') ? 'Pause' : 'Heart')
      });
    } else {
      setEditingSection(null);
      setFormData({
        title: defaultTitle || '',
        name: '',
        description: '',
        tag: '',
        items: [],
        order: sections.length,
        icon: (defaultTitle === 'Zóna klidu' || defaultTitle === 'Malá sekce') ? 'Pause' : 'Heart'
      });
    }
    setIsModalOpen(true);
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', description: '' }]
    });
  };

  const handleItemChange = (index: number, field: keyof CommunityItem, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isSmallSection = formData.title === 'Zóna klidu' || formData.title === 'Malá sekce' || formData.title === 'Malá';
      const dataToSave = {
        title: formData.title,
        name: formData.name,
        description: formData.description,
        tag: isSmallSection ? formData.tag : '',
        items: isSmallSection ? [] : formData.items.map(item => ({ name: item.name, description: item.description })),
        order: Number(formData.order),
        icon: formData.icon,
        updatedAt: serverTimestamp()
      };
      
      if (editingSection) {
        await updateDoc(doc(db, 'communitySections', editingSection.id), dataToSave);
      } else {
        await addDoc(collection(db, 'communitySections'), dataToSave);
      }
      
      toast.success(editingSection ? 'Úspěšně upraveno!' : 'Úspěšně vytvořeno!');
      setIsModalOpen(false);
    } catch (err) { 
      console.error(err); 
      toast.error('Chyba při ukládání');
    } finally { setIsSubmitting(false); }
  };

  const handleDeleteClick = (section: CommunitySection) => {
    setItemToDelete(section);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'communitySections', itemToDelete.id));
      toast.success('Úspěšně smazáno!');
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) { 
      console.error(err); 
      toast.error('Chyba při mazání');
    } finally { setIsDeleting(false); }
  };

  if (loading) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="flex items-center gap-6">
            <Link to="/admin/program" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-teal hover:text-black transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div className="text-left">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Komunita</h2>
                <button 
                  onClick={handleOpenHeaderModal}
                  className="p-1.5 bg-slate-50 rounded-lg text-slate-300 hover:text-brand-teal transition-all"
                >
                  <Edit size={14} />
                </button>
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{headerData.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 ml-auto justify-end">
            <button 
              onClick={() => handleOpenModal(undefined, 'Velká sekce')}
              className="flex items-center gap-3 px-6 py-4 bg-brand-teal text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-teal-light transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} /> Přidat velkou sekci
            </button>
            <button 
              onClick={() => handleOpenModal(undefined, 'Malá sekce')}
              className="flex items-center gap-3 px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition-all border border-slate-200 shadow-sm active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} /> Přidat malou sekci
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Náhled</label>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Visual Preview */}
          <div className="bg-white p-12 md:p-20 border-b border-slate-100 relative overflow-hidden text-black">
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <div className="mb-8 text-center relative pt-2">
                <h4 className="text-[60px] md:text-[140px] font-sans font-bold tracking-tighter text-black/[0.03] absolute left-1/2 -translate-x-1/2 -top-6 pointer-events-none whitespace-nowrap select-none">
                  Komunita
                </h4>
                <h5 className="text-2xl font-bold tracking-tight relative z-10 text-black">{headerData.subtitle}</h5>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
                {sections.length === 0 ? (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-200 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Zde se zobrazí náhled komunitních sekcí
                  </div>
                ) : (
                  <>
                    {/* Left Block: Velká sekce */}
                    <div className="md:col-span-8 bg-[#42A1A1] rounded-[40px] p-8 md:p-10 shadow-2xl overflow-hidden relative border border-white/10 text-left h-full">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                      <div className="space-y-8 relative z-10 h-full flex flex-col">
                        {sections.filter(s => s.title === 'Velká sekce' || s.title === 'Velká' || s.title === 'Organizace').map((section) => {
                          const IconComponent = (section.icon && (COMMUNITY_ICONS.find(i => i.id === section.icon)?.icon)) || Heart;
                          return (
                            <div key={section.id} className="space-y-8 group flex-grow">
                              <div className="flex items-start gap-5">
                                <div className="p-3 bg-white/10 rounded-2xl text-white shadow-inner flex-shrink-0">
                                  <IconComponent size={28} />
                                </div>
                                <div className="space-y-1">
                                  <h4 className="text-3xl font-sans font-bold tracking-tighter text-white">
                                    {section.name || 'Velká sekce'}
                                  </h4>
                                  <p className="text-white/70 font-light leading-snug text-left max-w-xl text-base">
                                    {section.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {(section.items || []).map((item, i) => (
                                  <div key={i} className="p-4 bg-black/10 rounded-2xl border border-white/5 hover:bg-black/20 transition-all group/item">
                                    <span className="font-bold text-lg text-white tracking-tight block mb-0.5">{item.name}</span>
                                    <p className="text-[10px] font-black text-brand-yellow uppercase tracking-widest opacity-60 group-hover/item:opacity-100 transition-opacity">
                                      {item.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                        {sections.filter(s => s.title === 'Velká sekce' || s.title === 'Velká' || s.title === 'Organizace').length === 0 && (
                          <div className="flex-grow flex items-center justify-center">
                            <div className="py-12 px-6 text-center border-2 border-dashed border-white/10 rounded-3xl opacity-30 w-full">
                              <p className="text-xs font-bold uppercase tracking-widest text-white">Velká sekce se připravuje</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Block: Malá sekce */}
                    <div className="md:col-span-4 bg-[#3E9292] rounded-[40px] p-8 md:p-10 shadow-2xl overflow-hidden relative border border-white/10 text-left h-full">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                      <div className="space-y-8 relative z-10 h-full flex flex-col">
                        {sections.filter(s => s.title === 'Malá sekce' || s.title === 'Malá' || s.title === 'Zóna klidu').map((section) => {
                          const IconComponent = (section.icon && (COMMUNITY_ICONS.find(i => i.id === section.icon)?.icon)) || Pause;
                          return (
                            <div key={section.id} className="space-y-8 group flex-grow h-full flex flex-col">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-xl text-white shadow-inner">
                                  <IconComponent size={24} />
                                </div>
                                <h4 className="text-2xl font-sans font-bold tracking-tighter text-white">
                                  {section.name || 'Malá sekce'}
                                </h4>
                              </div>
                              
                              <p className="text-white/70 font-light leading-relaxed text-base">
                                {section.description}
                              </p>

                              {section.tag && (
                                <div className="p-6 bg-white/5 rounded-[28px] border border-white/10 flex items-center justify-center text-center mt-auto">
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200 opacity-80 decoration-brand-yellow/50 decoration-2 underline-offset-4">
                                    {section.tag}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {sections.filter(s => s.title === 'Malá sekce' || s.title === 'Malá' || s.title === 'Zóna klidu').length === 0 && (
                          <div className="flex-grow flex items-center justify-center">
                            <div className="py-12 px-6 text-center border-2 border-dashed border-white/10 rounded-3xl opacity-30 w-full">
                              <p className="text-xs font-bold uppercase tracking-widest text-white">Malá sekce se připravuje</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Management List */}
          <div className="p-6 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <div key={section.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm transition-all hover:border-brand-teal/50">
                <div className="flex items-center gap-5 min-w-0 text-left">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0 bg-slate-100 text-slate-400 group-hover:bg-brand-teal/10 group-hover:text-brand-teal">
                    {(() => {
                        const IconData = COMMUNITY_ICONS.find(i => i.id === section.icon);
                        const Icon = IconData ? IconData.icon : ((section.title === 'Zóna klidu' || section.title === 'Malá sekce') ? Pause : Heart);
                        return <Icon size={20} />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-900 truncate tracking-tighter">{section.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest truncate">{section.title}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(section)} className="p-2.5 text-slate-300 hover:text-brand-teal hover:bg-slate-50 rounded-xl transition-all"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteClick(section)} className="p-2.5 text-slate-300 hover:text-brand-red hover:bg-slate-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{editingSection ? 'Upravit sekci' : 'Nová sekce'}</h3>
                  <p className="text-slate-400 text-xs font-bold tracking-widest">{formData.title}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 font-black">Typ sekce <span className="text-brand-red">*</span></label>
                    <input required value={formData.title} onChange={e => {
                      const newTitle = e.target.value;
                      setFormData({
                        ...formData, 
                        title: newTitle
                      });
                    }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all font-black uppercase" />
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Ikona sekce</label>
                    <button
                      type="button"
                      onClick={() => setIsIconModalOpen(true)}
                      className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl w-full hover:border-brand-teal transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-brand-teal shadow-sm group-hover:shadow-md transition-all">
                        {(() => {
                          const IconData = COMMUNITY_ICONS.find(i => i.id === formData.icon);
                          const Icon = IconData ? IconData.icon : ((formData.title === 'Zóna klidu' || formData.title === 'Malá sekce') ? Pause : Heart);
                          return <Icon size={24} />;
                        })()}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Vybrat ikonu</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kliknutím změníte symbol sekce</p>
                      </div>
                      <div className="ml-auto w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-300 group-hover:text-brand-teal transition-all">
                        <Plus size={18} />
                      </div>
                    </button>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Název sekce <span className="text-brand-red">*</span></label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all font-medium" />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Popis</label>
                    <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-teal outline-none resize-none transition-all" />
                  </div>

                  { (formData.title === 'Malá sekce' || formData.title === 'Malá' || formData.title === 'Zóna klidu') ? (
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Tag <span className="text-brand-red">*</span></label>
                      <input required value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                    </div>
                  ) : (
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Seznam položek</label>
                        <button type="button" onClick={handleAddItem} className="flex items-center gap-1 px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg text-brand-teal text-[10px] font-black uppercase tracking-widest transition-all">
                          <Plus size={12} /> Přidat položku
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.items.map((item, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                            <button type="button" onClick={() => handleRemoveItem(index)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-brand-red transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                            <div className="grid gap-3 mt-2 md:mt-0 md:pr-8">
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Název <span className="text-brand-red">*</span></label>
                                <input required value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 outline-none focus:border-brand-teal" />
                              </div>
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Popis</label>
                                <input value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-500 outline-none focus:border-brand-teal" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isSubmitting ? 'Ukládám...' : 'Uložit sekci'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Icon Selection Modal */}
      <AnimatePresence>
        {isIconModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 font-sans"
            >
              <div className="flex justify-between items-center mb-8 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Vybrat ikonu</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Zvolte symbol pro sekci</p>
                </div>
                <button type="button" onClick={() => setIsIconModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all group"><X size={24} className="group-hover:rotate-90 transition-transform duration-300" /></button>
              </div>

              <div className="grid grid-cols-4 gap-3 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                {COMMUNITY_ICONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, icon: item.id });
                      setIsIconModalOpen(false);
                    }}
                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 group/icon ${
                      formData.icon === item.id 
                        ? 'bg-brand-teal/10 border-brand-teal text-brand-teal shadow-inner ring-4 ring-brand-teal/5' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <item.icon size={32} className={`transition-transform duration-300 ${formData.icon === item.id ? 'scale-110' : 'group-hover/icon:scale-110'}`} />
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{item.id}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 italic text-[10px] text-slate-400 text-center uppercase tracking-[0.2em]">
                Vybraná ikona se okamžitě projeví ve formuláři
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Smazat sekci?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed uppercase">Opravdu chcete smazat "{itemToDelete?.name}"?</p>
              <div className="flex gap-4">
                <button onClick={handleConfirmDelete} disabled={isDeleting} className="flex-1 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all">{isDeleting ? 'Mažu...' : 'Smazat'}</button>
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Edit Modal */}
      <AnimatePresence>
        {isHeaderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10">
              <div className="flex justify-between items-center mb-10 text-left">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Upravit záhlaví</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Komunita</p>
                </div>
                <button onClick={() => setIsHeaderModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleHeaderSubmit} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Podnadpis <span className="text-brand-red">*</span></label>
                  <input required value={headerFormData.subtitle} onChange={e => setHeaderFormData({...headerFormData, subtitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isHeaderSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isHeaderSubmitting ? 'Ukládám...' : 'Uložit záhlaví'}</button>
                  <button type="button" onClick={() => setIsHeaderModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutManager = () => {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<AboutSection | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<AboutSection | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ tag: '', title: '', description: '', order: 0 });
  const [headerData, setHeaderData] = useState({ subtitle: 'Příběh festivalu' });
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [headerFormData, setHeaderFormData] = useState({ subtitle: '' });
  const [isHeaderSubmitting, setIsHeaderSubmitting] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, 'settings', 'aboutHeader'), (snapshot) => {
      if (snapshot.exists()) setHeaderData(snapshot.data() as any);
    });

    const q = query(collection(db, 'aboutSections'), orderBy('order', 'asc'));
    return onSnapshot(q, (snapshot) => {
      setSections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AboutSection)));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching about sections:", error);
      setLoading(false);
    });
  }, []);

  const handleOpenModal = (section?: AboutSection) => {
    if (section) {
      setEditingSection(section);
      setFormData({ tag: section.tag, title: section.title, description: section.description, order: section.order });
    } else {
      setEditingSection(null);
      setFormData({ tag: '', title: '', description: '', order: sections.length });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = { ...formData, updatedAt: serverTimestamp() };
      
      toast.success(editingSection ? 'Úspěšně upraveno!' : 'Úspěšně vytvořeno!');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Chyba při ukládání");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!sectionToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'aboutSections', sectionToDelete.id));
      toast.success('Úspěšně smazáno!');
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenHeaderModal = () => {
    setHeaderFormData({ subtitle: headerData.subtitle });
    setIsHeaderModalOpen(true);
  };

  const handleHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsHeaderSubmitting(true);
    try {
      await setDoc(doc(db, 'settings', 'aboutHeader'), {
        subtitle: headerFormData.subtitle,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Záhlaví bylo úspěšně upraveno!');
      setIsHeaderModalOpen(false);
    } catch (err: any) {
      console.error("Error saving about header:", err);
      toast.error("Chyba při ukládání záhlaví: " + (err.message || "Neznámá chyba"));
    } finally {
      setIsHeaderSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-black uppercase tracking-tighter">O festivalu</h2>
              <button 
                onClick={handleOpenHeaderModal}
                className="p-1.5 bg-slate-50 rounded-lg text-slate-300 hover:text-brand-teal transition-all"
              >
                <Edit size={14} />
              </button>
            </div>
            <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">{headerData.subtitle}</p>
          </div>
          <button 
            onClick={() => handleOpenModal()} 
            className="flex items-center gap-3 px-6 py-4 bg-brand-teal text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-teal-light transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Přidat sekci
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Náhled</label>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Visual Preview */}
          <div className="bg-brand-red p-12 md:p-20 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 transform translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <div className="text-[10px] font-bold tracking-[0.4em] text-white/50 mb-4 uppercase">{headerData.subtitle}</div>
                <div className="text-5xl md:text-7xl font-sans font-bold tracking-tighter leading-none text-white uppercase mb-4">O festivalu</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {loading ? (
                  <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-white/20" size={32} /></div>
                ) : sections.length === 0 ? (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-3xl opacity-30 w-full">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white">Informace o festivalu připravujeme</div>
                  </div>
                ) : (
                  sections.map((s, idx) => (
                    <div 
                      key={s.id} 
                      className={`p-8 md:p-10 space-y-6 relative group overflow-hidden rounded-3xl border border-white/5 text-left ${
                        idx % 2 === 0 ? 'bg-black/20' : 'bg-black/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-0.5 w-6 ${idx % 2 === 0 ? 'bg-brand-yellow' : 'bg-brand-teal'}`} />
                        <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${idx % 2 === 0 ? 'text-brand-yellow' : 'text-brand-teal'}`}>{s.tag}</div>
                      </div>
                      <div className="text-xl md:text-2xl font-sans font-bold leading-tight tracking-tighter whitespace-pre-wrap text-white">
                        {s.title}
                      </div>
                      <div className="text-sm text-white leading-relaxed font-light line-clamp-4 opacity-70">
                        {s.description}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Management Grid */}
          <div className="p-4 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((s) => (
              <div key={s.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between group shadow-sm transition-all hover:border-brand-teal/50">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-teal transition-colors flex-shrink-0">
                    <Heart size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-900 truncate tracking-tighter">{s.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{s.tag}</p>
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  <button onClick={() => handleOpenModal(s)} className="p-2 text-slate-300 hover:text-brand-teal hover:bg-slate-50 rounded-lg transition-all"><Edit size={16} /></button>
                  <button onClick={() => { setSectionToDelete(s); setIsDeleteModalOpen(true); }} className="p-2 text-slate-300 hover:text-brand-red hover:bg-slate-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      <AnimatePresence>
        {isHeaderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl admin-modal-content"
            >
              <form onSubmit={handleHeaderSubmit} className="p-8 space-y-6 text-left">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Upravit popis</h3>
                  <button type="button" onClick={() => setIsHeaderModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Podnadpis sekce <span className="text-brand-red">*</span></label>
                  <input 
                    required 
                    type="text"
                    value={headerFormData.subtitle} 
                    onChange={e => setHeaderFormData({...headerFormData, subtitle: e.target.value})} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-none transition-all" 
                   
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsHeaderModalOpen(false)} className="px-6 py-3 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-600 transition-all">Zrušit</button>
                  <button type="submit" disabled={isHeaderSubmitting} className="px-8 py-3 bg-brand-teal text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-brand-teal-light transition-all shadow-lg active:scale-95 disabled:opacity-50">
                    {isHeaderSubmitting ? 'Ukládám...' : 'Uložit změny'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto overflow-x-hidden">
              <div className="flex justify-between items-center mb-10">
                <div className="text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{editingSection ? 'Upravit sekci' : 'Přidat sekci'}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Tag</label>
                    <input value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nadpis <span className="text-brand-red">*</span></label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Popis</label>
                    <textarea rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none resize-none transition-all" />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-brand-teal text-black rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-brand-teal-light transition-all disabled:opacity-50">{isSubmitting ? 'Ukládám...' : 'Uložit sekci'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Smazat sekci?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Opravdu chcete smazat sekci "{sectionToDelete?.title}"?</p>
              <div className="flex gap-4">
                <button onClick={handleConfirmDelete} disabled={isDeleting} className="flex-1 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-600 transition-all">{isDeleting ? 'Mažu...' : 'Smazat'}</button>
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Zrušit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactManager = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [contactInfo, setContactInfo] = useState({ 
    email: '', 
    phone: '',
    welcomeText: 'Ať už přijdete na chvíli, nebo zůstanete celý den, jste vítáni\n\nPřijďte sami, s přáteli nebo s rodinou\n\nPřijďte se podívat, odpočinout si nebo se nechat inspirovat\n\nNebojte se zeptat',
    tagline: 'Den pro Brno je tu pro vás'
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Fetch submissions
    const q = query(collection(db, 'contactSubmissions'), orderBy('createdAt', 'desc'));
    const unsubSubmissions = onSnapshot(q, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission)));
      setLoading(false);
    });

    // Fetch contact info
    const unsubInfo = onSnapshot(doc(db, 'settings', 'contact'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setContactInfo(prev => ({
          ...prev,
          ...data
        }) as typeof contactInfo);
      }
    });

    return () => {
      unsubSubmissions();
      unsubInfo();
    };
  }, []);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'contact'), contactInfo);
      toast.success("Kontakt byl uložen!");
    } catch (err) {
      console.error(err);
      toast.error("Chyba při ukládání");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm("Opravdu smazat tuto zprávu?")) return;
    try {
      await deleteDoc(doc(db, 'contactSubmissions', id));
      toast.success('Úspěšně smazáno!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-16 text-left animate-in fade-in duration-700">
      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Kontakt</h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <MessageSquare size={24} />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm shadow-slate-200/50">
          <form onSubmit={handleInfoSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">E-mail pro web</label>
              <input 
                type="email"
                value={contactInfo.email} 
                onChange={e => setContactInfo({...contactInfo, email: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-none transition-all" 
                
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Telefon pro web</label>
              <input 
                value={contactInfo.phone} 
                onChange={e => setContactInfo({...contactInfo, phone: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-none transition-all" 
                
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Uvítací text</label>
              <textarea 
                rows={10}
                value={contactInfo.welcomeText} 
                onChange={e => setContactInfo({...contactInfo, welcomeText: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-none resize-none transition-all" 
                
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Tagline</label>
              <input 
                value={contactInfo.tagline} 
                onChange={e => setContactInfo({...contactInfo, tagline: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-none transition-all" 
                
              />
            </div>
            <div className="md:col-span-2 pt-4">
              <button 
                type="submit" 
                disabled={isSaving}
                className="px-10 py-4 bg-brand-teal text-black font-black uppercase tracking-widest rounded-xl hover:bg-brand-teal-light transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isSaving ? 'Ukládám...' : 'Uložit kontakty'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
          <div className="text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">Přijaté zprávy</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Zprávy z kontaktního formuláře</p>
          </div>
          <div className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {submissions.length} zpráv
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-brand-teal" size={32} /></div>
          ) : submissions.length === 0 ? (
            <div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-3xl text-slate-300 font-bold uppercase tracking-widest shadow-sm">Zatím žádné zprávy</div>
          ) : (
            submissions.map((sub) => (
              <motion.div 
                key={sub.id} 
                className="bg-white border border-slate-200 p-6 rounded-3xl text-slate-900 shadow-sm shadow-slate-200/50 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:scale-[1.01] transition-all"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <User size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-none">{sub.name}</h4>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal">{sub.email}</span>
                    </div>
                    <span className="ml-auto md:ml-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      {sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString('cs-CZ') : 'N/A'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {sub.message}
                  </p>
                </div>
                <div className="flex justify-end pt-2 md:pt-0">
                  <button 
                    onClick={() => handleDeleteSubmission(sub.id)}
                    className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-brand-red text-slate-400 hover:text-white transition-all border border-slate-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const SettingsManager = () => {
  const [logoPassive, setLogoPassive] = useState('');
  const [logoActive, setLogoActive] = useState('');
  const [siteTitle, setSiteTitle] = useState('Den pro Brno');
  const [faviconUrl, setFaviconUrl] = useState('/favicon.ico');
  const [gaMeasurementId, setGaMeasurementId] = useState('');
  const [isUploadingPassive, setIsUploadingPassive] = useState(false);
  const [isUploadingActive, setIsUploadingActive] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLogoPassive(data.logoPassive || '');
        setLogoActive(data.logoActive || '');
        setSiteTitle(data.title || 'Den pro Brno');
        setFaviconUrl(data.faviconUrl || '/favicon.ico');
        setGaMeasurementId(data.gaMeasurementId || '');
      }
    });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'passive' | 'active' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'passive') setIsUploadingPassive(true);
    else if (type === 'active') setIsUploadingActive(true);
    else setIsUploadingFavicon(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server returned ${response.status}`);
      }
      const data = await response.json();
      if (data.url) {
        if (type === 'passive') setLogoPassive(data.url);
        else if (type === 'active') setLogoActive(data.url);
        else setFaviconUrl(data.url);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      toast.error(`Chyba při nahrávání: ${err.message}`);
    } finally {
      if (type === 'passive') setIsUploadingPassive(false);
      else if (type === 'active') setIsUploadingActive(false);
      else setIsUploadingFavicon(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        logoPassive,
        logoActive,
        title: siteTitle,
        faviconUrl,
        gaMeasurementId,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Nastavení bylo úspěšně upraveno!');
      // Apply changes locally
      document.title = siteTitle;
      const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = faviconUrl;
      document.head.appendChild(link);
    } catch (err) {
      console.error(err);
      toast.error('Chyba při ukládání');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 text-slate-900 text-left">
        <div className="text-left">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">Nastavení webu</h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
          <SettingsIcon size={24} />
        </div>
      </header>

       <section className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm space-y-12">
        <div className="text-left space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">Všeobecné nastavení</h3>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Titulek stránky v prohlížeči</label>
            <input value={siteTitle} onChange={e => setSiteTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Google Analytics Measurement ID (např. G-XXXXXXXXXX)</label>
            <input value={gaMeasurementId} onChange={e => setGaMeasurementId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:border-brand-teal outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Ikona v prohlížeči (Favicon)</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                <img src={faviconUrl} alt="Favicon" className="max-h-10 max-w-10" />                
              </div>
              <input type="file" onChange={e => handleFileUpload(e, 'favicon')} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-brand-teal file:text-black hover:file:bg-brand-teal-light" accept="image/x-icon,image/png,image/svg+xml" />
              {isUploadingFavicon && <Loader2 className="animate-spin text-brand-teal" size={24} />}
            </div>
          </div>
        </div>

        <div className="text-left">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-slate-900">Loga v navigaci</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Passive Logo */}
          <div className="space-y-6">
            <div className="text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Pasivní Logo</label>
              <div className="relative group">
                <div className="w-full h-48 bg-brand-red rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-teal/50">
                  <img 
                    src={logoPassive || "/logo-white.png"} 
                    alt="Passive Logo" 
                    className="max-h-24 w-auto object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                  <input 
                    type="file" 
                    onChange={e => handleFileUpload(e, 'passive')}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept="image/*"
                  />
                  {isUploadingPassive && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="animate-spin text-brand-teal" size={32} />
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-3 text-[10px] text-slate-400 italic">Aktuálně zvoleno: {logoPassive ? 'Vlastní logo' : 'Výchozí (logo-white.png)'}</p>
            </div>
          </div>

          {/* Active Logo */}
          <div className="space-y-6">
            <div className="text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Aktivní Logo</label>
              <div className="relative group">
                <div className="w-full h-48 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-teal/50">
                  <img 
                    src={logoActive || "/logo-blue.png"} 
                    alt="Active Logo" 
                    className="max-h-24 w-auto object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                  <input 
                    type="file" 
                    onChange={e => handleFileUpload(e, 'active')}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept="image/*"
                  />
                  {isUploadingActive && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="animate-spin text-brand-teal" size={32} />
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-3 text-[10px] text-slate-400 italic">Aktuálně zvoleno: {logoActive ? 'Vlastní logo' : 'Výchozí (logo-blue.png)'}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 text-left">
          <button 
            onClick={handleSave}
            disabled={isSaving || isUploadingPassive || isUploadingActive}
            className="px-10 py-4 bg-brand-teal text-black font-black uppercase tracking-widest rounded-xl hover:bg-brand-teal-light transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isSaving ? 'Ukládám...' : 'Uložit nastavení'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [artistsCount, setArtistsCount] = useState(0);
  const [talkshowsCount, setTalkshowsCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [familyCount, setFamilyCount] = useState(0);
  const [communityCount, setCommunityCount] = useState(0);
  const [aboutCount, setAboutCount] = useState(0);
  const [submissionsCount, setSubmissionsCount] = useState(0);
  const [visitsCount, setVisitsCount] = useState(0);
  const [logoPassive, setLogoPassive] = useState('');

  useEffect(() => {
    const unsubVisits = onSnapshot(doc(db, 'settings', 'stats'), (snapshot) => {
      if (snapshot.exists()) {
        setVisitsCount(snapshot.data().totalVisits || 0);
      }
    });

    const unsubGlobal = onSnapshot(doc(db, 'settings', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        setLogoPassive(snapshot.data().logoPassive || '');
      }
    });

    const q1 = query(collection(db, 'musicProgram'));
    const unsub1 = onSnapshot(q1, (snapshot) => {
      setArtistsCount(snapshot.size);
    });

    const q2 = query(collection(db, 'practicalInfo'));
    const unsub2 = onSnapshot(q2, (snapshot) => {
      setInfoCount(snapshot.size);
    });

    const q3 = query(collection(db, 'talkshows'));
    const unsub3 = onSnapshot(q3, (snapshot) => {
      setTalkshowsCount(snapshot.size);
    });

    const q4 = query(collection(db, 'familyProgram'));
    const unsub4 = onSnapshot(q4, (snapshot) => {
      setFamilyCount(snapshot.size);
    });

    const q5 = query(collection(db, 'communitySections'));
    const unsub5 = onSnapshot(q5, (snapshot) => {
      setCommunityCount(snapshot.size);
    });

    const q6 = query(collection(db, 'aboutSections'));
    const unsub6 = onSnapshot(q6, (snapshot) => {
      setAboutCount(snapshot.size);
    });

    const qSub = query(collection(db, 'contactSubmissions'));
    const unsubSub = onSnapshot(qSub, (snapshot) => {
      setSubmissionsCount(snapshot.size);
    });

    return () => {
      unsubVisits();
      unsubGlobal();
      unsub1();
      unsub2();
      unsub3();
      unsub4();
      unsub5();
      unsub6();
      unsubSub();
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row">
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          duration: 3000, 
          style: { 
            background: 'linear-gradient(135deg, #AF1E4E 0%, #8a173d 100%)', 
            color: '#fff', 
            fontWeight: '600',
            letterSpacing: '0.02em',
            borderRadius: '24px',
            padding: '16px 28px',
            boxShadow: '0 20px 40px -10px rgba(175,30,78,0.5)',
            border: '1px solid rgba(255,255,255,0.1)'
          },
          success: {
            iconTheme: {
              primary: '#8ED6D6',
              secondary: '#AF1E4E',
            },
          },
          error: {
            iconTheme: {
              primary: '#FFCD29',
              secondary: '#AF1E4E',
            },
          }
        }} 
      />
      {/* Sidebar */}
      <aside className="w-full md:w-72 brand-gradient border-r border-white/10 p-6 flex flex-col z-20 text-left text-white shadow-2xl">
        <div className="mb-12 flex items-center gap-4">
          <div className="flex items-center justify-center transition-all bg-white/5 p-2 rounded-2xl border border-white/10">
            <img 
              src={logoPassive || "/logo-white.png"} 
              alt="Logo" 
              className="h-8 md:h-10 w-auto object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase hidden sm:block">Admin</span>
        </div>

        <nav className="space-y-2">
          {[
            { label: 'Přehled', icon: LayoutDashboard, path: '/admin' },
            { label: 'Úvod', icon: Layout, path: '/admin/intro' },
            { label: 'Program', icon: Calendar, path: '/admin/program' },
            { label: 'O festivalu', icon: Heart, path: '/admin/about' },
            { label: 'Praktické info', icon: Info, path: '/admin/info' },
            { label: 'Kontakt', icon: MessageSquare, path: '/admin/contact' },
            { label: 'Nastavení', icon: SettingsIcon, path: '/admin/settings' },
          ].map((item) => (
            <Link 
              key={item.label} 
              to={item.path} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                (item.path === '/admin' ? window.location.pathname === '/admin' : window.location.pathname.startsWith(item.path)) 
                  ? 'bg-white/20 text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur-sm' 
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10 mt-6">
          <div className="flex items-center gap-3 mb-6 p-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-xs font-bold truncate">{user?.email}</span>
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Admin</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={18} /> Odhlásit se
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 max-w-[1600px] w-full mx-auto overflow-y-auto admin-main">
        <Routes>
          <Route path="/" element={<AdminDashboard artistsCount={artistsCount} infoCount={infoCount} talkshowsCount={talkshowsCount} familyCount={familyCount} communityCount={communityCount} aboutCount={aboutCount} submissionsCount={submissionsCount} visitsCount={visitsCount} />} />
          <Route path="/intro" element={<IntroManager />} />
          <Route path="/program" element={<ProgramDashboard />} />
          <Route path="/program/music" element={<ProgramManager />} />
          <Route path="/program/talkshow" element={<TalkshowManager />} />
          <Route path="/program/family" element={<FamilyProgramManager />} />
          <Route path="/program/community" element={<CommunityManager />} />
          <Route path="/about" element={<AboutManager />} />
          <Route path="/info" element={<PracticalInfoManager />} />
          <Route path="/contact" element={<ContactManager />} />
          <Route path="/settings" element={<SettingsManager />} />
        </Routes>
      </main>
    </div>
  );
}

