"use client";

import { Users, Move, Cloud, History, Layers, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Work together with your team in real-time. See cursors, selections, and changes as they happen.",
  },
  {
    icon: Move,
    title: "Drag & Drop Design",
    description:
      "Intuitive drag and drop interface makes designing effortless. No learning curve required.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description:
      "All your designs are automatically saved to the cloud. Access them from anywhere, anytime.",
  },
  {
    icon: History,
    title: "Version History",
    description:
      "Never lose your work. Browse through your design history and restore any previous version.",
  },
  {
    icon: Layers,
    title: "Advanced Layers",
    description:
      "Organize your designs with powerful layer management. Group, nest, and arrange with ease.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for performance. Handle complex designs with thousands of elements without lag.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to design
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Powerful features that help you bring your creative ideas to life faster than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/80 hover:border-primary/50 transition-all duration-300"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
