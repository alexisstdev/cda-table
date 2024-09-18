import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import React from 'react';
var GlobalFilter = function GlobalFilter(_ref) {
  var setGlobalFilter = _ref.setGlobalFilter;
  return /*#__PURE__*/React.createElement(Flex, {
    gap: 4,
    justifyContent: 'left',
    alignItems: 'center'
  }, /*#__PURE__*/React.createElement(InputGroup, null, /*#__PURE__*/React.createElement(InputLeftElement, {
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(FiSearch, {
    color: "gray.300"
  })), /*#__PURE__*/React.createElement(Input, {
    type: "search",
    variant: 'flushed',
    size: 'md',
    w: 'fit-content',
    placeholder: "Buscar...",
    onChange: function onChange(e) {
      setGlobalFilter(e.target.value);
    }
  })));
};
export default GlobalFilter;