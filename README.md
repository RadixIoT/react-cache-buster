# React Cache Buster

[![NPM](https://img.shields.io/npm/v/react-cache-buster.svg)](https://www.npmjs.com/package/react-cache-buster)

### About the Package

Based on a project originally written by CagriAldemir, this package allows clients to automatically check the new version or git commit hash when a new version is released in the production environment, and if a new version is published, clearing the cache and reload the page. You can find an example project under the example folder.

### Installation

```bash
npm install react-cache-buster

#or

yarn add react-cache-buster
```

### Usage

Add a new script to package.json

```bash
"scripts": {
  #...
  "generate-meta-tag": "node ./node_modules/react-cache-buster/dist/generate-meta-tag.js"
  #...
}
```

And then, change your build script like below;

```bash
"scripts": {
  "build": "yarn generate-meta-tag && react-scripts build"

  #or

  "build": "npm run generate-meta-tag && react-scripts build"
}
```

The "generate-meta-tag" script command creates a file named "meta.json" under the public folder under the root directory of your project and writes the current package.json version and the current git hash into the created file.

```jsx
import React from 'react';
import CacheBuster from 'react-cache-buster';
import { version } from '../package.json';
import Loading from './loading';

const App = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const propertyToCheck = 'version'; // value can be either 'version' or 'hash'
  return (
    <CacheBuster
      currentValue={version or hash}
      propertyToCheck={propertyToCheck}
      isEnabled={isProduction} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      loadingComponent={<Loading />} //If not pass, nothing appears at the time of new version check.
    >

      //Your actual root component...

    </CacheBuster>
  );
};

export default App;
```

You can now build and go on production as before.

The process works as follows;

- When you run the build script, the "generate-meta-tag" script writes the current package.json version and current git hash into meta.json and then the build process continues.
- When the client opens the website, the CacheBuster component makes a request to the "/meta.json" file (with cache-busting querystring variable) located in the root.
- Although the website is initially loaded via cache, the updated version data is obtained through the request since XHR requests are not kept in the cache.
- Then, the current version of the cached project is compared with the version received over the request.
- If the logic determines that a cache refresh is needed based on what is configured, either the version or git hash, the whole cache is deleted and the project is reloaded.

### Contact

Original Author Twitter: [@CagriAldemir](https://twitter.com/CagriAldemir)

Original Author Mail: [cagri@cagrialdemir.com.tr](mailto:cagri@cagrialdemir.com.tr)

### License

MIT © [CagriAldemir](https://github.com/CagriAldemir)
