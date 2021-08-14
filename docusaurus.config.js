module.exports = {
  onBrokenLinks: 'log',
  title: 'Atheme Services',
  tagline: 'Atheme is a feature-packed, extremely customisable IRC services daemon that is secure, stable and scalable.',
  url: 'https://atheme.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'atheme', // Usually your GitHub org/user name.
  projectName: 'atheme', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Atheme',
      items: [
        {
          to: 'docs/install',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/atheme/atheme',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/install',
            },
            {
              label: 'Using Atheme',
              to: 'docs/help/index',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'IRC - libera.chat/#atheme',
              href: 'ircs://irc.libera.chat/#atheme',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/atheme/atheme',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Atheme Development Group`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          sidebarPath: require.resolve('./sidebars.json'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/atheme/atheme.dev/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/atheme/atheme.dev/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
