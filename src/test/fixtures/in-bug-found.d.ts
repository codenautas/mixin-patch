/// <reference types="express" />
import * as backendPlus from "backend-plus";
import { ContextRoles } from "./types-mini-repo";
export declare type Constructor<T> = new (...args: any[]) => T;
export declare function emergeAppMiniRepo<T extends Constructor<backendPlus.AppBackend>>(Base: T): {
    new (...args: any[]): {
        addSchrödingerServices(mainApp: backendPlus.Express, baseUrl: string): void;
        addLoggedServices(): void;
        postConfig(): void;
        configStaticConfig(): void;
        clientIncludes(req: backendPlus.Request, opts: any): (backendPlus.ClientModuleDefinition | {
            type: string;
            module: string;
            modPath: string;
            fileDeveloptment: string;
            file: string;
            src?: undefined;
        } | {
            type: string;
            module: string;
            fileDeveloptment: string;
            file: string;
            modPath?: undefined;
            src?: undefined;
        } | {
            type: string;
            file: string;
            module?: undefined;
            modPath?: undefined;
            fileDeveloptment?: undefined;
            src?: undefined;
        } | {
            type: string;
            src: string;
            module?: undefined;
            modPath?: undefined;
            fileDeveloptment?: undefined;
            file?: undefined;
        })[];
        getContextForDump(): {
            forDump?: boolean | undefined;
            be: backendPlus.AppBackend;
            user: backendPlus.User;
            session: {
                [K: string]: any;
            };
            username: string;
            machineId: string;
            navigator: string;
            es: {
                admin: boolean;
                gabinete: boolean;
                coordinador: boolean;
            };
        };
        getContext(req: backendPlus.Request): backendPlus.Context & ContextRoles;
        getProcedures(): Promise<backendPlus.ProcedureDef[]>;
        getMenu(context: backendPlus.Context & ContextRoles): backendPlus.MenuDefinition;
        prepareGetTables(): void;
        procedures: backendPlus.ProcedureDef[];
        procedure: {
            [key: string]: backendPlus.ProcedureDef;
        };
        app: backendPlus.ExpressPlus;
        getTableDefinition: backendPlus.TableDefinitionsGetters;
        tableStructures: backendPlus.TableDefinitions;
        db: typeof import("pg-promise-strict");
        config: any;
        rootPath: string;
        caches: {
            procedures: {
                [k: string]: {
                    timestamp: number;
                    result: any;
                };
            };
        };
        clearCaches(): void;
        start(opts?: backendPlus.StartOptions | undefined): Promise<void>;
        getTables(): backendPlus.TableItemDef[];
        appendToTableDefinition(tableName: string, appenderFunction: (tableDef: backendPlus.TableDefinition, context?: backendPlus.TableContext | undefined) => void): void;
        addUnloggedServices(mainApp: backendPlus.ExpressPlus, baseUrl: string): void;
        inDbClient<T_1>(req: backendPlus.Request | null, doThisWithDbClient: (client: backendPlus.Client) => Promise<T_1>): Promise<T_1>;
        inTransaction<T_2>(req: backendPlus.Request | null, doThisWithDbTransaction: (client: backendPlus.Client) => Promise<T_2>): Promise<T_2>;
        procedureDefCompleter(procedureDef: backendPlus.ProcedureDef): backendPlus.ProcedureDef;
        tableDefAdapt(tableDef: backendPlus.TableDefinition, context: backendPlus.Context): backendPlus.TableDefinition;
        pushApp(dirname: string): void;
        dumpDbSchemaPartial(partialTableStructures: backendPlus.TableDefinitions, opts?: {
            complete?: boolean | undefined;
            skipEnance?: boolean | undefined;
        } | undefined): Promise<{
            mainSql: string;
            enancePart: string;
        }>;
        getClientSetupForSendToFrontEnd(req: backendPlus.Request): backendPlus.ClientSetup;
        configList(): (string | object)[];
        setStaticConfig(defConfigYamlString: string): void;
        mainPage(req: {} | backendPlus.Request, offlineMode?: boolean | undefined, opts?: backendPlus.OptsClientPage | undefined): { 
            toHtmlDoc: () => string;
        };
        isThisProcedureAllowed<T_3>(context: backendPlus.Context, procedureDef: backendPlus.ProcedureDef, params: {
            [key: string]: T_3;
        }): Promise<boolean>;
    };
} & T;
//# sourceMappingURL=app-mini-repo.d.ts.map
