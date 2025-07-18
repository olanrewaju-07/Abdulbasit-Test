import { User, ApiResponse, UserFilters } from '@/types/user';

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    role: 'Administrator',
    group: 'IT Security',
    status: 'active',
    lastLogin: new Date('2024-07-17T14:30:00'),
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    department: 'Information Technology',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    permissions: ['user.read', 'user.write', 'user.delete', 'admin.access'],
    createdAt: new Date('2023-01-15T09:00:00')
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@company.com',
    role: 'Manager',
    group: 'Sales',
    status: 'active',
    lastLogin: new Date('2024-07-17T09:15:00'),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    department: 'Sales',
    phone: '+1 (555) 234-5678',
    location: 'Chicago, IL',
    permissions: ['user.read', 'sales.access'],
    createdAt: new Date('2023-03-22T10:30:00')
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@company.com',
    role: 'Developer',
    group: 'Engineering',
    status: 'disabled',
    lastLogin: new Date('2024-07-15T16:45:00'),
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    department: 'Engineering',
    phone: '+1 (555) 345-6789',
    location: 'San Francisco, CA',
    permissions: ['user.read', 'code.write'],
    createdAt: new Date('2023-05-10T14:20:00')
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    role: 'Analyst',
    group: 'Finance',
    status: 'active',
    lastLogin: new Date('2024-07-17T11:20:00'),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    department: 'Finance',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    permissions: ['user.read', 'finance.access'],
    createdAt: new Date('2023-02-28T11:15:00')
  },
  {
    id: '5',
    name: 'Eva Martinez',
    email: 'eva.martinez@company.com',
    role: 'Designer',
    group: 'Marketing',
    status: 'active',
    lastLogin: new Date('2024-07-16T13:30:00'),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    department: 'Marketing',
    phone: '+1 (555) 567-8901',
    location: 'Los Angeles, CA',
    permissions: ['user.read', 'design.access'],
    createdAt: new Date('2023-04-12T08:45:00')
  },
  {
    id: '6',
    name: 'Frank Thompson',
    email: 'frank.thompson@company.com',
    role: 'Support',
    group: 'Customer Service',
    status: 'active',
    lastLogin: new Date('2024-07-17T10:00:00'),
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    department: 'Customer Service',
    phone: '+1 (555) 678-9012',
    location: 'Miami, FL',
    permissions: ['user.read', 'support.access'],
    createdAt: new Date('2023-06-18T15:30:00')
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace.lee@company.com',
    role: 'Manager',
    group: 'HR',
    status: 'disabled',
    lastLogin: new Date('2024-07-12T08:45:00'),
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    department: 'Human Resources',
    phone: '+1 (555) 789-0123',
    location: 'Seattle, WA',
    permissions: ['user.read', 'hr.access'],
    createdAt: new Date('2023-01-30T12:00:00')
  },
  {
    id: '8',
    name: 'Henry Brown',
    email: 'henry.brown@company.com',
    role: 'Developer',
    group: 'Engineering',
    status: 'active',
    lastLogin: new Date('2024-07-17T15:22:00'),
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    department: 'Engineering',
    phone: '+1 (555) 890-1234',
    location: 'Boston, MA',
    permissions: ['user.read', 'code.write', 'deploy.access'],
    createdAt: new Date('2023-07-05T09:30:00')
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random API failures
const shouldFail = () => Math.random() < 0.1; // 10% chance of failure

class MockApiService {
  async getUsers(filters: UserFilters): Promise<ApiResponse<User[]>> {
    // Simulate API delay
    await delay(Math.random() * 300 + 300); // 300-600ms delay

    // Simulate random failures
    if (shouldFail()) {
      throw new Error('Failed to fetch users. Please try again.');
    }

    // Apply filters
    let filteredUsers = [...mockUsers];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    // Pagination
    const total = filteredUsers.length;
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total,
      page: filters.page,
      limit: filters.limit
    };
  }

  async getUserById(id: string): Promise<User> {
    await delay(Math.random() * 200 + 200); // 200-400ms delay

    if (shouldFail()) {
      throw new Error('Failed to fetch user details. Please try again.');
    }

    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async resetPassword(userId: string): Promise<{ success: boolean; message: string }> {
    await delay(Math.random() * 300 + 500); // 500-800ms delay

    if (shouldFail()) {
      throw new Error('Failed to reset password. Please try again.');
    }

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      success: true,
      message: `Password reset email sent to ${user.email}`
    };
  }
}

export const mockApiService = new MockApiService();