import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroEtymology } from './components/HeroEtymology';
import { CatalogControls } from './components/CatalogControls';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SenseiChatbot } from './components/SenseiChatbot';
import { StrategicValuePillars } from './components/StrategicValuePillars';
import { Footer } from './components/Footer';
import { RestorationModal } from './components/RestorationModal';
import { ProvenanceFaqModal } from './components/ProvenanceFaqModal';
import { CollectorAccountModal } from './components/CollectorAccountModal';
import { CustomForgingView } from './components/CustomForgingView';
import { AuthenticationView } from './components/AuthenticationView';
import { TalkToUsView } from './components/TalkToUsView';
import { SWORDS_DATABASE } from './data/swords';
import { Sword, CartItem, FilterCategory } from './types';

export default function App() {
  // Navigation & Category state
  const [currentCategory, setCurrentCategory] = useState<FilterCategory>('katana');

  // Filter & Search states matching reference screenshot
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedBladeShape, setSelectedBladeShape] = useState('all');
  const [selectedLockingMechanism, setSelectedLockingMechanism] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSteel, setSelectedSteel] = useState('all');
  const [selectedHandleMaterial, setSelectedHandleMaterial] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Modals & Drawers state
  const [selectedSword, setSelectedSword] = useState<Sword | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRestorationOpen, setIsRestorationOpen] = useState(false);
  const [isProvenanceFaqOpen, setIsProvenanceFaqOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // AI Sensei chat trigger from modal
  const [senseiTriggerQuestion, setSenseiTriggerQuestion] = useState<string | null>(null);

  // Filter swords
  const filteredSwords = useMemo(() => {
    return SWORDS_DATABASE.filter((sword) => {
      // Category filter
      if (currentCategory === 'katana' && sword.category !== 'katana') return false;
      if (currentCategory === 'wakizashi' && sword.category !== 'wakizashi') return false;
      if (currentCategory === 'iaito' && sword.category !== 'iaito') return false;
      if (currentCategory === 'antique' && sword.category !== 'antique') return false;

      // Brand filter
      if (selectedBrand !== 'all' && sword.brand !== selectedBrand) return false;

      // Blade Shape filter
      if (selectedBladeShape !== 'all') {
        const shape = (sword.bladeShape || sword.sori || '').toLowerCase();
        if (!shape.includes(selectedBladeShape.toLowerCase())) return false;
      }

      // Locking Mechanism filter
      if (selectedLockingMechanism !== 'all') {
        const lock = (sword.lockingMechanism || '').toLowerCase();
        if (!lock.includes(selectedLockingMechanism.toLowerCase())) return false;
      }

      // Handle Material filter
      if (selectedHandleMaterial !== 'all') {
        const handle = (sword.handleMaterial || sword.tsuka || '').toLowerCase();
        if (!handle.includes(selectedHandleMaterial.toLowerCase())) return false;
      }

      // Price filter
      if (selectedPriceRange === 'under-100' && sword.price >= 100) return false;
      if (selectedPriceRange === '100-350' && (sword.price < 100 || sword.price > 350)) return false;
      if (selectedPriceRange === '350-600' && (sword.price < 350 || sword.price > 600)) return false;
      if (selectedPriceRange === '600-800' && (sword.price < 600 || sword.price > 800)) return false;
      if (selectedPriceRange === 'over-800' && sword.price <= 800) return false;

      // Steel filter
      if (selectedSteel !== 'all') {
        if (!sword.steel.toLowerCase().includes(selectedSteel.toLowerCase())) return false;
      }

      // Certificate filter
      if (selectedCertificate !== 'all' && sword.certificate !== selectedCertificate) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          sword.name.toLowerCase().includes(q) ||
          sword.code.toLowerCase().includes(q) ||
          sword.subtitle.toLowerCase().includes(q) ||
          sword.steel.toLowerCase().includes(q) ||
          sword.smith.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'code-asc') return a.code.localeCompare(b.code);
      return 0; // default order
    });
  }, [
    currentCategory,
    selectedBrand,
    selectedBladeShape,
    selectedLockingMechanism,
    selectedPriceRange,
    selectedSteel,
    selectedHandleMaterial,
    selectedCertificate,
    searchQuery,
    sortBy,
  ]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredSwords.length / itemsPerPage));
  const currentSwords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSwords.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSwords, currentPage, itemsPerPage]);

  const hasActiveFilters =
    selectedBrand !== 'all' ||
    selectedBladeShape !== 'all' ||
    selectedLockingMechanism !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedSteel !== 'all' ||
    selectedHandleMaterial !== 'all' ||
    selectedCertificate !== 'all' ||
    searchQuery !== '';

  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSelectedBladeShape('all');
    setSelectedLockingMechanism('all');
    setSelectedPriceRange('all');
    setSelectedSteel('all');
    setSelectedHandleMaterial('all');
    setSelectedCertificate('all');
    setSearchQuery('');
    setSortBy('default');
    setCurrentPage(1);
  };

  // Cart actions
  const handleAddToCart = (sword: Sword, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.sword.id === sword.id);
      if (existing) {
        return prev.map((item) =>
          item.sword.id === sword.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { sword, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.sword.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.sword.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCategoryChange = (cat: FilterCategory) => {
    setCurrentCategory(cat);
    setCurrentPage(1);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FCFCFA] text-slate-900 flex flex-col justify-between">
      {/* Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleCategoryChange}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRestoration={() => setIsRestorationOpen(true)}
        onOpenProvenanceFaq={() => setIsProvenanceFaqOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />

      {/* Hero Category & Etymology */}
      <HeroEtymology
        currentCategory={currentCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* Main Catalog or Dedicated Category View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {currentCategory === 'custom' ? (
          <CustomForgingView onAddCustomSword={(sword) => handleAddToCart(sword)} />
        ) : currentCategory === 'authentication' ? (
          <AuthenticationView onSelectSword={(sword) => setSelectedSword(sword)} />
        ) : currentCategory === 'talk-to-us' ? (
          <TalkToUsView />
        ) : (
          <>
            {/* Catalog Controls (Filters, Sort, Counter) matching reference image */}
            <CatalogControls
              selectedBrand={selectedBrand}
              onSelectBrand={(b) => {
                setSelectedBrand(b);
                setCurrentPage(1);
              }}
              selectedBladeShape={selectedBladeShape}
              onSelectBladeShape={(bs) => {
                setSelectedBladeShape(bs);
                setCurrentPage(1);
              }}
              selectedLockingMechanism={selectedLockingMechanism}
              onSelectLockingMechanism={(lm) => {
                setSelectedLockingMechanism(lm);
                setCurrentPage(1);
              }}
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={(p) => {
                setSelectedPriceRange(p);
                setCurrentPage(1);
              }}
              selectedSteel={selectedSteel}
              onSelectSteel={(s) => {
                setSelectedSteel(s);
                setCurrentPage(1);
              }}
              selectedHandleMaterial={selectedHandleMaterial}
              onSelectHandleMaterial={(hm) => {
                setSelectedHandleMaterial(hm);
                setCurrentPage(1);
              }}
              sortBy={sortBy}
              onSelectSortBy={setSortBy}
              itemsPerPage={itemsPerPage}
              onSelectItemsPerPage={(num) => {
                setItemsPerPage(num);
                setCurrentPage(1);
              }}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredSwords.length}
              onNextPage={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              onPrevPage={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Reference Product Grid */}
            {currentSwords.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-sm">
                <p className="font-cinzel text-lg text-slate-700 mb-2">
                  No swords found matching your selected filters.
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Try clearing your search filters to explore available master blades.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#1A1D20] text-white text-xs font-semibold rounded uppercase tracking-wider hover:bg-[#C5A059] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
                data-purpose="product-grid"
              >
                {currentSwords.map((sword) => (
                  <ProductCard
                    key={sword.id}
                    sword={sword}
                    onSelect={(s) => setSelectedSword(s)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* Pagination Footer */}
            <div className="mt-12 flex justify-center items-center space-x-2 text-xs">
              {[1, 2, 3, 4, 5, 6].map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg <= totalPages ? pg : 1)}
                  className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                    currentPage === pg
                      ? 'border-[#C5A059] bg-[#C5A059] text-white font-medium'
                      : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => (p < 6 ? p + 1 : 1))}
                className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
              >
                Next ›
              </button>
            </div>
          </>
        )}
      </main>

      {/* Strategic Value Pillars (Derived from BMC) */}
      <StrategicValuePillars
        onOpenRestoration={() => setIsRestorationOpen(true)}
        onOpenAuthentication={() => setCurrentCategory('authentication')}
      />

      {/* Site Footer */}
      <Footer
        onSelectCategory={handleCategoryChange}
        onOpenRestoration={() => setIsRestorationOpen(true)}
        onOpenProvenanceFaq={() => setIsProvenanceFaqOpen(true)}
        onOpenAuthentication={() => setCurrentCategory('authentication')}
      />

      {/* Floating AI Katana Sensei Chatbot */}
      <SenseiChatbot
        initialQuestion={senseiTriggerQuestion}
        onClearInitialQuestion={() => setSenseiTriggerQuestion(null)}
        swords={SWORDS_DATABASE}
        onSelectSword={(s) => setSelectedSword(s)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        sword={selectedSword}
        onClose={() => setSelectedSword(null)}
        onAddToCart={handleAddToCart}
        onAskSenseiAboutSword={(sword) => {
          setSenseiTriggerQuestion(
            `Can you tell me more about the ${sword.name} (${sword.code}) and its ${sword.steel} metallurgy?`
          );
        }}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Restoration Services Modal */}
      <RestorationModal
        isOpen={isRestorationOpen}
        onClose={() => setIsRestorationOpen(false)}
      />

      {/* Provenance FAQs Modal */}
      <ProvenanceFaqModal
        isOpen={isProvenanceFaqOpen}
        onClose={() => setIsProvenanceFaqOpen(false)}
      />

      {/* Collector Account Dossier Modal */}
      <CollectorAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        earnedPoints={Math.floor(
          cartItems.reduce((s, i) => s + i.sword.price * i.quantity, 0) * 0.05
        )}
      />
    </div>
  );
}
