const got = require('got')
const Limiter = require('bottleneck')

const SLACK_TOKEN = process.env.SLACK_TOKEN
const AGE = process.env.AGE // Delete only files older than the specified number of days
const MAX = 1000 // Amount of files to fetch
// const PINNED = false

const slackClient = new Limiter({
  maxConcurrent: 1,
  minTime: 2000
}).wrap(
  got.extend({
    baseUrl: 'https://slack.com/api',
    headers: { Authorization: `Bearer ${SLACK_TOKEN}` }
  })
)

const getFiles = () => new Promise((resolve, reject) => {
  const ONE_DAY_IN_SECONDS = 86400
  const age = Math.floor(Date.now() / 1000) - AGE * ONE_DAY_IN_SECONDS

  return slackClient('files.list', {
    body: {
      token: SLACK_TOKEN,
      ts_to: age,
      count: MAX
    },
    form: true,
    json: true
  })
    .then(response => {
      if (response.body.ok) {
        resolve(response.body.files)
      } else {
        reject(new Error(response.body.error))
      }
    })
    .catch(err => reject(err))
})

const filterFiles = ({ shouldDeletePinned }) => (files = []) => {
  const excludePinned = files => files.filter(file => !file.pinned_to)
  const filesToDelete = shouldDeletePinned ? files : excludePinned(files)

  if (!filesToDelete.length) {
    throw new Error(`There are no files older than ${AGE} days to delete.`)
  }

  return filesToDelete
}

const deleteFiles = (files = []) => {
  console.log(`Deleting ${files.length} file(s)...`)

  files.forEach(file =>
    slackClient('files.delete', {
      method: 'POST',
      body: { token: SLACK_TOKEN, file: file.id },
      json: true,
      form: true
    })
      .then(({ body }) => {
        const { ok, error, warning } = body
        console.log(
          ok
            ? `${file.name} has been deleted.`
            : `Error '${error}' while deleting file. ${warning || ''}`
        )
      })
      .catch(error => console.error('Error while deleting file.', error))
  )
}

module.exports = {
  getFiles: getFiles,
  filterFiles: filterFiles,
  deleteFiles: deleteFiles

}
