import type { PublicExperience } from "@/lib/queries";
import { toDateLabel } from "@/lib/utils";

export function ExperienceTimeline({ experience }: { experience: PublicExperience[] }) {
  return (
    <ol className="experience-timeline">
      {experience.map((item) => (
        <li key={item.id} className="experience-entry">
          <p className="font-mono text-metadata text-muted">
            {toDateLabel(item.startDate)} <span aria-hidden="true">/</span> {item.current ? "Present" : toDateLabel(item.endDate)}
          </p>
          <div>
            <h3 className="text-subheading font-medium text-copy">{item.role}</h3>
            <p className="mt-1 text-body-small text-muted">
              {item.company}{item.location ? `, ${item.location}` : ""}
            </p>
            <p className="copy-measure mt-4 text-body text-muted">{item.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
