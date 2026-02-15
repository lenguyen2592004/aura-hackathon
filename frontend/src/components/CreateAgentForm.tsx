"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CreateAgentRequest } from "@/types/agent";
import { agentApi } from "@/lib/api";
import PersonaCard from "@/components/creator/PersonaCard";
import RelationshipSelector from "@/components/creator/RelationshipSelector";
import { ChevronRight, ChevronLeft, Sparkles, User, Heart, Check } from "lucide-react";

type Step = "personas" | "relationship" | "details" | "complete";

import { useTranslation, Language } from "@/lib/i18n";

export default function CreateAgentForm() {
  const router = useRouter();
  const [language] = useState<Language>("en");
  const t = useTranslation(language);

  const [currentStep, setCurrentStep] = useState<Step>("personas");
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [formData, setFormData] = useState<CreateAgentRequest>({
    name: "",
    description: "",
    system_prompt: "",
    gender: "female",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps: { id: Step; title: string; icon: React.ElementType }[] = [
    { id: "personas", title: t.createStepPersona, icon: Sparkles },
    { id: "relationship", title: t.createStepRelationship, icon: Heart },
    { id: "details", title: t.createStepDetails, icon: User },
    { id: "complete", title: t.createStepComplete, icon: Check },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const buildSystemPrompt = () => {
    // Translation logic for prompt generation should stay consistent but can use English descriptions
    const personaDescriptions: { [key: string]: string } = {
      cheerful: "cheerful, optimistic, tells funny stories",
      wise: "wise, shares experience, gives deep advice",
      nostalgic: "nostalgic, loves to remember the past",
      caring: "caring, concerned about health, medication reminders",
    };

    const relationshipPrompts: { [key: string]: string } = {
      grandchild_grandparent: "You are the user's grandchild. Address them as 'Grandparent' and refer to yourself as 'Grandchild'.",
      child_parent: "You are the user's child. Address them as 'Mom/Dad' and refer to yourself as 'Child'.",
      friend: "You are the user's close friend. Speak naturally as an equal.",
      caregiver: "You are a professional caregiver. Address them as 'Grandparent' and refer to yourself as 'Aura'.",
    };

    const personaText = selectedPersonas
      .map((p) => personaDescriptions[p])
      .join(", ");
    const relationshipText = relationshipPrompts[selectedRelationship] || "";

    return `You are Aura, a friendly AI companion for the elderly. ${relationshipText}

Your personality: ${personaText || "friendly, warm"}.

Communication rules:
- Speak slowly and clearly
- Short, easy-to-understand sentences
- Always end with an open question or a wish
- Avoid complex words or slang
- Show care and patience`;
  };

  const handleNext = () => {
    const stepOrder: Step[] = ["personas", "relationship", "details", "complete"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ["personas", "relationship", "details", "complete"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const systemPrompt = buildSystemPrompt();
      const newAgent = await agentApi.createAgent({
        ...formData,
        system_prompt: systemPrompt,
      });
      setCurrentStep("complete");
      
      // Auto redirect after 2 seconds
      setTimeout(() => {
        router.push(`/chat?agentId=${newAgent.id}`);
      }, 2000);
    } catch (err) {
      setError(t.errorCreateFailed);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "personas":
        return selectedPersonas.length > 0;
      case "relationship":
        return selectedRelationship !== "";
      case "details":
        return formData.name.trim() !== "";
      default:
        return true;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStepIndex > index;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-sage-500 text-white shadow-lg"
                        : isCompleted
                          ? "bg-sage-200 text-sage-700"
                          : "bg-warmGray-100 text-warmGray-400"
                    }
                  `}
                >
                  <Icon className="w-6 h-6" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-12 md:w-24 h-1 mx-2
                      ${isCompleted ? "bg-sage-300" : "bg-warmGray-200"}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-elderly-sm text-warmGray-500">
          {steps.map((step) => (
            <span key={step.id} className="text-center w-12 text-[10px] md:text-elderly-sm">
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-warm-lg text-elderly-base"
        >
          {error}
        </motion.div>
      )}

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-warm-2xl shadow-xl p-8"
      >
        <AnimatePresence mode="wait">
          {currentStep === "personas" && (
            <PersonaCard
              selectedPersonas={selectedPersonas}
              onSelectionChange={setSelectedPersonas}
            />
          )}

          {currentStep === "relationship" && (
            <RelationshipSelector
              selectedRelationship={selectedRelationship}
              onSelectionChange={setSelectedRelationship}
            />
          )}

          {currentStep === "details" && (
            <div className="space-y-6">
              <h3 className="font-display text-elderly-xl font-semibold text-navy-800">
                {t.namingTitle}
              </h3>
              <p className="text-elderly-base text-warmGray-500">
                {t.namingSubtitle}
              </p>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-elderly-base font-medium text-navy-700 mb-2">
                    {t.auraNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 text-elderly-lg border-2 border-warmGray-200 rounded-warm-xl focus:border-sage-400 focus:ring-4 focus:ring-sage-100 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.auraNamePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-elderly-base font-medium text-navy-700 mb-2">
                    {t.auraDescLabel}
                  </label>
                  <textarea
                    className="w-full px-5 py-4 text-elderly-base border-2 border-warmGray-200 rounded-warm-xl focus:border-sage-400 focus:ring-4 focus:ring-sage-100 transition-all min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t.auraDescPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-elderly-base font-medium text-navy-700 mb-2">
                    Voice Gender
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "female" })}
                      className={`flex-1 px-5 py-4 text-elderly-base border-2 rounded-warm-xl transition-all ${
                        formData.gender === "female"
                          ? "border-sage-400 bg-sage-50 text-sage-700 font-semibold"
                          : "border-warmGray-200 bg-white text-warmGray-600 hover:border-warmGray-300"
                      }`}
                    >
                      👩 Female
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "male" })}
                      className={`flex-1 px-5 py-4 text-elderly-base border-2 rounded-warm-xl transition-all ${
                        formData.gender === "male"
                          ? "border-sage-400 bg-sage-50 text-sage-700 font-semibold"
                          : "border-warmGray-200 bg-white text-warmGray-600 hover:border-warmGray-300"
                      }`}
                    >
                      👨 Male
                    </button>
                  </div>
                  <p className="text-elderly-sm text-warmGray-500 mt-2">
                    Voice will be automatically assigned based on gender
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === "complete" && (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-12 h-12 text-sage-600" />
              </motion.div>
              <h3 className="font-display text-elderly-2xl font-bold text-navy-800 mb-4">
                {t.createSuccessTitle}
              </h3>
              <p className="text-elderly-lg text-warmGray-600 mb-2">
                {formData.name || "Aura"} {t.createSuccessSubtitle}
              </p>
              <p className="text-elderly-base text-warmGray-500">
                {t.redirectingToChat}
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Buttons */}
      {currentStep !== "complete" && (
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === "personas"}
            className={`
              flex items-center gap-2 px-6 py-4 rounded-warm-xl
              text-elderly-lg font-medium transition-all duration-200
              ${
                currentStep === "personas"
                  ? "text-warmGray-300 cursor-not-allowed"
                  : "text-navy-600 hover:bg-warmGray-100"
              }
            `}
          >
            <ChevronLeft className="w-5 h-5" />
            {t.btnBack}
          </button>

          {currentStep === "details" ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || loading}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-warm-xl
                text-elderly-lg font-bold transition-all duration-200
                ${
                  canProceed() && !loading
                    ? "bg-sage-500 text-white hover:bg-sage-600 shadow-lg"
                    : "bg-warmGray-200 text-warmGray-400 cursor-not-allowed"
                }
              `}
            >
              {loading ? t.btnCreating : t.btnCreateAura}
              <Sparkles className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-warm-xl
                text-elderly-lg font-bold transition-all duration-200
                ${
                  canProceed()
                    ? "bg-sage-500 text-white hover:bg-sage-600 shadow-lg"
                    : "bg-warmGray-200 text-warmGray-400 cursor-not-allowed"
                }
              `}
            >
              {t.btnContinue}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
