
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserCredentials } from "@/types";
import { mockUsers } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  login: (credentials: UserCredentials) => Promise<{ success: boolean; needsPasswordChange?: boolean }>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  addUser: (user: { username: string; password: string; isAdmin: boolean }) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  users: User[];
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<any[]>(mockUsers);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser({
          id: parsedUser.id,
          username: parsedUser.username,
          isAdmin: parsedUser.isAdmin
        });
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: UserCredentials) => {
    // In a real app, this would be an API call
    const user = users.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );
    
    if (user) {
      const userToSave = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      };
      setCurrentUser(userToSave);
      localStorage.setItem('currentUser', JSON.stringify(userToSave));
      
      return { 
        success: true, 
        needsPasswordChange: user.needsPasswordChange 
      };
    }
    
    toast({
      title: "Authentication failed",
      description: "Invalid username or password",
      variant: "destructive",
    });
    return { success: false };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    if (!currentUser) return false;
    
    // Find the user and verify old password
    const userIndex = users.findIndex(u => 
      u.id === currentUser.id && 
      u.password === oldPassword
    );
    
    if (userIndex === -1) {
      toast({
        title: "Password change failed",
        description: "Current password is incorrect",
        variant: "destructive",
      });
      return false;
    }
    
    // Update password
    const updatedUsers = [...users];
    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: newPassword,
      needsPasswordChange: false
    };
    
    setUsers(updatedUsers);
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully",
    });
    return true;
  };

  const addUser = async (user: { username: string; password: string; isAdmin: boolean }) => {
    // Check if username already exists
    if (users.some(u => u.username === user.username)) {
      toast({
        title: "User creation failed",
        description: "Username already exists",
        variant: "destructive",
      });
      return false;
    }
    
    const newUser = {
      id: (Math.random() * 10000).toFixed(0),
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin,
      needsPasswordChange: true
    };
    
    setUsers(prev => [...prev, newUser]);
    toast({
      title: "User created",
      description: `User ${user.username} has been created successfully`,
    });
    return true;
  };

  const deleteUser = async (userId: string) => {
    // Prevent deleting the current user
    if (currentUser?.id === userId) {
      toast({
        title: "User deletion failed",
        description: "You cannot delete your own account",
        variant: "destructive",
      });
      return false;
    }
    
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast({
      title: "User deleted",
      description: "User has been deleted successfully",
    });
    return true;
  };

  const value = {
    currentUser,
    login,
    logout,
    changePassword,
    addUser,
    deleteUser,
    users: users.map(u => ({
      id: u.id,
      username: u.username,
      isAdmin: u.isAdmin
    })),
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
