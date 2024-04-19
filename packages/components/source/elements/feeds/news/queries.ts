export const ARTICLES_QUERY = `
  query getArticles($related: [QueryArgument], $relatedToAll: [QueryArgument], $limit: Int, $offset: Int) {
    entryCount(section: "articles", relatedTo: $related,relatedToAll: $relatedToAll)
    entries(
      section: "articles",
      relatedTo: $related,
      relatedToAll: $relatedToAll,
      limit: $limit,
      offset: $offset,
    ) {
      ... on articles_today_Entry {
        id
        title
        date: postDate
        dateFormatted: postDate @formatDateTime(format: "M d, Y")
        summary: genericText
        url
        image:articlesHeroImage {
          url
          ... on hero_Asset {
            id
            altText: genericText
          }
        }
        categories:categoryTodaySectionMultiple {
          title
          url
        }
      }
    }
  }
`;
