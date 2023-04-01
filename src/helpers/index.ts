import dayjs from "dayjs"

export const formattedDate = (date: Date | null) => {
  return date ? dayjs(date).format("DD.MM.YYYY") : "none"
}
