import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Gender, Shoe, SHOES, MALE_CATEGORIES, FEMALE_CATEGORIES, FEMALE_COLORS } from './data/shoes';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export interface CartItem {
  shoe: Shoe;
  quantity: number;
}

export default function App() {
  const [gender, setGender] = useState<Gender>('female');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shoe_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeColor, setActiveColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [activeSize, setActiveSize] = useState<number | 'All'>('All');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [activeMaterial, setActiveMaterial] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Auth State
  const [user, setUser] = useState<{name: string; email: string} | null>(() => {
    const saved = localStorage.getItem('manpasand_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('shoe_cart', JSON.stringify(cart));
  }, [cart]);

  // Reset filters when gender changes
  useEffect(() => {
    setActiveCategory('All');
    setActiveColor('All');
    setSearchQuery('');
    setSortBy('featured');
    setActiveSize('All');
    setActiveBrand('All');
    setActiveMaterial('All');
  }, [gender]);

  const addToCart = (shoe: Shoe) => {
    setCart(prev => {
      const existing = prev.find(item => item.shoe.id === shoe.id);
      if (existing) {
        return prev.map(item => item.shoe.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { shoe, quantity: 1 }];
    });
    toast.success(`${shoe.name} added to cart!`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.shoe.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const availableSizes = Array.from(new Set(SHOES.filter(s => s.gender === gender).flatMap(s => s.sizes))).sort((a, b) => a - b);
  const availableBrands = Array.from(new Set(SHOES.filter(s => s.gender === gender).map(s => s.brand))).sort();
  const availableMaterials = Array.from(new Set(SHOES.filter(s => s.gender === gender).map(s => s.material))).sort();

  let filteredShoes = SHOES.filter(shoe => {
    if (shoe.gender !== gender) return false;
    if (activeCategory !== 'All' && shoe.category !== activeCategory) return false;
    if (gender === 'female' && activeColor !== 'All' && shoe.color !== activeColor) return false;
    if (searchQuery && !shoe.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    if (activeSize !== 'All' && !shoe.sizes.includes(activeSize)) return false;
    if (activeBrand !== 'All' && shoe.brand !== activeBrand) return false;
    if (activeMaterial !== 'All' && shoe.material !== activeMaterial) return false;
    
    return true;
  });

  filteredShoes = filteredShoes.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    // Default to popularity
    return b.popularity - a.popularity;
  });

  const categories = gender === 'male' ? MALE_CATEGORIES : FEMALE_CATEGORIES;
  
  // Determine female color theme
  const activeColorObj = FEMALE_COLORS.find(c => c.id === activeColor);
  const femaleBgColor = activeColor === 'All' ? 'bg-pink-soft' : 'bg-opacity-20';
  const femaleBgStyle = activeColor !== 'All' && activeColorObj ? { backgroundColor: `${activeColorObj.hex}33` } : {}; // 33 for 20% opacity hex
  const femaleAccentColor = activeColor !== 'All' && activeColorObj ? activeColorObj.hex : '#f472b6'; // Default pink-400

  const handleLogin = (user: { name: string; email: string }) => {
    setUser(user);
    localStorage.setItem('manpasand_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('manpasand_current_user');
    toast.success('Logged out successfully');
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-700 ease-in-out flex flex-col overflow-x-hidden
        ${gender === 'male' ? 'male-theme' : 'female-theme'}
      `}
      style={gender === 'female' ? femaleBgStyle : {}}
    >
      <Toaster position="top-center" toastOptions={{
        style: {
          background: gender === 'male' ? '#1E1E1E' : '#fff',
          color: gender === 'male' ? '#fff' : '#333',
        }
      }} />
      <Navbar 
        gender={gender} 
        setGender={setGender} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        femaleAccentColor={femaleAccentColor}
        user={user}
        onLoginClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        
        <header className="mb-12 text-center">
          <motion.h1 
            key={gender}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-6xl font-bold tracking-tight mb-4 ${
              gender === 'male' ? 'font-serif text-gold-500' : 'font-outfit'
            }`}
          >
            {gender === 'male' ? 'The Classic Collection' : 'Elegance Redefined'}
          </motion.h1>
          <motion.p 
            key={gender + 'p'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-lg max-w-2xl mx-auto ${gender === 'male' ? 'text-gray-400 font-serif italic' : 'text-gray-600'}`}
          >
            {gender === 'male' 
              ? 'Discover our premium range of luxury footwear designed for the modern gentleman.' 
              : 'Step into comfort and style with our curated selection of women\'s footwear.'}
          </motion.p>
        </header>

        {/* Main Filters Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full lg:w-auto">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                gender === 'male'
                  ? `border ${activeCategory === 'All' ? 'border-gold-500 text-gold-500' : 'border-gray-700 text-gray-400 hover:border-gold-400'}`
                  : `rounded-full ${activeCategory === 'All' ? 'bg-gray-900 text-white' : 'bg-white shadow text-gray-600 hover:bg-gray-50'}`
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  gender === 'male'
                    ? `border ${activeCategory === cat ? 'border-gold-500 text-gold-500' : 'border-gray-700 text-gray-400 hover:border-gold-400'}`
                    : `rounded-full ${activeCategory === cat ? 'bg-gray-900 text-white' : 'bg-white shadow text-gray-600 hover:bg-gray-50'}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            {/* Advanced Filters Toggle */}
            <button
               onClick={() => setShowFilters(!showFilters)}
               className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                 gender === 'male' ? 'text-gray-400 hover:text-gold-500' : 'text-gray-600 hover:text-gray-900'
               }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2 outline-none text-sm font-medium transition-all cursor-pointer ${
                  gender === 'male'
                    ? 'bg-transparent border border-gray-700 text-gray-300 focus:border-gold-500 default:bg-black-matte'
                    : 'bg-white shadow rounded-full text-gray-700 focus:ring-2 focus:ring-pink-200'
                }`}
              >
                <option value="featured" className={gender === 'male' ? 'bg-black-matte text-white' : ''}>Featured</option>
                <option value="newest" className={gender === 'male' ? 'bg-black-matte text-white' : ''}>New Arrivals</option>
                <option value="price-low" className={gender === 'male' ? 'bg-black-matte text-white' : ''}>Price: Low to High</option>
                <option value="price-high" className={gender === 'male' ? 'bg-black-matte text-white' : ''}>Price: High to Low</option>
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${gender === 'male' ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>

        {/* Advanced Filters Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className={`p-6 flex flex-wrap gap-8 items-start ${
                gender === 'male' ? 'border border-gray-800 bg-gray-900/30' : 'bg-white/60 rounded-3xl backdrop-blur-md shadow-sm'
              }`}>
                
                {/* Size Filter */}
                <div>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${gender === 'male' ? 'text-gray-500' : 'text-gray-400'}`}>Size</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setActiveSize('All')}
                      className={`w-10 h-10 flex items-center justify-center text-sm transition-all ${
                        gender === 'male'
                          ? `border ${activeSize === 'All' ? 'border-gold-500 text-gold-500' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`
                          : `rounded-full ${activeSize === 'All' ? 'bg-gray-900 text-white' : 'bg-white shadow-sm text-gray-600 hover:bg-gray-50'}`
                      }`}
                    >All</button>
                    {availableSizes.map(size => (
                       <button 
                         key={size}
                         onClick={() => setActiveSize(size)}
                         className={`w-10 h-10 flex items-center justify-center text-sm transition-all ${
                           gender === 'male'
                             ? `border ${activeSize === size ? 'border-gold-500 text-gold-500' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`
                             : `rounded-full ${activeSize === size ? 'bg-gray-900 text-white' : 'bg-white shadow-sm text-gray-600 hover:bg-gray-50'}`
                         }`}
                       >{size}</button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${gender === 'male' ? 'text-gray-500' : 'text-gray-400'}`}>Brand</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setActiveBrand('All')}
                      className={`px-4 py-2 text-sm transition-all ${
                        gender === 'male'
                          ? `border ${activeBrand === 'All' ? 'border-gold-500 text-gold-500' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`
                          : `rounded-full ${activeBrand === 'All' ? 'bg-gray-900 text-white' : 'bg-white shadow-sm text-gray-600 hover:bg-gray-50'}`
                      }`}
                    >All</button>
                    {availableBrands.map(brand => (
                      <button 
                        key={brand}
                        onClick={() => setActiveBrand(brand)}
                        className={`px-4 py-2 text-sm transition-all ${
                          gender === 'male'
                            ? `border ${activeBrand === brand ? 'border-gold-500 text-gold-500' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`
                            : `rounded-full ${activeBrand === brand ? 'bg-gray-900 text-white' : 'bg-white shadow-sm text-gray-600 hover:bg-gray-50'}`
                        }`}
                      >{brand}</button>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${gender === 'male' ? 'text-gray-500' : 'text-gray-400'}`}>Material</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setActiveMaterial('All')}
                      className={`px-4 py-2 text-sm transition-all ${
                        gender === 'male'
                          ? `border ${activeMaterial === 'All' ? 'border-gold-500 text-gold-500' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`
                          : `rounded-full ${activeMaterial === 'All' ? 'bg-gray-900 text-white' : 'bg-white shadow-sm text-gray-600 hover:bg-gray-50'}`
                      }`}
                    >All</button>
                    {availableMaterials.map(material => (
                      <button 
                        key={material}
                        onClick={() => setActiveMaterial(material)}
                        className={`px-4 py-2 text-sm transition-all ${
                          gender === 'male'
                            ? `border ${activeMaterial === material ? 'border-gold-500 text-gold-500' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`
                            : `rounded-full ${activeMaterial === material ? 'bg-gray-900 text-white' : 'bg-white shadow-sm text-gray-600 hover:bg-gray-50'}`
                        }`}
                      >{material}</button>
                    ))}
                  </div>
                </div>

                 {/* Female Colors Row (moved inside advanced filters for female) */}
                 {gender === 'female' && (
                  <div>
                    <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 text-gray-400`}>Color</h4>
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        onClick={() => setActiveColor('All')}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center text-xs
                          ${activeColor === 'All' ? 'border-gray-900 bg-gray-100 text-gray-900 font-bold' : 'border-transparent text-gray-500 bg-white shadow-sm'}`}
                      >
                        All
                      </button>
                      {FEMALE_COLORS.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setActiveColor(c.id)}
                          title={c.id}
                          className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 shadow-sm ${activeColor === c.id ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Summary */}
        {(activeSize !== 'All' || activeBrand !== 'All' || activeMaterial !== 'All' || (gender === 'female' && activeColor !== 'All')) && (
          <div className="flex flex-wrap gap-2 mb-8 items-center">
             <span className={`text-sm mr-2 ${gender === 'male' ? 'text-gray-500' : 'text-gray-400'}`}>Active Filters:</span>
             {activeSize !== 'All' && (
               <div className={`px-3 py-1 text-xs font-medium flex items-center gap-2 ${gender === 'male' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700 rounded-full'}`}>
                 Size {activeSize} <button onClick={() => setActiveSize('All')} className="hover:text-red-500">&times;</button>
               </div>
             )}
             {activeBrand !== 'All' && (
               <div className={`px-3 py-1 text-xs font-medium flex items-center gap-2 ${gender === 'male' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700 rounded-full'}`}>
                 {activeBrand} <button onClick={() => setActiveBrand('All')} className="hover:text-red-500">&times;</button>
               </div>
             )}
             {activeMaterial !== 'All' && (
               <div className={`px-3 py-1 text-xs font-medium flex items-center gap-2 ${gender === 'male' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700 rounded-full'}`}>
                 {activeMaterial} <button onClick={() => setActiveMaterial('All')} className="hover:text-red-500">&times;</button>
               </div>
             )}
             {gender === 'female' && activeColor !== 'All' && (
               <div className={`px-3 py-1 text-xs font-medium flex items-center gap-2 bg-gray-200 text-gray-700 rounded-full`}>
                 <span className="w-2 h-2 rounded-full" style={{backgroundColor: FEMALE_COLORS.find(c => c.id === activeColor)?.hex}}></span>
                 {activeColor} <button onClick={() => setActiveColor('All')} className="hover:text-red-500">&times;</button>
               </div>
             )}
             <button
               onClick={() => {
                 setActiveSize('All');
                 setActiveBrand('All');
                 setActiveMaterial('All');
                 if (gender === 'female') setActiveColor('All');
               }}
               className={`text-xs ml-2 hover:underline ${gender === 'male' ? 'text-gold-500' : 'text-pink-500'}`}
             >
               Clear All
             </button>
          </div>
        )}

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredShoes.map(shoe => (
              <ProductCard 
                key={shoe.id}
                shoe={shoe} 
                gender={gender} 
                onAdd={() => addToCart(shoe)} 
                femaleAccentColor={femaleAccentColor}
              />
            ))}
          </AnimatePresence>
          {filteredShoes.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
              No products found matching your criteria.
            </div>
          )}
        </motion.div>
      </main>

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateCartQuantity}
        gender={gender}
        femaleAccentColor={femaleAccentColor}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        gender={gender}
        cart={cart}
        onSuccess={() => setCart([])}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        gender={gender}
        onLogin={handleLogin}
      />
    </div>
  );
}
