import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

const banners = [
  { id: 1, image: "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/22793132f4f08be0.png?q=80" },
  { id: 2, image: "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/4f85bad5c0e414dd.png?q=80" },
  { id: 3, image: "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/68d90d48c3c17995.png?q=80" },
  { id: 4, image: "https://rukminim2.flixcart.com/fk-p-flap/1600/780/image/35abbb9b568149d3.png?q=80" },
];

export default function Slider() {
  return (
    <div className="w-full pt-20 max-w-[1600px] mx-auto py-10 md:py-20 px-0 md:px-4 select-none">
      <Swiper
        modules={[Autoplay, Pagination, EffectCreative]}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        // Base mobile settings
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        breakpoints={{
          // Small tablets
          640: { 
            slidesPerView: 1.5, 
            spaceBetween: 20 
          },
          // Laptops
          1024: { 
            slidesPerView: 1.4, 
            spaceBetween: 30 
          },
          // Large Desktops
          1280: {
            slidesPerView: 1.6,
            spaceBetween: 40
          }
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="pb-12 md:pb-16"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="flex items-center rounded-2xl justify-center">
            {({ isActive }) => (
              <div
                className={`
                  relative w-full overflow-hidden transition-all duration-1000 ease-in-out
                  ${isActive 
                    ? "scale-100 shadow-xl opacity-100 rounded-none md:rounded-2xl" 
                    : "scale-95 opacity-50 blur-[0.5px] md:scale-90 md:opacity-40 rounded-none md:rounded-2xl"}
                `}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                
                <img
                  src={banner.image}
                  alt="banner"
                  // Responsive height: mobile uses aspect ratio, desktop uses vh
                  className="w-full h-auto aspect-[16/9] md:h-[60vh] lg:h-[70vh] min-h-[220px] max-h-[800px] object-cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{
        __html: `
        .swiper-pagination-bullet-active {
          background: #4f46e5 !important;
          width: 24px !important;
          border-radius: 8px !important;
          transition: width 0.3s ease !important;
        }
        @media (min-width: 768px) {
          .swiper-pagination-bullet-active {
            width: 32px !important;
          }
        }
        .swiper-wrapper {
          display: flex;
          align-items: center;
        }
        .swiper-pagination-bullet {
          background: #6366f1;
        }
        .swiper-pagination {
            bottom: 0px !important;
        }
      `}} />
    </div>
  );
}