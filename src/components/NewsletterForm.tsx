import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailPattern.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setSubmittedEmail(trimmed);
    setEmail('');
  };

  return (
    <section id="newsletter" className="bg-[#3E4C52] text-[#F4F1E9] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#D7AA43] mb-4">
            Studio Dispatches
          </p>
          <h2 className="font-serif text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.08] font-normal text-[#FAF9F6] [text-wrap:balance]">
            A little inspiration, delivered.
          </h2>
          <p className="mt-5 text-[15px] sm:text-[17px] leading-[1.65] text-[#EAE5D9]/85 max-w-xl mx-auto">
            New arrivals, creative ideas, studio notes, and things worth keeping — occasionally, never noisily.
          </p>

          {submittedEmail ? (
            <div
              role="status"
              className="mt-10 mx-auto max-w-md border border-[#D5C7AE]/35 bg-[#242729]/30 px-6 py-5 text-left flex items-start gap-3.5"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-[#596A58] text-[#FAF9F6] rounded-[2px]">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#FAF9F6]">
                  You are on the list.
                </p>
                <p className="mt-1 text-[13px] text-[#EAE5D9]/80 leading-relaxed">
                  Thank you for joining with <span className="text-[#FAF9F6] underline decoration-[#D5C7AE]/50 underline-offset-2">{submittedEmail}</span>. Our next seasonal note will arrive soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedEmail(null)}
                  className="mt-3 text-[12px] uppercase tracking-[0.12em] text-[#D5C7AE] hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Subscribe another address
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-10 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
                <div className="flex-1 text-left">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Your email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Your email address"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    className="w-full bg-transparent border-b border-[#F4F1E9]/40 focus:border-[#FAF9F6] py-3.5 px-1 text-[15px] text-[#FAF9F6] placeholder:text-[#EAE5D9]/55 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#F4F1E9] text-[#242729] hover:bg-[#FAF9F6] px-7 py-3.5 rounded-[3px] text-[14px] font-medium tracking-[0.02em] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF9F6]"
                >
                  <span>Join the list</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-3 text-left text-[13px] text-[#D7AA43]"
                >
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
