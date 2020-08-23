import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.5.1
 * Query Engine version: c88925ce44a9b89b4351aec85ba6a28979d2658e
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type Action =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: Action
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$executeRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;

  /**
   * `prisma.like`: Exposes CRUD operations for the **Like** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.like.findMany()
    * ```
    */
  get like(): LikeDelegate;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): CommentDelegate;

  /**
   * `prisma.file`: Exposes CRUD operations for the **File** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.file.findMany()
    * ```
    */
  get file(): FileDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  userName: 'userName',
  avatar: 'avatar',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  name: 'name',
  bio: 'bio',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const PostDistinctFieldEnum: {
  id: 'id',
  userId: 'userId',
  location: 'location',
  caption: 'caption',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type PostDistinctFieldEnum = (typeof PostDistinctFieldEnum)[keyof typeof PostDistinctFieldEnum]


export declare const FileDistinctFieldEnum: {
  id: 'id',
  url: 'url',
  postId: 'postId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type FileDistinctFieldEnum = (typeof FileDistinctFieldEnum)[keyof typeof FileDistinctFieldEnum]


export declare const CommentDistinctFieldEnum: {
  id: 'id',
  text: 'text',
  userId: 'userId',
  postId: 'postId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type CommentDistinctFieldEnum = (typeof CommentDistinctFieldEnum)[keyof typeof CommentDistinctFieldEnum]


export declare const LikeDistinctFieldEnum: {
  id: 'id',
  userId: 'userId',
  postId: 'postId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type LikeDistinctFieldEnum = (typeof LikeDistinctFieldEnum)[keyof typeof LikeDistinctFieldEnum]



/**
 * Model User
 */

export type User = {
  id: number
  userName: string
  avatar: string
  email: string
  firstName: string
  lastName: string
  name: string
  bio: string
  createdAt: Date
  updatedAt: Date
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  userName?: boolean
  avatar?: boolean
  email?: boolean
  firstName?: boolean
  lastName?: boolean
  name?: boolean
  bio?: boolean
  posts?: boolean | FindManyPostArgs
  followers?: boolean | FindManyUserArgs
  following?: boolean | FindManyUserArgs
  likes?: boolean | FindManyLikeArgs
  comments?: boolean | FindManyCommentArgs
  createdAt?: boolean
  updatedAt?: boolean
}

export type UserInclude = {
  posts?: boolean | FindManyPostArgs
  followers?: boolean | FindManyUserArgs
  following?: boolean | FindManyUserArgs
  likes?: boolean | FindManyLikeArgs
  comments?: boolean | FindManyCommentArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'posts'
      ? Array<PostGetPayload<S['include'][P]>> :
      P extends 'followers'
      ? Array<UserGetPayload<S['include'][P]>> :
      P extends 'following'
      ? Array<UserGetPayload<S['include'][P]>> :
      P extends 'likes'
      ? Array<LikeGetPayload<S['include'][P]>> :
      P extends 'comments'
      ? Array<CommentGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'posts'
      ? Array<PostGetPayload<S['select'][P]>> :
      P extends 'followers'
      ? Array<UserGetPayload<S['select'][P]>> :
      P extends 'following'
      ? Array<UserGetPayload<S['select'][P]>> :
      P extends 'likes'
      ? Array<LikeGetPayload<S['select'][P]>> :
      P extends 'comments'
      ? Array<CommentGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  followers<T extends FindManyUserArgs = {}>(args?: Subset<T, FindManyUserArgs>): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>;

  following<T extends FindManyUserArgs = {}>(args?: Subset<T, FindManyUserArgs>): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>;

  likes<T extends FindManyLikeArgs = {}>(args?: Subset<T, FindManyLikeArgs>): CheckSelect<T, Promise<Array<Like>>, Promise<Array<LikeGetPayload<T>>>>;

  comments<T extends FindManyCommentArgs = {}>(args?: Subset<T, FindManyCommentArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Post
 */

export type Post = {
  id: number
  userId: number
  location: string
  caption: string
  createdAt: Date
  updatedAt: Date
}


export type AggregatePost = {
  count: number
  avg: PostAvgAggregateOutputType | null
  sum: PostSumAggregateOutputType | null
  min: PostMinAggregateOutputType | null
  max: PostMaxAggregateOutputType | null
}

export type PostAvgAggregateOutputType = {
  id: number
  userId: number
}

export type PostSumAggregateOutputType = {
  id: number
  userId: number
}

export type PostMinAggregateOutputType = {
  id: number
  userId: number
}

export type PostMaxAggregateOutputType = {
  id: number
  userId: number
}


export type PostAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type PostSumAggregateInputType = {
  id?: true
  userId?: true
}

export type PostMinAggregateInputType = {
  id?: true
  userId?: true
}

export type PostMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregatePostArgs = {
  where?: PostWhereInput
  orderBy?: Enumerable<PostOrderByInput>
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
  count?: true
  avg?: PostAvgAggregateInputType
  sum?: PostSumAggregateInputType
  min?: PostMinAggregateInputType
  max?: PostMaxAggregateInputType
}

export type GetPostAggregateType<T extends AggregatePostArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPostAggregateScalarType<T[P]>
}

export type GetPostAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostAvgAggregateOutputType ? PostAvgAggregateOutputType[P] : never
}
    
    

export type PostSelect = {
  id?: boolean
  user?: boolean | UserArgs
  userId?: boolean
  location?: boolean
  caption?: boolean
  files?: boolean | FindManyFileArgs
  comments?: boolean | FindManyCommentArgs
  likes?: boolean | FindManyLikeArgs
  createdAt?: boolean
  updatedAt?: boolean
}

export type PostInclude = {
  user?: boolean | UserArgs
  files?: boolean | FindManyFileArgs
  comments?: boolean | FindManyCommentArgs
  likes?: boolean | FindManyLikeArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs | FindManyPostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> :
      P extends 'files'
      ? Array<FileGetPayload<S['include'][P]>> :
      P extends 'comments'
      ? Array<CommentGetPayload<S['include'][P]>> :
      P extends 'likes'
      ? Array<LikeGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> :
      P extends 'files'
      ? Array<FileGetPayload<S['select'][P]>> :
      P extends 'comments'
      ? Array<CommentGetPayload<S['select'][P]>> :
      P extends 'likes'
      ? Array<LikeGetPayload<S['select'][P]>> : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find zero or more Posts.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const Post = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const Post = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostArgs>(args: Subset<T, AggregatePostArgs>): Promise<GetPostAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Post.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  files<T extends FindManyFileArgs = {}>(args?: Subset<T, FindManyFileArgs>): CheckSelect<T, Promise<Array<File>>, Promise<Array<FileGetPayload<T>>>>;

  comments<T extends FindManyCommentArgs = {}>(args?: Subset<T, FindManyCommentArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

  likes<T extends FindManyLikeArgs = {}>(args?: Subset<T, FindManyLikeArgs>): CheckSelect<T, Promise<Array<Like>>, Promise<Array<LikeGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: Enumerable<PostOrderByInput>
  /**
   * Sets the position for listing Posts.
  **/
  cursor?: PostWhereUniqueInput
  /**
   * The number of Posts to fetch. If negative number, it will take Posts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
}



/**
 * Model Like
 */

export type Like = {
  id: number
  userId: number
  postId: number
  createdAt: Date
  updatedAt: Date
}


export type AggregateLike = {
  count: number
  avg: LikeAvgAggregateOutputType | null
  sum: LikeSumAggregateOutputType | null
  min: LikeMinAggregateOutputType | null
  max: LikeMaxAggregateOutputType | null
}

export type LikeAvgAggregateOutputType = {
  id: number
  userId: number
  postId: number
}

export type LikeSumAggregateOutputType = {
  id: number
  userId: number
  postId: number
}

export type LikeMinAggregateOutputType = {
  id: number
  userId: number
  postId: number
}

export type LikeMaxAggregateOutputType = {
  id: number
  userId: number
  postId: number
}


export type LikeAvgAggregateInputType = {
  id?: true
  userId?: true
  postId?: true
}

export type LikeSumAggregateInputType = {
  id?: true
  userId?: true
  postId?: true
}

export type LikeMinAggregateInputType = {
  id?: true
  userId?: true
  postId?: true
}

export type LikeMaxAggregateInputType = {
  id?: true
  userId?: true
  postId?: true
}

export type AggregateLikeArgs = {
  where?: LikeWhereInput
  orderBy?: Enumerable<LikeOrderByInput>
  cursor?: LikeWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LikeDistinctFieldEnum>
  count?: true
  avg?: LikeAvgAggregateInputType
  sum?: LikeSumAggregateInputType
  min?: LikeMinAggregateInputType
  max?: LikeMaxAggregateInputType
}

export type GetLikeAggregateType<T extends AggregateLikeArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetLikeAggregateScalarType<T[P]>
}

export type GetLikeAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof LikeAvgAggregateOutputType ? LikeAvgAggregateOutputType[P] : never
}
    
    

export type LikeSelect = {
  id?: boolean
  user?: boolean | UserArgs
  userId?: boolean
  post?: boolean | PostArgs
  postId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type LikeInclude = {
  user?: boolean | UserArgs
  post?: boolean | PostArgs
}

export type LikeGetPayload<
  S extends boolean | null | undefined | LikeArgs,
  U = keyof S
> = S extends true
  ? Like
  : S extends undefined
  ? never
  : S extends LikeArgs | FindManyLikeArgs
  ? 'include' extends U
    ? Like  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> :
      P extends 'post'
      ? PostGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Like ? Like[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> :
      P extends 'post'
      ? PostGetPayload<S['select'][P]> : never
    }
  : Like
: Like


export interface LikeDelegate {
  /**
   * Find zero or one Like.
   * @param {FindOneLikeArgs} args - Arguments to find a Like
   * @example
   * // Get one Like
   * const like = await prisma.like.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneLikeArgs>(
    args: Subset<T, FindOneLikeArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like | null>, Prisma__LikeClient<LikeGetPayload<T> | null>>
  /**
   * Find zero or more Likes.
   * @param {FindManyLikeArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Likes
   * const likes = await prisma.like.findMany()
   * 
   * // Get first 10 Likes
   * const likes = await prisma.like.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const likeWithIdOnly = await prisma.like.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyLikeArgs>(
    args?: Subset<T, FindManyLikeArgs>
  ): CheckSelect<T, Promise<Array<Like>>, Promise<Array<LikeGetPayload<T>>>>
  /**
   * Create a Like.
   * @param {LikeCreateArgs} args - Arguments to create a Like.
   * @example
   * // Create one Like
   * const Like = await prisma.like.create({
   *   data: {
   *     // ... data to create a Like
   *   }
   * })
   * 
  **/
  create<T extends LikeCreateArgs>(
    args: Subset<T, LikeCreateArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like>, Prisma__LikeClient<LikeGetPayload<T>>>
  /**
   * Delete a Like.
   * @param {LikeDeleteArgs} args - Arguments to delete one Like.
   * @example
   * // Delete one Like
   * const Like = await prisma.like.delete({
   *   where: {
   *     // ... filter to delete one Like
   *   }
   * })
   * 
  **/
  delete<T extends LikeDeleteArgs>(
    args: Subset<T, LikeDeleteArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like>, Prisma__LikeClient<LikeGetPayload<T>>>
  /**
   * Update one Like.
   * @param {LikeUpdateArgs} args - Arguments to update one Like.
   * @example
   * // Update one Like
   * const like = await prisma.like.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends LikeUpdateArgs>(
    args: Subset<T, LikeUpdateArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like>, Prisma__LikeClient<LikeGetPayload<T>>>
  /**
   * Delete zero or more Likes.
   * @param {LikeDeleteManyArgs} args - Arguments to filter Likes to delete.
   * @example
   * // Delete a few Likes
   * const { count } = await prisma.like.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends LikeDeleteManyArgs>(
    args: Subset<T, LikeDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Likes.
   * @param {LikeUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Likes
   * const like = await prisma.like.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends LikeUpdateManyArgs>(
    args: Subset<T, LikeUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Like.
   * @param {LikeUpsertArgs} args - Arguments to update or create a Like.
   * @example
   * // Update or create a Like
   * const like = await prisma.like.upsert({
   *   create: {
   *     // ... data to create a Like
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Like we want to update
   *   }
   * })
  **/
  upsert<T extends LikeUpsertArgs>(
    args: Subset<T, LikeUpsertArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like>, Prisma__LikeClient<LikeGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyLikeArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateLikeArgs>(args: Subset<T, AggregateLikeArgs>): Promise<GetLikeAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Like.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__LikeClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Like findOne
 */
export type FindOneLikeArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * Filter, which Like to fetch.
  **/
  where: LikeWhereUniqueInput
}


/**
 * Like findMany
 */
export type FindManyLikeArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * Filter, which Likes to fetch.
  **/
  where?: LikeWhereInput
  /**
   * Determine the order of the Likes to fetch.
  **/
  orderBy?: Enumerable<LikeOrderByInput>
  /**
   * Sets the position for listing Likes.
  **/
  cursor?: LikeWhereUniqueInput
  /**
   * The number of Likes to fetch. If negative number, it will take Likes before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Likes.
  **/
  skip?: number
  distinct?: Enumerable<LikeDistinctFieldEnum>
}


/**
 * Like create
 */
export type LikeCreateArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * The data needed to create a Like.
  **/
  data: LikeCreateInput
}


/**
 * Like update
 */
export type LikeUpdateArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * The data needed to update a Like.
  **/
  data: LikeUpdateInput
  /**
   * Choose, which Like to update.
  **/
  where: LikeWhereUniqueInput
}


/**
 * Like updateMany
 */
export type LikeUpdateManyArgs = {
  data: LikeUpdateManyMutationInput
  where?: LikeWhereInput
}


/**
 * Like upsert
 */
export type LikeUpsertArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * The filter to search for the Like to update in case it exists.
  **/
  where: LikeWhereUniqueInput
  /**
   * In case the Like found by the `where` argument doesn't exist, create a new Like with this data.
  **/
  create: LikeCreateInput
  /**
   * In case the Like was found with the provided `where` argument, update it with this data.
  **/
  update: LikeUpdateInput
}


/**
 * Like delete
 */
export type LikeDeleteArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * Filter which Like to delete.
  **/
  where: LikeWhereUniqueInput
}


/**
 * Like deleteMany
 */
export type LikeDeleteManyArgs = {
  where?: LikeWhereInput
}


/**
 * Like without action
 */
export type LikeArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
}



/**
 * Model Comment
 */

export type Comment = {
  id: number
  text: string
  userId: number
  postId: number
  createdAt: Date
  updatedAt: Date
}


export type AggregateComment = {
  count: number
  avg: CommentAvgAggregateOutputType | null
  sum: CommentSumAggregateOutputType | null
  min: CommentMinAggregateOutputType | null
  max: CommentMaxAggregateOutputType | null
}

export type CommentAvgAggregateOutputType = {
  id: number
  userId: number
  postId: number
}

export type CommentSumAggregateOutputType = {
  id: number
  userId: number
  postId: number
}

export type CommentMinAggregateOutputType = {
  id: number
  userId: number
  postId: number
}

export type CommentMaxAggregateOutputType = {
  id: number
  userId: number
  postId: number
}


export type CommentAvgAggregateInputType = {
  id?: true
  userId?: true
  postId?: true
}

export type CommentSumAggregateInputType = {
  id?: true
  userId?: true
  postId?: true
}

export type CommentMinAggregateInputType = {
  id?: true
  userId?: true
  postId?: true
}

export type CommentMaxAggregateInputType = {
  id?: true
  userId?: true
  postId?: true
}

export type AggregateCommentArgs = {
  where?: CommentWhereInput
  orderBy?: Enumerable<CommentOrderByInput>
  cursor?: CommentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CommentDistinctFieldEnum>
  count?: true
  avg?: CommentAvgAggregateInputType
  sum?: CommentSumAggregateInputType
  min?: CommentMinAggregateInputType
  max?: CommentMaxAggregateInputType
}

export type GetCommentAggregateType<T extends AggregateCommentArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCommentAggregateScalarType<T[P]>
}

export type GetCommentAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CommentAvgAggregateOutputType ? CommentAvgAggregateOutputType[P] : never
}
    
    

