import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../App';
import { Gender } from '../data/shoes';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  gender: Gender;
  femaleAccentColor: string;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, cart, updateQuantity, gender, femaleAccentColor, onCheckout }: CartSidebarProps) {
  const isMale = gender === 'male';
  const total = cart.reduce((sum, item) => sum + (item.shoe.price * item.quantity), 0);

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
              <h2 className={`text-xl font-bold ${isMale ? 'font-serif text-gold-500' : 'text-gray-900'}`}>
                Your Cart
              </h2>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${isMale ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isMale ? 'bg-gray-900 text-gray-700' : 'bg-gray-50 text-gray-300'}`}>
                    <ShoppingCartIcon className="w-8 h-8" />
                  </div>
                  <p className={`${isMale ? 'text-gray-500' : 'text-gray-500'}`}>Your cart is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className={`mt-4 px-6 py-2 uppercase tracking-wide text-sm font-semibold transition-colors
                      ${isMale ? 'text-gold-500 hover:text-gold-400' : 'text-gray-900 hover:text-gray-700'}`}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence mode='popLayout'>
                  {cart.map(item => (
                    <motion.div 
                      key={item.shoe.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`flex gap-4 p-4 rounded-2xl ${isMale ? 'bg-gray-900' : 'bg-gray-50'}`}
                    >
                      <div className={`w-20 h-20 overflow-hidden ${isMale ? 'rounded-none' : 'rounded-xl'}`}>
                        <img src={item.shoe.image} alt={item.shoe.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className={`font-medium text-sm pr-4 line-clamp-2 ${isMale ? 'text-gray-200' : 'text-gray-900'}`}>
                              {item.shoe.name}
                            </h4>
                            <button onClick={() => updateQuantity(item.shoe.id, -item.quantity)} className={`text-gray-400 hover:text-red-500 transition-colors`}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className={`text-xs mt-1 ${isMale ? 'text-gold-600' : 'text-gray-500'}`}>₹{item.shoe.price}</p>
                        </div>
                        <div className="flex items-center space-x-3 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.shoe.id, -1)}
                            className={`p-1 rounded-full ${isMale ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-white text-gray-500 shadow-sm border border-gray-200'}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className={`text-sm font-medium ${isMale ? 'text-white' : 'text-gray-900'}`}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.shoe.id, 1)}
                            className={`p-1 rounded-full ${isMale ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-white text-gray-500 shadow-sm border border-gray-200'}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className={`p-6 border-t shrink-0 ${isMale ? 'border-gray-800 bg-black' : 'border-gray-100 bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-gray-500 font-medium`}>Subtotal</span>
                  <span className={`text-2xl font-bold ${isMale ? 'text-gold-500' : 'text-gray-900'}`}>
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className={`w-full py-4 uppercase tracking-wider font-bold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]
                    ${isMale 
                      ? 'bg-gold-500 text-black hover:bg-gold-400 rounded-none' 
                      : 'text-white rounded-full shadow-lg hover:shadow-xl'
                    }`}
                  style={!isMale ? { backgroundColor: femaleAccentColor } : {}}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
