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
  founderOne: photo('photo-1500648767791-00dcc994a43e', 900),
  founderTwo: photo('photo-1544005313-94ddf0286df2', 900),
  founderThree: photo('photo-1560250097-0b93528c311a', 900),
};

const projects = [
  { slug: 'aranya-house', title: 'Aranya House', year: '2024', location: 'Baner, Pune', client: 'Private home owners', category: 'Residential', image: photos.house, gallery: [photos.house, photos.courtyard, photos.facade], description: 'A warm, light-filled family home shaped around a shaded courtyard and the rhythm of everyday life.' },
  { slug: 'the-canopy', title: 'The Canopy', year: '2023', location: 'Hinjawadi, Pune', client: 'Sample workplace team', category: 'Commercial', image: photos.workplace, gallery: [photos.workplace, photos.interiors, photos.lobby], description: 'A flexible workplace concept that brings daylight, planting and shared spaces into the centre of the floor plan.' },
  { slug: 'serein-courtyard', title: 'Serein Courtyard', year: '2022', location: 'Kalyani Nagar, Pune', client: 'Sample residential partner', category: 'Residential', image: photos.courtyard, gallery: [photos.courtyard, photos.residence, photos.house], description: 'A residential concept organised around a quiet green court, with clear transitions between private and shared life.' },
  { slug: 'riverline-residences', title: 'Riverline Residences', year: '2024', location: 'Mundhwa, Pune', client: 'Sample residential partner', category: 'Residential', image: photos.residence, gallery: [photos.residence, photos.house, photos.facade], description: 'A contemporary housing study focused on simple forms, useful balconies and a generous arrival sequence.' },
  { slug: 'nila-house', title: 'Nila House', year: '2023', location: 'Koregaon Park, Pune', client: 'Private home owners', category: 'Interiors', image: photos.interiors, gallery: [photos.interiors, photos.interiorTwo, photos.studio], description: 'A calm interior palette of natural texture, soft light and carefully resolved storage.' },
  { slug: 'atria-commons', title: 'Atria Commons', year: '2021', location: 'Wakad, Pune', client: 'Sample mixed-use partner', category: 'Commercial', image: photos.lobby, gallery: [photos.lobby, photos.workplace, photos.facade], description: 'A mixed-use concept bringing work, retail and everyday gathering into one legible public edge.' },
  { slug: 'pashan-pavilion', title: 'Pashan Pavilion', year: '2025', location: 'Pashan, Pune', client: 'Sample community group', category: 'Civic', image: photos.pavilion, gallery: [photos.pavilion, photos.courtyard, photos.planning], description: 'A small civic pavilion concept designed for shade, informal meetings and neighbourhood activity.' },
  { slug: 'blue-courtyard', title: 'Blue Courtyard', year: '2022', location: 'Bavdhan, Pune', client: 'Private home owners', category: 'Interiors', image: photos.interiorTwo, gallery: [photos.interiorTwo, photos.interiors, photos.studio], description: 'An interior refresh that uses colour sparingly and makes the shared living spaces more flexible.' },
  { slug: 'hillview-house', title: 'Hillview House', year: '2020', location: 'Aundh, Pune', client: 'Private home owners', category: 'Residential', image: photos.facade, gallery: [photos.facade, photos.house, photos.residence], description: 'A compact home concept tuned to its site, with filtered daylight and a protected outdoor room.' },
  { slug: 'cobalt-house', title: 'Cobalt House', year: '2025', location: 'Shivajinagar, Pune', client: 'Sample home owners', category: 'Residential', image: photos.studio, gallery: [photos.studio, photos.house, photos.courtyard], description: 'A sample home study that pairs a compact footprint with flexible family spaces and a sheltered terrace.' },
  { slug: 'grove-edge', title: 'Grove Edge', year: '2024', location: 'Kharadi, Pune', client: 'Sample development partner', category: 'Commercial', image: photos.workplace, gallery: [photos.workplace, photos.facade, photos.lobby], description: 'A workplace concept balancing focused work zones with informal places to meet and reset.' },
  { slug: 'saffron-pavilion', title: 'Saffron Pavilion', year: '2023', location: 'Pashan, Pune', client: 'Sample community group', category: 'Civic', image: photos.pavilion, gallery: [photos.pavilion, photos.planning, photos.courtyard], description: 'A small public-use pavilion concept for shade, accessible circulation and neighbourhood gatherings.' },
  { slug: 'passage-house', title: 'Passage House', year: '2022', location: 'Magarpatta, Pune', client: 'Sample home owners', category: 'Residential', image: photos.residence, gallery: [photos.residence, photos.house, photos.facade], description: 'A sample residential design organised around a light-filled central passage and shared family spaces.' },
  { slug: 'dune-studio', title: 'Dune Studio', year: '2021', location: 'Viman Nagar, Pune', client: 'Sample studio team', category: 'Interiors', image: photos.interiors, gallery: [photos.interiors, photos.interiorTwo, photos.studio], description: 'A compact studio interior using warm textures and adaptable furniture to make a small footprint work.' },
  { slug: 'westline-office', title: 'Westline Office', year: '2020', location: 'Baner, Pune', client: 'Sample workplace team', category: 'Commercial', image: photos.lobby, gallery: [photos.lobby, photos.workplace, photos.facade], description: 'An office concept with a legible arrival, shared project tables and quieter rooms for focused work.' },
  { slug: 'courtyard-six', title: 'Courtyard Six', year: '2025', location: 'Aundh, Pune', client: 'Sample home owners', category: 'Residential', image: photos.courtyard, gallery: [photos.courtyard, photos.house, photos.residence], description: 'A sample home concept where a planted courtyard brings daylight and a softer centre into the plan.' },
  { slug: 'tattva-residence', title: 'Tattva Residence', year: '2023', location: 'Kothrud, Pune', client: 'Sample home owners', category: 'Residential', image: photos.house, gallery: [photos.house, photos.facade, photos.courtyard], description: 'A residential concept shaped around calm material choices, shaded openings and useful everyday storage.' },
  { slug: 'alto-market', title: 'Alto Market', year: '2022', location: 'Wakad, Pune', client: 'Sample retail partner', category: 'Commercial', image: photos.planning, gallery: [photos.planning, photos.facade, photos.lobby], description: 'A mixed retail and community concept with clear pedestrian routes and inviting edges to the street.' },
];

