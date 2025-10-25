"use client";

/**
 * Enhanced Products Page
 * Advanced filtering, sorting, search, và quick view functionality
 */

import * as React from "react";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/cards/ProductCard";
import { products } from "@/lib/mock/products";
import { 
  Search, 
  Grid3x3, 
  List, 
  SlidersHorizontal,
  X,
  Eye,
  Heart,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/ui/price";
import { getRarityLabel } from "@/lib/ui/rarity";
import { toast } from "sonner";

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rarity" | "newest";
type ViewMode = "grid" | "list";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedRarity, setSelectedRarity] = React.useState("all");
  const [sortBy, setSortBy] = React.useState<SortOption>("newest");
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [priceRange, setPriceRange] = React.useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wishlist, setWishlist] = React.useState<Set<string>>(new Set());

  const itemsPerPage = 12;

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Rarity filter
      if (selectedRarity !== "all" && product.rarity !== selectedRarity) {
        return false;
      }

      // Price range filter
      if (priceRange.min && product.priceVND < parseInt(priceRange.min)) {
        return false;
      }
      if (priceRange.max && product.priceVND > parseInt(priceRange.max)) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.priceVND - b.priceVND;
        case "price-desc":
          return b.priceVND - a.priceVND;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "rarity":
          const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
          return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - 
                 (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
        case "newest":
        default:
          return 0; // Keep original order for newest
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedRarity, sortBy, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleWishlistToggle = (productId: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        toast.success("Removed from wishlist");
      } else {
        newWishlist.add(productId);
        toast.success("Added to wishlist");
      }
      return newWishlist;
    });
  };

  const handleQuickView = (_productId: string) => {
    toast.info("Quick view functionality coming soon");
  };

  const handleAddToCart = (_productId: string) => {
    toast.success("Added to cart");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedRarity("all");
    setPriceRange({ min: "", max: "" });
    setCurrentPage(1);
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory !== "all",
    selectedRarity !== "all",
    priceRange.min,
    priceRange.max
  ].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Search and Filters Header */}
      <Section title="Products">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-blue-600 text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 bg-zinc-900 border-zinc-800 text-zinc-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Jersey">Jerseys</SelectItem>
                <SelectItem value="Ball">Balls</SelectItem>
                <SelectItem value="Photo">Photos</SelectItem>
                <SelectItem value="Boots">Boots</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRarity} onValueChange={setSelectedRarity}>
              <SelectTrigger className="w-40 bg-zinc-900 border-zinc-800 text-zinc-200">
                <SelectValue placeholder="Rarity" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="common">Common</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-48 bg-zinc-900 border-zinc-800 text-zinc-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Advanced Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-zinc-400 hover:text-white"
                >
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-300">Min Price (VND)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-300">Max Price (VND)</label>
                  <Input
                    type="number"
                    placeholder="10000000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </span>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </Section>

      {/* Products Grid/List */}
      <Section title="">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  priceVND={product.priceVND}
                  images={product.images}
                  rarity={product.rarity}
                  accentHex={product.accentHex}
                />
                
                {/* Quick Actions Overlay */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleQuickView(product.id)}
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleWishlistToggle(product.id)}
                      className={`w-8 h-8 p-0 ${
                        wishlist.has(product.id) 
                          ? "bg-red-500 hover:bg-red-600 text-white" 
                          : "bg-white/90 hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleAddToCart(product.id)}
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors">
                <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                  {product.images[0] && (
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">{product.title}</h3>
                  <p className="text-sm text-zinc-400">{product.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {getRarityLabel(product.rarity)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">{formatPrice(product.priceVND, "VND")}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuickView(product.id)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleWishlistToggle(product.id)}
                      className={`bg-zinc-800 border-zinc-700 hover:bg-zinc-700 ${
                        wishlist.has(product.id) 
                          ? "text-red-500 border-red-500" 
                          : "text-zinc-200"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-8 gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 ${
                    currentPage === page 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
            >
              Next
            </Button>
          </div>
        )}
      </Section>
    </div>
  );
}


