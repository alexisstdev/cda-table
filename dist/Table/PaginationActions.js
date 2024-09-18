import { Flex, IconButton, Select, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import React from 'react';
var PaginationActions = function PaginationActions(_ref) {
  var canPreviousPage = _ref.canPreviousPage,
    canNextPage = _ref.canNextPage,
    nextPage = _ref.nextPage,
    previousPage = _ref.previousPage,
    setPageSize = _ref.setPageSize,
    pageSize = _ref.pageSize;
  return /*#__PURE__*/React.createElement(Flex, {
    alignItems: 'center'
  }, /*#__PURE__*/React.createElement(Flex, {
    mx: 4
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Anterior",
    rounded: 'full',
    isDisabled: !canPreviousPage,
    icon: /*#__PURE__*/React.createElement(FiChevronLeft, null),
    variant: 'ghost',
    onClick: function onClick() {
      previousPage();
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    rounded: 'full',
    "aria-label": "Siguiente",
    isDisabled: !canNextPage,
    icon: /*#__PURE__*/React.createElement(FiChevronRight, null),
    variant: 'ghost',
    onClick: function onClick() {
      nextPage();
    }
  })), /*#__PURE__*/React.createElement(Flex, {
    alignItems: 'center',
    gap: 2
  }, /*#__PURE__*/React.createElement(Text, null, "Filas:"), /*#__PURE__*/React.createElement(Select, {
    value: pageSize,
    w: 'fit-content',
    border: '1px solid #e2e8f0',
    rounded: 'md',
    bg: 'white',
    size: 'sm',
    onChange: function onChange(e) {
      setPageSize(Number(e.target.value));
    }
  }, [10, 20, 30].map(function (pageSize) {
    return /*#__PURE__*/React.createElement("option", {
      key: pageSize,
      value: pageSize
    }, pageSize);
  }))));
};
export default PaginationActions;