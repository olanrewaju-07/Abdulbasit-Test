import React from 'react';
import { User } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface UserTableProps {
  users: User[];
  loading: boolean;
  onUserSelect: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, loading, onUserSelect }) => {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 animate-pulse">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-1/3"></div>
              </div>
              <div className="w-20 h-6 bg-muted rounded"></div>
              <div className="w-16 h-6 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No users found</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-foreground">User</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Role & Group</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Status</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Last Login</th>
              <th className="text-right py-4 px-6 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id} 
                className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onUserSelect(user)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onUserSelect(user);
                  }
                }}
                aria-label={`View details for ${user.name}`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{user.role}</div>
                    <div className="text-sm text-muted-foreground">{user.group}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge 
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    className={user.status === 'active' 
                      ? 'bg-success text-success-foreground hover:bg-success/80' 
                      : 'bg-muted text-muted-foreground'
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-foreground">
                    {formatDistanceToNow(user.lastLogin, { addSuffix: true })}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUserSelect(user);
                    }}
                    aria-label={`View details for ${user.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};