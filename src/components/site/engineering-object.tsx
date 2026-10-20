export function EngineeringObject() {
  return (
    <figure className="engineering-object" aria-labelledby="engineering-object-caption">
      <div className="engineering-object-meta font-mono text-[10px] text-muted">
        <span>ARCHITECTURE SPECIMEN</span>
        <span>BOUNDARIES / 01</span>
      </div>

      <div className="engineering-object-stage" aria-hidden="true">
        <div className="engineering-object-grid" />
        <div className="engineering-object-stack">
          <div className="system-plane system-plane-interface">
            <span>01 / EXPERIENCE</span>
            <i />
            <i />
            <i />
          </div>
          <div className="system-plane system-plane-application">
            <span>02 / APPLICATION</span>
            <i />
            <i />
            <i />
          </div>
          <div className="system-plane system-plane-data">
            <span>03 / DATA</span>
            <i />
            <i />
            <i />
          </div>
        </div>
        <span className="engineering-object-node engineering-object-node-one" />
        <span className="engineering-object-node engineering-object-node-two" />
      </div>

      <figcaption id="engineering-object-caption" className="engineering-object-caption">
        <span className="font-mono text-[10px] text-accent">SYSTEMS THINKING</span>
        <span className="text-sm text-muted">Clear boundaries. Useful interfaces. Reliable foundations.</span>
      </figcaption>
    </figure>
  );
}