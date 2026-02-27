import type { ReactNode } from "react"

export interface WebinarItem {
  date: string
  time: string
  topic: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  buttonLink?: string
  showDetails?: boolean
  webinars?: WebinarItem[]
  faq?: FaqItem[]
}

export interface SectionProps extends Section {
  isActive: boolean
}
