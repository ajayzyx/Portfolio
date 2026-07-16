import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/hero';
import { Work } from '@/components/sections/work';
import { Loader } from '@/components/ui/loader';

// Below-the-fold sections are code-split to keep the initial payload minimal.
const About = dynamic(() =>
  import('@/components/sections/about').then((m) => m.About)
);
const Experience = dynamic(() =>
  import('@/components/sections/experience').then((m) => m.Experience)
);
const Contact = dynamic(() =>
  import('@/components/sections/contact').then((m) => m.Contact)
);

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <Work />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
