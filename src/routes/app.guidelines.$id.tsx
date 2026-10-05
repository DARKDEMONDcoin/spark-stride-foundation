import { createFileRoute, notFound } from "@tanstack/react-router";
import { BookOpenText } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { EmployeeGuidelines } from "@/components/app/EmployeeGuidelines";
import { EmployeeTopbar } from "@/components/app/EmployeeTopbar";
import { getMember } from "@/data/team";
import { useWorkspace } from "@/lib/data";

export const Route = createFileRoute("/app/guidelines/$id")({
  loader: ({ params }) => {
    const member = getMember(params.id);
    if (!member) throw notFound();
    return { name: member.name, role: member.role };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `تعليمات ${loaderData.name} | سهل` : "تعليمات الموظف | سهل" },
      { name: "description", content: loaderData ? `خصّص تعليمات ${loaderData.name} وتفضيلاته لكل مهمة.` : "خصّص تعليمات موظفك الرقمي لكل مهمة." },
      { property: "og:title", content: loaderData ? `تعليمات ${loaderData.name} | سهل` : "تعليمات الموظف | سهل" },
      { property: "og:description", content: loaderData ? `خصّص تعليمات ${loaderData.name} وتفضيلاته لكل مهمة.` : "خصّص تعليمات موظفك الرقمي لكل مهمة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeGuidelinesPage,
});

function EmployeeGuidelinesPage() {
  const { id } = Route.useParams();
  const member = getMember(id);
  const { data: workspace } = useWorkspace();
  if (!member) return null;

  return (
    <AppShell title={`تعليمات ${member.name}`} lead={`التفضيلات المتخصصة التي يطبقها ${member.name} تلقائياً في كل طلب مناسب.`}>
      <EmployeeTopbar memberId={member.id} active="guidelines" />
      <main className="mx-auto w-full max-w-3xl" dir="rtl">
        <section className="rounded-lg border border-border bg-card p-4 shadow-card sm:p-6">
          <header className="mb-5 flex items-start gap-3 border-b border-border pb-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><BookOpenText className="size-5" /></span>
            <div className="min-w-0">
              <h1 className="font-display text-lg font-black">تعليمات {member.name}</h1>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">اكتب تفضيلاتك مرة واحدة، وسيطبقها تلقائياً في كل طلب مناسب.</p>
            </div>
          </header>
          <EmployeeGuidelines {...(workspace?.id ? { workspaceId: workspace.id } : {})} employeeId={member.id} employeeName={member.name} />
        </section>
      </main>
    </AppShell>
  );
}