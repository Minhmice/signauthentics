import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import { articles } from "@/lib/mock/articles";
import { formatDate } from "@/lib/ui/format";

export default function DashboardBlogPage() {
  return (
    <div className="space-y-8">
      {/* Posts List */}
      <Section title="Quản lý bài viết">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-zinc-600">{articles.length} bài viết</div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tạo bài viết mới
          </Button>
        </div>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Tiêu đề</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Danh mục</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Tác giả</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Ngày đăng</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium line-clamp-2">{article.title}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="chip text-xs">{article.category}</span>
                      </td>
                      <td className="py-3 px-4 text-sm">{article.author}</td>
                      <td className="py-3 px-4 text-sm">{formatDate(article.dateISO)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-zinc-600" />
                          </button>
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-zinc-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Editor Placeholder */}
      <Section title="Trình soạn thảo">
        <Card>
          <CardContent>
            <div className="h-72 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl">
              <div className="text-center text-zinc-400">
                <Edit className="w-12 h-12 mx-auto mb-2" />
                <div className="text-sm">Khu vực soạn thảo bài viết</div>
                <div className="text-xs">(Rich text editor placeholder)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}


