"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { EditProfileForm } from "@/components/edit-profile-form"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"
import { LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/90 to-primary/70 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/90 to-primary/70 flex">
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-4 animate-fade-in-up">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center overflow-hidden backdrop-blur-sm">
            <Image
              src="/kyupikyupi_icon.png"
              alt="KyupiKyupi"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">KyupiKyupi</h1>
            <p className="text-white/80">Quân sư tốt nhất cho việc hẹn hò của bạn</p>
          </div>
        </div>

        <div className="space-y-8 pb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💞</span>
            <div>
              <h3 className="font-bold text-xl mb-1">Tìm Đối Tượng Phù Hợp</h3>
              <p className="text-white/70 text-sm">AI thông minh khám phá hộ so tương thích</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">☁️</span>
            <div>
              <h3 className="font-bold text-xl mb-1">Giao Tiếp Tự Tin</h3>
              <p className="text-white/70 text-sm">Lời khuyên AI cho những cuộc trò chuyện hấp dẫn</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <h3 className="font-bold text-xl mb-1">Hẹn Hò Hoàn Hảo</h3>
              <p className="text-white/70 text-sm">Hướng dẫn chi tiết cho mỗi cuộc gặp gỡ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-white/95 backdrop-blur-sm flex flex-col justify-center p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-lg mx-auto w-full animate-slide-in-right">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Chỉnh sửa Hồ Sơ</h2>
              <p className="text-muted-foreground">Xin chào, {user.name}!</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-smooth hover:scale-105"
            >
              <LogOut size={18} />
              Đăng Xuất
            </button>
          </div>
          <EditProfileForm />
        </div>
      </div>
    </div>
  )
}
