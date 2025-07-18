import React, { useState } from 'react';
import { User } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { X, Mail, Phone, MapPin, Calendar, Shield, Key, Loader2 } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { mockApiService } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';

interface UserDetailDrawerProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({ user, open, onClose }) => {
  const [resettingPassword, setResettingPassword] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async () => {
    if (!user) return;

    setResettingPassword(true);
    try {
      const result = await mockApiService.resetPassword(user.id);
      toast({
        title: "Password Reset Sent",
        description: result.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setResettingPassword(false);
    }
  };

  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-lg w-full p-0 overflow-y-auto">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">User Details</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {/* User Profile */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={user.status === 'active' ? 'default' : 'secondary'}
                  className={user.status === 'active' 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                >
                  {user.status}
                </Badge>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm font-medium text-foreground">{user.role}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user.phone}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user.location}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Role & Department */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Organization</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <p className="text-sm text-foreground mt-1">{user.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Group</label>
                <p className="text-sm text-foreground mt-1">{user.group}</p>
              </div>
              {user.department && (
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-sm text-foreground mt-1">{user.department}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Activity Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-muted-foreground">Last login: </span>
                  <span className="text-foreground">
                    {formatDistanceToNow(user.lastLogin, { addSuffix: true })}
                  </span>
                  <div className="text-xs text-muted-foreground mt-1">
                    {format(user.lastLogin, 'PPpp')}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-muted-foreground">Created: </span>
                  <span className="text-foreground">
                    {format(user.createdAt, 'PP')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions */}
          {user.permissions && user.permissions.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Permissions</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Actions</h3>
            <Button 
              onClick={handleResetPassword} 
              disabled={resettingPassword}
              className="w-full"
              variant="outline"
            >
              {resettingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Reset Email...
                </>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  Reset Password
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};