function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { useMemo } from 'react';
import React from 'react';
import Select, { createFilter } from 'react-select';
export function MultiSelectColumnFilter(_ref) {
  var _ref$column = _ref.column,
    _ref$column$filterVal = _ref$column.filterValue,
    filterValue = _ref$column$filterVal === void 0 ? [] : _ref$column$filterVal,
    setFilter = _ref$column.setFilter,
    preFilteredRows = _ref$column.preFilteredRows,
    id = _ref$column.id,
    optionTextMap = _ref$column.optionTextMap;
  var options = useMemo(function () {
    var optionsSet = new Set();
    preFilteredRows.forEach(function (row) {
      var _row$values$id;
      optionsSet.add((_row$values$id = row.values[id]) === null || _row$values$id === void 0 ? void 0 : _row$values$id.toString());
    });
    return Array.from(optionsSet).map(function (option) {
      return {
        value: option,
        label: (optionTextMap === null || optionTextMap === void 0 ? void 0 : optionTextMap[option]) || option
      };
    });
  }, [id, preFilteredRows, optionTextMap]);
  var handleChange = function handleChange(selectedOptions) {
    var values = selectedOptions ? selectedOptions.map(function (opt) {
      return opt.value;
    }) : [];
    setFilter(values.length ? values : undefined);
  };
  return /*#__PURE__*/React.createElement(Select, {
    isMulti: true,
    value: options.filter(function (opt) {
      return filterValue.includes(opt.value);
    }),
    onChange: handleChange,
    options: options,
    placeholder: "Seleccionar opciones",
    noOptionsMessage: function noOptionsMessage() {
      return 'No hay opciones';
    },
    filterOption: createFilter({
      ignoreAccents: false
    }),
    styles: {
      control: function control(baseStyles) {
        return _objectSpread(_objectSpread({}, baseStyles), {}, {
          border: '1.5px solid #cbd5e0',
          borderColor: '#cbd5e0',
          overflow: 'hidden',
          borderRadius: 12,
          position: 'relative',
          ':hover': {
            borderColor: '#a0aec0'
          }
        });
      },
      option: function option(provided, state) {
        var bg = state.isFocused ? '#f2f6f9' : 'white';
        return _objectSpread(_objectSpread({}, provided), {}, {
          padding: '5px 10px',
          backgroundColor: bg,
          color: '#1a202c',
          borderRadius: 6,
          fontSize: '15px',
          ':hover': {
            backgroundColor: '#f2f6f9'
          }
        });
      },
      menu: function menu(provided) {
        return _objectSpread(_objectSpread({}, provided), {}, {
          borderRadius: 6,
          paddingInline: 5,
          paddingBlock: 3,
          width: 'fit-content'
        });
      },
      indicatorSeparator: function indicatorSeparator() {
        return {
          display: 'none'
        };
      },
      clearIndicator: function clearIndicator() {
        return {
          display: 'none'
        };
      },
      multiValue: function multiValue(base, state) {
        return _objectSpread(_objectSpread({}, base), {}, {
          backgroundColor: state.isFocused ? '#f2f6f9' : '#e2e8f0',
          borderRadius: 10,
          padding: '1px 1px',
          margin: '2px'
        });
      },
      multiValueLabel: function multiValueLabel(base) {
        return _objectSpread(_objectSpread({}, base), {}, {
          color: '#1a202c',
          fontSize: '12px'
        });
      },
      multiValueRemove: function multiValueRemove(base) {
        return _objectSpread(_objectSpread({}, base), {}, {
          color: '#1a202c',
          ':hover': {
            color: '#1a202c'
          }
        });
      },
      placeholder: function placeholder(base) {
        return _objectSpread(_objectSpread({}, base), {}, {
          fontSize: '15px'
        });
      },
      noOptionsMessage: function noOptionsMessage(base) {
        return _objectSpread(_objectSpread({}, base), {}, {
          padding: '5px 10px',
          color: '#1a202c',
          fontSize: '14px'
        });
      }
    }
  });
}