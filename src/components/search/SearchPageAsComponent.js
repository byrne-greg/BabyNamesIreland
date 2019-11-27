import React, { useState } from "react"
import PropTypes from 'prop-types'
import { List, Card, Input } from 'antd'
import { navigate } from 'gatsby'
import SEO from "../seo"
import routes from "../../routes"
import styleColors from "../../style-colors"
import { isFemale } from "../../utils"

const sortBirthNamesList = birthNamesList => birthNamesList.sort((a, b) => {
  const aName = a.name.toUpperCase()
  const bName = b.name.toUpperCase()
  if (aName < bName) { return -1 }
  if (aName > bName) { return 1 }
  return 0
})

const SearchPageAsComponent = ({ data }) => {
  const initialBirthNames = sortBirthNamesList(data.allBirthNames.nodes)
  const [currentNameList, setCurrentNameList] = useState(initialBirthNames)

  const filterNameList = searchName => {
    let filteredNameList = initialBirthNames
    if (searchName !== ``) {
      // When a user searches for a name, they will likely start with the initial character of that name.
      // The result list should order the results with the characters that match the start of the name first before showing 'fuzzy' matches (names containing part of the name)
      // e.g. typing 'GA' should show 'Gary' first before 'Abigail'
      const startsWithSearchNameList = filteredNameList.filter(({ name }) => name.toUpperCase().startsWith(searchName.toUpperCase()))
      const containsSearchNameList = filteredNameList.filter(({ name }) => name.toUpperCase().includes(searchName.toUpperCase()))
      const containButNotStartsWithSearchNameList = containsSearchNameList.filter(person => startsWithSearchNameList.indexOf(person) < 0)
      filteredNameList = [
        ...startsWithSearchNameList,
        ...containButNotStartsWithSearchNameList]
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
    <>
      <SEO title="Search for Irish baby name" />
      <div style={{ display: `flex`, justifyContent: `center` }}>
        <label htmlFor="name-search" style={{
          color: `rgba(0, 0, 0, 0.85)`,
          fontWeight: `600`,
          fontSize: `1rem`,
        }}>Search for a baby name</label>
      </div>
      <Input.Search
        placeholder="type name here"
        size="large"
        enterButton
        onSearch={enteredValue => { filterNameList(enteredValue); if (currentNameList.length === 1) { navigate(`${routes.SEARCH_NAME}/${currentNameList[0].name}`) } }}
        onChange={event => { filterNameList(event.target.value) }}
        onClick={event => { event.target.value = ``; filterNameList(``) }}
        style={{ margin: `1rem` }}
        id="name-search"
      />
      <div style={{ maxHeight: `800px` }}>
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
      </div>
    </>
  )
}

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
SearchPageAsComponent.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SearchPageAsComponent
