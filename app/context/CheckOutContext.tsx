"use client";
import { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { getShortAddress } from "./utils/geocode";
import { useRouter } from "next/navigation";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image?: string;
  qty?: number;
};

export type Address = {
  id?: number;
  label: string;
  details?: string;
  phone?: string;
  coordinates?: { lat: number; lng: number };
  short_address?: string;
};

type CheckoutContextType = {
  cart: CartItem[];
  total: number;
  addToCart: (product: Omit<CartItem, "qty">, deltaQty: number) => void;
  updateItemQty: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  selectedAddress: Address | "current" | null;
  setSelectedAddress: (addr: Address | "current") => void;
  currentAddress: Address;
  setCurrentAddress: (addr: Address) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  placeOrder: () => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | "current" | null>(null);
  const [currentAddress, setCurrentAddress] = useState<Address>({
    label: "Current Location",
    details: "",
    phone: "",
    coordinates: { lat: 0, lng: 0 },
  });
  const [paymentMethod, setPaymentMethod] = useState("QR");

  // CART METHODS
  const recalcTotal = (items: CartItem[]) => items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const addToCart = (product: Omit<CartItem, "qty">, deltaQty: number) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx === -1 && deltaQty > 0) {
        const newItems = [...prev, { ...product, qty: deltaQty }];
        setTotal(recalcTotal(newItems));
        return newItems;
      }
      if (idx === -1) return prev;

      const existing = prev[idx];
      const newQty = existing.qty + deltaQty;
      if (newQty <= 0) {
        const newItems = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        setTotal(recalcTotal(newItems));
        return newItems;
      }

      const updated = { ...existing, qty: newQty };
      const newItems = [...prev.slice(0, idx), updated, ...prev.slice(idx + 1)];
      setTotal(recalcTotal(newItems));
      return newItems;
    });
  };

  const updateItemQty = (id: number, qty: number) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if (idx === -1) return prev;
      if (qty <= 0) {
        const newItems = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        setTotal(recalcTotal(newItems));
        return newItems;
      }
      const updated = { ...prev[idx], qty };
      const newItems = [...prev.slice(0, idx), updated, ...prev.slice(idx + 1)];
      setTotal(recalcTotal(newItems));
      return newItems;
    });
  };

  const removeItem = (id: number) => {
    setCart(prev => {
      const newItems = prev.filter(i => i.id !== id);
      setTotal(recalcTotal(newItems));
      return newItems;
    });
  };

  // PLACE ORDER
  const placeOrder = async () => {
    let addressToSend: Address | null = null;

    if (selectedAddress === "current") {
      if (!currentAddress.coordinates) {
        toast.error("Current address coordinates not set!");
        return;
      }

      // Get short address using Google API
      const short_address = await getShortAddress(
        currentAddress.coordinates.lat,
        currentAddress.coordinates.lng
      );

      addressToSend = { ...currentAddress, short_address };
    } else {
      addressToSend = selectedAddress as Address;
    }

    if (!addressToSend || cart.length === 0) {
      toast.error("Cart is empty or no address selected!");
      return;
    }

    const payload = {
      api_user_id: user?.id,
      saved_address_id: selectedAddress !== "current" ? addressToSend.id : undefined,
      address: selectedAddress === "current" ? addressToSend : undefined,
      address_type: selectedAddress === "current" ? "current" : "saved",
      paymentMethod,
      total_qty: cart.reduce((sum, item) => sum + item.qty, 0),
      total,
      items: cart.map(item => ({
        product_id: item.id,
        qty: item.qty,
        price_at_order: item.price,
        total_line: Number((item.qty * item.price).toFixed(2)),
        image_url: item.image.split("/").pop(),
      })),
    };

    console.log(payload)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/store-order`,
        payload,
        { withCredentials: true, headers: { Accept: "application/json" } }
      );

      if (res.data?.success) {
        toast.success("Order placed successfully!");

        const telegram_start_link = res.data.telegram_start_link;

        // Redirect to success page + pass Telegram link
        router.push(`/checkout/order-success?telegram=${encodeURIComponent(telegram_start_link)}`);
      }


    } catch (err: any) {
      if (err.response) {
        console.error("❌ API ERROR:", err.response.data);
        toast.error(err.response.data.message || "Order failed.");
      } else {
        console.error("🔥 NETWORK ERROR:", err);
        toast.error("Network error. Please try again.");
      }
    }
  };



  return (
    <CheckoutContext.Provider
      value={{
        cart,
        total,
        addToCart,
        updateItemQty,
        removeItem,
        selectedAddress,
        setSelectedAddress,
        currentAddress,
        setCurrentAddress,
        paymentMethod,
        setPaymentMethod,
        placeOrder,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
  return context;
};
