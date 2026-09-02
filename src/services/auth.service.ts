import type {
  AuthCredentials,
  RegisterPayload,
  User,
} from "@/types";

/**
 * Auth service — placeholder until a real authentication backend is connected.
 *
 * The previous implementation accepted ANY credentials and returned a fake
 * session, which presented unauthenticated users with a fake "account".
 * That behavior is disabled: these methods now throw so the UI can honestly
 * tell customers that accounts are not available yet.
 *
 * To connect a real backend:
 *  - point these methods at your auth API (e.g. /wp-json/jwt-auth/v1/token)
 *  - store tokens server-side or in httpOnly cookies
 *  - never fabricate sessions client-side.
 */
export const authService = {
  async login(
    credentials: AuthCredentials
  ): Promise<{ user: User; token: string }> {
    void credentials; // No backend connected yet.
    throw new Error(
      "Accounts are coming soon. Please continue as a guest — your cart is saved on this device."
    );
  },

  async register(
    payload: RegisterPayload
  ): Promise<{ user: User; token: string }> {
    void payload; // No backend connected yet.
    throw new Error(
      "Accounts are coming soon. Please continue as a guest — your cart is saved on this device."
    );
  },

  async logout(): Promise<void> {
    // No server session exists; nothing to invalidate.
  },

  async me(token: string | null): Promise<User | null> {
    void token; // No backend connected yet: never fabricate a user.
    return null;
  },
};
