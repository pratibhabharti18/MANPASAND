import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User } from 'lucide-react';
import React, { useState } from 'react';
import { Gender } from '../data/shoes';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: Gender;
  onLogin: (user: { name: string; email: string }) => void;
}

export default function AuthModal({ isOpen, onClose, gender, onLogin }: AuthModalProps) {
  const isMale = gender === 'male';
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification with local storage
    const usersStr = localStorage.getItem('manpasand_users');
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (isLogin) {
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        onLogin({ name: user.name, email: user.email });
        onClose();
      } else {
        toast.error('Invalid email or password.');
      }
    } else {
      if (users.find((u: any) => u.email === email)) {
        toast.error('Email already exists. Please login.');
      } else {
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('manpasand_users', JSON.stringify(users));
        
        // Simulate email verification sent
        toast.success(
          <span>
            <b>Registration successful!</b><br/>
            A confirmation email has been sent to <b>{email}</b>.
          </span>,
          { duration: 5000 }
        );
        onLogin({ name, email });
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-md overflow-hidden shadow-2xl 
              ${isMale ? 'bg-black-matte border border-gray-800 rounded-none' : 'bg-white rounded-3xl'}`}
          >
            {/* Header */}
            <div className={`p-6 border-b flex justify-between items-center ${isMale ? 'border-gray-800' : 'border-gray-100'}`}>
              <h2 className={`text-xl font-bold ${isMale ? 'font-serif text-gold-500' : 'text-gray-900'}`}>
                {isLogin ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <button onClick={onClose} className={`text-gray-400 hover:text-gray-600 transition-colors`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isMale ? 'text-gray-500' : 'text-gray-500'}`}>Full Name</label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isMale ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe" 
                        className={`w-full pl-10 pr-4 py-3 text-sm transition-colors outline-none focus:ring-2
                          ${isMale 
                            ? 'bg-gray-900 border-gray-800 text-white focus:ring-gold-500/50 rounded-none' 
                            : 'bg-gray-50 border-transparent focus:bg-white focus:ring-pink-400/50 rounded-xl'}`}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isMale ? 'text-gray-500' : 'text-gray-500'}`}>Email Address</label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isMale ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" 
                      className={`w-full pl-10 pr-4 py-3 text-sm transition-colors outline-none focus:ring-2
                        ${isMale 
                          ? 'bg-gray-900 border-gray-800 text-white focus:ring-gold-500/50 rounded-none' 
                          : 'bg-gray-50 border-transparent focus:bg-white focus:ring-pink-400/50 rounded-xl'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isMale ? 'text-gray-500' : 'text-gray-500'}`}>Password</label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isMale ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className={`w-full pl-10 pr-4 py-3 text-sm transition-colors outline-none focus:ring-2
                        ${isMale 
                          ? 'bg-gray-900 border-gray-800 text-white focus:ring-gold-500/50 rounded-none' 
                          : 'bg-gray-50 border-transparent focus:bg-white focus:ring-pink-400/50 rounded-xl'}`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 mt-6 uppercase tracking-wider font-bold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]
                    ${isMale 
                      ? 'bg-gold-500 text-black hover:bg-gold-400 rounded-none' 
                      : 'bg-gray-900 text-white rounded-xl shadow-lg hover:bg-black'
                    }`}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className={isMale ? 'text-gray-500' : 'text-gray-500'}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className={`font-semibold hover:underline ${isMale ? 'text-gold-500' : 'text-pink-500'}`}
                >
                  {isLogin ? 'Register' : 'Sign In'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
