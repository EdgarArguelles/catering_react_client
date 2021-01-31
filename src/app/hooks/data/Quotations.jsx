import {useDispatch} from 'react-redux';
import {useQuery} from 'react-query';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';

export const useQuotations = (pagination, loggedUser) => {
  const KEY = 'Quotations';
  const dispatch = useDispatch();
  return useQuery(KEY, async () => {
    const FIELDS = 'totalElements totalPages content{id name createdAt price}';
    const body = {query: `{quotationPage(pageDataRequest: ${Utils.stringifyPageDataRequest(pagination)}) {${FIELDS}}}`};
    const json = await Api.graphql(dispatch, body);
    const {content, totalElements, totalPages} = json.data.quotationPage;
    return {
      quotations: content,
      metaData: {pagination: {...pagination}, totalElements, totalPages},
    };
  }, {enabled: !!pagination && !!loggedUser});
};