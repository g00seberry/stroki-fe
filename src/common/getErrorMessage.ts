import { AxiosError } from 'axios'
import { notification } from 'antd'
import { ArgsProps } from 'antd/es/notification/interface'
import { t } from 'i18next'

export const getErrorMessage = (e: Error): ArgsProps => {
  // eslint-disable-next-line no-console
  console.error(e) // чтобы проще найти место ошибки
  const axiosError = e as AxiosError
  if (axiosError?.isAxiosError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const info = axiosError.response?.data as any
    let description = `Статус: ${axiosError.response?.status}`

    if (info && typeof info === 'object') {
      const err0 = info.errors?.[0] || info[0]

      description =
        err0?.message ||
        err0?.defaultMessage ||
        err0 ||
        info.message ||
        description
    }
    if (axiosError?.response?.status === 400) {
      return { message: t('Errors.Warning'), description, type: 'warning' }
    }
    if (axiosError?.response?.status === 403) {
      return { message: t('Errors.Forbidden') }
    }
    return { message: t('Errors.Server error'), description }
  }
  return { message: e.message }
}

export const onError = (e: unknown): void => {
  const argProps: ArgsProps = { type: 'error', ...getErrorMessage(e as Error) }
  notification.open(argProps)
}
