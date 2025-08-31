import Navigation from '../Navigation';
import styles from './UnderConstruction.module.css';

interface FeatureItem {
  icon: string;
  text: string;
}

interface StatusItem {
  icon: string;
  text: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export default function ProjectsUnderConstruction() {
  const features: FeatureItem[] = [
    { icon: '🚀', text: 'Live Project Demos' },
    { icon: '⚡', text: 'Performance Metrics' },
    { icon: '🔧', text: 'Technical Deep Dives' },
    { icon: '📊', text: 'Impact Analytics' }
  ];

  const statusItems: StatusItem[] = [
    { icon: '✅', text: 'Project Documentation', status: 'completed' },
    { icon: '✅', text: 'Repository Organization', status: 'completed' },
    { icon: '🔄', text: 'Interactive Demos', status: 'in-progress' },
    { icon: '⏳', text: 'Case Study Details', status: 'pending' }
  ];

  return (
    <>
      <Navigation />
      <main className={styles.pageContent}>
        <section className={styles.underConstructionSection}>
          <div className={styles.container}>
            <div className={`${styles.constructionHero} ${styles.fadeInUp}`}>
              <div className={styles.constructionIcon}>
                <div className={styles.catAnvilPlaceholder}>
                  
                </div>
              </div>
              
              <h1 className={styles.pageTitle}>Projects - Under Construction</h1>
              <p className={styles.pageSubtitle}>
                Building an interactive showcase of my development work with the precision of a well-architected system
              </p>
            </div>

            <div className={`${styles.constructionContent} ${styles.fadeInUpDelay1}`}>
              <div className={styles.constructionMessage}>
                <h2>Crafting Project Showcases</h2>
                <p>
                  Like optimizing a database for performance, I'm carefully curating and presenting 
                  my projects to highlight not just what I built, but how I approach problem-solving, 
                  architecture decisions, and the impact of each solution.
                </p>
                
                <div className={styles.constructionFeatures}>
                  {features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <span className={styles.featureIcon}>{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${styles.constructionStatus} ${styles.fadeInUpDelay2}`}>
                <h3>Current Progress</h3>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '45%' }}></div>
                </div>
                <p className={styles.progressText}>45% Complete</p>
                
                <div className={styles.statusGrid}>
                  {statusItems.map((item, index) => (
                    <div key={index} className={`${styles.statusItem} ${styles[item.status]}`}>
                      <span className={styles.statusIcon}>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${styles.backLink} ${styles.fadeInUpDelay3}`}>
                <a href="/" className={styles.constructionCta}>
                  ← Back to Home
                </a>
                <p className={styles.etaText}>
                  Expected completion: Coming Soon
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}