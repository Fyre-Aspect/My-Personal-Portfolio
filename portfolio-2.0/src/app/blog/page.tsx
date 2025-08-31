'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All')
  
  const blogPosts = [
    {
      id: 'journey-fullstack-16',
      title: "My Journey into Full-Stack Development at 16",
      excerpt: "How I started programming, the challenges I faced as a young developer, and what I've learned along the way about <span class='page-highlight'>building real projects</span> while balancing <span class='page-highlight'>academic excellence</span>.",
      date: "2024-08-15",
      readTime: "5 min read",
      tags: ["Development", "Journey", "Learning"],
      featured: true,
      category: "Development"
    },
    {
      id: 'building-tidal-tasks',
      title: "Building My First Real-World Project: Tidal Tasks",
      excerpt: "Insights from working as an <span class='page-highlight'>admin developer</span> on an AI-powered task management platform and the <span class='page-highlight'>technical challenges</span> we solved using <span class='page-highlight'>modern web technologies</span>.",
      date: "2024-07-28",
      readTime: "7 min read",
      tags: ["Projects", "AI", "React"],
      featured: true,
      category: "Projects"
    },
    {
      id: 'balancing-school-development',
      title: "Balancing High School and Development Work",
      excerpt: "Tips and strategies for managing <span class='page-highlight'>academic responsibilities</span> while pursuing <span class='page-highlight'>passion projects</span> and gaining <span class='page-highlight'>real-world experience</span>.",
      date: "2024-07-12",
      readTime: "4 min read",
      tags: ["Productivity", "Education", "Balance"],
      category: "Learning"
    },
    {
      id: 'arduino-adventures',
      title: "Learning Hardware Programming: Arduino Adventures",
      excerpt: "My experience building a <span class='page-highlight'>temperature humidity sensor</span> and diving into the world of <span class='page-highlight'>IoT</span> and <span class='page-highlight'>embedded systems</span>.",
      date: "2024-06-25",
      readTime: "6 min read",
      tags: ["Hardware", "Arduino", "IoT"],
      category: "Hardware"
    },
    {
      id: 'power-of-open-source',
      title: "The Power of Open Source for Young Developers",
      excerpt: "Why contributing to <span class='page-highlight'>open source projects</span> has been crucial to my development journey and how other <span class='page-highlight'>students can get started</span>.",
      date: "2024-06-10",
      readTime: "5 min read",
      tags: ["Open Source", "Community", "Learning"],
      category: "Community"
    },
    {
      id: 'volunteer-to-tech-skills',
      title: "From Volunteer Work to Tech Skills",
      excerpt: "How my volunteer experience at <span class='page-highlight'>KW Humane Society</span> taught me valuable <span class='page-highlight'>soft skills</span> that translate to <span class='page-highlight'>software development</span>.",
      date: "2024-05-28",
      readTime: "4 min read",
      tags: ["Volunteering", "Soft Skills", "Growth"],
      category: "Community"
    }
  ]

  const categories = ["All", "Development", "Projects", "Learning", "Community", "Hardware"]

  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter)

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const recentPosts = filteredPosts.filter(post => !post.featured)

  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="blog-section">
          <div className="container">
            <div className="blog-hero fade-in-up">
              <h1 className="page-title">Blog</h1>
              <p className="page-subtitle">
                Thoughts, experiences, and insights from my journey as a <span className="page-highlight">young developer</span>, 
                sharing lessons learned about <span className="page-highlight">technology</span>, <span className="page-highlight">growth</span>, and <span className="page-highlight">continuous learning</span>
              </p>
            </div>

            <div className="blog-content">
              <div className="blog-filters fade-in-up-delay-1">
                <div className="filter-tabs">
                  {categories.map((category, index) => (
                    <button 
                      key={index} 
                      className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="blog-posts">
                {featuredPosts.length > 0 && (
                  <div className="featured-posts">
                    <h2 className="section-subtitle fade-in-up-delay-2">Featured Posts</h2>
                    <div className="featured-grid">
                      {featuredPosts.map((post, index) => (
                        <article key={index} className={`featured-post fade-in-up-delay-${index + 3}`}>
                          <div className="post-content">
                            <div className="post-meta">
                              <span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</span>
                              <span className="post-read-time">{post.readTime}</span>
                            </div>
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
                            <div className="post-tags">
                              {post.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="post-tag">{tag}</span>
                              ))}
                            </div>
                            <a href={`/blog/${post.id}`} className="read-more-link">Read Full Post →</a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {recentPosts.length > 0 && (
                  <div className="recent-posts">
                    <h2 className="section-subtitle fade-in-up-delay-2">Recent Posts</h2>
                    <div className="posts-list">
                      {recentPosts.map((post, index) => (
                        <article key={index} className={`blog-post fade-in-up-delay-${index + 1}`}>
                          <div className="post-content">
                            <div className="post-meta">
                              <span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</span>
                              <span className="post-read-time">{post.readTime}</span>
                            </div>
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
                            <div className="post-tags">
                              {post.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="post-tag">{tag}</span>
                              ))}
                            </div>
                            <a href={`/blog/${post.id}`} className="read-more-link">Read More →</a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {filteredPosts.length === 0 && (
                  <div className="no-posts">
                    <p>No posts found for the selected category.</p>
                  </div>
                )}
              </div>

              <div className="blog-cta fade-in-up-delay-3">
                <div className="cta-content">
                  <h2>Want to discuss any of these topics?</h2>
                  <p>
                    I love connecting with <span className="page-highlight">fellow developers</span>, <span className="page-highlight">students</span>, and anyone interested in <span className="page-highlight">technology</span>. 
                    Feel free to reach out if you'd like to discuss any of these posts or share your own <span className="page-highlight">experiences</span>!
                  </p>
                  <a href="/contact" className="cta-button primary">Get In Touch</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}