'use client'

import { createContext, useContext, useState } from 'react'

type Language = 'en' | 'gr'

type Translations = {
  greekOrthodox: string
  today: string
  storyBehindToday: string
  scanAProduct: string
  whatShouldICook: string
  fastingRecipesToday: string
  personalisedSuggestions: string
  mealsBuiltForYou: string
  meat: string
  dairy: string
  fish: string
  oil: string
  wine: string
  ok: string
  no: string
  checkingFor: string
  openCameraScanner: string
  orTypeBarcode: string
  check: string
  tryThese: string
  youCanEatThis: string
  avoidThisToday: string
  whyNot: string
  notToday: string
  scanAgain: string
  done: string
  lookingUp: string
  pointAtBarcode: string
  fasting: string
  recipes: string
  tapToExpand: string
  goodForToday: string
  notAvailableToday: string
  howToMakeIt: string
  newToFasting: string
  yourGuide: string
  explainedSimply: string
  alwaysAvoided: string
  dependsOnDay: string
  alwaysNo: string
  someDays: string
  personalisedFor: string
  forYou: string
  pickIngredients: string
  whatDoYouLike: string
  suggestMeals: string
  findingIdeas: string
  yourSuggestions: string
  tryDifferent: string
  pickOne: string
  palmSunday: string
  holyMonday: string
  holyTuesday: string
  holyWednesday: string
  holyThursday: string
  goodFriday: string
  holySaturday: string
  faqs: { q: string; a: string }[]
}

const EN: Translations = {
  greekOrthodox: 'Greek Orthodox',
  today: 'TODAY',
  storyBehindToday: 'Story behind today',
  scanAProduct: '📷 Scan a Product',
  whatShouldICook: 'What should I cook?',
  fastingRecipesToday: 'Fasting recipes for today',
  personalisedSuggestions: 'Personalised suggestions',
  mealsBuiltForYou: 'Meals built around what you like',
  meat: 'Meat', dairy: 'Dairy', fish: 'Fish', oil: 'Oil', wine: 'Wine',
  ok: 'OK', no: 'No',
  checkingFor: 'Checking for',
  openCameraScanner: '📷 Open Camera Scanner',
  orTypeBarcode: 'or type a barcode below',
  check: 'Check',
  tryThese: 'Try these',
  youCanEatThis: 'You can eat this today!',
  avoidThisToday: 'Avoid this today',
  whyNot: 'Why not?',
  notToday: 'Not today',
  scanAgain: 'Scan Again',
  done: 'Done',
  lookingUp: 'Looking up product...',
  pointAtBarcode: 'Point at a barcode',
  fasting: 'Fasting',
  recipes: 'Recipes',
  tapToExpand: 'Tap a recipe to see how to make it.',
  goodForToday: 'Good for today',
  notAvailableToday: 'Not available today',
  howToMakeIt: 'How to make it',
  newToFasting: 'New to fasting?',
  yourGuide: 'Your Guide ☦️',
  explainedSimply: 'Everything you need to know, explained simply.',
  alwaysAvoided: 'Always avoided',
  dependsOnDay: 'Depends on the day',
  alwaysNo: 'Always No',
  someDays: 'Some days',
  personalisedFor: 'Personalised for',
  forYou: 'For You ✨',
  pickIngredients: 'Pick ingredients you enjoy and get meal ideas.',
  whatDoYouLike: 'What do you like?',
  suggestMeals: '✨ Suggest meals',
  findingIdeas: 'Finding ideas for you...',
  yourSuggestions: 'Your suggestions',
  tryDifferent: 'Try different ingredients',
  pickOne: 'Pick at least one ingredient to get suggestions.',
  palmSunday: 'Palm Sunday',
  holyMonday: 'Holy Monday',
  holyTuesday: 'Holy Tuesday',
  holyWednesday: 'Holy Wednesday',
  holyThursday: 'Holy Thursday',
  goodFriday: 'Good Friday',
  holySaturday: 'Holy Saturday',
  faqs: [
    { q: 'What is Orthodox fasting?', a: 'Orthodox fasting (νηστεία) is a spiritual practice of abstaining from certain foods to help us focus on prayer and God. It is not a diet — it is a way of preparing the heart. During Holy Week we fast from meat, dairy, and depending on the day, oil, wine and fish as well.' },
    { q: 'Do I have to fast perfectly?', a: 'No. The Church teaches fasting as a guide, not a burden. Start with what you can manage and build from there. Even partial fasting is meaningful. Speak to your priest if you are unsure what level is right for you.' },
    { q: 'What can I eat?', a: 'Fruit, vegetables, legumes like beans and lentils, bread, pasta, rice and nuts. On Palm Sunday fish is also allowed. There is plenty of delicious food available during the fast.' },
    { q: 'What about coffee and tea?', a: 'Generally fine. Just be mindful of milk. Black coffee and herbal teas are always safe.' },
    { q: 'Why is Good Friday the strictest day?', a: 'Good Friday is the day of the Crucifixion. Jesus was tried, condemned and crucified. Many Orthodox Christians eat nothing at all until sunset as a mark of mourning and reverence. It is the most solemn day of the year.' },
    { q: 'When does the fast end?', a: 'At midnight on Holy Saturday when the priest cries Χριστός Ανέστη — Christ is Risen. That is the moment the fast breaks and the feast begins, usually starting with red Easter eggs and magiritsa soup.' },
    { q: 'Why do we fast at all?', a: 'Fasting is one of the oldest spiritual practices in Christianity. It trains the will, humbles the body and creates space for God. When we say no to food we are saying yes to something greater.' },
  ],
}

