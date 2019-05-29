import DataActions, {ACTION_TYPES} from 'app/data/DataActions';

describe('Data -> Actions', () => {
  describe('changeVersion', () => {
    it('should dispatch DATA_CHANGE_VERSION', () => {
      const version = 'V5';

      const result = DataActions.changeVersion(version);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.DATA_CHANGE_VERSION,
        payload: {
          version,
        },
      });
      // don't mutate
      expect(version).toStrictEqual('V5');
    });
  });
});