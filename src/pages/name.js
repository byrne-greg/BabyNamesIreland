import React, { useState } from "react"
import PropTypes from 'prop-types'
import { List, Card, Input } from 'antd'
import { graphql, navigate } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import routes from "../routes"
import styleColors from "../style-colors"
import { isFemale } from "../utils"

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

  const getCardStyle = (gender) => {
    const style = {
      borderRadius: `1.5rem`,
    }
    isFemale(gender)
      ? style.backgroundColor = styleColors.CARD.FEMALE_BACKGROUND_COLOR
      : style.backgroundColor = styleColors.CARD.MALE_BACKGROUND_COLOR

    return style
  }

  return (
    <Layout>
      <SEO title="Search for Irish baby name" />
      <Input.Search
        placeholder="type name here"
        size="large"
        enterButton
        onSearch={enteredValue => { filterNameList(enteredValue); if (currentNameList.length === 1) { navigate(`${routes.SEARCH_NAME}/${currentNameList[0].name}`) } }}
        onChange={event => { filterNameList(event.target.value) }}
        onClick={event => { event.target.value = ``; filterNameList(``) }}
        style={{ margin: `1rem` }}
      />
      <List
        grid={{ gutter: 16, xs: 2, sm: 3, xl: 4 }}
        dataSource={currentNameList}
        renderItem={item => (
          <List.Item>
            <Card
              style={getCardStyle(item.gender)}
              onClick={() => navigate(`/name/${item.name}`)}
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