const services = [
  { number: '01', title: 'Urban planning', image: photos.planning, copy: 'Thoughtful frameworks for places, neighbourhoods and communities.', items: ['Project feasibility', 'Due diligence', 'Master planning', 'Urban design & site development'] },
  { number: '02', title: 'Architecture', image: photos.house, copy: 'A clear design process from first concept through coordination and delivery.', items: ['Site analysis', 'Conceptual planning', 'Design development', 'Technical coordination'] },
  { number: '03', title: 'Interior design', image: photos.interiors, copy: 'Useful, expressive interiors, planned around the people who use them.', items: ['Space planning', 'Specifications & estimation', 'Fit-outs', 'Furnishing & styling'] },
];

const slides = [
  { label: 'Architecture · Pune', lead: 'Thoughtful architecture for', accent: 'everyday life.', copy: 'Places shaped by their setting and the people who use them.', video: heroVideos[0] },
  { label: 'Interior design · Pune', lead: 'Creating spaces for', accent: 'people.', copy: 'Considered materials, natural light and details made for everyday life.', video: heroVideos[1] },
  { label: 'Urban planning · Pune', lead: 'Designing a better', accent: 'everyday.', copy: 'Thoughtful planning for neighbourhoods, communities and shared life.', video: heroVideos[2] },
];

