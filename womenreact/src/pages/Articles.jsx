import React, { useState } from 'react';
import { BookOpen, Clock, User, Search, Filter, ArrowRight } from 'lucide-react';
import './Articles.css';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'safety', name: 'Safety Tips' },
    { id: 'legal', name: 'Legal Rights' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'career', name: 'Career & Finance' },
    { id: 'technology', name: 'Technology' },
    { id: 'stories', name: 'Success Stories' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Essential Self-Defense Techniques Every Woman Should Know',
      excerpt: 'Learn basic self-defense moves that can help you stay safe in dangerous situations. These techniques are easy to learn and can be life-saving.',
      category: 'safety',
      author: 'Sarah Johnson',
      readTime: '8 min read',
      date: '2024-01-15',
      image: '/api/placeholder/400/250',
      featured: true
    },
    {
      id: 2,
      title: 'Understanding Your Legal Rights: A Comprehensive Guide',
      excerpt: 'Know your rights and legal protections. This guide covers workplace harassment, domestic violence laws, and how to seek legal help.',
      category: 'legal',
      author: 'Dr. Priya Sharma',
      readTime: '12 min read',
      date: '2024-01-12',
      image: '/api/placeholder/400/250',
      featured: true
    },
    {
      id: 3,
      title: 'Building Confidence: Mental Health and Self-Esteem',
      excerpt: 'Explore strategies to build self-confidence and maintain mental health. Learn about resources and support systems available.',
      category: 'health',
      author: 'Dr. Maya Patel',
      readTime: '10 min read',
      date: '2024-01-10',
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: 4,
      title: 'Safe Dating in the Digital Age',
      excerpt: 'Navigate online dating safely with these essential tips. Learn how to protect your privacy and recognize red flags.',
      category: 'safety',
      author: 'Lisa Chen',
      readTime: '6 min read',
      date: '2024-01-08',
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: 5,
      title: 'Financial Independence for Women: Getting Started',
      excerpt: 'Take control of your financial future with practical tips on budgeting, investing, and building wealth.',
      category: 'career',
      author: 'Rachel Kumar',
      readTime: '15 min read',
      date: '2024-01-05',
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: 6,
      title: 'Cybersecurity Basics: Protecting Your Digital Life',
      excerpt: 'Essential cybersecurity practices to protect yourself from online threats, including password security and privacy settings.',
      category: 'technology',
      author: 'Tech Safety Team',
      readTime: '9 min read',
      date: '2024-01-03',
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: 7,
      title: 'From Survivor to Advocate: Maria\'s Story',
      excerpt: 'Read about Maria\'s journey from domestic violence victim to women\'s rights advocate and how she\'s making a difference.',
      category: 'stories',
      author: 'Maria Rodriguez',
      readTime: '11 min read',
      date: '2024-01-01',
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: 8,
      title: 'Workplace Safety: Dealing with Harassment',
      excerpt: 'A comprehensive guide to recognizing, documenting, and reporting workplace harassment. Know your options and resources.',
      category: 'legal',
      author: 'Employment Law Team',
      readTime: '13 min read',
      date: '2023-12-28',
      image: '/api/placeholder/400/250',
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="articles-page">
      {/* Articles Header */}
      <section className="articles-header">
        <div className="container">
          <div className="header-content">
            <h1>Knowledge Hub</h1>
            <p>
              Empowering women through education, awareness, and shared experiences. 
              Discover articles, guides, and stories that inspire and inform.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="search-filter">
        <div className="container">
          <div className="search-bar">
            <div className="search-input">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="category-filter">
            <Filter size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {searchTerm === '' && selectedCategory === 'all' && (
        <section className="featured-articles">
          <div className="container">
            <h2>Featured Articles</h2>
            <div className="featured-grid">
              {featuredArticles.map(article => (
                <article key={article.id} className="featured-card">
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                    <div className="article-category">{categories.find(cat => cat.id === article.category)?.name}</div>
                  </div>
                  <div className="article-content">
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="article-meta">
                      <div className="meta-item">
                        <User size={16} />
                        <span>{article.author}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div className="article-date">{formatDate(article.date)}</div>
                    <button className="read-more-btn">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="all-articles">
        <div className="container">
          <div className="section-header">
            <h2>
              {searchTerm ? `Search Results for "${searchTerm}"` : 
               selectedCategory === 'all' ? 'Latest Articles' : 
               categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <p>{filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found</p>
          </div>
          
          <div className="articles-grid">
            {regularArticles.map(article => (
              <article key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                  <div className="article-category">{categories.find(cat => cat.id === article.category)?.name}</div>
                </div>
                <div className="article-content">
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-meta">
                    <div className="meta-item">
                      <User size={16} />
                      <span>{article.author}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="article-footer">
                    <div className="article-date">{formatDate(article.date)}</div>
                    <button className="read-more-btn">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="no-results">
              <BookOpen size={48} />
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or browse different categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-signup">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get the latest articles and safety tips delivered to your inbox</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;