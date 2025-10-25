"use client";
import Section from "@/components/ui/Section";
import { ArticleCard } from "@/app/(landing)/components/cards/ArticleCard";
import { articles } from "@/lib/mock/articles";
import { useState } from "react";
import { Newspaper, TrendingUp } from "lucide-react";
import Link from "next/link";

const categories = ["Tất cả", "Tin tức", "Phỏng vấn", "Sự kiện", "Đánh giá", "Hậu trường"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredArticles = selectedCategory === "Tất cả" ? articles : articles.filter((a) => a.category === selectedCategory);

  // Most read (mock - first 5)
  const mostRead = articles.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Section>
        <div className="relative w-full aspect-[21/7] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
            <Newspaper className="w-16 h-16 mb-4" />
            <h1 className="text-5xl font-bold mb-4">Tin tức & Câu chuyện</h1>
            <p className="text-xl text-cyan-100 max-w-2xl">Cập nhật những tin tức mới nhất về thế giới đồ lưu niệm thể thao và các cầu thủ</p>
          </div>
        </div>
      </Section>

      {/* Categories */}
      <Section title="Danh mục">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`chip cursor-pointer transition-all ${selectedCategory === cat ? "bg-accent text-white" : "hover:border-accent"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      {/* Articles with Sidebar */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Articles Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">{selectedCategory === "Tất cả" ? "Tất cả bài viết" : selectedCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} title={article.title} image={article.image} dateISO={article.dateISO} excerpt={article.excerpt} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Most Read */}
            <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Đọc nhiều nhất</h3>
              </div>
              <div className="space-y-4">
                {mostRead.map((article, index) => (
                  <Link key={article.id} href={`/news/${article.slug}`} className="group block">
                    <div className="flex gap-3">
                      <div className="text-3xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors">{index + 1}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-accent transition-colors">{article.title}</h4>
                        <p className="text-xs text-zinc-500 mt-1">{new Date(article.dateISO).toLocaleDateString("vi-VN")}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent to-blue-600 text-white">
              <h3 className="text-lg font-semibold mb-2">Đăng ký nhận tin</h3>
              <p className="text-sm opacity-90 mb-4">Nhận tin tức mới nhất qua email</p>
              <input type="email" placeholder="Email của bạn" className="w-full px-4 py-2 rounded-lg text-zinc-900 mb-3" />
              <button className="w-full bg-white text-accent font-semibold py-2 rounded-lg hover:bg-zinc-100 transition-colors">Đăng ký</button>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}


