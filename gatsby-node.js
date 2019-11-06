/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it


const getNameData = require("./src/api/csoBabyNameApiParser");
const axios = require('axios');
const crypto = require('crypto')

// data fetching and transforming for gql queries
exports.sourceNodes = async ({ actions }) => {
    const { createNode } = actions;
  
   await createBirthNameNode(createNode);
  
    return;
  }

async function createBirthNameNode(createNode) {
 
    const birthNames = await getBirthNameDataFromCSO();   
    

    // map into these results and create nodes
    birthNames.map((person, i) => {
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
      name: person.name
    }
  
    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(birthNameNode))
      .digest(`hex`);
    // add it to userNode
    birthNameNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(birthNameNode);
  });
}

async function getBirthNameDataFromCSO() {
     // fetch raw data from the birth name CSO statbank api
  const fetchBirthRegistrationBoysNames = () => getNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA10",
    "Male"
  );

  const fetchBirthRegistrationGirlsNames = () => getNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA11",
    "Female"
  );

  // // await for results
  // TODO why does this not work?
  // const babyNames = await axios.all(fetchBirthRegistrationBoysNames(), fetchBirthRegistrationGirlsNames()).then(result => { return [...result[0], ...result[1]]});
  const res1 = await fetchBirthRegistrationBoysNames();
  const res2 = await fetchBirthRegistrationGirlsNames();
  const birthNames = [ ...res1, ...res2];
  return birthNames;
}


exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const birthNames = await graphql(`
      query {
        allBirthNames {
          nodes {
            gender
            name
          }
        }
      }`);
      birthNames.data.allBirthNames.nodes.forEach(person => {
      createPage({
        path: `/search/${person.name}`,
        component: require.resolve(`./src/templates/person-template.js`),
        context: { person },
      })
    })

    
  }