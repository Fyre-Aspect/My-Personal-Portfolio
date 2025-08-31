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

export default function ActivitiesUnderConstruction() {
  const features: FeatureItem[] = [
    { icon: '💪', text: 'Fitness Journey' },
    { icon: '🌟', text: 'Community Impact' },
    { icon: '📚', text: 'Learning Adventures' },
    { icon: '🤝', text: 'Mentoring Stories' }
  ];

  const statusItems: StatusItem[] = [
    { icon: '✅', text: 'Activity Categories', status: 'completed' },
    { icon: '🔄', text: 'Personal Stories', status: 'in-progress' },
    { icon: '⏳', text: 'Photo Gallery', status: 'pending' },
    { icon: '⏳', text: 'Impact Metrics', status: 'pending' }
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
              
              <h1 className={styles.pageTitle}>Activities - Under Construction</h1>
              <p className={styles.pageSubtitle}>
                Documenting the experiences that shape my development philosophy through discipline and community
              </p>
            </div>

            <div className={`${styles.constructionContent} ${styles.fadeInUpDelay1}`}>
              <div className={styles.constructionMessage}>
                <h2>Beyond the Code</h2>
                <p>
                  Like implementing a comprehensive testing strategy, I'm thoughtfully organizing 
                  the activities and experiences that contribute to my growth as a developer and person. 
                  Each activity teaches lessons that directly enhance my professional capabilities.
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
                  <div className={styles.progressFill} style={{ width: '30%' }}></div>
                </div>
                <p className={styles.progressText}>30% Complete</p>
                
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
                  Expected completion: In Progress
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}