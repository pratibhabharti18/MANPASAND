import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Shoe, Gender } from '../data/shoes';

interface ProductCardProps {
  key?: string | number;
  shoe: Shoe;
  gender: Gender;
  onAdd: () => void;
  femaleAccentColor: string;
}

export default function ProductCard({ shoe, gender, onAdd, femaleAccentColor }: ProductCardProps) {
  const isMale = gender === 'male';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`card group relative overflow-hidden flex flex-col transition-all duration-300`}
    >
      {/* Image Container */}
      <div className={`relative aspect-square overflow-hidden bg-gray-100 ${isMale ? 'rounded-none' : 'rounded-t-3xl'}`}>
        <img 
          src={shoe.image} 
          alt={shoe.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay Add to Cart button (shows on hover for desktop) */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className={`btn-primary flex items-center space-x-2 px-6 py-3 uppercase tracking-wider text-sm transition-colors`}
            style={!isMale ? { backgroundColor: femaleAccentColor } : {}}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs uppercase tracking-wider mb-2 font-semibold text-gray-500">
          {shoe.category} {shoe.color && !isMale && `· ${shoe.color}`}
          {shoe.color && !isMale && (
              <span className="inline-block w-2.5 h-2.5 rounded-full ml-2 shadow-sm align-middle" style={{backgroundColor: shoe.color.toLowerCase()}} />
          )}
        </div>
        <h3 className={`text-lg mb-1 flex-1 ${isMale ? 'font-serif text-gray-200' : 'font-medium text-gray-900'}`}>
          {shoe.name}
        </h3>
        <div className="flex justify-between items-center mt-3">
          <span className={`text-xl font-bold ${isMale ? 'text-gold-500' : 'text-gray-900'}`}>
            ₹{shoe.price}
          </span>
          <button 
            onClick={onAdd}
            className={`md:hidden p-2 rounded-full ${isMale ? 'bg-gray-800 text-gold-500' : 'bg-gray-100 text-gray-900'}`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

    </motion.div>
  );
}
