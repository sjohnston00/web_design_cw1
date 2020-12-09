/*
file: get_uni_data.js
author: Ross McLean
desc: Gets universities from an API and builds a list from the results
 */

import clearList from './utilities.js'

const getUniJson = () => {
  const textBox = document.getElementById('uni')

  let baseUrl = 'http://universities.hipolabs.com/search?country=United Kingdom'
  let requestUrl = textBox.value ? `${baseUrl}&name=${textBox.value.trim()}` : baseUrl

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      const uniListContainer = document.getElementById('uni-link-list')
      const resultCountContainer = document.getElementById('result-count-container')
      const p1 = document.createElement('p')
      const p2 = document.createElement('p')

      $(resultCountContainer).children().remove()

      uniListContainer.setAttribute('class', 'container')
      clearList(uniListContainer)

      p1.id = 'uni-result-count'
      p1.innerHTML = `${data.length}`
      p2.innerHTML = '&nbsp;Results found:'

      const p1p2 = [p1, p2]

      p1p2.forEach(element => {
        $(element).css({
          'font-weight': 'bold',
          'font-size': '120%'
        })
        resultCountContainer.appendChild(element)
      })

      data.forEach(uni => {
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const a = document.createElement('a')

        div.className = 'list-entry'
        h3.textContent = uni['name']
        a.textContent = uni['web_pages'][0]
        a.href = uni['web_pages'][0]

        div.appendChild(h3)
        div.appendChild(a)
        uniListContainer.appendChild(div)
      })
    })
    .catch(error => console.log(`response error: ${error}`))
}

export default getUniJson