import { Rule } from 'antd/es/form'

export const phoneValidator = (): Rule => ({
  pattern: /^(\+7)?[0-9]{3}[0-9]{3}[0-9]{4,6}$/,
  message: 'Неверный формат телефонного номера',
})

export const emailValidator = () => ({
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: 'Неверный формат email',
})

export const required = (): Rule => ({
  required: true,
  message: 'Обязательное поле',
})

export const captchaLength = (): Rule => ({
  min: 4,
  message: 'Капча должна содержать 4 символа',
})

export const onlyNumbers = (): Rule => ({
  pattern: /^\d*$/,
  message: 'Только цифры',
})
