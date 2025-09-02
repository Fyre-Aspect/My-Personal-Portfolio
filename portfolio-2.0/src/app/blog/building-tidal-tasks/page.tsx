import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import Link from 'next/link'

export default function BlogPost() {
  return (
    <>
      <Navigation />
      <main className="page-content">
        <section className="blog-post-section">
          <div className="container">
            <div className="blog-post-hero fade-in-up">
              <Link href="/blog" className="back-link">← Back to Blog</Link>
              <h1 className="page-title">Building My First Real-World Project: Tidal Tasks</h1>
              <div className="post-meta">
                <span className="post-date">July 28, 2024</span>
                <span className="post-read-time">7 min read</span>
                <div className="post-tags">
                  <span className="post-tag">Projects</span>
                  <span className="post-tag">AI</span>
                  <span className="post-tag">React</span>
                </div>
              </div>
            </div>

            <article className="blog-post-content fade-in-up-delay-1">
              <div className="post-body">
                <p className="post-lead">
                  Working as an <span className="page-highlight">Admin Developer</span> at Tidal Tasks AI has been my first 
                  taste of real-world software development. Building alongside a team building <span className="page-highlight">AI-powered task management platform</span> 
                  taught me invaluable lessons about <span className="page-highlight">scalable architecture</span>, 
                  <span className="page-highlight">user experience design</span>, and the challenges of integrating cutting-edge AI technology.
                </p>

                <h2>The Challenge: Building Something Real</h2>
                <p>
                  When I joined the Tidal Tasks team, I transitioned from building <span className="page-highlight">personal projects</span> 
                  to contributing to a startup that actual users can depend on daily. The difference was immediately apparent — 
                  every line of code needed to be <span className="page-highlight">production-ready</span>, as my good friend Sai (the CMO & CTO of the operation) always has something to say about  every feature and addition I make. This is beacuse everthing needs to be 
                  <span className="page-highlight">flawless</span>, and every decision impacts the <span className="page-highlight">user experience</span>.
                </p>
                <h2>Technical Architecture and Decisions</h2>
                <p>
                  We built the admin panel using <span className="page-highlight">React</span> with <span className="page-highlight">TypeScript</span> 
                  for type safety and better developer experience. The choice of <span className="page-highlight">Next.js</span> as our framework 
                  provided server-side rendering capabilities that improved both <span className="page-highlight">performance</span> and 
                  <span className="page-highlight">SEO</span>.
                </p>

                <blockquote className="post-quote">
                  "The most challenging wasn't the actual programming, it was to meet the expectations of the Team. 💀"
                </blockquote>

                <h2>AI Integration Challenges</h2>
                <p>
                  One of the most exciting aspects of working on Tidal Tasks were the <span className="page-highlight">AI capabilities</span> 
                  into the user workflow. We implemented <span className="page-highlight">features</span> 
                  to automatically categorize tasks, suggest priorities, and even predict completion times based on historical dataand it personalizes to YOU.
                </p>
                <h2>Key Features I Developed</h2>
                <p>
                  My primary contributions to the Tidal Tasks was Implementing Dark Mode:
                </p>

                <ul className="post-list">
                  <li>A comprehensive <span className="page-highlight">refactor of components</span> that now work in dark theme</li>
                  <li><span className="page-highlight">Fixing</span> some issues caused by dark theme implementations</li>
                  <li>Implementing<span className="page-highlight">a secret system</span> that comes to Tidal Tasks 2.0</li>
                </ul>

                <h2>Lessons in User Experience</h2>
                <p>
                  Working on a real product taught me that <span className="page-highlight">technical elegance</span> means nothing if users 
                  can't accomplish their goals efficiently. I learned to prioritize <span className="page-highlight">user preferences</span> over "yeah that's fine", 
                  <span className="page-highlight">consistency</span> over innovation, and <span className="page-highlight">reliability</span> over features.
                </p>

                <h2>Team Collaboration and Code Quality</h2>
                <p>
                  Working with a team introduced me to professional development practices that go far beyond coding. We used 
                  <span className="page-highlight">Git workflows</span> with feature branches, implemented comprehensive 
                  <span className="page-highlight">code reviews</span>, and maintained high test coverage with 
                  <span className="page-highlight">constant PR's</span> and <span className="page-highlight">alot of code review</span>
                </p>


                <div className="post-conclusion">
                  <p>
                    Building Tidal Tasks taught me that <span className="page-highlight">real-world development</span> is about much more 
                    than writing code that works. It's about writing code that <span className="page-highlight">scales</span>, 
                    <span className="page-highlight">performs</span>, and genuinely improves people's lives. This experience has shaped 
                    my approach to every project since, emphasizing <span className="page-highlight">user-centered design</span> and 
                    <span className="page-highlight">robust engineering practices</span>.
                  </p>
                </div>
              </div>

              <div className="post-footer">
                <div className="post-navigation">
                  <Link href="/blog" className="nav-link">← Back to All Posts</Link>
                  <Link href="/contact" className="nav-link">Get In Touch →</Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}