import TabBar from "../components/TabBar";
import {
  mockDiscoveries,
  mockPassport,
} from "../mocks/passport";
import type { HouseType } from "../types/test";

const houseNumbers: Record<HouseType, string> = {
  LEGACY: "01",
  INSTINCT: "02",
  FREEDOM: "03",
  CURIOSITY: "04",
};

export default function PassportPage() {
  const visitedZones = mockPassport.zones
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
            {mockPassport.zones.map((zone) => (
              <div
                key={zone.house}
                className={`flex h-[98px] flex-col justify-between border border-mcm-border p-3 ${
                  zone.visited
                    ? "bg-mcm-black text-mcm-white"
                    : "bg-mcm-card-bg text-mcm-black"
                }`}
              >
                <div className="flex items-start justify-between">
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
                    <span className="flex h-4 w-4 items-center justify-center text-[11px] text-mcm-black">
                      ?
                    </span>
                  )}
                </div>

                <p className="text-[13px] font-semibold">
                  {zone.house}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-xs font-semibold text-mcm-secondary">
            MY DISCOVERY ARCHIVE
          </h2>

          <div className="mx-auto mt-4 grid w-full max-w-[300px] grid-cols-2 gap-2">
            {mockDiscoveries.map((discovery) => (
              <article
                key={discovery.discoveryId}
                className="border border-mcm-border bg-mcm-card-bg"
              >
                <img
                  src={discovery.photoDataUrl}
                  alt={`${discovery.house} discovery`}
                  className="aspect-[4/3] w-full object-cover"
                />

                <div className="px-2 py-2">
                  <p className="text-[12px] font-semibold text-mcm-secondary">
                    {houseNumbers[discovery.house]} / {discovery.house}
                  </p>

                  <p className="mt-1 text-[13px] font-semibold text-mcm-black">
                    {discovery.styleTitle}
                  </p>
                </div>
              </article>
            ))}
          </div>
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

                <p className="text-[12px] font-semibold text-mcm-secondary">
                  {zone.visitedAt}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
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