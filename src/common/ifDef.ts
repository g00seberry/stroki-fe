/**
 * Аналог функции let из Kotlin
 * Пример: const z = ifDef(root?.second?.calc?.(x + y), it => it * 100) ?? 0;
 * @param maybe
 * @param onOk
 */
export const ifDef = <In, Out>(
  maybe: In | undefined,
  onOk: (value: In) => Out
): Out | undefined => (maybe === undefined ? undefined : onOk(maybe))
