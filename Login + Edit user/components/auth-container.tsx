"use client"

import { useState } from "react"
import Image from "next/image"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

export function AuthContainer() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left - Hero Section with Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-primary via-primary/90 to-primary/80 px-12 py-16 text-primary-foreground flex-col justify-between animate-fade-in-down overflow-y-auto">
        <div className="flex items-center gap-4 animate-fade-in-up">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center overflow-hidden backdrop-blur-sm flex-shrink-0">
            <Image
              src="/kyupikyupi_icon.png"
              alt="KyupiKyupi logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-sans">KyupiKyupi</h1>
            <p className="text-primary-foreground/95 text-sm">Quân sư tốt nhất cho việc hẹn hò của bạn</p>
          </div>
        </div>

        {/* Features Section at bottom */}
        <div className="space-y-8 pb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div>
              <h3 className="font-bold text-base text-primary-foreground">Tìm Đối Tượng Phù Hợp</h3>
              <p className="text-primary-foreground/75 text-sm mt-1">AI thông minh khám phá hỗ trợ tương thích</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💬</span>
            <div>
              <h3 className="font-bold text-base text-primary-foreground">Giao Tiếp Tự Tin</h3>
              <p className="text-primary-foreground/75 text-sm mt-1">Lời khuyên AI cho những cuộc trò chuyện dân</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">✨</span>
            <div>
              <h3 className="font-bold text-base text-primary-foreground">Hẹn Hò Hoàn Hảo</h3>
              <p className="text-primary-foreground/75 text-sm mt-1">Hướng dẫn chi tiết cho mỗi cuộc gặp gỡ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 sm:px-12 py-12 bg-white">
        <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="/kyupikyupi_icon.png"
                alt="KyupiKyupi logo"
                width={48}
                height={48}
                className="rounded-lg animate-pulse-glow"
              />
              <h1 className="text-2xl font-bold font-sans text-foreground">KyupiKyupi</h1>
            </div>
            <p className="text-muted-foreground text-sm">Quân sư tốt nhất cho việc hẹn hò của bạn</p>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 mb-8 bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-smooth ${
                activeTab === "login"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Đăng Nhập
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-smooth ${
                activeTab === "signup"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Đăng Ký
            </button>
          </div>

          {/* Form content */}
          <div>{activeTab === "login" ? <LoginForm /> : <SignupForm />}</div>
        </div>
      </div>
    </div>
  )
}
