import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SavedContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id],
    );
    // TODO: 실제로는 여기서 API 호출 (찜 등록/해제) 필요
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