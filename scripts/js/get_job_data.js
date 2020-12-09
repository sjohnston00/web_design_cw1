/*
file: get_job_data.js
author: Ross McLean
desc: Gets jobs from an API and builds a list from the results
 */

import { clearList, getSocFromUrl } from './utilities.js'

export const getJobList = () => {
  const textBox = document.getElementById('job')

  let requestUrl = `http://api.lmiforall.org.uk/api/v1/soc/search?q=${textBox.value.trim()}`

  fetch(requestUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => {
      const jobListContainer = document.getElementById('job-link-list')
      const resultCountContainer = document.getElementById('result-count-container')
      const p1 = document.createElement('p')
      const p2 = document.createElement('p')

      $(resultCountContainer).children().remove()

      jobListContainer.setAttribute('class', 'container')
      clearList(jobListContainer)

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

      data.forEach(job => {
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const a = document.createElement('a')
        const p = document.createElement('p')

        div.className = 'list-entry'
        a.textContent = job['title']
        a.href = `job.html?soc=${job['soc']}`
        p.textContent = job['description']

        h3.appendChild(a)
        div.appendChild(h3)
        div.appendChild(p)
        jobListContainer.appendChild(div)
      })
    })
    .catch(error => console.log(`response error: ${error}`))
}

export const getJobData = () => {
  const requestUrl = `http://api.lmiforall.org.uk/api/v1/soc/code/${getSocFromUrl()}`

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('job-title').innerText = data.title
      document.getElementById('soc-text').innerText = `SOC code: ${data.soc}`
      document.getElementById('description-paragraph').innerText = data.description

      document.getElementById('qualifications-title').innerText = 'Qualifications'
      document.getElementById('qualifications-paragraph').innerText = data.qualifications

      document.getElementById('tasks-title').innerText = 'Tasks'

      // Divide tasks into individual list items
      //TODO: Stop loop from appending empty children
      const tasksList = document.getElementById('tasks-list')
      let subArray = []
      const regex = /^[A-Za-z\s]+$/;  // only match letters and spaces
      [...data.tasks].forEach(character => {
        if (character.match(regex)) {
          subArray.push(character)
        } else {
          const listItem = document.createElement('li')
          listItem.innerHTML = subArray.join('')
          tasksList.appendChild(listItem)
          subArray = []
        }
      })

      document.getElementById('tags-title').innerText = 'Tags'
      document.getElementById('tags-paragraph').innerText = `[${data.add_titles.slice(0, 10)}]`
    })
    .catch(error => console.log(`response error: ${error}`))
}

export const getLocation = () => {
  const textBox = document.getElementById('location')
  let requestUrl = 'http://api.lmiforall.org.uk/api/v1/ashe/filter/region'

  fetch(requestUrl, {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      const regionsArray = data['codings']
      regionsArray.forEach(object => {
        const searchTerm = textBox.value.toLowerCase().trim()
        if (object['name'].toLowerCase().includes(searchTerm)) {
          console.log(object['name'] + ' ' + object['value'])
          document.getElementById('location-title').innerText = object['name']
          getLocationsEstimatedPay(object['value'])  // this returns pay data
        }
      })
    })
    .catch(error => console.log(`response error: ${error}`))
}

const getLocationsEstimatedPay = regionValue => {
  const requestUrl =
    `http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${getSocFromUrl()}&filters=region%3A${regionValue}`

  fetch(requestUrl, {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data['series'])
      return data['series']
    })
    .catch(error => console.log(`response error: ${error}`))
}

// method to build chart