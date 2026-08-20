import { useState } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
import {
  getDiscoveries,
  getDiscoveryByHouse,
  getPassport,
} from "../api/passport";
import { getTestResult } from "../api/test";
import type { HouseType } from "../types/test";

const houseNumbers: Record<HouseType, string> = {
  LEGACY: "01",
  INSTINCT: "02",
  FREEDOM: "03",
  CURIOSITY: "04",
};

function formatVisitedAt(value: string) {
  return new Date(value).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function PassportPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loadingHouse, setLoadingHouse] = useState<HouseType | null>(null);
  const [discoveryError, setDiscoveryError] = useState("");

  const resultId = Number(localStorage.getItem("resultId"));
  const hasResultId = Number.isInteger(resultId) && resultId > 0;

  const {
    data: passport,
    isPending,
    error,
  } = useQuery({
    queryKey: ["passport", resultId],
    queryFn: () => getPassport(resultId),
    enabled: hasResultId,
  });

  const { data: discoveries = [] } = useQuery({
    queryKey: ["discoveries", resultId],
    queryFn: () => getDiscoveries(resultId),
    enabled: hasResultId,
  });

  const { data: testResult } = useQuery({
    queryKey: ["testResult", resultId],
    queryFn: () => getTestResult(resultId),
    enabled: hasResultId,
  });

  const handleDiscoveryClick = async (house: HouseType) => {
    if (loadingHouse) return;

    setLoadingHouse(house);
    setDiscoveryError("");

    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["discovery", resultId, house],
        queryFn: () => getDiscoveryByHouse(resultId, house),
        staleTime: 1000 * 60 * 5,
      });

      const discovery = discoveries.find(
        (item) => item.house === house,
      );

      navigate(`/mission/${house.toLowerCase()}/result`, {
        state: {
          photoDataUrl: discovery?.photoDataUrl,
          styleResult: result,
        },
      });
    } catch {
      setDiscoveryError("디스커버리 정보를 불러오지 못했습니다.");
    } finally {
      setLoadingHouse(null);
    }
  };

  if (!hasResultId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white px-6">
        <p className="text-sm text-mcm-desc">
          진단 결과 정보를 찾을 수 없습니다.
        </p>
      </main>
    );
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white">
        <p className="text-sm text-mcm-secondary">
          패스포트를 불러오는 중입니다.
        </p>
      </main>
    );
  }

  if (error || !passport) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white px-6">
        <p className="text-sm text-mcm-desc">
          패스포트를 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  const visitedZones = passport.zones
    .filter((zone) => zone.visited)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-mcm-white pb-24">
      <div className="px-6 pt-6">
        <p className="text-xs font-semibold text-mcm-secondary">
          MCM HOUSE
        </p>

        <h1 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-mcm-black">
          MY PASSPORT
        </h1>

        <section className="mt-2">
          <h2 className="text-[15px] font-semibold text-mcm-desc">
            HOUSES STAMPS
          </h2>

          <div className="mt-1 grid grid-cols-2 gap-3">
            {passport.zones.map((zone) => {
              const isResultHouse =
                zone.house === testResult?.primaryHouse.key;

              return (
                <button
                  key={zone.house}
                  type="button"
                  onClick={() =>
                    navigate(`/test/result/${resultId}`)
                  }
                  disabled={!isResultHouse}
                  className={`flex h-[98px] w-full flex-col justify-between border border-mcm-border p-3 text-left ${
                    zone.visited
                      ? "bg-mcm-black text-mcm-white"
                      : "bg-mcm-card-bg text-mcm-black"
                  }`}
                >
                  <div className="flex w-full items-start justify-between">
                    <span
                      className={`text-[11px] ${
                        zone.visited
                          ? "text-mcm-white"
                          : "text-mcm-secondary"
                      }`}
                    >
                      {houseNumbers[zone.house]}
                    </span>

                    {zone.visited ? (
                      <img
                        src="/icons/check.svg"
                        alt=""
                        className="h-4 w-3"
                      />
                    ) : (
                      <span className="flex h-4 w-4 items-center justify-center text-[11px]">
                        ?
                      </span>
                    )}
                  </div>

                  <p className="text-[13px] font-semibold">
                    {zone.house}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-xs font-semibold text-mcm-secondary">
            MY DISCOVERY ARCHIVE
          </h2>

          <div className="mx-auto mt-4 grid w-full max-w-[300px] grid-cols-2 gap-2">
            {discoveries.map((discovery) => (
              <button
                key={discovery.discoveryId}
                type="button"
                onClick={() => handleDiscoveryClick(discovery.house)}
                disabled={loadingHouse !== null}
                className="border border-mcm-border bg-mcm-card-bg text-left disabled:cursor-default"
              >
                <div className="relative">
                  <img
                    src={discovery.photoDataUrl}
                    alt={`${discovery.house} discovery`}
                    className="aspect-[4/3] w-full object-cover"
                  />

                  {loadingHouse === discovery.house && (
                    <div className="absolute inset-0 flex items-center justify-center bg-mcm-white/70">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-mcm-border border-t-mcm-black" />
                    </div>
                  )}
                </div>

                <div className="px-2 py-2">
                  <p className="text-[12px] font-semibold text-mcm-secondary">
                    {houseNumbers[discovery.house]} / {discovery.house}
                  </p>

                  <p className="mt-1 text-[13px] font-semibold text-mcm-black">
                    {discovery.styleTitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {discoveryError && (
            <p className="mt-3 text-center text-xs text-mcm-desc">
              {discoveryError}
            </p>
          )}
        </section>

        <section className="mt-7 border-t border-mcm-border pt-5">
          <h2 className="text-xs font-semibold text-mcm-secondary">
            MY ROUTE
          </h2>

          <div className="mt-3">
            {visitedZones.map((zone, index) => (
              <div
                key={zone.house}
                className="relative flex h-10 items-start"
              >
                {index < visitedZones.length - 1 && (
                  <span className="absolute left-[3px] top-5 h-5 border-l border-mcm-secondary" />
                )}

                <span className="relative z-10 mt-1.5 h-[8px] w-[8px] shrink-0 rounded-full bg-mcm-black" />

                <p className="ml-3 w-[72px] text-[13px] font-semibold text-mcm-black">
                  {zone.house}
                </p>

                {zone.visitedAt && (
                  <p className="text-[12px] font-semibold text-mcm-secondary">
                    {formatVisitedAt(zone.visitedAt)}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate("/mission")}
            className="mt-0.5 flex h-13 w-full items-center justify-center border border-mcm-black text-[14px] font-semibold text-mcm-black"
          >
            <span className="flex translate-x-2.5 items-center">
              VIEW ALL MISSIONS

              <img
                src="/icons/chevron-right.svg"
                alt=""
                className="ml-1 h-7 w-7 -translate-y-0.5"
              />
            </span>
          </button>
        </section>
      </div>

      <TabBar />
    </main>
  );
}