export type CommentSelect = {
  id?: boolean
  text?: boolean
  user?: boolean | UserArgs
  userId?: boolean
  post?: boolean | PostArgs
  postId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type CommentInclude = {
  user?: boolean | UserArgs
  post?: boolean | PostArgs
}

export type CommentGetPayload<
  S extends boolean | null | undefined | CommentArgs,
  U = keyof S
> = S extends true
  ? Comment
  : S extends undefined
  ? never
  : S extends CommentArgs | FindManyCommentArgs
  ? 'include' extends U
    ? Comment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> :
      P extends 'post'
      ? PostGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Comment ? Comment[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> :
      P extends 'post'
      ? PostGetPayload<S['select'][P]> : never
    }
  : Comment
: Comment


export interface CommentDelegate {
  /**
   * Find zero or one Comment.
   * @param {FindOneCommentArgs} args - Arguments to find a Comment
   * @example
   * // Get one Comment
   * const comment = await prisma.comment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCommentArgs>(
    args: Subset<T, FindOneCommentArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment | null>, Prisma__CommentClient<CommentGetPayload<T> | null>>
  /**
   * Find zero or more Comments.
   * @param {FindManyCommentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Comments
   * const comments = await prisma.comment.findMany()
   * 
   * // Get first 10 Comments
   * const comments = await prisma.comment.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCommentArgs>(
    args?: Subset<T, FindManyCommentArgs>
  ): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>
  /**
   * Create a Comment.
   * @param {CommentCreateArgs} args - Arguments to create a Comment.
   * @example
   * // Create one Comment
   * const Comment = await prisma.comment.create({
   *   data: {
   *     // ... data to create a Comment
   *   }
   * })
   * 
  **/
  create<T extends CommentCreateArgs>(
    args: Subset<T, CommentCreateArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Delete a Comment.
   * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
   * @example
   * // Delete one Comment
   * const Comment = await prisma.comment.delete({
   *   where: {
   *     // ... filter to delete one Comment
   *   }
   * })
   * 
  **/
  delete<T extends CommentDeleteArgs>(
    args: Subset<T, CommentDeleteArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Update one Comment.
   * @param {CommentUpdateArgs} args - Arguments to update one Comment.
   * @example
   * // Update one Comment
   * const comment = await prisma.comment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CommentUpdateArgs>(
    args: Subset<T, CommentUpdateArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Delete zero or more Comments.
   * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
   * @example
   * // Delete a few Comments
   * const { count } = await prisma.comment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CommentDeleteManyArgs>(
    args: Subset<T, CommentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Comments.
   * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Comments
   * const comment = await prisma.comment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CommentUpdateManyArgs>(
    args: Subset<T, CommentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Comment.
   * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
   * @example
   * // Update or create a Comment
   * const comment = await prisma.comment.upsert({
   *   create: {
   *     // ... data to create a Comment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Comment we want to update
   *   }
   * })
  **/
  upsert<T extends CommentUpsertArgs>(
    args: Subset<T, CommentUpsertArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCommentArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCommentArgs>(args: Subset<T, AggregateCommentArgs>): Promise<GetCommentAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Comment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CommentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Comment findOne
 */
export type FindOneCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comment to fetch.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment findMany
 */
export type FindManyCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comments to fetch.
  **/
  where?: CommentWhereInput
  /**
   * Determine the order of the Comments to fetch.
  **/
  orderBy?: Enumerable<CommentOrderByInput>
  /**
   * Sets the position for listing Comments.
  **/
  cursor?: CommentWhereUniqueInput
  /**
   * The number of Comments to fetch. If negative number, it will take Comments before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Comments.
  **/
  skip?: number
  distinct?: Enumerable<CommentDistinctFieldEnum>
}


/**
 * Comment create
 */
export type CommentCreateArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The data needed to create a Comment.
  **/
  data: CommentCreateInput
}


/**
 * Comment update
 */
export type CommentUpdateArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The data needed to update a Comment.
  **/
  data: CommentUpdateInput
  /**
   * Choose, which Comment to update.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment updateMany
 */
export type CommentUpdateManyArgs = {
  data: CommentUpdateManyMutationInput
  where?: CommentWhereInput
}


/**
 * Comment upsert
 */
export type CommentUpsertArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The filter to search for the Comment to update in case it exists.
  **/
  where: CommentWhereUniqueInput
  /**
   * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
  **/
  create: CommentCreateInput
  /**
   * In case the Comment was found with the provided `where` argument, update it with this data.
  **/
  update: CommentUpdateInput
}


/**
 * Comment delete
 */
export type CommentDeleteArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter which Comment to delete.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment deleteMany
 */
export type CommentDeleteManyArgs = {
  where?: CommentWhereInput
}


/**
 * Comment without action
 */
export type CommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
}



/**
 * Model File
 */

export type File = {
  id: number
  url: string
  postId: number
  createdAt: Date
  updatedAt: Date
}


export type AggregateFile = {
  count: number
  avg: FileAvgAggregateOutputType | null
  sum: FileSumAggregateOutputType | null
  min: FileMinAggregateOutputType | null
  max: FileMaxAggregateOutputType | null
}

export type FileAvgAggregateOutputType = {
  id: number
  postId: number
}

export type FileSumAggregateOutputType = {
  id: number
  postId: number
}

export type FileMinAggregateOutputType = {
  id: number
  postId: number
}

export type FileMaxAggregateOutputType = {
  id: number
  postId: number
}


export type FileAvgAggregateInputType = {
  id?: true
  postId?: true
}

export type FileSumAggregateInputType = {
  id?: true
  postId?: true
}

export type FileMinAggregateInputType = {
  id?: true
  postId?: true
}

export type FileMaxAggregateInputType = {
  id?: true
  postId?: true
}

export type AggregateFileArgs = {
  where?: FileWhereInput
  orderBy?: Enumerable<FileOrderByInput>
  cursor?: FileWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<FileDistinctFieldEnum>
  count?: true
  avg?: FileAvgAggregateInputType
  sum?: FileSumAggregateInputType
  min?: FileMinAggregateInputType
  max?: FileMaxAggregateInputType
}

export type GetFileAggregateType<T extends AggregateFileArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetFileAggregateScalarType<T[P]>
}

export type GetFileAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof FileAvgAggregateOutputType ? FileAvgAggregateOutputType[P] : never
}
    
    

export type FileSelect = {
  id?: boolean
  url?: boolean
  post?: boolean | PostArgs
  postId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type FileInclude = {
  post?: boolean | PostArgs
}

export type FileGetPayload<
  S extends boolean | null | undefined | FileArgs,
  U = keyof S
> = S extends true
  ? File
  : S extends undefined
  ? never
  : S extends FileArgs | FindManyFileArgs
  ? 'include' extends U
    ? File  & {
      [P in TrueKeys<S['include']>]:
      P extends 'post'
      ? PostGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof File ? File[P]
: 
      P extends 'post'
      ? PostGetPayload<S['select'][P]> : never
    }
  : File
: File


export interface FileDelegate {
  /**
   * Find zero or one File.
   * @param {FindOneFileArgs} args - Arguments to find a File
   * @example
   * // Get one File
   * const file = await prisma.file.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneFileArgs>(
    args: Subset<T, FindOneFileArgs>
  ): CheckSelect<T, Prisma__FileClient<File | null>, Prisma__FileClient<FileGetPayload<T> | null>>
  /**
   * Find zero or more Files.
   * @param {FindManyFileArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Files
   * const files = await prisma.file.findMany()
   * 
   * // Get first 10 Files
   * const files = await prisma.file.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const fileWithIdOnly = await prisma.file.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyFileArgs>(
    args?: Subset<T, FindManyFileArgs>
  ): CheckSelect<T, Promise<Array<File>>, Promise<Array<FileGetPayload<T>>>>
  /**
   * Create a File.
   * @param {FileCreateArgs} args - Arguments to create a File.
   * @example
   * // Create one File
   * const File = await prisma.file.create({
   *   data: {
   *     // ... data to create a File
   *   }
   * })
   * 
  **/
  create<T extends FileCreateArgs>(
    args: Subset<T, FileCreateArgs>
  ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>
  /**
   * Delete a File.
   * @param {FileDeleteArgs} args - Arguments to delete one File.
   * @example
   * // Delete one File
   * const File = await prisma.file.delete({
   *   where: {
   *     // ... filter to delete one File
   *   }
   * })
   * 
  **/
  delete<T extends FileDeleteArgs>(
    args: Subset<T, FileDeleteArgs>
  ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>
  /**
   * Update one File.
   * @param {FileUpdateArgs} args - Arguments to update one File.
   * @example
   * // Update one File
   * const file = await prisma.file.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends FileUpdateArgs>(
    args: Subset<T, FileUpdateArgs>
  ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>
  /**
   * Delete zero or more Files.
   * @param {FileDeleteManyArgs} args - Arguments to filter Files to delete.
   * @example
   * // Delete a few Files
   * const { count } = await prisma.file.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends FileDeleteManyArgs>(
    args: Subset<T, FileDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Files.
   * @param {FileUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Files
   * const file = await prisma.file.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends FileUpdateManyArgs>(
    args: Subset<T, FileUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one File.
   * @param {FileUpsertArgs} args - Arguments to update or create a File.
   * @example
   * // Update or create a File
   * const file = await prisma.file.upsert({
   *   create: {
   *     // ... data to create a File
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the File we want to update
   *   }
   * })
  **/
  upsert<T extends FileUpsertArgs>(
    args: Subset<T, FileUpsertArgs>
  ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyFileArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateFileArgs>(args: Subset<T, AggregateFileArgs>): Promise<GetFileAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for File.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__FileClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * File findOne
 */
export type FindOneFileArgs = {
  /**
   * Select specific fields to fetch from the File
  **/
  select?: FileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FileInclude | null
  /**
   * Filter, which File to fetch.
  **/
  where: FileWhereUniqueInput
}


/**
 * File findMany
 */
export type FindManyFileArgs = {
  /**
   * Select specific fields to fetch from the File
  **/
  select?: FileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FileInclude | null
  /**
   * Filter, which Files to fetch.
  **/
  where?: FileWhereInput
  /**
   * Determine the order of the Files to fetch.
  **/
  orderBy?: Enumerable<FileOrderByInput>
  /**
   * Sets the position for listing Files.
  **/
  cursor?: FileWhereUniqueInput
  /**
   * The number of Files to fetch. If negative number, it will take Files before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Files.
  **/
  skip?: number
  distinct?: Enumerable<FileDistinctFieldEnum>
}


/**
 * File create
 */
export type FileCreateArgs = {
  /**
   * Select specific fields to fetch from the File
  **/
  select?: FileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FileInclude | null
  /**
   * The data needed to create a File.
  **/
  data: FileCreateInput
}


/**
 * File update
 */
export type FileUpdateArgs = {
  /**
   * Select specific fields to fetch from the File
  **/
  select?: FileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FileInclude | null
  /**
   * The data needed to update a File.
  **/
  data: FileUpdateInput
  /**
   * Choose, which File to update.
  **/
  where: FileWhereUniqueInput
}


/**
 * File updateMany
 */
export type FileUpdateManyArgs = {
  data: FileUpdateManyMutationInput
  where?: FileWhereInput
}


/**
 * File upsert
 */
export type FileUpsertArgs = {
  /**
   * Select specific fields to fetch from the File
  **/
  select?: FileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FileInclude | null
  /**
   * The filter to search for the File to update in case it exists.
  **/
  where: FileWhereUniqueInput
  /**
   * In case the File found by the `where` argument doesn't exist, create a new File with this data.
  **/
  create: FileCreateInput
  /**
   * In case the File was found with the provided `where` argument, update it with this data.
  **/
  update: FileUpdateInput
}


/**
 * File delete
 */
export type FileDeleteArgs = {
  /**
   * Select specific fields to fetch from the File
  **/
  select?: FileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FileInclude | null
  /**
   * Filter which File to delete.
  **/
  where: FileWhereUniqueInput
}


/**
 * File deleteMany
 */
export type FileDeleteManyArgs = {
  where?: FileWhereInput
}


/**
 * File without action
 */
export type FileArgs = {
  /**
   * Select specific fields to fetch from the File
  **/
  select?: FileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FileInclude | null
}



/**
 * Deep Input Types
 */


export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter | null
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter | null
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type UserRelationFilter = {
  is?: UserWhereInput | null
  isNot?: UserWhereInput | null
}

export type PostRelationFilter = {
  is?: PostWhereInput | null
  isNot?: PostWhereInput | null
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: NestedDateTimeFilter | null
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type FileWhereInput = {
  AND?: Enumerable<FileWhereInput>
  OR?: Array<FileWhereInput>
  NOT?: Enumerable<FileWhereInput>
  id?: number | IntFilter
  url?: string | StringFilter
  post?: PostWhereInput | null
  postId?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type FileListRelationFilter = {
  every?: FileWhereInput
  some?: FileWhereInput
  none?: FileWhereInput
}

export type CommentWhereInput = {
  AND?: Enumerable<CommentWhereInput>
  OR?: Array<CommentWhereInput>
  NOT?: Enumerable<CommentWhereInput>
  id?: number | IntFilter
  text?: string | StringFilter
  user?: UserWhereInput | null
  userId?: number | IntFilter
  post?: PostWhereInput | null
  postId?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type CommentListRelationFilter = {
  every?: CommentWhereInput
  some?: CommentWhereInput
  none?: CommentWhereInput
}

export type LikeWhereInput = {
  AND?: Enumerable<LikeWhereInput>
  OR?: Array<LikeWhereInput>
  NOT?: Enumerable<LikeWhereInput>
  id?: number | IntFilter
  user?: UserWhereInput | null
  userId?: number | IntFilter
  post?: PostWhereInput | null
  postId?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type LikeListRelationFilter = {
  every?: LikeWhereInput
  some?: LikeWhereInput
  none?: LikeWhereInput
}

export type PostWhereInput = {
  AND?: Enumerable<PostWhereInput>
  OR?: Array<PostWhereInput>
  NOT?: Enumerable<PostWhereInput>
  id?: number | IntFilter
  user?: UserWhereInput | null
  userId?: number | IntFilter
  location?: string | StringFilter
  caption?: string | StringFilter
  files?: FileListRelationFilter
  comments?: CommentListRelationFilter
  likes?: LikeListRelationFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type PostListRelationFilter = {
  every?: PostWhereInput
  some?: PostWhereInput
  none?: PostWhereInput
}

export type UserListRelationFilter = {
  every?: UserWhereInput
  some?: UserWhereInput
  none?: UserWhereInput
}

export type UserWhereInput = {
  AND?: Enumerable<UserWhereInput>
  OR?: Array<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
  id?: number | IntFilter
  userName?: string | StringFilter
  avatar?: string | StringFilter
  email?: string | StringFilter
  firstName?: string | StringFilter
  lastName?: string | StringFilter
  name?: string | StringFilter
  bio?: string | StringFilter
  posts?: PostListRelationFilter
  followers?: UserListRelationFilter
  following?: UserListRelationFilter
  likes?: LikeListRelationFilter
  comments?: CommentListRelationFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  userName?: SortOrder
  avatar?: SortOrder
  email?: SortOrder
  firstName?: SortOrder
  lastName?: SortOrder
  name?: SortOrder
  bio?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  userName?: string
  email?: string
}

export type PostOrderByInput = {
  id?: SortOrder
  userId?: SortOrder
  location?: SortOrder
  caption?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type PostWhereUniqueInput = {
  id?: number
}

export type FileOrderByInput = {
  id?: SortOrder
  url?: SortOrder
  postId?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type FileWhereUniqueInput = {
  id?: number
}

export type CommentOrderByInput = {
  id?: SortOrder
  text?: SortOrder
  userId?: SortOrder
  postId?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type CommentWhereUniqueInput = {
  id?: number
}

export type LikeOrderByInput = {
  id?: SortOrder
  userId?: SortOrder
  postId?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type LikeWhereUniqueInput = {
  id?: number
}

export type FileCreateWithoutPostInput = {
  url: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FileCreateManyWithoutPostInput = {
  create?: Enumerable<FileCreateWithoutPostInput>
  connect?: Enumerable<FileWhereUniqueInput>
}

export type UserCreateWithoutLikesInput = {
  userName: string
  avatar?: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostCreateManyWithoutUserInput
  followers?: UserCreateManyWithoutFollowingInput
  following?: UserCreateManyWithoutFollowersInput
  comments?: CommentCreateManyWithoutUserInput
}

export type UserCreateOneWithoutLikesInput = {
  create?: UserCreateWithoutLikesInput
  connect?: UserWhereUniqueInput
}

export type LikeCreateWithoutPostInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutLikesInput
}

export type LikeCreateManyWithoutPostInput = {
  create?: Enumerable<LikeCreateWithoutPostInput>
  connect?: Enumerable<LikeWhereUniqueInput>
}

export type PostCreateWithoutCommentsInput = {
  location: string
  caption: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutPostsInput
  files?: FileCreateManyWithoutPostInput
  likes?: LikeCreateManyWithoutPostInput
}

export type PostCreateOneWithoutCommentsInput = {
  create?: PostCreateWithoutCommentsInput
  connect?: PostWhereUniqueInput
}

export type CommentCreateWithoutUserInput = {
  text: string
  createdAt?: Date | string
  updatedAt?: Date | string
  post: PostCreateOneWithoutCommentsInput
}

export type CommentCreateManyWithoutUserInput = {
  create?: Enumerable<CommentCreateWithoutUserInput>
  connect?: Enumerable<CommentWhereUniqueInput>
}

export type UserCreateWithoutFollowersInput = {
  userName: string
  avatar?: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostCreateManyWithoutUserInput
  following?: UserCreateManyWithoutFollowersInput
  likes?: LikeCreateManyWithoutUserInput
  comments?: CommentCreateManyWithoutUserInput
}

export type UserCreateManyWithoutFollowersInput = {
  create?: Enumerable<UserCreateWithoutFollowersInput>
  connect?: Enumerable<UserWhereUniqueInput>
}

export type UserCreateWithoutPostsInput = {
  userName: string
  avatar?: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  followers?: UserCreateManyWithoutFollowingInput
  following?: UserCreateManyWithoutFollowersInput
  likes?: LikeCreateManyWithoutUserInput
  comments?: CommentCreateManyWithoutUserInput
}

export type UserCreateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export type PostCreateWithoutLikesInput = {
  location: string
  caption: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutPostsInput
  files?: FileCreateManyWithoutPostInput
  comments?: CommentCreateManyWithoutPostInput
}

export type PostCreateOneWithoutLikesInput = {
  create?: PostCreateWithoutLikesInput
  connect?: PostWhereUniqueInput
}

export type LikeCreateWithoutUserInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  post: PostCreateOneWithoutLikesInput
}

export type LikeCreateManyWithoutUserInput = {
  create?: Enumerable<LikeCreateWithoutUserInput>
  connect?: Enumerable<LikeWhereUniqueInput>
}

export type UserCreateWithoutFollowingInput = {
  userName: string
  avatar?: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostCreateManyWithoutUserInput
  followers?: UserCreateManyWithoutFollowingInput
  likes?: LikeCreateManyWithoutUserInput
  comments?: CommentCreateManyWithoutUserInput
}

export type UserCreateManyWithoutFollowingInput = {
  create?: Enumerable<UserCreateWithoutFollowingInput>
  connect?: Enumerable<UserWhereUniqueInput>
}

export type UserCreateWithoutCommentsInput = {
  userName: string
  avatar?: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostCreateManyWithoutUserInput
  followers?: UserCreateManyWithoutFollowingInput
  following?: UserCreateManyWithoutFollowersInput
  likes?: LikeCreateManyWithoutUserInput
}

export type UserCreateOneWithoutCommentsInput = {
  create?: UserCreateWithoutCommentsInput
  connect?: UserWhereUniqueInput
}

export type CommentCreateWithoutPostInput = {
  text: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutCommentsInput
}

export type CommentCreateManyWithoutPostInput = {
  create?: Enumerable<CommentCreateWithoutPostInput>
  connect?: Enumerable<CommentWhereUniqueInput>
}

export type PostCreateWithoutUserInput = {
  location: string
  caption: string
  createdAt?: Date | string
  updatedAt?: Date | string
  files?: FileCreateManyWithoutPostInput
  comments?: CommentCreateManyWithoutPostInput
  likes?: LikeCreateManyWithoutPostInput
}

export type PostCreateManyWithoutUserInput = {
  create?: Enumerable<PostCreateWithoutUserInput>
  connect?: Enumerable<PostWhereUniqueInput>
}

export type UserCreateInput = {
  userName: string
  avatar?: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostCreateManyWithoutUserInput
  followers?: UserCreateManyWithoutFollowingInput
  following?: UserCreateManyWithoutFollowersInput
  likes?: LikeCreateManyWithoutUserInput
  comments?: CommentCreateManyWithoutUserInput
}

export type FileUpdateWithoutPostDataInput = {
  url?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FileUpdateWithWhereUniqueWithoutPostInput = {
  where: FileWhereUniqueInput
  data: FileUpdateWithoutPostDataInput
}

export type FileScalarWhereInput = {
  AND?: Enumerable<FileScalarWhereInput>
  OR?: Array<FileScalarWhereInput>
  NOT?: Enumerable<FileScalarWhereInput>
  id?: number | IntFilter
  url?: string | StringFilter
  postId?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type FileUpdateManyDataInput = {
  url?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FileUpdateManyWithWhereNestedInput = {
  where: FileScalarWhereInput
  data: FileUpdateManyDataInput
}

export type FileUpsertWithWhereUniqueWithoutPostInput = {
  where: FileWhereUniqueInput
  update: FileUpdateWithoutPostDataInput
  create: FileCreateWithoutPostInput
}

export type FileUpdateManyWithoutPostInput = {
  create?: Enumerable<FileCreateWithoutPostInput>
  connect?: Enumerable<FileWhereUniqueInput>
  set?: Enumerable<FileWhereUniqueInput>
  disconnect?: Enumerable<FileWhereUniqueInput>
  delete?: Enumerable<FileWhereUniqueInput>
  update?: Enumerable<FileUpdateWithWhereUniqueWithoutPostInput>
  updateMany?: Enumerable<FileUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<FileScalarWhereInput>
  upsert?: Enumerable<FileUpsertWithWhereUniqueWithoutPostInput>
}

export type UserUpdateWithoutLikesDataInput = {
  userName?: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostUpdateManyWithoutUserInput
  followers?: UserUpdateManyWithoutFollowingInput
  following?: UserUpdateManyWithoutFollowersInput
  comments?: CommentUpdateManyWithoutUserInput
}

export type UserUpsertWithoutLikesInput = {
  update: UserUpdateWithoutLikesDataInput
  create: UserCreateWithoutLikesInput
}

export type UserUpdateOneRequiredWithoutLikesInput = {
  create?: UserCreateWithoutLikesInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutLikesDataInput
  upsert?: UserUpsertWithoutLikesInput
}

export type LikeUpdateWithoutPostDataInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: UserUpdateOneRequiredWithoutLikesInput
}

export type LikeUpdateWithWhereUniqueWithoutPostInput = {
  where: LikeWhereUniqueInput
  data: LikeUpdateWithoutPostDataInput
}

export type LikeScalarWhereInput = {
  AND?: Enumerable<LikeScalarWhereInput>
  OR?: Array<LikeScalarWhereInput>
  NOT?: Enumerable<LikeScalarWhereInput>
  id?: number | IntFilter
  userId?: number | IntFilter
  postId?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type LikeUpdateManyDataInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type LikeUpdateManyWithWhereNestedInput = {
  where: LikeScalarWhereInput
  data: LikeUpdateManyDataInput
}

export type LikeUpsertWithWhereUniqueWithoutPostInput = {
  where: LikeWhereUniqueInput
  update: LikeUpdateWithoutPostDataInput
  create: LikeCreateWithoutPostInput
}

export type LikeUpdateManyWithoutPostInput = {
  create?: Enumerable<LikeCreateWithoutPostInput>
  connect?: Enumerable<LikeWhereUniqueInput>
  set?: Enumerable<LikeWhereUniqueInput>
  disconnect?: Enumerable<LikeWhereUniqueInput>
  delete?: Enumerable<LikeWhereUniqueInput>
  update?: Enumerable<LikeUpdateWithWhereUniqueWithoutPostInput>
  updateMany?: Enumerable<LikeUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<LikeScalarWhereInput>
  upsert?: Enumerable<LikeUpsertWithWhereUniqueWithoutPostInput>
}

export type PostUpdateWithoutCommentsDataInput = {
  location?: string
  caption?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: UserUpdateOneRequiredWithoutPostsInput
  files?: FileUpdateManyWithoutPostInput
  likes?: LikeUpdateManyWithoutPostInput
}

export type PostUpsertWithoutCommentsInput = {
  update: PostUpdateWithoutCommentsDataInput
  create: PostCreateWithoutCommentsInput
}

export type PostUpdateOneRequiredWithoutCommentsInput = {
  create?: PostCreateWithoutCommentsInput
  connect?: PostWhereUniqueInput
  update?: PostUpdateWithoutCommentsDataInput
  upsert?: PostUpsertWithoutCommentsInput
}

export type CommentUpdateWithoutUserDataInput = {
  text?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  post?: PostUpdateOneRequiredWithoutCommentsInput
}

export type CommentUpdateWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutUserDataInput
}

export type CommentScalarWhereInput = {
  AND?: Enumerable<CommentScalarWhereInput>
  OR?: Array<CommentScalarWhereInput>
  NOT?: Enumerable<CommentScalarWhereInput>
  id?: number | IntFilter
  text?: string | StringFilter
  userId?: number | IntFilter
  postId?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type CommentUpdateManyDataInput = {
  text?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type CommentUpdateManyWithWhereNestedInput = {
  where: CommentScalarWhereInput
  data: CommentUpdateManyDataInput
}

export type CommentUpsertWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutUserDataInput
  create: CommentCreateWithoutUserInput
}

export type CommentUpdateManyWithoutUserInput = {
  create?: Enumerable<CommentCreateWithoutUserInput>
  connect?: Enumerable<CommentWhereUniqueInput>
  set?: Enumerable<CommentWhereUniqueInput>
  disconnect?: Enumerable<CommentWhereUniqueInput>
  delete?: Enumerable<CommentWhereUniqueInput>
  update?: Enumerable<CommentUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: Enumerable<CommentUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<CommentScalarWhereInput>
  upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutUserInput>
}

export type UserUpdateWithoutFollowersDataInput = {
  userName?: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostUpdateManyWithoutUserInput
  following?: UserUpdateManyWithoutFollowersInput
  likes?: LikeUpdateManyWithoutUserInput
  comments?: CommentUpdateManyWithoutUserInput
}

export type UserUpdateWithWhereUniqueWithoutFollowersInput = {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutFollowersDataInput
}

export type UserScalarWhereInput = {
  AND?: Enumerable<UserScalarWhereInput>
  OR?: Array<UserScalarWhereInput>
  NOT?: Enumerable<UserScalarWhereInput>
  id?: number | IntFilter
  userName?: string | StringFilter
  avatar?: string | StringFilter
  email?: string | StringFilter
  firstName?: string | StringFilter
  lastName?: string | StringFilter
  name?: string | StringFilter
  bio?: string | StringFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type UserUpdateManyDataInput = {
  userName?: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type UserUpdateManyWithWhereNestedInput = {
  where: UserScalarWhereInput
  data: UserUpdateManyDataInput
}

export type UserUpsertWithWhereUniqueWithoutFollowersInput = {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutFollowersDataInput
  create: UserCreateWithoutFollowersInput
}

export type UserUpdateManyWithoutFollowersInput = {
  create?: Enumerable<UserCreateWithoutFollowersInput>
  connect?: Enumerable<UserWhereUniqueInput>
  set?: Enumerable<UserWhereUniqueInput>
  disconnect?: Enumerable<UserWhereUniqueInput>
  delete?: Enumerable<UserWhereUniqueInput>
  update?: Enumerable<UserUpdateWithWhereUniqueWithoutFollowersInput>
  updateMany?: Enumerable<UserUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<UserScalarWhereInput>
  upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutFollowersInput>
}

export type UserUpdateWithoutPostsDataInput = {
  userName?: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  followers?: UserUpdateManyWithoutFollowingInput
  following?: UserUpdateManyWithoutFollowersInput
  likes?: LikeUpdateManyWithoutUserInput
  comments?: CommentUpdateManyWithoutUserInput
}

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export type UserUpdateOneRequiredWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPostsDataInput
  upsert?: UserUpsertWithoutPostsInput
}

export type PostUpdateWithoutLikesDataInput = {
  location?: string
  caption?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: UserUpdateOneRequiredWithoutPostsInput
  files?: FileUpdateManyWithoutPostInput
  comments?: CommentUpdateManyWithoutPostInput
}

export type PostUpsertWithoutLikesInput = {
  update: PostUpdateWithoutLikesDataInput
  create: PostCreateWithoutLikesInput
}

export type PostUpdateOneRequiredWithoutLikesInput = {
  create?: PostCreateWithoutLikesInput
  connect?: PostWhereUniqueInput
  update?: PostUpdateWithoutLikesDataInput
  upsert?: PostUpsertWithoutLikesInput
}

export type LikeUpdateWithoutUserDataInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  post?: PostUpdateOneRequiredWithoutLikesInput
}

export type LikeUpdateWithWhereUniqueWithoutUserInput = {
  where: LikeWhereUniqueInput
  data: LikeUpdateWithoutUserDataInput
}

export type LikeUpsertWithWhereUniqueWithoutUserInput = {
  where: LikeWhereUniqueInput
  update: LikeUpdateWithoutUserDataInput
  create: LikeCreateWithoutUserInput
}

export type LikeUpdateManyWithoutUserInput = {
  create?: Enumerable<LikeCreateWithoutUserInput>
  connect?: Enumerable<LikeWhereUniqueInput>
  set?: Enumerable<LikeWhereUniqueInput>
  disconnect?: Enumerable<LikeWhereUniqueInput>
  delete?: Enumerable<LikeWhereUniqueInput>
  update?: Enumerable<LikeUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: Enumerable<LikeUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<LikeScalarWhereInput>
  upsert?: Enumerable<LikeUpsertWithWhereUniqueWithoutUserInput>
}

export type UserUpdateWithoutFollowingDataInput = {
  userName?: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostUpdateManyWithoutUserInput
  followers?: UserUpdateManyWithoutFollowingInput
  likes?: LikeUpdateManyWithoutUserInput
  comments?: CommentUpdateManyWithoutUserInput
}

export type UserUpdateWithWhereUniqueWithoutFollowingInput = {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutFollowingDataInput
}

export type UserUpsertWithWhereUniqueWithoutFollowingInput = {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutFollowingDataInput
  create: UserCreateWithoutFollowingInput
}

export type UserUpdateManyWithoutFollowingInput = {
  create?: Enumerable<UserCreateWithoutFollowingInput>
  connect?: Enumerable<UserWhereUniqueInput>
  set?: Enumerable<UserWhereUniqueInput>
  disconnect?: Enumerable<UserWhereUniqueInput>
  delete?: Enumerable<UserWhereUniqueInput>
  update?: Enumerable<UserUpdateWithWhereUniqueWithoutFollowingInput>
  updateMany?: Enumerable<UserUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<UserScalarWhereInput>
  upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutFollowingInput>
}

export type UserUpdateWithoutCommentsDataInput = {
  userName?: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostUpdateManyWithoutUserInput
  followers?: UserUpdateManyWithoutFollowingInput
  following?: UserUpdateManyWithoutFollowersInput
  likes?: LikeUpdateManyWithoutUserInput
}

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsDataInput
  create: UserCreateWithoutCommentsInput
}

export type UserUpdateOneRequiredWithoutCommentsInput = {
  create?: UserCreateWithoutCommentsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutCommentsDataInput
  upsert?: UserUpsertWithoutCommentsInput
}

export type CommentUpdateWithoutPostDataInput = {
  text?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: UserUpdateOneRequiredWithoutCommentsInput
}

export type CommentUpdateWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutPostDataInput
}

export type CommentUpsertWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutPostDataInput
  create: CommentCreateWithoutPostInput
}

export type CommentUpdateManyWithoutPostInput = {
  create?: Enumerable<CommentCreateWithoutPostInput>
  connect?: Enumerable<CommentWhereUniqueInput>
  set?: Enumerable<CommentWhereUniqueInput>
  disconnect?: Enumerable<CommentWhereUniqueInput>
  delete?: Enumerable<CommentWhereUniqueInput>
  update?: Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput>
  updateMany?: Enumerable<CommentUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<CommentScalarWhereInput>
  upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput>
}

export type PostUpdateWithoutUserDataInput = {
  location?: string
  caption?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  files?: FileUpdateManyWithoutPostInput
  comments?: CommentUpdateManyWithoutPostInput
  likes?: LikeUpdateManyWithoutPostInput
}

export type PostUpdateWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutUserDataInput
}

export type PostScalarWhereInput = {
  AND?: Enumerable<PostScalarWhereInput>
  OR?: Array<PostScalarWhereInput>
  NOT?: Enumerable<PostScalarWhereInput>
  id?: number | IntFilter
  userId?: number | IntFilter
  location?: string | StringFilter
  caption?: string | StringFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
}

export type PostUpdateManyDataInput = {
  location?: string
  caption?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostUpsertWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutUserDataInput
  create: PostCreateWithoutUserInput
}

export type PostUpdateManyWithoutUserInput = {
  create?: Enumerable<PostCreateWithoutUserInput>
  connect?: Enumerable<PostWhereUniqueInput>
  set?: Enumerable<PostWhereUniqueInput>
  disconnect?: Enumerable<PostWhereUniqueInput>
  delete?: Enumerable<PostWhereUniqueInput>
  update?: Enumerable<PostUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<PostScalarWhereInput>
  upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutUserInput>
}

export type UserUpdateInput = {
  userName?: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  posts?: PostUpdateManyWithoutUserInput
  followers?: UserUpdateManyWithoutFollowingInput
  following?: UserUpdateManyWithoutFollowersInput
  likes?: LikeUpdateManyWithoutUserInput
  comments?: CommentUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  userName?: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PostCreateInput = {
  location: string
  caption: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutPostsInput
  files?: FileCreateManyWithoutPostInput
  comments?: CommentCreateManyWithoutPostInput
  likes?: LikeCreateManyWithoutPostInput
}

export type PostUpdateInput = {
  location?: string
  caption?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: UserUpdateOneRequiredWithoutPostsInput
  files?: FileUpdateManyWithoutPostInput
  comments?: CommentUpdateManyWithoutPostInput
  likes?: LikeUpdateManyWithoutPostInput
}

export type PostUpdateManyMutationInput = {
  location?: string
  caption?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type LikeCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutLikesInput
  post: PostCreateOneWithoutLikesInput
}

export type LikeUpdateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: UserUpdateOneRequiredWithoutLikesInput
  post?: PostUpdateOneRequiredWithoutLikesInput
}

export type LikeUpdateManyMutationInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type CommentCreateInput = {
  text: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutCommentsInput
  post: PostCreateOneWithoutCommentsInput
}

export type CommentUpdateInput = {
  text?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: UserUpdateOneRequiredWithoutCommentsInput
  post?: PostUpdateOneRequiredWithoutCommentsInput
}

export type CommentUpdateManyMutationInput = {
  text?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PostCreateWithoutFilesInput = {
  location: string
  caption: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutPostsInput
  comments?: CommentCreateManyWithoutPostInput
  likes?: LikeCreateManyWithoutPostInput
}

export type PostCreateOneWithoutFilesInput = {
  create?: PostCreateWithoutFilesInput
  connect?: PostWhereUniqueInput
}

export type FileCreateInput = {
  url: string
  createdAt?: Date | string
  updatedAt?: Date | string
  post: PostCreateOneWithoutFilesInput
}

export type PostUpdateWithoutFilesDataInput = {
  location?: string
  caption?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: UserUpdateOneRequiredWithoutPostsInput
  comments?: CommentUpdateManyWithoutPostInput
  likes?: LikeUpdateManyWithoutPostInput
}

export type PostUpsertWithoutFilesInput = {
  update: PostUpdateWithoutFilesDataInput
  create: PostCreateWithoutFilesInput
}

export type PostUpdateOneRequiredWithoutFilesInput = {
  create?: PostCreateWithoutFilesInput
  connect?: PostWhereUniqueInput
  update?: PostUpdateWithoutFilesDataInput
  upsert?: PostUpsertWithoutFilesInput
}

export type FileUpdateInput = {
  url?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  post?: PostUpdateOneRequiredWithoutFilesInput
}

export type FileUpdateManyMutationInput = {
  url?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
