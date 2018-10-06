'use strict'

const { getFiles, filterFiles, deleteFiles } = require('./lib/slack_files')

module.exports.cleanup_old_files = async (event, context) => {
  try {
    let files = await getFiles()
    let filesToDelete = filterFiles({ shouldDeletePinned: false })(files)

    deleteFiles(filesToDelete)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event
      })
    }
  } catch (ex) {
    return ex
  }
}
