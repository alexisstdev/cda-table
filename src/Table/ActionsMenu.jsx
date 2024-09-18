import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

export function ActionsMenu({ children }) {
  return (
    <Menu isLazy>
      <MenuButton
        aria-label='Options'
        as={IconButton}
        icon={<FiMoreVertical />}
        variant='ghost'
        borderRadius={'50%'}
      />
      <MenuList
        py={0}
        fontSize='md'
        boxShadow={'md'}
        border={'1px solid #e2e8f0'}
        bg={'white'}
      >
        {children}
      </MenuList>
    </Menu>
  );
}
