# Boilerplate

Boilerplate entregado por [Nicolás Gebauer](https://github.com/negebauer).

### Consideraciones
- Reducers colocarlos en la carpeta **redux/modules**, e importarlos en **reducers.js**
- Cualquier componente nuevo agregarlo en la carpeta **components**
- Llamados a alguna Api se deben definir en la carpeta **Apis**, con un archivo para cada Api
- Los componentes más generales son "*Screens*", y deben estar en la carpeta **screens**
- Los elementos renderizados por *Router* deben ser *Screens*
- Las acciones que gatillen cambios, deben ser definidas en **redux/actions**
