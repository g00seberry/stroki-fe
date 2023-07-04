/**
 * Есть случаи, когда в параметрах url передается action
 * который нужно обработать, например при смене пароля:
 * 1) пользователь заполяет форму для сброса пароля
 * 2) на сервере новый пароль сохранятся в отложенное,
 *    создается ссылка для сброса пароля и отправляется на почту пользователю
 * 3) при переходе по ссылке из письма происходит запрос на сервер, проверяется
 *    актуальность ссылки для сброса пароля, если все ок, то отложенный пароль сохраняется
 *    как основной
 * 4) сервер делает redirect на корень приложения, добавляя action = resetPassword в параметры url
 * 5) при инициализации приложение проверяет данный парамер и в зависимости от его наличия
 *    происходят разлиные действия
 */
export type RedirectActionTypes = 'resetPassword'
export type RedirectParam = 'action'
export type RedirectParamConfig = Record<RedirectParam, RedirectActionTypes>