// Menu przepisane z karty klienta (PDF na sushidlaciebie.pl, flipbook heyzine).
// veg  = bez mięsa i ryb (wege),  raw = zawiera surową rybę.

export type Price = number | { label: string; price: number }[]

export type Item = {
  name: string
  desc: string
  price: Price
  img?: string
  veg?: boolean
  raw?: boolean
}

export type Category = {
  id: string
  name: string
  pcs?: string
  items: Item[]
}

export const MENU: Category[] = [
  {
    id: 'przystawki',
    name: 'Przystawki',
    items: [
      { name: 'Kalafior w tempurze', desc: 'z sosem sweet chilli · 6 szt.', price: 16, img: 'kalafior-tempura', veg: true },
      { name: 'Krewetki w tempurze', desc: 'z sosem spicy mayo', price: [{ label: '3 szt.', price: 22 }, { label: '6 szt.', price: 40 }], img: 'krewetki-tempura' },
      { name: 'Pierogi gyoza', desc: '5 szt. · z krewetką, kaczką lub warzywami', price: [{ label: 'krewetka', price: 22 }, { label: 'kaczka', price: 20 }, { label: 'warzywa', price: 18 }], img: 'gyoza' },
    ],
  },
  {
    id: 'salatki',
    name: 'Sałatki / Tatar',
    items: [
      { name: 'Tatar z łososia', desc: 'tatar maki · marynowany łosoś, ryż, sezam', price: 38, raw: true },
      { name: 'Edamame', desc: 'fasolka edamame z solą', price: 16, veg: true },
      { name: 'Wakame', desc: 'algi, ogórek, sezam, dressing', price: 14, veg: true },
    ],
  },
  {
    id: 'nigiri',
    name: 'Nigiri',
    pcs: '2 szt.',
    items: [
      { name: 'Nigiri Salmon', desc: 'ryż, surowy łosoś', price: 19, raw: true },
      { name: 'Nigiri Grill Salmon', desc: 'ryż, grillowany łosoś', price: 21 },
      { name: 'Nigiri Awokado', desc: 'ryż, awokado, nori', price: 14, veg: true },
      { name: 'Nigiri Tamago', desc: 'ryż, tamago, nori', price: 14, veg: true },
      { name: 'Nigiri Ebi', desc: 'ryż, krewetka', price: 20 },
      { name: 'Nigiri Unagi', desc: 'ryż, węgorz', price: 20 },
    ],
  },
  {
    id: 'hosomaki',
    name: 'Hosomaki',
    pcs: '6 szt.',
    items: [
      { name: 'Kappa Maki', desc: 'ryż, ogórek, sezam', price: 14, veg: true },
      { name: 'Oshinko Maki', desc: 'ryż, marynowana rzepa', price: 14, veg: true },
      { name: 'Kampyo Maki', desc: 'ryż, marynowana tykwa', price: 14, veg: true },
      { name: 'Tamago Maki', desc: 'ryż, tamago', price: 14, veg: true },
      { name: 'Awokado Maki', desc: 'awokado, ryż', price: 16, veg: true },
      { name: 'Salmon Maki', desc: 'ryż, łosoś', price: 20, raw: true },
      { name: 'Ebi Maki', desc: 'ryż, gotowana krewetka', price: 22 },
      { name: 'Hoso Grill Salmon', desc: 'ryż, grillowany łosoś', price: 22 },
      { name: 'Hoso Tempura Salmon', desc: 'ryż, tempura, łosoś', price: 25 },
      { name: 'Hoso Tempura Unagi', desc: 'ryż, tempura, węgorz', price: 25 },
    ],
  },
  {
    id: 'gunkan',
    name: 'Gunkan',
    pcs: '2 szt.',
    items: [
      { name: 'Gunkan Mayosurimi', desc: 'ryż, sałatka z surimi', price: 18 },
      { name: 'Gunkan Tatar Salmon', desc: 'ryż, tatar z łososia, sezam', price: 18, raw: true },
      { name: 'Gunkan Wege', desc: 'ryż, tatar wege, sezam', price: 16, veg: true },
      { name: 'Gunkan Goma', desc: 'ryż, trawa morska, sezam', price: 16, veg: true },
    ],
  },
  {
    id: 'futomaki',
    name: 'Futomaki',
    pcs: '6 szt.',
    items: [
      { name: 'Philadelphia Salmon Maki', desc: 'łosoś, serek, ryż, sałata, ogórek', price: 34, img: 'philadelphia-salmon', raw: true },
      { name: 'Tempura Philadelphia', desc: 'tempura, łosoś, serek, ryż, sałata, ogórek', price: 37, img: 'tempura-philadelphia', raw: true },
      { name: 'Tempura Grill Maki', desc: 'tempura, łosoś grillowany, serek, ryż, ogórek', price: 37, img: 'tempura-grill' },
      { name: 'Salmon Tempura Maki', desc: 'łosoś w tempurze, serek, ryż, sałata, ogórek', price: 33, img: 'salmon-tempura' },
      { name: 'Grill Salmon Maki', desc: 'łosoś grillowany, majonez, ryż, sałata, ogórek', price: 31, img: 'grill-salmon' },
      { name: 'Ebi Tempura Maki', desc: 'krewetka w tempurze, majonez, ryż, sałata, ogórek', price: 34, img: 'ebi-tempura' },
      { name: 'Halibut Panko Maki', desc: 'halibut w panko, sos algierski, ryż, sałata, ogórek', price: 35, img: 'halibut-panko' },
      { name: 'Kalmar Sweet Chilli', desc: 'kalmar w panko, ryż, sałata, awokado/ogórek, sweet chilli', price: 33, img: 'kalmar-sweet-chilli' },
      { name: 'Unagi Spice Maki', desc: 'węgorz w tempurze, tamago, ryż, ogórek, spicy mayo', price: 35, img: 'unagi-spice' },
      { name: 'Wege Tempura Maki', desc: 'cukinia w tempurze, majonez, ryż, oshinko, kampyo, sałata, ogórek', price: 25, img: 'wege-tempura', veg: true },
      { name: 'Kalaf Tempura Maki', desc: 'kalafior w panko, majonez, sriracha, ryż, sałata, ogórek, kampyo', price: 27, img: 'kalaf-tempura', veg: true },
    ],
  },
  {
    id: 'tamago',
    name: 'Tamago',
    pcs: '6 szt.',
    items: [
      { name: 'Tamago Salmon Tempura/Grill', desc: 'grillowany lub w tempurze łosoś, serek, ryż, ogórek, sałata, sezam, teriyaki', price: 35, img: 'tamago-salmon' },
      { name: 'Tamago Ebi Tempura', desc: 'krewetka w tempurze, serek, ryż, ogórek, sałata, sezam, teriyaki', price: 37, img: 'tamago-ebi' },
      { name: 'Tamago Halibut Tempura', desc: 'halibut w tempurze, serek, ryż, ogórek, sałata, sezam, teriyaki', price: 37, img: 'tamago-halibut' },
    ],
  },
  {
    id: 'california',
    name: 'California',
    pcs: '8 szt.',
    items: [
      { name: 'California Classic', desc: 'surimi, ryż, serek, sezam, ogórek', price: 26, img: 'california-classic' },
      { name: 'California Grill Salmon', desc: 'łosoś grillowany, ryż, serek, sezam, ogórek', price: 34, img: 'california-grill' },
      { name: 'California Salmon', desc: 'łosoś, ryż, serek, sezam, awokado', price: 35, img: 'california-salmon', raw: true },
      { name: 'California Ebi', desc: 'krewetki w tempurze, ryż, spicy mayo, sezam, kampyo, oshinko', price: 38, img: 'california-ebi' },
      { name: 'California Wege', desc: 'brokuł w tempurze, ryż, majonez, sezam, kampyo, oshinko', price: 28, img: 'california-wege', veg: true },
    ],
  },
  {
    id: 'premium',
    name: 'Uramaki Premium',
    pcs: '8 szt.',
    items: [
      { name: 'Awokado Roll', desc: 'łosoś grillowany, ryż, serek, awokado, ogórek', price: 42, img: 'awokado-roll' },
      { name: 'Mango Roll', desc: 'krewetki w tempurze, mango, serek, oshinko', price: 44, img: 'mango-roll' },
      { name: 'Master Tempura Roll', desc: 'łosoś w tempurze, ryż, kampyo, serek, por, teriyaki', price: 48, img: 'master-tempura' },
      { name: 'Dragon Roll', desc: 'łosoś, ryż, krewetki w tempurze, ogórek, serek, awokado', price: 47, img: 'dragon-roll', raw: true },
      { name: 'Unagi Roll', desc: 'por w tempurze, ryż, majonez, kampyo, oshinko, tamago, teriyaki', price: 45, img: 'unagi-roll' },
      { name: 'Forest Roll', desc: 'kalafior w panko, ryż, serek, sezam, kampyo, awokado, węgorz, teriyaki', price: 45, img: 'forest-roll' },
      { name: 'Salmon Mayosurimi Roll', desc: 'łosoś, ryż, sałatka surimi, majonez, por, sezam', price: 43, img: 'salmon-mayosurimi', raw: true },
      { name: 'Wege Tatar Roll', desc: 'suszony pomidor, awokado, ryż, cukinia w tempurze, czerwona cebulka, sezam', price: 40, img: 'wege-tatar', veg: true },
      { name: 'Red Devil Roll', desc: 'węgorz w panko, ryż, spicy mayo, łosoś opalany, ogórek', price: 46, img: 'red-devil' },
      { name: 'Mango Kalaf Roll', desc: 'kalafior w panko, ryż, serek, mango, kampyo', price: 40, img: 'mango-kalaf', veg: true },
      { name: 'Ebi Creamy Roll', desc: 'gotowana krewetka, ryż, serek, ogórek, zapiekany łosoś', price: 48, img: 'ebi-creamy' },
    ],
  },
]

