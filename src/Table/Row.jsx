import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

const Row = ({ row }) => {
  return (
    <Tr>
      {row.cells.map((cell) => {
        return (
          <Td {...cell.getCellProps()} key={crypto.randomUUID()}>
            {cell.render('Cell')}
          </Td>
        );
      })}
    </Tr>
  );
};

export default Row;
