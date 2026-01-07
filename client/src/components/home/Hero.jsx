import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { useSelector } from 'react-redux';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useSelector(state => state.auth);

   const companiesLogo = [
        { name: "Framer", logo: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg", },
        { name: "Huawei", logo: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg", },
        { name: "Instagram", logo: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg", },
        { name: "Microsoft", logo: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg", },
        { name: "Walmart", logo: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg", }
    ];

  return (
    <div>
      {/* Navbar */}
      <nav className=" flex items-center  justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-  text-sm">
        <a href="https://prebuiltui.com">
          {/* Logo SVG */}
          <img src={logo} alt='' width="155" height="40" viewBox="0 0 155 40" fill="none" />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to="/" className="hover:text-green-500 text-lg font-semibold transition">Home</Link>
          <Link to="/feature" className="hover:text-green-500 text-lg ont-semibold transition">Features</Link>
          <Link to="/testimonials" className="hover:text-green-500 text-lg font-semibold transition">Testimonials</Link>
          <Link to="/contact" className="hover:text-green-500 text-lg font-semibold transition">Contact</Link>
        </div>

        <div className="flex gap-2">
  {!user && (
    <>
      <Link
        to="/app?state=register"
        className="hidden md:block px-6 py-2.5 bg-green-500 duration-500 hover:bg-green-700 active:scale-95 transition-all rounded-full"
      >
        Get Started
      </Link>
      <Link
        to="/app?state=login"
        className="hidden md:block px-8 py-2.5 bg-green-500 duration-500 hover:bg-green-700 active:scale-95 transition-all rounded-full"
      >
        Login
      </Link>
    </>
  )}

  {user && (
    <Link
      to="/app"
      className="hidden md:block px-8 py-2.5 bg-green-500 duration-500 hover:bg-green-700 active:scale-95 transition-all rounded-full"
    >
      Dashboard
    </Link>
  )}
</div>


        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      <div className={`fixed inset-0 z-[100] bg-black/40 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/testimonials">Testimonials</Link>
        <Link to="/contact">Contact</Link>
        <button
          onClick={() => setMenuOpen(false)}
          className="active:ring-3  active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-600 hover:bg-green-700 transition  rounded-md flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col pb-10 items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-32 bg-slate-50  text-black">
        <div className="absolute top-28 left-1/4  size-72 blur-[300px] bg-transparent hover:bg-green-500 cursor-pointer transition-all duration-300"></div>
        <div className="absolute top-28 right-1/4  size-72 blur-[300px] bg-transparent hover:bg-green-500 cursor-pointer transition-all duration-300"></div>

        {/* Social proof */}
        <div className="flex items-center mt-40 pb-10">
          <div className="flex -space-x-2 pr-3">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-7 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1" />
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-7 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[2]" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="user3" className="size-7 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user4" className="size-7 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
          </div>
          <div className='p-0 gap-0'>
            <svg width="79" height="16" viewBox="0 0 79 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.06923 1.47645C7.21819 1.0143 7.87205 1.0143 8.02101 1.47645L9.12739 4.90897C9.19397 5.11555 9.38623 5.25558 9.60328 5.25558H13.1921C13.6755 5.25558 13.8775 5.87334 13.4875 6.15896L10.5772 8.29045C10.4034 8.41777 10.3307 8.64213 10.3968 8.84722L11.5068 12.291C11.6555 12.7523 11.1265 13.1342 10.7354 12.8477L7.84056 10.7275C7.66466 10.5987 7.42558 10.5987 7.24968 10.7275L4.3548 12.8477C3.96374 13.1342 3.43477 12.7523 3.58348 12.291L4.69347 8.84722C4.75958 8.64213 4.68686 8.41777 4.51302 8.29045L1.60274 6.15896C1.21276 5.87334 1.41479 5.25558 1.89818 5.25558H5.48696C5.70401 5.25558 5.89627 5.11555 5.96285 4.90897L7.06923 1.47645Z" fill="#9810FA"/>
                <path d="M23.0536 1.47645C23.2026 1.0143 23.8564 1.0143 24.0054 1.47645L25.1118 4.90897C25.1783 5.11555 25.3706 5.25558 25.5877 5.25558H29.1764C29.6598 5.25558 29.8619 5.87334 29.4719 6.15896L26.5616 8.29045C26.3878 8.41777 26.315 8.64213 26.3811 8.84722L27.4911 12.291C27.6398 12.7523 27.1109 13.1342 26.7198 12.8477L23.8249 10.7275C23.649 10.5987 23.41 10.5987 23.2341 10.7275L20.3392 12.8477C19.9481 13.1342 19.4191 12.7523 19.5679 12.291L20.6778 8.84722C20.744 8.64213 20.6712 8.41777 20.4974 8.29045L17.5871 6.15896C17.1971 5.87334 17.3992 5.25558 17.8826 5.25558H21.4713C21.6884 5.25558 21.8806 5.11555 21.9472 4.90897L23.0536 1.47645Z" fill="#9810FA"/>
                <path d="M39.0224 1.47645C39.1713 1.0143 39.8252 1.0143 39.9741 1.47645L41.0805 4.90897C41.1471 5.11555 41.3394 5.25558 41.5564 5.25558H45.1452C45.6286 5.25558 45.8306 5.87334 45.4406 6.15896L42.5303 8.29045C42.3565 8.41777 42.2838 8.64213 42.3499 8.84722L43.4599 12.291C43.6086 12.7523 43.0796 13.1342 42.6886 12.8477L39.7937 10.7275C39.6178 10.5987 39.3787 10.5987 39.2028 10.7275L36.3079 12.8477C35.9169 13.1342 35.3879 12.7523 35.5366 12.291L36.6466 8.84722C36.7127 8.64213 36.64 8.41777 36.4661 8.29045L33.5559 6.15896C33.1659 5.87334 33.3679 5.25558 33.8513 5.25558H37.4401C37.6571 5.25558 37.8494 5.11555 37.916 4.90897L39.0224 1.47645Z" fill="#9810FA"/>
                <path d="M55.0067 1.47645C55.1557 1.0143 55.8096 1.0143 55.9585 1.47645L57.0649 4.90897C57.1315 5.11555 57.3237 5.25558 57.5408 5.25558H61.1296C61.613 5.25558 61.815 5.87334 61.425 6.15896L58.5147 8.29045C58.3409 8.41777 58.2682 8.64213 58.3343 8.84722L59.4443 12.291C59.593 12.7523 59.064 13.1342 58.6729 12.8477L55.7781 10.7275C55.6022 10.5987 55.3631 10.5987 55.1872 10.7275L52.2923 12.8477C51.9012 13.1342 51.3723 12.7523 51.521 12.291L52.631 8.84722C52.6971 8.64213 52.6244 8.41777 52.4505 8.29045L49.5402 6.15896C49.1503 5.87334 49.3523 5.25558 49.8357 5.25558H53.4245C53.6415 5.25558 53.8338 5.11555 53.9004 4.90897L55.0067 1.47645Z" fill="#9810FA"/>
                
                <path d="M70.9794 1.47645C71.1283 1.0143 71.7822 1.0143 71.9312 1.47645L73.0375 4.90897C73.1041 5.11555 73.2964 5.25558 73.5134 5.25558H77.1022C77.5856 5.25558 77.7876 5.87334 77.3977 6.15896L74.4874 8.29045C74.3135 8.41777 74.2408 8.64213 74.3069 8.84722L75.4169 12.291C75.5656 12.7523 75.0367 13.1342 74.6456 12.8477L71.7507 10.7275C71.5748 10.5987 71.3357 10.5987 71.1598 10.7275L68.265 12.8477C67.8739 13.1342 67.3449 12.7523 67.4936 12.291L68.6036 8.84722C68.6697 8.64213 68.597 8.41777 68.4232 8.29045L65.5129 6.15896C65.1229 5.87334 65.3249 5.25558 65.8083 5.25558H69.3971C69.6142 5.25558 69.8064 5.11555 69.873 4.90897L70.9794 1.47645Z" fill="#9810FA"/>
          <svg width="79"  viewBox="0 0 79 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* ...stars path... */}
            </svg>
            </svg>
            
            <p className="text-sm text-gray-700">Used by <span className="font-medium text-gray-">100,000+</span> users</p>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-7xl text-black leading-[68px] md:text-5xl md:leading-[54px] font-medium max-w-3xl text-center">
         Land your dream job with <span className='text-green-500'>AI-powered </span> resumes.
        </h1>
        <p className="text-base from-gray-400 pt-8  text-center text-black max-w-lg">
          Create, edit and download professional resumes with AI-powered assistance.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <Link to='/app' className="hidden md:block px-8 py-3 bg-green-500 duration-500 hover:bg-green-700 active:scale-95 transition-all rounded-full">
         Get Started
        </Link>
          <button className="flex items-center gap-2 border border-green-900 hover:bg-green-950/50 transition rounded-full px-6 h-11">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video">
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
              <rect x="2" y="6" width="14" height="12" rx="2" />
            </svg>
            <span>Try demo</span>
          </button>
        </div>

        {/* Showcase image */}
        {/* <div className='pt-5'> */}
           {/* <style>{`
                .marquee-inner {
                    animation: marqueeScroll 15s linear infinite;
                }

                .marquee-inner-testimonials {
                    animation: marqueeScroll 35s linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}
            </style>
            <h3 className="text-base text-center text-slate-400 pb-10 font-medium">
                Trusting by leading brands, including —
            </h3>
            <div class="overflow-hidden w-full relative max-w-5xl mx-auto select-none">
                <div class="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

                <div class="flex marquee-inner will-change-transform max-w-5xl mx-auto">
                    {[...companiesLogo, ...companiesLogo].map((company, index) => (
                        <img key={index} className="mx-11" src={company.logo} alt={company.name} />
                    ))}
                </div>

                <div class="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </div> */}
  
      </div>
    </div>
  );
}
