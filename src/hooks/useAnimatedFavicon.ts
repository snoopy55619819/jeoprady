import { useEffect } from "react";

type FaviconFrame = {
  src: string;
  delay: number; // in milliseconds
};

const frames: FaviconFrame[] = [
  { src: "/favicon-frames/frame_0_delay-1s.png", delay: 1000 },
  { src: "/favicon-frames/frame_1_delay-0.05s.png", delay: 50 },
  { src: "/favicon-frames/frame_2_delay-0.05s.png", delay: 50 },
  { src: "/favicon-frames/frame_3_delay-2s.png", delay: 2000 },
];

export default function useAnimatedFavicon(): void {
  useEffect(() => {
    let index = 0;
    let timeoutId: number;

    const link: HTMLLinkElement =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    document.head.appendChild(link);

    const updateFavicon = () => {
      link.href = frames[index].src;
      timeoutId = window.setTimeout(() => {
        index = (index + 1) % frames.length;
        updateFavicon();
      }, frames[index].delay);
    };

    updateFavicon();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
}
