
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ContactInfo = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Visit Our Store
          </h2>
          <p className="text-gray-600 text-lg">
            Come see our beautiful collection in person
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-xl border-0">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Store Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-full p-3">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                        <p className="text-gray-600 leading-relaxed">
                          ቦሌ ቡልቡላ 93 ማዞሪያ<br />
                          ቅዱስ ብዙአየሁ የገበያ ማዕከል<br />
                          2ተኛ ፎቅ የሱቅ ቁጥር 42
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-3">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Phone Numbers</h4>
                        <p className="text-gray-600">
                          0940076225<br />
                          0941485880
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Telegram</h4>
                        <p className="text-gray-600 mb-2">Get updates and special offers</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          View in Telegram
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Store Hours
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Saturday</span>
                      <span className="font-medium">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 text-center">
                      <strong>Free consultation</strong> available for custom designs and alterations
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
