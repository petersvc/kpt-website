export function getPageParameter(pagePath: string): string {
  const a = pagePath.indexOf('page')
  const b = pagePath.slice(a, pagePath.length)
  const c = b.indexOf('&')
  if (c === -1) {
    return pagePath.slice(a, pagePath.length)
  } else {
    return pagePath.slice(a, c)
  }
}

export function getPageNumber(pagePath: string): number {
  const c = getPageParameter(pagePath)
  let lengthOfC = c.length
  if (lengthOfC > 6) {
    lengthOfC = lengthOfC - 2
  } else {
    lengthOfC = lengthOfC - 1
  }

  const d = c.slice(lengthOfC, c.length)
  return parseInt(d)
}

export function translateId(id: string): string {
  let correctId = ''
  switch (id) {
    case 'Marcas':
      correctId = 'brand'
      break
    case 'Modelos':
      correctId = 'model'
      break
  }
  return correctId
}

export function getParameterSlice(pagePath: string, parameter: string): string {
  const startIndex = pagePath.indexOf(parameter)
  if (startIndex === -1) {
    return ''
  }
  let parameterSlice = pagePath.slice(startIndex)
  // console.log('parameterSlice', parameterSlice)
  let endIndex = parameterSlice.indexOf('&')
  if (endIndex === -1) {
    endIndex = pagePath.length
  }
  // console.log('endIndex', endIndex)
  parameterSlice = parameterSlice.slice(0, endIndex)
  return parameterSlice
}

export function getElementSlice(parameterSlice: string, id: string, element: string): string {
  const noId = parameterSlice.replace(id + '=', '')
  const noIdSplit = noId.split(',')
  if (noIdSplit.length === 1) {
    return ''
  }
  const elementIndex = noIdSplit.indexOf(element)
  noIdSplit.splice(elementIndex, 1)
  const noIdJoin = noIdSplit.join(',')
  const newPath = id + '=' + noIdJoin
  return newPath
}
