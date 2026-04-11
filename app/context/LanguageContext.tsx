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
  tabToday: string
  tabScan: string
  tabRecipes: string
  tabGuide: string
  tabForYou: string
  faqs: { q: string; a: string }[]
  days: {
    tip: string
    storyTitle: string
    story: string
  }[]
  recipeList: {
    name: string
    desc: string
    steps: string[]
  }[]
  foodPrefs: string[]
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
  tabToday: 'Today',
  tabScan: 'Scan',
  tabRecipes: 'Recipes',
  tabGuide: 'Guide',
  tabForYou: 'For You',
  faqs: [
    { q: 'What is Orthodox fasting?', a: 'Orthodox fasting (νηστεία) is a spiritual practice of abstaining from certain foods to help us focus on prayer and God. It is not a diet — it is a way of preparing the heart. During Holy Week we fast from meat, dairy, and depending on the day, oil, wine and fish as well.' },
    { q: 'Do I have to fast perfectly?', a: 'No. The Church teaches fasting as a guide, not a burden. Start with what you can manage and build from there. Even partial fasting is meaningful. Speak to your priest if you are unsure what level is right for you.' },
    { q: 'What can I eat?', a: 'Fruit, vegetables, legumes like beans and lentils, bread, pasta, rice and nuts. On Palm Sunday fish is also allowed. There is plenty of delicious food available during the fast.' },
    { q: 'What about coffee and tea?', a: 'Generally fine. Just be mindful of milk. Black coffee and herbal teas are always safe.' },
    { q: 'Why is Good Friday the strictest day?', a: 'Good Friday is the day of the Crucifixion. Jesus was tried, condemned and crucified. Many Orthodox Christians eat nothing at all until sunset as a mark of mourning and reverence. It is the most solemn day of the year.' },
    { q: 'When does the fast end?', a: 'At midnight on Holy Saturday when the priest cries Χριστός Ανέστη — Christ is Risen. That is the moment the fast breaks and the feast begins, usually starting with red Easter eggs and magiritsa soup.' },
    { q: 'Why do we fast at all?', a: 'Fasting is one of the oldest spiritual practices in Christianity. It trains the will, humbles the body and creates space for God. When we say no to food we are saying yes to something greater.' },
  ],
  days: [
    { tip: 'Fish is allowed today. Oil and wine are also permitted.', storyTitle: 'The Entry into Jerusalem', story: 'Palm Sunday marks the day Jesus entered Jerusalem welcomed by crowds waving palm branches crying Hosanna. It is a day of great joy but also the beginning of the most solemn week of the year. Fish is allowed today in celebration — one of only two days in Holy Week where it is permitted.' },
    { tip: 'Strict fast today. No oil or wine. Keep meals simple.', storyTitle: 'The Barren Fig Tree', story: 'Holy Monday remembers the cursing of the barren fig tree by Jesus — a symbol of spiritual fruitlessness — and the cleansing of the Temple. We fast strictly today as we begin our journey toward the Cross.' },
    { tip: 'Strict fast continues. Lentil soup or beans are perfect today.', storyTitle: 'The Ten Virgins', story: 'Holy Tuesday commemorates the parable of the Ten Virgins and the teachings Jesus gave in the Temple. It is a day of reflection — are we spiritually prepared? The strict fast calls us to focus.' },
    { tip: 'One of the strictest days. Many eat only bread and water.', storyTitle: 'The Anointing and the Betrayal', story: 'Holy Wednesday remembers the sinful woman who anointed Jesus with perfume — an act of deep love — and Judas who that same night agreed to betray Him for thirty pieces of silver. The contrast is striking.' },
    { tip: 'Oil and wine are permitted in memory of the Last Supper.', storyTitle: 'The Last Supper', story: 'Holy Thursday is the night of the Last Supper, when Jesus washed the disciples feet and instituted the Eucharist. Oil and wine are allowed today in honour of that sacred meal. Tonight the Church reads the Twelve Gospels of the Passion.' },
    { tip: 'The strictest fast of the year. Many eat nothing until sunset.', storyTitle: 'The Crucifixion', story: 'Good Friday is the day of the Crucifixion. Jesus was tried, condemned and crucified. The entire Church mourns. This is the most solemn day of the Orthodox year. In the evening the Epitaphios is carried through the streets in procession.' },
    { tip: 'Fast until midnight. At midnight — Christ is Risen!', storyTitle: 'The Resurrection', story: 'Holy Saturday is the day Christ lay in the tomb. At midnight a single flame is lit and passed through the congregation. The priest cries Χριστός Ανέστη and the whole church erupts in light and joy. The fast is over. The feast begins.' },
  ],
  recipeList: [
    { name: 'Bean Soup', desc: 'The national fasting dish. Warm and filling.', steps: ['Boil white beans until soft or use canned.', 'Fry onion, carrot and celery in olive oil.', 'Add tomatoes and beans, simmer 20 min.', 'Season with salt, pepper and lemon.'] },
    { name: 'Lentil Soup', desc: 'No oil needed. Perfect for strict fast days.', steps: ['Rinse lentils and boil in water.', 'Add onion, garlic, bay leaf and canned tomatoes.', 'Simmer 25 min until thick.', 'Add a splash of red wine vinegar at the end.'] },
    { name: 'Taramasalata', desc: 'Fish roe dip. Palm Sunday only.', steps: ['Blend tarama with soaked white bread.', 'Slowly drizzle in olive oil while blending.', 'Add lemon juice and blend until creamy.', 'Serve with Lagana bread or pita.'] },
    { name: 'Sesame Bread', desc: 'Flat bread traditional for Palm Sunday.', steps: ['Mix flour, yeast, water, oil and salt into dough.', 'Let rise 1 hour.', 'Flatten onto tray and press sesame seeds on top.', 'Bake at 200°C for 25 min until golden.'] },
    { name: 'Spinach Rice', desc: 'Simple, nutritious and delicious with lemon.', steps: ['Sauté onion and spring onions in olive oil.', 'Add rice and stir for 1 min.', 'Add spinach, stock and dill.', 'Simmer covered 18 min then finish with lemon.'] },
    { name: 'Halva', desc: 'Sweet fasting dessert. No eggs or butter.', steps: ['Toast semolina in a dry pan until golden.', 'Boil water and sugar to make syrup.', 'Pour syrup into semolina carefully.', 'Stir fast, pour into mould, cool and serve with cinnamon.'] },
  ],
  foodPrefs: ['Chickpeas', 'Lentils', 'Eggplant', 'Spinach', 'Tomatoes', 'Pasta', 'Rice', 'Mushrooms', 'Olives', 'Tahini', 'Walnuts', 'Cauliflower', 'Zucchini', 'Capsicum', 'Pita bread'],
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
  tabToday: 'Σήμερα',
  tabScan: 'Σάρωση',
  tabRecipes: 'Συνταγές',
  tabGuide: 'Οδηγός',
  tabForYou: 'Για Σένα',
  faqs: [
    { q: 'Τι είναι η Ορθόδοξη νηστεία;', a: 'Η νηστεία είναι πνευματική πρακτική αποχής από ορισμένες τροφές για να εστιάσουμε στην προσευχή και τον Θεό. Δεν είναι δίαιτα — είναι τρόπος προετοιμασίας της ψυχής. Την Μεγάλη Εβδομάδα νηστεύουμε κρέας, γαλακτοκομικά, και ανάλογα με την ημέρα, λάδι, κρασί και ψάρι.' },
    { q: 'Πρέπει να νηστεύω τέλεια;', a: 'Όχι. Η Εκκλησία διδάσκει τη νηστεία ως οδηγό, όχι ως βάρος. Ξεκίνα με όσο μπορείς. Ακόμα και μερική νηστεία έχει αξία. Μίλα με τον ιερέα σου αν δεν είσαι σίγουρος.' },
    { q: 'Τι μπορώ να φάω;', a: 'Φρούτα, λαχανικά, όσπρια, ψωμί, ζυμαρικά, ρύζι και ξηρούς καρπούς. Την Κυριακή των Βαΐων επιτρέπεται και το ψάρι. Υπάρχουν πολλά νόστιμα νηστίσιμα φαγητά.' },
    { q: 'Τι γίνεται με τον καφέ και το τσάι;', a: 'Γενικά εντάξει. Πρόσεχε μόνο το γάλα. Ο σκέτος καφές και τα αφεψήματα είναι πάντα ασφαλή.' },
    { q: 'Γιατί η Μεγάλη Παρασκευή είναι η πιο αυστηρή μέρα;', a: 'Η Μεγάλη Παρασκευή είναι η ημέρα της Σταύρωσης. Ο Ιησούς δικάστηκε, καταδικάστηκε και σταυρώθηκε. Πολλοί Ορθόδοξοι δεν τρώνε τίποτα μέχρι τη δύση του ηλίου. Είναι η πιο ιερή μέρα του χρόνου.' },
    { q: 'Πότε τελειώνει η νηστεία;', a: 'Τα μεσάνυχτα του Μεγάλου Σαββάτου όταν ο ιερέας ψάλλει Χριστός Ανέστη. Εκείνη τη στιγμή σπάει η νηστεία και αρχίζει η γιορτή.' },
    { q: 'Γιατί νηστεύουμε;', a: 'Η νηστεία είναι μια από τις παλαιότερες πνευματικές πρακτικές στον Χριστιανισμό. Ασκεί τη θέληση, ταπεινώνει το σώμα και δημιουργεί χώρο για τον Θεό.' },
  ],
  days: [
    { tip: 'Το ψάρι επιτρέπεται σήμερα. Λάδι και κρασί επίσης επιτρέπονται.', storyTitle: 'Η Είσοδος στα Ιεροσόλυμα', story: 'Η Κυριακή των Βαΐων είναι η μέρα που ο Ιησούς μπήκε στα Ιεροσόλυμα καλωσορισμένος από πλήθη που κρατούσαν βάγια φωνάζοντας Ωσαννά. Είναι μέρα χαράς αλλά και αρχή της πιο ιερής εβδομάδας. Το ψάρι επιτρέπεται σήμερα — μία από τις δύο μόνο μέρες της Μεγάλης Εβδομάδας.' },
    { tip: 'Αυστηρή νηστεία σήμερα. Χωρίς λάδι ή κρασί. Απλά γεύματα.', storyTitle: 'Η Άγονη Συκιά', story: 'Η Μεγάλη Δευτέρα θυμίζει την κατάρα της άγονης συκιάς από τον Ιησού — σύμβολο πνευματικής ανωριμότητας — και τον εξαγνισμό του Ναού. Νηστεύουμε αυστηρά καθώς αρχίζει η πορεία προς τον Σταυρό.' },
    { tip: 'Η νηστεία συνεχίζεται. Φακές ή φασόλια είναι ιδανικά σήμερα.', storyTitle: 'Οι Δέκα Παρθένες', story: 'Η Μεγάλη Τρίτη τιμά την παραβολή των Δέκα Παρθένων και τις διδαχές του Ιησού στον Ναό. Είναι μέρα προβληματισμού — είμαστε πνευματικά έτοιμοι; Η νηστεία μας καλεί να εστιάσουμε.' },
    { tip: 'Μία από τις πιο αυστηρές μέρες. Πολλοί τρώνε μόνο ψωμί και νερό.', storyTitle: 'Η Αλοιφή και η Προδοσία', story: 'Η Μεγάλη Τετάρτη θυμίζει την αμαρτωλή γυναίκα που άλειψε τον Ιησού με μύρο — πράξη βαθιάς αγάπης — και τον Ιούδα που εκείνο το βράδυ συμφώνησε να τον προδώσει για τριάντα αργύρια.' },
    { tip: 'Λάδι και κρασί επιτρέπονται σήμερα εις μνήμη του Μυστικού Δείπνου.', storyTitle: 'Ο Μυστικός Δείπνος', story: 'Η Μεγάλη Πέμπτη είναι η νύχτα του Μυστικού Δείπνου, όταν ο Ιησούς έπλυνε τα πόδια των μαθητών και θέσπισε τη Θεία Ευχαριστία. Απόψε η Εκκλησία διαβάζει τα Δώδεκα Ευαγγέλια του Πάθους.' },
    { tip: 'Η πιο αυστηρή νηστεία του χρόνου. Πολλοί δεν τρώνε τίποτα μέχρι τη δύση.', storyTitle: 'Η Σταύρωση', story: 'Η Μεγάλη Παρασκευή είναι η ημέρα της Σταύρωσης. Ο Ιησούς δικάστηκε, καταδικάστηκε και σταυρώθηκε. Όλη η Εκκλησία πενθεί. Είναι η πιο ιερή μέρα του Ορθόδοξου χρόνου. Το βράδυ ο Επιτάφιος περιφέρεται στους δρόμους.' },
    { tip: 'Νηστεία μέχρι τα μεσάνυχτα. Τα μεσάνυχτα — Χριστός Ανέστη!', storyTitle: 'Η Ανάσταση', story: 'Το Μεγάλο Σάββατο είναι η μέρα που ο Χριστός έμεινε στον τάφο. Τα μεσάνυχτα ανάβει μια μικρή φλόγα και μεταδίδεται σε όλους. Ο ιερέας ψάλλει Χριστός Ανέστη και η εκκλησία πλημμυρίζει από φως και χαρά. Η νηστεία τελείωσε.' },
  ],
  recipeList: [
    { name: 'Φασολάδα', desc: 'Το εθνικό νηστίσιμο φαγητό. Ζεστό και χορταστικό.', steps: ['Βράσε άσπρα φασόλια ή χρησιμοποίησε κονσέρβα.', 'Τσιγάρισε κρεμμύδι, καρότο και σέλινο σε λάδι.', 'Πρόσθεσε ντομάτες και φασόλια, σιγοβράσε 20 λεπτά.', 'Αλατοπιπέρωσε και πρόσθεσε λεμόνι.'] },
    { name: 'Φακές', desc: 'Χωρίς λάδι. Ιδανικό για αυστηρές νηστίσιμες μέρες.', steps: ['Ξέπλυνε τις φακές και βράσε σε νερό.', 'Πρόσθεσε κρεμμύδι, σκόρδο, δαφνόφυλλο και κονσέρβα ντομάτας.', 'Σιγοβράσε 25 λεπτά μέχρι να πήξει.', 'Πρόσθεσε λίγο κόκκινο ξίδι στο τέλος.'] },
    { name: 'Ταραμοσαλάτα', desc: 'Σαλάτα ταραμά. Μόνο για Κυριακή των Βαΐων.', steps: ['Ανακάτεψε ταραμά με μουσκεμένο άσπρο ψωμί.', 'Πρόσθεσε αργά λάδι ενώ ανακατεύεις.', 'Πρόσθεσε χυμό λεμονιού και ανακάτεψε μέχρι να γίνει κρεμώδες.', 'Σέρβιρε με λαγάνα ή πίτα.'] },
    { name: 'Λαγάνα', desc: 'Παραδοσιακό ψωμί για την Κυριακή των Βαΐων.', steps: ['Ζύμωσε αλεύρι, μαγιά, νερό, λάδι και αλάτι.', 'Άσε να φουσκώσει 1 ώρα.', 'Απλώστε στο ταψί και πατήστε σουσάμι από πάνω.', 'Ψήστε στους 200°C για 25 λεπτά μέχρι να ροδίσει.'] },
    { name: 'Σπανακόριζο', desc: 'Απλό, θρεπτικό και νόστιμο με λεμόνι.', steps: ['Τσιγάρισε κρεμμύδι και φρέσκα κρεμμυδάκια σε λάδι.', 'Πρόσθεσε ρύζι και ανακάτεψε 1 λεπτό.', 'Πρόσθεσε σπανάκι, ζωμό και άνηθο.', 'Σιγοβράσε σκεπαστό 18 λεπτά και τελείωσε με λεμόνι.'] },
    { name: 'Χαλβάς', desc: 'Γλυκό νηστίσιμο. Χωρίς αβγά ή βούτυρο.', steps: ['Καβούρδισε σιμιγδάλι σε στεγνό τηγάνι μέχρι να ροδίσει.', 'Βράσε νερό και ζάχαρη για σιρόπι.', 'Ρίξε το σιρόπι στο σιμιγδάλι προσεκτικά.', 'Ανακάτεψε γρήγορα, ρίξε σε φόρμα, κρύωσε και σέρβιρε με κανέλα.'] },
  ],
  foodPrefs: ['Ρεβύθια', 'Φακές', 'Μελιτζάνα', 'Σπανάκι', 'Ντομάτες', 'Ζυμαρικά', 'Ρύζι', 'Μανιτάρια', 'Ελιές', 'Ταχίνι', 'Καρύδια', 'Κουνουπίδι', 'Κολοκυθάκια', 'Πιπεριές', 'Πίτα'],
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