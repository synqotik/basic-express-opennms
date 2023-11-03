import { API } from 'opennms';

export const createQueryFilter: API.Filter = () => {
  // const weekMs = 1000 * 60 * 60 * 24 * 7;
  // const rangeTo = new Date().getTime();
  // const rangeFrom = rangeTo - weekMs;

  // const filter = new API.Filter()
  //   .withAndRestriction(new API.Restriction('lastEventTime', API.Comparators.GE, rangeFrom))
  //   .withAndRestriction(new API.Restriction('lastEventTime', API.Comparators.LE, rangeTo))
  //   .withAndRestriction(new API.Restriction('node.label', API.Comparators.EQ, 'localhost'));

  // get node(s) by label
  const filter = new API.Filter()
    .withAndRestriction(new API.Restriction('node.label', API.Comparators.EQ, 'localhost'));

  return filter;
}

export const createNodeQueryFilter: API.Filter = () => {
  // const weekMs = 1000 * 60 * 60 * 24 * 7;
  // const rangeTo = new Date().getTime();
  // const rangeFrom = rangeTo - weekMs;

  // const filter = new API.Filter()
  //   .withAndRestriction(new API.Restriction('lastEventTime', API.Comparators.GE, rangeFrom))
  //   .withAndRestriction(new API.Restriction('lastEventTime', API.Comparators.LE, rangeTo))
  //   .withAndRestriction(new API.Restriction('node.label', API.Comparators.EQ, 'localhost'));

  // get node(s) by label
  const filter = new API.Filter()
    .withAndRestriction(new API.Restriction('node.label', API.Comparators.EQ, 'localhost'));

  return filter;
}


/**
 * Create filter for IpInterfaceDAO by node ids. 
 */
export const createIpInterfaceForNodesFilter: API.Filter = (nodeIds: number[]) => {
  const filter = new API.Filter();

  nodeIds.forEach(id => {
    filter.withOrRestriction(new API.Restriction('node.id', API.Comparators.EQ, id));
  })

  return filter;
}
