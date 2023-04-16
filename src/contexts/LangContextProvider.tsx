import { ReactNode, useState } from 'react'
import { IntlProvider } from 'react-intl'
import LangContext from './LangContext'

type LangContextProviderProps = {
  children: ReactNode
}

export default function LangContextProvider ({ children }: LangContextProviderProps) {
  const [lang, setLang] = useState<'id' | 'en'>('id')

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <IntlProvider locale={lang} defaultLocale='id'>
        {children}
      </IntlProvider>
    </LangContext.Provider>
  )
}
