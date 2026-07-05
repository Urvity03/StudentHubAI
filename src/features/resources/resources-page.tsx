import { Library } from "lucide-react";

import { ResourceIcon } from "@/features/resources/components/resource-icon";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { CardGridSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { Card, CardContent } from "@/shared/ui/card";
import { useApp } from "@/shared/providers/use-app";

export default function ResourcesPage() {
  const { resources, isLoading } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader title="Resources" description="Readings, slides, and links, organized by course." />
      {isLoading ? (
        <CardGridSkeleton count={4} className="lg:grid-cols-3" />
      ) : resources.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="cursor-pointer transition-shadow duration-[var(--duration-base)] hover:shadow-sm">
              <CardContent className="flex items-start gap-3 p-5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <ResourceIcon type={resource.type} className="size-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{resource.title}</p>
                  <p className="text-xs text-muted-foreground">{resource.course}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Added {resource.addedAt}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Library}
          title="No resources yet"
          description="Shared readings, slides, and links for your courses will show up here."
        />
      )}
    </div>
  );
}
