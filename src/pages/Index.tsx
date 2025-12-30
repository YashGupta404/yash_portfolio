import { Helmet } from 'react-helmet-async';
import CinemaPortfolio from '@/components/CinemaPortfolio';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Yash Gupta's Portfolio | A Cinematic Digital Experience</title>
        <meta name="description" content="Step into a vintage cinema theater and explore an immersive portfolio experience. Watch the curtains unfold and discover creative work presented as movie reels." />
      </Helmet>
      <CinemaPortfolio />
    </>
  );
};

export default Index;
