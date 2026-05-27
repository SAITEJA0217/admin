import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalType =
  | "confirm_delete"
  | "confirm_suspend"
  | "confirm_cancel"
  | "user_detail"
  | "verification_detail"
  | "report_detail"
  | "create_badge"
  | "edit_badge"
  | "create_club"
  | "edit_club"
  | "ticket_detail"
  | "keyboard_shortcuts"
  | null;

interface UiState {
  // Sidebar
  sidebarOpen: boolean;
  // Command Palette
  commandPaletteOpen: boolean;
  // Modal
  activeModal: ModalType;
  modalData: unknown;
  // Drawer (slide-out panel)
  drawerOpen: boolean;
  drawerData: unknown;
  drawerType: string | null;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  openModal: (type: ModalType, data?: unknown) => void;
  closeModal: () => void;
  openDrawer: (type: string, data?: unknown) => void;
  closeDrawer: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useUiStore = create<UiState>()((set) => ({
  sidebarOpen: false,
  commandPaletteOpen: false,
  activeModal: null,
  modalData: null,
  drawerOpen: false,
  drawerData: null,
  drawerType: null,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleCommandPalette: () =>
    set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  openModal: (type, data = null) =>
    set({ activeModal: type, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  openDrawer: (type, data = null) =>
    set({ drawerOpen: true, drawerType: type, drawerData: data }),
  closeDrawer: () =>
    set({ drawerOpen: false, drawerType: null, drawerData: null }),
}));
