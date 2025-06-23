const dynamicSegmentPattern = /^\[[a-zA-Z0-9]+\]$/

export const getRouteTemplate = (routeSegments) => {
  const segments = routeSegments.map(route => {
    if(route.match(dynamicSegmentPattern)) {
      const name = route.slice(1, route.length -1) // cut down []
      return `(?<${name}>\[\\w\\-_.]+)`
    }

    return route
  })
    .join('/')

  const regex = new RegExp(`^\/${segments}\\/?$`)
  return regex
}