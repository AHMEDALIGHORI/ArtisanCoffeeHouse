import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";
  delay?: number;
  className?: string;
  threshold?: number;
}

export function ScrollAnimation({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  threshold = 0.1,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const animationClasses = {
    "fade-up": "animate-fade-in-up",
    "fade-in": "animate-fade-in",
    "scale-in": "animate-scale-in",
    "slide-left": "animate-slide-in-left",
    "slide-right": "animate-slide-in-right",
  };

  const delayClasses: Record<number, string> = {
    0: "",
    100: "delay-100",
    200: "delay-200",
    300: "delay-300",
    400: "delay-400",
    500: "delay-500",
    600: "delay-600",
    700: "delay-700",
    800: "delay-800",
  };

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible
          ? `${animationClasses[animation]} ${delayClasses[delay] || ""}`
          : "opacity-0"
      }`}
      style={{ animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
}
