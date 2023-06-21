/**
 * Данная функция предназначена для формирования урлов в пределах приложения для использования в <Link to=... />
 * @param urlId
 * @param params
 * @returns
 */
export const makeUrl = <T extends object = object>(
  urlId: string,
  params?: T
): string => {
  let url = urlId as string
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      url = url.replace(`:${key}`, String(val))
    })
  }
  return url
}
