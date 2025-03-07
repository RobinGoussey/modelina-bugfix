import {ModelKind, TypeHelpers} from '../../src/helpers';
import {CommonModel} from '../../src/models';

describe('TypeHelpers', () => {
  describe('extractKind', () => {
    test('should return object', () => {
      const model = new CommonModel();
      model.type = 'object';
      const kind = TypeHelpers.extractKind(model);

      expect(kind).toEqual(ModelKind.OBJECT);
    });

    test('should return array', () => {
      const model = new CommonModel();
      model.type = 'array';
      const kind = TypeHelpers.extractKind(model);

      expect(kind).toEqual(ModelKind.ARRAY);
    });

    test('should return enum', () => {
      const model = new CommonModel();
      model.type = 'string';
      model.enum = ['someValue1', 'someValue2'];
      const kind = TypeHelpers.extractKind(model);

      expect(kind).toEqual(ModelKind.ENUM);
    });

    test('should return union', () => {
      const model = new CommonModel();
      model.type = ['number', 'string'];
      const kind = TypeHelpers.extractKind(model);

      expect(kind).toEqual(ModelKind.UNION);
    });

    test('should return nullable', () => {
      const model = new CommonModel();
      model.type = ['null', 'string'];
      const kind = TypeHelpers.extractKind(model);

      expect(kind).toEqual(ModelKind.NULLABLE);
    });

    test('should return primitive', () => {
      const model = new CommonModel();
      model.type = 'string';
      let kind = TypeHelpers.extractKind(model);
      expect(kind).toEqual(ModelKind.PRIMITIVE);

      model.type = 'number';
      kind = TypeHelpers.extractKind(model);
      expect(kind).toEqual(ModelKind.PRIMITIVE);

      model.type = 'integer';
      kind = TypeHelpers.extractKind(model);
      expect(kind).toEqual(ModelKind.PRIMITIVE);

      model.type = 'boolean';
      kind = TypeHelpers.extractKind(model);
      expect(kind).toEqual(ModelKind.PRIMITIVE);
    });
  });

  describe('isNullableType', () => {
    test('should return true on nullable string', () => {
      const type = ['string', 'null'];
      const isNullable = TypeHelpers.isNullableType(type);
      expect(isNullable).toBeTruthy();
    });

    test('should return true on nullable boolean', () => {
      const type = ['boolean', 'null'];
      const isNullable = TypeHelpers.isNullableType(type);
      expect(isNullable).toBeTruthy();
    });
  });

  describe('isNullable', () => {
    test('should return string on nullable type', () => {
      const model = new CommonModel();
      model.type = ['string', 'null'];
      const isNullable = TypeHelpers.isNullable(model);
      expect(isNullable).toBeTruthy();
    });
  });
});
