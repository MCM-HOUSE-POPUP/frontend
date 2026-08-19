import type { HouseType } from "./test";

export interface ZoneStatus {
  house: HouseType;
  zoneName: string;
  zoneMission: string;
  color: string;
  order: number;
  visited: boolean;
  visitedAt: string | null;
}

export interface PassportView {
  resultId: number;
  visitedCount: number;
  totalZones: number;
  completed: boolean;
  nextRecommended: HouseType | null;
  currentZone: HouseType | null;
  zones: ZoneStatus[];
}

export interface DiscoveryArchiveItem {
  discoveryId: number;
  house: HouseType;
  photoDataUrl: string;
  styleTitle: string;
  styleKeywords: string[];
  createdAt: string;
}