// app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const lang = searchParams.get('lang') || 'ar';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    let query = sql`
      SELECT 
        id,
        ${sql.raw(`title_${lang}`)} as title,
        ${sql.raw(`content_${lang}`)} as content,
        excerpt_${lang} as excerpt,
        source_url,
        source_name,
        category,
        featured_image,
        is_exclusive,
        published_at
      FROM articles 
      WHERE is_published = true
    `;
    
    if (category) {
      query = sql`${query} AND category = ${category}`;
    }
    
    query = sql`${query} ORDER BY is_exclusive DESC, published_at DESC LIMIT ${limit} OFFSET ${offset}`;
    
    const { rows } = await query;
    
    return NextResponse.json({ articles: rows });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}