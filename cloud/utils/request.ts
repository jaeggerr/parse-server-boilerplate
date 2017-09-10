import * as request from 'request'
import * as urlJoin from 'url-join'

/**
 * Perform
 * @export
 * @param {string} endpoint The endpoint appenned to the base url.
 * @param {string} method The HTTP method (GET, POST, PUT, DELETE)
 * @param {string} useMasterKey Use the master key to perform the request
 * @param {string} baseUrl The base URL of the server. By default, the serverURL of the Parse config is called.
 * @returns {Promise<Parse.Cloud.HttpResponse>} A promise of the request
 */
export function parseServerRequest (endpoint: string, method: string, useMasterKey: boolean, baseUrl?: string): Parse.Promise<Parse.Cloud.HttpResponse> {
  const headers = {
    'X-Parse-Application-Id': Parse.applicationId
  }
  if (useMasterKey && Parse.masterKey) {
    headers['X-Parse-Master-Key'] = Parse.masterKey
  }
  const url = urlJoin(baseUrl || Parse.serverURL, endpoint)
  return Parse.Cloud.httpRequest({
    url: url,
    method: method,
    headers: headers
  })
}

/**
 * Delete a file from the Parse server
 * @export
 * @param {Parse.File} file The file
 * @returns {Promise<Parse.Cloud.HttpResponse>} A promise of the request
 */
export async function deleteParseFile (file: Parse.File): Promise<Parse.Cloud.HttpResponse> {
  return parseServerRequest(`files/${file.name()}`, 'DELETE', true)
}
