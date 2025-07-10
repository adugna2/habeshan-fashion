
import { MapPin } from "lucide-react";

const Map = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center relative overflow-hidden">
      {/* Placeholder Map */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
      
      {/* Map Marker */}
      <div className="relative z-10 text-center">
        <div className="bg-rose-500 rounded-full p-3 mx-auto mb-3 animate-bounce">
          <MapPin className="h-6 w-6 text-white" />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-1">Our Store Location</h3>
          <p className="text-sm text-gray-600">
            ቦሌ ቡልቡላ 93 ማዞሪያ<br />
            ቅዱስ ብዙአየሁ የገበያ ማዕከል
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-blue-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-300 rounded-full opacity-50"></div>
      <div className="absolute top-1/2 right-8 w-4 h-4 bg-yellow-300 rounded-full opacity-50"></div>
    </div>
  );
};

export default Map;
