import React from 'react';
import PropTypes from 'prop-types';

// Style
import { useMarkdownStyle } from './Markdown.style';

const MarkdownImage = ({ title, alt, src }) => {
  const classes = useMarkdownStyle();

  return (
    <img
      title={title}
      alt={alt}
      src={src}
      className={classes.image}
    />
  );
};

MarkdownImage.defaultProps = {
  title: ''
};

MarkdownImage.propTypes = {
  title: PropTypes.string,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default MarkdownImage;