const GR: Translations = {
  greekOrthodox: 'Ελληνική Ορθοδοξία',
  today: 'ΣΗΜΕΡΑ',
  storyBehindToday: 'Η ιστορία της ημέρας',
  scanAProduct: '📷 Σάρωση Προϊόντος',
  whatShouldICook: 'Τι να μαγειρέψω;',
  fastingRecipesToday: 'Νηστίσιμες συνταγές για σήμερα',
  personalisedSuggestions: 'Εξατομικευμένες προτάσεις',
  mealsBuiltForYou: 'Γεύματα βάσει των προτιμήσεών σου',
  meat: 'Κρέας', dairy: 'Γαλακτοκομικά', fish: 'Ψάρι', oil: 'Λάδι', wine: 'Κρασί',
  ok: 'ΟΚ', no: 'Όχι',
  checkingFor: 'Έλεγχος για',
  openCameraScanner: '📷 Άνοιγμα Κάμερας',
  orTypeBarcode: 'ή πληκτρολόγησε barcode',
  check: 'Έλεγχος',
  tryThese: 'Δοκίμασε αυτά',
  youCanEatThis: 'Μπορείς να το φας σήμερα!',
  avoidThisToday: 'Απόφυγέ το σήμερα',
  whyNot: 'Γιατί όχι;',
  notToday: 'Όχι σήμερα',
  scanAgain: 'Νέα Σάρωση',
  done: 'Τέλος',
  lookingUp: 'Αναζήτηση προϊόντος...',
  pointAtBarcode: 'Στρέψε στο barcode',
  fasting: 'Νηστεία',
  recipes: 'Συνταγές',
  tapToExpand: 'Πάτα μια συνταγή για να τη δεις.',
  goodForToday: 'Κατάλληλο για σήμερα',
  notAvailableToday: 'Μη διαθέσιμο σήμερα',
  howToMakeIt: 'Πώς να το φτιάξεις',
  newToFasting: 'Νέος στη νηστεία;',
  yourGuide: 'Ο Οδηγός σου ☦️',
  explainedSimply: 'Όλα όσα χρειάζεσαι, απλά εξηγημένα.',
  alwaysAvoided: 'Πάντα απαγορευμένα',
  dependsOnDay: 'Εξαρτάται από την ημέρα',
  alwaysNo: 'Πάντα Όχι',
  someDays: 'Μερικές μέρες',
  personalisedFor: 'Εξατομικευμένο για',
  forYou: 'Για Σένα ✨',
  pickIngredients: 'Διάλεξε υλικά και πάρε ιδέες γευμάτων.',
  whatDoYouLike: 'Τι σου αρέσει;',
  suggestMeals: '✨ Πρότεινε γεύματα',
  findingIdeas: 'Βρίσκω ιδέες για σένα...',
  yourSuggestions: 'Οι προτάσεις σου',
  tryDifferent: 'Δοκίμασε άλλα υλικά',
  pickOne: 'Διάλεξε τουλάχιστον ένα υλικό.',
  palmSunday: 'Κυριακή των Βαΐων',
  holyMonday: 'Μεγάλη Δευτέρα',
  holyTuesday: 'Μεγάλη Τρίτη',
  holyWednesday: 'Μεγάλη Τετάρτη',
  holyThursday: 'Μεγάλη Πέμπτη',
  goodFriday: 'Μεγάλη Παρασκευή',
  holySaturday: 'Μεγάλο Σάββατο',
  faqs: [
    { q: 'Τι είναι η Ορθόδοξη νηστεία;', a: 'Η νηστεία είναι πνευματική πρακτική αποχής από ορισμένες τροφές για να εστιάσουμε στην προσευχή και τον Θεό. Δεν είναι δίαιτα — είναι τρόπος προετοιμασίας της ψυχής. Την Μεγάλη Εβδομάδα νηστεύουμε κρέας, γαλακτοκομικά, και ανάλογα με την ημέρα, λάδι, κρασί και ψάρι.' },
    { q: 'Πρέπει να νηστεύω τέλεια;', a: 'Όχι. Η Εκκλησία διδάσκει τη νηστεία ως οδηγό, όχι ως βάρος. Ξεκίνα με όσο μπορείς. Ακόμα και μερική νηστεία έχει αξία. Μίλα με τον ιερέα σου αν δεν είσαι σίγουρος.' },
    { q: 'Τι μπορώ να φάω;', a: 'Φρούτα, λαχανικά, όσπρια, ψωμί, ζυμαρικά, ρύζι και ξηρούς καρπούς. Την Κυριακή των Βαΐων επιτρέπεται και το ψάρι. Υπάρχουν πολλά νόστιμα νηστίσιμα φαγητά.' },
    { q: 'Τι γίνεται με τον καφέ και το τσάι;', a: 'Γενικά εντάξει. Πρόσεχε μόνο το γάλα. Ο σκέτος καφές και τα αφεψήματα είναι πάντα ασφαλή.' },
    { q: 'Γιατί η Μεγάλη Παρασκευή είναι η πιο αυστηρή μέρα;', a: 'Η Μεγάλη Παρασκευή είναι η ημέρα της Σταύρωσης. Πολλοί Ορθόδοξοι δεν τρώνε τίποτα μέχρι τη δύση του ηλίου ως ένδειξη πένθους και σεβασμού. Είναι η πιο ιερή μέρα του χρόνου.' },
    { q: 'Πότε τελειώνει η νηστεία;', a: 'Τα μεσάνυχτα του Μεγάλου Σαββάτου όταν ο ιερέας ψάλλει Χριστός Ανέστη. Εκείνη τη στιγμή σπάει η νηστεία και αρχίζει η γιορτή.' },
    { q: 'Γιατί νηστεύουμε;', a: 'Η νηστεία είναι μια από τις παλαιότερες πνευματικές πρακτικές στον Χριστιανισμό. Ασκεί τη θέληση, ταπεινώνει το σώμα και δημιουργεί χώρο για τον Θεό.' },
  ],
}

type LanguageContextType = {
  language: Language
  t: Translations
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: EN,
  toggleLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'gr' : 'en')
  const t = language === 'en' ? EN : GR

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}