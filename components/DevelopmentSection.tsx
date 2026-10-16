import type { Dictionary } from "@/lib/i18n";
import { DevelopmentProcess } from "./DevelopmentProcess";

export function DevelopmentSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="approach" aria-label={dict.process.title} className="relative border-t border-line py-20 md:py-28 lg:py-32">
      <div className="container-x">
        <DevelopmentProcess title={dict.process.title} steps={dict.process.steps} notes={dict.process.notes} />
      </div>
    </section>
  );
}
