import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Card, Table, InputNumber, Row, Col } from 'antd'
import { isMale, isFemale, getFlattenedPeopleWithYearData } from "../../utils"
import enums from "../../enums"

const TopNameStatCard = ({ nameData, genderEnum = enums.GENDER.MALE, cardStyle = {}, tableStyle = {} }) => {
  const [filterByNum, setFilterByNum] = useState(5)

  const headlineYear = `${new Date().getFullYear() - 1}`
  let cardTitle = `Top Male Names for ${headlineYear}`
  let isGenderFunction = isMale
  if (genderEnum === enums.GENDER.FEMALE) {
    cardTitle = `Top Female Names for ${headlineYear}`
    isGenderFunction = isFemale
  }

  const flattedPeopleWithRelevantYearData = getFlattenedPeopleWithYearData(nameData.filter(person => isGenderFunction(person.gender)), headlineYear)
  const displayNames = flattedPeopleWithRelevantYearData.filter(person => person.rank <= filterByNum).sort((a, b) => a.rank - b.rank)

  const columns = [
    {
      title: `Rank`,
      dataIndex: `rank`,
      key: `rank`,
    },
    {
      title: `Name`,
      dataIndex: `name`,
      key: `name`,
    },
    {
      title: `# Born`,
      dataIndex: `bornCount`,
      key: `bornCount`,
    },
  ]

  return (
    <Card title={cardTitle} style={cardStyle}>
      <Row type="flex" align="middle" justify="space-around">
        <Col>
          <label htmlFor="name-num-filter"># of Names</label>
          <InputNumber id="name-num-filter" defaultValue={filterByNum} min={1} max={20} onChange={(num) => setFilterByNum(num)} style={{ width: `3.5rem`, margin: `5px` }}/>
        </Col>
      </Row>
      <Table pagination={false} dataSource={displayNames} columns={columns} style={tableStyle}/>
    </Card>
  )
}

export default TopNameStatCard

TopNameStatCard.propTypes = {
  nameData: PropTypes.array.isRequired,
  genderEnum: PropTypes.string.isRequired,
  cardStyle: PropTypes.object,
  tableStyle: PropTypes.object,
}
