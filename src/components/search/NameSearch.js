import React, { useState, useContext, useEffect } from "react"
import PropTypes from 'prop-types'
import { List, Card } from 'antd'
import { navigate } from 'gatsby'
import NameSearchInput from './NameSearchInput'
import routes from "../../routes"
import styleColors from "../../style-colors"
import { isFemale } from "../../utils"
import { GlobalDispatchContext, GlobalStateContext } from "../../context/global/GlobalContextProvider"
import { addCachedSearchResult } from "../../context/global/actions"

const getCardStyle = (gender) => {
  const style = {
    borderRadius: `1.5rem`,
    cursor: `pointer`,
  }
  isFemale(gender)
    ? style.backgroundColor = styleColors.CARD.FEMALE_BACKGROUND_COLOR
    : style.backgroundColor = styleColors.CARD.MALE_BACKGROUND_COLOR

  return style
}

const sortBirthNamesList = birthNamesList => birthNamesList.sort((a, b) => {
  const aName = a.name.toUpperCase()
  const bName = b.name.toUpperCase()
  if (aName < bName) { return -1 }
  if (aName > bName) { return 1 }
  return 0
})

const calculateActiveNameList = (searchName, searchResultCache, activeNameList) => {
  if (searchName === ``) {
    return searchResultCache.none
  }

  if (searchResultCache[searchName]) {
    return searchResultCache[searchName]
  }

  if (!searchResultCache[searchName]) {
    // When a user searches for a name, they will likely start with the initial character of that name.
    // The result list should order the results with the characters that match the start of the name first before showing 'fuzzy' matches (names containing part of the name)
    // e.g. typing 'GA' should show 'Gary' first before 'Abigail'
    const startsWithSearchNameList = activeNameList.filter(({ name }) => name.toUpperCase().startsWith(searchName.toUpperCase()))
    const containsSearchNameList = activeNameList.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase() && (person.name.toUpperCase().includes(searchName.toUpperCase()) && startsWithSearchNameList.indexOf(person) < 0)))

    const filteredNameList = [
      ...startsWithSearchNameList,
      ...containsSearchNameList]

    return filteredNameList
  }
}

const NameSearch = ({ data, showNamesByDefault = false }) => {
  const globalDispatch = useContext(GlobalDispatchContext)
  const { searchResultCache } = useContext(GlobalStateContext)

  const [activeNameList, setActiveNameList] = useState(data.allBirthNames.nodes)
  const [isActive, setIsActive] = useState(false)

  // create an active list
  useEffect(() => {
    setActiveNameList(sortBirthNamesList(data.allBirthNames.nodes))
  }, [data.allBirthNames.nodes, sortBirthNamesList, setActiveNameList])

  // prepopulate the search result cache with initial values
  // the combinations of the first two letters have the most results
  useEffect(() => {
    const sortedBirthNames = sortBirthNamesList(data.allBirthNames.nodes)
    addCachedSearchResult(globalDispatch, { none: sortedBirthNames })
    const alphabetArray = `a b c d e f g h i j k l m n o p q r s t u v w x y z`.split(` `)
    const initialCacheSearchResults = {}
    alphabetArray.forEach(firstLetter => {
      initialCacheSearchResults[firstLetter] = calculateActiveNameList(firstLetter, searchResultCache, sortedBirthNames)
      alphabetArray.forEach(secondLetter => {
        const firstSecondLetter = `${firstLetter}${secondLetter}`
        initialCacheSearchResults[firstSecondLetter] = calculateActiveNameList(firstSecondLetter, searchResultCache, sortedBirthNames)
      })
    })
    addCachedSearchResult(globalDispatch, initialCacheSearchResults)
  }, [sortBirthNamesList, calculateActiveNameList, addCachedSearchResult])

  const getActiveNameListForName = name => {
    const nameList = calculateActiveNameList(name, searchResultCache, activeNameList)
    if (name && name !== ``) {
      const searchResult = {}
      searchResult[name] = nameList
      addCachedSearchResult(globalDispatch, searchResult)
    }
    setActiveNameList(nameList)
  }

  return (
    <>
      <NameSearchInput
        onSearch={enteredValue => {
          setIsActive(true)
          getActiveNameListForName(enteredValue)
          if (activeNameList.length === 1) { navigate(`${routes.NAME_SEARCH}/${activeNameList[0].name}`) }
        }}
        onChange={event => {
          setIsActive(true)
          getActiveNameListForName(event.target.value)
        }}
        onClick={event => { setIsActive(true); event.target.value = ``; getActiveNameListForName(``) }}/>
      {isActive || showNamesByDefault
        ? (
          <div style={{ maxHeight: `800px` }}>
            <NameCardList nameList={activeNameList} />
          </div>) : null}
    </>
  )
}

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
NameSearch.propTypes = {
  data: PropTypes.object.isRequired,
  showNamesByDefault: PropTypes.bool,
}

// eslint-disable-next-line react/prop-types
const NameCardList = ({ nameList = [] }) => (
  <List
    grid={{ gutter: 16, xs: 2, sm: 3, xl: 4 }}
    dataSource={nameList}
    pagination={{
      showSizeChanger: true,
      defaultPageSize: 100,
      pageSizeOptions: [`50`, `100`, `300`, `500`],
      total: nameList.length,
      position: `both`,
    }}
    renderItem={item => (
      <List.Item>
        <Card
          style={getCardStyle(item.gender)}
          onClick={() => navigate(routes.PERSON_INFO(item.name))}
        >
          <Card.Meta title={item.name} description={item.gender} />
        </Card>
      </List.Item>

    )}
  />
)

export default NameSearch
