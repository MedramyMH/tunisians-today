// app/(admin)/articles/new/page.tsx
'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NewArticle() {
  const [formData, setFormData] = useState({
    title_ar: '',
    title_fr: '',
    content_ar: '',
    content_fr: '',
    category: '',
    is_exclusive: false
  });

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/admin/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      alert('Article created successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Title (Arabic)</label>
          <input
            type="text"
            value={formData.title_ar}
            onChange={e => setFormData({...formData, title_ar: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Title (French)</label>
          <input
            type="text"
            value={formData.title_fr}
            onChange={e => setFormData({...formData, title_fr: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Content (Arabic)</label>
          <ReactQuill
            value={formData.content_ar}
            onChange={value => setFormData({...formData, content_ar: value})}
            modules={modules}
          />
        </div>
        <div>
          <label>Content (French)</label>
          <ReactQuill
            value={formData.content_fr}
            onChange={value => setFormData({...formData, content_fr: value})}
            modules={modules}
          />
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        Publish Article
      </button>
    </form>
  );
}