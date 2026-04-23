"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Figma has completely transformed our design workflow. The real-time collaboration features are incredible - it feels like we & apps;re all in the same room.",
    author: "Sarah Chen",
    role: "Design Lead at Stripe",
    avatar: "SC",
  },
  {
    quote:
      "The best design tool we have ever used. Figma is fast, intuitive, and the version history has saved my work countless times. Highly recommended!",
    author: "Marcus Johnson",
    role: "Senior Product Designer",
    avatar: "MJ",
  },
  {
    quote:
      "We switched our entire team to Figma and have not yet looked back. The performance is outstanding, even with complex projects.",
    author: "Emily Rodriguez",
    role: "Creative Director at Airbnb",
    avatar: "ER",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by designers worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of designers who have already made the switch to a better design experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-chart-4 text-chart-4"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                {`"${testimonial.quote}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
