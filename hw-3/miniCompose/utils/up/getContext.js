export const getContext = (build) => {
  let context = build
  let dockerfile = null

  if(build && typeof build !== 'string' ) {
    context = build.context
    dockerfile = `${context}/${build.dockerfile}`
  }

  return { context, dockerfile }
}