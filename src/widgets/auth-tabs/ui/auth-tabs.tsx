"use client";

import { useState } from "react";
import { SigninFormContainer } from "@/features/auth/signin";
import { SignupFormContainer } from "@/features/auth/signup";

type TabType = "signin" | "signup";

export const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("signin");

  return (
    <div className="w-full space-y-6">
      {/* Tabs Header */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <button
          onClick={() => setActiveTab("signin")}
          className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all ${
            activeTab === "signin"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Đăng Nhập
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all ${
            activeTab === "signup"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Đăng Ký
        </button>
      </div>

      {/* Tabs Content */}
      <div className="animate-fade-in">
        {activeTab === "signin" ? <SigninFormContainer /> : <SignupFormContainer />}
      </div>
    </div>
  );
};
