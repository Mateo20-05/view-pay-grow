import { z } from "zod";

export const campaignFormSchema = z.object({
  // Basics
  title: z.string().min(1, "Title is required").max(80, "Title must be 80 characters or less"),
  brandName: z.string().min(1, "Brand name is required"),
  shortDescription: z.string().min(1, "Description is required").max(240, "Description must be 240 characters or less"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  startDate: z.date(),
  deadline: z.date(),
  isPublic: z.boolean(),
  inviteEmails: z.array(z.string().email()).optional(),

  // Payout & Budget
  payoutPer1k: z.number().min(1, "Payout must be at least $1").max(1000, "Payout cannot exceed $1000"),
  maxPayout: z.number().min(10, "Max payout must be at least $10"),
  totalBudget: z.number().min(100, "Total budget must be at least $100"),
  dailyCap: z.number().min(0),
  perCreatorCap: z.number().min(0),
  payoutCadence: z.enum(["weekly", "bi-weekly", "monthly"]),

  // Requirements
  minFollowers: z.number().min(0),
  contentFormat: z.string().optional(),
  mandatoryElements: z.array(z.string()),
  hashtags: z.array(z.string()),
  requiresApproval: z.boolean(),
  creatorSlots: z.number().min(0),

  // Do's & Don'ts
  dos: z.array(z.string()).min(1, "Add at least one 'Do'"),
  donts: z.array(z.string()).min(1, "Add at least one 'Don't'"),

  // Assets & Branding
  brandLogo: z.string().optional(),
  coverImage: z.string().optional(),
  referenceMaterials: z.array(z.string()),
  legalNote: z.string().optional(),

  // Targeting
  regions: z.array(z.string()),
  languages: z.array(z.string()),
  verifiedOnly: z.boolean(),
  applicationWindow: z.enum(["unlimited", "fixed-date", "creator-count"])
}).refine((data) => data.deadline > data.startDate, {
  message: "Deadline must be after start date",
  path: ["deadline"],
}).refine((data) => data.maxPayout <= data.totalBudget, {
  message: "Max payout cannot exceed total budget",
  path: ["maxPayout"],
});

export type CampaignFormData = z.infer<typeof campaignFormSchema>;

export const CATEGORIES = [
  "Gaming", "Tech", "Fitness", "Beauty", "Education", 
  "Lifestyle", "Entertainment", "Food", "Travel", "Music",
  "Art", "Sports", "Fashion", "Health", "Business"
];

export const PLATFORMS = [
  "YouTube", "TikTok", "Instagram", "Twitch", "Twitter", "LinkedIn"
];

export const REGIONS = [
  "United States", "Canada", "United Kingdom", "Germany", "France",
  "Australia", "Japan", "South Korea", "Brazil", "Mexico", "Global"
];

export const LANGUAGES = [
  "English", "Spanish", "French", "German", "Portuguese",
  "Japanese", "Korean", "Chinese", "Italian", "Dutch"
];