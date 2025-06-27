export const getKey = async (req, res) => {
  const { key } = req.params
  try {
    const fetchRes = await fetch(`${process.env.REDIS_URL}/get?key=${key}`)

    if (!fetchRes.ok) {
      throw new Error(`HTTP error! status: ${fetchRes.status}`);
    }
    const data = await fetchRes.json()

    res.status(200).json({
      success: true,
      message: 'Successfully retrieved key',
      data: { [data.key]: data.value }
    })
  } catch {
    res.status(400).json({
      success: false,
      error: `Failed to get ${key}`
    })
  }
}

export const setKey = async (req, res) => {
  const entries = Object.entries(req.body)
  const msgs = entries.map(([key, value]) => (`key: ${key} with value: ${value}`))

  try {
    const fetches = entries.map(async ([key, value]) => {
      const response =  await fetch(`${process.env.REDIS_URL}/set`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key, value })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json()
    })

    const results = await Promise.all(fetches)

    const kvData = {}
    results.forEach((result) => {
      const { key, value } = result
      kvData[key] = value
    })

    res.status(201).json({
      success: false,
      message: `Successfully created ${msgs}`,
      data: kvData
    })
  } catch {
    res.status(400).json({
      success: false,
      error: `Failed to set ${msgs}`
    })
  }

}