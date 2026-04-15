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
  nutrition: string
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
  nutrition: 'Nutrition',
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
    { q: 'What is Orthodox fasting?', a: 'Orthodox fasting is a spiritual discipline the Church has practiced since its earliest days. During Holy Week we abstain entirely from meat, dairy and eggs. Oil, wine and fish depend on the day. The point is not health or weight loss. It is a way of bringing the body into alignment with what the soul is trying to do: slow down, pay attention and turn towards God.' },
    { q: 'Do I have to fast perfectly?', a: 'No. The Church has always taught fasting as a guide, not a legal requirement. Partial fasting is real fasting. If all you can manage is one thing, manage that one thing. It is worth speaking to your priest about what level of fasting makes sense for your situation.' },
    { q: 'What can I eat?', a: 'Vegetables, legumes, bread, pasta, rice, fruit and nuts are permitted throughout Holy Week. Fish is allowed on Palm Sunday. Oil and wine are permitted on Palm Sunday and Holy Thursday. Holy Wednesday and Good Friday are the strictest days.' },
    { q: 'What about coffee and tea?', a: 'Black coffee and plain tea are fine throughout Holy Week. The issue is milk and cream. If you drink your coffee black there is nothing to worry about.' },
    { q: 'Why is Good Friday the strictest day?', a: 'Good Friday is the day of the Crucifixion. The Divine Liturgy is not served on this day, the only day in the entire year when that is the case. Many Orthodox Christians eat nothing at all until evening as a way of keeping watch with Christ in his suffering. It is the most solemn day of the year.' },
    { q: 'When does the fast end?', a: 'At midnight on Holy Saturday when the priest chants Χριστός Ανέστη for the first time. That is the moment everything changes. The fast ends there and the feast begins, usually with red Easter eggs and magiritsa soup.' },
    { q: 'Why fast at all?', a: 'Fasting is one of the oldest practices in the Church. It appears in the Old Testament, in the New Testament and in every generation of Christian life since. It is not about earning anything. It trains the will, quiets the appetite and teaches the body to follow where the soul is trying to go.' },
  ],
  days: [
    { tip: 'Fish is allowed today, and so is oil and wine. It is the most festive day of Holy Week.', storyTitle: 'The Entry into Jerusalem', story: 'Jesus rode into Jerusalem on a donkey while the crowds spread their cloaks on the road, cut palm branches and cried out Hosanna. The prophet Zechariah had foretold this moment centuries earlier. The city was full of pilgrims gathered for Passover. Many of them expected a political leader who would overthrow Rome. What they received was something altogether different. Today is a day of genuine joy, but it opens the most solemn week of the year.' },
    { tip: 'Strict fast today. No oil, wine or fish. Simple meals only.', storyTitle: 'Joseph and the Fig Tree', story: 'The Church remembers two things today. The patriarch Joseph, sold into slavery by his own brothers, is held up as a figure of Christ who will be handed over by one of his own. And on this morning Jesus passed a barren fig tree on the road and cursed it for bearing no fruit. It is a warning for those who wear religion on the outside while producing nothing. The week has begun in earnest.' },
    { tip: 'The fast continues. Lentils or bean soup are good choices today.', storyTitle: 'The Ten Virgins', story: 'Jesus taught in the Temple courts today and told the parable of the Ten Virgins. Five of them kept their lamps burning through the night. Five let them run dry and were shut out when the bridegroom finally came. The lesson is uncomfortable: you cannot borrow someone else\'s readiness. No one can fast or pray on your behalf at the moment that matters. The Bridegroom is coming.' },
    { tip: 'One of the strictest days of the year. Many eat only bread and water today.', storyTitle: 'The Sinful Woman and the Betrayal', story: 'Two things happened on this day and the Church holds them together deliberately. A woman known throughout the city for her sins came to the house of Simon the Leper where Jesus was eating. She broke open a jar of expensive perfume and poured it over his feet, weeping. The disciples were outraged at the waste. Jesus defended her. That same night Judas went to the chief priests and agreed to hand Jesus over for thirty pieces of silver.' },
    { tip: 'Oil and wine are permitted today in memory of the Last Supper.', storyTitle: 'The Last Supper', story: 'Jesus gathered with his disciples for the Passover meal and did something that shocked them: he knelt and washed their feet one by one. Then he took bread, broke it, took the cup and blessed it, and told them this was his body and blood. Do this in memory of me. Afterwards he went to the garden of Gethsemane to pray, knowing what was coming. Tonight the Church reads all twelve Passion Gospels from beginning to end.' },
    { tip: 'The strictest fast of the year. Many eat nothing at all until evening.', storyTitle: 'The Crucifixion', story: 'Jesus was arrested in the garden the night before, tried through the night, condemned by Pilate in the morning and crucified at nine. He died at three in the afternoon. Today is the only day in the entire year when the Divine Liturgy is not celebrated anywhere in the Orthodox world. In the evening the Epitaphios, the icon of Christ laid in the tomb, is brought out in procession and the faithful gather to mourn and to venerate him.' },
    { tip: 'Fast until midnight. When the priest chants Christ is Risen, the fast is over.', storyTitle: 'The Great Sabbath', story: 'The Church calls today the Great Sabbath. Christ lies in the tomb and the whole world waits. The ancient hymns of this morning describe his descent into Hades, breaking open its gates and liberating those who had waited since the beginning of time. Then at midnight everything changes. The church goes dark. A single flame appears at the altar and spreads from person to person until the whole building blazes. The priest cries Χριστός Ανέστη.' },
  ],
  recipeList: [
    { name: 'Bean Soup', desc: 'The classic fasting dish every Greek family makes. Rich, warming and filling.', steps: ['Soak 500g dried white beans overnight, or use 2 × 400g cans of cannellini beans (drained).', 'Dice 1 large onion, 2 carrots and 2 celery stalks. Sauté in 3 tbsp olive oil for 5 min until soft.', 'Add 400g crushed tomatoes and the beans. Pour in 1.5L water and simmer for 20 min.', 'Season with salt, pepper and the juice of 1 lemon. Drizzle with olive oil before serving.'] },
    { name: 'Lentil Soup', desc: 'No oil needed, which makes it right for the strictest fast days. Served with red wine vinegar.', steps: ['Rinse 400g brown or green lentils under cold water until the water runs clear.', 'Place in a pot with 1 diced onion, 3 garlic cloves, 1 bay leaf and 400g canned crushed tomatoes.', 'Cover with 1.2L water. Bring to a boil, then simmer on low for 25 min until thick.', 'Stir in 2 tbsp red wine vinegar, season with salt and pepper. Serve with crusty bread.'] },
    { name: 'Taramasalata', desc: 'A fish roe dip made on Palm Sunday when fish is permitted.', steps: ['Remove crusts from 3–4 slices of white bread, soak in water for 1 min, then squeeze out excess.', 'Blend 100g tarama (carp roe paste) with the squeezed bread in a food processor until smooth.', 'With the motor running, slowly drizzle in 150ml olive oil until thick and creamy.', 'Add the juice of 1 lemon, blend briefly, taste and adjust. Chill 30 min before serving.'] },
    { name: 'Sesame Bread', desc: 'Traditional flatbread baked for Palm Sunday and covered in sesame seeds.', steps: ['Combine 500g bread flour, 7g instant yeast, 1 tsp salt, 2 tbsp olive oil and 300ml warm water. Knead 10 min.', 'Cover with a towel and let rise in a warm spot for 1 hour until doubled in size.', 'Press dough onto a lined baking tray into a flat oval. Brush with water and press 50g sesame seeds firmly on top.', 'Bake at 200°C for 25 min until golden and hollow-sounding when tapped.'] },
    { name: 'Spinach Rice', desc: 'Simple and honest. Finished with a good squeeze of lemon.', steps: ['Finely slice 1 onion and 4 spring onions. Sauté in 3 tbsp olive oil over medium heat for 5 min.', 'Add 200g long-grain rice and stir for 1 min to coat in the oil.', 'Add 500g fresh spinach (roughly chopped) or 300g frozen, 600ml vegetable stock and a handful of fresh dill.', 'Simmer covered on low for 18 min. Squeeze over the juice of 1 lemon and season to taste.'] },
    { name: 'Halva', desc: 'The classic fasting sweet, made with semolina. No eggs or butter needed.', steps: ['Toast 250g fine semolina in a dry heavy pan over medium heat, stirring constantly for 7–8 min until golden and fragrant.', 'Meanwhile, combine 500ml water, 200g sugar and a cinnamon stick in a saucepan and bring to a boil.', 'Remove semolina from heat. Carefully pour in the hot syrup (it will bubble up). Stir vigorously with a wooden spoon.', 'Pour into a greased bundt or loaf tin. Cool for 15 min, unmould, dust with cinnamon and serve.'] },
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
  nutrition: 'Θρεπτικά',
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
    { q: 'Τι είναι η Ορθόδοξη νηστεία;', a: 'Η νηστεία είναι πνευματική άσκηση που η Εκκλησία πρακτικάρει από τα πρώτα της χρόνια. Τη Μεγάλη Εβδομάδα αποφεύγουμε εντελώς κρέας, γαλακτοκομικά και αβγά. Λάδι, κρασί και ψάρι εξαρτώνται από την ημέρα. Δεν πρόκειται για δίαιτα. Είναι τρόπος να φέρουμε το σώμα σε αρμονία με αυτό που προσπαθεί να κάνει η ψυχή: να επιβραδυνθεί, να προσέξει και να στραφεί στον Θεό.' },
    { q: 'Πρέπει να νηστεύω τέλεια;', a: 'Όχι. Η Εκκλησία πάντα δίδασκε τη νηστεία ως οδηγό, όχι ως νόμο. Η μερική νηστεία είναι αληθινή νηστεία. Αν μπορείς να κάνεις μόνο ένα πράγμα, κάνε αυτό το ένα. Αξίζει να μιλήσεις με τον ιερέα σου για το επίπεδο νηστείας που ταιριάζει στη δική σου κατάσταση.' },
    { q: 'Τι μπορώ να φάω;', a: 'Λαχανικά, όσπρια, ψωμί, ζυμαρικά, ρύζι, φρούτα και ξηροί καρποί επιτρέπονται σε όλη τη Μεγάλη Εβδομάδα. Ψάρι επιτρέπεται μόνο την Κυριακή των Βαΐων. Λάδι και κρασί επιτρέπονται την Κυριακή των Βαΐων και τη Μεγάλη Πέμπτη. Η Μεγάλη Τετάρτη και η Μεγάλη Παρασκευή είναι οι αυστηρότερες μέρες.' },
    { q: 'Τι γίνεται με τον καφέ και το τσάι;', a: 'Σκέτος καφές και σκέτο τσάι επιτρέπονται σε όλη τη Μεγάλη Εβδομάδα. Το θέμα είναι το γάλα. Αν πίνεις σκέτο καφέ δεν έχεις τίποτα να ανησυχείς.' },
    { q: 'Γιατί η Μεγάλη Παρασκευή είναι η πιο αυστηρή μέρα;', a: 'Η Μεγάλη Παρασκευή είναι η μέρα της Σταύρωσης. Δεν τελείται Θεία Λειτουργία σήμερα, η μόνη μέρα σε όλο τον χρόνο που συμβαίνει αυτό. Πολλοί ορθόδοξοι χριστιανοί δεν τρώνε τίποτα μέχρι το βράδυ, ως τρόπο να αγρυπνήσουν μαζί με τον Χριστό στα Πάθη Του.' },
    { q: 'Πότε τελειώνει η νηστεία;', a: 'Τα μεσάνυχτα του Μεγάλου Σαββάτου όταν ο ιερέας ψάλλει Χριστός Ανέστη για πρώτη φορά. Εκεί αλλάζουν τα πάντα. Η νηστεία τελειώνει και αρχίζει η γιορτή, συνήθως με κόκκινα πασχαλινά αβγά και μαγειρίτσα.' },
    { q: 'Γιατί νηστεύουμε;', a: 'Η νηστεία είναι μία από τις παλαιότερες πρακτικές της Εκκλησίας. Εμφανίζεται στην Παλαιά Διαθήκη, στην Καινή Διαθήκη και σε κάθε γενιά χριστιανικής ζωής από τότε. Δεν πρόκειται να κερδίσουμε κάτι με αυτή. Ασκεί τη θέληση, ηρεμεί την επιθυμία και διδάσκει το σώμα να ακολουθεί εκεί που πηγαίνει η ψυχή.' },
  ],
  days: [
    { tip: 'Σήμερα επιτρέπεται ψάρι, λάδι και κρασί. Είναι η πιο χαρούμενη μέρα της Μεγάλης Εβδομάδας.', storyTitle: 'Η Είσοδος στα Ιεροσόλυμα', story: 'Ο Χριστός μπήκε στα Ιεροσόλυμα καβαλάρης σε γαϊδούρι ενώ τα πλήθη άπλωναν τα ρούχα τους στο δρόμο, κουνούσαν κλαδιά φοινίκων και φώναζαν Ωσαννά. Ο προφήτης Ζαχαρίας το είχε προφητεύσει αιώνες νωρίτερα. Η πόλη ήταν γεμάτη προσκυνητές που είχαν έρθει για το Πάσχα. Πολλοί ανέμεναν έναν πολιτικό μεσσία που θα ανέτρεπε τη Ρώμη. Αυτό που βρήκαν ήταν κάτι εντελώς διαφορετικό. Σήμερα είναι μέρα αληθινής χαράς, αλλά ανοίγει την πιο ιερή εβδομάδα του χρόνου.' },
    { tip: 'Αυστηρή νηστεία σήμερα. Χωρίς λάδι, κρασί ή ψάρι. Μόνο απλά γεύματα.', storyTitle: 'Ο Ιωσήφ και η Άκαρπη Συκιά', story: 'Η Εκκλησία θυμάται δύο πράγματα σήμερα. Τον πατριάρχη Ιωσήφ, που τον πούλησαν στη δουλεία τα ίδια του τα αδέρφια, ως εικόνα του Χριστού που θα παραδοθεί από έναν δικό του. Και τη στιγμή που ο Ιησούς καταράστηκε μια άκαρπη συκιά στο δρόμο, προειδοποίηση για εκείνους που φέρουν εξωτερική ευσέβεια χωρίς να καρποφορούν. Η εβδομάδα ξεκίνησε επίσημα.' },
    { tip: 'Η νηστεία συνεχίζεται. Φακές ή φασολάδα είναι καλές επιλογές σήμερα.', storyTitle: 'Αι Δέκα Παρθένοι', story: 'Ο Ιησούς δίδαξε σήμερα στην αυλή του Ναού και είπε την παραβολή των Δέκα Παρθένων. Πέντε από αυτές κράτησαν τις λαμπάδες τους αναμμένες όλη τη νύχτα. Πέντε έμειναν χωρίς λάδι και βρέθηκαν έξω όταν ήρθε ο νυμφίος. Το μήνυμα είναι άβολο: δεν μπορείς να δανειστείς την ετοιμότητα κάποιου άλλου. Κανείς δεν μπορεί να νηστέψει ή να προσευχηθεί για λογαριασμό σου τη στιγμή που μετράει.' },
    { tip: 'Μία από τις αυστηρότερες μέρες του χρόνου. Πολλοί τρώνε μόνο ψωμί και νερό σήμερα.', storyTitle: 'Η Αμαρτωλή και η Προδοσία', story: 'Δύο πράγματα συνέβησαν αυτή τη μέρα και η Εκκλησία τα κρατάει μαζί σκόπιμα. Μια γυναίκα γνωστή σε όλη την πόλη για τις αμαρτίες της ήρθε στο σπίτι του Σίμωνα του Λεπρού, όπου έτρωγε ο Ιησούς. Έσπασε ένα ακριβό δοχείο μύρου και το άδειασε στα πόδια του, κλαίγοντας. Οι μαθητές αγανάκτησαν για τη σπατάλη. Ο Ιησούς την υπεράσπισε. Την ίδια νύχτα ο Ιούδας πήγε στους αρχιερείς και συμφώνησε να τον παραδώσει για τριάντα αργύρια.' },
    { tip: 'Λάδι και κρασί επιτρέπονται σήμερα στη μνήμη του Μυστικού Δείπνου.', storyTitle: 'Ο Μυστικός Δείπνος', story: 'Ο Ιησούς μαζεύτηκε με τους μαθητές του για το πασχαλινό δείπνο και έκανε κάτι που τους άφησε άφωνους: γονάτισε και τους έπλυνε τα πόδια έναν έναν. Κατόπιν πήρε ψωμί, το έκλασε, πήρε το ποτήρι, το ευλόγησε και τους είπε πως αυτό είναι το σώμα και το αίμα του. Να το κάνετε στη μνήμη μου. Ύστερα βγήκε στον κήπο της Γεθσημανή να προσευχηθεί, ξέροντας τι επρόκειτο να γίνει. Το βράδυ η Εκκλησία διαβάζει τα Δώδεκα Ευαγγέλια των Παθών.' },
    { tip: 'Η αυστηρότερη νηστεία του χρόνου. Πολλοί δεν τρώνε τίποτα μέχρι το βράδυ.', storyTitle: 'Η Σταύρωση', story: 'Τον συνέλαβαν στον κήπο το προηγούμενο βράδυ, τον δίκασαν όλη τη νύχτα, τον καταδίκασε ο Πιλάτος το πρωί και τον σταύρωσαν στις εννέα. Πέθανε στις τρεις το απόγευμα. Σήμερα είναι η μόνη μέρα σε όλο τον χρόνο που δεν τελείται Θεία Λειτουργία πουθενά στον Ορθόδοξο κόσμο. Το βράδυ βγαίνει ο Επιτάφιος και οι πιστοί μαζεύονται να θρηνήσουν και να τον προσκυνήσουν.' },
    { tip: 'Νηστεία μέχρι τα μεσάνυχτα. Όταν ο ιερέας ψάλλει Χριστός Ανέστη, η νηστεία τελειώνει.', storyTitle: 'Το Μέγα Σάββατο', story: 'Η Εκκλησία αποκαλεί σήμερα Μέγα Σάββατο. Ο Χριστός βρίσκεται στον τάφο και ολόκληρος ο κόσμος περιμένει. Οι αρχαίοι ύμνοι αυτής της μέρας περιγράφουν την κατάβασή Του στον Άδη, πώς έσπασε τις πύλες του και ελευθέρωσε εκείνους που περίμεναν από τις αρχές του κόσμου. Τα μεσάνυχτα αλλάζουν τα πάντα. Η εκκλησία σβήνει. Μια μικρή φλόγα εμφανίζεται στο ιερό και απλώνεται από άνθρωπο σε άνθρωπο μέχρι να φωτιστεί ολόκληρος ο ναός. Ο ιερέας ψάλλει Χριστός Ανέστη.' },
  ],
  recipeList: [
    { name: 'Φασολάδα', desc: 'Η κλασική νηστίσιμη φασολάδα που φτιάχνει κάθε ελληνική οικογένεια. Χορταστική και νόστιμη.', steps: ['Μούλιασε 500γρ ξερά λευκά φασόλια από το βράδυ, ή χρησιμοποίησε 2 κονσέρβες (400γρ) κάνελλινι φασόλια, στραγγισμένα.', 'Κόψε σε κυβάκια 1 κρεμμύδι, 2 καρότα και 2 κοτσάνια σέλινο. Τσιγάρισε σε 3 κ.σ. ελαιόλαδο για 5 λεπτά.', 'Πρόσθεσε 400γρ τριμμένες ντομάτες και τα φασόλια. Κάλυψε με 1,5 λίτρο νερό και σιγοβράσε 20 λεπτά.', 'Αλατοπιπέρωσε και πρόσθεσε χυμό 1 λεμονιού. Ρίξε λίγο ελαιόλαδο πριν σερβίρεις.'] },
    { name: 'Φακές', desc: 'Χωρίς λάδι, γι\' αυτό είναι ιδανικές για τις αυστηρότερες μέρες νηστείας. Σερβίρονται με κόκκινο ξίδι.', steps: ['Ξέπλυνε 400γρ καφέ ή πράσινες φακές κάτω από κρύο νερό μέχρι να καθαρίσει το νερό.', 'Βάλε σε κατσαρόλα με 1 ψιλοκομμένο κρεμμύδι, 3 σκελίδες σκόρδο, 1 δαφνόφυλλο και 400γρ κονσέρβα ντομάτα.', 'Κάλυψε με 1,2 λίτρο νερό. Φέρε σε βρασμό, μετά σιγοβράσε για 25 λεπτά μέχρι να πήξει.', 'Ανακάτεψε 2 κ.σ. κόκκινο ξίδι, αλατοπιπέρωσε. Σέρβιρε με ψωμί.'] },
    { name: 'Ταραμοσαλάτα', desc: 'Σαλάτα ταραμά που φτιάχνεται την Κυριακή των Βαΐων, όταν επιτρέπεται το ψάρι.', steps: ['Αφαίρεσε τις κόρες από 3–4 φέτες ψωμί, βύθισε στο νερό για 1 λεπτό και στύψε καλά.', 'Χτύπησε 100γρ ταραμά με το ψωμί στο μπλέντερ μέχρι να ομογενοποιηθεί.', 'Με το μπλέντερ να τρέχει, στάξε αργά 150ml ελαιόλαδο μέχρι να γίνει κρεμώδες.', 'Πρόσθεσε χυμό 1 λεμονιού, χτύπησε λίγο ακόμα. Κρύωσε 30 λεπτά πριν σερβίρεις.'] },
    { name: 'Λαγάνα', desc: 'Παραδοσιακή πλακάτη πίτα για την Κυριακή των Βαΐων, γεμάτη σουσάμι.', steps: ['Ανακάτεψε 500γρ αλεύρι, 7γρ μαγιά, 1 κ.γ. αλάτι, 2 κ.σ. ελαιόλαδο και 300ml χλιαρό νερό. Ζύμωσε 10 λεπτά.', 'Σκέπασε με πετσέτα και άσε να φουσκώσει σε ζεστό μέρος για 1 ώρα.', 'Άπλωσε σε ταψί με λαδόκολλα σε επίπεδο οβάλ σχήμα. Άλειψε με νερό και πίεσε 50γρ σουσάμι πάνω.', 'Ψήσε στους 200°C για 25 λεπτά μέχρι να ροδίσει και να ακούγεται κοίλο.'] },
    { name: 'Σπανακόριζο', desc: 'Απλό και νόστιμο. Τελειώνει με καλό στύψιμο λεμονιού.', steps: ['Ψιλόκοψε 1 κρεμμύδι και 4 φρέσκα κρεμμυδάκια. Τσιγάρισε σε 3 κ.σ. ελαιόλαδο για 5 λεπτά.', 'Πρόσθεσε 200γρ ρύζι και ανακάτεψε 1 λεπτό να καλυφθεί με το λάδι.', 'Πρόσθεσε 500γρ φρέσκο σπανάκι (χοντροκομμένο) ή 300γρ κατεψυγμένο, 600ml ζωμό λαχανικών και χούφτα φρέσκο άνηθο.', 'Σιγοβράσε σκεπαστό σε χαμηλή φωτιά 18 λεπτά. Στύψε χυμό 1 λεμονιού και αλατοπιπέρωσε.'] },
    { name: 'Χαλβάς', desc: 'Το κλασικό νηστίσιμο γλυκό, φτιαγμένο με σιμιγδάλι. Χωρίς αβγά ή βούτυρο.', steps: ['Καβούρδισε 250γρ ψιλό σιμιγδάλι σε στεγνή κατσαρόλα ανακατεύοντας συνεχώς για 7–8 λεπτά μέχρι να ροδίσει.', 'Εν τω μεταξύ, βράσε 500ml νερό με 200γρ ζάχαρη και ένα ξυλάκι κανέλας.', 'Κατέβασε από τη φωτιά. Ρίξε προσεκτικά το ζεστό σιρόπι (θα κάνει φουσκάλες). Ανακάτεψε γρήγορα με ξύλινη κουτάλα.', 'Ρίξε σε βουτυρωμένη φόρμα. Κρύωσε 15 λεπτά, ξεφορμάρισε, πασπάλισε κανέλα και σέρβιρε.'] },
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