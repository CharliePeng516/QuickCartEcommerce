import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import AboutContent from '@/components/AboutContent';
import Developer from '@/components/Developer';

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us - QuickCart</title>
        <meta
          name="description"
          content="Learn more about QuickCart, your one-stop shop for the latest electronics."
        />
        <meta
          name="keywords"
          content="About Us, QuickCart, electronics, shopping"
        />
      </Head>
      <Navbar />
      <div className="bg-gray-100">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row md:flex-nowrap">
            <div className="md:w-1/3 p-4 min-w-0">
              <Developer />
            </div>
            <div className="md:w-2/3 p-4 min-w-0">
              <AboutContent />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
