"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "Swastik Matrimonial Services guided us through every step with professionalism and care. We found the perfect match for our daughter.",
    name: "Happy Family",
    location: "Jaipur, Rajasthan",
  },
  {
    quote:
      "Their personalized approach made our search effortless. Every profile was genuine and carefully verified.",
    name: "Happy Couple",
    location: "New Delhi",
  },
  {
    quote:
      "Excellent experience from beginning to end. The team truly understood our family's expectations.",
    name: "Happy Client",
    location: "Mumbai",
  },
] as const;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section
      className="scroll-mt-[-10] bg-[#faf7f2] px-[8%] py-[100px] bg-wine"
      id="testimonials"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 text-center text-cream">
          <h2 className="my-[15px] text-[clamp(2.5rem,5vw,3.25rem)]">
            What Our Members Say
          </h2>
          <p className="mx-auto mb-[60px] max-w-[700px] text-lg leading-[1.8]">
            Every successful match begins with trust. Hear from families who
            found their perfect life partner through Swastik Matrimonial
            Services.
          </p>
        </div>

        <div
          aria-label="Member testimonials"
          aria-roledescription="carousel"
          className="flex flex-col items-center justify-center gap-[30px] focus:outline-none md:flex-row"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") showPrevious();
            if (event.key === "ArrowRight") showNext();
          }}
          role="region"
          tabIndex={0}
        >
          <button
            aria-label="Show previous testimonial"
            className="hidden size-[55px] shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-cream text-2xl text-wine transition duration-300 hover:scale-[1.08] hover:bg-gold md:grid"
            onClick={showPrevious}
            type="button"
          >
            <span aria-hidden="true" title="Previous testimonial">
              ❮
            </span>
          </button>

          <div
            aria-live="polite"
            className="relative h-[430px] w-[800px] max-w-full md:h-[360px]"
          >
            {testimonials.map((item, index) => (
              <article
                aria-hidden={index !== activeIndex}
                className={`absolute inset-0 flex flex-col justify-center rounded-[25px] bg-white p-[35px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-[600ms] md:p-[60px] ${
                  index === activeIndex
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-5 opacity-0"
                }`}
                key={item.quote}
              >
                <div className="my-2.5 text-xl tracking-[4px] text-gold">
                  <span className="sr-only">5 out of 5 stars</span>
                  <span aria-hidden="true">★★★★★</span>
                </div>
                <p className="mx-auto mb-[30px] max-w-[620px] text-xl leading-[1.9] text-[#555] italic">
                  {item.quote}
                </p>
                <h3 className="mb-[5px] text-[30px] text-wine">{item.name}</h3>
                <span className="text-[#777]">{item.location}</span>
              </article>
            ))}
          </div>

          <button
            aria-label="Show next testimonial"
            className="hidden size-[55px] shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-cream text-2xl text-wine transition duration-300 hover:scale-[1.08] hover:bg-gold md:grid"
            onClick={showNext}
            type="button"
          >
            <span aria-hidden="true" title="Next testimonial">❯</span>
          </button>
        </div>

        <div className="mt-[35px] flex justify-center gap-3" aria-label="Choose a testimonial">
          {testimonials.map((item, index) => (
            <button
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Show testimonial ${index + 1} from ${item.name}`}
              className={`size-3 cursor-pointer rounded-full transition duration-300 ${
                index === activeIndex ? "scale-[1.3] bg-wine" : "bg-[#d8d8d8]"
              }`}
              key={item.quote}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
