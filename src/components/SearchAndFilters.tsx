import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';
import { UserFilters } from '@/types/user';

interface SearchAndFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ filters, onFiltersChange }) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value, page: 1 })}
            className="pl-10"
            aria-label="Search users"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2 sm:w-48">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={filters.status}
            onValueChange={(value: 'all' | 'active' | 'disabled') => 
              onFiltersChange({ status: value, page: 1 })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};