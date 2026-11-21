import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem } from '../types';
import { ResilientImage } from './ResilientImage';

export interface PlacedOrder {
  orderNumber: string;
  date: string;
  customerName: string;
  email: string;
  address: string;
  total: number;
  items: { name: string; variant: string; quantity: number; price: number }[];
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, variantName: string, delta: number) => void;
  onRemoveItem: (productId: string, variantName: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: PlacedOrder) => void;
}

const FREE_SHIPPING_THRESHOLD = 75;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cityPostal, setCityPostal] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (step === 'confirmed') {
        const timer = window.setTimeout(() => setStep('bag'), 300);
        return () => window.clearTimeout(timer);
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, step]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !address.trim() || !cityPostal.trim()) {
      setFormError('Please complete all shipping fields before placing your order.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address for your receipt.');
      return;
    }

    const order: PlacedOrder = {
      orderNumber: `PF-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      customerName: fullName.trim(),
      email: email.trim(),
      address: `${address.trim()}, ${cityPostal.trim()}`,
      total,
      items: items.map((i) => ({
        name: i.product.name,
        variant: i.variantName,
        quantity: i.quantity,
        price: i.product.price,
      })),
    };

    setFormError(null);
    setConfirmedOrder(order);
    onOrderPlaced(order);
    onClearCart();
    setStep('confirmed');
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#242729]/45 backdrop-blur-[2px]"
      />

      <aside
        aria-label="Shopping bag"
        className={`relative ml-auto w-full max-w-[460px] h-full bg-[#FAF9F6] text-[#242729] border-l border-[#242729]/12 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="px-6 h-16 border-b border-[#242729]/10 flex items-center justify-between shrink-0 bg-[#F4F1E9]">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to bag"
                className="p-1.5 -ml-1.5 text-[#242729] hover:text-[#41443D] cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <h2 className="font-serif text-[22px] font-normal text-[#242729]">
              {step === 'bag' && 'Your Shopping Bag'}
              {step === 'checkout' && 'Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-2 -mr-2 text-[#242729] hover:text-[#41443D] min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
          >
            <X className="h-5 w-5 stroke-[1.6]" aria-hidden="true" />
          </button>
        </div>

        {/* Step 1: Bag View */}
        {step === 'bag' && (
          <>
            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="px-6 py-3.5 bg-[#F4F1E9]/60 border-b border-[#242729]/10">
                <p className="text-[12px] text-[#41443D]">
                  {remainingForFreeShipping === 0 ? (
                    <span>You have unlocked complimentary standard shipping.</span>
                  ) : (
                    <span>
                      Add{' '}
                      <span className="tabular-nums font-medium text-[#242729]">
                        ${remainingForFreeShipping.toFixed(0)}
                      </span>{' '}
                      more for complimentary shipping over $75.
                    </span>
                  )}
                </p>
                <div className="mt-2 h-1 w-full bg-[#242729]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#596A58] transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Bag Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag
                    className="h-10 w-10 text-[#41443D]/35 stroke-[1.25]"
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-serif text-[26px] text-[#242729]">
                    Your bag is currently empty.
                  </p>
                  <p className="mt-2 text-[14px] text-[#41443D] max-w-xs leading-relaxed">
                    Explore our journals, fine pens, and studio tools to begin building your desk.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-7 px-6 py-3 bg-[#242729] text-[#F4F1E9] rounded-[3px] text-[13px] font-medium cursor-pointer hover:bg-[#303538] transition-colors"
                  >
                    Continue exploring
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#242729]/10">
                  {items.map((item) => (
                    <li
                      key={`${item.product.id}-${item.variantName}`}
                      className="py-5 first:pt-0 flex gap-4"
                    >
                      <div className="w-24 h-20 shrink-0 bg-[#EAE5D9] border border-[#242729]/10 overflow-hidden">
                        <ResilientImage
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-sans text-[14px] font-medium text-[#242729] leading-snug">
                              {item.product.name}
                            </h3>
                            <p className="mt-0.5 text-[12px] text-[#41443D]/80">
                              {item.variantName}
                            </p>
                          </div>
                          <span className="tabular-nums text-[14px] font-medium text-[#242729]">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#242729]/20 rounded-[3px]">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.variantName,
                                  -1
                                )
                              }
                              className="p-1.5 text-[#242729] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            <span className="px-3 text-[13px] tabular-nums font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.product.name}`}
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.variantName,
                                  1
                                )
                              }
                              className="p-1.5 text-[#242729] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              onRemoveItem(item.product.id, item.variantName)
                            }
                            aria-label={`Remove ${item.product.name}`}
                            className="inline-flex items-center gap-1 text-[12px] text-[#41443D]/75 hover:text-[#242729] transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Bag Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#242729]/12 bg-[#F4F1E9] space-y-4">
                <div className="space-y-2 text-[14px]">
                  <div className="flex justify-between text-[#41443D]">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-[#242729]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#41443D]">
                    <span>Shipping</span>
                    <span className="tabular-nums">
                      {shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full py-4 bg-[#242729] text-[#F4F1E9] hover:bg-[#303538] rounded-[3px] text-[14px] font-medium tracking-[0.03em] transition-colors cursor-pointer"
                >
                  Proceed to checkout · ${total.toFixed(2)}
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Checkout Form */}
        {step === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#41443D]/75 mb-3">
                  Shipping Details
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="chk-name" className="block text-[12px] text-[#41443D] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="chk-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Clara Lindqvist"
                      className="w-full bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[14px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-email" className="block text-[12px] text-[#41443D] mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="chk-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="clara@studio.com"
                      className="w-full bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[14px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-address" className="block text-[12px] text-[#41443D] mb-1.5">
                      Street Address
                    </label>
                    <input
                      id="chk-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="412 Mercer St, Apt 4A"
                      className="w-full bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[14px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-city" className="block text-[12px] text-[#41443D] mb-1.5">
                      City &amp; Postal Code
                    </label>
                    <input
                      id="chk-city"
                      type="text"
                      value={cityPostal}
                      onChange={(e) => setCityPostal(e.target.value)}
                      placeholder="Portland, OR 97209"
                      className="w-full bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[14px] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#242729]/12 space-y-2 text-[14px]">
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#41443D]/75 mb-2">
                  Order Summary
                </p>
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variantName}`}
                    className="flex justify-between text-[#41443D]"
                  >
                    <span className="truncate pr-3">
                      {item.quantity} × {item.product.name} ({item.variantName})
                    </span>
                    <span className="tabular-nums text-[#242729]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#242729]/10 flex justify-between font-medium text-[#242729]">
                  <span>Total (incl. shipping)</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {formError && (
                <p role="alert" className="text-[13px] text-[#C66C4D]">
                  {formError}
                </p>
              )}
            </div>

            <div className="p-6 border-t border-[#242729]/12 bg-[#F4F1E9]">
              <button
                type="submit"
                className="w-full py-4 bg-[#242729] text-[#F4F1E9] hover:bg-[#303538] rounded-[3px] text-[14px] font-medium tracking-[0.03em] transition-colors cursor-pointer"
              >
                Complete order · ${total.toFixed(2)}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmed Receipt */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 bg-[#596A58] text-[#FAF9F6] rounded-[3px] flex items-center justify-center">
                <Check className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-[#41443D]/75">
                Order #{confirmedOrder.orderNumber} Confirmed
              </p>
              <h3 className="mt-2 font-serif text-[32px] leading-tight text-[#242729]">
                Thank you, {confirmedOrder.customerName}.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#41443D]">
                Your objects are being prepared with archival wrapping in our Portland studio. A confirmation has been noted for{' '}
                <span className="text-[#242729] font-medium">{confirmedOrder.email}</span>.
              </p>

              <div className="mt-8 border border-[#242729]/12 bg-[#F4F1E9] p-5 space-y-3 text-[13px]">
                <div className="flex justify-between text-[#41443D]">
                  <span>Destination</span>
                  <span className="text-right text-[#242729]">{confirmedOrder.address}</span>
                </div>
                <div className="border-t border-[#242729]/10 pt-3 space-y-1.5">
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[#41443D]">
                      <span>
                        {item.quantity} × {item.name} ({item.variant})
                      </span>
                      <span className="tabular-nums text-[#242729]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#242729]/10 pt-3 flex justify-between font-medium text-[#242729]">
                  <span>Total Paid</span>
                  <span className="tabular-nums">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full py-3.5 bg-[#242729] text-[#F4F1E9] hover:bg-[#303538] rounded-[3px] text-[14px] font-medium cursor-pointer transition-colors"
            >
              Return to storefront
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
