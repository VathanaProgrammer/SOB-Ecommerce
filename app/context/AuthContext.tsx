"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import api from "@/api/api";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  phone?: string | null;
  image_url?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router  = useRouter();

  // Fetch user on mount
  useEffect(() => {
    api
      .get<User>("/user", { withCredentials: true })
      .then((res) => {
        console.log("Fetched user:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("Failed to fetch user:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Login function
  const login = async (phone: string, username: string) => {
    const res1 = await api.post(
      "/login",
      { phone, username },
      { withCredentials: true }
    );
    console.log("Login response:", res1.data);
    if (res1.data.sucess) {
      router.push('/');
      // after cookie set, fetch user info
      const res2 = await api.get<User>("/user", { withCredentials: true });
      setUser(res2.data);
      
    }
  };
  console.log("AuthContext user:", user);

  const logout = async () => {
    const res = await api.post("/logout", {}, { withCredentials: true });
    if(res.data.sucess){
      router.push('/sign-in')
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};
