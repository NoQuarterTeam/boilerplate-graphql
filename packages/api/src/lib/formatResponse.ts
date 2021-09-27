import { GraphQLRequestContext, GraphQLResponse } from "apollo-server-types"

export function formatResponse(
  res: GraphQLResponse | null,
  context: GraphQLRequestContext<any>,
): GraphQLResponse {
  console.log("\n")
  console.log(
    (context.operation?.operation
      ? `${context.operation.operation.replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase())}: `
      : "") + context.operationName,
  )

  if (!res) throw Error("No response")
  return res
}
