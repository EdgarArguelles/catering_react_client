/* eslint-disable max-lines */
import {expect} from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import Api, {ACTION_TYPES} from '../../../src/app/common/Api';

describe('Api', () => {
  describe('Api calls', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    describe('Api prefix', () => {
      let urlExpected;

      beforeEach(() => {
        fetchMock.get('*', {hello: 'world'});
      });

      it('should use the default prefix when prefix is not defined', () => {
        urlExpected = 'https://testhost/catering/test';

        Api.getJSON(null, '/test');

        expect(fetchMock.lastUrl()).to.equal(urlExpected);
      });

      it('should not use default prefix when prefix is defined', () => {
        urlExpected = 'https://custom.com/test';

        Api.getJSON(null, 'https://custom.com/test');

        expect(fetchMock.lastUrl()).to.equal(urlExpected);
      });
    });

    describe('Success calls', () => {
      let optionsExpected;

      describe('JSON', () => {
        describe('graphql', () => {
          it('should call graphql successfully', async () => {
            const jsonExpected = {hello: 'world'};
            fetchMock.post('*', jsonExpected);

            const json = await Api.graphql(null, '/test');

            expect(json).to.deep.equal(jsonExpected);
          });

          it('should handle graphql errors', async () => {
            const errorsExpected = [{id: 1}, {id: 2}];
            fetchMock.post('*', {hello: 'world', errors: errorsExpected});

            try {
              await Api.graphql(null, '/test');
              throw new Error('promise should fail but it did not!!!!');
            } catch (error) {
              expect(error).to.deep.equal({errors: errorsExpected});
            }
          });
        });

        describe('GET', () => {
          beforeEach(() => {
            fetchMock.get('*', {hello: 'world'});
          });

          it('should use the default options when options is not defined', () => {
            optionsExpected = {
              method: 'GET',
              headers: {Accept: 'application/json'},
            };

            Api.getJSON(null, '/test');

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
          });

          it('should overwrite method in options and Accept in headers when options is defined', () => {
            const config = {method: 'old', extra: 'test', headers: {Accept: 'old', extra: 'test2'}};
            optionsExpected = {
              method: 'GET',
              extra: 'test',
              headers: {Accept: 'application/json', extra: 'test2'},
            };

            Api.getJSON(null, '/test', config);

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
          });

          describe('headers', () => {
            beforeEach(() => {
              window.sessionStorage.setItem('accessToken', 'token');
            });

            afterEach(() => {
              window.sessionStorage.removeItem('accessToken');
            });

            it('should concat authorization to headers when options is not defined', () => {
              optionsExpected = {
                method: 'GET',
                headers: {Accept: 'application/json', Authorization: 'Bearer token'},
              };

              Api.getJSON(null, '/test');

              expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
            });

            it('should overwrite authorization in headers when options is defined', () => {
              const config = {
                headers: {Authorization: 'old', extra: 'test'},
              };
              optionsExpected = {
                method: 'GET',
                headers: {Authorization: 'Bearer token', extra: 'test', Accept: 'application/json'},
              };

              Api.getJSON(null, '/test', config);

              expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
            });
          });
        });

        describe('POST', () => {
          const body = {content: 'test'};

          beforeEach(() => {
            fetchMock.post('*', {hello: 'world'});
          });

          it('should use the default options when options is not defined', () => {
            optionsExpected = {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            };

            Api.postJSON(null, '/test', body);

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
            // don't mutate
            expect(body).to.deep.equal({content: 'test'});
          });

          it('should overwrite method and body in options and Accept and Content-Type ' +
            'in headers when options is defined', () => {
            const config = {
              method: 'old',
              body: 'old',
              extra: 'test',
              headers: {Accept: 'old', 'Content-Type': 'old', extra: 'test2'},
            };
            optionsExpected = {
              method: 'POST',
              body: JSON.stringify(body),
              extra: 'test',
              headers: {Accept: 'application/json', 'Content-Type': 'application/json', extra: 'test2'},
            };

            Api.postJSON(null, '/test', body, config);

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
            // don't mutate
            expect(body).to.deep.equal({content: 'test'});
          });
        });

        describe('PUT', () => {
          const body = {content: 'test'};

          beforeEach(() => {
            fetchMock.put('*', {hello: 'world'});
          });

          it('should use the default options when options is not defined', () => {
            optionsExpected = {
              method: 'PUT',
              body: JSON.stringify(body),
              headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            };

            Api.putJSON(null, '/test', body);

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
            // don't mutate
            expect(body).to.deep.equal({content: 'test'});
          });

          it('should overwrite method and body in options and Accept and Content-Type in headers' +
            ' when options is defined', () => {
            const config = {
              method: 'old',
              body: 'old',
              extra: 'test',
              headers: {Accept: 'old', 'Content-Type': 'old', extra: 'test2'},
            };
            optionsExpected = {
              method: 'PUT',
              body: JSON.stringify(body),
              extra: 'test',
              headers: {Accept: 'application/json', 'Content-Type': 'application/json', extra: 'test2'},
            };

            Api.putJSON(null, '/test', body, config);

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
            // don't mutate
            expect(body).to.deep.equal({content: 'test'});
          });
        });

        describe('DELETE', () => {
          beforeEach(() => {
            fetchMock.delete('*', {hello: 'world'});
          });

          it('should use the default options when options is not defined', () => {
            optionsExpected = {
              method: 'DELETE',
              headers: {Accept: 'application/json'},
            };

            Api.deleteJSON(null, '/test');

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
          });

          it('should overwrite method in options and Accept in headers when options is defined', () => {
            const config = {method: 'old', extra: 'test', headers: {Accept: 'old', extra: 'test2'}};
            optionsExpected = {
              method: 'DELETE',
              extra: 'test',
              headers: {Accept: 'application/json', extra: 'test2'},
            };

            Api.deleteJSON(null, '/test', config);

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
          });
        });
      });

      describe('BLOB', () => {
        it('should response a BLOB object without fileName when response does not has header', async () => {
          fetchMock.get('*', {
            status: 200,
            body: {hello: 'world'},
          });

          const response = await Api.getBLOB(null, '/test');

          expect(response).to.haveOwnProperty('blob');
          expect(response).to.haveOwnProperty('fileName');
          expect(response.blob).to.not.be.undefined;
          expect(response.fileName).to.be.undefined;
        });

        it('should response a BLOB object with fileName when response has header', async () => {
          const fileName = 'test-file';
          fetchMock.get('*', {
            status: 200,
            body: {hello: 'world'},
            headers: {'Content-Disposition': `name = ${fileName}`},
          });

          const response = await Api.getBLOB(null, '/test');

          expect(response).to.haveOwnProperty('blob');
          expect(response).to.haveOwnProperty('fileName');
          expect(response.blob).to.not.be.undefined;
          expect(response.fileName).to.equal(fileName);
        });

        describe('GET', () => {
          beforeEach(() => {
            fetchMock.get('*', {hello: 'world'});
          });

          it('should use the default options when options is not defined', () => {
            optionsExpected = {
              method: 'GET',
              headers: {Accept: 'application/octet-stream'},
            };

            Api.getBLOB(null, '/test');

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
          });

          it('should overwrite method in options and Accept in headers when options is defined', () => {
            const config = {method: 'old', extra: 'test', headers: {Accept: 'old', extra: 'test2'}};
            optionsExpected = {
              method: 'GET',
              extra: 'test',
              headers: {Accept: 'application/octet-stream', extra: 'test2'},
            };

            Api.getBLOB(null, '/test', config);

            expect(fetchMock.lastOptions()).to.deep.equal(optionsExpected);
          });
        });
      });
    });

    describe('Error calls', () => {
      const dispatchStub = sinon.stub();

      afterEach(() => {
        dispatchStub.reset();
      });

      describe('Internal Error', () => {
        it('should handle a 500 error when error 500', async () => {
          fetchMock.get('*', {
            status: 500,
            body: {error: 'error'},
          });

          const errorAction = {
            type: ACTION_TYPES.FETCH_FAILURE,
            error: true,
            payload: {error: 'error', errorCode: 500},
          };
          try {
            await Api.getJSON(dispatchStub, '/test');
            throw new Error('promise should fail but it did not!!!!');
          } catch (error) {
            expect(error).to.deep.equal({error: 'error', errorCode: 500});
            sinon.assert.callCount(dispatchStub, 1);
            sinon.assert.calledWithExactly(dispatchStub, errorAction);
          }
        });

        it('should handle a 401 error when error 401', async () => {
          fetchMock.get('*', {
            status: 401,
            body: {error: 'error'},
          });

          window.sessionStorage.setItem('accessToken', 'temporal');
          window.sessionStorage.setItem('userImage', 'temporal');
          const sessionAction = {type: ACTION_TYPES.SESSION_EXPIRED};
          const errorAction = {
            type: ACTION_TYPES.FETCH_FAILURE,
            error: true,
            payload: {error: 'error', errorCode: 401},
          };
          try {
            await Api.getJSON(dispatchStub, '/test');
            throw new Error('promise should fail but it did not!!!!');
          } catch (error) {
            expect(error).to.deep.equal({error: 'error', errorCode: 401});
            expect(window.sessionStorage.getItem('accessToken')).to.be.null;
            expect(window.sessionStorage.getItem('userImage')).to.be.null;
            sinon.assert.callCount(dispatchStub, 2);
            sinon.assert.calledWithExactly(dispatchStub, sessionAction);
            sinon.assert.calledWithExactly(dispatchStub, errorAction);
          }
        });

        it('should handle a 403 error when error 403', async () => {
          fetchMock.get('*', {
            status: 403,
            body: {error: 'error'},
          });

          window.sessionStorage.setItem('accessToken', 'temporal');
          window.sessionStorage.setItem('userImage', 'temporal');
          const sessionAction = {type: ACTION_TYPES.SESSION_EXPIRED};
          const errorAction = {
            type: ACTION_TYPES.FETCH_FAILURE,
            error: true,
            payload: {error: 'error', errorCode: 403},
          };
          try {
            await Api.getJSON(dispatchStub, '/test');
            throw new Error('promise should fail but it did not!!!!');
          } catch (error) {
            expect(error).to.deep.equal({error: 'error', errorCode: 403});
            expect(window.sessionStorage.getItem('accessToken')).to.be.null;
            expect(window.sessionStorage.getItem('userImage')).to.be.null;
            sinon.assert.callCount(dispatchStub, 2);
            sinon.assert.calledWithExactly(dispatchStub, sessionAction);
            sinon.assert.calledWithExactly(dispatchStub, errorAction);
          }
        });
      });

      describe('Api Error', () => {
        it('should handle an Api error when api error', async () => {
          fetchMock.get('*', {
            throws: {message: 'Api error'},
          });

          const errorAction = {
            type: ACTION_TYPES.FETCH_FAILURE,
            error: true,
            payload: {message: 'Api error'},
          };
          try {
            await Api.getJSON(dispatchStub, '/test');
            throw new Error('promise should fail but it did not!!!!');
          } catch (error) {
            expect(error).to.deep.equal({message: 'Api error'});
            sinon.assert.callCount(dispatchStub, 1);
            sinon.assert.calledWithExactly(dispatchStub, errorAction);
          }
        });
      });
    });
  });
});