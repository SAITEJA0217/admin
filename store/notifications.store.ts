import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "moderation"
  | "verification"
  | "security";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  meta?: Record<string, unknown>;
}

interface NotificationsState {
  notifications: AppNotification[];
  unreadCount: number;
  // Actions
  addNotification: (
    notif: Omit<AppNotification, "id" | "timestamp" | "read">
  ) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useNotificationsStore = create<NotificationsState>()((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notif) => {
    const newNotif: AppNotification = {
      ...notif,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    };
    set((s) => ({
      notifications: [newNotif, ...s.notifications].slice(0, 50), // cap at 50
      unreadCount: s.unreadCount + 1,
    }));
  },

  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),

  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  removeNotification: (id) =>
    set((s) => {
      const notif = s.notifications.find((n) => n.id === id);
      return {
        notifications: s.notifications.filter((n) => n.id !== id),
        unreadCount: notif?.read ? s.unreadCount : Math.max(0, s.unreadCount - 1),
      };
    }),

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
