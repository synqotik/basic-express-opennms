import { API } from 'opennms';

/**
 * Create a Filter object for the NodeDAO for querying Nodes. queryObj is from Express Request.query.
 */
export const createNodeQueryFilter: API.Filter = (queryObj: any) => {
  const filter = new API.Filter();

  const restrictions: API.Restriction[] = []

  // comma-separated list of node labels
  if (queryObj.label) {
    const labels = (queryObj.label as string || '').split(',')

    labels.forEach(label => {
      restrictions.push(new API.Restriction('node.label', API.Comparators.EQ, label))
    })
  }

  // comma-separated list of node ids (integers)
  if (queryObj.id) {
    const nodeIds = (queryObj.id as string || '').split(',').map(x => parseInt(x.trim()))

    nodeIds.forEach(id => {
      restrictions.push(new API.Restriction('id', API.Comparators.EQ, id))
    })
  }

  // comma-separated list of locations
  if (queryObj.location) {
    const locations = (queryObj.location as string || '').split(',')

    locations.forEach(location => {
      restrictions.push(new API.Restriction('node.location.locationName', API.Comparators.EQ, location))
    })
  }

  if (restrictions.length > 0) {
    restrictions.forEach(r => filter.withOrRestriction(r));
  }

  return filter;
}

/**
 * Create a Filter object for the IpInterfaceDAO for querying IpInterfaces. queryObj is from Express Request.query.
 */
export const createIpInterfaceFilter: API.Filter = (queryObj: any) => {
  const filter = new API.Filter();

  const restrictions: API.Restriction[] = []

  // comma-separated list of ipInterface ids (integers)
  if (queryObj.id) {
    const ids = (queryObj.id as string || '').split(',').map(x => parseInt(x.trim()))

    ids.forEach(id => {
      restrictions.push(new API.Restriction('id', API.Comparators.EQ, id))
    })
  }

  // comma-separated list of node ids (integers)
  if (queryObj.nodeId) {
    const nodeIds = (queryObj.nodeId as string || '').split(',').map(x => parseInt(x.trim()))

    nodeIds.forEach(id => {
      restrictions.push(new API.Restriction('node.id', API.Comparators.EQ, id))
    })
  }

  if (restrictions.length > 0) {
    restrictions.forEach(r => filter.withOrRestriction(r));
  }

  return filter;
}