const sampleClients = ['Aster Habitat', 'Northline Works', 'House of Form', 'Civic Commons', 'Field & Frame', 'Morrow Living', 'Saffron Build', 'CommonGround', 'Mira Habitat', 'Aerial Works', 'Studio Nook', 'Pine & Stone'];
const sampleTestimonials = [
  { quote: 'The process felt clear from the first conversation. The team listened carefully and turned our needs into a home that feels like us.', name: 'Sample residential client', detail: 'Private home, Pune' },
  { quote: 'We appreciated how design choices were explained, coordinated and carried through to the final details.', name: 'Sample workplace client', detail: 'Workplace project, Pune' },
  { quote: 'A thoughtful and collaborative team. The finished spaces feel calm, useful and connected to their setting.', name: 'Sample development partner', detail: 'Residential project, Pune' },
];

const sampleFounders = [
  { name: 'Aarav Mehta', role: 'Co-founder · Architecture', image: photos.founderOne, bio: 'Shapes considered architectural concepts around site, light and the everyday needs of the people who use them.' },
  { name: 'Anaya Kulkarni', role: 'Co-founder · Urban Planning', image: photos.founderTwo, bio: 'Connects neighbourhood-scale thinking with practical planning and a clear, collaborative design process.' },
  { name: 'Kabir Shah', role: 'Co-founder · Interior Design', image: photos.founderThree, bio: 'Brings materials, detail and spatial experience together to make welcoming interiors that work beautifully.' },
];

