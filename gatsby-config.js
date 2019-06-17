module.exports = {
    siteMetadata: {
        navbarLinks: [{
                to: "/patterns",
                name: "Patterns"
            },
            {
                to: "/lifestyle",
                name: "Lifestyle"
            },
            {
                to: "/blog",
                name: "Blog"
            },
        ],
        title: "CrochetBae",
        description: "Crochetcrochetcrochet",
        siteUrl: "https://crochetbae.com",
        homepageHeader: "Welcome to Crochet Bae!",
        homepageAbout: "Modern and fashionable patterns with a hint of whimsy thrown in for good measure.",
        mailChimpUrl: "https://mailchimp.com",
        mailChimpToken: "MAILCHIMP TOKEN HERE",
        pinterest: "https://www.pinterest.com/alainacrochets/", // YOUR PINTEREST PROFILE HERE
        instagram: "https://instagram.com/crochetbae", // YOUR INSTAGRAM PROFILE HERE
        twitter: "https://twitter.com/thecrochetbae", // YOUR TWITTER PROFILE HERE
    },
    plugins: [
        'gatsby-plugin-sitemap',
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
                feeds: [{
                    serialize: ({
                        query: {
                            site,
                            allMarkdownRemark
                        }
                    }) => {
                        return allMarkdownRemark.edges.map(edge => {
                            return Object.assign({}, edge.node.frontmatter, {
                                description: edge.node.excerpt,
                                date: edge.node.frontmatter.date,
                                url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                                guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                                custom_elements: [{
                                    "content:encoded": edge.node.html
                                }],
                            })
                        })
                    },
                    query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {frontmatter: {type: {eq: "post"}}}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      slug
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
                    output: "/rss.xml",
                    title: "Gatsby RSS Feed",
                }, ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content`,
                name: 'content',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-copy-linked-files',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 1400,
                        },
                    },
                ],
            }
        },
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Karla', 'Playfair Display', 'Lora']
                }
            }
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: "",
                head: false,
                anonymize: true,
                respectDNT: true,
                exclude: ['/success'],
                cookieDomain: "tyra-starter.netlify.com",
            }
        }
    ]
}