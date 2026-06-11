export default function DashboardLoading() {
  return (
    <section className="max-w-[1160px] mx-auto px-6 sm:px-14 pt-12 pb-[72px] flex flex-col gap-[22px]">
      <div className="h-[70px] rounded-2xl bg-line-soft animate-pulse" />
      <div className="h-12 w-2/5 rounded-xl bg-line-soft animate-pulse mt-2.5" />
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-[18px] items-start">
        <div className="flex flex-col gap-[18px]">
          <div className="h-[230px] rounded-[20px] bg-line-soft animate-pulse" />
          <div className="h-[420px] rounded-[20px] bg-line-soft animate-pulse" />
        </div>
        <div className="flex flex-col gap-[18px]">
          <div className="h-[260px] rounded-[20px] bg-line-soft animate-pulse" />
          <div className="h-[160px] rounded-[20px] bg-line-soft animate-pulse" />
          <div className="h-[300px] rounded-[20px] bg-line-soft animate-pulse" />
        </div>
      </div>
    </section>
  );
}
