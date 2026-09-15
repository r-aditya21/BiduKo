"use client";

import { useState } from "react";

const SERVICES = [
  {
    index: "01",
    name: "WEBSITE DESIGN",
    color: "#F6B6A8", // Coral Peach
    price: "FROM $1,500",
    image: "/images/service-1.jpg",
    accordion: [
      {
        title: "Custom UI/UX Design",
        content:
          "Wireframes and interfaces designed around how your users actually move — built for clarity first, conversion second.",
      },
      {
        title: "Responsive Development",
        content:
          "Pixel-accurate builds that hold up cleanly from a 320px phone to a 27-inch monitor.",
      },
      {
        title: "SEO Optimization",
        content:
          "Technical and on-page SEO handled from the first commit, not patched in after launch.",
      },
    ],
  },
  {
    index: "02",
    name: "CONTENT CREATION",
    color: "#9ED8F0", // Bright Sky Blue
    price: "FROM $2,500",
    image: "/images/service-2.jpg",
    accordion: [
      {
        title: "Brand Photography",
        content:
          "On-location and studio shoots that give your brand a consistent, recognizable visual voice.",
      },
      {
        title: "Short-form Video",
        content:
          "Reels and shorts cut for retention — scripted, shot, and edited to match your platform's pace.",
      },
      {
        title: "Copywriting",
        content:
          "Website, ad, and caption copy written in your brand's tone, not generic marketing filler.",
      },
    ],
  },
  {
    index: "03",
    name: "BRAND STRATEGY",
    color: "#B9E3A5", // Fresh Lime Sage
    price: "FROM $4,000",
    image: "/images/service-3.jpg",
    accordion: [
      {
        title: "Market Research",
        content:
          "Competitor and audience analysis that tells us what actually needs to be different about you.",
      },
      {
        title: "Visual Identity",
        content:
          "Logo, color, and type systems built to work everywhere from a favicon to a billboard.",
      },
      {
        title: "Brand Guidelines",
        content:
          "A living reference doc so your identity stays consistent across every team and vendor that touches it.",
      },
    ],
  },
];

export default function Services() {
  // Keys are formatted as `${cardIndex}-${itemIndex}`
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    "0-0": true, // first card's first item open by default
  });

  const toggleAccordion = (cardIndex: number, itemIndex: number) => {
    const key = `${cardIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="services" id="services">
      <p className="services__bg-text" aria-hidden="true">
        WORK
      </p>

      <div className="section-head reveal">
        <p className="eyebrow">What We Do</p>
        <h2 className="section-title">
          Three disciplines. <em>One team.</em>
        </h2>
      </div>

      <div className="services__list" id="servicesList">
        {SERVICES.map((service, cardIndex) => (
          <div
            key={service.index}
            className="service-card reveal"
            style={{ backgroundColor: service.color }}
          >
            <div className="service-card__left">
              <h3 className="service-card__name">{service.name}</h3>

              <div className="service-card__accordion">
                {service.accordion.map((item, itemIndex) => {
                  const key = `${cardIndex}-${itemIndex}`;
                  const isOpen = !!openItems[key];
                  const panelId = `service-${cardIndex}-panel-${itemIndex}`;

                  return (
                    <div className="accordion-item" key={key}>
                      <button
                        className="accordion-item__btn"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleAccordion(cardIndex, itemIndex)}
                      >
                        {item.title}
                        <span className="accordion-item__icon" aria-hidden="true">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <div
                        className={`accordion-item__content${isOpen ? " is-open" : ""}`}
                        id={panelId}
                      >
                        <p>{item.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="service-card__right">
              <img
                src={service.image}
                alt={service.name}
                className="service-card__img"
              />
              <span className="service-card__badge">{service.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}