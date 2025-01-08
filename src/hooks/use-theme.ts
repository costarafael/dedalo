"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

const THEME_KEY = "app-theme"
const VALID_THEMES: Theme[] = ["light", "dark", "system"]

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return

  try {
    const root = document.documentElement
    root.classList.remove("light", "dark")

    const finalTheme = theme === "system" ? getSystemTheme() : theme
    root.classList.add(finalTheme)

    // Atualiza a meta tag theme-color para melhor integração com dispositivos móveis
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      finalTheme === "dark" ? "#09090B" : "#ffffff"
    )

    // Persiste o tema escolhido
    if (theme !== "system") {
      localStorage.setItem(THEME_KEY, theme)
    }
  } catch (error) {
    console.error("Erro ao aplicar tema:", error)
  }
}

function getSavedTheme(): Theme {
  if (typeof window === "undefined") return "light"
  
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved && VALID_THEMES.includes(saved as Theme)) {
      return saved as Theme
    }
  } catch (error) {
    console.error("Erro ao ler tema salvo:", error)
  }
  
  return "light"
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getSavedTheme)
  const [mounted, setMounted] = useState(false)

  // Previne flash de tema errado durante SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  // Aplica o tema quando montar
  useEffect(() => {
    const savedTheme = getSavedTheme()
    applyTheme(savedTheme)
    setThemeState(savedTheme)
  }, [])

  // Aplica o tema quando mudar
  useEffect(() => {
    if (mounted) {
      applyTheme(theme)
    }
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    if (!VALID_THEMES.includes(newTheme)) {
      console.error("Tema inválido:", newTheme)
      return
    }

    localStorage.setItem(THEME_KEY, newTheme)
    setThemeState(newTheme)
    applyTheme(newTheme)
  }

  const currentTheme = theme === "system" ? getSystemTheme() : theme

  return {
    theme,
    setTheme,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
    // Não retorna valores até o componente estar montado para prevenir hidratação incorreta
    ...(mounted ? {} : { theme: undefined, isDark: undefined, isLight: undefined })
  }
} 