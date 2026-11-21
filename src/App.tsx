import { useCallback, useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { AnnouncementBar } from './components/AnnouncementBar';
import {
  AccountModal,
  ArticleModal,
  InfoModal,
  InfoTopic,
  StudioModal,
} from './components/ArticleAndInfoModals';
import { BrandStorySection } from './components/BrandStorySection';
import { CartDrawer, PlacedOrder } from './components/CartDrawer';
import { CategorySection } from './components/CategorySection';
import { EditorialSection } from './components/EditorialSection';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MoodCollectionSection } from './components/MoodCollectionSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { NewsletterForm } from './components/NewsletterForm';
import { ProductModal } from './components/ProductModal';
import { SearchModal } from './components/SearchModal';
import { TrustStrip } from './components/TrustStrip';
import {
  CartItem,
  CategorySlug,
  EditorialArticle,
  MoodCollection,
  Product,
  SortOption,
} from './types';

const CART_STORAGE_KEY = 'paper_and_form_cart_v1';
const ORDERS_STORAGE_KEY = 'paper_and_form_orders_v1';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as PlacedOrder[]) : [];
    } catch {
      return [];
    }
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategorySlug>('all');
  const [activeMood, setActiveMood] = useState<MoodCollection['id'] | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<EditorialArticle | null>(null);
  const [infoTopic, setInfoTopic] = useState<InfoTopic>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsSearchOpen(false);
        setIsStudioOpen(false);
        setIsAccountOpen(false);
        setSelectedProduct(null);
        setSelectedArticle(null);
        setInfoTopic(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2600);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectCategoryAndScroll = useCallback(
    (category: CategorySlug) => {
      setActiveCategory(category);
      setActiveMood(null);
      scrollToSection('featured-products');
    },
    [scrollToSection]
  );

  const handleSelectMoodAndScroll = useCallback(
    (moodId: MoodCollection['id']) => {
      setActiveMood(moodId);
      setActiveCategory('all');
      scrollToSection('featured-products');
    },
    [scrollToSection]
  );

  const handleShopNewArrivals = useCallback(() => {
    setActiveCategory('all');
    setActiveMood(null);
    setSortBy('newest');
    scrollToSection('featured-products');
  }, [scrollToSection]);

  const handleAddToCart = useCallback(
    (product: Product, variantName: string, quantity = 1) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id && item.variantName === variantName
        );
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [...prev, { product, variantName, quantity }];
      });
      showToast(`Added ${product.name} to bag`);
    },
    [showToast]
  );

  const handleUpdateQuantity = useCallback(
    (productId: string, variantName: string, delta: number) => {
      setCart((prev) =>
        prev
          .map((item) => {
            if (item.product.id === productId && item.variantName === variantName) {
              return { ...item, quantity: item.quantity + delta };
            }
            return item;
          })
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const handleRemoveItem = useCallback((productId: string, variantName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.variantName === variantName)
      )
    );
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleOrderPlaced = useCallback((order: PlacedOrder) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const totalBagCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1E9] text-[#242729]">
      {/* Section 01 — Announcement Bar */}
      <AnnouncementBar onExploreFreeShipping={() => setInfoTopic('shipping')} />

      {/* Section 02 — Sticky Architectural Header */}
      <Header
        cartCount={totalBagCount}
        isScrolled={isScrolled}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategoryAndScroll}
        onNavigateSection={scrollToSection}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      <main className="flex-1">
        {/* Section 03 — Hero */}
        <Hero
          onExploreCollection={() => scrollToSection('featured-products')}
          onDiscoverStudio={() => setIsStudioOpen(true)}
        />

        {/* Section 04 — Category Collection */}
        <CategorySection onSelectCategory={handleSelectCategoryAndScroll} />

        {/* Section 05 — Featured Products */}
        <FeaturedProductsSection
          activeCategory={activeCategory}
          activeMood={activeMood}
          sortBy={sortBy}
          onSelectCategory={setActiveCategory}
          onClearMood={() => setActiveMood(null)}
          onChangeSort={setSortBy}
          onAddToCart={(product, variant) => handleAddToCart(product, variant, 1)}
          onOpenProduct={setSelectedProduct}
        />

        {/* Section 06 — Architectural Brand Story */}
        <BrandStorySection onOpenStudioModal={() => setIsStudioOpen(true)} />

        {/* Section 07 — Shop by Creative Mood */}
        <MoodCollectionSection onSelectMood={handleSelectMoodAndScroll} />

        {/* Section 08 — New Arrivals */}
        <NewArrivalsSection
          onAddToCart={(product, variant) => handleAddToCart(product, variant, 1)}
          onOpenProduct={setSelectedProduct}
          onShopNewArrivals={handleShopNewArrivals}
        />

        {/* Section 09 — Editorial / Inspiration */}
        <EditorialSection onSelectArticle={setSelectedArticle} />

        {/* Section 10 — Newsletter */}
        <NewsletterForm />

        {/* Section 11 — Customer Trust / Brand Benefits */}
        <TrustStrip />
      </main>

      {/* Section 12 — Footer */}
      <Footer
        onSelectCategory={handleSelectCategoryAndScroll}
        onNavigateSection={scrollToSection}
        onOpenInfoModal={setInfoTopic}
      />

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
        onSelectCategory={handleSelectCategoryAndScroll}
        onSelectArticle={setSelectedArticle}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <StudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        orders={orders}
        onClose={() => setIsAccountOpen(false)}
      />

      <InfoModal topic={infoTopic} onClose={() => setInfoTopic(null)} />

      {/* Subtle Add-to-Bag Notification Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 bg-[#242729] text-[#F4F1E9] px-4 py-3 rounded-[3px] border border-[#F4F1E9]/15 shadow-lg flex items-center gap-3 text-[13px]"
        >
          <Check className="h-4 w-4 text-[#D5C7AE] shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="ml-2 underline underline-offset-4 text-[#D5C7AE] hover:text-[#FAF9F6] cursor-pointer whitespace-nowrap"
          >
            View bag
          </button>
        </div>
      )}
    </div>
  );
}
