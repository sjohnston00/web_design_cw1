/*
file: utilities.js
author: Ross McLean
desc: Script contains non-specific functions that can be utilised across the application
 */

export const clearList = node => {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild)
  }
}

export const getSocFromUrl = () => {
  const urlQueryString = window.location.search
  const urlParameters = new URLSearchParams(urlQueryString)
  return urlParameters.get('soc')
}