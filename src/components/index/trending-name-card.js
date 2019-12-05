import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Card, Table, InputNumber, Row, Col, Select } from 'antd'
import { isGender, getPersonDataWithRankChanges } from "../../utils"
import enums from "../../enums"

const TrendingNameStatCard = ({ nameData, direction = enums.MOVEMENT.UP, cardStyle = {}, tableStyle = {} }) => {
  const [numFilter, setFilterByNum] = useState(5)
  const [genderFilter, setFilterByGender] = useState(enums.GENDER.ALL)

  const movementTypePlaceholder = (up, down) => direction === enums.MOVEMENT.DOWN ? down : up

  const currentYear = new Date().getFullYear()
  const comparisonYears = [`${currentYear - 1}`, `${currentYear - 2}`]

  let displayNames = getPersonDataWithRankChanges(nameData, comparisonYears).sort((a, b) => movementTypePlaceholder(b.rankChange - a.rankChange, a.rankChange - b.rankChange))
  displayNames = genderFilter !== enums.GENDER.ALL ? displayNames.filter(person => isGender(person.gender, genderFilter)) : displayNames
  displayNames = displayNames.filter((_, i) => i < numFilter)
  // at this point, we've sorted based on rankChange value so change an minus numbers to natural numbers and add a key
  displayNames.forEach(person => { person.rankChange = person.rankChange < 0 ? person.rankChange * -1 : person.rankChange })
  // add a key for the tablerows
  displayNames.forEach(person => { person.key = `trending-name-card-${direction}-${person.name}` })

  const columns = [
    {
      title: `Name`,
      dataIndex: `name`,
      key: `trending-name-card-${direction}-name`,
    },
    {
      title: `Current Rank`,
      dataIndex: `currentRank`,
      key: `trending-name-card-${direction}-currentRank`,
      align: `center`,
    },
    {
      title: `${movementTypePlaceholder(`Up`, `Down`)} Places`,
      dataIndex: `rankChange`,
      key: `trending-name-card-${direction}-rankChange`,
      align: `center`,
    },
  ]
  return (
    <Card title={`${movementTypePlaceholder(`Rising`, `Losing`)} Popularity (${comparisonYears.sort((a, b) => a - b).reduce((acc, val) => `${acc} - ${val}`)})`} style={cardStyle}>
      <Row type="flex" align="middle" justify="space-around">
        <Col>
          <label htmlFor="name-num-filter"># of Names</label>
          <InputNumber id="name-num-filter"
            defaultValue={numFilter} min={1} max={20} onChange={(num) => setFilterByNum(num)} style={{ width: `3.5rem`, margin: `5px` }}/>
        </Col>
        <Col>
          <Select defaultValue={enums.GENDER.ALL} style={{ width: 120 }} onChange={(genderEnumSelected) => { setFilterByGender(genderEnumSelected) }}>
            <Select.Option value={enums.GENDER.ALL}>All</Select.Option>
            <Select.Option value={enums.GENDER.MALE}>Male</Select.Option>
            <Select.Option value={enums.GENDER.FEMALE}>Female</Select.Option>
          </Select>
        </Col>
      </Row>
      <Table pagination={false} dataSource={displayNames} columns={columns} style={tableStyle}/>
    </Card>
  )
}

export default TrendingNameStatCard

TrendingNameStatCard.propTypes = {
  nameData: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
  cardStyle: PropTypes.object,
  tableStyle: PropTypes.object,
}
