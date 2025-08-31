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

interface UnderConstructionProps {
  layout?: 'default' | 'centered' | 'floating';
  svgIcon?: React.ReactNode;
}

export default function AboutUnderConstruction({ 
  layout = 'default', 
  svgIcon 
}: UnderConstructionProps = {}) {
  const features: FeatureItem[] = [
    { icon: '👨‍💻', text: 'Professional Journey' },
    { icon: '💪', text: 'Fitness Philosophy' },
    { icon: '🧠', text: 'Learning Mindset' },
    { icon: '🎯', text: 'Core Values' }
  ];

  const statusItems: StatusItem[] = [
    { icon: '✅', text: 'Content Planning', status: 'completed' },
    { icon: '✅', text: 'Personal Story Writing', status: 'completed' },
    { icon: '✅', text: 'Skills Section Design', status: 'completed' },
    { icon: '🔄', text: 'Visual Elements', status: 'in-progress' }
  ];

  const renderIcon = () => {
    if (svgIcon) {
      return <div className={styles.svgIcon}>{svgIcon}</div>;
    }
    return (
      <div className={styles.catAnvilPlaceholder}>
        
      </div>
    );
  };

  if (layout === 'centered') {
    return (
      <>
        <Navigation />
        <main className={styles.pageContent}>
          <section className={styles.underConstructionSection}>
            <div className={styles.container}>
              <div className={styles.constructionLayout}>
                <div className={`${styles.constructionIcon} ${styles.centered}`}>
                  {renderIcon()}
                </div>
                
                <div className={`${styles.constructionContent} ${styles.withCenteredIcon} ${styles.fadeInUp}`}>
                  <div className={styles.constructionHero}>
                    <h1 className={styles.pageTitle}>About Me - Under Construction</h1>
                    <p className={styles.pageSubtitle}>
                      Crafting my personal story with the same precision I bring to code architecture
                    </p>
                  </div>

                  <div className={styles.constructionMessage}>
                    <h2>Building My Story</h2>
                    <p>
                      Just like refactoring legacy code, telling one's story requires careful consideration 
                      and structure. I'm applying the same methodical approach to create an authentic 
                      representation of my journey, values, and the unique perspective I bring to development.
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

                  <div className={styles.constructionStatus}>
                    <h3>Current Progress</h3>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '85%' }}></div>
                    </div>
                    <p className={styles.progressText}>85% Complete</p>
                    
                    <div className={styles.statusGrid}>
                      {statusItems.map((item, index) => (
                        <div key={index} className={`${styles.statusItem} ${styles[item.status]}`}>
                          <span className={styles.statusIcon}>{item.icon}</span>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.backLink}>
                    <a href="/" className={styles.constructionCta}>
                      ← Back to Home
                    </a>
                    <p className={styles.etaText}>
                      Expected completion: Very Soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  if (layout === 'floating') {
    return (
      <>
        <Navigation />
        <main className={styles.pageContent}>
          <section className={styles.underConstructionSection}>
            <div className={styles.container}>
              <div className={`${styles.constructionIcon} ${styles.floating} ${styles.floatingLeft}`}>
                {renderIcon()}
              </div>
              <div className={`${styles.constructionIcon} ${styles.floating} ${styles.floatingRight}`}>
                {renderIcon()}
              </div>
              
              <div className={`${styles.constructionHero} ${styles.fadeInUp}`}>
                <h1 className={styles.pageTitle}>About Me - Under Construction</h1>
                <p className={styles.pageSubtitle}>
                  Crafting my personal story with the same precision I bring to code architecture
                </p>
              </div>

              <div className={`${styles.constructionContent} ${styles.fadeInUpDelay1}`}>
                <div className={styles.constructionMessage}>
                  <h2>Building My Story</h2>
                  <p>
                    Just like refactoring legacy code, telling one's story requires careful consideration 
                    and structure. I'm applying the same methodical approach to create an authentic 
                    representation of my journey, values, and the unique perspective I bring to development.
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
                    <div className={styles.progressFill} style={{ width: '85%' }}></div>
                  </div>
                  <p className={styles.progressText}>85% Complete</p>
                  
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
                    Expected completion: Very Soon
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  // Default layout
  return (
    <>
      <Navigation />
      <main className={styles.pageContent}>
        <section className={styles.underConstructionSection}>
          <div className={styles.container}>
            <div className={`${styles.constructionHero} ${styles.fadeInUp}`}>
              <div className={styles.constructionIcon}>
                {renderIcon()}
              </div>
              
              <h1 className={styles.pageTitle}>About Me - Under Construction</h1>
              <p className={styles.pageSubtitle}>
                Crafting my personal story with the same precision I bring to code architecture
              </p>
            </div>

            <div className={`${styles.constructionContent} ${styles.fadeInUpDelay1}`}>
              <div className={styles.constructionMessage}>
                <h2>Building My Story</h2>
                <p>
                  Just like refactoring legacy code, telling one's story requires careful consideration 
                  and structure. I'm applying the same methodical approach to create an authentic 
                  representation of my journey, values, and the unique perspective I bring to development.
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
                  <div className={styles.progressFill} style={{ width: '85%' }}></div>
                </div>
                <p className={styles.progressText}>85% Complete</p>
                
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
                  Expected completion: Very Soon
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}