import { MessagesPanel } from "./MessagesPanel";

export function BrandMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages & Communication</h1>
        <p className="text-muted-foreground">Communicate with creators and manage collaboration discussions</p>
      </div>
      <div className="min-h-[600px]">
        <MessagesPanel />
      </div>
    </div>
  );
}