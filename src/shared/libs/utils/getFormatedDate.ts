/**
 * Форматирование даты для таблиц
 * @param initDate string
 * @returns отформатированная дата. Н-р: 22 февраля 2022 г. 22:22
 */
const getFormatedDate = (initDate: string): string => {
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const myDate: Date = new Date(initDate)
    const formatedDate: string = `${myDate.getDate()} ${months[myDate.getMonth()]} ${myDate.getFullYear()} г. ${myDate.toLocaleTimeString().slice(0, -3)}`
    return formatedDate
}
export default getFormatedDate
