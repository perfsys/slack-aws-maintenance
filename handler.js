'use strict'

const { getFiles, filterFiles, deleteFile } = require('./lib/slack_files')

module.exports.cleanup_old_files = async (event, context) => {
  try {
    let files = await getFiles()
    let filesToDelete = filterFiles({ shouldDeletePinned: false })(files)
    // one at a time
    let response = await deleteFile(filesToDelete[0])

    return {
      message: response
    }
  } catch (ex) {
    return ex
  }
}
