'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 bg-[#0F3D2E]/92 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-white font-bold text-2xl flex items-center gap-2">
            ⚽ PitchIQ
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="btn btn-ghost">
              تسجيل الدخول
            </Link>
            <Link href="/register" className="btn btn-cta">
              ابدأ الآن
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#0F3D2E] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            خطّط تكتيكاتك <span className="text-[#FF6B35]">زي المحترفين</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            لوحة تكتيكية تفاعلية، مكتبة تشكيلات وتمارين جاهزة، ومساعد ذكاء اصطناعي يقترح لك تمرين الحصة الجاية
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="btn btn-cta">
              ابدأ اشتراكك الآن
            </Link>
            <button className="btn btn-ghost">
              شوف الباقات
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">الميزات الأساسية</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'لوحة تكتيكية', desc: 'ارسم التحركات بأدوات سهلة' },
              { title: 'مكتبة تشكيلات', desc: '4-3-3، 4-4-2، وغيرها' },
              { title: 'مكتبة تمارين', desc: 'تمارين جاهزة مصنفة' },
              { title: 'مساعد ذكي', desc: 'توليد تمارين مخصصة' },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-lg border">
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">الباقات</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'مجانية', price: '0', features: ['لوحة محدودة', '3 تمارين تجريبية'] },
              { name: 'أساسية', price: '99', features: ['لوحة غير محدودة', 'كل التشكيلات', 'كل التمارين'] },
              { name: 'احترافية', price: '199', features: ['كل المميزات', 'مساعد ذكي', 'أولوية الدعم'] },
            ].map((plan, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4">{plan.price} €</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#FF6B35]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="btn btn-cta btn-block w-full text-center">
                  اختر الآن
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F3D2E] text-gray-300 py-8 px-6 text-center">
        <p>© 2024 PitchIQ - مساعد مدرب كرة القدم الرقمي</p>
      </footer>
    </div>
  );
}