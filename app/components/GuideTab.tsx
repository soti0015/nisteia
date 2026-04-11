'use client'

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const FAQS = [
  {
    q: 'What is Orthodox fasting?',
    a: 'Orthodox fasting (νηστεία) is a spiritual practice of abstaining from certain foods to help us focus on prayer and God. It is not a diet — it is a way of preparing the heart. During Holy Week we fast from meat, dairy, and depending on the day, oil, wine and fish as well.',
  },
  {
    q: 'Do I have to fast perfectly?',
    a: 'No. The Church teaches fasting as a guide, not a burden. Start with what you can manage and build from there. Even partial fasting is meaningful. Speak to your priest if you are unsure what level is right for you.',
  },
  {
    q: 'What can I eat?',
    a: 'Fruit, vegetables, legumes like beans and lentils, bread, pasta, rice and nuts. On Palm Sunday fish is also allowed. There is plenty of delicious food available during the fast.',
  },
  {
    q: 'What about coffee and tea?',
    a: 'Generally fine. Just be mindful of milk. Black coffee and herbal teas are always safe.',
  },
  {
    q: 'Why is Good Friday the strictest day?',
    a: 'Good Friday is the day of the Crucifixion. Jesus was tried, condemned and crucified. Many Orthodox Christians eat nothing at all until sunset as a mark of mourning and reverence. It is the most solemn day of the year.',
  },
  {
    q: 'When does the fast end?',
    a: 'At midnight on Holy Saturday when the priest cries Χριστός Ανέστη — Christ is Risen. That is the moment the fast breaks and the feast begins, usually starting with red Easter eggs and magiritsa soup.',
  },
  {
    q: 'Why do we fast at all?',
    a: 'Fasting is one of the oldest spiritual practices in Christianity. It trains the will, humbles the body and creates space for God. When we say no to food we are saying yes to something greater. It connects us to the suffering of Christ and to centuries of faithful Christians who have done the same.',
  },
]

export default function GuideTab() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { t } = useLanguage()

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t.newToFasting}</p>
        <h2 className="text-2xl font-black text-[#1A1A2E]">{t.yourGuide}</h2>
        <p className="text-sm text-gray-400 mt-1">{t.explainedSimply}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">

        {/* Quick rules card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.alwaysAvoided}</p>
          {[
            { icon: '🥩', label: t.meat, note: 'All kinds' },
            { icon: '🧀', label: t.dairy, note: 'Milk, cheese, butter, yoghurt' },
            { icon: '🥚', label: 'Eggs', note: 'All week' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 py-2 ${i < 2 ? 'border-b border-gray-100' : ''}`}>
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1A1A2E]">{item.label}</p>
                <p className="text-xs text-gray-400">{item.note}</p>
              </div>
              <span className="text-xs font-black text-red-400">{t.alwaysNo}</span>
            </div>
          ))}

          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 mt-4">{t.dependsOnDay}</p>
          {[
            { icon: '🐟', label: t.fish, note: 'Palm Sunday only' },
            { icon: '🫒', label: t.oil, note: 'Holy Thursday only' },
            { icon: '🍷', label: t.wine, note: 'Holy Thursday only' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 py-2 ${i < 2 ? 'border-b border-gray-100' : ''}`}>
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1A1A2E]">{item.label}</p>
                <p className="text-xs text-gray-400">{item.note}</p>
              </div>
              <span className="text-xs font-black text-amber-400">{t.someDays}</span>
            </div>
          ))}
        </div>

        {/* FAQs */}
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full px-4 py-4 flex items-center gap-3 text-left"
            >
              <p className="flex-1 text-sm font-bold text-[#1A1A2E] leading-snug">{faq.q}</p>
              <span className="text-[#3DBE7A] text-base flex-shrink-0">{openFaq === i ? '▲' : '▼'}</span>
            </button>
            {openFaq === i && (
              <div className="border-t border-gray-100 px-4 pb-4 pt-3 bg-gray-50">
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}

        {/* Footer note */}
        <div className="bg-[#F0FAF5] rounded-2xl p-4 mt-2">
          <p className="text-sm text-[#2D7A55] font-medium leading-relaxed">
            ☦️ Fasting is a personal spiritual journey. Your effort matters more than perfection. Speak with your priest for guidance specific to you.
          </p>
        </div>

      </div>
    </div>
  )
}