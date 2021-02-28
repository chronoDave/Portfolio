import React from 'react';
import { cx } from '@emotion/css';

// Core
import { Typography } from '../Typography';

// Assets
import gifSmug6x from '../../assets/images/smug@6x.gif';
import gifWink6x from '../../assets/images/wink@6x.gif';
import gifHappy6x from '../../assets/images/happy@6x.gif';
import gifSad6x from '../../assets/images/sad@6x.gif';

// Styles
import classes from './Persona.styles';

const images = {
  smug: gifSmug6x,
  wink: gifWink6x,
  happy: gifHappy6x,
  sad: gifSad6x
};

export interface PersonaProps {
  type: keyof typeof images,
  primary?: string,
  secondary?: string,
  className?: string
}

const Persona = (props: PersonaProps) => {
  const {
    type,
    primary,
    secondary,
    className
  } = props;

  return (
    <div className={cx(classes.root, className)}>
      <img
        src={images[type]}
        alt={type}
        className={classes.image}
      />
      {primary && (
        <div className={classes.body}>
          <Typography variant="h6">
            {primary}
          </Typography>
          {secondary && (
            <Typography className={classes.description}>
              {secondary}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Persona;
