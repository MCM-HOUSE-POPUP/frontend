export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  house: "LEGACY" | "INSTINCT" | "FREEDOM" | "CURIOSITY";
}

export const housePool: Record<string, Product[]> = {
  LEGACY: [
    {
      id: 101,
      name: "Neo Terrain 비세토스 로우탑 스니커즈",
      price: 770000,
      image: "/images/legacy/01_REC.PNG",
      house: "LEGACY",
    },
    {
      id: 102,
      name: "비세토스 네오 테라인 스니커즈",
      price: 630000,
      image: "/images/legacy/01_REC2.PNG",
      house: "LEGACY",
    },
    {
      id: 103,
      name: "Aren 비세토스 레더 믹스 베니티 케이스",
      price: 990000,
      image: "/images/legacy/01_REC3.PNG",
      house: "LEGACY",
    },
    {
      id: 104,
      name: "Aren 비세토스 브라스 플레이트 지갑",
      price: 490000,
      image: "/images/legacy/01_REC4.PNG",
      house: "LEGACY",
    },
    {
      id: 105,
      name: "50주년 기념 티셔츠",
      price: 390000,
      image: "/images/legacy/01_REC5.PNG",
      house: "LEGACY",
    },
    {
      id: 106,
      name: "라우첼 지오메트릭 선글라스",
      price: 290000,
      image: "/images/legacy/01_REC6.PNG",
      house: "LEGACY",
    },
    {
      id: 107,
      name: "München 폰테 캡",
      price: 430000,
      image: "/images/legacy/01_REC7.PNG",
      house: "LEGACY",
    },
  ],
  INSTINCT: [
    {
      id: 201,
      name: "Diamant 비세토스 3D 참",
      price: 490000,
      image: "/images/instinct/02_REC.avif",
      house: "INSTINCT",
    },
    {
      id: 202,
      name: "Aren 비세토스 트라이앵글 크로스바디",
      price: 790000,
      image: "/images/instinct/02_REC2.avif",
      house: "INSTINCT",
    },
    {
      id: 203,
      name: "스퀘어 선글라스",
      price: 350000,
      image: "/images/instinct/02_REC3.avif",
      house: "INSTINCT",
    },
    {
      id: 204,
      name: "Pina 비세토스 스터드 장식 토트",
      price: 1690000,
      image: "/images/instinct/02_REC4.avif",
      house: "INSTINCT",
    },
    {
      id: 205,
      name: "모노그램 프린트 후드 윈드브레이커 ECONYL®",
      price: 1250000,
      image: "/images/instinct/02_REC5.avif",
      house: "INSTINCT",
    },
    {
      id: 206,
      name: "42-49mm 비세토스 Apple Watch 스트랩",
      price: 290000,
      image: "/images/instinct/02_REC6.avif",
      house: "INSTINCT",
    },
  ],
  FREEDOM: [
    {
      id: 301,
      name: "Aren 비세토스 슬링백",
      price: 1150000,
      image: "/images/freedom/03_REC.avif",
      house: "FREEDOM",
    },
    {
      id: 302,
      name: "Aren 비세토스 래빗 2D 참",
      price: 270000,
      image: "/images/freedom/03_REC2.avif",
      house: "FREEDOM",
    },
    {
      id: 303,
      name: "Aren 비세토스 레더 믹스 베니티 케이스",
      price: 990000,
      image: "/images/freedom/03_REC3.PNG",
      house: "FREEDOM",
    },
    {
      id: 304,
      name: "Aren 비세토스 브라스 플레이트 지갑",
      price: 490000,
      image: "/images/freedom/03_REC4.PNG",
      house: "FREEDOM",
    },
    {
      id: 305,
      name: "에센셜 로고 폰테 트랙 자켓",
      price: 730000,
      image: "/images/freedom/03_REC5.avif",
      house: "FREEDOM",
    },
    {
      id: 306,
      name: "Disco 로고 자수 코튼 트윌 캡",
      price: 370000,
      image: "/images/freedom/03_REC6.avif",
      house: "FREEDOM",
    },
    {
      id: 307,
      name: "다이아몬드 모노그램 스카프",
      price: 390000,
      image: "/images/freedom/03_REC7.avif",
      house: "FREEDOM",
    },
  ],
  CURIOSITY: [
    {
      id: 401,
      name: "Aren 듀오 호보 맥시 비세토스와 카프스킨",
      price: 1290000,
      image: "/images/curiosity/04_REC.avif",
      house: "CURIOSITY",
    },
    {
      id: 402,
      name: "Aren 비세토스 레더 믹스 베니티 케이스",
      price: 1190000,
      image: "/images/curiosity/04_REC2.avif",
      house: "CURIOSITY",
    },
    {
      id: 403,
      name: "Pina 비세토스 탬버린 백",
      price: 1690000,
      image: "/images/curiosity/04_REC3.avif",
      house: "CURIOSITY",
    },
    {
      id: 404,
      name: "실크 파자마 셔츠",
      price: 1050000,
      image: "/images/curiosity/04_REC4.avif",
      house: "CURIOSITY",
    },
    {
      id: 405,
      name: "Skywander 메탈릭 카프 레더 앵클 부츠",
      price: 950000,
      image: "/images/curiosity/04_REC5.avif",
      house: "CURIOSITY",
    },
    {
      id: 406,
      name: "Mars Mask 선글라스",
      price: 710000,
      image: "/images/curiosity/04_REC6.avif",
      house: "CURIOSITY",
    },
    {
      id: 407,
      name: "모노그램 플랫폼 양가죽 샌들",
      price: 890000,
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
