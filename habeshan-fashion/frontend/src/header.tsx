import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Search, Phone, Facebook, Twitter, Youtube } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-slate-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Facebook className="w-4 h-4" />
              <Twitter className="w-4 h-4" />
              <Youtube className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+251-115-517011</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="bg-gray-600 border-gray-500 text-white hover:bg-gray-500">
              Volunteerism
            </Button>
            <div className="flex items-center space-x-2">
              <span>En</span>
              <span>|</span>
              <span>አማ</span>
              <span>|</span>
              <span>Oro</span>
              <span>|</span>
              <span>ትግ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logos */}
            <div className="flex items-center space-x-4">
              <img 
                src="https://ext.same-assets.com/3047121243/2271168089.png" 
                alt="FDRE Logo" 
                className="h-16 w-auto"
              />
              <img 
                src="https://ext.same-assets.com/3047121243/3382473928.png" 
                alt="Ministry of Health Logo" 
                className="h-16 w-auto"
              />
            </div>

            {/* Navigation */}
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-8">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-teal-600">
                    ABOUT
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 w-64">
                    <div className="space-y-2">
                      <a href="#" className="block hover:text-teal-600">Mission, Vision and Objectives</a>
                      <a href="#" className="block hover:text-teal-600">Organizational Structure</a>
                      <a href="#" className="block hover:text-teal-600">Profiles</a>
                      <a href="#" className="block hover:text-teal-600">Executive Offices</a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-teal-600">
                    PROGRAMS
                  </NavigationMenuTrigger>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-teal-600">
                    PILLARS
                  </NavigationMenuTrigger>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-teal-600">
                    RESOURCES
                  </NavigationMenuTrigger>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-teal-600">
                    NEWS
                  </NavigationMenuTrigger>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button className="bg-slate-400 hover:bg-slate-500 text-white">
                    CONTACT
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search */}
            <div className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}