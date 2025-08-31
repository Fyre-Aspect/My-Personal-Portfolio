import Navigation from '../../components/Navigation'

export default function Blog() {
  const blogPosts = [
    {
      title: "My Journey into Full-Stack Development at 16",
      excerpt: "How I started programming, the challenges I faced as a young developer, and what I've learned along the way.",
      date: "2024-08-15",
      readTime: "5 min read",
      tags: ["Development", "Journey", "Learning"],
      featured: true
    },
    {
      title: "Building My First Real-World Project: Tidal Tasks",
      excerpt: "Insights from working as an admin developer on an AI-powered task management platform and the technical challenges we solved.",
      date: "2024-07-28",
      readTime: "7 min read",
      tags: ["Projects", "AI", "React"],
      featured: true
    },
    {
      title: "Balancing High School and Development Work",
      excerpt: "Tips and strategies for managing academic responsibilities while pursuing passion projects and gaining real-world experience.",
      date: "2024-07-12",
      readTime: "4 min read",
      tags: ["Productivity", "Education", "Balance"]
    },
    {
      title: "Learning Hardware Programming: Arduino Adventures",
      excerpt: "My experience building a temperature humidity sensor and diving into the world of IoT and embedded systems.",
      date: "2024-06-25",
      readTime: "6 min read",
      tags: ["Hardware", "Arduino", "IoT"]
    },
    {
      title: "The Power of Open Source for Young Developers",
      excerpt: "Why contributing to open source projects has been crucial to my development journey and how other students can get started.",
      date: "2024-06-10",
      readTime: "5 min read",
      tags: ["Open Source", "Community", "Learning"]
    },
    {
      title: "From Volunteer Work to Tech Skills",
      excerpt: "How my volunteer experience at KW Humane Society taught me valuable soft skills that translate to software development.",
      date: "2024-05-28",
      readTime: "4 min read",
      tags: ["Volunteering", "Soft Skills", "Growth"]
    }
  ]

  const categories = ["All", "Development", "Projects", "Learning", "Community", "Hardware"]

  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="blog-section">
          <div className="container">
            <div className="blog-hero fade-in-up">
              <h1 className="page-title">Blog</h1>
              <p className="page-subtitle">
                Thoughts, experiences, and insights from my journey as a young developer
              </p>
            </div>

            <div className="blog-content">
              <div className="blog-filters fade-in-up-delay-1">
                <div className="filter-tabs">
                  {categories.map((category, index) => (
                    <button key={index} className={`filter-tab ${index === 0 ? 'active' : ''}`}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="blog-posts">
                <div className="featured-posts">
                  <h2 className="section-subtitle fade-in-up-delay-2">Featured Posts</h2>
                  <div className="featured-grid">
                    {blogPosts.filter(post => post.featured).map((post, index) => (
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
                          <p className="post-excerpt">{post.excerpt}</p>
                          <div className="post-tags">
                            {post.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="post-tag">{tag}</span>
                            ))}
                          </div>
                          <a href="#" className="read-more-link">Read Full Post →</a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="recent-posts">
                  <h2 className="section-subtitle fade-in-up-delay-2">Recent Posts</h2>
                  <div className="posts-list">
                    {blogPosts.filter(post => !post.featured).map((post, index) => (
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
                          <p className="post-excerpt">{post.excerpt}</p>
                          <div className="post-tags">
                            {post.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="post-tag">{tag}</span>
                            ))}
                          </div>
                          <a href="#" className="read-more-link">Read More →</a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="blog-cta fade-in-up-delay-3">
                <div className="cta-content">
                  <h2>Want to discuss any of these topics?</h2>
                  <p>
                    I love connecting with fellow developers, students, and anyone interested in technology. 
                    Feel free to reach out if you'd like to discuss any of these posts or share your own experiences!
                  </p>
                  <a href="/contact" className="cta-button primary">Get In Touch</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}