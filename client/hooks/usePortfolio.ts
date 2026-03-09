import { useState, useEffect } from "react";
import { PortfolioData, initialData } from "@shared/portfolio-data";

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData>(initialData);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch initial data from server
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(serverData => {
        setData(serverData);
      })
      .catch(err => {
        console.error("Failed to fetch portfolio data from server:", err);
      });
  }, []);

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

  const updateData = async (newData: PortfolioData) => {
    try {
      setData(newData);
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!response.ok) throw new Error("Failed to save data to server");
    } catch (error) {
      console.error("Error updating portfolio data:", error);
      // Optional: Rollback state or notify user
    }
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
