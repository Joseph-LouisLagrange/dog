import RootSiblings from 'react-native-root-siblings';

export function showSibling(view) {
  return new RootSiblings(view);
}

export function closeSibling(sibling) {
  sibling.destroy();
}
