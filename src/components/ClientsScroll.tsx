"use client";

import { ClientOutputDTO } from "@/features/clients/dtos/clientsOutputDTO";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ClientsScrollProps {
  clients: ClientOutputDTO[];
}

export function ClientsScroll({ clients }: ClientsScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(Math.round(scrollLeft) < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        current.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [clients]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  if (!clients.length) return null;

  return (
    <div className="relative group w-full flex items-center">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 z-10 p-2 rounded-full bg-white/90 shadow-md border hover:bg-white text-gray-700 transition-opacity"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex items-center gap-12 overflow-x-auto scrollbar-none py-4 px-2 w-full scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {clients.map((client) => {
          return (
            <div
              key={client.id}
              className="shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-14"
            >
              <Image
                src={client.logo}
                alt={client.alt || `${client.name} Logo`}
                width={160}
                height={50}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          );
        })}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 z-10 p-2 rounded-full bg-white/90 shadow-md border hover:bg-white text-gray-700 transition-opacity"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
