import Hero from '../components/home/Hero.jsx'
import HorizontalAbout from '../components/home/HorizontalAbout.jsx'
import CategoriesBento from '../components/home/CategoriesBento.jsx'
import Reels from '../components/home/Reels.jsx'
import BestSellers from '../components/home/BestSellers.jsx'
import Collections from '../components/home/Collections.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import CustomizeCTA from '../components/home/CustomizeCTA.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HorizontalAbout />
      <CategoriesBento />
      <Reels />
      <BestSellers />
      <Collections />
      <Testimonials />
      <CustomizeCTA />
    </>
  )
}