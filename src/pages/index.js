import 'antd/dist/antd.css'
import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import { Row, Col, Card, Table } from 'antd'
import Layout, { Section } from "../components/layout"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
import { isMale, isFemale } from "../utils"
import SearchPageAsComponent from "../components/search/SearchPageAsComponent"
import routes from "../routes"

export const query = graphql`
  query IndexPageQuery {
    allBirthNames {
      nodes {
        gender
        name
        data {
          rank
          total
          year
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const IndexPage = ({ data }) => {
  // TODO extract function into the utils and break down further
  const headlineYear = `${new Date().getFullYear() - 1}`
  const getTopFiveNameData = (genderedNameArray) => genderedNameArray.filter(person => person.data.filter(yearData => yearData.year === headlineYear).length > 0).map(person => { const dataOfYearReq = person.data.filter(yearData => yearData.year === headlineYear)[0]; return { name: person.name, gender: person.gender, year: dataOfYearReq.year, rank: dataOfYearReq.rank, key: dataOfYearReq.rank, bornCount: dataOfYearReq.total } }).filter(person => person.rank <= 5).sort((a, b) => a.rank - b.rank)

  const babyNames = data.allBirthNames.nodes
  const maleNames = babyNames.filter(person => isMale(person.gender))
  const femaleNames = babyNames.filter(person => isFemale(person.gender))
  const topFiveMaleNames = getTopFiveNameData(maleNames)
  const topFiveFemaleNames = getTopFiveNameData(femaleNames)

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
    <Layout>
      <SEO title="Home" />
      {/* Hero */}
      <Section>
        <h1>{data.site.siteMetadata.title}</h1>
      </Section>
      {/* Blurb */}
      <Section>
        <p>Some descriptive (or perhaps minimalist) blurb about the purpose of this corner of the internet</p>
        <LinkButton to={routes.ABOUT}>About</LinkButton>
      </Section>
      {/* Top Stats */}
      <Section>
        <Row type="flex" justify="space-around">
          <Col>
            <Card title={`Top Male Names for ${headlineYear}`} style={{ margin: `1rem 0.5rem` }}>
              <Table pagination={false} dataSource={topFiveMaleNames} columns={columns}/>
            </Card>
          </Col>
          <Col>
            <Card title={`Top Female Names for ${headlineYear}`}>
              <Table pagination={false} dataSource={topFiveFemaleNames} columns={columns}/>
            </Card>
          </Col>
        </Row>
      </Section>
      {/* Search */}
      <Section>
        <SearchPageAsComponent data={data}/>
      </Section>

      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
       */}
    </Layout>
  )
}

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage
