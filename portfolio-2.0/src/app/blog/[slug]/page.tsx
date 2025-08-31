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
              <h1 className="page-title">My Journey into Full-Stack Development at 16</h1>
              <div className="post-meta">
                <span className="post-date">August 15, 2024</span>
                <span className="post-read-time">5 min read</span>
                <div className="post-tags">
                  <span className="post-tag">Development</span>
                  <span className="post-tag">Journey</span>
                  <span className="post-tag">Learning</span>
                </div>
              </div>
            </div>

            <article className="blog-post-content fade-in-up-delay-1">
              <div className="post-body">
                <p className="post-lead">
                  Starting my journey as a <span className="page-highlight">full-stack developer</span> at 16 wasn't something I planned. 
                  It began with curiosity about how websites worked and evolved into a passion for creating 
                  <span className="page-highlight">digital solutions</span> that solve real problems.
                </p>

                <h2>The Beginning: From Curiosity to Code</h2>
                <p>
                  My first encounter with programming was in <span className="page-highlight">Grade 9</span>, when I stumbled upon a 
                  <span className="page-highlight">C++ Arduino Tutorial For making something cool</span> on YouTube. What started as casual exploration quickly became 
                  an obsession. I spent hours learning about <span className="page-highlight">variables</span>, 
                  <span className="page-highlight">loops</span>, and <span className="page-highlight">functions</span>.
                </p>

                <p>
                  The real turning point came when I discovered <span className="page-highlight">web development</span>. 
                  Unlike the command-line programs I'd been writing, websites felt alive and interactive. 
                  I could create something that others could see, use, and benefit from. That realization sparked my transition from 
                  <span className="page-highlight">casual coding</span> to <span className="page-highlight">serious development</span>.
                </p>

                <h2>Embracing the Full-Stack Journey</h2>
                <p>
                  Learning <span className="page-highlight">HTML</span> and <span className="page-highlight">CSS</span> felt like learning a new language
                  one that allowed me to paint on the digital canvas. But it was <span className="page-highlight">JavaScript</span> that truly opened doors. 
                  Suddenly, my static pages could respond to user interactions, fetch data, and create dynamic experiences.
                </p>

                <p>
                  The progression to <span className="page-highlight">React</span> was natural. As my projects grew more complex, 
                  I needed better ways to organize my code and manage application state. React's 
                  <span className="page-highlight">component-based architecture</span> made sense to my engineering-minded approach to problem-solving.
                </p>

                <blockquote className="post-quote">
                  "I used to hate this.."
                </blockquote>

                <h2>Balancing School and Development</h2>
                <p>
                  One of the biggest challenges I face is balancing my <span className="page-highlight">academic responsibilities</span> 
                  with my passion for <span className="page-highlight">software development</span>. Being in the 
                  <span className="page-highlight">IB Programme</span> means managing demanding coursework in subjects like 
                  <span className="page-highlight">Higher Level Mathematics</span> and <span className="page-highlight">Physics</span>, 
                  while still finding time to code and work on projects.
                </p>

                <h2>Real-World Experience: Tidal Tasks</h2>
                <p>
                  Landing my role as <span className="page-highlight">Admin Developer</span> at 
                  <span className="page-highlight">Tidal Tasks AI</span> was a pivotal moment in my journey. 
                  Working on a real startup with potential real users taught me lessons no tutorial could provide:
                </p>

                <ul className="post-list">
                  <li>The importance of <span className="page-highlight">clean, maintainable code</span></li>
                  <li>How to work effectively in a <span className="page-highlight">team environment</span></li>
                  <li>The critical nature of <span className="page-highlight">user experience</span> in application design</li>
                  <li>The challenges and rewards of <span className="page-highlight">AI integration</span></li>
                </ul>

                <h2>Looking Forward</h2>
                <p>
                  At 16, I'm just beginning my journey in technology. The landscape of 
                  <span className="page-highlight">software development</span> is constantly evolving, with new frameworks, 
                  tools, and paradigms emerging regularly. What excites me most is that there's always more to learn, 
                  more problems to solve, and more ways to make a positive impact through technology.
                </p>
                <div className="post-conclusion">
                  <p>
                    The journey from curious teenager to <span className="page-highlight">working developer</span> has been challenging, 
                    rewarding, and full of unexpected turns. I'm excited to see where this path leads and what 
                    <span className="page-highlight">innovative solutions</span> I'll be able to create as I continue to grow and learn.
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