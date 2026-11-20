import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

const photo = (id, width = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const crystalPhoto = (file) => `https://crystalarch.in/wp-content/uploads/${file.replace(/-\d+x\d+(?=\.(?:jpe?g|png|webp)$)/i, '')}`;
// Pexels 4K footage; free stock clips by Alef Morais, Owen Mathias and umar muazu.
const heroVideos = [
  'https://videos.pexels.com/video-files/40807454/17436157_3840_2160_30fps.mp4',
  'https://videos.pexels.com/video-files/34955049/14806900_3840_2160_50fps.mp4',
  'https://videos.pexels.com/video-files/35634058/15101904_3840_2160_30fps.mp4',
];
const photos = {
  studio: crystalPhoto('2021/05/DescriptionWP.jpg'),
  interiors: crystalPhoto('2021/05/interior-design.jpg'),
  planning: crystalPhoto('2021/05/urban-planning.jpg'),
  process: crystalPhoto('2021/05/architecture.jpg'),
  house: crystalPhoto('2015/07/pro_16-750x499.jpg'),
  workplace: crystalPhoto('2015/07/pro_5-750x499.jpg'),
  courtyard: crystalPhoto('2015/07/pro_17-750x499.jpg'),
  residence: crystalPhoto('2015/07/pro_18a-750x499.jpg'),
  lobby: crystalPhoto('2015/07/pro_21-2-750x499.jpg'),
  pavilion: crystalPhoto('2015/07/pro_34h-750x499.jpg'),
  interiorTwo: crystalPhoto('2015/07/pro_3a-750x499.jpg'),
  facade: crystalPhoto('2015/07/pro_13c-750x499.jpg'),
  founderOne: 'https://www.psinnovativecreation.com/assets/images/Sumit_Kuralkar.png',
  founderTwo: 'https://www.psinnovativecreation.com/assets/images/Ashok.JPG',
  founderThree: 'https://www.psinnovativecreation.com/assets/images/Tushar.JPG',
};

const projects = [
  { slug: 'sate-town', title: 'Sate Town', location: 'Sate, Mawal', category: 'Project', image: photos.house, gallery: [photos.house, photos.courtyard, photos.facade], description: 'A Cabriolet Arch portfolio project listed at Sate, Mawal.' },
  { slug: 'mamurdi-projects', title: 'Mamurdi Projects', category: 'Project', image: photos.workplace, gallery: [photos.workplace, photos.interiors, photos.lobby], description: 'A project featured in the Cabriolet Arch portfolio.' },
  { slug: 'chimble-projects', title: 'Chimble Projects', location: 'Chimble, Pune', category: 'Project', image: photos.courtyard, gallery: [photos.courtyard, photos.residence, photos.house], description: 'A Cabriolet Arch portfolio project listed at Chimble, Pune.' },
  { slug: 'ravet-projects', title: 'Ravet Projects', location: 'Ravet, Pune', category: 'Project', image: photos.residence, gallery: [photos.residence, photos.house, photos.facade], description: 'A Cabriolet Arch portfolio project listed at Ravet, Pune.' },
  { slug: 'shirapur-projects', title: 'Shirapur Projects', location: 'Shirapur, Pune', category: 'Project', image: photos.interiors, gallery: [photos.interiors, photos.interiorTwo, photos.studio], description: 'A Cabriolet Arch portfolio project listed at Shirapur, Pune.' },
  { slug: 'nanekarwadi-projects', title: 'Nanekarwadi Projects', category: 'Project', image: photos.lobby, gallery: [photos.lobby, photos.workplace, photos.facade], description: 'A project featured in the Cabriolet Arch portfolio.' },
  { slug: 'tathawade-projects', title: 'Tathawade Projects', location: 'Tathawade, Pune', category: 'Project', image: photos.pavilion, gallery: [photos.pavilion, photos.courtyard, photos.planning], description: 'A Cabriolet Arch portfolio project listed at Tathawade, Pune.' },
  { slug: 'anjangaon-projects', title: 'Anjangaon Projects', location: 'Anjangaon', category: 'Project', image: photos.interiorTwo, gallery: [photos.interiorTwo, photos.interiors, photos.studio], description: 'A Cabriolet Arch portfolio project listed at Anjangaon.' },
  { slug: 'junnar-projects', title: 'Junnar Projects', location: 'Junnar', category: 'Project', image: photos.facade, gallery: [photos.facade, photos.house, photos.residence], description: 'A Cabriolet Arch portfolio project listed at Junnar.' },
  { slug: 'anjangaon', title: 'Anjangaon', location: 'Anjangaon', category: 'Project', image: photos.studio, gallery: [photos.studio, photos.house, photos.courtyard], description: 'A project featured in the Cabriolet Arch portfolio at Anjangaon.' },
  { slug: 'beed-projects', title: 'Beed Projects', location: 'Beed', category: 'Project', image: photos.workplace, gallery: [photos.workplace, photos.facade, photos.lobby], description: 'A Cabriolet Arch portfolio project listed at Beed.' },
  { slug: 'mountain-valley', title: 'Mountain Valley', location: 'Sanaswadi, Ta-Shirur, Pune', category: 'Project', image: photos.pavilion, gallery: [photos.pavilion, photos.planning, photos.courtyard], description: 'A Cabriolet Arch portfolio project listed at Sanaswadi, Ta-Shirur, Pune.' },
  { slug: 'tropical-paradise', title: 'Tropical Paradise', location: 'Kalewadi, Pune', category: 'Project', image: photos.residence, gallery: [photos.residence, photos.house, photos.facade], description: 'A Cabriolet Arch portfolio project listed at Kalewadi, Pune.' },
  { slug: 'enchanted-forest', title: 'Enchanted Forest', location: 'Latur', category: 'Project', image: photos.interiors, gallery: [photos.interiors, photos.interiorTwo, photos.studio], description: 'A Cabriolet Arch portfolio project listed at Latur.' },
  { slug: 'sunlit-woods', title: 'Sunlit Woods', location: 'Talegaon Dabhade, Pune', category: 'Project', image: photos.lobby, gallery: [photos.lobby, photos.workplace, photos.facade], description: 'A Cabriolet Arch portfolio project listed at Talegaon Dabhade, Pune.' },
  { slug: 'serene-lake', title: 'Serene Lake', location: 'Wadgaon, Pune', category: 'Project', image: photos.courtyard, gallery: [photos.courtyard, photos.house, photos.residence], description: 'A Cabriolet Arch portfolio project listed at Wadgaon, Pune.' },
  { slug: 'mountain-trail-warehouse', title: 'Mountain Trail', location: 'Ratnagiri (Warehouse)', category: 'Warehouse', image: photos.house, gallery: [photos.house, photos.facade, photos.courtyard], description: 'A warehouse project in Ratnagiri, listed in the Cabriolet Arch portfolio.' },
  { slug: 'mountain-trail-industrial-shed', title: 'Mountain Trail', location: 'Ratnagiri (Industrial shed)', category: 'Industrial shed', image: photos.planning, gallery: [photos.planning, photos.facade, photos.lobby], description: 'An industrial shed project in Ratnagiri, listed in the Cabriolet Arch portfolio.' },
];

const services = [
  { number: '01', title: 'Architectural Consultant', image: photos.studio, copy: 'Expert architectural consulting tailored to each project.', items: ['Residential, commercial and industrial projects', 'Project planning and PMC guidance', 'Design consultation'] },
  { number: '02', title: 'Architectural Design', image: photos.house, copy: 'Innovative, functional and sustainable design for modern living and working spaces.', items: ['Customized architectural designs', 'Residential and commercial design', 'Industrial project design'] },
  { number: '03', title: 'Liaisoning', image: photos.planning, copy: 'Support with building permissions, approvals and regulatory processes across Maharashtra.', items: ['Building permissions', 'Government approvals', 'Environmental clearances', 'Local compliance guidance'] },
  { number: '04', title: 'Feasibility Reports', image: photos.process, copy: 'Comprehensive feasibility reports for a range of project types.', items: ['Project feasibility', 'Planning support', 'Residential, commercial and industrial projects'] },
  { number: '05', title: 'Non-Agricultural Land Conversion', image: photos.courtyard, copy: 'Assistance with non-agricultural land conversion processes.', items: ['NA conversion process support', 'Documentation guidance', 'Approval coordination'] },
  { number: '06', title: 'Government Demarcation', image: photos.facade, copy: 'Government-approved land measurement and demarcation support.', items: ['Land measurement', 'Site demarcation', 'Government coordination'] },
  { number: '07', title: 'MIDC Sanction', image: photos.lobby, copy: 'Guidance through MIDC project approvals and sanctions.', items: ['MIDC sanction processes', 'Project approval coordination', 'Industrial project planning'] },
  { number: '08', title: 'Industrial Warehouse Construction', image: photos.workplace, copy: 'End-to-end construction management for industrial warehouses.', items: ['Planning and execution', 'Quality materials and techniques', 'Safety and timely delivery'] },
  { number: '09', title: 'Processing Plant Construction', image: photos.pavilion, copy: 'Construction support for efficient processing plants from planning to execution.', items: ['Planning and project coordination', 'Construction execution', 'Quality and safety focus'] },
];

const slides = [
  { label: 'Architectural consulting � Pune', lead: 'Ideas into', accent: 'built reality.', copy: 'Architectural consulting and construction shaped around your project.', video: heroVideos[0] },
  { label: 'Planning & approvals � Maharashtra', lead: 'A clear path through', accent: 'project approvals.', copy: 'Liaisoning, feasibility reports and sanction support across project stages.', video: heroVideos[1] },
  { label: 'Industrial construction � India', lead: 'Built with purpose', accent: 'and precision.', copy: 'Warehouses and processing plants planned for safety, quality and timely delivery.', video: heroVideos[2] },
];

const companyHighlights = [
  { title: 'Complete client satisfaction', copy: 'We listen closely, understand project needs and work toward practical solutions.' },
  { title: 'Ethical, transparent service', copy: 'Clear communication and ethical business policies guide our work with clients.' },
  { title: 'End-to-end project support', copy: 'Planning, permissions and construction support come together under one roof.' },
];

const founders = [
  { name: 'Mr. Sumit S. Kuralkar', role: 'Managing Director', image: photos.founderOne, bio: 'A Pune University civil engineering graduate (2015) and architectural consultant. He works across residential, commercial and industrial projects, with 8+ years of experience with Maharashtra State Government appropriate authorities in planning and execution. He also consults on Maharashtra Government and World Bank-supported warehouse and processing-plant projects for Farmer Producer Companies.' },
  { name: 'Mr. Ashok Subhedar', role: 'Architectural Consultant & Liaisoning Officer', image: photos.founderTwo, bio: 'A Pune University graduate (2017), Ashok works across architectural planning, building permissions and liaisoning. His portfolio includes residential, commercial, industrial, warehousing and institutional projects across Maharashtra.' },
  { name: 'Mr. Tushar V. Patil', role: 'Execution Head', image: photos.founderThree, bio: 'A Pune University graduate (2017) with 5+ years in construction, Tushar supports residential, commercial and industrial execution. His experience includes a 35,000 sq. ft. Mega Engineering warehouse, farmhouse projects near Lavasa, high-rise buildings and PMC/PCMC Smart City projects.' },
];

const studioLocations = ['Typical floor, Pune', 'Wadgaon, Pune', 'Mandavgan', 'Amravati', 'Nigdi', 'Purandar', 'Marunji', 'Walhekarwadi', 'Karnataka, India', 'Kalewadi', 'Panchgani, Maharashtra'];
const navItems = [['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Projects', '/projects'], ['Our Studio', '/studio'], ['Careers', '/careers'], ['Contact', '/contact']];
function useReveal(pathname) {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    const scan = (root = document) => {
      if (root.matches?.('[data-reveal]:not(.is-visible)')) observer.observe(root);
      root.querySelectorAll?.('[data-reveal]:not(.is-visible)').forEach((node) => observer.observe(node));
    };
    scan();
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) scan(node);
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [pathname]);
}

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    try { return window.localStorage.getItem('cabriolet-theme') || 'light'; }
    catch { return 'light'; }
  });
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  useReveal(location.pathname);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem('cabriolet-theme', theme); } catch { /* Theme remains available for this session. */ }
  }, [theme]);

  useEffect(() => {
    let frame = 0;
    let leaveTimer;
    let hideTimer;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 120 : 900;
    const startedAt = performance.now();
    setLoaderVisible(true);
    setLoaderLeaving(false);
    setLoaderProgress(0);
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setLoaderProgress(Math.round((1 - Math.pow(1 - progress, 3)) * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else {
        leaveTimer = window.setTimeout(() => {
          setLoaderLeaving(true);
          hideTimer = window.setTimeout(() => setLoaderVisible(false), reducedMotion ? 80 : 480);
        }, reducedMotion ? 0 : 130);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const routeName = location.pathname === '/' ? 'Home' : location.pathname.split('/').filter(Boolean).pop().replaceAll('-', ' ');
    document.title = `${routeName.replace(/\b\w/g, (c) => c.toUpperCase())} | Cabriolet Arch`;
  }, [location.pathname]);

  return <>
    {loaderVisible && <div className={`site-loader ${loaderLeaving ? 'site-loader-leaving' : ''}`} role="status" aria-label={`Loading Cabriolet Arch, ${loaderProgress}%`}>
      <Brand />
      <div className="loader-caption">Architecture � Planning � Construction</div>
      <span className="loader-percent" aria-hidden="true">{String(loaderProgress).padStart(2, '0')}<i>%</i></span>
      <div className="loader-track"><span style={{ transform: `scaleX(${loaderProgress / 100})` }} /></div>
      <span className="loader-index">PUNE � MAHARASHTRA</span>
    </div>}
    <Header theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />
    <main className="site-main" key={location.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/clients" element={<Studio />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <BackToTop />
    <CursorDot />
  </>;
}

function Brand({ light = false }) {
  return <Link className={`brand ${light ? 'brand-light' : ''}`} to="/" aria-label="Cabriolet Arch home">
    <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
    <span className="brand-type"><b>CABRIOLET</b><small>ARCH</small></span>
  </Link>;
}

function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const update = () => setCompact(window.scrollY > 48);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <header className={`site-header ${location.pathname === '/' ? 'site-header-home' : ''} ${compact ? 'is-compact' : ''}`}>
    <div className={`header-shell ${compact ? 'is-compact' : ''}`}>
      <div className="header-meta"><div className="wrap"><span>ARCHITECTURE � PLANNING � CONSTRUCTION</span><span>PUNE � MAHARASHTRA</span></div></div>
      <div className="header-inner wrap">
        <Brand />
        <button className={`menu-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}><span /><span /></button>
        <nav className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
          <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'dark'}><span className="theme-toggle-icon" aria-hidden="true">{theme === 'dark' ? '' : '?'}</span><span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button>
          <Link className="nav-cta" to="/contact">Start a project <span aria-hidden="true">&gt;</span></Link>
        </nav>
      </div>
    </div>
  </header>;
}

function Eyebrow({ children, light = false }) { return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span />{children}</div>; }
function ArrowLink({ to, children, light = false }) { return <Link className={`arrow-link ${light ? 'arrow-link-light' : ''}`} to={to}>{children}<span aria-hidden="true">&gt;</span></Link>; }
function PageIntro({ label, title, copy }) { return <section className="page-intro wrap"><Eyebrow>{label}</Eyebrow><h1>{title}</h1>{copy && <p>{copy}</p>}</section>; }

function CursorDot() {
  const cursorRef = useRef(null);
  const orbitRef = useRef(null);
  const coreRef = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return undefined;
    const body = document.body;
    body.classList.add('has-architect-cursor');
    const move = (event) => {
      const position = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      if (orbitRef.current) orbitRef.current.style.transform = position;
      if (coreRef.current) coreRef.current.style.transform = position;
      cursorRef.current?.classList.add('is-visible');
    };
    const hover = (event) => {
      if (!cursorRef.current || !(event.target instanceof Element)) return;
      cursorRef.current.classList.toggle('is-hovering', Boolean(event.target.closest('a, button, [role="button"], input, textarea, select')));
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', hover);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', hover);
      body.classList.remove('has-architect-cursor');
    };
  }, []);
  return <div className="architect-cursor" ref={cursorRef} aria-hidden="true"><span className="cursor-orbit" ref={orbitRef} /><span className="cursor-core" ref={coreRef} /></div>;
}

function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slotSlides, setSlotSlides] = useState([0, null]);
  const [activeSlot, setActiveSlot] = useState(0);
  const [incomingSlot, setIncomingSlot] = useState(1);
  const [incomingReady, setIncomingReady] = useState(false);
  const videoSlotsRef = useRef([]);
  const heroRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setSlideIndex((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (slideIndex === slotSlides[activeSlot]) return;
    const targetSlot = 1 - activeSlot;
    if (slotSlides[targetSlot] === slideIndex && incomingSlot === targetSlot) return;
    setIncomingSlot(targetSlot);
    setIncomingReady(false);
    setSlotSlides((current) => current.map((value, slot) => slot === targetSlot ? slideIndex : value));
  }, [slideIndex, activeSlot, incomingSlot, slotSlides]);
  useEffect(() => {
    const incoming = videoSlotsRef.current[incomingSlot];
    if (slotSlides[incomingSlot] !== slideIndex || slideIndex === slotSlides[activeSlot] || !incoming) return;
    incoming.load();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) incoming.play().catch(() => {});
  }, [slideIndex, activeSlot, incomingSlot, slotSlides]);
  useEffect(() => {
    videoSlotsRef.current.forEach((video, slot) => {
      if (!video) return;
      const shouldPlay = slot === activeSlot || (incomingReady && slot === incomingSlot);
      if (shouldPlay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => {});
      else if (!shouldPlay) video.pause();
    });
  }, [activeSlot, incomingReady, incomingSlot]);
  useEffect(() => {
    if (!incomingReady) return undefined;
    const timer = window.setTimeout(() => {
      setActiveSlot(incomingSlot);
      setIncomingReady(false);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [incomingReady, incomingSlot]);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const updateParallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const shift = Math.min(Math.max(-hero.getBoundingClientRect().top, 0) * 0.035, 22);
        hero.style.setProperty('--hero-scroll-shift', `${shift}px`);
      });
    };
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
    return () => { window.removeEventListener('scroll', updateParallax); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  const moveSlide = (step) => setSlideIndex((current) => (current + step + slides.length) % slides.length);
  const currentVideoIndex = slotSlides[activeSlot] ?? 0;
  const shownSlideIndex = incomingReady ? slideIndex : currentVideoIndex;
  const slide = slides[shownSlideIndex];
  return <div className="home-page">
    <section className="hero" ref={heroRef}>
      {slotSlides.map((videoIndex, slot) => {
        if (videoIndex === null) return null;
        const isCurrent = slot === activeSlot;
        const isIncoming = slot === incomingSlot && videoIndex === slideIndex && !isCurrent;
        const className = isCurrent ? `hero-video is-current ${incomingReady ? 'is-outgoing' : ''}` : `hero-video ${isIncoming ? (incomingReady ? 'is-active' : 'is-preloading') : ''}`;
        return <video key={`hero-video-slot-${slot}`} ref={(element) => { videoSlotsRef.current[slot] = element; }} className={className} src={slides[videoIndex].video} muted loop playsInline preload={isCurrent || isIncoming ? 'auto' : 'none'} onCanPlay={isIncoming ? () => setIncomingReady(true) : undefined} aria-hidden="true" />;
      })}
      <div className="hero-shade" />
      <div className="hero-inner wrap hero-copy" key={slideIndex}>
        <Eyebrow light>{slide.label}</Eyebrow>
        <div className="hero-title-band"><h1><span>{slide.lead}</span> <em>{slide.accent}</em></h1></div>
        <p>{slide.copy}</p>
        <div className="hero-actions"><Link className="button button-accent" to="/projects">Our portfolio</Link></div>
      </div>
      <div className="hero-note"><span>0{shownSlideIndex + 1} / 0{slides.length}</span><i />Pune-based architecture and design</div>
      <div className="hero-arrows" aria-label="Hero slides"><button type="button" aria-label="Previous slide" onClick={() => moveSlide(-1)}>&lt;</button><button type="button" aria-label="Next slide" onClick={() => moveSlide(1)}>&gt;</button></div>
      <div className="hero-signature"><Brand light /></div>
    </section>
    <div className="hero-indicator-strip"><div className="hero-dots" role="group" aria-label="Choose a hero slide">{slides.map((item, i) => <button key={item.label} type="button" className={i === shownSlideIndex ? 'active' : ''} aria-label={`Show slide ${i + 1}: ${item.label}`} aria-pressed={i === shownSlideIndex} onClick={() => setSlideIndex(i)} />)}</div></div>

    <section className="intro-block wrap section-pad">
      <div className="intro-visual" data-reveal="image"><img src={photos.studio} alt="Contemporary architecture and interior design" loading="lazy" /><span>Architecture � Interior � Pune</span></div>
      <div className="intro-copy" data-reveal="right"><Eyebrow>Welcome to Cabriolet Arch</Eyebrow><h2>Architecture, planning<br />and construction with <em>precision.</em></h2><p>We combine creativity, functionality and precision to turn your vision into reality. Our team works closely with you to create spaces that meet your requirements and exceed expectations.</p><p>From planning through execution, we focus on quality materials, safety, efficiency and timely delivery.</p><ArrowLink to="/about">Discover our approach</ArrowLink></div>
    </section>

    <section className="services-preview section-pad">
      <div className="wrap section-heading" data-reveal><div><Eyebrow>Our capabilities</Eyebrow><h2>What we <em>do.</em></h2></div><ArrowLink to="/services">See all services</ArrowLink></div>
      <div className="service-cards wrap">{services.map((service) => <article className="service-card" key={service.title} data-reveal>
        <Link to="/services" className="service-image" data-reveal="image"><img src={service.image} alt={`${service.title} by Cabriolet Arch`} loading="lazy" /><span className="service-number">{service.number}</span><span className="service-arrow">&gt;</span></Link>
        <div className="service-card-copy"><h3>{service.title}</h3><p>{service.copy}</p></div>
      </article>)}</div>
    </section>

    <section className="process-preview">
      <div className="process-sticky-stage">
        <div className="process-backdrop" style={{ backgroundImage: `url(${photos.process})` }} aria-hidden="true" />
        <div className="process-shade" />
        <div className="wrap process-content"><div className="section-heading"><div><Eyebrow light>From first thought to final detail</Eyebrow><h2>Our <em>process.</em></h2></div></div><ProcessSteps scrollDriven /></div>
      </div>
    </section>

    <section className="projects-preview">
      <div className="wrap section-heading" data-reveal><div><Eyebrow>Project portfolio</Eyebrow><h2>Projects across <em>Maharashtra.</em></h2></div><ArrowLink to="/projects">View all projects</ArrowLink></div>
      <ProjectGrid items={projects.slice(0, 9)} />
    </section>

    <section className="metrics-band section-pad"><div className="wrap"><div className="section-heading" data-reveal><div><Eyebrow>At a glance</Eyebrow><h2>Experience across<br /><em>project types.</em></h2></div><p className="metrics-note">Residential � Commercial � Industrial</p></div><div className="metrics-grid">{[['09', 'Core services'], ['18', 'Portfolio entries'], ['03', 'Leadership profiles'], ['100', 'Clients satisfied']].map(([value, label]) => <div className="metric" key={label} data-reveal><strong>{label === 'Clients satisfied' ? <><CountUp value={100} />+</> : value}</strong><span>{label}</span></div>)}</div></div></section>

    <section className="testimonials"><div className="testimonial-backdrop" style={{ backgroundImage: `url(${photos.workplace})` }} aria-hidden="true" /><div className="testimonial-shade" /><div className="wrap testimonial-content"><div className="section-heading" data-reveal><div><Eyebrow>Our approach</Eyebrow><h2>We listen.<br /><em>We find solutions.</em></h2></div><p>Practical guidance, clear communication and support from the first conversation through project delivery.</p></div><div className="testimonial-grid">{companyHighlights.map((item, i) => <article className="testimonial-card" key={item.title} data-reveal><span className="quote-mark">0{i + 1}</span><p>{item.copy}</p><div><b>{item.title}</b><small>Cabriolet Arch</small></div><span className="testimonial-index">0{i + 1}</span></article>)}</div></div></section>
    <ContactStrip />
  </div>;
}
function ProjectGrid({ items = projects }) {
  return <div className="project-grid">{items.map((project, i) => <Link to={`/projects/${project.slug}`} className={`project-card project-card-${i % 3}`} key={project.slug} data-reveal>
    <div className="project-photo" data-reveal="image"><img src={project.image} alt={project.title} loading="lazy" /><span className="project-open">&gt;</span></div>
    <div className="project-card-info"><div><h3>{project.title}</h3><p>{project.location || 'Selected project'}</p></div><span className="project-year">{project.category}</span></div>
  </Link>)}</div>;
}

function ProcessSteps({ scrollDriven = false }) {
  const steps = [
    ['01', 'Meet & agree', 'We begin with your brief, needs and the realities of the site.'],
    ['02', 'Idea & concept', 'A clear design direction gives every decision a purpose.'],
    ['03', 'Design & create', 'We develop, coordinate and refine the design with you.'],
    ['04', 'Build & install', 'We support delivery and bring the agreed vision to life.'],
  ];
  const [activeStep, setActiveStep] = useState(0);
  const widgetRef = useRef(null);
  useEffect(() => {
    if (!scrollDriven || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const section = widgetRef.current?.closest('.process-preview');
    const stage = section?.querySelector('.process-sticky-stage');
    if (!section || !stage) return undefined;
    let frame = 0;
    const updateStep = () => {
      frame = 0;
      if (!desktop.matches) return;
      const range = Math.max(1, section.offsetHeight - stage.offsetHeight);
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / range));
      const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveStep((current) => current === next ? current : next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateStep);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    desktop.addEventListener?.('change', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      desktop.removeEventListener?.('change', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollDriven]);
  const [number, title, copy] = steps[activeStep];
  const chooseStep = (index) => {
    const desktop = window.matchMedia('(min-width: 1024px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = widgetRef.current?.closest('.process-preview');
    const stage = section?.querySelector('.process-sticky-stage');
    if (scrollDriven && desktop && section && stage) {
      const range = Math.max(1, section.offsetHeight - stage.offsetHeight);
      const target = section.getBoundingClientRect().top + window.scrollY + range * ((index + 0.08) / steps.length);
      window.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }
    setActiveStep(index);
  };
  return <div className="process-widget">
    <div ref={widgetRef} className={`process-step-list ${scrollDriven ? 'is-scroll-driven' : ''}`} role="tablist" aria-label="Our process" style={{ '--process-progress': `${activeStep / (steps.length - 1)}` }}>
      {steps.map(([stepNumber, stepTitle], i) => <button className={`process-step ${activeStep === i ? 'active' : ''}`} type="button" role="tab" aria-selected={activeStep === i} key={stepNumber} onClick={() => chooseStep(i)}>
        <span className="process-step-circle">{stepNumber}</span><span className="process-step-title">{stepTitle}</span>
      </button>)}
    </div>
    <article className="process-detail" key={number} role="tabpanel"><span>{number} / 04</span><h3>{title}</h3><p>{copy}</p></article>
  </div>;
}
function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setCount(value);
      return undefined;
    }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1500;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref}>{new Intl.NumberFormat('en-IN').format(count)}</span>;
}

function About() {
  const [founderIndex, setFounderIndex] = useState(0);
  const [bioOpen, setBioOpen] = useState(false);
  const founder = founders[founderIndex];
  const closeFounderBio = () => setBioOpen(false);
  const selectFounder = (index) => { setFounderIndex(index); setBioOpen(false); };
  const moveFounder = (step) => selectFounder((founderIndex + step + founders.length) % founders.length);

  return <>
    <PageIntro label="About Cabriolet Arch" title={<>Architecture and construction<br /><em>with purpose.</em></>} copy="Cabriolet Arch combines creativity, functionality and precision across architectural consulting, planning and construction. The team works closely with clients to turn their vision into practical, lasting projects." />
    <section className="about-hero wrap" data-reveal><img src={photos.studio} alt="Architecture and construction work by Cabriolet Arch" /><div className="about-hero-note"><b>CA</b><span>Creativity.<br />Function.<br />Precision.</span></div></section>
    <section className="about-story wrap section-pad"><div className="story-aside" data-reveal><Eyebrow>Based in Pune</Eyebrow><span className="story-big">Pune</span><p>Architectural consulting and construction services from planning through execution.</p></div><div className="story-main" data-reveal><h2>From vision to <em>built reality.</em></h2><p>Cabriolet Arch develops user-friendly spaces with aesthetic clarity, robust engineering and a focus on sustainability.</p><p>Construction projects are managed from planning to execution, using quality materials and advanced techniques with attention to safety, efficiency and timely delivery.</p></div></section>
    <section className="vision-mission wrap"><article data-reveal><Eyebrow>Our vision</Eyebrow><h2>Long-term value<br /><em>for everyone.</em></h2><p>We create thoughtful homes and built environments that respond to the people who use them and the places they occupy.</p></article><article data-reveal><Eyebrow>Our mission</Eyebrow><h2>Make your vision<br /><em>work in practice.</em></h2><p>We deliver designs and construction that meet each client's requirements through creativity, functionality, precision and reliable execution.</p></article></section>
    <section className="values-band"><div className="wrap"><div className="section-heading" data-reveal><div><Eyebrow light>Our specialities</Eyebrow><h2>Service built on<br /><em>trust and clarity.</em></h2></div></div><div className="values-grid">{[['Client satisfaction', 'We listen, understand and work toward practical solutions.'], ['Ethical business', 'We follow ethical business policies and clear communication.'], ['Affordable pricing', 'We aim to keep project support practical and accessible.'], ['Stay connected', 'We keep in touch with customers throughout the work.'], ['Happy clients', 'We work toward a positive, reliable client experience.']].map(([title, copy], i) => <article key={title} data-reveal><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="differentiators wrap section-pad"><div className="section-heading" data-reveal><div><Eyebrow>Why choose us</Eyebrow><h2>Experience, quality<br /><em>and one-roof support.</em></h2></div></div><div className="differentiator-grid">{[['01', 'Experienced team', 'Engineers and architects support projects across multiple sectors.'], ['02', 'One-roof solution', 'Architectural design, planning, PMC and construction support work together.'], ['03', 'Current technology', 'The team focuses on quality, modern techniques and timely work.']].map(([n, title, copy]) => <article key={n} data-reveal><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="founders">
      <div className="wrap"><div className="section-heading" data-reveal><div><Eyebrow>Meet our team</Eyebrow><h2>Consulting, leadership<br /><em>and execution.</em></h2></div><p>Meet the people leading design, liaisoning and project delivery.</p></div></div>
      <div className="founder-stage">
        <div className="founder-backdrop" style={{ backgroundImage: 'url(' + photos.planning + ')' }} aria-hidden="true" />
        <div className="founder-stage-shade" aria-hidden="true" />
        <div className="founder-feature wrap">
          <article className={'founder-card ' + (bioOpen ? 'is-open' : '')} onMouseEnter={() => setBioOpen(true)} onMouseLeave={closeFounderBio}>
            <div className="founder-face founder-front" aria-hidden={bioOpen}>
              <img key={founder.image} src={founder.image} alt={'Portrait of ' + founder.name} loading="lazy" />
              <span className="founder-image-index">0{founderIndex + 1} <i>/ 0{founders.length}</i></span>
              <div className="founder-nameplate"><span>{founder.role}</span><h3>{founder.name}</h3></div>
              <button className="founder-reveal-toggle" type="button" tabIndex={bioOpen ? -1 : 0} onClick={() => setBioOpen(true)} aria-label={'Read ' + founder.name + ' profile'}>Read profile <span aria-hidden="true">+</span></button>
            </div>
            <div className="founder-face founder-back" aria-hidden={!bioOpen}>
              <span className="founder-role">{founder.role}</span><h3>{founder.name}</h3><p>{founder.bio}</p>
              <span className="founder-profile-rule" /><button className="founder-back-link" type="button" tabIndex={bioOpen ? 0 : -1} onClick={closeFounderBio}>Back to portrait</button>
            </div>
          </article>
          <div className="founder-controls" role="group" aria-label="Team profiles">
            <button className="founder-control-arrow" type="button" aria-label="Previous team member" onClick={() => moveFounder(-1)}><span aria-hidden="true">&lt;</span></button>
            <div>{founders.map((item, i) => <button type="button" key={item.name} aria-label={'Show ' + item.name} aria-pressed={founderIndex === i} className={founderIndex === i ? 'active' : ''} onClick={() => selectFounder(i)}>{String(i + 1).padStart(2, '0')}</button>)}</div>
            <button className="founder-control-arrow" type="button" aria-label="Next team member" onClick={() => moveFounder(1)}><span aria-hidden="true">&gt;</span></button>
          </div>
        </div>
      </div>
    </section>
    <ContactStrip />
  </>;
}
function ServicesPage() {
  return <>
    <PageIntro label="Our services" title={<>Ideas into<br /><em>places that work.</em></>} copy="From urban-scale thinking to the last interior detail, our services bring design and delivery together." />
    <section className="service-detail-list wrap">{services.map((service, i) => <article className={`service-detail ${i % 2 ? 'service-detail-reverse' : ''}`} key={service.title} data-reveal>
      <div className="service-detail-image"><img src={service.image} alt={service.title} loading="lazy" /><span>{service.number}</span></div>
      <div className="service-detail-copy"><Eyebrow>Service {service.number}</Eyebrow><h2>{service.title}</h2><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><ArrowLink to="/contact">Discuss this service</ArrowLink></div>
    </article>)}</section>
    <section className="turnkey-band"><div className="wrap turnkey-inner" data-reveal><Eyebrow light>End-to-end support</Eyebrow><h2>From a clear brief<br />to a <em>finished space.</em></h2><p>Project coordination, contractor coordination, quality review, furniture fit-outs and styling can be brought together as a turnkey solution.</p><Link className="button button-white" to="/contact">Get in touch <span>&gt;</span></Link></div></section>
    <section className="process-preview section-pad wrap"><div className="section-heading" data-reveal><div><Eyebrow>How we work</Eyebrow><h2>Good work is<br /><em>built together.</em></h2></div></div><ProcessSteps /></section>
    <ContactStrip />
  </>;
}

function ProjectsPage() {
  const [filter, setFilter] = useState('All work');
  const filters = ['All work', 'Warehouse', 'Industrial shed'];
  const visible = filter === 'All work' ? projects : projects.filter((project) => project.category.toLowerCase() === filter.toLowerCase());
  return <>
    <PageIntro label="Project portfolio" title={<>Projects across<br /><em>regions and sectors.</em></>} copy="Explore selected residential, commercial, industrial and warehouse projects from the Cabriolet Arch portfolio." />
    <section className="wrap projects-page section-pad-top"><div className="project-filter" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item} className={filter === item ? 'filter-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><ProjectGrid items={visible} /></section>
    <ContactStrip />
  </>;
}

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const gallery = project.gallery;
  return <section className="project-detail wrap section-pad-top">
    <button className="back-link" onClick={() => navigate('/projects')}>Back to projects</button>
    <div className="project-window-image">
      <img src={gallery[0]} alt={project.title} />
      <span className="project-window-label">{project.location ? `${project.category} � ${project.location}` : project.category}</span>
      <span className="project-window-index">Portfolio</span>
    </div>
    <div className="project-detail-head"><div data-reveal="left"><Eyebrow>Portfolio project</Eyebrow><h1>{project.title}</h1></div><div className="project-facts" data-reveal="right">{project.year && <Fact label="Year" value={project.year} />}{project.location && <Fact label="Location" value={project.location} />}{project.client && <Fact label="Client" value={project.client} />}{project.category && <Fact label="Category" value={project.category} />}</div></div>
    <p className="project-description" data-reveal>{project.description}</p><div className="project-gallery">{gallery.slice(1).map((image, i) => <div key={image} className={`gallery-frame ${i === 0 ? 'gallery-lead' : ''}`} data-reveal="image"><img src={image} alt={`${project.title} - view ${i + 2}`} loading={i > 0 ? 'lazy' : 'eager'} /></div>)}</div>
    <div className="project-detail-cta"><Eyebrow>Have a project in mind?</Eyebrow><h2>Let's make room for<br /><em>what's next.</em></h2><Link className="button button-accent" to="/contact">Start a conversation <span>&gt;</span></Link></div>
  </section>;
}
function Fact({ label, value }) { return <div className="fact"><span>{label}</span><b>{value}</b></div>; }

function Studio() {
  return <>
    <PageIntro label="Where we work" title={<>A practice based<br /><em>in Maharashtra.</em></>} copy="Based in Pune, Cabriolet Arch works across Maharashtra and beyond on residential, commercial, industrial and public building projects." />
    <section className="client-showcase wrap section-pad-top"><div className="client-grid">{studioLocations.map((location, i) => <div className="client-tile" key={location} data-reveal><span>{String(i + 1).padStart(2, '0')}</span><b>{location}</b><i aria-hidden="true">&gt;</i></div>)}</div><p className="client-note">Project locations shown in the portfolio include Maharashtra and Karnataka.</p></section>
    <ContactStrip />
  </>;
}

function Careers() {
  return <>
    <PageIntro label="Careers" title={<>Build what<br /><em>comes next.</em></>} copy="We are a growing architectural and construction firm based in Pune, delivering end-to-end solutions across residential, commercial and industrial projects. If you are passionate about design, engineering or real estate, we'd love to hear from you." />
    <section className="client-showcase wrap section-pad-top"><div className="contact-details" data-reveal><Eyebrow>Work with us</Eyebrow><h2>Interested in joining<br /><em>the team?</em></h2><p>Share a little about your experience and the kind of work you care about. Our team will be glad to hear from you.</p><a className="button button-accent" href="mailto:info@psinnovativecreation.com?subject=Career%20enquiry">Email your profile <span aria-hidden="true">&gt;</span></a></div></section>
    <ContactStrip />
  </>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry - ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nProject type: ${data.get('projectType')}\n\n${data.get('message')}`);
    window.location.href = `mailto:info@psinnovativecreation.com?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return <>
    <PageIntro label="Contact" title={<>Let's talk about<br /><em>your next space.</em></>} copy="Contact our Pune studio to discuss architectural consulting, planning, approvals or construction." />
    <section className="contact-layout wrap section-pad-top">
      <div className="contact-details" data-reveal><Eyebrow>Visit or call the studio</Eyebrow><h2>Good conversations<br />start <em>somewhere.</em></h2><div className="contact-item"><span>Studio</span><p>Shop No. 101, Probo Prolix Pride,<br />Commercial Complex, Shindevasti,<br />Ravet, Pimpri-Chinchwad,<br />Pune 411044</p></div><div className="contact-item"><span>Phone</span><p><a href="tel:+918087674246">+91 80876 74246</a><br /><a href="tel:+919932863111">+91 99328 63111</a></p></div><div className="contact-item"><span>Email</span><p><a href="mailto:info@psinnovativecreation.com">info@psinnovativecreation.com</a></p></div><a className="map-link" href="https://maps.google.com/?q=Shop+No.+101+Probo+Prolix+Pride+Ravet+Pune+411044" target="_blank" rel="noreferrer">Open map <span aria-hidden="true">&gt;</span></a></div>
      <form className="contact-form" onSubmit={submit} data-reveal><Eyebrow>Start a project</Eyebrow><h2>Tell us a little<br /><em>about it.</em></h2><label>Your name<input name="name" placeholder="Name" required /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label><div className="form-row"><label>Phone (optional)<input name="phone" type="tel" placeholder="+91" /></label><label>Project type<select name="projectType" defaultValue="Architecture"><option>Architecture</option><option>Urban planning</option><option>Interior design</option><option>Turnkey project</option><option>Other</option></select></label></div><label>What are you planning?<textarea name="message" rows="4" placeholder="A little about the place, timeline or idea." required /></label><button className="button button-accent" type="submit">{sent ? 'Opening your email app' : 'Send enquiry'} <span>?</span></button><p className="form-note">Your email app will open with the enquiry addressed to our studio.</p></form>
    </section>
    <div className="contact-map wrap"><iframe title="Cabriolet Arch studio location" src="https://www.google.com/maps?q=Probo%20Prolix%20Pride%2C%20Ravet%2C%20Pune%20411044&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
  </>;
}

function ContactStrip() { return <section className="contact-strip"><div className="wrap contact-strip-inner" data-reveal><div><Eyebrow light>Have a place in mind?</Eyebrow><h2>Let's make it<br /><em>mean something.</em></h2></div><Link className="button button-white" to="/contact">Start a conversation <span>&gt;</span></Link></div></section>; }

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 560);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <button className={`back-to-top ${visible ? 'is-visible' : ''}`} type="button" aria-label="Back to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}></button>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-main"><div className="footer-brand"><Brand light /><p>Architectural consulting, planning and construction with practical solutions.</p></div><div className="footer-nav"><span>Explore</span>{navItems.slice(1).map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</div><div className="footer-contact"><span>Find the studio</span><p>Shop No. 101, Probo Prolix Pride, Commercial Complex, Shindevasti, Ravet, Pimpri-Chinchwad, Pune 411044</p><a href="tel:+918087674246">+91 80876 74246</a><a href="tel:+919932863111">+91 99328 63111</a><a href="mailto:info@psinnovativecreation.com">info@psinnovativecreation.com</a></div><div className="footer-note"><span>We listen � We understand � We provide solutions.</span><Link to="/contact">Talk to us <b>&gt;</b></Link></div></div><div className="wrap footer-bottom"><span>Copyright {new Date().getFullYear()} Cabriolet Arch</span><span>Made for people and place.</span><span className="footer-credit">Developed &amp; Maintained By <strong>REDCYBERFOX LLP</strong></span><Link to="/">Back to top</Link></div></footer>;
}

function NotFound() { return <section className="not-found wrap"><Eyebrow>Page not found</Eyebrow><h1>That space<br /><em>doesn't exist.</em></h1><Link className="button button-accent" to="/">Return home <span>&gt;</span></Link></section>; }

export default App;

