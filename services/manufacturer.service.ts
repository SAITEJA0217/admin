// services/manufacturer.service.ts

import { api } from "@/lib/api";

export interface ManufacturerProfile {
  id: string;
  companyName: string;
  location: string;
  capabilities: string[];
  minimumOrderQuantity: number;
  rating: number;
  description: string;
  certification: string[];
  leadTime: string;
}

export interface ManufacturersResponse {
  success: boolean;
  data: ManufacturerProfile[];
}

// --- TEMPORARY DUMMY DATA MATRIX ---
const MOCK_MANUFACTURERS: ManufacturerProfile[] = [
  {
    id: "m-01",
    companyName: "Apex Electronics Labs",
    location: "Bengaluru, India",
    capabilities: ["PCB Assembly", "SMT Placement", "Rigid-Flex Boards", "IoT Prototyping"],
    minimumOrderQuantity: 100,
    rating: 4.8,
    description: "High-precision electronic manufacturing services specializing in multi-layer PCB assembly, surface-mount technology (SMT), and rapid hardware prototyping for connected devices.",
    certification: ["ISO 9001", "RoHS Compliant", "IPC-A-610"],
    leadTime: "2-3 Weeks"
  },
  {
    id: "m-02",
    companyName: "Matrix Injection Molding",
    location: "Pune, Maharashtra",
    capabilities: ["Plastic Molding", "Enclosure Design", "CNC Milling", "3D Printing"],
    minimumOrderQuantity: 500,
    rating: 4.6,
    description: "Production-grade custom enclosure tooling and injection molding specialists. Offering end-to-end support from raw CAD mechanical designs to final surface texturing.",
    certification: ["ISO 9001", "ISO 13485 (Medical)"],
    leadTime: "4-5 Weeks"
  },
  {
    id: "m-03",
    companyName: "Titan CNC & Precision Milling",
    location: "Chennai, Tamil Nadu",
    capabilities: ["Laser Cutting", "Sheet Metal", "Aluminium Anodizing", "Stamping"],
    minimumOrderQuantity: 50,
    rating: 4.9,
    description: "Premium heavy-duty milling, sheet metal fabrication, and metal stamping shop. Equipped with 5-axis CNC routers built for clean tolerances in aerospace and structural enclosures.",
    certification: ["AS9100D", "ISO 14001"],
    leadTime: "1-2 Weeks"
  }
];

/**
 * Fetches the global registry list of verified manufacturers.
 */
export async function getManufacturers(): Promise<ManufacturersResponse> {
  // TODO: Toggle this comment block once your backend API route goes active!
  // return api<ManufacturersResponse>("/manufacturers", { method: "GET" });

  // Return dummy data instantly for frontend wireframing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: MOCK_MANUFACTURERS });
    }, 400); // 400ms delay to simulate loading animations nicely
  });
}

/**
 * Fetches a single manufacturer's complete information profile by its unique ID string.
 */
export async function getManufacturerById(id: string): Promise<ManufacturerProfile | null> {
  // TODO: Toggle this once database API paths go active:
  // return api<ManufacturerProfile>(`/manufacturers/${id}`, { method: "GET" });

  return new Promise((resolve) => {
    const profile = MOCK_MANUFACTURERS.find((m) => m.id === id) || null;
    resolve(profile);
  });
}
