import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Prices.css'

class Prices extends Component {

  render() {
    return (
        <td className={'Prices'}>
          <div className={'Prices-content'}>
            <input
                className={'Prices-input Prices-input-right'
                + (this.props.isBuyPriceMin ? ' Prices-min-price' : '')}
                placeholder={'buy'}
                type={'text'}
                onBlur={this.onBuyPriceChange.bind(this)}
                onClick={(ev) => ev.target.select()}
                defaultValue={this.props.buyPrice === Number.MAX_SAFE_INTEGER ? '' : this.props.buyPrice}
            />
            <div className={'Prices-value-separator'}>/</div>
            <input
                className={'Prices-input Prices-input-left'
                + (this.props.isSellPriceMax ? ' Prices-max-price' : '')}
                placeholder={'sell'}
                type={'text'}
                onBlur={this.onSellPriceChange.bind(this)}
                onClick={(ev) => ev.target.select()}
                defaultValue={this.props.sellPrice === 0 ? '' : this.props.sellPrice}
            />
          </div>
        </td>
    )
  }


  onBuyPriceChange(e) {
    let value = e.target.value;
    if (value !== '') {
      this.props.onChange('buy', parseFloat(value));
    } else {
      this.props.onChange('buy', Number.MAX_SAFE_INTEGER);
    }
  }

  onSellPriceChange(e) {
    let value = e.target.value;
    if (value !== '') {
      this.props.onChange('sell', parseFloat(value));
    } else {
      this.props.onChange('sell', 0);
    }
  }
}

export default Prices;

Prices.propTypes = {
  isSellPriceMax: PropTypes.bool,
  isBuyPriceMin: PropTypes.bool
};
