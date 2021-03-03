const axios = require(`axios`)
const JSONstat = require(`jsonstat`)

module.exports = function getNameData (csoUrl, gender) {
  console.log(`API_REQUEST: Requesting info from ${csoUrl}`)
  return axios.get(csoUrl).then(response => {

    const dataset = JSONstat(response.data).Dataset(0)
    // console.log(`CSO DATASET`, dataset)

    const dimensionKey = {};
    const reqDimensions = {}
    dataset.id.forEach(id => {
     let dimensionData = dataset.Dimension(id);
      if(dimensionData.label === 'Name') {
        console.log("Computing Name Dimension")
        reqDimensions.nameDimension = dimensionData;
        dimensionKey.Name = id;
      }
      if(dimensionData.label === 'Year') {
        console.log("Computing Year Dimension")
        reqDimensions.yearDimension = dimensionData;
        dimensionKey.Year = id;
      }
      if(dimensionData.label === 'Statistic') {
        console.log("Computing Statistic Dimension")
        reqDimensions.statDimension = dimensionData;
        dimensionKey.Statistic = id;
      }
    })

    console.log(`Computed Dimensions`, dimensionKey)

    const { nameDimension, yearDimension, statDimension } = reqDimensions;
    
    // const nameDimension = dataset.Dimension(`Name`)
    // const yearDimension = dataset.Dimension(`Year`)
    // const statDimension = dataset.Dimension(`Statistic`)

    const nameData = nameDimension.id.map(nameCode => ({
      id: nameCode,
      name: nameDimension.Category(nameCode).label,
      gender,
      data: yearDimension.id.map(yearCode => {
        const isRankStat = statCode =>
          statDimension.Category(statCode).label.indexOf(`Rank`) !== -1

        const getStatValue = isRankingStat => {
          const totalNumData = () =>
            dataset.Data({
              [dimensionKey.Name]: nameCode,
              [dimensionKey.Year]: yearCode,
              [dimensionKey.Statistic]: statDimension.id.filter(
                statCode =>
                  isRankingStat ? isRankStat(statCode) : !isRankStat(statCode),
              )[0],
            }).value
          return totalNumData() !== null ? totalNumData() : 0
        }

        return {
          year: yearCode,
          total: getStatValue(false),
          rank: getStatValue(true),
        }
      }),
    }))

    const lastRecordedYear = yearDimension.id.map(stringYear => parseInt(stringYear)).reduce((highestYear, year) => year > highestYear ? year : highestYear, 0)
    const birthNameData = { nameData: nameData, lastRecordedYear: lastRecordedYear }
    return birthNameData
  })
}
