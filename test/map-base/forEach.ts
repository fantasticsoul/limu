import {
  noop,
  runTestSuit,
  getMapBase,
  shouldBeEqual,
} from '../_util';

function doNothingInForEach(mapDraft: Map<any, any>) {
  mapDraft.forEach((val, key) => {
    noop(val, key);
  });
}

runTestSuit('map is base', 'forEach', getMapBase, doNothingInForEach, shouldBeEqual);

runTestSuit('map in base obj', 'forEach',
  () => { // get base state
    return { map: getMapBase() };
  },
  (draft) => { // change draft
    doNothingInForEach(draft.map);
  },
  (final, base) => { // assert
    expect(final === base).toBeTruthy();
    shouldBeEqual(final.map, base.map);
  },
);

function changeMapWithCbDraft(mapDraft: Map<any, any>) {
  mapDraft.forEach((val, key, map) => {
    map.set(key, `new_${val}`);
  });
}

function changeMapWithDraft(mapDraft: Map<any, any>) {
  mapDraft.forEach((val, key) => {
    mapDraft.set(key, `new_${val}`);
  });
}

function compare(mapNew, mapBase) {
  expect(mapNew !== mapBase).toBeTruthy();
}

runTestSuit('map is base', 'changeMapWithCbDraft', getMapBase, changeMapWithCbDraft, compare);

runTestSuit('map in base obj', 'changeMapWithCbDraft',
  () => { // get base state
    return { map: getMapBase() };
  },
  (draft) => { // change draft
    changeMapWithCbDraft(draft.map);
  },
  (final, base) => { // assert
    expect(final !== base).toBeTruthy();
    compare(final.map, base.map);
  },
);

runTestSuit('map is base', 'changeMapWithDraft', getMapBase, changeMapWithDraft, compare);

runTestSuit('map in base obj', 'changeMapWithDraft',
  () => { // get base state
    return { map: getMapBase() };
  },
  (draft) => { // change draft
    changeMapWithDraft(draft.map);
  },
  (final, base) => { // assert
    expect(final !== base).toBeTruthy();
    compare(final.map, base.map);
  },
);
