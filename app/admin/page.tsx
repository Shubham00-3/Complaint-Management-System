'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ComplaintTable from '@/components/ComplaintTable';
import FilterBar from '@/components/FilterBar';
import { apiRequest } from '@/lib/api-client';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user, statusFilter, priorityFilter]);

  const fetchUser = async () => {
    try {
      const response: any = await apiRequest('/api/auth/me');
      if (response.user.role !== 'admin') {
        router.push('/');
        return;
      }
      setUser(response.user);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaints = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (priorityFilter !== 'all') params.append('priority', priorityFilter);

      const response: any = await apiRequest(
        `/api/complaints?${params.toString()}`
      );
      setComplaints(response.complaints);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage all complaints</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                User View
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Complaints</div>
            <div className="text-3xl font-bold text-gray-900">{complaints.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">
              {complaints.filter((c: any) => c.status === 'Pending').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-blue-600">
              {complaints.filter((c: any) => c.status === 'In Progress').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Resolved</div>
            <div className="text-3xl font-bold text-green-600">
              {complaints.filter((c: any) => c.status === 'Resolved').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        {/* Complaints Table */}
        <ComplaintTable complaints={complaints} onUpdate={fetchComplaints} />
      </main>
    </div>
  );
}


