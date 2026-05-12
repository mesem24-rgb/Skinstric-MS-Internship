export function PageSkeleton() {
  return (
    <div className="page-skeleton">
      <div className="skeleton skeleton-heading" />
      <div className="skeleton skeleton-diamond" />
      <div className="skeleton skeleton-button-row" />
    </div>
  );
}

export function ImageSkeleton() {
  return <div className="skeleton image-skeleton" />;
}

export function DemographicsSkeleton() {
  return (
    <div className="demo-content demo-content--skeleton">
      <div className="skeleton demo-tabs-skeleton" />
      <div className="skeleton demo-main-skeleton" />
      <div className="skeleton demo-score-skeleton" />
    </div>
  );
}