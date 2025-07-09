import LinyiPengImage from '@/assets/linyi-peng.jpg';

const Developer = () => {
  return (
    <div className="text-center mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Developer
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="w-full p-4">
          <div className="text-center">
            <img
              src={LinyiPengImage.src}
              alt="Linyi Peng"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Linyi Peng
            </h3>
            <p className="text-gray-600 break-words">
              <a
                href="https://www.linkedin.com/in/linyi-peng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-gray-600 break-words">
              <a
                href="mailto:charliepeng516@gmail.com"
                className="text-blue-500 hover:underline"
              >
                charliepeng516@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
