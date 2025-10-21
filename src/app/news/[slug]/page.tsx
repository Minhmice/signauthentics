"use client";
import Section from "@/components/ui/Section";
import { articles } from "@/lib/mock/articles";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { formatDate } from "@/lib/ui/format";

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = articles.find((a) => a.slug === slug) ?? articles[0];

  // Find prev/next articles
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <Section>
        <div className="relative w-full aspect-[16/6] rounded-2xl overflow-hidden">
          <Image src={article.image} alt={article.title} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </Section>

      {/* Article Content */}
      <Section>
        <article className="max-w-3xl mx-auto">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">{article.category}</div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{article.title}</h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-zinc-600 pb-6 border-b border-zinc-200 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author || "SignAuthentics Team"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.dateISO)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5 phút đọc</span>
            </div>
            <button className="flex items-center gap-2 ml-auto hover:text-accent transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ</span>
            </button>
          </div>

          {/* Excerpt */}
          <div className="text-xl text-zinc-600 leading-relaxed mb-8 font-light">{article.excerpt}</div>

          {/* Body (mock prose) */}
          <div className="prose prose-zinc max-w-none">
            <p>
              Trong thế giới đồ lưu niệm thể thao, những món đồ có chữ ký từ các cầu thủ huyền thoại không chỉ là vật phẩm sưu tầm mà còn là những khoản đầu tư giá trị. Mỗi món đồ
              đều mang trong mình một câu chuyện độc đáo, gắn liền với những khoảnh khắc lịch sử của bóng đá thế giới.
            </p>

            <h2>Giá trị của sự xác thực</h2>
            <p>
              Điều quan trọng nhất khi sưu tầm đồ lưu niệm có chữ ký là tính xác thực. Tại SignAuthentics, mỗi món đồ đều được kiểm định kỹ lưỡng bởi các chuyên gia và đi kèm với
              giấy chứng nhận chính thức. Điều này không chỉ đảm bảo giá trị hiện tại mà còn là yếu tố quyết định giá trị tương lai của món đồ.
            </p>

            <h2>Xu hướng thị trường</h2>
            <p>
              Thị trường đồ lưu niệm thể thao đang phát triển mạnh mẽ, đặc biệt là trong giai đoạn sau đại dịch. Các nhà sưu tầm ngày càng quan tâm đến những món đồ hiếm, đặc biệt là
              từ các cầu thủ Việt Nam tham gia các giải đấu quốc tế. Giá trị của những món đồ này đã tăng đáng kể trong những năm gần đây.
            </p>

            <h2>Lời khuyên cho người mới</h2>
            <p>
              Nếu bạn mới bắt đầu sưu tầm, hãy bắt đầu với những món đồ từ các cầu thủ mà bạn yêu thích. Tìm hiểu kỹ về lịch sử và xuất xứ của món đồ. Đừng ngại hỏi người bán về
              chứng nhận xác thực và nguồn gốc. Hãy nhớ rằng, sưu tầm đồ lưu niệm là một hành trình dài, đòi hỏi sự kiên nhẫn và đam mê.
            </p>

            <blockquote>
              <p>&ldquo;Mỗi món đồ lưu niệm không chỉ là một vật phẩm, mà là một phần của lịch sử bóng đá. Đó là lý do tại sao chúng tôi luôn đảm bảo tính xác thực 100%.&rdquo;</p>
              <cite>— Đội ngũ SignAuthentics</cite>
            </blockquote>

            <p>
              Với sự phát triển của công nghệ blockchain và NFT, tương lai của đồ lưu niệm thể thao hứa hẹn sẽ còn thú vị hơn nữa. Chúng tôi đang nghiên cứu các giải pháp để kết
              hợp giữa vật phẩm thực tế và chứng chỉ số, mang đến trải nghiệm hoàn toàn mới cho các nhà sưu tầm.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-zinc-200">
            <span className="text-sm text-zinc-600">Tags:</span>
            {["Sưu tầm", "Xác thực", "Đầu tư", "Bóng đá Việt Nam"].map((tag) => (
              <span key={tag} className="chip text-sm">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </Section>

      {/* Navigation */}
      <Section>
        <div className="flex items-center justify-between gap-4">
          {prevArticle ? (
            <Link href={`/news/${prevArticle.slug}`} className="group flex items-center gap-3 p-4 rounded-xl border border-zinc-200 hover:border-accent transition-colors flex-1">
              <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-accent transition-colors" />
              <div>
                <div className="text-xs text-zinc-500 mb-1">Bài trước</div>
                <div className="font-semibold group-hover:text-accent transition-colors line-clamp-1">{prevArticle.title}</div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextArticle ? (
            <Link href={`/news/${nextArticle.slug}`} className="group flex items-center gap-3 p-4 rounded-xl border border-zinc-200 hover:border-accent transition-colors flex-1 text-right">
              <div className="flex-1">
                <div className="text-xs text-zinc-500 mb-1">Bài tiếp theo</div>
                <div className="font-semibold group-hover:text-accent transition-colors line-clamp-1">{nextArticle.title}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-accent transition-colors" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </Section>
    </div>
  );
}


