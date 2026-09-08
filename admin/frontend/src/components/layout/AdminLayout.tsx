import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FolderKanban,
  Users,
  MessageSquareQuote,
  Inbox,
  ExternalLink,
  LogOut,
  ChevronDown,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function AdminLayout() {
  const { user, logout } = useAuth();

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
    {
      label: "Settings",
      to: "/settings",
      icon: Settings,
      description: "Contact & Social",
    },
  ];

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "AD";

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white flex flex-col shrink-0">
        <div className="h-16 border-b px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/logo-dark.svg"
              alt="Cairo Code Studio"
              className="h-8 w-auto object-contain"
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

          {/* User Profile & Logout Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-xs shadow-sm ring-2 ring-primary/20">
                {userInitials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-gray-900 leading-tight">
                  {user?.name || "Admin User"}
                </span>
                <span className="text-[10px] text-gray-500 leading-tight">
                  {user?.email || "admin@cairocodestudio.com"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal p-2">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-900">
                      {user?.name || "Admin User"}
                    </p>
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4">
                      {user?.role || "ADMIN"}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">
                    {user?.email || "admin@cairocodestudio.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive gap-2 cursor-pointer font-medium text-xs"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

