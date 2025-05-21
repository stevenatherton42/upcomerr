
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, UserPlus, Trash2 } from "lucide-react";

export function UserManagement() {
  const { users, addUser, deleteUser, currentUser } = useAuth();
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    setError("");

    if (newUser.username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (newUser.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const success = await addUser(newUser);
      if (success) {
        setNewUser({
          username: "",
          password: "",
          isAdmin: false,
        });
        setDialogOpen(false);
      }
    } catch (err) {
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
  };

  return (
    <Card className="bg-jellyseerr-card border-jellyseerr-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage users who can access Upcomerr
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-jellyseerr-card border-jellyseerr-border">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. The user will need to change their
                  password on first login.
                </DialogDescription>
              </DialogHeader>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-md text-red-50 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="bg-jellyseerr-background border-jellyseerr-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="bg-jellyseerr-background border-jellyseerr-border"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="admin"
                    checked={newUser.isAdmin}
                    onCheckedChange={(checked) =>
                      setNewUser((prev) => ({ ...prev, isAdmin: checked }))
                    }
                  />
                  <Label htmlFor="admin">Admin privileges</Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={handleAddUser}>
                  {loading ? "Creating..." : "Create User"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <User className="h-4 w-4 text-jellyseerr-muted" />
                </TableCell>
                <TableCell className="font-medium">
                  {user.username}
                  {currentUser?.id === user.id && (
                    <span className="ml-2 text-xs text-jellyseerr-muted">
                      (You)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900/20 text-red-400">
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900/20 text-blue-400">
                      User
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {currentUser?.id !== user.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <div className="text-center py-8 text-jellyseerr-muted">
            No users found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
