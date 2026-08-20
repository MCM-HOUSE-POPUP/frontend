import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

interface SavedContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // 초기 로딩: 서버에서 저장된 상품 목록 받아오기
  useEffect(() => {
    const resultId = localStorage.getItem("resultId");
    if (!resultId) return;

    async function fetchSaved() {
      try {
        const response = await fetch(
          `${API_URL}/api/results/${resultId}/saved`,
        );
        if (!response.ok) throw new Error(`서버 응답 에러: ${response.status}`);
        const data: { id: string }[] = await response.json();
        setSavedIds(data.map((product) => product.id));
      } catch (err) {
        console.error("저장 목록 조회 실패:", err);
      }
    }

    fetchSaved();
  }, []);

  const toggleSave = async (id: string) => {
    const resultId = localStorage.getItem("resultId");
    if (!resultId) {
      console.error("진단 결과 정보가 없어요.");
      return;
    }

    const wasSaved = savedIds.includes(id);

    // 화면 먼저 즉시 반영 (낙관적 업데이트)
    setSavedIds((prev) =>
      wasSaved ? prev.filter((savedId) => savedId !== id) : [...prev, id],
    );

    try {
      if (wasSaved) {
        const response = await fetch(
          `${API_URL}/api/results/${resultId}/saved/${id}`,
          { method: "DELETE" },
        );
        if (!response.ok) throw new Error(`서버 응답 에러: ${response.status}`);
      } else {
        const response = await fetch(
          `${API_URL}/api/results/${resultId}/saved`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: id }),
          },
        );
        if (!response.ok) throw new Error(`서버 응답 에러: ${response.status}`);
      }
    } catch (err) {
      console.error("저장/취소 실패:", err);
      // 실패하면 원래 상태로 되돌리기
      setSavedIds((prev) =>
        wasSaved ? [...prev, id] : prev.filter((savedId) => savedId !== id),
      );
    }
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved는 SavedProvider 내부에서만 사용할 수 있어요");
  }
  return context;
}
