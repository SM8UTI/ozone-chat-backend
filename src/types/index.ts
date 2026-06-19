// Enclosure types
export type FrameType = "frameless" | "semi-framed" | "framed";
export type DoorMechanism = "swing" | "sliding" | "slide-fold";
export type PriceTier = "budget" | "mid-range" | "premium" | "luxury";
export type MaintenanceLevel = "easy" | "moderate";
export type SpaceRequirement = "space-saving" | "needs-clearance" | "flexible";
export type LayoutConfig =
  | "linear-180"
  | "corner-90"
  | "135-degree"
  | "t-type"
  | "c-type";

export interface Enclosure {
  id: string;
  name: string;
  series: string;
  frameType: FrameType;
  doorMechanism: DoorMechanism;
  material: string;
  layouts: LayoutConfig[];
  colors: string[];
  sizes: string[];
  features: string[];
  specifications: Record<string, string>;
  usps: string[];
  applications: string[];
  priceTier: PriceTier;
  idealFor: string[];
  maintenanceLevel: MaintenanceLevel;
  spaceRequirement: SpaceRequirement;
  description: string;
  stamperUrl: string;
  catalogUrl: string;
}

// Fitting types
export type FittingCategory =
  | "hinges"
  | "connectors"
  | "handles"
  | "knobs"
  | "support"
  | "sealing"
  | "accessories";

export interface Fitting {
  id: string;
  name: string;
  category: FittingCategory;
  tier: PriceTier;
  compatibleWith: string[];
  colors: string[];
  description: string;
  stamperUrl: string;
}

// Chat / AI types
export type Persona = "homeowner" | "architect" | "dealer" | "internal_team";

export type AnswerType =
  | "open_ended_question"
  | "multiple_choice_question"
  | "summary"
  | "recommendation";

export interface Question {
  text: string;
  options: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
  result?: unknown;
}

// Tool argument types
export interface ShowEnclosuresArgs {
  enclosureIds: string[];
}

export interface ShowFittingsArgs {
  fittingIds: string[];
}

export interface CompleteSolutionArgs {
  enclosureId: string;
  fittingIds: string[];
  notes?: string;
}

export interface CompareProductsArgs {
  enclosureIds: string[];
}

export interface BudgetEstimateArgs {
  enclosureId: string;
  fittingIds: string[];
  bathroomSize?: string;
}

export interface BookConsultationArgs {
  productInterest?: string;
  persona: Persona;
}

export interface DownloadCatalogArgs {
  catalogType:
    | "shower-enclosures"
    | "complete-shower-solutions"
    | "glass-fittings";
}
