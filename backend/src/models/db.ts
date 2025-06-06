// 通用数据库类型定义
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec<T = unknown>(query: string): Promise<D1Result<T>>;
}

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

// 定义操作结果的元数据类型
export interface DbResultMeta {
  changes?: number;
  [key: string]: any;
}

// 扩展D1Result meta属性的类型
export interface D1Meta {
  last_row_id?: number;
  changes?: number;
}

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  error?: string;
  meta?: object;
}

// 版本元数据类型定义
export interface VersionMetadata {
  id?: string;
  tag?: string;
  timestamp?: string;
  [key: string]: any;
}

// 通用绑定类型
export type Bindings = {
  DB: D1Database;
  CF_VERSION_METADATA?: VersionMetadata;
};
