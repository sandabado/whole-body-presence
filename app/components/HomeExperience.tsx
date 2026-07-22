import Link from "next/link";
import { HomeMotion } from "./HomeMotion";
import { WaitlistForm } from "./WaitlistForm";
import { gallery, practitioners } from "./data";

const offerings = [
  {
    title: "Retreats",
    label: "Desert & venues",
    status: "Next · Mar 15–17",
    description:
      "Three days in Morongo Valley. Somatic work, ceremony, integration. Small groups. Deep transformation.",
    href: "/events",
    action: "Explore retreats",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd82?w=1200&h=1500&q=80",
    alt: "A high desert landscape glowing at sunset",
  },
  {
    title: "Gatherings",
    label: "Monthly & seasonal",
    status: "Monthly · Open",
    description:
      "Public circles, seasonal celebrations, new moon rituals. One-day intensives. Open to all constellation members.",
    href: "/events",
    action: "Join a circle",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=1500&q=80",
    alt: "Friends laughing together in warm evening light",
  },
  {
    title: "Private sessions",
    label: "One-on-one",
    status: "In person + virtual",
    description:
      "Healing, coaching, ceremony, integration. Held in encrypted virtual space via Proton Meet or in person at the Desert Studio.",
    href: "/sessions",
    action: "Book a session",
    image:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1200&h=1500&q=80",
    alt: "A quiet moment of journaling after a reflective practice",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Discover",
    copy: "Browse upcoming retreats, gatherings, and practitioners. Read their words. See their faces. Trust your gut.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1400&h=900&q=80",
    alt: "A contemplative person outdoors in soft natural light",
  },
  {
    number: "02",
    title: "Book",
    copy: "Request your place now. Secure booking and payment open with the beta; virtual-session details arrive privately after confirmation.",
    image:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1400&h=900&q=80",
    alt: "Hands writing intentions in a journal",
  },
  {
    number: "03",
    title: "Arrive",
    copy: "Show up. Whether it is a desert retreat, a local gathering, or an encrypted video session. Bring your whole self.",
    image:
      "https://images.unsplash.com/photo-1470165305631-ef56010af4bb?w=1400&h=900&q=80",
    alt: "People arriving to gather around a fire at twilight",
  },
  {
    number: "04",
    title: "Integrate",
    copy: "The work continues after the fire goes out. Follow-up sessions, integration circles, community support. You do not leave empty-handed.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b3f7eb0a1bf9?w=1400&h=900&q=80",
    alt: "Hands returning to the earth during a grounding practice",
  },
] as const;

const testimonials = [
  {
    opening:
      "The session unlocked something I had been carrying for three years. Not dramatic. Just… released. ",
    highlight: "Like exhaling a breath I did not know I was holding.",
    name: "Kate M.",
    context: "Integration Client · Remote (Proton Meet)",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&q=80",
  },
  {
    opening:
      "Jesse holds space differently. No fixing. No advice. Just the fire. ",
    highlight: "What emerged from that silence changed my trajectory.",
    name: "Raul S.",
    context: "Healing Session · Desert Studio",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&q=80",
  },
  {
    opening:
      "The retreat was not what I expected. It was better. There was no agenda pushed on me. ",
    highlight:
      "The desert did the work. The facilitators just kept the fire burning.",
    name: "Lena K.",
    context: "Desert Fire Retreat · Morongo Valley, CA",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&q=80",
  },
  {
    opening: "I came for the breathwork. I stayed for the community. ",
    highlight:
      "These people are building something rare — real care without extraction.",
    name: "Tomás D.",
    context: "Monthly Gathering · Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&q=80",
  },
] as const;

