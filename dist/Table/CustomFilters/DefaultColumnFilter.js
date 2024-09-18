function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { Box, IconButton, Input, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import React from 'react';
export function DefaultColumnFilter(_ref) {
  var _ref$column = _ref.column,
    _ref$column$filterVal = _ref$column.filterValue,
    filterValue = _ref$column$filterVal === void 0 ? [] : _ref$column$filterVal,
    setFilter = _ref$column.setFilter;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  var _useState3 = useState(filterValue),
    _useState4 = _slicedToArray(_useState3, 2),
    filterValues = _useState4[0],
    setFilterValues = _useState4[1];
  var debouncedSetFilter = useMemo(function () {
    return debounce(function (values) {
      return setFilter(values.length ? values : undefined);
    }, 300);
  }, [setFilter]);
  useEffect(function () {
    setFilterValues(filterValue);
  }, []);
  var addFilterValue = function addFilterValue() {
    if (inputValue && !filterValues.includes(inputValue)) {
      var newFilterValues = [].concat(_toConsumableArray(filterValues), [inputValue]);
      setFilterValues(newFilterValues);
      debouncedSetFilter(newFilterValues);
      setInputValue('');
    }
  };
  var removeFilterValue = function removeFilterValue(valueToRemove) {
    var newFilterValues = filterValues.filter(function (value) {
      return value !== valueToRemove;
    });
    setFilterValues(newFilterValues);
    debouncedSetFilter(newFilterValues);
  };
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    display: "flex",
    alignItems: "center",
    gap: 2
  }, /*#__PURE__*/React.createElement(Input, {
    value: inputValue,
    border: '1px solid #e2e8f0',
    bg: 'white',
    rounded: 'xl',
    size: "sm",
    placeholder: "Buscar",
    onChange: function onChange(e) {
      return setInputValue(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Add filter",
    icon: /*#__PURE__*/React.createElement(FiPlus, null),
    size: "sm",
    border: "1px solid #e2e8f0",
    bg: "white",
    onClick: addFilterValue
  })), /*#__PURE__*/React.createElement(Box, {
    mt: 4
  }, filterValues.map(function (value, index) {
    return /*#__PURE__*/React.createElement(Tag, {
      key: index,
      size: "sm",
      borderRadius: "md",
      variant: "solid",
      border: "1px solid #e2e8f0",
      bg: "white",
      color: "gray.700",
      mr: 1,
      mb: 1
    }, /*#__PURE__*/React.createElement(TagLabel, null, value), /*#__PURE__*/React.createElement(TagCloseButton, {
      opacity: 0.8,
      "aria-label": "Limpiar filtro",
      onClick: function onClick() {
        return removeFilterValue(value);
      }
    }));
  })));
}