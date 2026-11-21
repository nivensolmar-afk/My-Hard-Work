import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { CartItem, PlacedOrder } from '../types';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  calculateShipping,
} from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

interface CheckoutPageProps {
  items: CartItem[];
  onBackToShop: () => void;
  onUpdateQuantity: (productId: string, variantName: string, delta: number) => void;
  onRemoveItem: (productId: string, variantName: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: PlacedOrder) => void;
}

export function CheckoutPage({
  items,
  onBackToShop,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}: CheckoutPageProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<PlacedOrder | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = calculateShipping(subtotal);
  const total = subtotal + shippingCost;

  const validateFields = (): string | null => {
    if (!customerName.trim()) return 'Please enter your full name.';
    if (phone.replace(/\D/g, '').length < 7) {
      return 'Please enter a valid phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (address.trim().length < 8) {
      return 'Please enter your complete delivery address.';
    }
    return null;
  };

  const createOrderRecord = (channel: 'checkout' | 'whatsapp'): PlacedOrder => ({
    orderNumber: `PF-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    customerName: customerName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    address: address.trim(),
    notes: notes.trim() || undefined,
    channel,
    total,
    items: items.map((i) => ({
      name: i.product.name,
      variant: i.variantName,
      quantity: i.quantity,
      price: i.product.price,
    })),
  });

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateFields();
    if (error) {
      setFormError(error);
      return;
    }

    const order = createOrderRecord('checkout');
    setFormError(null);
    setSubmittedOrder(order);
    onOrderPlaced(order);
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const error = validateFields();
    if (error) {
      e.preventDefault();
      setFormError(error);
      return;
    }
    setFormError(null);
    const order = createOrderRecord('whatsapp');
    onOrderPlaced(order);
  };

  const handleCopySummary = async () => {
    const text = buildWhatsAppOrderMessage(items, {
      customerName: customerName.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const whatsappUrl = buildWhatsAppOrderUrl(items, {
    customerName: customerName.trim() || undefined,
    phone: phone.trim() || undefined,
    email: email.trim() || undefined,
    address: address.trim() || undefined,
    notes: notes.trim() || undefined,
  });

  /* ── Order Success State ───────────────────────────────────────────────── */
  if (submittedOrder) {
    return (
      <section className="bg-[#FAF9F6] text-[#242729] py-16 sm:py-24 border-b border-[#242729]/10">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <div className="bg-[#F4F1E9] border border-[#242729]/12 p-6 sm:p-10">
            <div className="h-11 w-11 bg-[#596A58] text-[#FAF9F6] rounded-[3px] flex items-center justify-center">
              <Check className="h-5 w-5" aria-hidden="true" />
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#596A58] font-medium">
              Order Request #{submittedOrder.orderNumber} Recorded
            </p>
            <h1 className="mt-2 font-serif text-[34px] sm:text-[42px] leading-[1.08] text-[#242729]">
              Thank you, {submittedOrder.customerName}.
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#41443D]">
              Your order request has been saved. No online card payment was charged—our studio desk will contact you at{' '}
              <span className="text-[#242729] font-medium">{submittedOrder.email}</span> or{' '}
              <span className="text-[#242729] font-medium">{submittedOrder.phone}</span> to confirm fulfillment and payment.
            </p>

            <div className="mt-8 border-t border-[#242729]/12 pt-6 space-y-3 text-[14px]">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-[#41443D]/80">Delivery Address</span>
                <span className="text-[#242729] sm:text-right">{submittedOrder.address}</span>
              </div>
              {submittedOrder.notes && (
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-[#41443D]/80">Notes</span>
                  <span className="text-[#242729] sm:text-right">{submittedOrder.notes}</span>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-[#242729]/12 pt-5 space-y-2.5 text-[14px]">
              {submittedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between gap-4 text-[#41443D]">
                  <span>
                    {item.quantity} × {item.name} ({item.variant})
                  </span>
                  <span className="tabular-nums text-[#242729]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-3 border-t border-[#242729]/10 flex justify-between font-medium text-[16px] text-[#242729]">
                <span>Order Total</span>
                <span className="tabular-nums">${submittedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onBackToShop}
                className="px-6 py-3.5 bg-[#242729] text-[#F4F1E9] hover:bg-[#495948] rounded-[3px] text-[14px] font-medium transition-colors cursor-pointer"
              >
                Return to shop
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Empty Cart State ──────────────────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <section className="bg-[#FAF9F6] text-[#242729] py-20 sm:py-28 border-b border-[#242729]/10">
        <div className="max-w-lg mx-auto px-5 text-center">
          <ShoppingBag
            className="h-11 w-11 mx-auto text-[#41443D]/35 stroke-[1.25]"
            aria-hidden="true"
          />
          <h1 className="mt-5 font-serif text-[34px] text-[#242729]">
            Your shopping bag is empty.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#41443D]">
            Add notebooks, pens, or studio supplies to your bag before proceeding to checkout.
          </p>
          <button
            type="button"
            onClick={onBackToShop}
            className="mt-8 px-7 py-3.5 bg-[#242729] text-[#F4F1E9] hover:bg-[#495948] rounded-[3px] text-[14px] font-medium transition-colors cursor-pointer"
          >
            Explore the shop
          </button>
        </div>
      </section>
    );
  }

  /* ── Active Checkout Form + Order Summary ──────────────────────────────── */
  return (
    <div className="bg-[#FAF9F6] text-[#242729] border-b border-[#242729]/10">
      <div className="bg-[#F4F1E9] border-b border-[#242729]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#242729] hover:text-[#4D5E4C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to shop</span>
          </button>
          <span className="text-[11px] uppercase tracking-[0.14em] text-[#41443D]/75">
            Checkout
          </span>
        </div>
      </div>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20">
        <div className="max-w-xl pb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#526878] font-medium mb-2">
            Order Details
          </p>
          <h1 className="font-serif text-[36px] sm:text-[46px] leading-[1.08] font-normal text-[#242729]">
            Complete your order.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Customer & Delivery Form */}
          <form
            onSubmit={handleCheckoutSubmit}
            noValidate
            className="lg:col-span-7 bg-[#F4F1E9] border border-[#242729]/10 p-6 sm:p-8 lg:p-10 space-y-6"
          >
            <div>
              <h2 className="font-serif text-[26px] text-[#242729]">
                Customer &amp; Delivery Information
              </h2>
              <p className="mt-1 text-[14px] text-[#41443D]">
                Enter your contact and delivery details to submit an order request or send via WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-name"
                  className="block text-[12px] uppercase tracking-[0.1em] text-[#41443D] mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="Your full name"
                  className="w-full min-h-[46px] bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[16px] sm:text-[14px] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-[12px] uppercase tracking-[0.1em] text-[#41443D] mb-2"
                >
                  Phone Number *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="+1 555 010 0199"
                  className="w-full min-h-[46px] bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[16px] sm:text-[14px] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-[12px] uppercase tracking-[0.1em] text-[#41443D] mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="you@example.com"
                  className="w-full min-h-[46px] bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[16px] sm:text-[14px] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-address"
                  className="block text-[12px] uppercase tracking-[0.1em] text-[#41443D] mb-2"
                >
                  Delivery Address *
                </label>
                <textarea
                  id="checkout-address"
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="Street address, apartment/suite, city, postal code"
                  className="w-full bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[16px] sm:text-[14px] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-notes"
                  className="block text-[12px] uppercase tracking-[0.1em] text-[#41443D] mb-2"
                >
                  Delivery Notes (Optional)
                </label>
                <input
                  id="checkout-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Gift note, gate code, or preferred delivery time"
                  className="w-full min-h-[46px] bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] px-3.5 py-2.5 text-[16px] sm:text-[14px] focus:outline-none"
                />
              </div>
            </div>

            {formError && (
              <p role="alert" className="text-[13px] text-[#A85438] font-medium">
                {formError}
              </p>
            )}

            <div className="pt-4 border-t border-[#242729]/12 space-y-3">
              <button
                type="submit"
                className="w-full min-h-[48px] px-6 bg-[#242729] text-[#F4F1E9] hover:bg-[#495948] rounded-[3px] text-[14px] font-medium tracking-[0.02em] transition-colors cursor-pointer"
              >
                Place Order Request · ${total.toFixed(2)}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="min-h-[46px] px-5 bg-[#4D5E4C] text-[#FAF9F6] hover:bg-[#3F4E3E] rounded-[3px] text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Order via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="min-h-[46px] px-5 border border-[#242729]/25 bg-[#FAF9F6] hover:border-[#242729] text-[#242729] rounded-[3px] text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="h-4 w-4 text-[#596A58]" aria-hidden="true" />
                      <span>Summary copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy order summary</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[12px] text-[#41443D]/80 leading-relaxed pt-1">
                Submitting an order request records your details without charging a card online; our studio confirms payment and dispatch directly with you.
              </p>
            </div>
          </form>

          {/* Right Column: Sticky Order Summary with Quantity Controls */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 bg-[#F4F1E9] border border-[#242729]/10 p-6 sm:p-8">
            <h2 className="font-serif text-[26px] text-[#242729] pb-4 border-b border-[#242729]/10">
              Order Summary
            </h2>

            <ul className="divide-y divide-[#242729]/10">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.variantName}`}
                  className="py-4 flex gap-3.5"
                >
                  <div className="w-20 h-16 shrink-0 bg-[#EAE5D9] border border-[#242729]/10 overflow-hidden">
                    <ResilientImage
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[14px] font-medium text-[#242729] leading-snug">
                          {item.product.name}
                        </p>
                        <p className="text-[12px] text-[#41443D]/80">
                          {item.variantName}
                        </p>
                      </div>
                      <span className="tabular-nums text-[14px] font-medium text-[#242729]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#242729]/20 bg-[#FAF9F6] rounded-[3px]">
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
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="px-2.5 text-[12px] tabular-nums font-medium">
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
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onRemoveItem(item.product.id, item.variantName)
                        }
                        aria-label={`Remove ${item.product.name}`}
                        className="inline-flex items-center gap-1 text-[12px] text-[#41443D]/75 hover:text-[#242729] cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-[#242729]/12 space-y-2.5 text-[14px]">
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
              <div className="pt-3 border-t border-[#242729]/12 flex justify-between text-[16px] font-medium text-[#242729]">
                <span>Estimated Total</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
