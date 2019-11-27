import enums from "./enums"

export function isMale (genderEnum) {
  return genderEnum.toUpperCase() === enums.GENDER.MALE
}
export function isFemale (genderEnum) {
  return genderEnum.toUpperCase() === enums.GENDER.FEMALE
}

export function getRankingSuffix (num) {
  if (num % 10 === 1 && num !== 11) { return `st` }
  if (num % 10 === 2 && num !== 12) { return `nd` }
  if (num % 10 === 3 && num !== 13) { return `rd` }
  return `th`
}

export function getFlattenedPeopleWithYearData (nameArray, yearString) {
  const peopleWithRelevantData = nameArray.filter(person => person.data.filter(yearData => yearData.year === yearString).length > 0)
  const flattenedPeopleWithRelevantData = peopleWithRelevantData.map(person => { const dataOfYearReq = person.data.filter(yearData => yearData.year === yearString)[0]; return { name: person.name, gender: person.gender, year: dataOfYearReq.year, rank: dataOfYearReq.rank, key: dataOfYearReq.rank, bornCount: dataOfYearReq.total } })

  return flattenedPeopleWithRelevantData


}
