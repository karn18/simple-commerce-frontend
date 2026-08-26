"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { readCookie, writeCookie } from "@/app/actions/cookieAction";
import { addItemToCart } from "@/app/api/cart";
import type { CartItem } from "@/types/cart";
import type { User } from "@/types/user";

interface AppContextValue {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  clearCart: () => void;
}

const TOKEN_COOKIE_NAME = "token";
const CART_STORAGE_KEY = "cart";

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    const savedToken = readCookie(TOKEN_COOKIE_NAME);

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch {
      // ignore corrupt data
    }
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    writeCookie(TOKEN_COOKIE_NAME, token);
  }, [token]);

  useEffect(() => {
    if (!cartLoaded) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, cartLoaded]);

  const addToCart = useCallback(
    async (item: CartItem): Promise<void> => {
      const quantity = Math.max(1, item.quantity);

      await addItemToCart({
        token,
        product: Number(item.id),
        quantity,
      });

      setCart((current) => {
        const existing = current.find((entry) => entry.id === item.id);
        if (existing) {
          return current.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  quantity: entry.quantity + quantity,
                }
              : entry,
          );
        }
        return [...current, { ...item, quantity }];
      });
    },
    [token],
  );

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      token,
      user,
      setToken,
      setUser,
      cart,
      addToCart,
      clearCart,
    }),
    [token, user, addToCart, clearCart, cart],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
