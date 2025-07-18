import React, { useState, useEffect, useCallback } from 'react';
import { User, UserFilters, ApiResponse } from '@/types/user';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { UserTable } from '@/components/UserTable';
import { UserDetailDrawer } from '@/components/UserDetailDrawer';
import { Pagination } from '@/components/Pagination';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, Users, RefreshCw, AlertCircle } from 'lucide-react';
import { mockApiService } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';

export const IAMDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    status: 'all',
    page: 1,
    limit: 10
  });

  const { toast } = useToast();

  const fetchUsers = useCallback(async (currentFilters: UserFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: ApiResponse<User[]> = await mockApiService.getUsers(currentFilters);
      setUsers(response.data);
      setTotalUsers(response.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers(filters);
  }, [filters, fetchUsers]);

  const handleFiltersChange = (newFilters: Partial<UserFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleRefresh = () => {
    fetchUsers(filters);
  };

  const totalPages = Math.ceil(totalUsers / filters.limit);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">IAM Dashboard</h1>
                <p className="text-sm text-muted-foreground">Identity & Access Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{totalUsers} total users</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                aria-label="Refresh user list"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Search and Filters */}
          <SearchAndFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="ml-4"
                >
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* User Table */}
          <UserTable
            users={users}
            loading={loading}
            onUserSelect={handleUserSelect}
          />

          {/* Pagination */}
          {!loading && !error && (
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              totalItems={totalUsers}
              itemsPerPage={filters.limit}
              onPageChange={(page) => handleFiltersChange({ page })}
            />
          )}
        </div>
      </main>

      {/* User Detail Drawer */}
      <UserDetailDrawer
        user={selectedUser}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
};