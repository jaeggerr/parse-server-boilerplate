import { isUndefined } from 'util'
import * as Parse from 'parse/node'

interface SetACLOptions {
  public?: {
    read?: boolean
    write?: boolean
  }
  users?: {
    user: Parse.User | string
    read?: boolean
    write?: boolean
  } []
  append?: boolean
}

/**
 * Changes the ACL of Parse object
 */
export function setACL (object: Parse.Object, options: SetACLOptions) {
  let acl = object.getACL()
  if (!acl || options.append) {
    acl = new Parse.ACL()
  }

  // Public
  if (options.public) {
    if (!isUndefined(options.public.read)) acl.setPublicReadAccess(options.public.read)
    if (!isUndefined(options.public.write)) acl.setPublicReadAccess(options.public.write)
  }

  // Users
  if (options.users) {
    for (let userSettings of options.users) {
      if (!isUndefined(userSettings.read)) acl.setReadAccess(userSettings.user as any, userSettings.read)
      if (!isUndefined(userSettings.write)) acl.setReadAccess(userSettings.user as any, userSettings.write)
    }
  }
}
