import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Pagination, Mousewheel } from 'swiper/modules';
import './style.css';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  CreditCard,
} from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const Slider = () => {
  const slides = [
    {
      id: 1,
      tag: "Autumn 2026",
      title: "The Urban Tech Collection",
      desc: "Performance-driven aesthetics for the modern professional. Built for durability, designed for the street.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1600",
      cta: "Shop Tech",
      color: "text-blue-500"
    },
    {
      id: 2,
      tag: "Minimalism",
      title: "Essentials for the Soul",
      desc: "Back to basics with our sustainably sourced cotton line. Better for you, better for the planet.",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600",
      cta: "Explore Basics",
      color: "text-emerald-500"
    }
  ];

  return (
    <section className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* Side Brand Info (Socials) - Static */}
      <div className="absolute left-8 bottom-12 z-40 hidden lg:flex flex-col gap-6 text-white/40">
        <div className="w-px h-12 bg-white/20 ml-2.5"></div>
      </div>

      <Swiper
        direction={'horizontal'}
        modules={[Autoplay, EffectCreative, Pagination, Mousewheel]}
        mousewheel={{ forceToAxis: true }}
        effect={'creative'}
        speed={1200}
        grabCursor={true}
        autoplay={{ delay: 2500 }}
        loop={true}
        creativeEffect={{
          prev: { shadow: true, translate: ["-100%", 0, -1] },
          next: { translate: ["100%", 0, 0] },
        }}
        pagination={{
          clickable: true,
          el: '.vertical-pagination',
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full">

                {/* Left Content Column */}
                <div className="lg:col-span-5 bg-white flex flex-col justify-center px-12 lg:px-24">
                  <div className={`transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                    <span className={`text-xs font-black uppercase tracking-[0.3em] ${slide.color} mb-4 block`}>
                      {slide.tag}
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
                      {slide.title}
                    </h1>
                    <p className="text-slate-500 text-lg mb-10 max-w-md leading-relaxed">
                      {slide.desc}
                    </p>
                    <button className="group flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-all shadow-2xl">
                      {slide.cta}
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="lg:col-span-7 relative overflow-hidden">
                  <div className={`w-full h-full transition-transform duration-[8000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <img
                      src={slide.image}
                      className="w-full h-full object-cover"
                      alt={slide.title}
                    />
                    {/* Artistic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                  </div>

                  {/* Floating Floating Product Tag */}
                  <div className={`absolute bottom-20 right-20 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Featured Item</p>
                    <p className="font-bold">Eco-Tech Modular Bag</p>
                    <div className="flex items-center gap-2 mt-2 text-blue-400 font-mono">
                      <span>$249.00</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Vertical Glass Pagination */}
        <div className="vertical-pagination absolute !right-8 !top-1/2 !-translate-y-1/2 !left-auto !w-auto z-50 flex flex-col gap-4"></div>
      </Swiper>

      {/* Floating Trust Bar - Modern Floating Style */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-6 hidden lg:block">
        <div className="bg-gray-700/80 backdrop-blur-2xl border border-white/20 rounded-3xl py-6 px-10 grid grid-cols-4 gap-8">
          <FeatureItem icon={<Truck className="text-blue-400" />} title="Free Delivery" />
          <FeatureItem icon={<RefreshCw className="text-emerald-400" />} title="Returns" />
          <FeatureItem icon={<ShieldCheck className="text-purple-400" />} title="Secure" />
          <FeatureItem icon={<CreditCard className="text-orange-400" />} title="Installments" />
        </div>
      </div>

    </section>
  );
};

const FeatureItem = ({ icon, title }) => (
  <div className="flex items-center gap-3 text-white group cursor-default">
    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
  </div>
);

export default Slider;