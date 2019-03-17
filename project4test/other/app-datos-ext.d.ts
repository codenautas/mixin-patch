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
        // mixin-patch: postConfig: (() => Promise<void>) & ((...params: any[]) => any);
        getTableDefFunction(tableDef: import("backend-plus").TableDefinition): import("backend-plus").TableDefinitionFunction;
        loadTableDef(tableDef: import("backend-plus").TableDefinition): import("backend-plus").TableDefinitionFunction;
        generateAndLoadTableDef(tablaDatos: TablaDatos): import("backend-plus").TableDefinitionFunction;
        // mixin-patch: getProcedures: (() => Promise<import("backend-plus").ProcedureDef[]>) & (() => Promise<import("backend-plus").ProcedureDef[]>);
        // mixin-patch: getMenu: (() => import("operativos").MenuDefinition) & ((context?: import("backend-plus").Context) => import("backend-plus").MenuDefinition);
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
        // mixin-patch: start: ((opts?: import("backend-plus").StartOptions) => Promise<void>) & ((opts?: import("backend-plus").StartOptions) => Promise<void>);
        // mixin-patch: getTables: (() => import("backend-plus").TableItemDef[]) & (() => import("backend-plus").TableItemDef[]);
        // mixin-patch: appendToTableDefinition: ((tableName: string, appenderFunction: (tableDef: import("backend-plus").TableDefinition, context?: import("backend-plus").TableContext) => void) => void) & ((tableName: string, appenderFunction: (tableDef: import("backend-plus").TableDefinition, context?: import("backend-plus").TableContext) => void) => void);
        // mixin-patch: getContext: ((req: Request) => import("backend-plus").Context) & ((req: Request) => import("backend-plus").Context);
        // mixin-patch: addSchrödingerServices: ((mainApp: import("backend-plus").ExpressPlus, baseUrl: string) => void) & ((mainApp: import("backend-plus").ExpressPlus, baseUrl: string) => void);
        // mixin-patch: addUnloggedServices: ((mainApp: import("backend-plus").ExpressPlus, baseUrl: string) => void) & ((mainApp: import("backend-plus").ExpressPlus, baseUrl: string) => void);
        // mixin-patch: addLoggedServices: (() => void) & (() => void);
        // mixin-patch: inDbClient: (<T_1>(req: Request, doThisWithDbClient: (client: import("pg-promise-strict").Client) => Promise<T_1>) => Promise<T_1>) & (<T_1>(req: Request, doThisWithDbClient: (client: import("pg-promise-strict").Client) => Promise<T_1>) => Promise<T_1>);
        // mixin-patch: inTransaction: (<T_1>(req: Request, doThisWithDbTransaction: (client: import("pg-promise-strict").Client) => Promise<T_1>) => Promise<T_1>) & (<T_1>(req: Request, doThisWithDbTransaction: (client: import("pg-promise-strict").Client) => Promise<T_1>) => Promise<T_1>);
        // mixin-patch: procedureDefCompleter: ((procedureDef: import("backend-plus").ProcedureDef) => import("backend-plus").ProcedureDef) & ((procedureDef: import("backend-plus").ProcedureDef) => import("backend-plus").ProcedureDef);
        // mixin-patch: tableDefAdapt: ((tableDef: import("backend-plus").TableDefinition, context: import("backend-plus").Context) => import("backend-plus").TableDefinition) & ((tableDef: import("backend-plus").TableDefinition, context: import("backend-plus").Context) => import("backend-plus").TableDefinition);
        // mixin-patch: pushApp: ((dirname: string) => void) & ((dirname: string) => void);
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
        // mixin-patch: getContextForDump: (() => import("backend-plus").ContextForDump) & (() => import("backend-plus").ContextForDump);
        // mixin-patch: getClientSetupForSendToFrontEnd: ((req: Request) => import("backend-plus").ClientSetup) & ((req: Request) => import("backend-plus").ClientSetup);
        // mixin-patch: configList: (() => (string | object)[]) & (() => (string | object)[]);
        // mixin-patch: setStaticConfig: ((defConfigYamlString: string) => void) & ((defConfigYamlString: string) => void);
    };
} & T;
