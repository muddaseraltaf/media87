type AmbientOrbitProps = {
  className?: string;
};

export function AmbientOrbit({ className = "" }: AmbientOrbitProps) {
  return (
    <div
      className={`ambient-orbit${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <span className="ambient-orbit-ring ambient-orbit-ring-a">
        <i />
      </span>
      <span className="ambient-orbit-ring ambient-orbit-ring-b">
        <i />
      </span>
      <span className="ambient-orbit-core" />
    </div>
  );
}
