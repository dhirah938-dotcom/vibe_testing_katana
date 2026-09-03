import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.sword.price * item.quantity, 0);
  const earnedPoints = Math.floor(subtotal * 0.05);

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1200);
  };

  const handleFinish = () => {
    setOrderComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-[#1A1D20] text-white">
          <div className="flex items-center gap-2">
            <h3 className="font-cinzel text-lg font-bold tracking-wider">Collector Vault</h3>
            <span className="text-xs bg-[#C5A059] text-slate-900 px-2 py-0.5 rounded-full font-bold">
              {items.reduce((s, i) => s + i.quantity, 0)} blades
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderComplete ? (
          <div className="p-8 text-center flex-1 flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-cinzel text-xl font-bold text-slate-900 mb-1">
              Acquisition Confirmed
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              Torokusho export documents initiated. Your certificate of provenance has been dispatched.
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded p-3 w-full text-xs text-left mb-6 space-y-1">
              <p className="text-stone-700 font-mono">
                Tracking: <span className="font-bold text-slate-900">DHL-EXP-7798-JP</span>
              </p>
              <p className="text-stone-700">
                Loyalty Earned: <span className="font-bold text-[#C5A059]">+{earnedPoints} pts</span>
              </p>
              <p className="text-stone-700">
                Insurance: <span className="text-emerald-700 font-semibold">100% Full Value</span>
              </p>
            </div>
            <button
              onClick={handleFinish}
              className="w-full bg-[#1A1D20] hover:bg-[#C5A059] text-white text-xs font-semibold py-3 px-4 rounded transition-colors uppercase tracking-wider cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center flex-1 flex flex-col justify-center items-center">
            <p className="font-cinzel text-base text-gray-400 mb-2">Your vault is empty</p>
            <p className="text-xs text-gray-500 mb-6">
              Explore our master-forged swords and select a blade to review specifications.
            </p>
            <button
              onClick={onClose}
              className="text-xs font-medium uppercase tracking-wider text-[#9E7D3B] hover:text-[#C5A059] border border-[#C5A059] px-4 py-2 rounded"
            >
              Explore Nihonto Collection
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scroll">
            {items.map(({ sword, quantity }) => (
              <div
                key={sword.id}
                className="flex gap-3.5 pb-4 border-b border-gray-100 items-start"
              >
                <div className="w-16 h-20 bg-[#0E1012] rounded overflow-hidden flex-shrink-0 p-1">
                  <img
                    src={sword.imageUrl}
                    alt={sword.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-xs text-slate-900 truncate">{sword.name}</h4>
                    <button
                      onClick={() => onRemoveItem(sword.id)}
                      className="text-gray-400 hover:text-red-600 p-0.5 ml-2"
                      title="Remove from vault"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 block">{sword.code}</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">
                    ${(sword.price * quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(sword.id, -1)}
                      className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold px-1">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(sword.id, 1)}
                      className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Perks banner */}
            <div className="bg-amber-50 border border-amber-200/80 rounded p-3 text-xs text-amber-900 space-y-1">
              <p className="font-semibold flex items-center gap-1 text-[#9E7D3B]">
                <ShieldCheck className="w-4 h-4" />
                Guild Authenticity Guarantee
              </p>
              <p className="text-[11px] text-amber-800">
                You will earn <span className="font-bold text-[#9E7D3B]">+{earnedPoints} Member Loyalty Points</span> with this acquisition.
              </p>
              <p className="text-[11px] text-gray-600 flex items-center gap-1 pt-1">
                <Truck className="w-3.5 h-3.5 text-gray-500" />
                Includes DHL Express insured transit & export customs permit
              </p>
            </div>
          </div>
        )}

        {/* Footer & Checkout */}
        {items.length > 0 && !orderComplete && (
          <div className="p-4 sm:p-5 border-t border-gray-200 bg-stone-50 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Acquisition Subtotal:</span>
              <span className="font-cinzel font-bold text-slate-900 text-lg">
                ${subtotal.toFixed(2)} USD
              </span>
            </div>

            <button
              onClick={handleSimulateCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#1A1D20] hover:bg-[#C5A059] text-white font-medium py-3 px-4 rounded-xs transition-colors flex items-center justify-center gap-2 text-xs tracking-wider uppercase cursor-pointer disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Certifying Torokusho...
                </>
              ) : (
                <>Proceed to Insured Acquisition</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
