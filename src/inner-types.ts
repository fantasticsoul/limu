
type AnyObject = {
  [key: string]: any;
};
type AnyArray = Array<any>;

export type ObjectLike = AnyObject | AnyArray | Map<any, any> | Set<any>;

export interface DraftMeta {
  rootMeta: null | DraftMeta,
  parentMeta: null | DraftMeta,
  parent: null | ObjectLike,
  parentType: string,
  self: ObjectLike,
  copy: null | ObjectLike,
  modified: boolean,
  key: string,
  idx: number, // 数组元素才需要用到
  keyPath: string[],
  level: number,
  proxyVal: null | ObjectLike,
  proxyItems: null | Map<any, any> | Set<any>,
  finishDraft: (proxyDraft: ObjectLike) => ObjectLike,
  ver: number,
}
