"use client";
import Section from "@/components/ui/Section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import ProductCard from "@/app/(landing)/components/cards/ProductCard";
import ArticleCard from "@/app/(landing)/components/cards/ArticleCard";
import { collections } from "@/lib/mock/collections";
import { products } from "@/lib/mock/products";
import { articles } from "@/lib/mock/articles";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Package, Sparkles, TrendingUp } from "lucide-react";

export default function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const collection = collections.find((c) => c.slug === slug) ?? collections[0];
  const [tab, setTab] = useState("overview");

  // Set accent based on collection
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", collection.accentHex);
    return () => {
      document.documentElement.style.setProperty("--accent", "#0EA5E9");
    };
  }, [collection.accentHex]);

  const collectionProducts = products.slice(0, 6);
  const collectionArticles = articles.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Collection Banner */}
      <Section>
        <div className="relative w-full aspect-[21/7] rounded-2xl overflow-hidden">
          <Image src={collection.heroImage} alt={collection.name} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              Bộ sưu tập độc quyền
            </div>
            <h1 className="text-6xl font-bold mb-3">{collection.name}</h1>
            <p className="text-xl text-zinc-200 max-w-2xl">{collection.description}</p>
          </div>
        </div>
      </Section>

      {/* Content with Sidebar */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="products">Sản phẩm</TabsTrigger>
                <TabsTrigger value="stories">Câu chuyện</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                {/* Overview content */}
              </TabsContent>
              <TabsContent value="products">
                {/* Products content */}
              </TabsContent>
              <TabsContent value="stories">
                {/* Stories content */}
              </TabsContent>
            </Tabs>

            {/* Overview Tab */}
            {tab === "overview" && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3>Về bộ sưu tập này</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {collection.description} Bộ sưu tập này bao gồm những món đồ lưu niệm quý giá và độc đáo từ các cầu thủ hàng đầu. Mỗi món đồ đều được xác thực kỹ lưỡng và đi
                    kèm chứng nhận chính thức.
                  </p>
                </div>

                {/* Featured Products Preview */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sản phẩm nổi bật</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {collectionProducts.slice(0, 3).map((p) => (
                      <ProductCard key={p.id} id={p.id} title={p.title} priceVND={p.priceVND} images={p.images} rarity={p.rarity} accentHex={collection.accentHex} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {tab === "products" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {collectionProducts.map((p) => (
                  <ProductCard key={p.id} id={p.id} title={p.title} priceVND={p.priceVND} images={p.images} rarity={p.rarity} accentHex={collection.accentHex} />
                ))}
              </div>
            )}

            {/* Stories Tab */}
            {tab === "stories" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collectionArticles.map((article) => (
                  <ArticleCard key={article.id} title={article.title} image={article.image} dateISO={article.dateISO} excerpt={article.excerpt} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About Collection */}
            <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50">
              <h3 className="text-lg font-semibold mb-4">Thông tin bộ sưu tập</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Số lượng món đồ</div>
                    <div className="text-sm text-zinc-600">50+ sản phẩm độc quyền</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Độ hiếm</div>
                    <div className="text-sm text-zinc-600">Legendary & Epic items</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Giá trị</div>
                    <div className="text-sm text-zinc-600">Tăng giá theo thời gian</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6 rounded-2xl border border-zinc-200">
              <h3 className="text-lg font-semibold mb-4">Thống kê</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Tổng sản phẩm</span>
                  <span className="font-bold text-accent">52</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Đã bán</span>
                  <span className="font-bold">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Còn lại</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "54%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}


