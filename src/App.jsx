import { useEffect, useState } from "react";
import "./App.css";

const phone = "8862004741";
const displayPhone = "+91 8862 004 741";
const services = [
  {
    icon: "✦",
    title: "Deep cleaning",
    text: "A detailed reset for homes, offices, and spaces that need a little more care.",
    tone: "mint",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=85",
  },
  {
    icon: "⌂",
    title: "Home care",
    text: "Reliable recurring cleaning that gives you back your evenings and weekends.",
    tone: "sand",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=700&q=85",
  },
  {
    icon: "▦",
    title: "Office care",
    text: "Professional, low-disruption cleaning for productive, welcoming workplaces.",
    tone: "blue",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=85",
  },
  {
    icon: "↗",
    title: "Maintenance",
    text: "The small repairs, touch-ups, and upkeep that keep a property running beautifully.",
    tone: "coral",
  },
];
const galleries = [
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85",
    label: "Kitchen deep clean",
  },
  {
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=85",
    label: "Fresh office spaces",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
    label: "Careful finishing",
  },
];
function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
const Eyebrow = ({ children }) => <p className="eyebrow">{children}</p>;
const Arrow = () => <span className="arrow">↗</span>;

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const go = (destination) => {
    navigate(destination);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };
  const page =
    path === "/about" ? (
      <AboutPage go={go} />
    ) : path === "/services" ? (
      <ServicesPage go={go} />
    ) : path === "/gallery" ? (
      <GalleryPage go={go} />
    ) : path === "/contact" ? (
      <ContactPage go={go} />
    ) : path === "/booking" ? (
      <BookingPage />
    ) : (
      <HomePage go={go} />
    );
  return (
    <div className="site-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => go("/")}
          aria-label="MVP Deep Cleaners home"
        >
          <span>MVP</span>
          <small>
            DEEP CLEANERS
            <br />
            &amp; MAINTENANCE
          </small>
        </button>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {[
            ["/", "Home"],
            ["/about", "About us"],
            ["/services", "Services"],
            ["/gallery", "Gallery"],
            ["/contact", "Contact"],
          ].map(([url, label]) => (
            <button
              className={path === url ? "active" : ""}
              key={url}
              onClick={() => go(url)}
            >
              {label}
            </button>
          ))}
          <button className="nav-cta" onClick={() => go("/booking")}>
            Book a service <b>↗</b>
          </button>
        </nav>
      </header>
      <main>{page}</main>
      <footer className="footer">
        <div>
          <p>Making every space feel better.</p>
          <p>Professional cleaning and property care across Goa.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <button onClick={() => go("/services")}>Our services</button>
          <button onClick={() => go("/about")}>About MVP</button>
          <button onClick={() => go("/gallery")}>Recent work</button>
        </div>
        <div>
          <strong>Get in touch</strong>
          <a href={`tel:+91${phone}`}>{displayPhone}</a>
          <a href="mailto:info@mvpdeepcleaners.com">info@mvpdeepcleaners.com</a>
          <a href={`https://wa.me/91${phone}`}>WhatsApp us ↗</a>
        </div>
        <div className="footer-social">
          <strong>Follow us</strong>
          <div className="social-links">
            <a href="#instagram" aria-label="Instagram" title="Instagram">◎</a>
            <a href="#facebook" aria-label="Facebook" title="Facebook">f</a>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© 2026 MVP Deep Cleaners &amp; Maintenance</span>
        <span>Clean spaces. Clear minds.</span>
      </div>
    </div>
  );
}
function HomePage({ go }) {
  const [activeGallery, setActiveGallery] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  useEffect(() => {
    if (isGalleryPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveGallery((slide) => (slide + 1) % galleries.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isGalleryPaused]);

  const previousGallery = () => {
    setActiveGallery((slide) => (slide - 1 + galleries.length) % galleries.length);
  };
  const nextGallery = () => {
    setActiveGallery((slide) => (slide + 1) % galleries.length);
  };

  return (
    <>
      <section
        className="home-gallery"
        aria-label="Recent cleaning work"
        onMouseEnter={() => setIsGalleryPaused(true)}
        onMouseLeave={() => setIsGalleryPaused(false)}
        onFocus={() => setIsGalleryPaused(true)}
        onBlur={() => setIsGalleryPaused(false)}
      >
        <div className="home-gallery-track">
          {galleries.map((item, index) => (
            <figure
              className={`home-gallery-slide ${index === activeGallery ? "active" : ""}`}
              key={item.label}
            >
              <img src={item.src} alt={item.label} />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="home-gallery-controls">
          <button onClick={previousGallery} aria-label="Previous gallery image">←</button>
          <div className="home-gallery-dots">
            {galleries.map((item, index) => (
              <button
                className={index === activeGallery ? "active" : ""}
                key={item.label}
                onClick={() => setActiveGallery(index)}
                aria-label={`Show ${item.label}`}
              />
            ))}
          </div>
          <button onClick={nextGallery} aria-label="Next gallery image">→</button>
        </div>
      </section>
      <section className="home-service-section" aria-label="Our services">
        <div className="home-service-heading">
          <Eyebrow>Our services</Eyebrow>
          <h2>Care for every kind of space.</h2>
        </div>
        <div className="hero-service-tiles">
          {services.slice(0, 3).map((service) => (
            <article
              className={`hero-service-tile ${service.tone}`}
              key={service.title}
            >
              <img src={service.image} alt="" />
              <div className="hero-service-content">
                <span>{service.icon}</span>
                <strong>{service.title}</strong>
                <p>{service.text}</p>
              </div>
              <div className="hero-service-actions">
                <a href={`tel:+91${phone}`} className="hero-call-button">Call now</a>
                <button type="button" onClick={() => go("/booking")}>Schedule a call</button>
              </div>
            </article>
          ))}
        </div>
        <button className="text-button hero-services-link" onClick={() => go("/services")}>
          Explore more services <Arrow />
        </button>
      </section>
      <section className="hero-section">
        <div className="hero-copy">
          <Eyebrow>Deep cleaning · Maintenance</Eyebrow>
          <h1>
            Make room for
            <br />
            <em>better living.</em>
          </h1>
          <p>
            Thoughtful cleaning and property care for homes, businesses, and the
            spaces in between. Done properly, every time.
          </p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => go("/booking")}>
              Book a service <Arrow />
            </button>
          </div>
          <div className="hero-note">
            <span className="avatar-stack">
              <i />
              <i />
              <i />
            </span>
            <span>
              <b>Local care for Goa homes and businesses</b>
              <br />
              with attention to every detail
            </span>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-label">
            <span>01</span>
            <span>Care you can see.</span>
          </div>
        </div>
      </section>
      <section className="trust-strip">
        <span>We care for spaces used by</span>
        <b>homes</b>
        <b>offices</b>
        <b>retail</b>
        <b>property teams</b>
      </section>
      <section className="section intro-section">
        <div>
          <Eyebrow>What we do</Eyebrow>
          <h2>
            A cleaner space is
            <br />
            <em>a lighter feeling.</em>
          </h2>
        </div>
        <div className="intro-body">
          <p>
            Life is full enough. We take cleaning and maintenance off your plate
            with meticulous work, clear communication, and people who genuinely
            care about the finish.
          </p>
          <button className="text-button" onClick={() => go("/about")}>
            More about MVP <Arrow />
          </button>
        </div>
      </section>
    </>
  );
}
function PageHero({ eyebrow, title, copy, className = "" }) {
  return (
    <section className={`page-hero ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      {copy && <p>{copy}</p>}
    </section>
  );
}
function AboutPage({ go }) {
  return (
    <>
      <PageHero
        eyebrow="The people behind the polish"
        title={
          <>
            Good work starts
            <br />
            <em>with good people.</em>
          </>
        }
        copy="MVP is a proudly local cleaning and maintenance team built around one simple idea: the spaces we care for should make life feel better."
      />
      <section className="section about-story">
        <div className="about-photo" />
        <div>
          <Eyebrow>Our approach</Eyebrow>
          <h2>
            Professional
            <br />
            <em>with heart.</em>
          </h2>
          <p>
            From the first hello to the final check, we make the whole
            experience easy. Our team is trained, respectful, and detail-minded.
            We arrive when we say we will, bring the right tools for the job,
            and leave your space feeling considered.
          </p>
          <p>
            Whether it is a once-off reset or regular care, we treat your space
            like it matters, because it does.
          </p>
          <button className="button primary" onClick={() => go("/booking")}>
            Work with us <Arrow />
          </button>
        </div>
      </section>
      <section className="values">
        <div>
          <Eyebrow>Our promise</Eyebrow>
          <h2>
            The little things
            <br />
            <em>make a difference.</em>
          </h2>
        </div>
        <div className="value-list">
          <div>
            <b>01</b>
            <strong>Consistency</strong>
            <p>Reliable standards, familiar faces, and no surprises.</p>
          </div>
          <div>
            <b>02</b>
            <strong>Attention</strong>
            <p>We notice the corners others overlook.</p>
          </div>
          <div>
            <b>03</b>
            <strong>Respect</strong>
            <p>For your time, your property, and your peace of mind.</p>
          </div>
        </div>
      </section>
    </>
  );
}
function ServicesPage({ go }) {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            A better standard
            <br />
            <em>of clean.</em>
          </>
        }
        copy="From detailed deep cleans to the regular upkeep that keeps everything running smoothly, our services are shaped around your space."
      />
      <section className="section all-services">
        {services.map((service, index) => (
          <article key={service.title} className="service-row">
            <span className="service-number">0{index + 1}</span>
            <span className="service-icon">{service.icon}</span>
            <div>
              <h2>{service.title}</h2>
              <p>
                {service.text} We tailor every visit to the way you use your
                space, with clear scope and careful finishing.
              </p>
            </div>
            <button
              className="circle-button"
              onClick={() => go("/booking")}
              aria-label={`Book ${service.title}`}
            >
              ↗
            </button>
          </article>
        ))}
      </section>
      <section className="service-callout">
        <Eyebrow>Not sure what you need?</Eyebrow>
        <h2>
          Tell us about your space.
          <br />
          <em>We’ll guide you.</em>
        </h2>
        <button className="button cream" onClick={() => go("/contact")}>
          Talk to the team <Arrow />
        </button>
      </section>
    </>
  );
}
function GalleryPage({ go }) {
  return (
    <>
      <PageHero
        eyebrow="Recent work"
        title={
          <>
            Clean lines.
            <br />
            <em>Good energy.</em>
          </>
        }
        copy="A glimpse at the spaces we have helped feel like themselves again."
      />
      <section className="gallery-grid">
        {galleries.map((item, index) => (
          <figure className={index === 1 ? "tall" : ""} key={item.label}>
            <img src={item.src} alt={item.label} />
            <figcaption>
              <span>0{index + 1}</span>
              {item.label}
            </figcaption>
          </figure>
        ))}
      </section>
      <section className="section gallery-bottom">
        <h2>
          Ready for your
          <br />
          <em>before &amp; after?</em>
        </h2>
        <button className="button primary" onClick={() => go("/booking")}>
          Book a service <Arrow />
        </button>
      </section>
    </>
  );
}
function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s talk about
            <br />
            <em>your space.</em>
          </>
        }
        copy="Questions, or just not sure where to start? We’re here."
      />
      <section className="section contact-layout">
        <div>
          <Eyebrow>Reach us directly</Eyebrow>
          <a className="contact-link" href={`tel:+91${phone}`}>
            {displayPhone} <Arrow />
          </a>
          <a className="contact-link" href="mailto:info@mvpdeepcleaners.com">
            info@mvpdeepcleaners.com <Arrow />
          </a>
          <a className="contact-link" href={`https://wa.me/91${phone}`}>
            WhatsApp us <Arrow />
          </a>
          <div className="contact-hours">
            <b>Hours</b>
            <p>24/7</p>
          </div>
        </div>
      </section>
      <section className="service-area">
        <div>
          <Eyebrow>Where we work</Eyebrow>
          <h2>
            Serving
            <br />
            <em>Goa with care.</em>
          </h2>
        </div>
        <p>
          Serving homes and businesses across Goa. Not sure if we cover your
          area? Call or WhatsApp us.
        </p>
      </section>
    </>
  );
}
function BookingPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        className="booking-hero"
        eyebrow="Book a service"
        title={
          <>
            Let’s get your space
            <br />
            <em>feeling fresh.</em>
          </>
        }
        copy="Share a few details and our team will be in touch to confirm your booking."
      />
      <section className="section booking-layout">
        <form
          className="booking-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="success-message">
              <span>✓</span>
              <h2>Thanks, we’ve got it.</h2>
              <p>
                We’ll be in touch shortly to confirm the details of your
                booking.
              </p>
            </div>
          ) : (
            <>
              <div className="form-heading">
                <Eyebrow>Your details</Eyebrow>
                <p>Fields marked * are required.</p>
              </div>
              <div className="form-grid">
                <label>
                  Full name *
                  <input required name="name" placeholder="Your name" />
                </label>
                <label>
                  Phone number *
                  <input required type="tel" name="phone" placeholder="+91 8862 004 741" />
                </label>
                <label>
                  Service required *
                  <select required name="service" defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option key={service.title}>{service.title}</option>
                    ))}
                    <option>Something else</option>
                  </select>
                </label>
                <label>
                  Preferred date *<input required type="date" name="date" />
                </label>
                <label className="full">
                  Property address *
                  <input
                    required
                    name="address"
                    placeholder="Street, area, city"
                  />
                </label>
                <label className="full">
                  Additional requirements
                  <textarea
                    name="notes"
                    placeholder="Anything helpful for us to know?"
                    rows="4"
                  />
                </label>
              </div>
              <button className="button primary" type="submit">
                Send booking request <Arrow />
              </button>
            </>
          )}
        </form>
        <aside className="booking-aside">
          <Eyebrow>What happens next</Eyebrow>
          <div>
            <b>01</b>
            <p>We review your request and check availability.</p>
          </div>
          <div>
            <b>02</b>
            <p>We call or WhatsApp to confirm the details.</p>
          </div>
          <div>
            <b>03</b>
            <p>Your space gets the MVP treatment.</p>
          </div>
          <p className="aside-note">
            Prefer to chat?{" "}
            <a href={`https://wa.me/91${phone}`}>Message us on WhatsApp ↗</a>
          </p>
        </aside>
      </section>
    </>
  );
}
export default App;
