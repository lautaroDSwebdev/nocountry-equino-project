src/
├── _component/
│   ├── context/
│   │   └── (los provider globales)
│   ├── columns/
│   │   └── (columnas de las DataTablesde shadcn)
│   ├── tables/
│   │   └── (header y body de las tablas de shadcn)
│   ├── ui/ (componentes reutilizables)
│   ├── (componentes generales para la pagina)  
│   ├── layout.tsx
│   ├── Login.tsx
│   └── ...entre otros componentes
├── app/
├── components/ui/
│   └── esta es una carpeta donde se almacena los componentes que descargamos de shad cn
├── mock/
│   └── (todos los json y los datos de las columnas en las tablas shadcn)
├── lib/
│   └── otra carpeta que no hace falta tocar conectada tambien a shad cn
├── schemas/
│   └── nuestros schemas conectados a los formularios de react-hook-form y zod
├── service/
│   ├── mutations/
│   │   └── funciones de react query conectadas a peticiones rest de axios
│   ├── use-cases/
│   │   └── funciones conectadas al .env y al axios para peticiones rest
│   └── api.general.ts => acá guardamos las constantes conectadas al archivo .env 
└── types/
    └── todas nuestras interfaces para typescript diferenciadas por entidad o uso