import React, {Component} from 'react';
import City from './City/City';
import Prices from './Prices/Prices';
import AddingModal from './Modal/AddingModal';
import ConfirmationModal from './Modal/ConfirmationModal';
import Product from './Product/Product';
import './Table.css'
import connect from 'react-redux/es/connect/connect';
import {updateTableState} from '../../../actions/tableActions'
import {loadSaveOrPreset} from '../../../actions/saveActions'
import {prepareSaveOrPreset} from '../../../services/tableService';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = prepareSaveOrPreset(props.initialState);
    this.addingModal = React.createRef();
    this.confirmationModal = React.createRef();
  }

  render() {
    return (
        <div>
          <table className={'table-bordered table-striped'}>
            <thead>
            <tr>
              <th className={'Table-heading'}>#</th>
              {this.state.products.map(product => {
                return <Product key={product} productName={product}
                                onChange={this.showRemoveProductConfirmation.bind(this)}/>
              })}

              <th className={'Table-heading'}>
                <button onClick={this.showAddProductModal.bind(this)}
                        type={'button'}
                        className={'btn btn-success Table-btn'}>
                  <i className="fas fa-plus"/>
                </button>
              </th>
            </tr>
            </thead>

            <tbody>
            {this.state.cities.map(city => {
              return <tr key={city}>
                <City key={city} cityName={city}/>
                {this.state.products.map((product) => {
                  return <Prices
                      key={city + '-' + product}
                      onChange={this.handlePriceChange.bind(this, city, product)}
                      isBuyPriceMin={this.checkMinPrice(product, this.getCurrentPrice(city, product, 'buy'))}
                      isSellPriceMax={this.checkMaxPrice(product, this.getCurrentPrice(city, product, 'sell'))}
                      buyPrice={this.getCurrentPrice(city, product, 'buy')}
                      sellPrice={this.getCurrentPrice(city, product, 'sell')}
                  />
                })}
                <td>
                  <button onClick={this.showRemoveCityConfirmation.bind(this, city)}
                          className={'btn btn-danger Table-btn'}>
                    <i className="fas fa-minus"/>
                  </button>
                </td>
              </tr>
            })}

            <tr>
              <th className={'Table-heading'}>
                <button onClick={this.showAddCityModal.bind(this)}
                        type={'button'}
                        className={'btn btn-success Table-btn'}>
                  <i className="fas fa-plus"/>
                </button>
              </th>
            </tr>
            </tbody>

          </table>

          <AddingModal ref={this.addingModal} onChange={this.addNew.bind(this)}/>
          <ConfirmationModal ref={this.confirmationModal} onChange={this.remove.bind(this)}/>
        </div>
    )
  }

  showRemoveCityConfirmation(city) {
    this.confirmationModal.current.setState({
      isOpen: true,
      isRemovingCity: true,
      valueToDelete: city
    });
  }

  showRemoveProductConfirmation(product) {
    this.confirmationModal.current.setState({
      isOpen: true,
      isRemovingCity: false,
      valueToDelete: product
    });
  }

  remove(type, value) {
    if (type === 'city') {
      this.removeCity(value);
      this.removeRelatedPriceEntries(`${value}-`);
    }
    if (type === 'product') {
      this.removeProduct(value);
      this.removeRelatedPriceEntries(`-${value}`);
    }
  }

  removeCity(cityName) {
    let cities = this.state.cities;
    let index = cities.indexOf(cityName);
    cities.splice(index, 1);
    this.setState({cities: cities});
  }

  removeProduct(productName) {
    let cities = this.state.products;
    let index = cities.indexOf(productName);
    cities.splice(index, 1);
    this.setState({products: cities});
  }

  removeRelatedPriceEntries(cityOrProduct) {
    let newPrices = [];
    this.state.prices.forEach(price => {
      if (!price.key.includes(cityOrProduct)) {
        newPrices.push(price);
      }
    });
    this.setState({prices: newPrices})
  }

  addNew(type, value) {
    if (type === 'city') {
      this.setState({cities: this.state.cities.concat(value)});
      this.addNewPriceEntriesForCity(value);
    }
    if (type === 'product') {
      this.setState({products: this.state.products.concat(value)});
      this.addNewPriceEntriesForProduct(value);
    }
  }

  addNewPriceEntriesForProduct(product) {
    let newPrices = [];
    this.state.cities.forEach(city => {
      newPrices.push({key: city + '-' + product, buy: Number.MAX_SAFE_INTEGER, sell: 0});
    });
    this.setState({prices: this.state.prices.concat(newPrices)})
  }

  addNewPriceEntriesForCity(city) {
    let newPrices = [];
    this.state.products.forEach(product => {
      newPrices.push({key: city + '-' + product, buy: Number.MAX_SAFE_INTEGER, sell: 0});
    });
    this.setState({prices: this.state.prices.concat(newPrices)})
  }

  showAddProductModal() {
    this.addingModal.current.setState({
      isAddingCity: false,
      isOpen: true,
      invalidValues: this.state.products,
      isValid: undefined
    });
  }

  showAddCityModal() {
    this.addingModal.current.setState({
      isAddingCity: true,
      isOpen: true,
      invalidValues: this.state.cities,
      isValid: undefined
    });
  }

  checkMinPrice(product, value) {
    if (value < Number.MAX_SAFE_INTEGER) {
      let prices = this.state.prices.filter(price => price.key.includes(product));
      let minPrice = Number.MAX_SAFE_INTEGER;
      prices.forEach(price => {
        if (minPrice > price.buy) {
          minPrice = price.buy;
        }
      });
      return value === minPrice;
    } else {
      return false;
    }
  }

  checkMaxPrice(product, value) {
    if (value > 0) {
      let prices = this.state.prices.filter(price => price.key.includes(product));
      let maxPrice = 0;
      prices.forEach(price => {
        if (maxPrice < price.sell) {
          maxPrice = price.sell;
        }
      });
      return value === maxPrice;
    } else {
      return false;
    }
  }

  getCurrentPrice(city, product, type) {
    let price = this.state.prices.find(item => item.key === city + '-' + product);
    if (price !== undefined) {
      if (type === 'buy') {
        return price.buy;
      }
      if (type === 'sell') {
        return price.sell;
      }
    }
    return 0;
  }

  handlePriceChange(city, product, type, value) {
    let newPrice = this.state.prices.find(item => item.key === city + '-' + product);
    if (type === 'sell') {
      newPrice.sell = value;
    }
    if (type === 'buy') {
      newPrice.buy = value;
    }
    let newPrices = [];
    this.state.prices.forEach(oldPrice => {
      if (newPrice.key === oldPrice.key) {
        newPrices.push(newPrice)
      } else {
        newPrices.push(oldPrice)
      }
    });
    this.setState({prices: newPrices});
  }

  setState(partialUpdate) {
    super.setState(partialUpdate, () => this.props.updateTableState(this.state));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.toLoad !== nextProps.toLoad) {
      this.setState(nextProps.toLoad);
    }
  }

}

const mapStateToProps = state => ({
  initialState: state.table.initialState,
  toLoad: state.saves.toLoad,
  errors: state.errors,
});

export default connect(mapStateToProps, {updateTableState, loadSaveOrPreset})(Table);