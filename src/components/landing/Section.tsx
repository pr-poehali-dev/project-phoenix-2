import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import type { SectionProps, WebinarItem, FaqItem } from "@/types"

function WebinarTable({ webinars, isActive }: { webinars: WebinarItem[]; isActive: boolean }) {
  return (
    <motion.div
      className="mt-6 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--brand-border)' }}>
        <div
          className="grid grid-cols-[130px_1fr] px-5 py-3 text-xs uppercase tracking-widest"
          style={{ backgroundColor: 'var(--brand-dark)', color: 'var(--brand-cream)', opacity: 1 }}
        >
          <span>Дата</span>
          <span>Тема</span>
        </div>
        {webinars.map((w, i) => (
          <motion.div
            key={i}
            className="grid grid-cols-[130px_1fr] px-5 py-3.5 transition-colors"
            style={{
              borderTop: '1px solid var(--brand-border)',
              backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(44,36,22,0.03)',
            }}
            initial={{ opacity: 0, x: -15 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.35 + i * 0.04 }}
          >
            <div>
              <div className="font-cormorant text-base font-semibold" style={{ color: 'var(--brand-dark)' }}>{w.date}</div>
              <div className="text-xs mt-0.5 opacity-50" style={{ color: 'var(--brand-dark)' }}>{w.time}</div>
            </div>
            <div className="text-sm leading-snug self-center" style={{ color: 'var(--brand-dark)', opacity: 0.75 }}>{w.topic}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function FaqBlock({ faq, isActive }: { faq: FaqItem[]; isActive: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <motion.div
      className="mt-8 w-full max-w-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="space-y-2">
        {faq.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--brand-border)' }}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              style={{ backgroundColor: openIndex === i ? 'var(--brand-dark)' : 'transparent' }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span
                className="font-golos font-medium text-sm md:text-base pr-4"
                style={{ color: openIndex === i ? 'var(--brand-cream)' : 'var(--brand-dark)' }}
              >
                {item.question}
              </span>
              <Icon
                name={openIndex === i ? "ChevronUp" : "ChevronDown"}
                size={18}
                style={{ color: openIndex === i ? 'var(--brand-cream)' : 'var(--brand-dark)', opacity: 0.6, flexShrink: 0 }}
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-5 pb-4 text-sm leading-relaxed pt-3"
                    style={{ borderTop: '1px solid var(--brand-border)', color: 'var(--brand-dark)', opacity: 0.7 }}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function PriceCards({ isActive }: { isActive: boolean }) {
  const plans = [
    {
      name: 'Участник',
      tag: 'Бесплатно',
      price: '0 ₽',
      features: ['Доступ к прямому эфиру', 'Чат участников', 'Сертификат об участии'],
      cta: 'Зарегистрироваться',
      highlight: false,
    },
    {
      name: 'Профессионал',
      tag: 'Популярный',
      price: '990 ₽',
      period: '/ вебинар',
      features: ['Запись вебинара', 'Расширенные материалы', 'Приоритетные вопросы', 'Сертификат с часами'],
      cta: 'Выбрать тариф',
      highlight: true,
    },
    {
      name: 'Подписка',
      tag: 'Выгодно',
      price: '5 990 ₽',
      period: '/ год',
      features: ['Все вебинары года', 'Все записи архива', 'Закрытый чат сообщества', 'Приоритетная поддержка'],
      cta: 'Оформить подписку',
      highlight: false,
    },
  ]

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          className="rounded-2xl p-6 flex flex-col"
          style={{
            border: plan.highlight ? '2px solid var(--brand-dark)' : '1px solid var(--brand-border)',
            backgroundColor: plan.highlight ? 'var(--brand-dark)' : 'transparent',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.25 + i * 0.1 }}
        >
          <div className="flex items-start justify-between mb-4">
            <span
              className="font-cormorant text-xl font-semibold"
              style={{ color: plan.highlight ? 'var(--brand-cream)' : 'var(--brand-dark)' }}
            >
              {plan.name}
            </span>
            <span
              className="text-xs uppercase tracking-widest px-2 py-1 rounded-full"
              style={{
                backgroundColor: plan.highlight ? 'rgba(245,239,230,0.15)' : 'rgba(44,36,22,0.08)',
                color: plan.highlight ? 'var(--brand-cream)' : 'var(--brand-dark)',
              }}
            >
              {plan.tag}
            </span>
          </div>

          <div className="mb-6">
            <span
              className="font-cormorant text-4xl font-bold"
              style={{ color: plan.highlight ? 'var(--brand-cream)' : 'var(--brand-dark)' }}
            >
              {plan.price}
            </span>
            {plan.period && (
              <span
                className="text-sm ml-1 opacity-60"
                style={{ color: plan.highlight ? 'var(--brand-cream)' : 'var(--brand-dark)' }}
              >
                {plan.period}
              </span>
            )}
          </div>

          <ul className="space-y-2 flex-1 mb-6">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Icon
                  name="Check"
                  size={15}
                  className="mt-0.5 shrink-0"
                  style={{ color: plan.highlight ? 'var(--brand-cream)' : 'var(--brand-brown)' }}
                />
                <span style={{ color: plan.highlight ? 'rgba(245,239,230,0.8)' : 'var(--brand-dark)', opacity: plan.highlight ? 1 : 0.75 }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <button
            className="w-full py-3 rounded-xl text-sm font-medium tracking-wide transition-all hover:opacity-80"
            style={{
              backgroundColor: plan.highlight ? 'var(--brand-cream)' : 'var(--brand-dark)',
              color: plan.highlight ? 'var(--brand-dark)' : 'var(--brand-cream)',
            }}
          >
            {plan.cta}
          </button>
        </motion.div>
      ))}
    </div>
  )
}

export default function Section({
  id,
  title,
  subtitle,
  content,
  isActive,
  showButton,
  buttonText,
  buttonLink,
  webinars,
  faq,
}: SectionProps) {
  const [showSchedule, setShowSchedule] = useState(false)
  const isPrice = id === 'price'
  const isHero = id === 'hero'

  return (
    <section
      id={id}
      className="relative h-screen w-full snap-start flex flex-col justify-center overflow-y-auto"
      style={{ paddingTop: '80px', paddingLeft: '5vw', paddingRight: '5vw', paddingBottom: '4vw' }}
    >
      {/* Decorative line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ backgroundColor: 'var(--brand-border)', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={isActive ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {subtitle && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}

      <motion.h2
        className={`font-cormorant font-bold leading-[1.05] tracking-tight max-w-4xl whitespace-pre-line ${isHero ? 'text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem]' : 'text-4xl md:text-6xl lg:text-[5.5rem]'}`}
        style={{ color: 'var(--brand-dark)' }}
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      {isHero && (
        <motion.div
          className="mt-3 font-cormorant italic text-2xl md:text-3xl"
          style={{ color: 'var(--brand-brown)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          МЕД-ОБРАЗ
        </motion.div>
      )}

      {content && (
        <motion.p
          className="text-base md:text-lg lg:text-xl max-w-2xl mt-5 leading-relaxed"
          style={{ color: 'var(--brand-dark)', opacity: 0.65 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 0.65, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}

      {/* Webinars schedule toggle */}
      {webinars && (
        <motion.div
          className="mt-7 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all hover:opacity-80"
            style={{ border: '1px solid var(--brand-dark)', color: 'var(--brand-dark)', backgroundColor: 'transparent' }}
            onClick={() => setShowSchedule(!showSchedule)}
          >
            <Icon name={showSchedule ? "ChevronUp" : "CalendarDays"} size={16} />
            {showSchedule ? 'Скрыть' : 'Показать расписание'}
          </button>
          {showButton && (
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all hover:opacity-80"
              style={{ backgroundColor: 'var(--brand-dark)', color: 'var(--brand-cream)' }}
              onClick={() => buttonLink && window.open(buttonLink, '_blank')}
            >
              <Icon name="UserPlus" size={16} />
              {buttonText}
            </button>
          )}
        </motion.div>
      )}

      {webinars && showSchedule && <WebinarTable webinars={webinars} isActive={isActive} />}

      {faq && <FaqBlock faq={faq} isActive={isActive} />}

      {isPrice && <PriceCards isActive={isActive} />}

      {/* Simple CTA button (non-webinar sections) */}
      {!webinars && !faq && !isPrice && showButton && (
        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all hover:opacity-80"
            style={{ backgroundColor: 'var(--brand-dark)', color: 'var(--brand-cream)' }}
            onClick={() => buttonLink && window.open(buttonLink, '_blank')}
          >
            <Icon name="UserPlus" size={16} />
            {buttonText}
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all hover:opacity-80"
            style={{ border: '1px solid var(--brand-dark)', color: 'var(--brand-dark)' }}
            onClick={() => {
              const el = document.getElementById('schedule')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <Icon name="CalendarDays" size={16} />
            Расписание
          </button>
        </motion.div>
      )}

      {/* Section number */}
      <div
        className="absolute bottom-8 right-8 font-cormorant text-6xl font-bold select-none pointer-events-none"
        style={{ color: 'var(--brand-dark)', opacity: 0.05 }}
      >
        {id === 'hero' ? '01' : id === 'about' ? '02' : id === 'schedule' ? '03' : id === 'hosts' ? '04' : id === 'faq' ? '05' : id === 'price' ? '06' : '07'}
      </div>
    </section>
  )
}
