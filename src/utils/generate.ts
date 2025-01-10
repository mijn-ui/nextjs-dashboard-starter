/**
 * Returns a random integer between 0 and the specified length.
 *
 * @param length - The upper bound (exclusive) for the random number.
 * @returns A random integer between 0 and length.
 */

export const getRandomItem = (length: number): number => {
  return Math.floor(Math.random() * length)
}

/* -------------------------------------------------------------------------- */

/**
 * Generates a random date and time within the specified range.
 *
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns An object containing the random date and time.
 * @property date - The formatted date string.
 * @property time - The formatted time string.
 */

export const getRandomDateTime = (
  startDate: Date = new Date(new Date().setMonth(new Date().getMonth() - 1)),
  endDate: Date = new Date(),
): { date: string; time: string } => {
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime()),
  )

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const date = `${months[randomDate.getMonth()]} ${randomDate.getDate()}, ${randomDate.getFullYear()}`

  let hours = randomDate.getHours()
  const minutes = randomDate.getMinutes().toString().padStart(2, "0")
  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12 // Convert to 12-hour format
  const time = `${hours}:${minutes} ${ampm}`

  return { date, time }
}

/* -------------------------------------------------------------------------- */

/**
 * Generates a random alphanumeric string of the specified length.
 *
 * @param length - The length of the generated string.
 * @returns A random alphanumeric string.
 */
export const getRandomString = (length: number = 8): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/* -------------------------------------------------------------------------- */

/**
 * Generates an array of time strings for each hour in a day.
 *
 * @param format - The format of the time strings ("HH:00" or "HH:MM").
 * @returns An array of time strings in the specified format.
 */
export const getTimeInADayArray = (
  format: "HH:00" | "HH:MM" = "HH:00",
): string[] => {
  const timeArray: string[] = []
  for (let hour = 0; hour < 24; hour++) {
    const time =
      hour.toString().padStart(2, "0") + (format === "HH:00" ? ":00" : ":00:00")
    timeArray.push(time)
  }
  return timeArray
}

/* -------------------------------------------------------------------------- */

/**
 * Generates an array of path objects from a given path string.
 *
 * @param path - The input path string.
 * @returns An array of path objects.
 */
export const generatePaths = (
  path: string,
): Array<{ name: string; link: string }> => {
  if (!path) {
    return [{ name: "", link: "" }]
  }
  const parts = path.split("/").filter((part) => part !== "")

  return parts.reduce<{ name: string; link: string }[]>((acc, part, index) => {
    const newPath = index === 0 ? `/${part}` : `${acc[index - 1].link}/${part}`
    const partObject = { name: part, link: newPath }

    return [...acc, partObject]
  }, [])
}
