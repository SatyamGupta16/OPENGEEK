import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  ShieldCheck, 
  Clock, 
  User,
  AlertTriangle
} from 'lucide-react';
import api from '@/lib/api';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  is_active: boolean;
  created_at: string;
  last_login?: string;
  last_activity?: string;
  login_attempts: number;
}

const AdminUserList = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Token is now handled automatically by the API instance

  useEffect(() => {
    fetchAdminUsers();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/api/admin-users/profile');
      setCurrentUser(response.data.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin-users');
      setAdminUsers(response.data.data);
    } catch (error: any) {
      console.error('Error fetching admin users:', error);
      setError(error.response?.data?.message || error.message || 'Error fetching admin users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    try {
      await api.delete(`/api/admin-users/${user.id}`);
      setAdminUsers(adminUsers.filter(u => u.id !== user.id));
      setDeleteUser(null);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error deleting admin user');
    }
  };

  const toggleUserStatus = async (user: AdminUser) => {
    try {
      await api.put(`/api/admin-users/${user.id}`, {
        is_active: !user.is_active
      });
      
      setAdminUsers(adminUsers.map(u => 
        u.id === user.id ? { ...u, is_active: !u.is_active } : u
      ));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating user status');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <ShieldCheck className="h-4 w-4 text-red-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'moderator':
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      super_admin: 'destructive',
      admin: 'default',
      moderator: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[role as keyof typeof variants] || 'outline'}>
        {role.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const canManageUser = (user: AdminUser) => {
    if (!currentUser) return false;
    if (currentUser.role !== 'super_admin') return false;
    if (user.id === currentUser.id) return false; // Can't manage self
    if (user.role === 'super_admin') return false; // Can't manage other super admins
    return true;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Users</h1>
          <p className="text-gray-600">Manage admin users and their permissions</p>
        </div>
        {currentUser?.role === 'super_admin' && (
          <Button asChild>
            <Link to="/admin/admin-users/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Admin User
            </Link>
          </Button>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>
            Manage admin accounts and their access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Login Attempts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getRoleIcon(user.role)}
                      <div>
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.is_active ? 'secondary' : 'destructive'}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      {user.login_attempts > 0 && (
                        <Badge variant="outline" className="text-orange-600">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {user.login_attempts} attempts
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>
                        {user.last_login 
                          ? new Date(user.last_login).toLocaleDateString()
                          : 'Never'
                        }
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${user.login_attempts > 3 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {user.login_attempts}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={`/admin/admin-users/edit/${user.id}`}>
                          <Edit className="h-3 w-3" />
                        </Link>
                      </Button>
                      
                      {canManageUser(user) ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleUserStatus(user)}
                          >
                            {user.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteUser(user)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </>
                      ) : user.role === 'super_admin' ? (
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          <Shield className="h-3 w-3 mr-1" />
                          Protected
                        </Badge>
                      ) : user.id === currentUser?.id ? (
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          <User className="h-3 w-3 mr-1" />
                          You
                        </Badge>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {adminUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No admin users found
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={() => deleteUser && handleDeleteUser(deleteUser)}
        title="Delete Admin User"
        description={`Are you sure you want to delete ${deleteUser?.username}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default AdminUserList;