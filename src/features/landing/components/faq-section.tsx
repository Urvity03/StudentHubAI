import {
  Accordion,
} from "@/features/landing/components/accordion";

const FAQS = [
  {
    question: "Is StudentHubAI free to use?",
    answer:
      "Yes — the core features (notes, assignments, timetable, and CGPA tracking) are free. AI study assistant usage has a generous free monthly allowance.",
  },
  {
    question: "Can I import my existing timetable and courses?",
    answer:
      "Yes, once you're signed up you can add courses manually or import them; a bulk-import option is on the roadmap.",
  },
  {
    question: "Does the AI assistant see my actual notes and assignments?",
    answer:
      "Yes — that's the point. It's grounded in your own course material, not just generic answers, so responses are specific to what you're actually studying.",
  },
  {
    question: "Which universities is this designed for?",
    answer:
      "StudentHubAI isn't tied to one institution's systems — the timetable, grading, and CGPA tools are flexible enough to match most universities' structures.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your notes and academic data are yours and are never shared with other students or used to train models without your consent.",
  },
];

export function FaqSection() {
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion items={FAQS} className="mt-10" />
      </div>
    </section>
  );
}
