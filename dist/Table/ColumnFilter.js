function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { Box, Button, Divider, Flex, FormLabel, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Select, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import React from 'react';
var ColumnFilter = function ColumnFilter(_ref) {
  var _columns$find, _columns$find2;
  var columns = _ref.columns,
    setFilter = _ref.setFilter;
  var _useDisclosure = useDisclosure(),
    isOpen = _useDisclosure.isOpen,
    onOpen = _useDisclosure.onOpen,
    onClose = _useDisclosure.onClose;
  var _useState = useState(undefined),
    _useState2 = _slicedToArray(_useState, 2),
    selectedColumn = _useState2[0],
    setSelectedColumn = _useState2[1];
  useEffect(function () {
    if (!isOpen) {
      setSelectedColumn('');
    }
  }, [isOpen]);
  var handleSelectChange = function handleSelectChange(e) {
    setSelectedColumn(e.target.value);
  };
  var handleApplyFilter = function handleApplyFilter() {
    onClose();
  };
  var handleCancelFilter = function handleCancelFilter() {
    if (selectedColumn) {
      setFilter(selectedColumn, undefined);
    }
    setSelectedColumn('');
    onClose();
  };
  return /*#__PURE__*/React.createElement(Flex, {
    direction: "column",
    gap: 4,
    justifyContent: "left",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Popover, {
    isOpen: isOpen,
    onClose: onClose,
    closeOnBlur: false
  }, /*#__PURE__*/React.createElement(PopoverTrigger, null, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Filter columns",
    icon: /*#__PURE__*/React.createElement(FiFilter, null),
    h: 9,
    border: "1px solid #e2e8f0",
    bg: "white",
    onClick: onOpen
  })), /*#__PURE__*/React.createElement(PopoverContent, {
    p: 2,
    boxShadow: "lg",
    border: "1px solid #e2e8f0",
    rounded: "xl",
    maxW: "xl"
  }, /*#__PURE__*/React.createElement(PopoverArrow, null), /*#__PURE__*/React.createElement(PopoverBody, null, /*#__PURE__*/React.createElement(Box, {
    mb: 4
  }, /*#__PURE__*/React.createElement(FormLabel, null, "Seleccionar columna"), /*#__PURE__*/React.createElement(Select, {
    placeholder: "Seleccionar columna",
    onChange: handleSelectChange,
    value: selectedColumn,
    border: '1px solid #e2e8f0',
    bg: 'white',
    rounded: 'xl',
    size: "sm"
  }, columns.map(function (column) {
    return /*#__PURE__*/React.createElement("option", {
      key: column.id,
      value: column.id
    }, column.Header);
  }))), selectedColumn && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    mb: 4
  }, ((_columns$find = columns.find(function (col) {
    return col.id === selectedColumn;
  })) === null || _columns$find === void 0 ? void 0 : _columns$find.canFilter) && ((_columns$find2 = columns.find(function (col) {
    return col.id === selectedColumn;
  })) === null || _columns$find2 === void 0 ? void 0 : _columns$find2.render('Filter')))), /*#__PURE__*/React.createElement(Divider, {
    my: 4
  }), /*#__PURE__*/React.createElement(Flex, {
    justifyContent: "end",
    gap: 2
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    border: "1px solid #e2e8f0",
    bg: "white",
    onClick: handleCancelFilter
  }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    border: "1px solid #e2e8f0",
    colorScheme: "blue",
    onClick: handleApplyFilter
  }, "Aceptar"))))));
};
export default ColumnFilter;

/* 
  useEffect(() => {
    if (!isMenuOpen) {
      setSelectedColumn(undefined);
      onPopoverClose();
    }
  }, [isMenuOpen]);

  function handleSelectChange(columnId: string): void {
    setSelectedColumn(columnId);
    onPopoverOpen();
  }

  function handleClose(): void {
    onPopoverClose();
    onMenuClose();
  }

  <Flex justifyContent="end" gap={2} mt={4}>
                    <Button
                      size="sm"
                      border={'1px solid #e2e8f0'}
                      bg={'white'}
                      onClick={() => {
                        setFilter(column.id, undefined);
                        handleClose();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      border={'1px solid #e2e8f0'}
                      bg={'white'}
                      onClick={handleClose}
                    >
                      Aceptar
                    </Button>
                  </Flex>
*/