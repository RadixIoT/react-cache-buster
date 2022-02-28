import React, { useEffect, useState } from 'react';
import { version } from '../package.json';

function GetVersion({ propertyToCheck }) {
  const [meta, setMeta] = useState('');

  const getMeta = async (prop) => {

      const metaJson = await fetch('/meta.json?r=' + Math.random())
        .then((response) => response.json())
        .then((responseData) => {
          console.log(
            `CacheBuster: meta.json value found: ${JSON.stringify(
              responseData
            )}`
          );
          return responseData;
        })
        .catch(() => {
          console.error(
            'CacheBuster: Unable to locate meta.json file.  Cache validation failed.'
          );
        });

        
    const gotMeta = (metaJson ? metaJson[prop] : 'meta.json not found');
    setMeta(gotMeta);
  };

  useEffect(() => {
    getMeta(propertyToCheck);
  })

  return <div className='small-text'>Last Build {propertyToCheck}: {meta}</div>;
}

export default GetVersion;
