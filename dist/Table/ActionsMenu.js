import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
export function ActionsMenu(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(Menu, {
    isLazy: true
  }, /*#__PURE__*/React.createElement(MenuButton, {
    "aria-label": "Options",
    as: IconButton,
    icon: /*#__PURE__*/React.createElement(FiMoreVertical, null),
    variant: "ghost",
    borderRadius: '50%'
  }), /*#__PURE__*/React.createElement(MenuList, {
    py: 0,
    fontSize: "md",
    boxShadow: 'md',
    border: '1px solid #e2e8f0',
    bg: 'white'
  }, children));
}