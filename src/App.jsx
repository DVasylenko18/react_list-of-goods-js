import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_ALP = 'alphabetically';
const SORT_FIELD_LEN = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALP:
          return good1.localeCompare(good2);
        case SORT_FIELD_LEN:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

function isLight(sortField, SORT_FIELD) {
  if (sortField === SORT_FIELD) {
    return '';
  }

  return 'is-light';
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReversed] = useState(false);
  const [isReset, setReset] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ALP);
            setReset(true);
          }}
          type="button"
          className={`button is-info ${isLight(sortField, SORT_FIELD_ALP)}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_LEN);
            setReset(true);
          }}
          type="button"
          className={`button is-info ${isLight(sortField, SORT_FIELD_LEN)}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversed(!isReversed);
            setSortField(sortField);
            setReset(isReversed && sortField === '' ? false : '');
          }}
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {
          isReset ? (
            <button
              onClick={() => {
                setSortField('');
                setReset(false);
                setReversed(false);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          ) : ``
        }

      </div>

      <ul>
        <GoodList goods={visibleGoods} />
      </ul>
    </div>
  );
};
