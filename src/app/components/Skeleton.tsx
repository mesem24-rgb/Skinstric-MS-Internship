export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function ResultsSkeleton() {
  return (
    <div className="results-skeleton">
      <SkeletonBlock className="skeleton-title" />
      <SkeletonBlock className="skeleton-card" />
      <SkeletonBlock className="skeleton-card" />
      <SkeletonBlock className="skeleton-card" />
      <SkeletonBlock className="skeleton-wide" />
      <SkeletonBlock className="skeleton-wide" />
      <SkeletonBlock className="skeleton-wide" />
    </div>
  );
}