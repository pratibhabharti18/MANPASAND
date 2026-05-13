import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Shoe, Gender } from '../data/shoes';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Shoe[];
  onRemove: (id: string) => void;
  onMoveToCart: (shoe: Shoe) => void;
  gender: Gender;
  femaleAccentColor: string;
}

export default function WishlistSidebar({ isOpen, onClose, wishlist, onRemove, onMoveToCart, gender, femaleAccentColor }: WishlistSidebarProps) {
  const isMale = gender === 'male';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] shadow-2xl flex flex-col
              ${isMale ? 'bg-black-matte border-l border-gray-800' : 'bg-white'}`}
          >
            {/* Header */}
            <div className={`p-6 flex items-center shrink-0 justify-between border-b ${isMale ? 'border-gray-800' : 'border-gray-100'}`}>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${isMale ? 'font-serif text-gold-500' : 'text-gray-900'}`}>
                <Heart className="w-5 h-5 fill-current" />
                Your Wishlist
              </h2>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${isMale ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isMale ? 'bg-gray-900 text-gray-700' : 'bg-gray-50 text-gray-300'}`}>
                    <Heart className="w-8 h-8" />
                  </div>
                  <p className={`${isMale ? 'text-gray-500' : 'text-gray-500'}`}>Your wishlist is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className={`mt-4 px-6 py-2 uppercase tracking-wide text-sm font-semibold transition-colors
                      ${isMale ? 'text-gold-500 hover:text-gold-400' : 'text-gray-900 hover:text-gray-700'}`}
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <AnimatePresence mode='popLayout'>
                  {wishlist.map(shoe => (
                    <motion.div 
                      key={shoe.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`flex gap-4 p-4 rounded-2xl group ${isMale ? 'bg-gray-900' : 'bg-gray-50'}`}
                    >
                      <div className={`w-20 h-20 overflow-hidden ${isMale ? 'rounded-none' : 'rounded-xl'}`}>
                        <img src={shoe.image} alt={shoe.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className={`font-medium text-sm pr-4 line-clamp-2 ${isMale ? 'text-gray-200' : 'text-gray-900'}`}>
                              {shoe.name}
                            </h4>
                            <button onClick={() => onRemove(shoe.id)} className={`text-gray-400 hover:text-red-500 transition-colors`}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className={`text-xs mt-1 ${isMale ? 'text-gold-600' : 'text-gray-500'}`}>₹{shoe.price}</p>
                        </div>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => onMoveToCart(shoe)}
                            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all
                              ${isMale 
                                ? 'bg-gold-500 text-black hover:bg-gold-400 rounded-none' 
                                : 'text-white shadow-sm hover:shadow-md'
                              }`}
                            style={!isMale ? { backgroundColor: femaleAccentColor } : {}}
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
