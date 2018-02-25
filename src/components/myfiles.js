import React from 'react';

export default ({data})=><ul>{data.allFile.edges.map(({node,i})=><li key={i}>{node.relativePath}</li>)}</ul>



export const query=graphql`
query MyFilesQuery {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`