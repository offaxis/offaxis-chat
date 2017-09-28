import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images

export function Footer() {
  return (
    <div style={{ background: `#333` }} className={styles.footer}>
      <p>&copy; 2017 &middot; OffAxis</p>
    </div>
  );
}

export default Footer;
