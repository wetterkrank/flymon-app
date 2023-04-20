import dayjs from "dayjs"

export const formattedDate = (date: Date | null) => {
  return date ? dayjs(date).format("DD.MM.YYYY") : "none"
}

export const formattedApiDate = (date: Date | string) => {
  return dayjs(date).format("DD/MM/YYYY")
}
