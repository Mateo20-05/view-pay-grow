import { MessagesPanel } from "./MessagesPanel";

export function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages & Notifications</h1>
        <p className="text-muted-foreground">Communicate with brands and manage your notifications</p>
      </div>
      <div className="min-h-[600px]">
        <MessagesPanel />
      </div>
    </div>
  );
}