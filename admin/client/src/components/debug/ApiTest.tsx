import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

const ApiTest = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await api.get('/health');
      setResult(`✅ Connection successful: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      setResult(`❌ Connection failed: ${error.message}\nResponse: ${JSON.stringify(error.response?.data, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/admin/login', {
        username: 'admin',
        password: '5454'
      });
      setResult(`✅ Login successful: ${JSON.stringify(response.data, null, 2)}`);
      // Store token for future requests
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
      }
    } catch (error: any) {
      setResult(`❌ Login failed: ${error.message}\nResponse: ${JSON.stringify(error.response?.data, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  const testAdminUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin-users');
      setResult(`✅ Admin users fetch successful: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      setResult(`❌ Admin users fetch failed: ${error.message}\nResponse: ${JSON.stringify(error.response?.data, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>API Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button onClick={testConnection} disabled={loading}>
            Test Health
          </Button>
          <Button onClick={testLogin} disabled={loading}>
            Test Login
          </Button>
          <Button onClick={testAdminUsers} disabled={loading}>
            Test Admin Users
          </Button>
        </div>
        {result && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiTest;