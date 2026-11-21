import { Compass, Layers, ShieldCheck, MessageSquare } from 'lucide-react';

const BENEFITS = [
  {
    icon: Compass,
    title: 'Thoughtfully Curated',
    description: 'Useful things, chosen with care.',
    color: '#596A58',
  },
  {
    icon: Layers,
    title: 'Quality Materials',
    description: 'Made to feel good, built to last.',
    color: '#B99A72',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description: 'A simple and secure shopping experience.',
    color: '#526878',
  },
  {
    icon: MessageSquare,
    title: 'Friendly Support',
    description: 'Here whenever you need a hand.',
    color: '#A85438',
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Customer benefits"
      className="bg-[#FAF9F6] border-t border-b border-[#242729]/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#242729]/10">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex flex-col items-start gap-3 py-6 lg:py-2 ${
                  idx % 2 === 1 ? 'pl-6 lg:pl-8' : 'pr-4 lg:pr-8'
                } ${idx > 0 ? 'lg:pl-8' : ''}`}
              >
                <Icon
                  className="h-5 w-5 stroke-[1.6]"
                  style={{ color: item.color }}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-sans text-[15px] font-medium text-[#242729] tracking-normal">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#41443D]/85">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
