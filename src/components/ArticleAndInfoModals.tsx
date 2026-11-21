import React, { useEffect, useState } from 'react';
import { Check, MapPin, Package, X } from 'lucide-react';
import { STORY_IMAGE } from '../data/catalog';
import { EditorialArticle } from '../types';
import { PlacedOrder } from './CartDrawer';
import { ResilientImage } from './ResilientImage';

/* ── Editorial Article Reader Modal ─────────────────────────────────────── */

export function ArticleModal({
  article,
  onClose,
}: {
  article: EditorialArticle | null;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = article ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [article]);

  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#242729]/55 backdrop-blur-[2px]"
      />
      <article className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#FAF9F6] text-[#242729] border border-[#242729]/15 p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close article"
          className="absolute right-5 top-5 h-9 w-9 border border-[#242729]/15 rounded-[3px] flex items-center justify-center text-[#242729] hover:bg-[#242729] hover:text-[#F4F1E9] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#41443D]/75 pr-10">
          <span>{article.category}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{article.date}</span>
        </div>

        <h2
          id="article-modal-title"
          className="mt-3 font-serif text-[32px] sm:text-[40px] leading-[1.1] text-[#242729] [text-wrap:balance]"
        >
          {article.title}
        </h2>
        <p className="mt-2 text-[13px] text-[#41443D]/80">By {article.author}</p>

        <div className="mt-6 aspect-[16/10] w-full overflow-hidden bg-[#EAE5D9] border border-[#242729]/10">
          <ResilientImage
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-7 space-y-5 text-[16px] leading-[1.75] text-[#242729]/90">
          {article.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

/* ── Studio & Brand Story Modal ─────────────────────────────────────────── */

export function StudioModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="studio-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#242729]/55 backdrop-blur-[2px]"
      />
      <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#FAF9F6] text-[#242729] border border-[#242729]/15">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close studio details"
          className="absolute right-4 top-4 z-10 h-9 w-9 bg-[#FAF9F6]/90 border border-[#242729]/15 rounded-[3px] flex items-center justify-center text-[#242729] hover:bg-[#242729] hover:text-[#F4F1E9] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="aspect-[16/9] w-full bg-[#EAE5D9] overflow-hidden">
          <ResilientImage
            src={STORY_IMAGE}
            alt="PAPER & FORM architectural showroom interior"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#41443D]/75">
            Portland Flagship &amp; Paper Archive
          </p>
          <h2
            id="studio-modal-title"
            className="mt-2 font-serif text-[34px] sm:text-[42px] leading-[1.08] text-[#242729]"
          >
            About PAPER &amp; FORM
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.7] text-[#41443D]">
            Founded in 2021 by architects and bookbinders, PAPER &amp; FORM brings together independent paper mills, precision machined writing tools, and small-press design monographs under one quiet roof. Every shelf in our Pearl District showroom is arranged so you can test nib weights, compare 120gsm cotton paper grains, and build a calmer desk ritual.
          </p>

          <div className="mt-8 pt-6 border-t border-[#242729]/12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px]">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-[#41443D] mt-1 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-[#242729]">Showroom Address</p>
                <p className="text-[#41443D] mt-0.5">
                  412 Mercer St, Suite 2B
                  <br />
                  Portland, OR 97209
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium text-[#242729]">Opening Hours</p>
              <p className="text-[#41443D] mt-0.5 tabular-nums">
                Tuesday – Saturday: 10:00 – 18:00
                <br />
                Sunday: 11:00 – 17:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Account & Orders Modal ─────────────────────────────────────────────── */

export function AccountModal({
  isOpen,
  orders,
  onClose,
}: {
  isOpen: boolean;
  orders: PlacedOrder[];
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#242729]/55 backdrop-blur-[2px]"
      />
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#FAF9F6] text-[#242729] border border-[#242729]/15 p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close account"
          className="absolute right-4 top-4 h-9 w-9 border border-[#242729]/15 rounded-[3px] flex items-center justify-center text-[#242729] hover:bg-[#242729] hover:text-[#F4F1E9] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="text-[11px] uppercase tracking-[0.16em] text-[#41443D]/75">
          Customer Ledger
        </p>
        <h2 id="account-modal-title" className="mt-1.5 font-serif text-[30px] text-[#242729]">
          Your Orders
        </h2>

        {orders.length === 0 ? (
          <div className="mt-6 py-8 border-t border-[#242729]/10 text-center">
            <Package className="h-8 w-8 mx-auto text-[#41443D]/40 stroke-[1.3]" aria-hidden="true" />
            <p className="mt-3 text-[15px] text-[#242729] font-medium">
              No recent orders placed in this session.
            </p>
            <p className="mt-1 text-[13px] text-[#41443D]">
              Items you add and check out will appear here with their order numbers and receipts.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="border border-[#242729]/12 bg-[#F4F1E9] p-4 space-y-2 text-[13px]"
              >
                <div className="flex justify-between font-medium text-[#242729]">
                  <span>Order #{order.orderNumber}</span>
                  <span className="tabular-nums">${order.total.toFixed(2)}</span>
                </div>
                <p className="text-[#41443D]/80">
                  {order.date} · {order.address}
                </p>
                <div className="pt-2 border-t border-[#242729]/10 space-y-1 text-[#41443D]">
                  {order.items.map((item, idx) => (
                    <p key={idx}>
                      {item.quantity} × {item.name} ({item.variant})
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Footer Policy & Contact Modal ──────────────────────────────────────── */

export type InfoTopic = 'shipping' | 'faq' | 'privacy' | 'terms' | 'contact' | null;

export function InfoModal({
  topic,
  onClose,
}: {
  topic: InfoTopic;
  onClose: () => void;
}) {
  const [contactMsg, setContactMsg] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = topic ? 'hidden' : '';
    setContactSent(false);
    return () => {
      document.body.style.overflow = '';
    };
  }, [topic]);

  if (!topic) return null;

  const contentMap: Record<
    Exclude<InfoTopic, null>,
    { label: string; title: string; paragraphs: string[] }
  > = {
    shipping: {
      label: 'Fulfillment',
      title: 'Shipping & Returns',
      paragraphs: [
        'Orders over $75 ship free across the contiguous United States via carbon-neutral ground courier. Orders under $75 ship for a flat $9 rate.',
        'Every parcel is packed in acid-free tissue and rigid recyclable kraft board to protect notebook corners and paper edges in transit.',
        'Unused items in original packaging may be returned or exchanged within 30 days of delivery.',
      ],
    },
    faq: {
      label: 'Support',
      title: 'Frequently Asked Questions',
      paragraphs: [
        'Is your notebook paper fountain-pen friendly? Yes—our Everyday Hardcover Journal and Softcover Sketchbook use 120gsm and 200gsm archival paper selected specifically to prevent feathering and bleed-through.',
        'Do you offer refills for the Archive Writing Pen? Standard Euro-style 0.5mm ceramic rollerball refills fit seamlessly.',
        'Can I visit the Portland showroom? Yes, our showroom on Mercer Street is open Tuesday through Sunday with full swatch books and test pens at the central oak table.',
      ],
    },
    privacy: {
      label: 'Policy',
      title: 'Privacy Policy',
      paragraphs: [
        'PAPER & FORM respects your quiet inbox and personal data. Email addresses shared for studio dispatches or order receipts are never sold or shared with third-party advertisers.',
        'Your shopping bag state is stored locally in your browser so items remain saved between visits.',
      ],
    },
    terms: {
      label: 'Policy',
      title: 'Terms & Conditions',
      paragraphs: [
        'All paper goods, stationery tools, and small-press monographs are offered subject to studio batch availability.',
        'Slight tonal variations in unlacquered brass, cedarwood, and Belgian linen bookcloth are natural characteristics of authentic materials.',
      ],
    },
    contact: {
      label: 'Studio Desk',
      title: 'Contact Us',
      paragraphs: [
        'Write to our studio team anytime at hello@paperandform.com or leave a note below. We respond within one business day.',
      ],
    },
  };

  const current = contentMap[topic];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMsg.trim()) return;
    setContactSent(true);
    setContactEmail('');
    setContactMsg('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#242729]/55 backdrop-blur-[2px]"
      />
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#FAF9F6] text-[#242729] border border-[#242729]/15 p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 h-9 w-9 border border-[#242729]/15 rounded-[3px] flex items-center justify-center text-[#242729] hover:bg-[#242729] hover:text-[#F4F1E9] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="text-[11px] uppercase tracking-[0.16em] text-[#41443D]/75">
          {current.label}
        </p>
        <h2 id="info-modal-title" className="mt-1.5 font-serif text-[30px] text-[#242729]">
          {current.title}
        </h2>

        <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-[#41443D]">
          {current.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {topic === 'contact' && (
          <div className="mt-6 pt-6 border-t border-[#242729]/12">
            {contactSent ? (
              <div className="flex items-center gap-2.5 text-[14px] text-[#596A58] font-medium">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Note received. Our studio desk will reply shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-[#F4F1E9] border border-[#242729]/20 rounded-[3px] px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#242729]"
                />
                <textarea
                  rows={3}
                  required
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full bg-[#F4F1E9] border border-[#242729]/20 rounded-[3px] px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#242729]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#242729] text-[#F4F1E9] rounded-[3px] text-[13px] font-medium cursor-pointer hover:bg-[#303538] transition-colors"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
