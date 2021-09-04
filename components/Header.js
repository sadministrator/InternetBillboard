import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function Header(props) {
  const {
    previous, next, index, historyLength, children,
  } = props;
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        type="button"
        onClick={previous}
        style={{ float: 'left' }}
      >
        Previous
      </button>

      <button
        type="button"
        onClick={next}
        style={{ float: 'right' }}
      >
        Next
      </button>

      {children}
      <br />

      <Link href="/submit">
        <button type="button">
          Submit New Billboard
        </button>
      </Link>

      <p>
        {index + 1}
        /
        {historyLength}
      </p>
    </div>
  );
}

Header.propTypes = {
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  historyLength: PropTypes.number.isRequired,
  children: PropTypes.element,
};

Header.defaultProps = {
  children: React.createElement('div'),
};

export default Header;
