import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Ubiquity</>,
    imageUrl: 'img/undraw_connected_world_wuay.svg',
    description: (
      <>
        Not only are more and more networks using Atheme every day, 
        but some of IRC's most well-known networks are already using Atheme. 
        Networks such as <a href="https://libera.chat">Libera Chat</a>, <a href="http://www.esper.net/">EsperNet</a>, 
         and <a href="http://darkmyst.org/">DarkMyst</a> are all relying on Atheme IRC services.
      </>
    ),
  },
  {
    title: <>Customisable</>,
    imageUrl: 'img/undraw_forming_ideas_0pav.svg',
    description: (
      <>
        Atheme comes prebundled with over 250 modules and 
        you can find over 50 additional modules in our contributed modules repository on GitHub.
      </>
    ),
  },
  {
    title: <>Fast + Efficient</>,
    imageUrl: 'img/undraw_Outer_space_drqu.svg',
    description: (
      <>
        The Internet is faster than ever before. Computers are exponentially speedier 
        than any time in the past. Shouldn't your IRC services be fast too? Atheme IRC 
        services not only are lightning fast, but are also the most scalable modern IRC services package available.
      </>
    ),
  },
  {
    title: <>Compatibility</>,
    imageUrl: 'img/undraw_server_q2pb.svg',
    description: (
      <>
        Atheme supports linking to over twenty different IRC daemons. 
        For a full list of supported IRCds, view our compatibility report.
      </>
    ),
  },
  {
    title: <>Extensible</>,
    imageUrl: 'img/undraw_programmer_imem.svg',
    description: (
      <>
        Even something as featureful as Atheme might not have everything your network needs. 
        For those cases, Atheme offers both an extremely clean C API and a powerful, 
        well-structured Perl interface. Extending services has never been easier!
      </>
    ),
  },
  {
    title: <>Feature-Packed</>,
    imageUrl: 'img/undraw_collecting_fjjl.svg',
    description: (
      <>
        Atheme has all the features you've come to expect from modern IRC services, 
        such as BotServ and HostServ, as well as innovative new features, such as GroupServ, CHANFIX and InfoServ.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Documentation`}
      description="Atheme Services development and usage documentation">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/install')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
