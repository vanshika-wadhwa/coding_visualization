import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">

        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">
          Learn Data Structures and Algorithms through interactive visualizations
        </p>

        <div className={styles.buttons}>

          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            📚 View Documentation
          </Link>

          <Link
            className="button button--outline button--lg margin-left--md"
            to="http://localhost:8000">
            🚀 Open Web Application
          </Link>

        </div>

      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`Home | ${siteConfig.title}`}
      description="Interactive platform to learn data structures and algorithms">

      <HomepageHeader />

      <main>
        <HomepageFeatures />
      </main>

    </Layout>
  );
}