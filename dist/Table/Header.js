function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { Box, Flex, Th } from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import React from 'react';
var Header = function Header(_ref) {
  var header = _ref.header;
  var toggleSortBy = function toggleSortBy() {
    if (!header.isSorted) {
      header.toggleSortBy(true); // Sort ascending
    } else if (header.isSorted && header.isSortedDesc) {
      header.toggleSortBy(false); // Sort descending
    } else {
      header.clearSortBy(); // Remove sorting
    }
  };
  return /*#__PURE__*/React.createElement(Th, {
    key: crypto.randomUUID(),
    py: 4
  }, /*#__PURE__*/React.createElement(Flex, _extends({}, header.getHeaderProps(), {
    onClick: toggleSortBy,
    position: 'relative',
    color: header.isSorted ? 'inherit' : 'gray.500',
    title: "Ordenar por ".concat(header.Header),
    textTransform: 'capitalize',
    w: 'fit-content',
    fontWeight: 'semibold',
    alignItems: 'center',
    gap: 4,
    userSelect: 'none',
    cursor: 'pointer'
  }), header.render('Header'), /*#__PURE__*/React.createElement(Box, {
    position: 'absolute',
    right: '-20px'
  }, header.isSorted && (header.isSortedDesc === true ? /*#__PURE__*/React.createElement(FiChevronDown, null) : /*#__PURE__*/React.createElement(FiChevronUp, null)))));
};
export default Header;