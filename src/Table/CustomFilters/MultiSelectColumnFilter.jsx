import { useMemo } from 'react';
import React from 'react';
import Select, { createFilter } from 'react-select';

export function MultiSelectColumnFilter({
  column: { filterValue = [], setFilter, preFilteredRows, id, optionTextMap },
}) {
  const options = useMemo(() => {
    const optionsSet = new Set();

    preFilteredRows.forEach((row) => {
      optionsSet.add(row.values[id]?.toString());
    });

    return Array.from(optionsSet).map((option) => ({
      value: option,
      label: optionTextMap?.[option] || option,
    }));
  }, [id, preFilteredRows, optionTextMap]);

  const handleChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setFilter(values.length ? values : undefined);
  };

  return (
    <Select
      isMulti
      value={options.filter((opt) => filterValue.includes(opt.value))}
      onChange={handleChange}
      options={options}
      placeholder='Seleccionar opciones'
      noOptionsMessage={() => 'No hay opciones'}
      filterOption={createFilter({ ignoreAccents: false })}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: '1.5px solid #cbd5e0',
          borderColor: '#cbd5e0',
          overflow: 'hidden',
          borderRadius: 12,
          position: 'relative',
          ':hover': {
            borderColor: '#a0aec0',
          },
        }),
        option: (provided, state) => {
          const bg = state.isFocused ? '#f2f6f9' : 'white';

          return {
            ...provided,
            padding: '5px 10px',
            backgroundColor: bg,
            color: '#1a202c',
            borderRadius: 6,
            fontSize: '15px',
            ':hover': {
              backgroundColor: '#f2f6f9',
            },
          };
        },
        menu: (provided) => ({
          ...provided,
          borderRadius: 6,
          paddingInline: 5,
          paddingBlock: 3,
          width: 'fit-content',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        clearIndicator: () => ({
          display: 'none',
        }),
        multiValue: (base, state) => {
          return {
            ...base,
            backgroundColor: state.isFocused ? '#f2f6f9' : '#e2e8f0',
            borderRadius: 10,
            padding: '1px 1px',
            margin: '2px',
          };
        },
        multiValueLabel: (base) => ({
          ...base,
          color: '#1a202c',
          fontSize: '12px',
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: '#1a202c',
          ':hover': {
            color: '#1a202c',
          },
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: '15px',
        }),
        noOptionsMessage: (base) => ({
          ...base,
          padding: '5px 10px',
          color: '#1a202c',
          fontSize: '14px',
        }),
      }}
    />
  );
}
