/**
 * شريط الموظف الثابت — نفس شريط المحادثة يظهر في صفحات الموظف الأخرى
 * (التقويم وغيره) حتى لا يفقد المستخدم سياق الموظف عند التنقل.
 */
import { useNavigate } from "@tanstack/react-router";
import { BookOpenText, CalendarDays, MessageCircle, PlugZap, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Portrait } from "@/components/site/Portrait";
import { getMember } from "@/data/team";
import { cn } from "@/lib/utils";

export function EmployeeTopbar({
  memberId,
  active,
}: {
  memberId: string;
  active: "chat" | "calendar" | "guidelines";
}) {
  const member = getMember(memberId);
  const navigate = useNavigate();
  if (!member) return null;

  const goChat = () =>
    void navigate({ to: "/app/chat/$id", params: { id: member.id } });
  const goCalendar = () =>
    void navigate({
      to: "/app/calendar",
      search: { employee: member.id as "sonny" },
    });
  const goGuidelines = () =>
    void navigate({ to: "/app/guidelines/$id", params: { id: member.id } });

  return (
    <div
      className="chat-topbar-actions no-scrollbar mb-4 flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-border bg-card/80 px-2 py-2 shadow-card sm:gap-1.5"
      dir="rtl"
    >
      <div className="chat-employee-identity">
        <span className="chat-employee-avatar">
          <Portrait memberId={member.id} name={member.name} className="size-full" />
        </span>
        <span className="chat-employee-names">
          <strong>{member.name}</strong>
          <small>{member.role}</small>
        </span>
      </div>
      <div className="chat-employee-navigation" aria-label={`أدوات ${member.name}`}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn("chat-nav-button", active === "chat" && "is-active")}
          aria-label="المحادثة"
          title="المحادثة"
          onClick={goChat}
        >
          <MessageCircle className="size-4" />
          <span>المحادثة</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn("chat-nav-button", active === "calendar" && "is-active")}
          aria-label="التقويم"
          title="التقويم"
          onClick={goCalendar}
        >
          <CalendarDays className="size-4" />
          <span>التقويم</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn("chat-nav-button", active === "guidelines" && "is-active")}
          aria-label="التعليمات"
          title="التعليمات وعقل العلامة"
          onClick={goGuidelines}
        >
          <BookOpenText className="size-4" />
          <span>التعليمات</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="chat-nav-button"
          aria-label="التكاملات"
          title="تكاملات الموظف"
          onClick={() => void navigate({ to: "/app/integrations" })}
        >
          <PlugZap className="size-4" />
          <span>التكاملات</span>
        </Button>
      </div>
      <div className="chat-employee-end-actions">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="chat-nav-button"
          aria-label="الإعدادات"
          title="الإعدادات"
          onClick={() => void navigate({ to: "/app/settings" })}
        >
          <Settings2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
