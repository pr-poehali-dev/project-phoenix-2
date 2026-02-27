import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps, WebinarItem, FaqItem } from "@/types"

function WebinarTable({ webinars, isActive }: { webinars: WebinarItem[]; isActive: boolean }) {
  return (
    <motion.div
      className="mt-8 w-full max-w-3xl"
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="border border-white/20 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[140px_1fr] bg-white/5 text-xs text-neutral-500 uppercase tracking-widest px-4 py-2">
          <span>Дата / Время</span>
          <span>Тема</span>
        </div>
        {webinars.map((w, i) => (
          <motion.div
            key={i}
            className="grid grid-cols-[140px_1fr] px-4 py-3 border-t border-white/10 hover:bg-white/5 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
          >
            <div>
              <div className="text-white font-medium text-sm">{w.date}</div>
              <div className="text-neutral-500 text-xs mt-0.5">{w.time}</div>
            </div>
            <div className="text-neutral-300 text-sm leading-snug self-center">{w.topic}</div>
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
      className="mt-8 w-full max-w-3xl"
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="space-y-3">
        {faq.map((item, i) => (
          <div key={i} className="border border-white/20 rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left text-white hover:bg-white/5 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-medium text-sm md:text-base pr-4">{item.question}</span>
              <Icon
                name={openIndex === i ? "ChevronUp" : "ChevronDown"}
                size={18}
                className="text-neutral-400 shrink-0"
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
                  <div className="px-5 pb-4 text-neutral-400 text-sm leading-relaxed border-t border-white/10 pt-3">
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

export default function Section({
  id,
  title,
  subtitle,
  content,
  isActive,
  showButton,
  buttonText,
  buttonLink,
  showDetails,
  webinars,
  faq,
}: SectionProps) {
  const [showSchedule, setShowSchedule] = useState(false)

  return (
    <section
      id={id}
      className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-y-auto"
    >
      {subtitle && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {content && (
        <motion.p
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}

      {webinars && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-[#7B68EE] bg-transparent border-[#7B68EE] hover:bg-[#7B68EE] hover:text-white transition-colors"
            onClick={() => setShowSchedule(!showSchedule)}
          >
            <Icon name={showSchedule ? "ChevronUp" : "Calendar"} size={18} className="mr-2" />
            {showSchedule ? "Скрыть расписание" : "Подробнее"}
          </Button>
          {showButton && (
            <Button
              size="lg"
              className="bg-[#7B68EE] text-white hover:bg-[#6355d4] transition-colors"
              onClick={() => buttonLink && window.open(buttonLink, "_blank")}
            >
              <Icon name="UserPlus" size={18} className="mr-2" />
              {buttonText}
            </Button>
          )}
        </motion.div>
      )}

      {webinars && showSchedule && <WebinarTable webinars={webinars} isActive={isActive} />}

      {faq && <FaqBlock faq={faq} isActive={isActive} />}

      {!webinars && showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16 flex flex-wrap gap-3"
        >
          <Button
            size="lg"
            className="bg-[#7B68EE] text-white hover:bg-[#6355d4] transition-colors"
            onClick={() => buttonLink && window.open(buttonLink, "_blank")}
          >
            <Icon name="UserPlus" size={18} className="mr-2" />
            {buttonText}
          </Button>
        </motion.div>
      )}
    </section>
  )
}
