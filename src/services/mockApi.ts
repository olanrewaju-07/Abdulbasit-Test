import { User, ApiResponse, UserFilters } from '@/types/user';
import Image1 from '../Image/image 1.jpg';
import Image2 from '../Image/image 2.jpg';
import Image3 from '../Image/image 3.jpg';
import Image4 from '../Image/image 4.jpg';
import Image5 from '../Image/image 5.jpg';
import Image6 from '../Image/image 6.jpg';
import Image7 from '../Image/image 7.jpg';
import Image8 from '../Image/image 8.jpg';
// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Issa Basheet',
    email: 'issaabdubasit560@gmail.com',
    role: 'Administrator',
    group: 'IT Security',
    status: 'active',
    lastLogin: new Date('2025-07-17T14:30:00'),
    avatar: Image1,
    department: 'Information Technology',
    phone: '+234 803 123 4567',
    location: 'Ibadan, Oyo State',
    permissions: ['user.read', 'user.write', 'user.delete', 'admin.access'],
    createdAt: new Date('2023-01-15T09:00:00')
  },
  {
    id: '2',
    name: 'Issa Farooq',
    email: 'issafarouq@gmail.com',
    role: 'Manager',
    group: 'Sales',
    status: 'active',
    lastLogin: new Date('2024-07-17T09:15:00'),
    avatar: Image2,
    department: 'Sales',
    phone: '+234 701 234 7578',
    location: 'Ilorin, Kwara State',
    permissions: ['user.read', 'sales.access'],
    createdAt: new Date('2023-03-22T10:30:00')
  },
  {
    id: '3',
    name: 'Issa Abdulmumin',
    email: 'penpalcraft260@gmail.com',
    role: 'Developer',
    group: 'Engineering',
    status: 'disabled',
    lastLogin: new Date('2024-07-15T16:45:00'),
    avatar: Image3,
    department: 'Engineering',
    phone: '+234 816 737 5508',
    location: 'Ikeja, Lagos State',
    permissions: ['user.read', 'code.write'],
    createdAt: new Date('2023-05-10T14:20:00')
  },
  {
    id: '4',
    name: 'Solihu Abdulwahab',
    email: 'issabasheet@gmail.com',
    role: 'Analyst',
    group: 'Finance',
    status: 'active',
    lastLogin: new Date('2024-07-17T11:20:00'),
    avatar: Image4,
    department: 'Finance',
    phone: '+234 901 234 5678',
    location: 'Ilorin, Kwara State',
    permissions: ['user.read', 'finance.access'],
    createdAt: new Date('2023-02-28T11:15:00')
  },
  {
    id: '5',
    name: 'Abdulrahman Olaniyi',
    email: 'issabasheet@gmail.com',
    role: 'Designer',
    group: 'Marketing',
    status: 'active',
    lastLogin: new Date('2024-07-16T13:30:00'),
    avatar: Image5,
    department: 'Marketing',
    phone: '+234 802 345 6789',
    location: 'Abuja, Nigeria',
    permissions: ['user.read', 'design.access'],
    createdAt: new Date('2023-04-12T08:45:00')
  },
  {
    id: '6',
    name: 'Kolawola Frank',
    email: 'penpaltech560@gmail.com',
    role: 'Support',
    group: 'Customer Service',
    status: 'active',
    lastLogin: new Date('2024-07-17T10:00:00'),
    avatar: Image6,
    department: 'Customer Service',
    phone: '+234 903 456 7890',
    location: 'Miami, FL',
    permissions: ['user.read', 'support.access'],
    createdAt: new Date('2023-06-18T15:30:00')
  },
  {
    id: '7',
    name: 'Taiwo grace',
    email: 'taiwograce@gmail.com',
    role: 'Manager',
    group: 'HR',
    status: 'disabled',
    lastLogin: new Date('2024-07-12T08:45:00'),
    avatar: Image7,
    department: 'Human Resources',
    phone: '+234 901 234 5678',
    location: 'Ibadan, Oyo State',
    permissions: ['user.read', 'hr.access'],
    createdAt: new Date('2023-01-30T12:00:00')
  },
  {
    id: '8',
    name: 'Abdulsalam Abdulrahman',
    email: 'henry.brown@company.com',
    role: 'Developer',
    group: 'Engineering',
    status: 'active',
    lastLogin: new Date('2024-07-17T15:22:00'),
    avatar: Image8,
    department: 'Engineering',
    phone: '+234 802 345 6789',
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