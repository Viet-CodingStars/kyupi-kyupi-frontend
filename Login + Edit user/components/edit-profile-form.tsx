"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Save } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function EditProfileForm() {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    gender: "",
    birthdate: "",
    bio: "",
  })
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        name: user.name || "",
        gender: user.gender || "",
        birthdate: user.birthdate || "",
        bio: user.bio || "",
      })
      setAvatarPreview(user.avatar || "/diverse-user-avatars.png")
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setAvatar(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let avatarData = avatarPreview
      if (avatar) {
        const reader = new FileReader()
        avatarData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(avatar)
        })
      }

      await updateProfile({
        ...formData,
        avatar: avatarData,
      })

      setSuccessMessage("Cập nhật hồ sơ thành công!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Update failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Ảnh đại diện</label>
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-secondary">
            <img
              src={avatarPreview || "/placeholder.svg"}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm file:mr-2 file:px-3 file:py-1 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer transition-smooth hover:border-primary/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Họ và Tên <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Họ và Tên"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="gender" className="block text-sm font-medium text-foreground">
          Giới tính <span className="text-destructive">*</span>
        </label>
        <select
          id="gender"
          required
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        >
          <option value="">Chọn giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="birthdate" className="block text-sm font-medium text-foreground">
          Ngày sinh
        </label>
        <input
          id="birthdate"
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="block text-sm font-medium text-foreground">
          Tiểu sử
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Hãy kể chút gì về bạn..."
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth resize-none hover:border-primary/50"
        />
      </div>

      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm animate-scale-in">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-8"
      >
        <Save size={20} />
        {loading ? "Đang cập nhật..." : "Lưu Thay Đổi"}
      </button>
    </form>
  )
}
