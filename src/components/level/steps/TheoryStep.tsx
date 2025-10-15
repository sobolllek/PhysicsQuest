import React from "react";
import { MathJax } from "better-react-mathjax";
import { Button } from "@/components/ui/button";


interface TheoryStepProps {
  step: {
    content: string;
  };
  onComplete: () => void;
}

export function TheoryStep({ step, onComplete }: TheoryStepProps) {
  const handleContinue = () => {
    onComplete();
  };

  // Заменяем двойные слэши \\ на одинарные для MathJax
  const processedContent = step.content?.replace(/\\\\/g, "\\") || "";

  // Разбиваем контент на части, разделяя формулы и текст
  const parts = processedContent.split(/(\\[.*?\\])/g).filter(part => part.trim() !== "");

  return (
    <div className="space-y-6 relative">
      <div className="relative prose prose-sm max-w-none text-foreground mt-2 px-4 pb-20 leading-none">
        <MathJax dynamic>
          {parts.map((part, idx) => {
            // Проверяем, является ли часть формулой (начинается с \[ или \( )
            const isFormula = part.match(/^\\[\[\(].*\\[\]\)]$/);
            return (
              <div
                key={idx}
                className={isFormula ? "text-center my-4" : "text-left"}
                style={isFormula ? { fontSize: "1.2em" } : {}}
              >
                <span dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, "<br />") }} />
              </div>
            );
          })}
        </MathJax>

        {/* Верхний фиксированный градиент */}
        <div 
          className="fixed top-0 left-0 right-0 h-[170px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 1) 130px, rgba(255, 255, 255, 0) 200px)",
            zIndex: 10,
          }}
        />
        {/* Нижний фиксированный градиент */}
        <div 
          className="fixed bottom-0 left-0 right-0 h-[170px] pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(255, 255, 255, 1) 10px, rgba(255, 255, 255, 0) 130px)",
            zIndex: 10,
          }}
        />
      </div>

      <div
        className="fixed bottom-5 left-0 right-0 flex justify-center"
        style={{ zIndex: 20 }}
      >
        <Button
          onClick={handleContinue}
          size="lg"
          className="min-w-[150px] bg-[#4997FC] text-white"
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
}