import { useState, useEffect } from "react";
import { PortfolioData, initialData } from "@shared/portfolio-data";

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem("portfolio_data");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "K") {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem("portfolio_data", JSON.stringify(newData));
  };

  const login = (password: string) => {
    // Simple mock password
    if (password === "BKhs@4444") {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdminOpen(false);
  };

  return {
    data,
    updateData,
    isAdminOpen,
    setIsAdminOpen,
    isLoggedIn,
    login,
    logout,
  };
};
