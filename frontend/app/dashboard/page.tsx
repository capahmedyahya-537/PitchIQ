'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData || '{}'));
    fetchBoards(token);
  }, []);

  const fetchBoards = async (token: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/boards`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBoards(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (loading) return <div className="text-center py-20">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">⚽ PitchIQ</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">أهلا {user?.name}</span>
            <button
              onClick={handleLogout}
              className="btn btn-ghost-dark"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">لوحة التحكم</h2>
        <p className="text-gray-600 mb-8">اختر من الخيارات أدناه لبدء العمل:</p>

        {/* Action Tiles */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Link href="/board" className="bg-white p-6 rounded-lg border hover:shadow-lg transition text-center">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="font-bold mb-2">لوحة جديدة</h3>
            <p className="text-sm text-gray-600">ابدأ من ملعب فاضي</p>
          </Link>
          <Link href="/formations" className="bg-white p-6 rounded-lg border hover:shadow-lg transition text-center">
            <div className="text-4xl mb-2">⚙️</div>
            <h3 className="font-bold mb-2">التشكيلات</h3>
            <p className="text-sm text-gray-600">4-3-3، 4-4-2، وغيرها</p>
          </Link>
          <Link href="/drills" className="bg-white p-6 rounded-lg border hover:shadow-lg transition text-center">
            <div className="text-4xl mb-2">🏃</div>
            <h3 className="font-bold mb-2">التمارين</h3>
            <p className="text-sm text-gray-600">تمارين مصنفة</p>
          </Link>
          <Link href="/assistant" className="bg-white p-6 rounded-lg border hover:shadow-lg transition text-center">
            <div className="text-4xl mb-2">🤖</div>
            <h3 className="font-bold mb-2">المساعد الذكي</h3>
            <p className="text-sm text-gray-600">توليد تمارين</p>
          </Link>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-xl font-bold mb-4">حصصك الأخيرة</h3>
          {boards.length === 0 ? (
            <p className="text-gray-600">لم ��نشئ أي حصة بعد</p>
          ) : (
            <div className="space-y-2">
              {boards.map((board: any) => (
                <div key={board._id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-bold">{board.title}</h4>
                    <p className="text-sm text-gray-600">{new Date(board.updatedAt).toLocaleDateString('ar-EG')}</p>
                  </div>
                  <Link href={`/board/${board._id}`} className="btn btn-cta text-sm">
                    فتح
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}