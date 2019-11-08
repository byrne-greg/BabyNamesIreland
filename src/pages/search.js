import React, { useState } from "react"
import PropTypes from 'prop-types'
import { List, Card, Input } from 'antd'
import { graphql, navigate } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query SearchPageQuery {
    allBirthNames {
      nodes {
        gender
        name
      }
    }
  }  
`

const sortBirthNamesList = birthNamesList => birthNamesList.sort((a, b) => {
  const aName = a.name.toUpperCase()
  const bName = b.name.toUpperCase()
  if (aName < bName) { return -1 }
  if (aName > bName) { return 1 }
  return 0
})

const SearchPage = ({ data }) => {
  const initialBirthNames = sortBirthNamesList(data.allBirthNames.nodes)
  const [currentNameList, setCurrentNameList] = useState(initialBirthNames)

  const filterNameList = searchName => {
    let filteredNameList = initialBirthNames
    if (searchName !== ``) {
      filteredNameList = filteredNameList.filter(({ name }) => name.toUpperCase().includes(searchName.toUpperCase()))
    }
    setCurrentNameList(filteredNameList)
  }

  return (
    <Layout>
      <SEO title="Search" />
      <Input.Search
        placeholder="type name here"
        size="large"
        enterButton
        onSearch={enteredValue => { filterNameList(enteredValue) }}
        onChange={event => { filterNameList(event.target.value) }}
        onClick={event => { event.target.value = ``; filterNameList(``) }}
      />
      <List
        grid={{ gutter: 16, xs: 2, sm: 3, xl: 4 }}
        dataSource={currentNameList}
        pagination={{
          position: `both`,
          simple: true,
          defaultCurrent: 1,
          defaultPageSize: 40,
          pageSize: 40,
          total: currentNameList.length,
          style: { margin: `10px` },
        }}
        renderItem={item => (
          <List.Item>
            <Card
              style={
                item.gender.toUpperCase() === `FEMALE`
                  ? { backgroundColor: `#ffd6e7` }
                  : { backgroundColor: `#bae7ff` }
              }
              onClick={() => navigate(`/search/${item.name}`)}
            >
              <Card.Meta title={item.name} description={item.gender} />
            </Card>
          </List.Item>
        )}
      />
    </Layout>
  )
}

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
SearchPage.propTypes = {
  data: PropTypes.array.isRequired,
}

export default SearchPage
