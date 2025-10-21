import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Shield } from "lucide-react";

const mockUsers = [
  { id: "U001", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", role: "admin", joined: "2023-01-15", status: "active" },
  { id: "U002", name: "Trần Thị B", email: "tranthib@gmail.com", role: "user", joined: "2023-02-20", status: "active" },
  { id: "U003", name: "Lê Văn C", email: "levanc@gmail.com", role: "user", joined: "2023-03-10", status: "active" },
  { id: "U004", name: "Phạm Thị D", email: "phamthid@gmail.com", role: "moderator", joined: "2023-04-05", status: "active" },
  { id: "U005", name: "Hoàng Văn E", email: "hoangvane@gmail.com", role: "user", joined: "2023-05-12", status: "inactive" },
  { id: "U006", name: "Đặng Thị F", email: "dangthif@gmail.com", role: "user", joined: "2023-06-18", status: "active" },
  { id: "U007", name: "Vũ Văn G", email: "vuvang@gmail.com", role: "moderator", joined: "2023-07-22", status: "active" },
  { id: "U008", name: "Bùi Thị H", email: "buithih@gmail.com", role: "user", joined: "2023-08-30", status: "active" },
];

export default function DashboardUsersPage() {
  return (
    <div className="space-y-8">
      <Section title="Quản lý người dùng">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-zinc-600">{mockUsers.length} người dùng</div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm người dùng
          </Button>
        </div>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Tên</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Vai trò</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Ngày tham gia</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Trạng thái</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-mono">{user.id}</td>
                      <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-sm text-zinc-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`chip text-xs ${
                            user.role === "admin" ? "bg-purple-100 text-purple-700" : user.role === "moderator" ? "bg-blue-100 text-blue-700" : "bg-zinc-100 text-zinc-700"
                          }`}
                        >
                          <Shield className="w-3 h-3 inline mr-1" />
                          {user.role === "admin" ? "Admin" : user.role === "moderator" ? "Moderator" : "User"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{new Date(user.joined).toLocaleDateString("vi-VN")}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`chip text-xs ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-700"}`}>
                          {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
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
    </div>
  );
}


