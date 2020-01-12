export type MethodDecoratorFactory = (
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => any

export function composeMethodDecorators(
  ...factories: MethodDecoratorFactory[]
) {
  return (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): any => {
    factories.forEach(factory => factory(target, propertyKey, descriptor))
  }
}
