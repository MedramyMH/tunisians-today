# scripts/article_scraper.py
import requests
import json
from bs4 import BeautifulSoup
import feedparser
from datetime import datetime
import psycopg2
import os

class ArticleScraper:
    def __init__(self):
        self.db_config = {
            'host': os.getenv('DB_HOST'),
            'database': os.getenv('DB_NAME'),
            'user': os.getenv('DB_USER'),
            'password': os.getenv('DB_PASSWORD')
        }
        
        self.feeds = [
            {
                'name': 'MosaiqueFM',
                'url': 'https://www.mosaiquefm.net/ar/feed/index.rss',
                'language': 'ar'
            },
            {
                'name': 'Kapitalis',
                'url': 'https://kapitalis.com/tunisie/feed/',
                'language': 'fr'
            }
        ]

    def scrape_articles(self):
        articles = []
        
        for feed in self.feeds:
            try:
                news_feed = feedparser.parse(feed['url'])
                
                for entry in news_feed.entries[:10]:  # Latest 10 articles
                    article = {
                        'title': entry.title,
                        'content': self.clean_content(entry.summary),
                        'source_url': entry.link,
                        'source_name': feed['name'],
                        'published_at': self.parse_date(entry.published),
                        'language': feed['language'],
                        'category': self.detect_category(entry)
                    }
                    articles.append(article)
                    
            except Exception as e:
                print(f"Error processing feed {feed['name']}: {e}")

        return articles

    def save_to_db(self, articles):
        conn = psycopg2.connect(**self.db_config)
        cursor = conn.cursor()
        
        for article in articles:
            # Check if article already exists
            cursor.execute(
                "SELECT id FROM articles WHERE source_url = %s",
                (article['source_url'],)
            )
            
            if not cursor.fetchone():
                cursor.execute("""
                    INSERT INTO articles 
                    (title_ar, title_fr, content_ar, content_fr, source_url, source_name, category, published_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    article['title'] if article['language'] == 'ar' else '',
                    article['title'] if article['language'] == 'fr' else '',
                    article['content'] if article['language'] == 'ar' else '',
                    article['content'] if article['language'] == 'fr' else '',
                    article['source_url'],
                    article['source_name'],
                    article['category'],
                    article['published_at']
                ))
        
        conn.commit()
        conn.close()

if __name__ == "__main__":
    scraper = ArticleScraper()
    articles = scraper.scrape_articles()
    scraper.save_to_db(articles)