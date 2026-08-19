import type { HouseType } from "../types/test";

export const mockPassport = {
  zones: [
    {
      house: "LEGACY" as HouseType,
      order: 1,
      visited: true,
      visitedAt: "11:18",
    },
    {
      house: "INSTINCT" as HouseType,
      order: 2,
      visited: true,
      visitedAt: "11:23",
    },
    {
      house: "FREEDOM" as HouseType,
      order: 3,
      visited: false,
      visitedAt: null,
    },
    {
      house: "CURIOSITY" as HouseType,
      order: 4,
      visited: false,
      visitedAt: null,
    },
  ],
};

export const mockDiscoveries = [
  {
    discoveryId: 1,
    house: "LEGACY" as HouseType,
    photoDataUrl: "/images/passport/legacy.png",
    styleTitle: "시간을 담은 디테일",
  },
  {
    discoveryId: 2,
    house: "INSTINCT" as HouseType,
    photoDataUrl: "/images/passport/instinct.png",
    styleTitle: "처음 보는 새로운",
  },
  {
    discoveryId: 3,
    house: "FREEDOM" as HouseType,
    photoDataUrl: "/images/passport/freedom.png",
    styleTitle: "나만의 조합",
  },
  {
    discoveryId: 4,
    house: "CURIOSITY" as HouseType,
    photoDataUrl: "/images/passport/curiosity.png",
    styleTitle: "첫눈에 고른 하나",
  },
];