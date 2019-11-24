import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Card, Table, InputNumber, Row, Col, Select } from 'antd'
import { isMale, isFemale } from "../../utils"
import enums from "../../enums"

const TopNameStatCard = ({ nameData, genderEnum = enums.GENDER.MALE, cardStyle = {}, tableStyle = {} }) => {
  const [filterByNum, setFilterByNum] = useState(5)

  // TODO extract function into the utils and break down further
  const headlineYear = `${new Date().getFullYear() - 1}`

  let cardTitle = `Top Male Names for ${headlineYear}`
  let isGenderFunction = isMale
  if (genderEnum === enums.GENDER.FEMALE) {
    cardTitle = `Top Female Names for ${headlineYear}`
    isGenderFunction = isFemale
  }

  const getTopFiveNameData = (genderedNameArray) => genderedNameArray.filter(person => person.data.filter(yearData => yearData.year === headlineYear).length > 0).map(person => { const dataOfYearReq = person.data.filter(yearData => yearData.year === headlineYear)[0]; return { name: person.name, gender: person.gender, year: dataOfYearReq.year, rank: dataOfYearReq.rank, key: dataOfYearReq.rank, bornCount: dataOfYearReq.total } }).filter(person => person.rank <= filterByNum).sort((a, b) => a.rank - b.rank)
  const displayNames = getTopFiveNameData(nameData.filter(person => isGenderFunction(person.gender)))

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
          <InputNumber id="name-num-filter" defaultValue={filterByNum} min={1} max={20} onChange={(num) => setFilterByNum(num)} style={{ width: `3rem`, margin: `5px` }}/>
        </Col>
        {/* <Col>
          <label htmlFor="type-filter">Filter by</label>
          <Select id="type-filter" defaultValue="rank" style={{ width: `5rem`, margin: `5px` }} onChange={(e) => { console.log(e) }} >
            <Select.Option value="rank">Rank</Select.Option>
            <Select.Option value="total">Total</Select.Option>
          </Select>
        </Col> */}
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
