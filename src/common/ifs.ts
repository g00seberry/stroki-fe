import { ifDef } from './ifDef'

type Condition<T> = [boolean, T]

/**
 * Функциональный аналог конструкции if (a) {return "A"} else if (b) {return "B"} else return "C"
 * Отличается от what возможностью указывать любое условие
 * Пример: const op = ifs ([[x>0, "GT"], [x<0, "LT"]], "EQ")
 * @param conditions
 * @param defaultValue
 */
export const ifs = <T>(conditions: Condition<T>[], defaultValue: T): T =>
  ifDef(
    conditions.find((c) => c[0]),
    (it) => it[1]
  ) ?? defaultValue
