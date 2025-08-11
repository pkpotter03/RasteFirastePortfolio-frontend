import Lottie from 'lottie-react';
import loadingAnimation from '../assets/Traveler.json';

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 text-white py-8">
      <div className="w-64 h-64">
        <Lottie animationData={loadingAnimation} loop autoplay />
      </div>
      <p className="text-sm text-gray-300 text-center">
        It might take less than a minute... Please wait...
      </p>
    </div>
  );
}

export default Loader;
