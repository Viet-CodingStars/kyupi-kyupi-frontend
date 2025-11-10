"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export interface UserData {
  email: string
  name: string
  password: string
  gender: string
  birthdate: string
  bio: string
  avatar?: string
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("kyupikyupi_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data:", error)
        localStorage.removeItem("kyupikyupi_user")
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (userData: UserData) => {
    const existingUsers = JSON.parse(localStorage.getItem("kyupikyupi_users") || "[]")

    if (existingUsers.some((u: UserData) => u.email === userData.email)) {
      throw new Error("Email này đã được đăng ký")
    }

    existingUsers.push(userData)
    localStorage.setItem("kyupikyupi_users", JSON.stringify(existingUsers))
    localStorage.setItem("kyupikyupi_user", JSON.stringify(userData))
    setUser(userData)
  }

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("kyupikyupi_users") || "[]")
    const foundUser = users.find((u: UserData) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error("Email hoặc mật khẩu không chính xác")
    }

    localStorage.setItem("kyupikyupi_user", JSON.stringify(foundUser))
    setUser(foundUser)
    return foundUser
  }

  const logout = () => {
    localStorage.removeItem("kyupikyupi_user")
    setUser(null)
    router.push("/")
  }

  const updateProfile = async (updatedData: Partial<UserData>) => {
    if (!user) throw new Error("User not logged in")

    const updatedUser = { ...user, ...updatedData }
    const users = JSON.parse(localStorage.getItem("kyupikyupi_users") || "[]")
    const userIndex = users.findIndex((u: UserData) => u.email === user.email)

    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem("kyupikyupi_users", JSON.stringify(users))
    }

    localStorage.setItem("kyupikyupi_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  return { user, isLoading, signup, login, logout, updateProfile }
}
