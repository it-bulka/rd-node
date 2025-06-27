// for depends_on in service
export const topologicalSort = (services) => {
  const result = []
  const visited = new Set()

  function visit(service) {
    if (visited.has(service)) return
    visited.add(service)

    const deps = services[service]?.depends_on || []
    for (const dep of deps) {
      visit(dep)
    }

    if (!result.includes(service)) {
      result.push(service);
    }
  }

  for (const service in services) {
    visit(service)
  }

  return result
}
