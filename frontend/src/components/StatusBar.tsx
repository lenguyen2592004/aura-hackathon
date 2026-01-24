"use client";

import { StatusBarProps } from "@/types";
import { Wifi, WifiOff, Settings, HelpCircle, Home } from "lucide-react";

export default function StatusBar({
  isConnected,
  onSettingsClick,
}: StatusBarProps) {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🌟</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Aura
            </h1>
            <p className="text-base text-slate-500">
              Người bạn AI đồng hành cho người cao tuổi
            </p>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-lg text-slate-600 hover:text-blue-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Trang chủ
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-lg text-slate-600 hover:text-blue-600 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            Hướng dẫn
          </a>
        </nav>

        {/* Right - Status & Settings */}
        <div className="flex items-center gap-3">
          {/* Connection Status */}
          <div
            className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-base
            ${
              isConnected
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
          >
            {isConnected ? (
              <Wifi className="w-5 h-5" />
            ) : (
              <WifiOff className="w-5 h-5" />
            )}
            <span className="font-medium hidden sm:inline">
              {isConnected ? "Đã kết nối" : "Mất kết nối"}
            </span>
          </div>

          {/* Settings Button */}
          <button
            onClick={onSettingsClick}
            className="
              w-12 h-12
              bg-slate-100 hover:bg-slate-200
              rounded-xl
              flex items-center justify-center
              transition-all duration-200
            "
            aria-label="Cài đặt"
          >
            <Settings className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
