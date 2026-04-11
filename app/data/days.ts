export const HOLY_WEEK_2025 = {
  start: new Date('2025-04-13'), // Palm Sunday
  end: new Date('2025-04-19'),   // Holy Saturday
}

export function getTodayDayIdx(): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const holyWeekDates = [
    new Date('2025-04-13'), // Palm Sunday
    new Date('2025-04-14'), // Holy Monday
    new Date('2025-04-15'), // Holy Tuesday
    new Date('2025-04-16'), // Holy Wednesday
    new Date('2025-04-17'), // Holy Thursday
    new Date('2025-04-18'), // Good Friday
    new Date('2025-04-19'), // Holy Saturday
  ]

  const idx = holyWeekDates.findIndex(d => {
    const date = new Date(d)
    date.setHours(0, 0, 0, 0)
    return date.getTime() === today.getTime()
  })

  // If today matches a Holy Week day return it
  if (idx !== -1) return idx

  // If before Holy Week default to Palm Sunday
  if (today < holyWeekDates[0]) return 0

  // If after Holy Week default to Holy Saturday
  return 6
}
export type Day = {
  name: string
  date: string
  icon: string
  fish: boolean
  oil: boolean
  wine: boolean
  tip: string
  storyTitle: string
  story: string
}

export const DAYS: Day[] = [
  {
    name: "Palm Sunday",
    date: "Apr 13",
    icon: "🌴",
    fish: true,
    oil: true,
    wine: true,
    tip: "Fish is allowed today. Oil and wine are also permitted.",
    storyTitle: "The Entry into Jerusalem",
    story: "Palm Sunday marks the day Jesus entered Jerusalem welcomed by crowds waving palm branches crying Hosanna. It is a day of great joy but also the beginning of the most solemn week of the year. Fish is allowed today in celebration — one of only two days in Holy Week where it is permitted.",
  },
  {
    name: "Holy Monday",
    date: "Apr 14",
    icon: "✝️",
    fish: false,
    oil: false,
    wine: false,
    tip: "Strict fast today. No oil or wine. Keep meals simple.",
    storyTitle: "The Barren Fig Tree",
    story: "Holy Monday remembers the cursing of the barren fig tree by Jesus — a symbol of spiritual fruitlessness — and the cleansing of the Temple. We fast strictly today as we begin our journey toward the Cross.",
  },
  {
    name: "Holy Tuesday",
    date: "Apr 15",
    icon: "✝️",
    fish: false,
    oil: false,
    wine: false,
    tip: "Strict fast continues. Lentil soup or beans are perfect today.",
    storyTitle: "The Ten Virgins",
    story: "Holy Tuesday commemorates the parable of the Ten Virgins and the teachings Jesus gave in the Temple. It is a day of reflection — are we spiritually prepared? The strict fast calls us to focus.",
  },
  {
    name: "Holy Wednesday",
    date: "Apr 16",
    icon: "✝️",
    fish: false,
    oil: false,
    wine: false,
    tip: "One of the strictest days. Many eat only bread and water.",
    storyTitle: "The Anointing and the Betrayal",
    story: "Holy Wednesday remembers the sinful woman who anointed Jesus with perfume — an act of deep love — and Judas who that same night agreed to betray Him for thirty pieces of silver. The contrast is striking.",
  },
  {
    name: "Holy Thursday",
    date: "Apr 17",
    icon: "🍷",
    fish: false,
    oil: true,
    wine: true,
    tip: "Oil and wine are permitted in memory of the Last Supper.",
    storyTitle: "The Last Supper",
    story: "Holy Thursday is the night of the Last Supper, when Jesus washed the disciples feet and instituted the Eucharist. Oil and wine are allowed today in honour of that sacred meal. Tonight the Church reads the Twelve Gospels of the Passion.",
  },
  {
    name: "Good Friday",
    date: "Apr 18",
    icon: "🕯️",
    fish: false,
    oil: false,
    wine: false,
    tip: "The strictest fast of the year. Many eat nothing until sunset.",
    storyTitle: "The Crucifixion",
    story: "Good Friday is the day of the Crucifixion. Jesus was tried, condemned and crucified. The entire Church mourns. This is the most solemn day of the Orthodox year. In the evening the Epitaphios is carried through the streets in procession.",
  },
  {
    name: "Holy Saturday",
    date: "Apr 19",
    icon: "🥚",
    fish: false,
    oil: false,
    wine: false,
    tip: "Fast until midnight. At midnight — Christ is Risen!",
    storyTitle: "The Resurrection",
    story: "Holy Saturday is the day Christ lay in the tomb. At midnight a single flame is lit and passed through the congregation. The priest cries Χριστός Ανέστη and the whole church erupts in light and joy. The fast is over. The feast begins.",
  },
]