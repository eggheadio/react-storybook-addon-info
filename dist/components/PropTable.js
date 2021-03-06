'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropVal = require('./PropVal');

var _PropVal2 = _interopRequireDefault(_PropVal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactPropTypeArgs = void 0;
var PropTypesMap = new _map2.default();
for (var typeName in _react2.default.PropTypes) {
  if (!_react2.default.PropTypes.hasOwnProperty(typeName)) {
    continue;
  }
  var type = _react2.default.PropTypes[typeName];
  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
}

var SpecialPropTypes = [{ regex: /, expected an array/m, name: function name(match) {
    return 'arrayOf';
  } }, { regex: /, expected `object`/m, name: function name(match) {
    return 'shape';
  } }, { regex: /, expected one of (\[.+])/m, name: function name(match) {
    return 'oneOf(' + match[1] + ')';
  } }, { regex: /, expected instance of `([^`]+)`/m, name: function name(match) {
    return 'instanceOf(' + match[1] + ')';
  } }, { regex: /, expected an object/m, name: function name(match) {
    return 'objectOf';
  } }];

var stylesheet = {
  propTable: {
    textAlign: 'left',
    padding: 20
  },
  rowHeader: {
    textTransform: 'uppercase',
    fontSize: 18
  },
  cell: {
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: 5,
    wordWrap: 'break-word',
    maxWidth: 300
  }
};

var PropTable = function (_React$Component) {
  (0, _inherits3.default)(PropTable, _React$Component);

  function PropTable() {
    (0, _classCallCheck3.default)(this, PropTable);
    return (0, _possibleConstructorReturn3.default)(this, (PropTable.__proto__ || (0, _getPrototypeOf2.default)(PropTable)).apply(this, arguments));
  }

  (0, _createClass3.default)(PropTable, [{
    key: 'render',
    value: function render() {
      var type = this.props.type;

      if (!type) {
        return null;
      }

      var props = {};

      if (type.propTypes) {
        for (var property in type.propTypes) {
          if (!type.propTypes.hasOwnProperty(property)) {
            continue;
          }
          var typeInfo = type.propTypes[property];
          var propType = PropTypesMap.get(typeInfo);
          if (!propType) {
            (function () {
              var outcome = typeInfo.apply(undefined, (0, _toConsumableArray3.default)(ReactPropTypeArgs));
              var match = void 0;
              SpecialPropTypes.find(function (spt) {
                if (match = outcome.message.match(spt.regex)) {
                  propType = spt.name(match);
                  return true;
                }
              });
            })();
          }
          var required = typeInfo.isRequired === undefined;
          props[property] = { property: property, propType: propType, required: required };
        }
      }

      if (type.defaultProps) {
        for (var _property in type.defaultProps) {
          if (!type.defaultProps.hasOwnProperty(_property)) {
            continue;
          }
          var value = type.defaultProps[_property];
          if (value === undefined) {
            continue;
          }
          if (!props[_property]) {
            props[_property] = { property: _property };
          }
          props[_property].defaultValue = value;
        }
      }

      var array = (0, _values2.default)(props);
      if (!array.length) {
        return _react2.default.createElement(
          'small',
          null,
          'No propTypes defined!'
        );
      }
      array.sort(function (a, b) {
        return a.property > b.property;
      });

      return _react2.default.createElement(
        'table',
        { style: (0, _extends3.default)({}, stylesheet.propTable, stylesheet.cell) },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { style: (0, _extends3.default)({}, stylesheet.cell, stylesheet.rowHeader) },
              'Prop'
            ),
            _react2.default.createElement(
              'th',
              { style: (0, _extends3.default)({}, stylesheet.cell, stylesheet.rowHeader) },
              'Prop Type'
            ),
            _react2.default.createElement(
              'th',
              { style: (0, _extends3.default)({}, stylesheet.cell, stylesheet.rowHeader) },
              'Required'
            ),
            _react2.default.createElement(
              'th',
              { style: (0, _extends3.default)({}, stylesheet.cell, stylesheet.rowHeader) },
              'Default'
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          array.map(function (row) {
            return _react2.default.createElement(
              'tr',
              { key: row.property },
              _react2.default.createElement(
                'td',
                { style: stylesheet.cell },
                row.property
              ),
              _react2.default.createElement(
                'td',
                { style: stylesheet.cell },
                row.propType || 'other'
              ),
              _react2.default.createElement(
                'td',
                { style: stylesheet.cell },
                row.required ? _react2.default.createElement(
                  'span',
                  { style: { color: '#42c2b3' } },
                  'yes'
                ) : 'no'
              ),
              _react2.default.createElement(
                'td',
                { style: stylesheet.cell },
                row.defaultValue === undefined ? '-' : _react2.default.createElement(_PropVal2.default, { val: row.defaultValue })
              )
            );
          })
        )
      );
    }
  }]);
  return PropTable;
}(_react2.default.Component);

exports.default = PropTable;


PropTable.displayName = 'PropTable';
PropTable.propTypes = {
  type: function type() {
    var _React$PropTypes;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    //This is a trick to get valid arguments to pass to React's PropTypes functions
    ReactPropTypeArgs = args;
    return (_React$PropTypes = _react2.default.PropTypes).func.apply(_React$PropTypes, args);
  }
};