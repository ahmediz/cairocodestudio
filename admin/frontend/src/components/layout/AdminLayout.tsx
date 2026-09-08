import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FolderKanban,
  Users,
  MessageSquareQuote,
  Inbox,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminLayout() {
  const navItems = [
    {
      label: "Projects",
      to: "/projects",
      icon: FolderKanban,
      description: "Our Portfolio",
    },
    {
      label: "Testimonials",
      to: "/testimonials",
      icon: MessageSquareQuote,
      description: "Trusted Clients",
    },
    {
      label: "Clients",
      to: "/clients",
      icon: Users,
      description: "Client Logos",
    },
    {
      label: "Inquiries",
      to: "/inquiries",
      icon: Inbox,
      description: "Contact & Leads",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white flex flex-col shrink-0">
        <div className="p-5 border-b flex flex-col gap-2">
          <Link to="/" className="block">
            <img
              src="/logo-dark.svg"
              alt="Cairo Code Studio"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <div className="flex-1">
                  <div>{item.label}</div>
                  <div className="text-[10px] opacity-80">
                    {item.description}
                  </div>
                </div>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-600 hover:text-primary transition-colors rounded-md hover:bg-gray-50 border border-dashed"
          >
            <span>View Public Website</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8">
          <h1 className="text-sm font-medium text-muted-foreground">
            Cairo Code Studio Management Console
          </h1>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
