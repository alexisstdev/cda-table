# table-cda

`table-cda` es un componente de tabla reutilizable para React diseñado para ser utilizado en proyectos que requieren funcionalidades avanzadas de visualización de datos.

Proyecto desarrollado para la materia de Tópicos Avanzados de Programación y hecho por Carlos Guzman, David Perez, Alexis Sanmiguel.

## Características

- **Filtrado Personalizado**: Permite aplicar filtros personalizados a las columnas de la tabla para una visualización más específica de los datos.
- **Paginado**: Incluye soporte para paginado, facilitando la navegación a través de grandes conjuntos de datos.
- **Ordenamiento (Sorting)**: Los usuarios pueden ordenar los datos en función de las columnas.
- **Integración con Chakra UI**: Utiliza Chakra UI para una apariencia consistente y accesible.
- **Integración con React Table**: Aprovecha `react-table` para la gestión de datos y funcionalidades avanzadas.

## Instalación

Para utilizar `table-cda` en tu proyecto, primero asegúrate de tener las dependencias necesarias instaladas. Puedes instalar `table-cda` mediante npm o yarn:

```bash
npm install table-cda
```

## Uso

```jsx
import React from 'react';
import { Table } from 'table-cda';
import { ChakraProvider } from '@chakra-ui/react';

const data = [
  // Datos de ejemplo
];

const columns = [
  // Definición de columnas
];

function App() {
  return (
    <ChakraProvider>
      <Table data={data} columns={columns} />
    </ChakraProvider>
  );
}

export default App;
```
