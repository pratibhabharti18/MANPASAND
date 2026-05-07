import { Search, ShoppingBag, User, LogOut, Heart } from 'lucide-react';
import { Gender } from '../data/shoes';

interface NavbarProps {
  gender: Gender;
  setGender: (g: Gender) => void;
  cartCount: number;
  wishlistCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  femaleAccentColor: string;
  user: { name: string; email: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Navbar({ gender, setGender, cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen, searchQuery, setSearchQuery, femaleAccentColor, user, onLoginClick, onLogout }: NavbarProps) {
  const isMale = gender === 'male';

  return (
    <nav className={`fixed top-0 w-full z-40 transition-colors duration-700 ${isMale ? 'bg-black-matte border-b border-white/10' : 'bg-white/80 backdrop-blur-md border-b border-pink-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className={`text-2xl font-black tracking-widest ${isMale ? 'text-gold-500 font-serif' : 'text-gray-900 font-sans'}`}>
              MANPASAND
            </span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className={`relative w-full rounded-full flex items-center transition-all ${isMale ? 'bg-gray-900 border border-gray-800 focus-within:border-gold-500' : 'bg-gray-100 focus-within:bg-white focus-within:shadow-md'}`}>
               <Search className={`absolute left-3 w-4 h-4 ${isMale ? 'text-gray-500' : 'text-gray-400'}`} />
               <input 
                 type="text" 
                 placeholder="Search collection..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className={`w-full pl-10 pr-4 py-2 bg-transparent outline-none text-sm ${isMale ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
               />
            </div>
          </div>

          {/* Right Actions & Gender Toggle */}
          <div className="flex items-center space-x-6">
            
            {/* Gender Toggle */}
            <div className="toggle-wrapper">
              <div 
                onClick={() => setGender('male')}
                className={`toggle-btn ${isMale ? 'active-male' : 'text-gray-500'}`}
              >
                Male
              </div>
              <div 
                onClick={() => setGender('female')}
                className={`toggle-btn ${!isMale ? 'active-female' : 'text-gray-500'}`}
              >
                Female
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className={`hidden sm:block text-sm font-medium ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
                    Hi, {user.name.split(' ')[0]}
                  </span>
                  <button onClick={onLogout} title="Logout" className={`p-2 transition-colors ${isMale ? 'text-gray-400 hover:text-gold-500' : 'text-gray-600 hover:text-gray-900'}`}>
                    <LogOut strokeWidth={1.5} className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button onClick={onLoginClick} title="Login / Register" className={`p-2 transition-colors ${isMale ? 'text-gray-400 hover:text-gold-500' : 'text-gray-600 hover:text-gray-900'}`}>
                  <User strokeWidth={1.5} className="w-6 h-6" />
                </button>
              )}
              
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className={`p-2 relative transition-colors ${isMale ? 'text-gray-400 hover:text-gold-500' : 'text-gray-600 hover:text-pink-500'}`}
              >
                <Heart strokeWidth={1.5} className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span 
                    className={`absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full ${isMale ? 'bg-gold-500 text-black' : ''}`}
                    style={!isMale ? { backgroundColor: femaleAccentColor } : {}}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className={`p-2 relative transition-colors ${isMale ? 'text-gray-400 hover:text-gold-500' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ShoppingBag strokeWidth={1.5} className="w-6 h-6" />
                {cartCount > 0 && (
                  <span 
                    className={`absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full ${isMale ? 'bg-gold-500 text-black' : ''}`}
                    style={!isMale ? { backgroundColor: femaleAccentColor } : {}}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden pb-4">
           <div className={`relative w-full rounded-full flex items-center transition-all ${isMale ? 'bg-gray-900 border border-gray-800 focus-within:border-gold-500' : 'bg-gray-100 focus-within:bg-white focus-within:shadow-md'}`}>
               <Search className={`absolute left-3 w-4 h-4 ${isMale ? 'text-gray-500' : 'text-gray-400'}`} />
               <input 
                 type="text" 
                 placeholder="Search collection..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className={`w-full pl-10 pr-4 py-2 bg-transparent outline-none text-sm ${isMale ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
               />
            </div>
        </div>
      </div>
    </nav>
  );
}
