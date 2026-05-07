import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Smartphone, CreditCard, Banknote } from 'lucide-react';
import React, { useState } from 'react';
import { CartItem } from '../App';
import { Gender } from '../data/shoes';
import toast from 'react-hot-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: Gender;
  cart: CartItem[];
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, gender, cart, onSuccess }: CheckoutModalProps) {
  const isMale = gender === 'male';
  const total = cart.reduce((sum, item) => sum + (item.shoe.price * item.quantity), 0);
  
  const [step, setStep] = useState<'form' | 'processing' | 'success' | 'upi-payment'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'upi') {
      setStep('upi-payment');
    } else {
      setStep('processing');
      // Simulate payment success
      setTimeout(() => {
        setStep('success');
        toast.success('Payment Successful!');
        setTimeout(() => {
          onSuccess();
          onClose();
          // Reset after close animation
          setTimeout(() => setStep('form'), 500);
        }, 2500);
      }, 2000);
    }
  };

  const handleUpiSuccess = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      toast.success('Payment Verified!');
      setTimeout(() => {
        onSuccess();
        onClose();
        setTimeout(() => setStep('form'), 500);
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === 'processing' ? undefined : onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-lg overflow-hidden shadow-2xl 
              ${isMale ? 'bg-black-matte border border-gray-800 rounded-none' : 'bg-white rounded-3xl'}`}
          >
            {/* Header */}
            <div className={`p-6 border-b flex justify-between items-center ${isMale ? 'border-gray-800' : 'border-gray-100'}`}>
              <h2 className={`text-xl font-bold ${isMale ? 'font-serif text-gold-500' : 'text-gray-900'}`}>
                {step === 'form' ? 'Checkout' : step === 'processing' ? 'Processing Payment' : 'Order Confirmed'}
              </h2>
              {step === 'form' && (
                <button onClick={onClose} className={`text-gray-400 hover:text-gray-600 transition-colors`}>
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 max-h-[80vh] flex-1 overflow-y-auto w-full">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isMale ? 'text-gray-500' : 'text-gray-400'}`}>
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={item.shoe.id} className="flex justify-between text-sm">
                          <span className={isMale ? 'text-gray-400' : 'text-gray-600'}>
                            {item.quantity}x {item.shoe.name}
                          </span>
                          <span className={isMale ? 'text-gold-600' : 'text-gray-900'}>
                            ₹{(item.shoe.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className={`pt-3 mt-3 border-t flex justify-between font-bold ${isMale ? 'border-gray-800 text-white' : 'border-gray-200 text-gray-900'}`}>
                        <span>Total</span>
                        <span className={isMale ? 'text-gold-500' : ''}>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${isMale ? 'text-gray-500' : 'text-gray-400'}`}>
                      Shipping Info
                    </h3>
                    
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name" 
                        className={`w-full px-4 py-3 text-sm transition-colors outline-none focus:ring-2
                          ${isMale 
                            ? 'bg-gray-900 border-gray-800 text-white focus:ring-gold-500/50 rounded-none' 
                            : 'bg-gray-50 border-transparent focus:bg-white focus:ring-pink-400/50 rounded-xl'}`}
                      />
                    </div>
                    <div>
                      <textarea 
                        required
                        rows={2}
                        placeholder="Address" 
                        className={`w-full px-4 py-3 text-sm transition-colors outline-none focus:ring-2 resize-none
                          ${isMale 
                            ? 'bg-gray-900 border-gray-800 text-white focus:ring-gold-500/50 rounded-none' 
                            : 'bg-gray-50 border-transparent focus:bg-white focus:ring-pink-400/50 rounded-xl'}`}
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        required
                        placeholder="Phone Number" 
                        className={`w-full px-4 py-3 text-sm transition-colors outline-none focus:ring-2
                          ${isMale 
                            ? 'bg-gray-900 border-gray-800 text-white focus:ring-gold-500/50 rounded-none' 
                            : 'bg-gray-50 border-transparent focus:bg-white focus:ring-pink-400/50 rounded-xl'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${isMale ? 'text-gray-500' : 'text-gray-400'}`}>
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === 'upi' ? (isMale ? 'border-gold-500 bg-gold-500/10' : 'border-gray-900 bg-gray-50') : (isMale ? 'border-gray-800' : 'border-gray-200')
                      }`}>
                        <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="hidden" />
                        <Smartphone className={`w-5 h-5 mr-3 ${paymentMethod === 'upi' ? (isMale ? 'text-gold-500' : 'text-gray-900') : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${isMale ? 'text-white' : 'text-gray-900'}`}>UPI</span>
                      </label>
                      
                      <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === 'card' ? (isMale ? 'border-gold-500 bg-gold-500/10' : 'border-gray-900 bg-gray-50') : (isMale ? 'border-gray-800' : 'border-gray-200')
                      }`}>
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="hidden" />
                        <CreditCard className={`w-5 h-5 mr-3 ${paymentMethod === 'card' ? (isMale ? 'text-gold-500' : 'text-gray-900') : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${isMale ? 'text-white' : 'text-gray-900'}`}>Credit/Debit Card</span>
                      </label>
                      
                      <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === 'cod' ? (isMale ? 'border-gold-500 bg-gold-500/10' : 'border-gray-900 bg-gray-50') : (isMale ? 'border-gray-800' : 'border-gray-200')
                      }`}>
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                        <Banknote className={`w-5 h-5 mr-3 ${paymentMethod === 'cod' ? (isMale ? 'text-gold-500' : 'text-gray-900') : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${isMale ? 'text-white' : 'text-gray-900'}`}>Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 mt-8 uppercase tracking-wider font-bold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]
                      ${isMale 
                        ? 'bg-gold-500 text-black hover:bg-gold-400 rounded-none' 
                        : 'bg-gray-900 text-white rounded-xl shadow-lg hover:bg-black'
                      }`}
                  >
                    Pay ₹{total.toFixed(2)}
                  </button>
                </form>
              ) : step === 'upi-payment' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <h3 className={`text-xl font-bold mb-4 ${isMale ? 'font-serif text-white' : 'text-gray-900'}`}>
                    Scan to Pay
                  </h3>
                  <div className={`p-4 bg-white rounded-xl shadow-lg border-2 mb-6 flex justify-center ${isMale ? 'border-gold-500/30' : 'border-gray-100'}`}>
                    <img src="https://files.aistudio.google.com/resources/0eeb762ecdbd44bc8f3c7eaac64ba9bb.jpg" alt="UPI QR Code" className="w-64 h-64 object-contain rounded-lg" referrerPolicy="no-referrer" />
                  </div>
                  <p className={`mb-6 ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                    Open any UPI app (GPay, PhonePe, Paytm) to scan and pay <b>₹{total.toFixed(2)}</b>
                  </p>
                  <div className="w-full space-y-3">
                    <button 
                      onClick={handleUpiSuccess}
                      className={`w-full py-3 font-semibold rounded-xl flex items-center justify-center gap-2 transition-transform transform hover:scale-[1.02]
                        ${isMale ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-pink-500 text-white hover:bg-pink-600 shadow-md'}`}
                    >
                      <Smartphone className="w-5 h-5" />
                      Open UPI App on Mobile
                    </button>
                    <button 
                      onClick={() => setStep('form')}
                      className={`w-full py-3 font-semibold rounded-xl transition-colors
                        ${isMale ? 'bg-transparent text-gray-400 hover:text-white border border-gray-700' : 'bg-transparent text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                    >
                      Go Back
                    </button>
                  </div>
                </motion.div>
              ) : step === 'processing' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-6 ${isMale ? 'border-gold-500' : 'border-gray-900'}`}></div>
                  <h3 className={`text-xl font-bold mb-2 ${isMale ? 'font-serif text-white' : 'text-gray-900'}`}>
                    Processing Payment...
                  </h3>
                  <p className={isMale ? 'text-gray-500' : 'text-gray-500'}>
                    Securely connecting to payment gateway
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className={`w-20 h-20 mb-6 ${isMale ? 'text-gold-500' : 'text-green-500'}`} />
                  <h3 className={`text-2xl font-bold mb-2 ${isMale ? 'font-serif text-white' : 'text-gray-900'}`}>
                    Order Confirmed!
                  </h3>
                  <p className={isMale ? 'text-gray-500' : 'text-gray-500'}>
                    A confirmation email has been sent to you.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
