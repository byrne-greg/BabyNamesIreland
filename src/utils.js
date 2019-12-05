import enums from "./enums"

export function isMale (genderEnum) {
  return genderEnum.toUpperCase() === enums.GENDER.MALE
}
export function isFemale (genderEnum) {
  return genderEnum.toUpperCase() === enums.GENDER.FEMALE
}
export function isGender (gender, genderEnum) {
  return gender.toUpperCase() === genderEnum
}

export function getRankingSuffix (num) {
  if (num % 10 === 1 && num !== 11) { return `st` }
  if (num % 10 === 2 && num !== 12) { return `nd` }
  if (num % 10 === 3 && num !== 13) { return `rd` }
  return `th`
}

export function getFlattenedPeopleWithYearData (nameArray, yearString) {
  const peopleWithRelevantData = filterPersonsWithRelevantYearData(nameArray, [yearString])
  const flattenedPeopleWithRelevantData = peopleWithRelevantData.map(person => { const dataOfYearReq = person.data.filter(yearData => yearData.year === yearString)[0]; return { name: person.name, gender: person.gender, year: dataOfYearReq.year, rank: dataOfYearReq.rank, key: dataOfYearReq.rank, bornCount: dataOfYearReq.total } })

  return flattenedPeopleWithRelevantData
}

export function getPeopleDataFromPreviousYears (nameArray, years) {
  const peopleWithPreviousYearData = nameArray.map(person => { person.data = person.data.sort((a, b) => b.year - a.year).filter((_, index) => index < years); return person })
  return peopleWithPreviousYearData
}

function filterPersonsWithRelevantYearData (nameArray, yearsArr) {
  return nameArray.filter(person => person.data.filter(yearData => yearsArr.includes(yearData.year)).length > 0)
}

function getPersonsWithRelevantYearData (nameArray, yearsArr) {
  const peopleContainingRelevantData = filterPersonsWithRelevantYearData(nameArray, yearsArr)
  const peopleWithRelevantData = peopleContainingRelevantData.map(person => { return { name: person.name, gender: person.gender, data: person.data.filter(yearData => yearsArr.includes(yearData.year)) } })
  // NOTE: this will only return data where the person has year data for ALL the years specified in the yearsArr, not just a single year
  // This differs from the CSO where they will take also names that only exist for the latest year and not the year before
  return peopleWithRelevantData.filter(person => person.data.length === yearsArr.length)
}

export function getPersonDataWithRankChanges (nameArray, yearsArr) {
  const relevantPersonData = getPersonsWithRelevantYearData(nameArray, yearsArr)
  const nameRankChangeData = relevantPersonData.map(person => {
    return {
      name: person.name,
      gender: person.gender,
      currentRank: person.data.filter(yearData => Number(yearData.year) === Math.max(...yearsArr))[0].rank,
      rankChange: person.data.reduce((acc, val) => {
        let diff = 0
        if (acc === 0) { diff = acc + val.rank } else { diff = (acc - val.rank) }
        return diff
      }, 0),
    }
  })

  return nameRankChangeData
}
