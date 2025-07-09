import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

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
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              About Us
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Welcome to QuickCart, your number one source for all things
              electronics. We're dedicated to giving you the very best of
              gadgets, with a focus on quality, customer service, and
              uniqueness.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2024, QuickCart has come a long way from its
              beginnings. When we first started out, our passion for providing
              the best equipment for our fellow tech enthusiasts drove us to do
              intense research, and gave us the impetus to turn hard work and
              inspiration into to a booming online store. We now serve
              customers all over the world, and are thrilled to be a part of the
              quirky, eco-friendly, fair trade wing of the electronics
              industry.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We hope you enjoy our products as much as we enjoy offering them
              to you. If you have any questions or comments, please don't
              hesitate to contact us.
            </p>
            <div className="text-center mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Team
              </h2>
              <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-1/3 p-4">
                  <div className="text-center">
                    <img
                      src="https://i.pravatar.cc/150?img=1"
                      alt="Team Member 1"
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">
                      John Doe
                    </h3>
                    <p className="text-gray-600">CEO & Founder</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-4">
                  <div className="text-center">
                    <img
                      src="https://i.pravatar.cc/150?img=2"
                      alt="Team Member 2"
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Jane Smith
                    </h3>
                    <p className="text-gray-600">CTO</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-4">
                  <div className="text-center">
                    <img
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Team Member 3"
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Peter Jones
                    </h3>
                    <p className="text-gray-600">Lead Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
