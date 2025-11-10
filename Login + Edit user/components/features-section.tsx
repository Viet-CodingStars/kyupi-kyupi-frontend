"use client"

import { MessageCircle, Sparkles, Heart } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "Tìm Đối Tượng Phù Hợp",
      description: "AI thông minh khám phá hộ so tương thích",
    },
    {
      icon: MessageCircle,
      title: "Giao Tiếp Tự Tin",
      description: "Lời khuyên AI cho những cuộc trò chuyện hấp dẫn",
    },
    {
      icon: Heart,
      title: "Hẹn Hò Hoàn Hảo",
      description: "Hướng dẫn chi tiết cho mỗi cuộc gặp gỡ",
    },
  ]

  return (
    <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="flex flex-col items-start gap-3 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="p-3 bg-primary/20 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