const constellation = [
  {
    glyph: "🜂",
    name: "Presence",
    element: "Fire",
    status: "★ Current",
    className: "home-constellation-card--current",
  },
  {
    glyph: "🜃",
    name: "Foundation",
    element: "Earth",
    status: "Active",
    href: "https://wholebody.foundation",
    className: "home-constellation-card--earth",
  },
  {
    glyph: "🜁",
    name: "Press",
    element: "Air",
    status: "Active",
    href: "https://wholebody.press",
    className: "home-constellation-card--air",
  },
  {
    glyph: "🜄",
    name: "Studios",
    element: "Water",
    status: "Active",
    href: "https://wholebody.studio",
    className: "home-constellation-card--water",
  },
  {
    glyph: "☉",
    name: "Guardian",
    element: "Aether",
    status: "Active",
    href: "https://wholebody.law",
    className: "home-constellation-card--aether",
  },
] as const;

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <header
      className={`home-section-heading home-section-heading--${align}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="home-section-heading__description">{description}</p>}
    </header>
  );
}

export function HomeExperience() {
  return (
    <div className="home-experience">
      <HomeMotion />
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__media">
          <img
            className="home-hero__image"
            src="/presence-hero-fire-v1.jpg"
            alt="Six people listening to one another around a fire in the high desert at dusk"
            fetchPriority="high"
          />
          <div className="home-hero__veil" aria-hidden="true" />
          <div className="home-hero__embers" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
          <span className="home-hero__tetrahedron" aria-hidden="true">
            🜂
          </span>
        </div>

        <div className="home-hero__content">
          <p className="eyebrow">Whole Body Presence · The Healing Portal</p>
          <h1 id="home-hero-title">Where the fire meets the body.</h1>
          <p className="home-hero__lede">
            Retreats in the desert. Ceremonies under open sky. Private sessions
            with trained keepers. A living community where transformation
            happens between people, not platforms.
          </p>
          <div className="home-hero__actions">
            <Link className="button ember" href="/events">
              Find a gathering →
            </Link>
            <Link className="button" href="/about">
              Learn our way
            </Link>
          </div>
          <p className="home-hero__meta">
            Invite-only beta December 2026 · Open access Q1 2027
          </p>
        </div>

        <a className="home-hero__scroll" href="#way-of-fire" aria-label="Scroll to the Way of Fire">
          <span>Keep going</span>
          <b aria-hidden="true">↓</b>
        </a>
      </section>

      <section
        className="home-way-of-fire"
        id="way-of-fire"
        aria-labelledby="way-of-fire-title"
      >
        <figure className="home-way-of-fire__portrait" data-home-reveal>
          <img
            src="https://images.unsplash.com/photo-1501004318641-b3f7eb0a1bf9?w=1200&h=1600&q=80"
            alt="Hands pressed into soil during a grounding practice"
            loading="lazy"
          />
          <figcaption>Grounding practice · Morongo Valley</figcaption>
        </figure>
        <div className="home-way-of-fire__copy" data-home-reveal>
          <p className="eyebrow">The way of fire</p>
          <h2 id="way-of-fire-title">Not extraction. Transformation.</h2>
          <p>
            Every other wellness industry optimizes for profit. The retreat
            centers, the apps, the coaches — they take your money, give you a
            weekend, move on.
          </p>
          <p>
            Presence optimizes for something older. The feeling of sitting
            around a fire with people who see you. The sweat of real work. The
            tears that come when something breaks open.
          </p>
          <blockquote>“Fire does not consume. Fire transforms.”</blockquote>
          <Link className="home-text-link" href="/about">
            Read how we hold space <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="home-offerings" aria-labelledby="home-offerings-title">
        <SectionHeading
          id="home-offerings-title"
          eyebrow="What we offer"
          title="Different doors. The same fire."
          description="Come for three days, three hours, or one honest conversation. Start where your body says yes."
        />
        <div className="home-offerings__grid">
          {offerings.map((offering, index) => (
            <Link
              className={`home-offering-card home-offering-card--${index + 1}`}
              data-home-reveal
              href={offering.href}
              key={offering.title}
            >
              <div className="home-offering-card__media">
                <img src={offering.image} alt={offering.alt} loading="lazy" />
                <span className="home-offering-card__status">
                  <i aria-hidden="true" />
                  {offering.status}
                </span>
              </div>
              <div className="home-offering-card__body">
                <p>{offering.label}</p>
                <h3>{offering.title}</h3>
                <span className="home-offering-card__description">
                  {offering.description}
                </span>
                <strong>
                  {offering.action} <span aria-hidden="true">→</span>
                </strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="home-featured-retreat"
        aria-labelledby="home-featured-retreat-title"
      >
        <div className="home-featured-retreat__media" data-home-reveal>
          <img
            src="https://images.unsplash.com/photo-1599577721626-c0f7e1cb1d65?w=1600&h=1400&q=80"
            alt="A quiet desert retreat venue lit by the setting sun"
            loading="lazy"
          />
          <div className="home-featured-retreat__badges">
            <span>★ Featured retreat</span>
            <span className="home-featured-retreat__spots">
              <i aria-hidden="true" /> 4 spots left
            </span>
          </div>
          <p className="home-featured-retreat__image-note">
            The Desert Studio · Morongo Valley, California
          </p>
        </div>

        <div className="home-featured-retreat__content" data-home-reveal>
          <i className="home-hud-corner home-hud-corner--tl" aria-hidden="true" />
          <i className="home-hud-corner home-hud-corner--tr" aria-hidden="true" />
          <i className="home-hud-corner home-hud-corner--bl" aria-hidden="true" />
          <i className="home-hud-corner home-hud-corner--br" aria-hidden="true" />
          <p className="eyebrow">Mar 15–17, 2027 · Morongo Valley, CA</p>
          <h2 id="home-featured-retreat-title">Desert Fire Retreat</h2>
          <dl className="home-featured-retreat__price-grid">
            <div>
              <dt>Investment</dt>
              <dd>$850</dd>
            </div>
            <div>
              <dt>Scholarship</dt>
              <dd>$425</dd>
            </div>
            <div>
              <dt>Circle</dt>
              <dd>12 seats</dd>
            </div>
          </dl>
          <div
            className="home-featured-retreat__capacity"
            role="progressbar"
            aria-label="Eight of twelve retreat seats reserved"
            aria-valuemin={0}
            aria-valuemax={12}
            aria-valuenow={8}
          >
            <span />
          </div>
          <p>
            Three days in the high desert. Somatic release at dawn. Fire
            ceremony at dusk. Silence between. Twelve seats. When the desert
            speaks, you listen.
          </p>
          <p>
            This is not a vacation. This is not a workshop. This is an
            initiation — a deliberate step into fire. You will be seen. You
            will be held. You will be changed.
          </p>
          <ul className="home-featured-retreat__included">
            <li>All plant-forward meals</li>
            <li>Shared accommodation</li>
            <li>All ceremony materials</li>
            <li>Post-retreat integration session</li>
          </ul>
          <blockquote>
            “This was not what I expected. It was better.”
            <cite>— Lena K., past participant</cite>
          </blockquote>
          <div className="home-featured-retreat__actions">
            <Link className="button ember" href="/events/desert-fire-retreat">
              View retreat details →
            </Link>
            <Link className="home-text-link" href="/contact">
              Ask for the itinerary
            </Link>
          </div>
        </div>
      </section>

      <section className="home-keepers" aria-labelledby="home-keepers-title">
        <div className="home-keepers__intro">
          <SectionHeading
            id="home-keepers-title"
            eyebrow="The keepers"
            title="Hands that hold space."
            description="Trained practitioners. Real humans. Not influencers. Not gurus. People who have done their own work and now hold space for yours."
          />
          <Link className="home-text-link" href="/practitioners">
            View all practitioners <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="home-keepers__grid">
          {practitioners.slice(0, 4).map((person, index) => {
            const revealOrder = [1, 3, 4, 2][index];
            return (
              <Link
                className={`home-practitioner-card home-practitioner-card--reveal-${revealOrder}`}
                data-home-reveal
                href={`/practitioners/${person.slug}`}
                key={person.slug}
              >
                <div className="home-practitioner-card__portrait">
                  <img src={person.image} alt={person.name} loading="lazy" />
                  <span className="home-practitioner-card__location">
                    {person.location}
                  </span>
                </div>
                <div className="home-practitioner-card__identity">
                  <h3>
                    {person.name} <i aria-label="Accepting clients" />
                  </h3>
                  <p>{person.title}</p>
                  <div className="home-practitioner-card__specialties">
                    {person.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-process" aria-labelledby="home-process-title">
        <SectionHeading
          id="home-process-title"
          eyebrow="The process"
          title="From spark to integration."
          align="center"
        />
        <div className="home-process__steps">
          {processSteps.map((step, index) => (
            <article
              className={`home-process-step home-process-step--${index % 2 === 0 ? "image-left" : "image-right"}`}
              data-home-reveal
              key={step.number}
            >
              <div className="home-process-step__image">
                <img src={step.image} alt={step.alt} loading="lazy" />
                <span aria-hidden="true" />
              </div>
              <div className="home-process-step__copy">
                <b aria-hidden="true">{step.number}</b>
                <p className="eyebrow">Step {step.number}</p>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
              {index < processSteps.length - 1 && (
                <i className="home-process-step__connector" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-testimonials"
        aria-labelledby="home-testimonials-title"
      >
        <SectionHeading
          id="home-testimonials-title"
          eyebrow="Words from the fire"
          title="What happens in the room."
        />
        <div className="home-testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <figure
              className={`home-testimonial home-testimonial--${index + 1}`}
              data-home-reveal
              key={testimonial.name}
            >
              <blockquote>
                “{testimonial.opening}
                <span className="home-testimonial__highlight">
                  {testimonial.highlight}
                </span>
                ”
              </blockquote>
              <figcaption>
                <img
                  src={testimonial.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <span>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.context}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="home-gallery" aria-labelledby="home-gallery-title">
        <div className="home-gallery__heading">
          <SectionHeading
            id="home-gallery-title"
            eyebrow="Moments held"
            title="The fire in photographs."
            description="We do not curate perfection. We capture truth: sweat, tears, laughter, stillness. Real people doing real work."
          />
          <Link className="home-text-link" href="/gallery">
            View full gallery <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="home-gallery__masonry">
          {gallery.slice(0, 8).map(([src, category, caption], index) => (
            <figure
              className={`home-gallery-card home-gallery-card--${index + 1}`}
              data-home-reveal
              key={src}
            >
              <img src={src} alt={caption} loading="lazy" />
              <figcaption>
                <span>{category}</span>
                <p>{caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="home-waitlist" aria-labelledby="home-waitlist-title">
        <div className="home-waitlist__glow" aria-hidden="true" />
        <div className="home-waitlist__panel" data-home-reveal>
          <span className="home-waitlist__fire" aria-hidden="true">
            🔥
          </span>
          <p className="eyebrow">Beta · December 2026</p>
          <h2 id="home-waitlist-title">Join the waitlist.</h2>
          <p className="home-waitlist__lede">
            Beta opens December 2026. Invite-only. We will reach out when the
            fire is ready.
          </p>
          <WaitlistForm compact />
          <small className="home-waitlist__consent">
            By joining, you agree to be contacted about Whole Body Presence. We
            protect your data. We do not sell it. We do not track you.
          </small>
        </div>
      </section>

      <section
        className="home-constellation"
        aria-labelledby="home-constellation-title"
      >
        <SectionHeading
          id="home-constellation-title"
          eyebrow="Continue through the elements"
          title="One body. Many ways in."
          description="Presence is one living system inside a larger constellation of places, practices, and protections."
          align="center"
        />
        <div className="home-constellation__grid">
          {constellation.map((item) => {
            const content = (
              <>
                <i className="home-hud-corner home-hud-corner--tl" aria-hidden="true" />
                <i className="home-hud-corner home-hud-corner--tr" aria-hidden="true" />
                <i className="home-hud-corner home-hud-corner--bl" aria-hidden="true" />
                <i className="home-hud-corner home-hud-corner--br" aria-hidden="true" />
                <span className="home-constellation-card__glyph" aria-hidden="true">
                  {item.glyph}
                </span>
                <strong>{item.name}</strong>
                <small>{item.element}</small>
                <em>{item.status}</em>
              </>
            );

            return "href" in item ? (
              <Link
                className={`home-constellation-card ${item.className}`}
                data-home-reveal
                href={item.href}
                key={item.name}
              >
                {content}
              </Link>
            ) : (
              <div
                className={`home-constellation-card ${item.className}`}
                data-home-reveal
                aria-current={item.status.includes("Current") ? "page" : undefined}
                aria-disabled={item.status === "Locked" ? "true" : undefined}
                key={item.name}
              >
                {content}
              </div>
            );
          })}
        </div>
        <Link className="home-constellation__whole" href="https://wholebody.earth">
          Return to the whole constellation <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
