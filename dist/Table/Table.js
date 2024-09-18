function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { Table as ChakraTable, Flex, Heading, Icon, SkeletonText, TableContainer, Tag, TagCloseButton, TagLabel, Tbody, Td, Tfoot, Thead, Tr } from '@chakra-ui/react';
import React, { memo, useEffect, useMemo } from 'react';
import { FiLoader } from 'react-icons/fi';
import { useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import ColumnFilter from './ColumnFilter';
import { DefaultColumnFilter } from './CustomFilters/DefaultColumnFilter';
import GlobalFilter from './GlobalFilter';
import Header from './Header';
import PaginationActions from './PaginationActions';
import Row from './Row';
import { dateBetweenFilterFn, multiSelectFilterFn } from '../utils/utils';
var Table = function Table(_ref) {
  var data = _ref.data,
    columns = _ref.columns,
    isLoading = _ref.isLoading,
    title = _ref.title,
    _ref$showFilters = _ref.showFilters,
    showFilters = _ref$showFilters === void 0 ? true : _ref$showFilters,
    customFilterComponent = _ref.customFilterComponent,
    onSelectRowsChange = _ref.onSelectRowsChange,
    defaultFilter = _ref.defaultFilter,
    isFetching = _ref.isFetching;
  var tableData = useMemo(function () {
    return isLoading ? Array(30).fill({}) : data;
  }, [isLoading, data]);
  var renderSkeletonOrCell = useMemo(function () {
    return function (column) {
      var isSpecialColumn = ['actions', 'selection'].includes(column.id);
      if (isSpecialColumn) {
        return column.Cell;
      } else {
        return function () {
          return /*#__PURE__*/React.createElement(SkeletonText, {
            noOfLines: 1
          });
        };
      }
    };
  }, []);
  var columnsMemo = useMemo(function () {
    if (isLoading) {
      return columns.map(function (column) {
        return _objectSpread(_objectSpread({}, column), {}, {
          Cell: renderSkeletonOrCell(column)
        });
      });
    } else {
      return columns;
    }
  }, [isLoading, columns]);
  var defaultColumn = useMemo(function () {
    return {
      Filter: DefaultColumnFilter,
      filter: 'text'
    };
  }, []);
  var filterTypes = useMemo(function () {
    return {
      text: multiSelectFilterFn,
      dateBetween: dateBetweenFilterFn,
      equals: multiSelectFilterFn
    };
  }, []);
  var _useTable = useTable({
      filterTypes: filterTypes,
      initialState: {
        hiddenColumns: columns.filter(function (column) {
          return (column === null || column === void 0 ? void 0 : column.show) === false && column.id !== 'selection' && column.id !== 'actions';
        }).map(function (column) {
          var stringToShow;
          if (typeof column.accessor === 'string') {
            stringToShow = column.accessor;
          } else {
            stringToShow = column.id;
          }
          return stringToShow;
        }),
        pageIndex: 0,
        pageSize: 10,
        filters: defaultFilter !== null && defaultFilter !== void 0 ? defaultFilter : []
      },
      disableSortRemove: true,
      columns: columnsMemo,
      data: tableData,
      defaultColumn: defaultColumn,
      autoResetFilters: false,
      autoResetGlobalFilter: false,
      autoResetPage: false,
      autoResetSortBy: false
    }, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect),
    _useTable$state = _useTable.state,
    pageSize = _useTable$state.pageSize,
    filters = _useTable$state.filters,
    globalFilter = _useTable$state.globalFilter,
    canPreviousPage = _useTable.canPreviousPage,
    headerGroups = _useTable.headerGroups,
    footerGroups = _useTable.footerGroups,
    canNextPage = _useTable.canNextPage,
    page = _useTable.page,
    getTableProps = _useTable.getTableProps,
    getTableBodyProps = _useTable.getTableBodyProps,
    setPageSize = _useTable.setPageSize,
    gotoPage = _useTable.gotoPage,
    setFilter = _useTable.setFilter,
    prepareRow = _useTable.prepareRow,
    nextPage = _useTable.nextPage,
    setGlobalFilter = _useTable.setGlobalFilter,
    allColumns = _useTable.allColumns,
    previousPage = _useTable.previousPage,
    setAllFilters = _useTable.setAllFilters,
    selectedFlatRows = _useTable.selectedFlatRows;
  useEffect(function () {
    gotoPage(0);
  }, [globalFilter, filters]);
  useEffect(function () {
    if (onSelectRowsChange) {
      onSelectRowsChange(selectedFlatRows.map(function (row) {
        return row.original;
      }));
    }
  }, [selectedFlatRows, onSelectRowsChange]);
  var getFilterDisplayValue = function getFilterDisplayValue(filter, column) {
    var value = filter.value;
    if (Array.isArray(value) && value[0] instanceof Date) {
      var _value = _slicedToArray(value, 2),
        startDate = _value[0],
        endDate = _value[1];
      var formattedStartDate = formatDate(startDate);
      var formattedEndDate = formatDate(endDate);
      return "".concat(formattedStartDate, " ").concat(endDate ? 'al ' + formattedEndDate : '');
    }
    if (Array.isArray(value)) {
      return value.map(function (val) {
        var _column$optionTextMap;
        return (column === null || column === void 0 || (_column$optionTextMap = column.optionTextMap) === null || _column$optionTextMap === void 0 ? void 0 : _column$optionTextMap[val]) || val;
      }).join(', ');
    }
    if (column && column.optionTextMap) {
      return column.optionTextMap[value] || value;
    }
    return value;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Flex, {
    alignItems: {
      base: 'start',
      md: 'center'
    },
    mb: 2,
    flexDirection: {
      base: 'column',
      md: 'row'
    },
    position: 'relative',
    justifyContent: 'space-between'
  }, /*#__PURE__*/React.createElement(Flex, {
    gap: 2,
    alignItems: 'center'
  }, showFilters === true && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GlobalFilter, {
    setGlobalFilter: setGlobalFilter
  }), /*#__PURE__*/React.createElement(ColumnFilter, {
    setAllFilters: setAllFilters,
    stateFilters: filters,
    columns: allColumns.filter(function (column) {
      return (column === null || column === void 0 ? void 0 : column.defaultCanFilter) !== false;
    }),
    setFilter: setFilter
  })), title && /*#__PURE__*/React.createElement(Heading, {
    fontSize: 'xl',
    fontWeight: 'semibold'
  }, title), customFilterComponent), /*#__PURE__*/React.createElement(Flex, {
    alignItems: 'center'
  }, isFetching === true && /*#__PURE__*/React.createElement(Icon, {
    as: FiLoader,
    sx: {
      '@keyframes spin': {
        '0%': {
          transform: 'rotate(0deg)'
        },
        '100%': {
          transform: 'rotate(360deg)'
        }
      },
      animation: 'spin 10s linear infinite'
    }
  }), /*#__PURE__*/React.createElement(PaginationActions, {
    canNextPage: canNextPage,
    canPreviousPage: canPreviousPage,
    pageSize: pageSize,
    nextPage: nextPage,
    previousPage: previousPage,
    setPageSize: setPageSize
  }))), filters.length > 0 && /*#__PURE__*/React.createElement(Flex, {
    wrap: "wrap",
    gap: 2,
    alignItems: 'center',
    mb: 2
  }, allColumns.map(function (column) {
    return filters.map(function (filter) {
      return filter.id === column.id ? /*#__PURE__*/React.createElement(Tag, {
        key: filter.id,
        size: "sm",
        py: 1,
        borderRadius: "md",
        variant: "solid",
        border: "1px solid #e2e8f0",
        bg: "white",
        color: "gray.700",
        mr: 1,
        mb: 1
      }, /*#__PURE__*/React.createElement(TagLabel, {
        fontWeight: 'semibold'
      }, column.render('Header'), " ", column.isInverted && ' no es', ":", ' ', getFilterDisplayValue(filter, column).toString()), /*#__PURE__*/React.createElement(TagCloseButton, {
        opacity: 1,
        "aria-label": "Limpiar filtro",
        onClick: function onClick() {
          return setFilter(column.id, undefined);
        }
      })) : null;
    });
  })), /*#__PURE__*/React.createElement(TableContainer, {
    pb: 4,
    maxH: '70vh',
    overflowY: 'auto'
  }, /*#__PURE__*/React.createElement(ChakraTable, _extends({}, getTableProps(), {
    bg: 'white',
    rounded: 'xl',
    boxShadow: 'md',
    size: 'sm',
    overflow: 'hidden'
  }), /*#__PURE__*/React.createElement(Thead, {
    position: 'sticky',
    top: 0,
    bg: 'white'
  }, headerGroups.map(function (headerGroup, index) {
    return /*#__PURE__*/React.createElement(Tr, _extends({}, headerGroup.getHeaderGroupProps(), {
      key: index
    }), headerGroup.headers.map(function (column) {
      return /*#__PURE__*/React.createElement(Header, {
        key: column.id,
        header: column
      });
    }));
  })), /*#__PURE__*/React.createElement(Tbody, getTableBodyProps(), page.length > 0 ? page.map(function (row, index) {
    prepareRow(row);
    return /*#__PURE__*/React.createElement(Row, {
      key: index,
      row: row
    });
  }) : /*#__PURE__*/React.createElement(Tr, null, /*#__PURE__*/React.createElement(Td, {
    colSpan: headerGroups[0].headers.length,
    textAlign: 'center',
    py: 6,
    color: 'GrayText'
  }, "No hay datos para mostrar"))), /*#__PURE__*/React.createElement(Tfoot, null, columns.some(function (column) {
    return 'Footer' in column;
  }) && footerGroups.map(function (group) {
    return /*#__PURE__*/React.createElement(Tr, group.getFooterGroupProps(), group.headers.map(function (column) {
      return /*#__PURE__*/React.createElement(Td, column.getFooterProps(), column.render('Footer'));
    }));
  })))));
};
var MemoTable = /*#__PURE__*/memo(Table);
export default MemoTable;