const navItems = [['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Projects', '/projects'], ['Clients', '/clients'], ['Contact', '/contact']];

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
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  useReveal(location.pathname);

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
      <div className="loader-caption">Spaces with a point of view</div>
      <span className="loader-percent" aria-hidden="true">{String(loaderProgress).padStart(2, '0')}<i>%</i></span>
      <div className="loader-track"><span style={{ transform: `scaleX(${loaderProgress / 100})` }} /></div>
      <span className="loader-index">PUNE · INDIA</span>
    </div>}
    <Header />
    <main className="site-main" key={location.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/clients" element={<Clients />} />
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

function Header() {
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
      <div className="header-meta"><div className="wrap"><span>Architecture · Planning · Interiors</span><span>Pune · Maharashtra</span></div></div>
      <div className="header-inner wrap">
        <Brand />
        <button className={`menu-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}><span /><span /></button>
        <nav className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
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
      <div className="hero-arrows" aria-label="Hero slides"><button type="button" aria-label="Previous slide" onClick={() => moveSlide(-1)}>‹</button><button type="button" aria-label="Next slide" onClick={() => moveSlide(1)}>›</button></div>
      <div className="hero-signature"><Brand light /></div>
    </section>
    <div className="hero-indicator-strip"><div className="hero-dots" role="group" aria-label="Choose a hero slide">{slides.map((item, i) => <button key={item.label} type="button" className={i === shownSlideIndex ? 'active' : ''} aria-label={`Show slide ${i + 1}: ${item.label}`} aria-pressed={i === shownSlideIndex} onClick={() => setSlideIndex(i)} />)}</div></div>

    <section className="intro-block wrap section-pad">
      <div className="intro-visual" data-reveal="image"><img src={photos.studio} alt="Contemporary architecture and interior design" loading="lazy" /><span>Architecture · Interior · Pune</span></div>
      <div className="intro-copy" data-reveal="right"><Eyebrow>Welcome to Cabriolet Arch</Eyebrow><h2>Good architecture begins with <em>listening.</em></h2><p>Cabriolet Arch is a Pune-based practice bringing people, place and purpose into the same conversation. We create thoughtful spaces that feel distinct, work beautifully and belong to their context.</p><p>Our design process looks beyond the obvious to create lasting places with a clear sense of identity.</p><ArrowLink to="/about">Discover our approach</ArrowLink></div>
    </section>

    <section className="services-preview section-pad">
      <div className="wrap section-heading" data-reveal><div><Eyebrow>Our capabilities</Eyebrow><h2>What we <em>do.</em></h2></div><ArrowLink to="/services">See all services</ArrowLink></div>
      <div className="service-cards wrap">{services.map((service) => <article className="service-card" key={service.title} data-reveal>
        <Link to="/services" className="service-image" data-reveal="image"><img src={service.image} alt={`${service.title} by Cabriolet Arch`} loading="lazy" /><span className="service-number">{service.number}</span><span className="service-arrow">›</span></Link>
        <div className="service-card-copy"><h3>{service.title}</h3><p>{service.copy}</p></div>
      </article>)}</div>
    </section>

    <section className="process-preview" data-reveal="scale">
      <div className="process-backdrop" style={{ backgroundImage: `url(${photos.process})` }} aria-hidden="true" />
      <div className="process-shade" />
      <div className="wrap process-content"><div className="section-heading" data-reveal><div><Eyebrow light>From first thought to final detail</Eyebrow><h2>Our <em>process.</em></h2></div></div><ProcessSteps /></div>
    </section>

    <section className="projects-preview">
      <div className="wrap section-heading" data-reveal><div><Eyebrow>Selected sample work</Eyebrow><h2>All <em>projects.</em></h2></div><ArrowLink to="/projects">View all projects</ArrowLink></div>
      <ProjectGrid items={projects.slice(0, 9)} />
    </section>

    <section className="metrics-band section-pad"><div className="wrap"><div className="section-heading" data-reveal><div><Eyebrow>At a glance</Eyebrow><h2>Built around<br /><em>possibility.</em></h2></div><p className="metrics-note">Illustrative demo figures.</p></div><div className="metrics-grid">{[['32', 'Projects'], ['42,000', 'Sq. m. designed'], ['12', 'Years of practice'], ['54', 'Client partnerships']].map(([value, label]) => <div className="metric" key={label} data-reveal><strong><CountUp value={Number(value.replace(',', ''))} />{label === 'Years of practice' ? '+' : ''}</strong><span>{label}</span></div>)}</div></div></section>

    <section className="testimonials"><div className="testimonial-backdrop" style={{ backgroundImage: `url(${photos.workplace})` }} aria-hidden="true" /><div className="testimonial-shade" /><div className="wrap testimonial-content"><div className="section-heading" data-reveal><div><Eyebrow>Client reflections</Eyebrow><h2>Good work is<br /><em>remembered.</em></h2></div><p>Illustrative testimonials for this demo.</p></div><div className="testimonial-grid">{sampleTestimonials.map((item, i) => <article className="testimonial-card" key={item.name} data-reveal><span className="quote-mark">“</span><p>{item.quote}</p><div><b>{item.name}</b><small>{item.detail}</small></div><span className="testimonial-index">0{i + 1}</span></article>)}</div></div></section>
    <ContactStrip />
  </div>;
}
function ProjectGrid({ items = projects }) {
  return <div className="project-grid">{items.map((project, i) => <Link to={`/projects/${project.slug}`} className={`project-card project-card-${i % 3}`} key={project.slug} data-reveal>
    <div className="project-photo" data-reveal="image"><img src={project.image} alt={project.title} loading="lazy" /><span className="project-open">&gt;</span></div>
    <div className="project-card-info"><div><h3>{project.title}</h3><p>{project.location || 'Selected project'}</p></div><span className="project-year">{project.year || 'CA'}</span></div>
  </Link>)}</div>;
}

function ProcessSteps() {
  const steps = [
    ['01', 'Meet & agree', 'We begin with your brief, needs and the realities of the site.'],
    ['02', 'Idea & concept', 'A clear design direction gives every decision a purpose.'],
    ['03', 'Design & create', 'We develop, coordinate and refine the design with you.'],
    ['04', 'Build & install', 'We support delivery and bring the agreed vision to life.'],
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [number, title, copy] = steps[activeStep];
  return <div className="process-widget">
    <div className="process-step-list" role="tablist" aria-label="Our process">
      {steps.map(([stepNumber, stepTitle], i) => <button className={`process-step ${activeStep === i ? 'active' : ''}`} type="button" role="tab" aria-selected={activeStep === i} key={stepNumber} onClick={() => setActiveStep(i)}>
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
  const founder = sampleFounders[founderIndex];
  const closeFounderBio = () => setBioOpen(false);
  const selectFounder = (index) => {
    setFounderIndex(index);
    setBioOpen(false);
  };
  const moveFounder = (step) => selectFounder((founderIndex + step + sampleFounders.length) % sampleFounders.length);

  return <>
    <PageIntro label="A little about us" title={<>Spaces with<br /><em>a human point of view.</em></>} copy="We are a Pune-based architecture, urban planning and interior design practice, creating places that are useful, expressive and connected to the people who inhabit them." />
    <section className="about-hero wrap" data-reveal><img src={photos.studio} alt="Architecture and design project by Cabriolet Arch" /><div className="about-hero-note"><b>CA</b><span>Place.<br />People.<br />Possibility.</span></div></section>
    <section className="about-story wrap section-pad"><div className="story-aside" data-reveal><Eyebrow>Based in Pune</Eyebrow><span className="story-big">Pune</span><p>A practice built around thoughtful design and practical delivery.</p></div><div className="story-main" data-reveal><h2>We look beyond the obvious to create spaces that <em>feel like they belong.</em></h2><p>Based in Pune, our practice brings design and delivery together across residential, commercial and public settings.</p><p>Our approach brings creative thinking together with pragmatic planning, clear communication and close coordination from concept through execution.</p></div></section>
    <section className="vision-mission wrap"><article data-reveal><Eyebrow>Our vision</Eyebrow><h2>Better places for<br /><em>everyday life.</em></h2><p>We imagine a built environment where spaces feel welcoming, work well and respond thoughtfully to their surroundings.</p></article><article data-reveal><Eyebrow>Our mission</Eyebrow><h2>Creative thinking.<br /><em>Practical delivery.</em></h2><p>We bring clients and collaborators together around clear briefs, considered design choices and a steady project process.</p></article></section>
    <section className="values-band"><div className="wrap"><div className="section-heading" data-reveal><div><Eyebrow light>What guides us</Eyebrow><h2>Principles that shape<br /><em>every project.</em></h2></div></div><div className="values-grid">{[['People first', 'Listen closely. Design around the people who will use the space.'], ['Purposeful creativity', 'Find an expressive answer that still works in the real world.'], ['Thoughtful delivery', 'Make decisions visible and keep the project moving together.'], ['Responsible design', 'Consider energy, context and the value of every square metre.']].map(([title, copy], i) => <div className="value-card" key={title} data-reveal><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
    <section className="differentiators wrap section-pad"><div className="section-heading" data-reveal><div><Eyebrow>Key differentiators</Eyebrow><h2>Clear thinking,<br /><em>careful follow-through.</em></h2></div></div><div className="differentiator-grid">{[['01', 'One connected team', 'Planning, architecture and interiors stay connected around the brief.'], ['02', 'Delivery-minded design', 'Creative ideas are developed with practical coordination in mind.'], ['03', 'A process that adapts', "The team and level of detail respond to each project's needs."]].map(([n, title, copy]) => <article key={n} data-reveal><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="founders">
      <div className="wrap"><div className="section-heading" data-reveal><div><Eyebrow>Illustrative founding team</Eyebrow><h2>Good spaces begin<br /><em>with good people.</em></h2></div><p>Meet three sample profiles, shown one at a time.</p></div></div>
      <div className="founder-stage" data-reveal="scale">
        <div className="founder-backdrop" style={{ backgroundImage: `url(${photos.planning})` }} aria-hidden="true" />
        <div className="founder-stage-shade" aria-hidden="true" />
        <div className="founder-feature wrap">
          <article className={`founder-card ${bioOpen ? 'is-open' : ''}`} onMouseEnter={() => setBioOpen(true)} onMouseLeave={closeFounderBio}>
            <div className="founder-face founder-front" aria-hidden={bioOpen}>
              <img key={founder.image} src={founder.image} alt={`Illustrative sample portrait for ${founder.name}`} loading="lazy" />
              <span className="founder-image-index">0{founderIndex + 1} <i>/ 0{sampleFounders.length}</i></span>
              <div className="founder-nameplate"><span>{founder.role}</span><h3>{founder.name}</h3></div>
              <button className="founder-reveal-toggle" type="button" tabIndex={bioOpen ? -1 : 0} onClick={() => setBioOpen(true)} aria-label={`Read ${founder.name}'s profile`}>Read profile <span aria-hidden="true">+</span></button>
            </div>
            <div className="founder-face founder-back" aria-hidden={!bioOpen}>
              <span className="founder-role">{founder.role}</span>
              <h3>{founder.name}</h3>
              <p>{founder.bio}</p>
              <span className="founder-profile-rule" />
              <button className="founder-back-link" type="button" tabIndex={bioOpen ? 0 : -1} onClick={closeFounderBio}>Back to portrait</button>
            </div>
          </article>
          <div className="founder-controls" role="group" aria-label="Founder profiles">
            <button className="founder-control-arrow" type="button" aria-label="Previous founder" onClick={() => moveFounder(-1)}><span aria-hidden="true">‹</span></button>
            <div>{sampleFounders.map((item, i) => <button type="button" key={item.name} aria-label={`Show ${item.name}`} aria-pressed={founderIndex === i} className={founderIndex === i ? 'active' : ''} onClick={() => selectFounder(i)}>{String(i + 1).padStart(2, '0')}</button>)}</div>
            <button className="founder-control-arrow" type="button" aria-label="Next founder" onClick={() => moveFounder(1)}><span aria-hidden="true">›</span></button>
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
  const filters = ['All work', 'Residential', 'Commercial', 'Interiors', 'Civic'];
  const visible = filter === 'All work' ? projects : projects.filter((project) => project.category.toLowerCase() === filter.toLowerCase());
  return <>
    <PageIntro label="Selected projects" title={<>Spaces with<br /><em>something to say.</em></>} copy="Illustrative sample projects set in Pune. Replace project names, dates and images with approved portfolio content." />
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
      <span className="project-window-label">{project.category} · {project.location}</span>
      <span className="project-window-index">{project.year}</span>
    </div>
    <div className="project-detail-head"><div data-reveal="left"><Eyebrow>Illustrative sample project</Eyebrow><h1>{project.title}</h1></div><div className="project-facts" data-reveal="right">{project.year && <Fact label="Year" value={project.year} />}{project.location && <Fact label="Location" value={project.location} />}{project.client && <Fact label="Client" value={project.client} />}{project.category && <Fact label="Category" value={project.category} />}</div></div>
    <p className="project-description" data-reveal>{project.description}</p><div className="project-gallery">{gallery.slice(1).map((image, i) => <div key={image} className={`gallery-frame ${i === 0 ? 'gallery-lead' : ''}`} data-reveal="image"><img src={image} alt={`${project.title} - view ${i + 2}`} loading={i > 0 ? 'lazy' : 'eager'} /></div>)}</div>
    <div className="project-detail-cta"><Eyebrow>Have a project in mind?</Eyebrow><h2>Let’s make room for<br /><em>what’s next.</em></h2><Link className="button button-accent" to="/contact">Start a conversation <span>&gt;</span></Link></div>
  </section>;
}
function Fact({ label, value }) { return <div className="fact"><span>{label}</span><b>{value}</b></div>; }

function Clients() {
  return <>
    <PageIntro label="Our clients" title={<>Built through<br /><em>good partnerships.</em></>} copy="Illustrative sample client marks for the Cabriolet Arch demo. Replace these with approved client names and logos before launch." />
    <section className="client-showcase wrap section-pad-top"><div className="client-grid">{sampleClients.map((client, i) => <div className="client-tile" key={client} data-reveal><span>0{i + 1}</span><b>{client}</b><i aria-hidden="true">&gt;</i></div>)}</div><p className="client-note">Sample names shown for layout only; these are not endorsements or confirmed clients.</p></section>
    <ContactStrip />
  </>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry — ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nProject type: ${data.get('projectType')}\n\n${data.get('message')}`);
    window.location.href = `mailto:hello@cabrioletarch.example?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return <>
    <PageIntro label="Contact" title={<>Let’s talk about<br /><em>your next space.</em></>} copy="Pune, Maharashtra. The phone number and email below are sample placeholders for this demo; replace them before launch." />
    <section className="contact-layout wrap section-pad-top">
      <div className="contact-details" data-reveal><Eyebrow>Visit or call the studio</Eyebrow><h2>Good conversations<br />start <em>somewhere.</em></h2><div className="contact-item"><span>Studio</span><p>Pune,<br />Maharashtra, India</p></div><div className="contact-item"><span>Phone</span><p><a href="tel:+910000000000">+91 00000 00000</a></p></div><div className="contact-item"><span>Email</span><p><a href="mailto:hello@cabrioletarch.example">hello@cabrioletarch.example</a></p></div><div className="contact-item"><span>Studio hours</span><p>Monday-Friday<br />9:00 am-6:00 pm IST</p></div><a className="map-link" href="https://maps.google.com/?q=Pune+Maharashtra+India" target="_blank" rel="noreferrer">Open map <span aria-hidden="true">&gt;</span></a></div>
      <form className="contact-form" onSubmit={submit} data-reveal><Eyebrow>Start a project</Eyebrow><h2>Tell us a little<br /><em>about it.</em></h2><label>Your name<input name="name" placeholder="Name" required /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label><div className="form-row"><label>Phone (optional)<input name="phone" type="tel" placeholder="+91" /></label><label>Project type<select name="projectType" defaultValue="Architecture"><option>Architecture</option><option>Urban planning</option><option>Interior design</option><option>Turnkey project</option><option>Other</option></select></label></div><label>What are you planning?<textarea name="message" rows="4" placeholder="A little about the place, timeline or idea…" required /></label><button className="button button-accent" type="submit">{sent ? 'Opening your email app' : 'Send enquiry'} <span>↗</span></button><p className="form-note">Your email app will open with the enquiry addressed to our studio.</p></form>
    </section>
    <div className="contact-map wrap"><iframe title="Cabriolet Arch studio location" src="https://www.google.com/maps?q=Pune%2C%20Maharashtra&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
  </>;
}

function ContactStrip() { return <section className="contact-strip"><div className="wrap contact-strip-inner" data-reveal><div><Eyebrow light>Have a place in mind?</Eyebrow><h2>Let’s make it<br /><em>mean something.</em></h2></div><Link className="button button-white" to="/contact">Start a conversation <span>&gt;</span></Link></div></section>; }

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 560);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <button className={`back-to-top ${visible ? 'is-visible' : ''}`} type="button" aria-label="Back to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-main"><div className="footer-brand"><Brand light /><p>Architecture and design<br />with people at the centre.</p></div><div className="footer-nav"><span>Explore</span>{navItems.slice(1).map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</div><div className="footer-contact"><span>Find the studio</span><p>Pune, Maharashtra, India</p><a href="tel:+910000000000">+91 00000 00000</a><a href="mailto:hello@cabrioletarch.example">hello@cabrioletarch.example</a></div><div className="footer-note"><span>Let's build a better everyday.</span><Link to="/contact">Talk to us <b>&gt;</b></Link></div></div><div className="wrap footer-bottom"><span>Copyright {new Date().getFullYear()} Cabriolet Arch</span><span>Made for people and place.</span><span className="footer-credit">Developed &amp; Maintained By <strong>REDCYBERFOX LLP</strong></span><Link to="/">Back to top</Link></div></footer>;
}

function NotFound() { return <section className="not-found wrap"><Eyebrow>Page not found</Eyebrow><h1>That space<br /><em>doesn’t exist.</em></h1><Link className="button button-accent" to="/">Return home <span>&gt;</span></Link></section>; }

export default App;
