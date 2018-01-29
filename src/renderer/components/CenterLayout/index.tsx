import * as React from 'react';
import * as styles from './styles.cssmodules';

export interface Props {
  children: React.ReactElement<any>;
}

/**
 * Component that to set center position of page.
 * Child component should have width and height.
 */
export default (props: Props) => (
  <div className={styles.flex}>
    {props.children}
  </div>
);
