import {
  Table as ChakraTable,
  Flex,
  Heading,
  Icon,
  SkeletonText,
  TableContainer,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { memo, useEffect, useMemo } from 'react';
import { FiLoader } from 'react-icons/fi';
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import ColumnFilter from './ColumnFilter';
import { DefaultColumnFilter } from './CustomFilters/DefaultColumnFilter';
import GlobalFilter from './GlobalFilter';
import Header from './Header';
import PaginationActions from './PaginationActions';
import Row from './Row';
import { dateBetweenFilterFn, multiSelectFilterFn } from '../utils/utils';

const Table = ({
  data,
  columns,
  isLoading,
  title,
  showFilters = true,
  customFilterComponent,
  onSelectRowsChange,
  defaultFilter,
  isFetching,
}) => {
  const tableData = useMemo(
    () => (isLoading ? Array(30).fill({}) : data),
    [isLoading, data]
  );

  const renderSkeletonOrCell = useMemo(
    () => (column) => {
      const isSpecialColumn = ['actions', 'selection'].includes(column.id);

      if (isSpecialColumn) {
        return column.Cell;
      } else {
        return () => <SkeletonText noOfLines={1} />;
      }
    },
    []
  );

  const columnsMemo = useMemo(() => {
    if (isLoading) {
      return columns.map((column) => ({
        ...column,
        Cell: renderSkeletonOrCell(column),
      }));
    } else {
      return columns;
    }
  }, [isLoading, columns]);

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      filter: 'text',
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      text: multiSelectFilterFn,
      dateBetween: dateBetweenFilterFn,
      equals: multiSelectFilterFn,
    }),
    []
  );

  const {
    state: { pageSize, filters, globalFilter },
    canPreviousPage,
    headerGroups,
    footerGroups,
    canNextPage,
    page,
    getTableProps,
    getTableBodyProps,
    setPageSize,
    gotoPage,
    setFilter,
    prepareRow,
    nextPage,
    setGlobalFilter,
    allColumns,
    previousPage,
    setAllFilters,
    selectedFlatRows,
  } = useTable(
    {
      filterTypes: filterTypes,
      initialState: {
        hiddenColumns: columns
          .filter(
            (column) =>
              column?.show === false &&
              column.id !== 'selection' &&
              column.id !== 'actions'
          )
          .map((column) => {
            let stringToShow;
            if (typeof column.accessor === 'string') {
              stringToShow = column.accessor;
            } else {
              stringToShow = column.id;
            }

            return stringToShow;
          }),
        pageIndex: 0,
        pageSize: 10,
        filters: defaultFilter ?? [],
      },
      disableSortRemove: true,
      columns: columnsMemo,
      data: tableData,
      defaultColumn,

      autoResetFilters: false,
      autoResetGlobalFilter: false,
      autoResetPage: false,
      autoResetSortBy: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    gotoPage(0);
  }, [globalFilter, filters]);

  useEffect(() => {
    if (onSelectRowsChange) {
      onSelectRowsChange(selectedFlatRows.map((row) => row.original));
    }
  }, [selectedFlatRows, onSelectRowsChange]);

  const getFilterDisplayValue = (filter, column) => {
    const { value } = filter;

    if (Array.isArray(value) && value[0] instanceof Date) {
      const [startDate, endDate] = value;

      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      return `${formattedStartDate} ${endDate ? 'al ' + formattedEndDate : ''}`;
    }

    if (Array.isArray(value)) {
      return value.map((val) => column?.optionTextMap?.[val] || val).join(', ');
    }

    if (column && column.optionTextMap) {
      return column.optionTextMap[value] || value;
    }

    return value;
  };

  return (
    <>
      <Flex
        alignItems={{
          base: 'start',
          md: 'center',
        }}
        mb={2}
        flexDirection={{ base: 'column', md: 'row' }}
        position={'relative'}
        justifyContent={'space-between'}
      >
        <Flex gap={2} alignItems={'center'}>
          {showFilters === true && (
            <>
              <GlobalFilter setGlobalFilter={setGlobalFilter} />
              <ColumnFilter
                setAllFilters={setAllFilters}
                stateFilters={filters}
                columns={allColumns.filter(
                  (column) => column?.defaultCanFilter !== false
                )}
                setFilter={setFilter}
              />
            </>
          )}

          {title && (
            <Heading fontSize={'xl'} fontWeight={'semibold'}>
              {title}
            </Heading>
          )}

          {customFilterComponent}
        </Flex>

        <Flex alignItems={'center'}>
          {isFetching === true && (
            <Icon
              as={FiLoader}
              sx={{
                '@keyframes spin': {
                  '0%': {
                    transform: 'rotate(0deg)',
                  },
                  '100%': {
                    transform: 'rotate(360deg)',
                  },
                },
                animation: 'spin 10s linear infinite',
              }}
            />
          )}
          <PaginationActions
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            pageSize={pageSize}
            nextPage={nextPage}
            previousPage={previousPage}
            setPageSize={setPageSize}
          />
        </Flex>
      </Flex>

      {filters.length > 0 && (
        <Flex wrap='wrap' gap={2} alignItems={'center'} mb={2}>
          {allColumns.map((column) =>
            filters.map((filter) => {
              return filter.id === column.id ? (
                <Tag
                  key={filter.id}
                  size='sm'
                  py={1}
                  borderRadius='md'
                  variant='solid'
                  border='1px solid #e2e8f0'
                  bg='white'
                  color='gray.700'
                  mr={1}
                  mb={1}
                >
                  <TagLabel fontWeight={'semibold'}>
                    {/* @ts-ignore */}
                    {column.render('Header')} {column.isInverted && ' no es'}:{' '}
                    {getFilterDisplayValue(filter, column).toString()}
                  </TagLabel>
                  <TagCloseButton
                    opacity={1}
                    aria-label='Limpiar filtro'
                    onClick={() => setFilter(column.id, undefined)}
                  />
                </Tag>
              ) : null;
            })
          )}
        </Flex>
      )}

      <TableContainer pb={4} maxH={'70vh'} overflowY={'auto'}>
        <ChakraTable
          {...getTableProps()}
          bg={'white'}
          rounded={'xl'}
          boxShadow={'md'}
          size={'sm'}
          overflow={'hidden'}
        >
          <Thead position={'sticky'} top={0} bg={'white'}>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column) => (
                  <Header key={column.id} header={column} />
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row, index) => {
                prepareRow(row);
                return <Row key={index} row={row} />;
              })
            ) : (
              <Tr>
                <Td
                  colSpan={headerGroups[0].headers.length}
                  textAlign={'center'}
                  py={6}
                  color={'GrayText'}
                >
                  No hay datos para mostrar
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot>
            {columns.some((column) => 'Footer' in column) &&
              footerGroups.map((group) => (
                <Tr {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <Td {...column.getFooterProps()}>{column.render('Footer')}</Td>
                  ))}
                </Tr>
              ))}
          </Tfoot>
        </ChakraTable>
      </TableContainer>
    </>
  );
};

const MemoTable = memo(Table);
export default MemoTable;
