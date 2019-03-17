import { AppOperativosType } from "operativos";
import { Constructor, Request, AppBackend, TablaDatos } from "./types-datos-ext";
export * from "./types-datos-ext";
export declare function emergeAppDatosExt<T extends Constructor<AppOperativosType>>(Base: T): {
    new (...args: any[]): {
        configStaticConfig(): void;
        generateBaseTableDef(tablaDatos: TablaDatos): import("backend-plus").TableDefinition;
        clientIncludes(req: Request, hideBEPlusInclusions?: boolean): import("backend-plus").ClientModuleDefinition[];
        prepareGetTables(): void;
        allProcedures: import("backend-plus").ProcedureDef[];
        allClientFileNames: import("backend-plus").ClientModuleDefinition[];
        tablasDatos: TablaDatos[];
        cargarGenerados(client: import("pg-promise-strict").Client): Promise<string>;
        getTableDefFunction(tableDef: import("backend-plus").TableDefinition): import("backend-plus").TableDefinitionFunction;
        loadTableDef(tableDef: import("backend-plus").TableDefinition): import("backend-plus").TableDefinitionFunction;
        generateAndLoadTableDef(tablaDatos: TablaDatos): import("backend-plus").TableDefinitionFunction;
        procedures: import("backend-plus").ProcedureDef[];
        procedure: {
            [key: string]: import("backend-plus").ProcedureDef;
        } & {
            [key: string]: import("backend-plus").ProcedureDef;
        };
        app: import("backend-plus").ExpressPlus;
        getTableDefinition: import("backend-plus").TableDefinitionsGetters;
        tableStructures: import("backend-plus").TableDefinitions;
        db: typeof import("pg-promise-strict");
        config: any;
        rootPath: string;
        dumpDbSchemaPartial: ((partialTableStructures: import("backend-plus").TableDefinitions, opts?: {
            complete?: boolean;
            skipEnance?: boolean;
        }) => Promise<{
            mainSql: string;
            enancePart: string;
        }>) & ((partialTableStructures: import("backend-plus").TableDefinitions, opts?: {
            complete?: boolean;
            skipEnance?: boolean;
        }) => Promise<{
            mainSql: string;
            enancePart: string;
        }>);
    };
} & T;
