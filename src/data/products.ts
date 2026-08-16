import type { HouseType, Product } from "../types/product";

export const housePool: Record<HouseType, Product[]> = {
  LEGACY: [
    {
      id: "01_REC1",
      name: "Neo Terrain 비세토스 로우탑 스니커즈",
      price: 770000,
      category: "SHOES",
      image: "/images/legacy/01_REC.PNG",
      house: "LEGACY",
    },
    {
      id: "01_REC2",
      name: "비세토스 네오 터레인 스니커즈",
      price: 630000,
      category: "SHOES",
      image: "/images/legacy/01_REC2.PNG",
      house: "LEGACY",
    },
    {
      id: "01_REC3",
      name: "Aren 비세토스 레더 믹스 베니티 케이스",
      price: 990000,
      category: "BAG",
      image: "/images/legacy/01_REC3.PNG",
      house: "LEGACY",
    },
    {
      id: "01_REC4",
      name: "Aren 비세토스 브라스 플레이트 지갑",
      price: 490000,
      category: "WALLET",
      image: "/images/legacy/01_REC4.PNG",
      house: "LEGACY",
    },
    {
      id: "01_REC5",
      name: "50주년 기념 티셔츠",
      price: 390000,
      category: "APPAREL",
      image: "/images/legacy/01_REC5.PNG",
      house: "LEGACY",
    },
    {
      id: "01_REC6",
      name: "라우볼 지오메트릭 선글라스",
      price: 290000,
      category: "ACCESSORY",
      image: "/images/legacy/01_REC6.PNG",
      house: "LEGACY",
    },
    {
      id: "01_REC7",
      name: "München 트러커 캡",
      price: 430000,
      category: "ACCESSORY",
      image: "/images/legacy/01_REC7.PNG",
      house: "LEGACY",
    },
  ],

  INSTINCT: [
    {
      id: "02_REC1",
      name: "Diamant 비세토스 3D 참",
      price: 490000,
      category: "ACCESSORY",
      image: "/images/instinct/02_REC.avif",
      house: "INSTINCT",
    },
    {
      id: "02_REC2",
      name: "Aren 비세토스 트래버텅글 크로스바디",
      price: 790000,
      category: "BAG",
      image: "/images/instinct/02_REC2.avif",
      house: "INSTINCT",
    },
    {
      id: "02_REC3",
      name: "스페어 선글라스",
      price: 350000,
      category: "ACCESSORY",
      image: "/images/instinct/02_REC3.avif",
      house: "INSTINCT",
    },
    {
      id: "02_REC4",
      name: "Pina 비세토스 스터드 장식 보트",
      price: 1620000,
      category: "BAG",
      image: "/images/instinct/02_REC4.avif",
      house: "INSTINCT",
    },
    {
      id: "02_REC5",
      name: "모노그램 프린트 후드 핸드브레이커 ECONYL®",
      price: 1250000,
      category: "APPAREL",
      image: "/images/instinct/02_REC5.avif",
      house: "INSTINCT",
    },
    {
      id: "02_REC6",
      name: "42-49mm 비세토스 Apple Watch 스트랩",
      price: 290000,
      category: "ACCESSORY",
      image: "/images/instinct/02_REC6.avif",
      house: "INSTINCT",
    },
  ],

  FREEDOM: [
    {
      id: "03_REC1",
      name: "Aren 비세토스 슬링백",
      price: 1150000,
      category: "BAG",
      image: "/images/freedom/03_REC.avif",
      house: "FREEDOM",
    },
    {
      id: "03_REC2",
      name: "Aren 비세토스 레인 2D 참",
      price: 270000,
      category: "ACCESSORY",
      image: "/images/freedom/03_REC2.avif",
      house: "FREEDOM",
    },
    {
      id: "03_REC3",
      name: "Aren 비세토스 레더 믹스 트레인 케이스",
      price: 990000,
      category: "TRAVEL",
      image: "/images/freedom/03_REC3.PNG",
      house: "FREEDOM",
    },
    {
      id: "03_REC4",
      name: "Aren 비세토스 브라스 플레이트 지갑",
      price: 490000,
      category: "WALLET",
      image: "/images/freedom/03_REC4.PNG",
      house: "FREEDOM",
    },
    {
      id: "03_REC5",
      name: "해븐셀 로고 콘테 트랙 자켓",
      price: 730000,
      category: "APPAREL",
      image: "/images/freedom/03_REC5.avif",
      house: "FREEDOM",
    },
    {
      id: "03_REC6",
      name: "Disco 로고 파우 코튼 트월 캡",
      price: 370000,
      category: "ACCESSORY",
      image: "/images/freedom/03_REC6.avif",
      house: "FREEDOM",
    },
    {
      id: "03_REC7",
      name: "다이아몬드 모노그램 스카프",
      price: 390000,
      category: "ACCESSORY",
      image: "/images/freedom/03_REC7.avif",
      house: "FREEDOM",
    },
  ],

  CURIOSITY: [
    {
      id: "04_REC1",
      name: "Aren 듀오 오브 럭시 비세토스 숄더 카프스킨",
      price: 1290000,
      category: "BAG",
      image: "/images/curiosity/04_REC.avif",
      house: "CURIOSITY",
    },
    {
      id: "04_REC2",
      name: "Aren 비세토스 레더 믹스 베니티 케이스",
      price: 1190000,
      category: "BAG",
      image: "/images/curiosity/04_REC2.avif",
      house: "CURIOSITY",
    },
    {
      id: "04_REC3",
      name: "Pina 비세토스 탬버린 백",
      price: 1690000,
      category: "BAG",
      image: "/images/curiosity/04_REC3.avif",
      house: "CURIOSITY",
    },
    {
      id: "04_REC4",
      name: "실크 피치아 셔츠",
      price: 1050000,
      category: "APPAREL",
      image: "/images/curiosity/04_REC4.avif",
      house: "CURIOSITY",
    },
    {
      id: "04_REC5",
      name: "Skywander 메탈릭 카드 레더 앵클 부츠",
      price: 950000,
      category: "SHOES",
      image: "/images/curiosity/04_REC5.avif",
      house: "CURIOSITY",
    },
    {
      id: "04_REC6",
      name: "Mars Mask 선글라스",
      price: 710000,
      category: "ACCESSORY",
      image: "/images/curiosity/04_REC6.avif",
      house: "CURIOSITY",
    },
    {
      id: "04_REC7",
      name: "모노그램 룰렛 양가죽 샌들",
      price: 890000,
      category: "SHOES",
      image: "/images/curiosity/04_REC7.avif",
      house: "CURIOSITY",
    },
  ],
};

export const allProducts: Product[] = Object.values(housePool).flat();

export const defaultPool: Product[] = [
  housePool.LEGACY[0],
  housePool.INSTINCT[0],
  housePool.FREEDOM[0],
  housePool.CURIOSITY[0],
  housePool.LEGACY[2],
  housePool.INSTINCT[2],
];

export const houseCategories = [
  { code: "01", name: "LEGACY" },
  { code: "02", name: "INSTINCT" },
  { code: "03", name: "FREEDOM" },
  { code: "04", name: "CURIOSITY" },
];

export const savedFilterTabs = [
  { code: "ALL", house: null },
  { code: "LEG", house: "LEGACY" },
  { code: "INS", house: "INSTINCT" },
  { code: "FRE", house: "FREEDOM" },
  { code: "CUR", house: "CURIOSITY" },
] as const;

export function getRandomProducts(pool: Product[], count: number): Product[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
