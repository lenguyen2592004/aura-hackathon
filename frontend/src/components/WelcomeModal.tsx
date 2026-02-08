"use client";

import { useState } from "react";
import { WelcomeModalProps } from "@/types";
import { Heart, Sparkles, Shield, MessageCircle, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function WelcomeModal({
  onClose,
  language,
  onLanguageChange,
}: WelcomeModalProps) {
  const t = useTranslation(language);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  const handleComplete = () => {
    onClose(name || t.defaultName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden">
        {step === 1 && (
          <>
            <div className="p-8 text-center">
              {/* Welcome Animation */}
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-float">
                <span className="text-6xl">🌟</span>
              </div>

              <h1 className="text-elderly-2xl font-bold text-slate-800 mb-4">
                {t.welcomeTitle}
              </h1>
              <p className="text-elderly-lg text-slate-600 mb-6 leading-relaxed">
                {t.welcomeSubtitle}
              </p>

              <div className="flex items-center justify-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-slate-600" />
                <span className="text-base font-semibold text-slate-600">
                  {t.chooseLanguage}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => onLanguageChange("en")}
                  className={`
                    flex-1 py-3 px-4 rounded-xl text-base font-semibold transition-all
                    ${
                      language === "en"
                        ? "bg-indigo-500 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }
                  `}
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => onLanguageChange("vi")}
                  className={`
                    flex-1 py-3 px-4 rounded-xl text-base font-semibold transition-all
                    ${
                      language === "vi"
                        ? "bg-indigo-500 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }
                  `}
                >
                  🇻🇳 Tiếng Việt
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="
                w-full py-5
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white text-elderly-xl font-bold
                rounded-2xl
                hover:opacity-90
                transition-all
                shadow-lg hover:shadow-xl
              "
            >
              {t.getStarted}
            </button>
          </>
        )}

        {step === 2 && (
          <div className="p-8">
            <h2 className="text-elderly-xl font-bold text-slate-800 mb-6 text-center">
              {t.whatCanAuraDo}
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-elderly-lg font-semibold text-slate-800">
                    {t.feature1Title}
                  </h3>
                  <p className="text-elderly-sm text-slate-600">
                    {t.feature1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-elderly-lg font-semibold text-slate-800">
                    {t.feature2Title}
                  </h3>
                  <p className="text-elderly-sm text-slate-600">
                    {t.feature2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="text-elderly-lg font-semibold text-slate-800">
                    {t.feature3Title}
                  </h3>
                  <p className="text-elderly-sm text-slate-600">
                    {t.feature3Desc}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="
                w-full py-5
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white text-elderly-xl font-bold
                rounded-2xl
                hover:opacity-90
                transition-all
              "
            >
              {t.continue}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>

            <h2 className="text-elderly-xl font-bold text-slate-800 mb-4">
              {t.whatsYourName}
            </h2>
            <p className="text-elderly-base text-slate-600 mb-6">
              {t.namePrompt}
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.userNamePlaceholder}
              className="
                w-full px-6 py-5
                text-elderly-lg text-center
                bg-slate-50 border-2 border-slate-200
                rounded-2xl
                focus:border-blue-400 focus:ring-4 focus:ring-blue-100
                transition-all
                mb-6
              "
              autoFocus
            />

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="
                  flex-1 py-5
                  bg-slate-200 hover:bg-slate-300
                  text-slate-700 text-elderly-lg font-semibold
                  rounded-2xl
                  transition-all
                "
              >
                {t.back}
              </button>
              <button
                onClick={handleComplete}
                className="
                  flex-1 py-5
                  bg-gradient-to-r from-blue-500 to-purple-600
                  text-white text-elderly-lg font-bold
                  rounded-2xl
                  hover:opacity-90
                  transition-all
                "
              >
                {t.startNow}
              </button>
            </div>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 pb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`
                w-3 h-3 rounded-full transition-all
                ${step === s ? "bg-blue-500 w-8" : "bg-slate-300"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
