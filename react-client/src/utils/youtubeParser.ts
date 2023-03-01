export const youtubeParser = (url: string) => {
  const newUrl = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  return newUrl[2] !== undefined
    ? newUrl[2].split(/[^0-9a-z_-]/i)[0]
    : newUrl[0]
}
