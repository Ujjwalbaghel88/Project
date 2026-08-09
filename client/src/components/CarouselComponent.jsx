import React, { useState, useEffect, useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import bgImage1 from "../assets/carousel/bgImage1.jpg";
import bgImage2 from "../assets/carousel/bgImage2.jpg";
import bgImage3 from "../assets/carousel/bgImage3.jpg";
import bgImage4 from "../assets/carousel/bgImage4.jpg";
import bgVideo from "../assets/carousel/bgVideo.mp4"; // Import the video file


const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const videoRef = useRef(null);

  const images = [bgImage1, bgImage2, bgImage3, bgImage4, bgVideo];
 

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  // Start the video whenever its slide becomes active and pause it otherwise.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentSlide === images.length - 1 || currentSlide === images.length - 2) {
      video.currentTime = 0;
      video.play().catch(() => {
        // The video is muted, but some browsers can still delay autoplay.
      });
    } else {
      video.pause();
    }
  }, [currentSlide, images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Carousel Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {image === bgVideo ? (
            <video
              ref={videoRef}
              src={image}
              aria-label={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              autoPlay={index === currentSlide}
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition z-10 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <IoChevronBack size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition z-10 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <IoChevronForward size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
