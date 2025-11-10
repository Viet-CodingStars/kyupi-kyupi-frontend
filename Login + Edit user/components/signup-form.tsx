"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
    bio: "",
  })
  const [avatar, setAvatar] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signup } = useAuth()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Mật khẩu không khớp")
      }

      if (formData.password.length < 6) {
        throw new Error("Mật khẩu phải ít nhất 6 ký tự")
      }

      let avatarData = ""
      if (avatar) {
        const reader = new FileReader()
        avatarData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(avatar)
        })
      }

      await signup({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        gender: formData.gender,
        birthdate: formData.birthdate,
        bio: formData.bio,
        avatar: avatarData,
      })

      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng ký thất bại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      {[
        {
          id: "signup-email",
          label: "Email",
          type: "email",
          required: true,
          name: "email",
          value: formData.email,
        },
        {
          id: "signup-name",
          label: "Họ và Tên",
          type: "text",
          required: true,
          name: "name",
          value: formData.name,
        },
      ].map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block text-sm font-medium text-foreground">
            {field.label} {field.required && <span className="text-destructive">*</span>}
          </label>
          <input
            id={field.id}
            type={field.type}
            required={field.required}
            name={field.name}
            value={field.value}
            onChange={handleInputChange}
            placeholder={field.label}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
          />
        </div>
      ))}

      <div className="space-y-2">
        <label htmlFor="signup-gender" className="block text-sm font-medium text-foreground">
          Giới tính <span className="text-destructive">*</span>
        </label>
        <select
          id="signup-gender"
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
        <label htmlFor="signup-birthdate" className="block text-sm font-medium text-foreground">
          Ngày sinh
        </label>
        <input
          id="signup-birthdate"
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-bio" className="block text-sm font-medium text-foreground">
          Tiểu sử
        </label>
        <textarea
          id="signup-bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Hãy kể chút gì về bạn..."
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth resize-none hover:border-primary/50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-avatar" className="block text-sm font-medium text-foreground">
          Ảnh đại diện
        </label>
        <div className="flex items-center gap-3">
          <input
            id="signup-avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm file:mr-2 file:px-3 file:py-1 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer transition-smooth hover:border-primary/50"
          />
        </div>
        {avatar && <p className="text-sm text-muted-foreground animate-scale-in">Đã chọn: {avatar.name}</p>}
      </div>

      {[
        {
          id: "signup-password",
          label: "Mật khẩu",
          type: "password",
          required: true,
          name: "password",
          value: formData.password,
        },
        {
          id: "signup-confirm-password",
          label: "Xác nhận mật khẩu",
          type: "password",
          required: true,
          name: "confirmPassword",
          value: formData.confirmPassword,
        },
      ].map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block text-sm font-medium text-foreground">
            {field.label} <span className="text-destructive">*</span>
          </label>
          <input
            id={field.id}
            type={field.type}
            required={field.required}
            name={field.name}
            value={field.value}
            onChange={handleInputChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
      >
        {loading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản"}
      </button>
    </form>
  )
}
