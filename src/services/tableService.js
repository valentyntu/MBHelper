export function prepareSaveOrPreset(saveOrPreset) {
  let newTableState = {
    cities: saveOrPreset.cities,
    products: saveOrPreset.products,
    prices: saveOrPreset.prices
  };

  if (newTableState.prices === undefined) {
    newTableState.prices = [];
    newTableState.products.forEach(product => {
      newTableState.cities.forEach(city => newTableState.prices.push(
          {key: city + '-' + product, buy: Number.MAX_SAFE_INTEGER, sell: 0})
      )
    });
  }
  return newTableState;
}