/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it

const getNameData = require(`./src/api/csoBabyNameApiParser`)
const crypto = require(`crypto`)

// data fetching and transforming for gql queries
exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  await createBirthNameNode(createNode)
}

async function createBirthNameNode (createNode) {
  const birthNames = await getBirthNameDataFromCSO()

  // map into the name data results and create node
  birthNames.data.map((person, i) => {
    // Create your node object
    const birthNameNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `BirthNames`, // name of the graphQL query --> allBirthNames {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      gender: person.gender,
      name: person.name,
      data: person.data,

    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(birthNameNode))
      .digest(`hex`)
    // add it to userNode
    birthNameNode.internal.contentDigest = contentDigest

    // Create node with the gatsby createNode() API
    createNode(birthNameNode)
  })

  // create the latest year node
  const lastRecordedYearNode = {
    // Required fields
    id: `lry`,
    parent: `__SOURCE__`,
    internal: {
      type: `LastRecordedYear`, // name of the graphQL query
      // contentDigest will be added just after
      // but it is required
    },
    children: [],

    // Other fields that you want to query with graphQl
    lastRecordedYear: birthNames.lastRecordedYear,
  }
  // Get content digest of node. (Required field)
  const contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(lastRecordedYearNode))
    .digest(`hex`)
  // add it to userNode
  lastRecordedYearNode.internal.contentDigest = contentDigest
  createNode(lastRecordedYearNode)
}

async function getBirthNameDataFromCSO () {
  // fetch raw data from the birth name CSO statbank api
  const fetchBirthRegistrationBoysNames = () => getNameData(
    `https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA10`,
    `Male`,
  )

  const fetchBirthRegistrationGirlsNames = () => getNameData(
    `https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA11`,
    `Female`,
  )

  // await for results
  const res1 = await fetchBirthRegistrationBoysNames()
  const res2 = await fetchBirthRegistrationGirlsNames()
  const birthNames = sanitizeBirthNameData([...res1.nameData, ...res2.nameData])
  return { data: birthNames, lastRecordedYear: res1.lastRecordedYear }
}

function sanitizeBirthNameData (birthNameData) {
  const sanitizedBirthNameData = [...birthNameData]
  // we are removing any person data that has zero for rank and total. this indicates the CSO didn't record or the data was noted as statistically unreliable
  sanitizedBirthNameData.forEach(person => { person.data = person.data.filter(dataObj => dataObj.rank !== 0 && dataObj.total !== 0) })
  return sanitizedBirthNameData
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const birthNames = await graphql(`
      query {
        allBirthNames {
          nodes {
            gender
            name
            data {
              year
              total
              rank
            }
          }
        }
      }`)
  birthNames.data.allBirthNames.nodes.forEach(person => {
    createPage({
      path: `/name/${person.name}`,
      component: require.resolve(`./src/templates/person-info-page.js`),
      context: { person },
    })
  })
}
