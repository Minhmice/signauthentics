"use client";

/**
 * Content/Blog Management Page
 * Wireframe cho content management
 * Editor/Admin: Full, Seller: Read-only
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Eye, Calendar } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type Article = {
  id: string;
  title: string;
  author: string;
  tags: string[];
  featured: boolean;
  status: "published" | "draft" | "scheduled";
  publishDate: string;
  views: number;
};

const mockArticles: Article[] = [
  { id: "ART-001", title: "Quang Hải Signs New Jersey Collection", author: "Editor Jane", tags: ["news", "quang-hai"], featured: true, status: "published", publishDate: "2024-01-15", views: 1250 },
  { id: "ART-002", title: "Top 10 Most Valuable Signed Items", author: "Editor Jane", tags: ["guide", "collectibles"], featured: false, status: "published", publishDate: "2024-01-14", views: 890 },
  { id: "ART-003", title: "Interview with Công Phượng", author: "Admin User", tags: ["interview", "cong-phuong"], featured: true, status: "scheduled", publishDate: "2024-01-20", views: 0 },
  { id: "ART-004", title: "How to Authenticate Signed Jerseys", author: "Editor Jane", tags: ["guide", "authentication"], featured: false, status: "draft", publishDate: "2024-01-18", views: 0 },
];

const articleColumns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-sm max-w-md truncate">{row.original.title}</div>
        <div className="text-xs text-zinc-500 mt-0.5">By {row.original.author}</div>
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="px-1.5 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] rounded">
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => (
      <span className={`px-2 py-1 text-xs rounded-full ${row.original.featured ? "bg-yellow-500/10 text-yellow-500" : "bg-zinc-500/10 text-zinc-400"}`}>
        {row.original.featured ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const colorMap = {
        published: "bg-green-500/10 text-green-500",
        draft: "bg-zinc-500/10 text-zinc-400",
        scheduled: "bg-blue-500/10 text-blue-500",
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorMap[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "publishDate",
    header: "Publish Date",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
        <Calendar className="w-3 h-3" />
        {new Date(row.original.publishDate).toLocaleDateString("vi-VN")}
      </span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 text-sm">
        <Eye className="w-3.5 h-3.5 text-zinc-500" />
        {row.original.views.toLocaleString()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-zinc-800 rounded transition-colors">
          <Edit className="w-4 h-4 text-zinc-400" />
        </button>
        <button className="p-2 hover:bg-red-900/50 rounded transition-colors">
          <Trash className="w-4 h-4 text-red-500" />
        </button>
      </div>
    ),
  },
];

export default function DashboardBlogPage() {
  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Content"
        description="Blog & news management (Title, Tags, Featured, Status, Publish Date)"
        visibleFor={["admin", "editor"]}
        readOnlyFor={["seller"]}
        actions={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        }
      />

      <DataTable
        columns={articleColumns}
        data={mockArticles}
        searchKey="title"
        searchPlaceholder="Search articles..."
        pageSize={10}
      />

      {/* Wireframe Note */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Editor Features:</strong> Rich text editor, Media upload, SEO fields, Publish schedule
        </p>
      </div>
    </div>
  );
}