export type SushiSet = {
  name: string
  pcs: number
  price: number
  img: string
  items: string[]
  tag?: string
}

export const SETS: SushiSet[] = [
  { name: 'Set 1', pcs: 16, price: 84, img: 'set-1', items: ['California Wege', 'Unagi Spice Maki', 'Nigiri Grill Salmon'] },
  { name: 'Set 2', pcs: 26, price: 89, img: 'set-2', tag: '100% wege', items: ['Mango Kalaf Roll', 'Wege Tempura Maki', 'Kampyo Maki', 'Kappa Maki'] },
  { name: 'Set 3', pcs: 26, price: 123, img: 'set-3', items: ['Grill Salmon Maki', 'California Classic', 'Kalmar Sweet Chilli', 'Salmon Tempura Maki'] },
  { name: 'Set 4', pcs: 30, price: 150, img: 'set-4', items: ['Ebi Tempura Maki', 'Tamago Salmon Tempura', 'Halibut Panko Maki', 'Kalaf Tempura Maki', 'Hoso Grill Maki'] },
  { name: 'Orange Set', pcs: 26, price: 171, img: 'set-orange', tag: 'premium', items: ['Nigiri Salmon ×2', 'Nigiri Grill Salmon ×2', 'Salmon Mayosurimi Roll ×8', 'Ebi Creamy Roll ×8', 'Soya Unagi ×6'] },
  { name: 'Yellow Set', pcs: 36, price: 200, img: 'set-yellow', tag: 'premium', items: ['Unagi Roll ×8', 'Mango Roll ×8', 'California Miso Smoke ×8', 'Tamago Halibut ×6', 'Tempura Grill Maki ×6'] },
  { name: 'Set 5', pcs: 62, price: 276, img: 'set-5', tag: 'na imprezę', items: ['Unagi Spice Maki', 'Tamago Ebi Tempura', 'California Classic', 'Wege Tempura Maki', 'Ebi Tempura Maki', 'Tamago Salmon Tempura', 'Halibut Panko Maki', 'Grill Salmon Maki', 'Kappa Maki', 'Oshinko Maki'] },
]

