function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { Td, Tr } from '@chakra-ui/react';
import React from 'react';
var Row = function Row(_ref) {
  var row = _ref.row;
  return /*#__PURE__*/React.createElement(Tr, null, row.cells.map(function (cell) {
    return /*#__PURE__*/React.createElement(Td, _extends({}, cell.getCellProps(), {
      key: crypto.randomUUID()
    }), cell.render('Cell'));
  }));
};
export default Row;