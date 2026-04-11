'use client'

import { createContext, useContext, useState } from 'react'

type Language = 'en' | 'gr'

type Translations = {
  // Today tab
  greekOrthodox: string
  today: string
  storyBehindToday: string
  scanAProduct: string
  whatShouldICook: string
  fastingRecipesToday: string
  personalisedSuggestions: string
  mealsBuiltForYou: string
  // Rules
  meat: string
  dairy: string
  fish: string
  oil: string
  wine: string
  ok: string
  no: string
  // Scan tab
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
  // Recipes tab
  fasting: string
  recipes: string
  tapToExpand: string
  goodForToday: string
  notAvailableToday: string
  howToMakeIt: string
  // Guide tab
  newToFasting: string
  yourGuide: string
  explainedSimply: string
  alwaysAvoided: string
  dependsOnDay: string
  alwaysNo: string
  someDays: string
  // For You tab
  personalisedFor: string
  forYou: string
  pickIngredients: string
  whatDoYouLike: string
  suggestMeals: string
  findingIdeas: string
  yourSuggestions: string
  tryDifferent: string
  pickOne: string
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