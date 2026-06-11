export default function RoadmapLoading() {
  return (
    <section className="max-w-[1160px] mx-auto px-6 sm:px-14 pt-14 pb-[72px] flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-10 items-end">
        <div className="flex flex-col gap-3.5">
          <div className="h-4 w-48 rounded-full bg-line-soft animate-pulse" />
          <div className="h-14 w-4/5 rounded-xl bg-line-soft animate-pulse" />
          <div className="h-12 w-3/5 rounded-xl bg-line-soft animate-pulse" />
        </div>
        <div className="h-[180px] rounded-[18px] bg-line-soft animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-16 pt-8">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`w-[68px] h-[68px] rounded-full bg-line-soft animate-pulse ${
              i % 2 === 0 ? "-translate-x-32" : "translate-x-32"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
