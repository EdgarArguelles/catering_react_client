import {useDispatch, useSelector} from 'react-redux';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';

export const QUOTATION_KEY = 'Quotation';
export const QUOTATIONS_KEY = 'Quotations';

/**
 * Clean extra information from quotation (not needed in graphql mutation)
 *
 * @param {Object} quotation data to be cleaned
 * @return {String} data cleaned
 */
const getQuotationFixed = quotation => {
  const quotationFixed = {...quotation, menus: []};
  quotation.menus && quotation.menus.forEach(menu => quotationFixed.menus.push({...menu}));
  quotationFixed.menus.forEach(menu => {
    delete menu.price;
    delete menu.isSelected;
  });

  return Utils.stringifyObjectWithNoQuotesOnKeys(quotationFixed);
};

export const useQuotation = quotationId => {
  const KEY = [QUOTATION_KEY, quotationId];
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  return useQuery(KEY, async () => {
    const FIELDS = 'id name createdAt price menus{id name quantity courses{id position type{id} dishes{id price}}}';
    const body = {query: `{quotation(id: ${quotationId}) {${FIELDS}}}`};
    const json = await Api.graphql(dispatch, body);
    return json.data.quotation;
  }, {enabled: !!quotationId && !!loggedUser});
};

export const useQuotations = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const DEFAULT_PAGE_PARAM = {page: 0, size: 5, sort: ['createdAt'], direction: 'DESC'};
  const results = useInfiniteQuery(QUOTATIONS_KEY, async ({pageParam = DEFAULT_PAGE_PARAM}) => {
    const FIELDS = 'totalElements totalPages content{id name createdAt price}';
    const body = {query: `{quotationPage(pageDataRequest: ${Utils.stringifyPageDataRequest(pageParam)}) {${FIELDS}}}`};
    const json = await Api.graphql(dispatch, body);
    const {content, totalElements, totalPages} = json.data.quotationPage;
    return {
      quotations: content,
      metaData: {pagination: {...pageParam}, totalElements, totalPages},
    };
  }, {
    enabled: !!loggedUser,
    getNextPageParam: ({metaData: {pagination, totalPages}}) =>
      pagination.page + 1 < totalPages ? {...pagination, page: pagination.page + 1} : undefined,
  });
  const quotations = results.data?.pages.map((page => page.quotations)).flat();
  const metaData = results.data?.pages.map((page => page.metaData)).pop();
  return {...results, quotations, metaData};
};

export const useCreateQuotation = () => {
  const dispatch = useDispatch();
  return useMutation(async quotation => {
    const body = {query: `mutation {createQuotation(quotation: ${getQuotationFixed(quotation)}) {id}}`};
    // create a fake delay (ignore it in test cases)
    process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
    const json = await Api.graphql(dispatch, body);
    return json.data.createQuotation;
  });
};

export const useEditQuotation = () => {
  const dispatch = useDispatch();
  return useMutation(async quotation => {
    const body = {query: `mutation {updateQuotation(quotation: ${getQuotationFixed(quotation)}) {id}}`};
    // create a fake delay (ignore it in test cases)
    process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
    const json = await Api.graphql(dispatch, body);
    return json.data.updateQuotation;
  });
};

export const useDeleteQuotation = () => {
  const dispatch = useDispatch();
  return useMutation(async quotationId => {
    const body = {query: `mutation {deleteQuotation(id: ${quotationId}) {id}}`};
    // create a fake delay (ignore it in test cases)
    process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
    const json = await Api.graphql(dispatch, body);
    return json.data.deleteQuotation;
  });
};