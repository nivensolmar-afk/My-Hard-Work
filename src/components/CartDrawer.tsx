import { useEffect } from 'react';
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { CartItem } from '../types';
import {
  buildWhatsAppOrderUrl,
  calculateShipping,
  FREE_SHIPPING_THRESHOLD,
} from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, variantName: string, delta: number) => void;
  onRemoveItem: (productId: string, variantName: string) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingCost = calculateShipping(subtotal);
  const total = subtotal + shippingCost;
  const whatsappUrl = buildWhatsAppOrderUrl(items);

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
          <h2 className="font-serif text-[22px] font-normal text-[#242729]">
            Your Shopping Bag
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-2 -mr-2 text-[#242729] hover:text-[#41443D] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="h-5 w-5 stroke-[1.6]" aria-hidden="true" />
          </button>
        </div>

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

        {/* Bag Items or Clear Empty State */}
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
                className="mt-7 px-6 py-3 bg-[#242729] text-[#F4F1E9] rounded-[3px] text-[13px] font-medium cursor-pointer hover:bg-[#495948] transition-colors"
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
                        ${(item.product.price * item.quantity).toFixed(2)}
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
                          className="p-2 text-[#242729] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
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
                          className="p-2 text-[#242729] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
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
                        className="inline-flex items-center gap-1 text-[12px] text-[#41443D]/75 hover:text-[#242729] transition-colors cursor-pointer py-1"
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
          <div className="p-6 border-t border-[#242729]/12 bg-[#F4F1E9] space-y-3">
            <div className="space-y-1.5 text-[14px] pb-1">
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
              onClick={onProceedToCheckout}
              className="w-full min-h-[48px] py-3.5 bg-[#242729] text-[#F4F1E9] hover:bg-[#495948] rounded-[3px] text-[14px] font-medium tracking-[0.03em] transition-colors cursor-pointer"
            >
              Proceed to checkout · ${total.toFixed(2)}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] py-2.5 border border-[#242729]/25 bg-[#FAF9F6] hover:border-[#495948] text-[#242729] rounded-[3px] text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-[#495948]" aria-hidden="true" />
              <span>Quick order via WhatsApp</span>
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
