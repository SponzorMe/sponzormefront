# Estructura de la carpeta

Las vistas se agrupan por controlador, cada controlador debe tener una carpeta de vista
asociada por ejemplo el controlador api debe tener sus vistas en app/view/api/
cada nueva vista debe estar agregada en este archivo en la lista de vistas actuales.

#Vistas actuales
api/description.blade.pjp

# Views folder format
Todos los folders deben estar en minuscula y coincidir con el nombre de un
controller, si el folder o la vista tienen mas de una palabra se separa con
"_" guión bajo.
app/
├── views/
   ├── controllername2/
		├──template.blade.php
   		├──partial-view/
 		├── view1.blade.php
			├── view2.blade.php
			├── ...
	├── controllername2/
		├──template.blade.php
   		├──partial-view/
 		├── view1.blade.php
			├── view2.blade.php
			├── ...

Las vis

# Views structure  
Cada vista debe tener la siguiente estructura
