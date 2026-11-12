import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang, Text } from '../types'
import { ru, type Dict } from './ru'
import { kz } from './kz'

const dicts: Record<Lang, Dict> = { ru, kz }
const STORAGE_KEY = 'dala-lang'

interface LangValue {
  lang: Lang
  setLang: (l: Lang) => void
  /** UI dictionary for the active language */
  t: Dict
  /** pick the active-language variant of a bilingual data string */
  tr: (text: Text) => string
}

const LangContext = createContext<LangValue | null>(null)

function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'ru' || v === 'kz') return v
  } catch {
    /* storage may be unavailable */
  }
  return 'ru'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru'
  }, [lang])

  const value = useMemo<LangValue>(
    () => ({ lang, setLang, t: dicts[lang], tr: (text) => text[lang] }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}

/** Formats a tenge amount like "185 000 ₸". */
export function formatPrice(n: number): string {
  return n.toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₸'
}
