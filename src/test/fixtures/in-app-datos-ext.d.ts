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
        postConfig: (() => Promise<void>) & ((...params: any[]) => any);
        getTableDefFunction(tableDef: import("backend-plus").TableDefinition): import("backend-plus").TableDefinitionFunction;
        loadTableDef(tableDef: import("backend-plus").TableDefinition): import("backend-plus").TableDefinitionFunction;
        generateAndLoadTableDef(tablaDatos: TablaDatos): import("backend-plus").TableDefinitionFunction;
        getProcedures: (() => Promise<import("backend-plus").ProcedureDef[]>) & (() => Promise<import("backend-plus").ProcedureDef[]>);
        getMenu: (() => import("operativos").MenuDefinition) & ((context?: import("backend-plus").Context) => import("backend-plus").MenuDefinition);
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
        start: ((opts?: import("backend-plus").StartOptions) => Promise<void>) & ((opts?: import("backend-plus").StartOptions) => Promise<void>);
        getTables: (() => import("backend-plus").TableItemDef[]) & (() => import("backend-plus").TableItemDef[]);
        appendToTableDefinition: ((tableName: string, appenderFunction: (tableDef: import("backend-plus").TableDefinition, context?: import("backend-plus").TableContext) => void) => void) & ((tableName: string, appenderFunction: (tableDef: import("backend-plus").TableDefinition, context?: import("backend-plus").TableContext) => void) => void);
        getContext: ((req: Request) => import("backend-plus").Context) & ((req: Request) => import("backend-plus").Context);
        addSchrödingerServices: ((mainApp: import("backend-plus").ExpressPlus, baseUrl: string) => void) & ((mainApp: import("backend-plus").ExpressPlus, baseUrl: string) => void);
        addUnloggedServices: ((mainApp: import("backend-plus").ExpressPlus, baseUrl: string) => void) & ((mainApp: import("backend-plus").ExpressPlus, baseUrl: string) => void);
        addLoggedServices: (() => void) & (() => void);
        inDbClient: (<T_1>(req: Request, doThisWithDbClient: (client: import("pg-promise-strict").Client) => Promise<T_1>) => Promise<T_1>) & (<T_1>(req: Request, doThisWithDbClient: (client: import("pg-promise-strict").Client) => Promise<T_1>) => Promise<T_1>);
        inTransaction: (<T_1>(req: Request, doThisWithDbTransaction: (client: import("pg-promise-strict").Client) => Promise<T_1>) => Promise<T_1>) & (<T_1>(req: Request, doThisWithDbTransaction: (client: import("pg-promise-strict").Client) => Promise<T_1>) => Promise<T_1>);
        procedureDefCompleter: ((procedureDef: import("backend-plus").ProcedureDef) => import("backend-plus").ProcedureDef) & ((procedureDef: import("backend-plus").ProcedureDef) => import("backend-plus").ProcedureDef);
        tableDefAdapt: ((tableDef: import("backend-plus").TableDefinition, context: import("backend-plus").Context) => import("backend-plus").TableDefinition) & ((tableDef: import("backend-plus").TableDefinition, context: import("backend-plus").Context) => import("backend-plus").TableDefinition);
        pushApp: ((dirname: string) => void) & ((dirname: string) => void);
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
        getContextForDump: (() => import("backend-plus").ContextForDump) & (() => import("backend-plus").ContextForDump);
        getClientSetupForSendToFrontEnd: ((req: Request) => import("backend-plus").ClientSetup) & ((req: Request) => import("backend-plus").ClientSetup);
        configList: (() => (string | object)[]) & (() => (string | object)[]);
        setStaticConfig: ((defConfigYamlString: string) => void) & ((defConfigYamlString: string) => void);
        mainPage: ((req: {} | operativos.Request, offlineMode?: boolean | undefined, opts?: operativos.OptsClientPage | undefined) => {}) & ((req: {} | operativos.Request, offlineMode?: boolean | undefined, opts?: operativos.OptsClientPage | undefined) => {
            toHtmlDoc: () => string;
        });
        isThisProcedureAllowed: (<T_2_1>(context: operativos.Context, procedureDef: operativos.ProcedureDef, params: {
            [key: string]: T_2_1;
        }) => Promise<boolean>) & (<T_4>(context: operativos.Context, procedureDef: operativos.ProcedureDef, params: {
            [key: string]: T_4;
        }) => Promise<boolean>);
    };
} & T;
