export const getHeadersConfig = (token) => {
  if (token) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  } else {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }
}

export const getHeaderFileConfig = () => ({
  headers: {
    'Content-Type': 'multipart/from-data',
  },
})