export const CONTACT = {
  phone: '513 528 454',
  phoneHref: 'tel:+48513528454',
  email: 'sushidlaciebiee@gmail.com',
  street: 'Jaśminowa 4',
  city: '12-200 Pisz',
  maps: 'https://maps.app.goo.gl/RhsHr7RkS79vMfdD9',
  facebook: 'https://www.facebook.com/SushidlaCiebie/',
  instagram: 'https://www.instagram.com/sushidlaciebie/',
}

// 0 = niedziela … 6 = sobota; godziny w formacie [otwarcie, zamknięcie] w minutach
export const HOURS: { day: string; idx: number; open?: [number, number] }[] = [
  { day: 'Poniedziałek', idx: 1 },
  { day: 'Wtorek', idx: 2 },
  { day: 'Środa', idx: 3, open: [13 * 60, 20 * 60 + 30] },
  { day: 'Czwartek', idx: 4, open: [13 * 60, 20 * 60 + 30] },
  { day: 'Piątek', idx: 5, open: [13 * 60, 20 * 60 + 30] },
  { day: 'Sobota', idx: 6, open: [13 * 60, 20 * 60 + 30] },
  { day: 'Niedziela', idx: 0, open: [13 * 60, 20 * 60] },
]

export const REELS = [
  '1747398843025648',
  '899185396320340',
  '1394267902599868',
  '1529225168319599',
  '1562014938995303',
  '808713638165794',
]
