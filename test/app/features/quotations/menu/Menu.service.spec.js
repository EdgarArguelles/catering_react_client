/* eslint-disable max-lines */
import {expect} from 'chai';
import {getMenuFromLink, getRandomMenuId, getShareMenuLink} from 'app/features/quotations/menu/Menu.service';

const LINK = 'http://localhost/presupuestos/menu/ver?menu=';

describe('Quotations -> Menu -> Service', () => {
  describe('getRandomMenuId', () => {
    it('should generate a correct random menu id', () => {
      const startsWithExpected = 'local-';

      const result = getRandomMenuId();

      expect(result.startsWith(startsWithExpected)).to.be.true;
    });
  });

  describe('getShareMenuLink', () => {
    it('should get null when menu is undefined', () => {
      const result = getShareMenuLink();

      expect(result).to.deep.equal(null);
    });

    it('should get null when menu is null', () => {
      const menu = null;

      const result = getShareMenuLink(menu);

      expect(result).to.deep.equal(null);
      // don't mutate
      expect(menu).to.deep.equal(null);
    });

    it('should encode name and replace all ; by %', () => {
      const menu = {id: 'test', name: 'name 1;abc;123', price: 150.45, quantity: 100};

      const result = getShareMenuLink(menu);

      expect(result).to.deep.equal(`${LINK}name%201%25abc%25123;150.45;100;`);
      // don't mutate
      expect(menu).to.deep.equal({id: 'test', name: 'name 1;abc;123', price: 150.45, quantity: 100});
    });

    it('should get link when courses is not present', () => {
      const menu = {id: 'test'};

      const result = getShareMenuLink(menu);

      expect(result).to.deep.equal(`${LINK};;;`);
      // don't mutate
      expect(menu).to.deep.equal({id: 'test'});
    });

    it('should get link when courses is empty', () => {
      const menu = {id: 'test', name: 'name 1;abc;123', price: 150.45, quantity: 100, courses: []};

      const result = getShareMenuLink(menu);

      expect(result).to.deep.equal(`${LINK}name%201%25abc%25123;150.45;100;`);
      // don't mutate
      expect(menu).to.deep.equal({id: 'test', name: 'name 1;abc;123', price: 150.45, quantity: 100, courses: []});
    });

    it('should get link when menu is complete', () => {
      const menu = {
        id: 'test', name: 'name 1', price: 150.45, quantity: 100, courses: [
          {
            id: 'C1', position: 5, type: {id: 'T1', name: 'Type 1'}, dishes: [
              {id: 'D1', name: 'Dish 1'}, {id: 'D2'}, {id: 'D3', name: 'Dish 3'},
            ],
          },
          {
            id: 'C2', position: 8, type: {id: 'T2'}, dishes: [
              {id: 'D4', name: 'Dish 4'}, {id: 'D5'},
            ],
          },
          {
            id: 'C3', position: 6, type: {id: 'T2'}, dishes: [],
          },
        ],
      };

      const result = getShareMenuLink(menu);

      expect(result).to.deep.equal(`${LINK}name%201;150.45;100;5.T1.D1,D2,D3:8.T2.D4,D5:6.T2.`);
      // don't mutate
      expect(menu).to.deep.equal({
        id: 'test', name: 'name 1', price: 150.45, quantity: 100, courses: [
          {
            id: 'C1', position: 5, type: {id: 'T1', name: 'Type 1'}, dishes: [
              {id: 'D1', name: 'Dish 1'}, {id: 'D2'}, {id: 'D3', name: 'Dish 3'},
            ],
          },
          {
            id: 'C2', position: 8, type: {id: 'T2'}, dishes: [
              {id: 'D4', name: 'Dish 4'}, {id: 'D5'},
            ],
          },
          {
            id: 'C3', position: 6, type: {id: 'T2'}, dishes: [],
          },
        ],
      });
    });
  });

  describe('getMenuFromLink', () => {
    it('should get null when data is undefined', () => {
      const result = getMenuFromLink();

      expect(result).to.deep.equal(null);
    });

    it('should get null when data is null', () => {
      const data = null;

      const result = getMenuFromLink(data);

      expect(result).to.deep.equal(null);
      // don't mutate
      expect(data).to.deep.equal(null);
    });

    it('should replace all % by ; in name', () => {
      const data = 'name 1%abc%123;150.45;100;';

      const result = getMenuFromLink(data);

      expect(result).to.deep.equal({name: 'name 1;abc;123', price: 150.45, quantity: 100, courses: []});
      // don't mutate
      expect(data).to.deep.equal('name 1%abc%123;150.45;100;');
    });

    it('should get menu when courses is not present', () => {
      const data = ';;;';

      const result = getMenuFromLink(data);

      expect(result).to.deep.equal({name: '', price: 0.0, quantity: 0, courses: []});
      // don't mutate
      expect(data).to.deep.equal(';;;');
    });

    it('should get menu when menu is complete', () => {
      const data = 'name 1;150.45;100;5.T1.D1,D2,D3:8.T2.D4,D5:6.T2.';

      const result = getMenuFromLink(data);

      expect(result).to.deep.equal({
        name: 'name 1', price: 150.45, quantity: 100, courses: [
          {
            position: 5, type: {id: 'T1'}, dishes: [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}],
          },
          {
            position: 8, type: {id: 'T2'}, dishes: [{id: 'D4'}, {id: 'D5'}],
          },
          {
            position: 6, type: {id: 'T2'}, dishes: [],
          },
        ],
      });
      // don't mutate
      expect(data).to.deep.equal('name 1;150.45;100;5.T1.D1,D2,D3:8.T2.D4,D5:6.T2.');
    });
  });
});