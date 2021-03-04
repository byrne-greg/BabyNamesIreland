import React, { useState } from "react"
import PropTypes from 'prop-types'
import { List, Card } from 'antd'
import { navigate } from 'gatsby'
import NameSearchInput from './NameSearchInput'
import routes from "../../routes"
import styleColors from "../../style-colors"
import { isFemale } from "../../utils"

const nameSearchResultCache = {};

const sortBirthNamesList = birthNamesList => birthNamesList.sort((a, b) => {
  const aName = a.name.toUpperCase()
  const bName = b.name.toUpperCase()
  if (aName < bName) { return -1 }
  if (aName > bName) { return 1 }
  return 0
})

const NameSearch = ({ data, showNamesByDefault = false }) => {
  const initialBirthNameData = sortBirthNamesList(data.allBirthNames.nodes)
  const [currentNameList, setCurrentNameList] = useState(initialBirthNameData)
  const [isActive, setIsActive] = useState(false)
  nameSearchResultCache['none'] = initialBirthNameData;
  console.log('nameSearchResultCache', nameSearchResultCache);

  const filterNameList = searchName => {
    let filteredNameList = initialBirthNameData
    if (searchName === ``) {
      setCurrentNameList(nameSearchResultCache['none'])
    }
    console.log('nameSearchResultCache[searchName]', !!nameSearchResultCache[searchName])
    if (nameSearchResultCache[searchName]) {
      setCurrentNameList(nameSearchResultCache[searchName])
    }
    console.log('searchName !== `` && !nameSearchResultCache[searchName]', searchName !== `` && !nameSearchResultCache[searchName])
    if (searchName !== `` && !nameSearchResultCache[searchName]) {
      // When a user searches for a name, they will likely start with the initial character of that name.
      // The result list should order the results with the characters that match the start of the name first before showing 'fuzzy' matches (names containing part of the name)
      // e.g. typing 'GA' should show 'Gary' first before 'Abigail'
      const startsWithSearchNameList = filteredNameList.filter(({ name }) => name.toUpperCase().startsWith(searchName.toUpperCase()))
      const containsSearchNameList = filteredNameList.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase() || (person.name.toUpperCase().includes(searchName.toUpperCase()) && startsWithSearchNameList.indexOf(person) < 0 ) ))
      filteredNameList = [
        ...startsWithSearchNameList,
        ...containsSearchNameList]
      nameSearchResultCache[searchName] = filteredNameList
      setCurrentNameList(filteredNameList)
    }
  }

  const getCardStyle = (gender) => {
    const style = {
      borderRadius: `1.5rem`,
      cursor: 'pointer'
    }
    isFemale(gender)
      ? style.backgroundColor = styleColors.CARD.FEMALE_BACKGROUND_COLOR
      : style.backgroundColor = styleColors.CARD.MALE_BACKGROUND_COLOR

    return style
  }

  return (
    <>
      <NameSearchInput 
        onSearch={enteredValue => {
          setIsActive(true)
          filterNameList(enteredValue)
          if (currentNameList.length === 1) { navigate(`${routes.NAME_SEARCH}/${currentNameList[0].name}`) }
        }}
        onChange={event => { setIsActive(true); filterNameList(event.target.value) }}
        onClick={event => { setIsActive(true); event.target.value = ``; filterNameList(``) }}/>
        {isActive || showNamesByDefault
          ? (<div style={{ maxHeight: `800px` }}>
            <List
              grid={{ gutter: 16, xs: 2, sm: 3, xl: 4 }}
              dataSource={currentNameList}
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
        </div>) : null}
    </>
  )
}

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
NameSearch.propTypes = {
  data: PropTypes.object.isRequired,
  showNamesByDefault: PropTypes.bool,
}

export default NameSearch
