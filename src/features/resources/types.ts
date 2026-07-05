export type ResourceType = "pdf" | "slides" | "link" | "video";

export interface Resource {
  id: string;
  title: string;
  course: string;
  type: ResourceType;
  addedAt: string;
}
